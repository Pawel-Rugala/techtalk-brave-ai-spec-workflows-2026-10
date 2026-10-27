// The factory: queue of specs → one headless Claude Code session per spec.
// Pipeline per slide: HANDOVER → DISCOVER → IMPLEMENT → VERIFY → REPORT, then an independent gate.
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { EventEmitter } from 'node:events';
import { ROOT, PATHS, loadSpecs, slidePath, originalSlide, rel } from './specs.mjs';
import { verifySlide, launchBrowser } from './verify.mjs';

export const MODEL = process.env.FACTORY_MODEL ?? 'claude-opus-5-5';
const CONCURRENCY = Number(process.env.FACTORY_CONCURRENCY ?? 6);
const MAX_ATTEMPTS = 2; // first build + one fix round after a failed gate
const SESSION_TIMEOUT_MS = 12 * 60_000;
const CLAUDE_BIN = process.env.CLAUDE_BIN ?? 'claude';
const PHASES = ['handover', 'discover', 'implement', 'verify', 'report'];

const SYSTEM_PROMPT = `You are a builder agent in an AI factory. The factory turns human-written specs into slides of a reveal.js tech talk (English, 1920×1080, neobrutalist design).

Work in exactly these phases, in order. Start each phase with a line of its own: "PHASE: <NAME>".
1. PHASE: DISCOVER — read demo/specs/design-system.md, the parts of src/theme.css you need, and the hand-made slides in demo/deck/index.html to learn the style. Do not over-read; you have a time budget of about 5 minutes.
2. PHASE: IMPLEMENT — write the slide to the output file given in the handover. Reuse existing theme classes; only add CSS in a <style> inside the section, every selector prefixed with the slide's scope class.
3. PHASE: VERIFY — call the verify_slide tool (Playwright headless gate), then open the screenshot it returns with the Read tool and compare it with the spec. Fix and re-run until it passes and looks right (at most 3 rounds).
4. PHASE: REPORT — final answer: 3–5 short bullets in English: what you built, components used, verification result, any deviation from the spec.

Rules: copy the spec's visible text verbatim — never invent or change wording. The output file must contain exactly one <section> root with <aside class="notes"> holding the speaker notes. No <script>, no external URLs. You have no shell; verify_slide is the only thing you can run.`;

function handoverPrompt(spec) {
  return `HANDOVER — slide ${spec.id} "${spec.title}"

Spec file: ${spec.file}
Output file: ${rel(slidePath(spec.id))}
Root element: <section class="... s-${spec.id}"> (the scope class s-${spec.id} is required)
Verify: call the verify_slide tool with id "${spec.id}"
Design system: demo/specs/design-system.md

The spec:

${spec.raw}`;
}

function fixPrompt(problems) {
  return `The factory gate rejected the slide:\n${problems.map((p) => `- ${p}`).join('\n')}\n\nFix it, call verify_slide until it passes, then give the REPORT again. Start with "PHASE: IMPLEMENT".`;
}

const now = () => new Date().toISOString();
const emptyUsage = () => ({ input: 0, output: 0, cacheRead: 0, cacheWrite: 0 });

export class Factory extends EventEmitter {
  constructor() {
    super();
    this.procs = new Map();
    this.queue = [];
    this.running = 0;
    fs.mkdirSync(PATHS.runs, { recursive: true });
    fs.mkdirSync(PATHS.slides, { recursive: true });
    this.state = this.#restore() ?? this.#freshState(null);
  }

  // ---- state -------------------------------------------------------------

  #freshState(runId) {
    const specs = loadSpecs().map((s) => this.#job(s));
    return { run: runId ? { id: runId, startedAt: null, finishedAt: null } : null, model: MODEL, concurrency: CONCURRENCY, specs };
  }

  #job(spec) {
    return {
      id: spec.id, order: spec.order, title: spec.title, section: spec.section, tag: spec.tag, kind: spec.kind, file: spec.file,
      notes: spec.notes,
      status: 'idle', phase: null, model: MODEL, sessionId: null,
      triggeredAt: null, startedAt: null, finishedAt: null, durationMs: null, apiMs: 0,
      usage: emptyUsage(), live: emptyUsage(), costUsd: 0, turns: 0, toolCalls: 0, attempts: 0,
      gate: null, report: null, error: null, activity: [],
    };
  }

  #restore() {
    try {
      const { runId } = JSON.parse(fs.readFileSync(path.join(PATHS.runs, 'latest.json'), 'utf8'));
      const state = JSON.parse(fs.readFileSync(path.join(PATHS.runs, runId, 'state.json'), 'utf8'));
      // reconcile with specs on disk (new/edited specs show up, interrupted jobs are marked)
      const prev = new Map(state.specs.map((j) => [j.id, j]));
      state.specs = loadSpecs().map((s) => {
        const j = prev.get(s.id);
        if (!j) return this.#job(s);
        Object.assign(j, { title: s.title, order: s.order, section: s.section, tag: s.tag, kind: s.kind, notes: s.notes, live: emptyUsage() });
        if (['queued', 'running', 'gate'].includes(j.status)) Object.assign(j, { status: 'interrupted', phase: null });
        return j;
      });
      return state;
    } catch {
      return null;
    }
  }

  get runDir() {
    return this.state.run && path.join(PATHS.runs, this.state.run.id);
  }

  #changed() {
    clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => {
      if (this.runDir) fs.writeFileSync(path.join(this.runDir, 'state.json'), JSON.stringify(this.state, null, 1));
    }, 300);
    this.emit('state');
  }

  #event(job, type, data = {}) {
    const ev = { ts: now(), run: this.state.run?.id, spec: job?.id ?? null, type, ...data };
    if (this.runDir) fs.appendFileSync(path.join(this.runDir, 'events.jsonl'), JSON.stringify(ev) + '\n');
    if (job) {
      job.activity.push({ ts: ev.ts, type, text: data.text ?? '' });
      if (job.activity.length > 200) job.activity.splice(0, job.activity.length - 200);
    }
    this.emit('event', ev);
  }

  #newRun() {
    const id = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    this.state = this.#freshState(id);
    this.state.run.startedAt = now();
    fs.mkdirSync(this.runDir, { recursive: true });
    fs.writeFileSync(path.join(PATHS.runs, 'latest.json'), JSON.stringify({ runId: id }));
  }

  // ---- public API --------------------------------------------------------

  /** Start a fresh run of every batch spec (live specs stay idle for manual trigger). */
  runAll() {
    this.stopAll();
    this.#newRun();
    for (const f of fs.readdirSync(PATHS.slides)) if (f.endsWith('.html')) fs.rmSync(path.join(PATHS.slides, f));
    this.#event(null, 'run_started', { text: `model ${MODEL}, concurrency ${CONCURRENCY}` });
    for (const job of this.state.specs.filter((j) => j.kind === 'batch')) this.#enqueue(job);
    this.#changed();
    this.#pump();
  }

  /** Run one spec inside the current run (the manual live example). */
  runOne(id) {
    if (!this.state.run) this.#newRun();
    const fresh = loadSpecs().find((s) => s.id === id);
    if (!fresh) throw new Error(`unknown spec ${id}`);
    const i = this.state.specs.findIndex((j) => j.id === id);
    const job = this.#job(fresh);
    if (i >= 0) this.state.specs[i] = job;
    else this.state.specs.push(job);
    this.#kill(id);
    fs.rmSync(slidePath(id), { force: true });
    this.#enqueue(job);
    this.#changed();
    this.#pump();
  }

  reset() {
    this.stopAll();
    for (const f of fs.readdirSync(PATHS.slides)) if (f.endsWith('.html')) fs.rmSync(path.join(PATHS.slides, f));
    fs.rmSync(path.join(PATHS.runs, 'latest.json'), { force: true });
    this.state = this.#freshState(null);
    this.#changed();
  }

  stopAll() {
    this.queue = [];
    for (const id of [...this.procs.keys()]) this.#kill(id);
  }

  slideHtml(id) {
    const job = this.state.specs.find((j) => j.id === id);
    if (job?.status === 'fallback') return originalSlide(job.order);
    return fs.existsSync(slidePath(id)) ? fs.readFileSync(slidePath(id), 'utf8') : null;
  }

  // ---- queue -------------------------------------------------------------

  #enqueue(job) {
    Object.assign(job, { status: 'queued', triggeredAt: now() });
    this.queue.push(job);
    this.#event(job, 'queued', { text: 'spec queued' });
  }

  #pump() {
    while (this.running < CONCURRENCY && this.queue.length) {
      const job = this.queue.shift();
      this.running++;
      this.#build(job)
        .catch((e) => {
          Object.assign(job, { status: 'failed', error: e.message });
          this.#event(job, 'error', { text: e.message });
        })
        .finally(() => {
          this.running--;
          this.#finishRunIfDone();
          this.#changed();
          this.#pump();
        });
    }
  }

  #finishRunIfDone() {
    const active = this.state.specs.some((j) => ['queued', 'running', 'gate'].includes(j.status));
    if (!active && this.state.run && !this.state.run.finishedAt) {
      this.state.run.finishedAt = now();
      this.#event(null, 'run_finished', { text: 'all specs processed' });
    } else if (active && this.state.run) this.state.run.finishedAt = null;
  }

  async #build(job) {
    const spec = loadSpecs().find((s) => s.id === job.id);
    Object.assign(job, { status: 'running', phase: 'handover', startedAt: now() });
    this.#event(job, 'phase', { phase: 'handover', text: `handover ${spec.file} → ${MODEL}` });
    this.#changed();

    let prompt = handoverPrompt(spec);
    for (;;) {
      job.attempts++;
      await this.#session(job, prompt);
      if (job.status !== 'running') return; // killed

      job.status = 'gate';
      this.#event(job, 'gate', { text: 'factory gate: playwright verify' });
      this.#changed();
      this.browser ??= await launchBrowser();
      const res = await verifySlide(job.id, { browser: this.browser, spec });
      job.gate = { ok: res.ok, problems: res.problems, shot: res.shot, at: now() };
      this.#event(job, 'gate_result', { ok: res.ok, text: res.ok ? 'gate passed' : `gate failed: ${res.problems.length} problem(s)` });

      if (res.ok) {
        job.status = 'done';
        break;
      }
      if (job.attempts >= MAX_ATTEMPTS) {
        job.status = job.kind === 'batch' ? 'fallback' : 'failed';
        this.#event(job, 'fallback', { text: job.status === 'fallback' ? 'using hand-made slide from the backup deck' : 'no fallback for live spec' });
        break;
      }
      job.status = 'running';
      prompt = fixPrompt(res.problems);
    }
    job.phase = 'report';
    job.finishedAt = now();
    job.durationMs = Date.parse(job.finishedAt) - Date.parse(job.startedAt);
    if (this.runDir) {
      fs.mkdirSync(path.join(this.runDir, 'reports'), { recursive: true });
      const { activity, ...report } = job;
      fs.writeFileSync(path.join(this.runDir, 'reports', `${job.id}.json`), JSON.stringify(report, null, 1));
    }
    this.#event(job, 'finished', { status: job.status, text: `${job.status} in ${Math.round(job.durationMs / 1000)}s` });
  }

  #session(job, prompt) {
    const args = [
      '-p', prompt,
      '--model', MODEL,
      '--output-format', 'stream-json', '--verbose',
      '--append-system-prompt', SYSTEM_PROMPT,
      '--permission-mode', 'dontAsk',
      '--allowedTools', 'Read', 'Glob', 'Grep',
      `Edit(./${rel(PATHS.slides)}/**)`, `Write(./${rel(PATHS.slides)}/**)`,
      'mcp__factory__verify_slide',
      '--disallowedTools', 'Bash', 'Read(./index.html)', 'Read(./.git/**)', 'Read(./dist/**)', 'Read(./export/**)', 'Read(./demo/runs/*/**)', 'Agent', 'WebFetch', 'WebSearch',
      '--setting-sources', 'project',
      '--mcp-config', JSON.stringify({ mcpServers: { factory: { command: process.execPath, args: [path.join(ROOT, 'demo/factory/mcp.mjs')], env: { DEMO_URL: process.env.DEMO_URL ?? 'http://localhost:5180' } } } }),
      '--strict-mcp-config',
      '--name', `factory-${job.id}`,
    ];
    if (job.sessionId) args.push('--resume', job.sessionId);

    return new Promise((resolve) => {
      const child = spawn(CLAUDE_BIN, args, { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, DEMO_URL: process.env.DEMO_URL ?? 'http://localhost:5180' } });
      this.procs.set(job.id, child);
      const timer = setTimeout(() => {
        this.#event(job, 'timeout', { text: `session exceeded ${SESSION_TIMEOUT_MS / 60000} min — stopping it` });
        child.kill('SIGTERM');
      }, SESSION_TIMEOUT_MS);

      let buf = '';
      child.stdout.on('data', (d) => {
        buf += d;
        let nl;
        while ((nl = buf.indexOf('\n')) >= 0) {
          const line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.trim()) this.#onMessage(job, line);
        }
      });
      let stderr = '';
      child.stderr.on('data', (d) => (stderr += d));
      child.on('close', (code) => {
        clearTimeout(timer);
        this.procs.delete(job.id);
        if (code && job.status === 'running') this.#event(job, 'session_exit', { text: `claude exited ${code}: ${stderr.trim().split('\n').pop() ?? ''}` });
        resolve();
      });
    });
  }

  #onMessage(job, line) {
    let m;
    try {
      m = JSON.parse(line);
    } catch {
      return;
    }
    if (m.type === 'system' && m.subtype === 'init') {
      job.sessionId = m.session_id;
      job.model = m.model;
      this.#event(job, 'session', { text: `session ${m.session_id.slice(0, 8)} · ${m.model}` });
    } else if (m.type === 'assistant') {
      // live token counter: per-API-call usage (one message id can span several stream lines)
      const u = m.message?.usage;
      if (u && m.message.id !== job.liveMsgId) {
        job.liveMsgId = m.message.id;
        job.live.input += u.input_tokens ?? 0;
        job.live.output += u.output_tokens ?? 0;
        job.live.cacheRead += u.cache_read_input_tokens ?? 0;
        job.live.cacheWrite += u.cache_creation_input_tokens ?? 0;
      }
      for (const c of m.message?.content ?? []) {
        if (c.type === 'text') {
          const p = c.text.match(/PHASE:\s*(DISCOVER|IMPLEMENT|VERIFY|REPORT)/i);
          if (p) this.#phase(job, p[1].toLowerCase());
        } else if (c.type === 'tool_use') {
          job.toolCalls++;
          const input = c.input ?? {};
          const what = input.file_path ? rel(path.resolve(ROOT, input.file_path)) : input.command ?? input.pattern ?? input.id ?? '';
          const name = c.name.replace('mcp__factory__', '');
          // tool use implies a phase even if the agent forgot the marker
          if ((c.name === 'Write' || c.name === 'Edit') && this.#phaseIdx(job) < 2) this.#phase(job, 'implement');
          if (c.name.endsWith('verify_slide') && this.#phaseIdx(job) < 3) this.#phase(job, 'verify');
          if (this.#phaseIdx(job) < 1) this.#phase(job, 'discover');
          this.#event(job, 'tool', { tool: name, text: `${name} ${what}`.slice(0, 160) });
        }
      }
    } else if (m.type === 'user') {
      for (const c of m.message?.content ?? []) {
        const text = typeof c.content === 'string' ? c.content : Array.isArray(c.content) ? c.content.map((x) => x.text ?? '').join('\n') : '';
        if (c.type === 'tool_result' && /✅ PASS|❌ FAIL/.test(text)) {
          this.#event(job, 'verify', { text: text.split('\n')[0] });
        }
      }
    } else if (m.type === 'result') {
      const u = m.usage ?? {};
      job.live = emptyUsage(); // replaced by the authoritative totals below
      job.usage.input += u.input_tokens ?? 0;
      job.usage.output += u.output_tokens ?? 0;
      job.usage.cacheRead += u.cache_read_input_tokens ?? 0;
      job.usage.cacheWrite += u.cache_creation_input_tokens ?? 0;
      job.costUsd += m.total_cost_usd ?? 0;
      job.turns += m.num_turns ?? 0;
      job.apiMs += m.duration_api_ms ?? 0;
      job.report = m.result ?? job.report;
      this.#phase(job, 'report');
      this.#event(job, 'result', { text: `${m.subtype} · ${m.num_turns} turns · ${u.output_tokens ?? 0} output tokens`, usage: u, costUsd: m.total_cost_usd });
    } else if (m.type === 'rate_limit_event' && m.rate_limit_info?.status && m.rate_limit_info.status !== 'allowed') {
      this.#event(job, 'rate_limit', { text: `rate limit: ${m.rate_limit_info.status}` });
    }
    this.#changed();
  }

  #phaseIdx(job) {
    return PHASES.indexOf(job.phase);
  }

  #phase(job, phase) {
    if (job.phase === phase) return;
    job.phase = phase;
    this.#event(job, 'phase', { phase, text: phase.toUpperCase() });
  }

  #kill(id) {
    const p = this.procs.get(id);
    if (!p) return;
    const job = this.state.specs.find((j) => j.id === id);
    if (job && ['running', 'gate', 'queued'].includes(job.status)) job.status = 'stopped';
    p.kill('SIGTERM');
    this.procs.delete(id);
  }

  async close() {
    this.stopAll();
    await this.browser?.close();
  }
}

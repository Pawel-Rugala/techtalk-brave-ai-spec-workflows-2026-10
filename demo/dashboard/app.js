// Live observability dashboard for the slide factory (SSE from demo/factory/server.mjs).
import '@fontsource/archivo-black/400.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';
import '@fontsource/silkscreen/400.css';
import './dashboard.css';

const TZ = 'Europe/Warsaw';
const PHASES = ['handover', 'discover', 'implement', 'verify', 'report'];
const STATUS = {
  idle: ['czeka', ''], queued: ['w kolejce', 'muted'], running: ['buduje', 'yellow'], gate: ['bramka', 'blue'],
  done: ['gotowe', 'green'], fallback: ['fallback', 'pink'], failed: ['błąd', 'red'], stopped: ['stop', 'muted'], interrupted: ['przerwane', 'muted'],
};

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const timeFmt = new Intl.DateTimeFormat('pl-PL', { timeZone: TZ, hour: '2-digit', minute: '2-digit', second: '2-digit' });
const tzName = () => new Intl.DateTimeFormat('en-GB', { timeZone: TZ, timeZoneName: 'short' }).formatToParts(new Date()).find((p) => p.type === 'timeZoneName').value;
const clock = (iso) => (iso ? timeFmt.format(new Date(iso)) : '—');
const num = (n) => (n ? n.toLocaleString('pl-PL') : '0');
const short = (n) => (n >= 1e6 ? `${(n / 1e6).toFixed(2)} M` : n >= 1e3 ? `${(n / 1e3).toFixed(1)} k` : String(n));
const usd = (n) => `$${(n ?? 0).toFixed(2)}`;
const dur = (ms) => {
  if (ms == null) return '—';
  const s = Math.round(ms / 1000);
  return s >= 60 ? `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s` : `${s}s`;
};
const elapsed = (j) => (j.durationMs ?? (j.startedAt ? Date.now() - Date.parse(j.startedAt) : null));
const tokens = (u) => u.input + u.output + u.cacheRead + u.cacheWrite;

let state = null;
let selected = null;
let tab = 'spec';
const specCache = new Map();
let activity = [];

// ---- rendering -----------------------------------------------------------

function renderKpis() {
  const specs = state.specs.filter((j) => j.status !== 'idle' || j.kind === 'batch');
  const built = specs.filter((j) => j.status === 'done').length;
  const fallback = specs.filter((j) => j.status === 'fallback').length;
  const sum = (f) => specs.reduce((a, j) => a + f(j), 0);
  const tok = sum((j) => tokens(j.usage));
  const finished = specs.filter((j) => j.finishedAt);
  const firstTry = finished.filter((j) => j.status === 'done' && j.attempts === 1).length;
  const run = state.run;
  const wall = run?.startedAt ? (run.finishedAt ? Date.parse(run.finishedAt) : Date.now()) - Date.parse(run.startedAt) : null;
  const avg = finished.length ? sum((j) => j.durationMs ?? 0) / finished.length : null;
  const running = specs.filter((j) => ['running', 'gate'].includes(j.status)).length;

  const tiles = [
    ['Slajdy gotowe', `${built}<small>/${specs.length}</small>`, fallback ? `${fallback} × fallback` : `${running} w produkcji`, 'yellow'],
    ['Tokeny', short(tok), `out ${short(sum((j) => j.usage.output))} · cache ${short(sum((j) => j.usage.cacheRead))}`, ''],
    ['Koszt (API)', usd(sum((j) => j.costUsd)), finished.length ? `${usd(sum((j) => j.costUsd) / Math.max(1, finished.length))} / slajd` : '—', ''],
    ['Czas fabryki', dur(wall), run?.startedAt ? `start ${clock(run.startedAt)}` : '—', 'blue'],
    ['Śr. czas / slajd', dur(avg), `równolegle: ${state.concurrency}`, ''],
    ['Bramka za 1. razem', finished.length ? `${Math.round((firstTry / finished.length) * 100)}%` : '—', `${sum((j) => j.toolCalls)} wywołań narzędzi`, 'green'],
  ];
  $('#kpis').innerHTML = tiles
    .map(([k, v, s, c]) => `<div class="kpi card ${c}"><span class="label">${k}</span><b>${v}</b><small>${esc(s)}</small></div>`)
    .join('');
  $('#run-info').textContent = run
    ? `run ${run.id} · ${state.model} · ${run.finishedAt ? `zakończony ${clock(run.finishedAt)}` : 'w toku'}`
    : `gotowa · ${state.model} · ${state.specs.length} specyfikacji`;
}

function renderRows() {
  $('#rows').innerHTML = state.specs
    .map((j) => {
      const [label, cls] = STATUS[j.status] ?? [j.status, ''];
      const cur = PHASES.indexOf(j.phase);
      const finished = ['done', 'fallback', 'failed'].includes(j.status);
      const pipe = PHASES.map((p, i) => {
        const c = finished ? (j.status === 'done' ? 'ok' : i === PHASES.length - 1 ? 'bad' : 'ok') : i < cur ? 'ok' : i === cur ? 'now' : '';
        return `<i class="${c}" title="${p}">${p[0].toUpperCase()}</i>`;
      }).join('');
      const run = j.kind === 'live' && !['running', 'gate', 'queued'].includes(j.status)
        ? `<button class="btn tiny yellow" data-run="${j.id}">▶ uruchom</button>` : '';
      return `<tr data-id="${j.id}" class="${j.id === selected ? 'sel' : ''} ${j.kind}">
        <td class="mono">${j.id}</td>
        <td><b>${esc(j.title)}</b><small>${esc(j.file)}</small>${run}</td>
        <td><span class="badge ${cls}">${label}</span>${j.gate && !j.gate.ok && j.status !== 'fallback' ? '' : ''}</td>
        <td><span class="pipe">${pipe}</span><small class="act">${esc(['running', 'gate'].includes(j.status) ? j.lastActivity?.text ?? '' : '')}</small></td>
        <td class="mono">${j.startedAt ? esc(j.model.replace('claude-', '')) : '—'}</td>
        <td class="num">${num(j.usage.input + j.usage.cacheWrite)}</td>
        <td class="num">${num(j.usage.output)}</td>
        <td class="num">${num(j.usage.cacheRead)}</td>
        <td class="num">${j.costUsd ? usd(j.costUsd) : '—'}</td>
        <td class="num">${dur(elapsed(j))}</td>
        <td class="mono">${clock(j.triggeredAt)}</td>
        <td class="mono">${clock(j.finishedAt)}</td>
        <td class="num">${j.attempts || '—'}</td>
      </tr>`;
    })
    .join('');
}

const md = (src) => {
  const fm = src.match(/^---\n([\s\S]*?)\n---\n?/);
  let body = fm ? src.slice(fm[0].length) : src;
  const inline = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  body = body
    .split('\n')
    .map((l) => {
      if (/^# /.test(l)) return `<h3>${inline(l.slice(2))}</h3>`;
      if (/^## /.test(l)) return `<h4>${inline(l.slice(3))}</h4>`;
      if (/^### /.test(l)) return `<h5>${inline(l.slice(4))}</h5>`;
      if (/^\s*- \[ \] /.test(l)) return `<div class="li chk">☐ ${inline(l.replace(/^\s*- \[ \] /, ''))}</div>`;
      if (/^\s*[-*] /.test(l)) return `<div class="li">• ${inline(l.replace(/^\s*[-*] /, ''))}</div>`;
      if (!l.trim()) return '<div class="gap"></div>';
      return `<p>${inline(l)}</p>`;
    })
    .join('');
  return (fm ? `<pre class="fm">${esc(fm[1])}</pre>` : '') + body;
};

async function renderDetail() {
  const j = state?.specs.find((s) => s.id === selected);
  document.querySelectorAll('#tabs button').forEach((b) => b.classList.toggle('on', b.dataset.tab === tab));
  if (!j) return;
  $('#d-id').textContent = `SPEC ${j.id} · ${j.section}`;
  $('#d-title').textContent = j.title;
  const built = ['done', 'fallback'].includes(j.status);
  $('#d-open').hidden = !built;
  $('#d-open').href = `/demo/deck/#/${deckIndex(j)}`;
  const body = $('#tab-body');

  if (tab === 'spec') {
    if (!specCache.has(j.id)) specCache.set(j.id, await fetch(`/api/spec/${j.id}`).then((r) => r.text()));
    body.innerHTML = `<div class="md">${md(specCache.get(j.id))}</div>`;
  } else if (tab === 'shot') {
    body.innerHTML = j.gate?.shot
      ? `<img class="shot" src="/api/shot/${j.id}?t=${Date.parse(j.gate.at)}" alt="screenshot slajdu ${j.id}" />
         <div class="gate ${j.gate.ok ? 'ok' : 'bad'}">${j.gate.ok ? '✅ Bramka Playwright: PASS' : `❌ Bramka: ${j.gate.problems.length} problem(y)`}</div>
         ${j.gate.ok ? '' : `<ul class="problems">${j.gate.problems.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`}`
      : `<p class="empty">Screenshot pojawi się po bramce jakości (Playwright, headless, 1920×1080).</p>`;
  } else if (tab === 'activity') {
    body.innerHTML = activity.length
      ? `<ol class="log">${activity.map((a) => `<li class="t-${a.type}"><time>${clock(a.ts)}</time><span>${esc(a.text)}</span></li>`).join('')}</ol>`
      : `<p class="empty">Brak aktywności.</p>`;
    body.scrollTop = body.scrollHeight;
  } else if (tab === 'report') {
    body.innerHTML = `
      <dl class="facts">
        <dt>Model</dt><dd>${esc(j.model)}</dd>
        <dt>Sesja</dt><dd class="mono">${esc(j.sessionId ?? '—')}</dd>
        <dt>Wywołano</dt><dd>${clock(j.triggeredAt)} ${tzName()}</dd>
        <dt>Start → koniec</dt><dd>${clock(j.startedAt)} → ${clock(j.finishedAt)}</dd>
        <dt>Czas całkowity</dt><dd>${dur(elapsed(j))} (API ${dur(j.apiMs)})</dd>
        <dt>Tokeny</dt><dd>in ${num(j.usage.input)} · out ${num(j.usage.output)} · cache read ${num(j.usage.cacheRead)} · cache write ${num(j.usage.cacheWrite)}</dd>
        <dt>Tury / narzędzia</dt><dd>${j.turns} / ${j.toolCalls}</dd>
        <dt>Koszt (API)</dt><dd>${usd(j.costUsd)}</dd>
        <dt>Próby</dt><dd>${j.attempts}</dd>
      </dl>
      ${j.report ? `<div class="md report">${md(j.report)}</div>` : '<p class="empty">Raport pojawi się po fazie REPORT.</p>'}`;
  }
}

// position of the slide in the demo deck (5 hand-made slides first)
function deckIndex(j) {
  const shown = state.specs.filter((s) => s.kind === 'batch' || s.status !== 'idle').sort((a, b) => a.order - b.order);
  return 5 + shown.findIndex((s) => s.id === j.id);
}

function render() {
  if (!state) return;
  renderKpis();
  renderRows();
  if (tab !== 'activity' && tab !== 'spec') renderDetail();
}

// ---- interactions --------------------------------------------------------

async function select(id) {
  selected = id;
  activity = await fetch(`/api/activity/${id}`).then((r) => r.json());
  renderRows();
  renderDetail();
}

$('#rows').addEventListener('click', (e) => {
  const run = e.target.closest('[data-run]');
  if (run) {
    e.stopPropagation();
    fetch(`/api/run/${run.dataset.run}`, { method: 'POST' });
    select(run.dataset.run).then(() => {
      tab = 'activity';
      renderDetail();
    });
    return;
  }
  const tr = e.target.closest('tr[data-id]');
  if (tr) select(tr.dataset.id);
});
$('#tabs').addEventListener('click', (e) => {
  if (!e.target.dataset.tab) return;
  tab = e.target.dataset.tab;
  renderDetail();
});
$('#btn-run').addEventListener('click', () => {
  if (state?.run && !state.run.finishedAt && !confirmTwice('#btn-run')) return;
  fetch('/api/run', { method: 'POST' });
});
$('#btn-stop').addEventListener('click', () => fetch('/api/stop', { method: 'POST' }));
$('#btn-reset').addEventListener('click', () => confirmTwice('#btn-reset') && fetch('/api/reset', { method: 'POST' }));

// destructive buttons need a second click within 3 s (no browser dialogs on stage)
function confirmTwice(sel) {
  const b = $(sel);
  if (b.dataset.armed) {
    delete b.dataset.armed;
    b.classList.remove('armed');
    return true;
  }
  b.dataset.armed = '1';
  b.classList.add('armed');
  setTimeout(() => {
    delete b.dataset.armed;
    b.classList.remove('armed');
  }, 3000);
  return false;
}

// ---- live data -----------------------------------------------------------

const es = new EventSource('/api/stream');
es.addEventListener('state', (e) => {
  state = JSON.parse(e.data);
  selected ??= state.specs[0]?.id;
  if (!activity.length && selected) select(selected);
  render();
});
es.addEventListener('log', (e) => {
  const ev = JSON.parse(e.data);
  if (ev.spec && ev.spec === selected) {
    activity.push({ ts: ev.ts, type: ev.type, text: ev.text ?? '' });
    if (tab === 'activity') renderDetail();
  }
});
es.onerror = () => ($('#run-info').textContent = 'brak połączenia z fabryką — czy działa `npm run demo`?');

setInterval(() => {
  $('#clock').textContent = timeFmt.format(new Date());
  $('#tz').textContent = tzName();
  if (state?.specs.some((j) => ['running', 'gate'].includes(j.status))) {
    renderKpis();
    renderRows();
  }
}, 1000);

// Slide gate: static checks on the slide file + headless Playwright render at 1920×1080.
// CLI (used by builder agents):  node demo/factory/verify.mjs <id>
// Exit code 0 = pass, 1 = fail. Screenshot → demo/runs/shots/<id>.png
import fs from 'node:fs';
import { chromium } from 'playwright';
import { loadSpecs, slidePath, shotPath, PATHS, rel } from './specs.mjs';

export const DEMO_URL = process.env.DEMO_URL ?? 'http://localhost:5180';

export function launchBrowser() {
  return chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch());
}

function staticChecks(id, html) {
  const problems = [];
  const src = html.trim();
  if (!/^<section[\s>]/.test(src) || !src.endsWith('</section>')) problems.push('file must contain exactly one <section> root and nothing outside it');
  if ((src.match(/<section[\s>]/g) ?? []).length !== 1) problems.push('nested or multiple <section> elements are not allowed');
  if (!new RegExp(`^<section[^>]*class="[^"]*\\bs-${id}\\b`).test(src)) problems.push(`root <section> must have class "s-${id}"`);
  if (/<script[\s>]/i.test(src)) problems.push('<script> is not allowed (slides are injected via innerHTML)');
  if (/(?:src|href)\s*=\s*["']https?:|url\(\s*["']?https?:|@import/i.test(src)) problems.push('external resources are not allowed (deck must run offline)');
  if (!/<aside class="notes">[\s\S]+?<\/aside>/.test(src)) problems.push('missing <aside class="notes"> with speaker notes');
  for (const [, css] of src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
    for (const sel of cssSelectors(css)) {
      if (!sel.startsWith(`.s-${id}`)) problems.push(`CSS selector not scoped with .s-${id}: "${sel}"`);
    }
  }
  return problems;
}

// Top-level selectors of a stylesheet, skipping @keyframes / @font-face bodies
function cssSelectors(css) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const out = [];
  let depth = 0;
  let buf = '';
  const skip = [];
  for (const ch of css) {
    if (ch === '{') {
      const head = buf.trim();
      const inSkipped = skip.some((d) => d <= depth);
      if (!inSkipped) {
        if (head.startsWith('@')) {
          if (!/^@(media|supports|container)/.test(head)) skip.push(depth + 1);
        } else if (head) out.push(...head.split(',').map((s) => s.trim()));
      }
      depth++;
      buf = '';
    } else if (ch === '}') {
      depth--;
      while (skip.length && skip.at(-1) > depth) skip.pop();
      buf = '';
    } else if (ch === ';' && depth === 0) buf = '';
    else buf += ch;
  }
  return out;
}

export async function verifySlide(id, { browser, spec } = {}) {
  spec ??= loadSpecs().find((s) => s.id === id);
  const file = slidePath(id);
  if (!fs.existsSync(file)) return { ok: false, problems: [`${rel(file)} does not exist`], shot: null };

  const problems = staticChecks(id, fs.readFileSync(file, 'utf8'));

  const own = !browser;
  browser ??= await launchBrowser();
  // slides that must animate are rendered with reduced motion on, like the presenter's laptop
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, reducedMotion: spec?.mustAnimate ? 'reduce' : 'no-preference' });
  const runtime = [];
  // failed requests are reported by the response listener (with their URL), not as console noise
  page.on('console', (m) => m.type() === 'error' && !m.text().startsWith('Failed to load resource') && runtime.push(`console error: ${m.text()}`));
  page.on('pageerror', (e) => runtime.push(`page error: ${e.message}`));
  page.on('response', (r) => r.status() >= 400 && !r.url().includes('favicon') && runtime.push(`HTTP ${r.status()}: ${r.url().replace(DEMO_URL, '')}`));

  let layout = null;
  try {
    await page.goto(`${DEMO_URL}/demo/deck/preview.html?id=${id}`, { waitUntil: 'load', timeout: 20000 });
    await page.waitForFunction(() => window.__previewReady || window.__previewError, null, { timeout: 15000 });
    const err = await page.evaluate(() => window.__previewError);
    if (err) throw new Error(err);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);
    layout = await page.evaluate(inspectSlide, { mustInclude: spec?.mustInclude ?? [], mustAnimate: !!spec?.mustAnimate });
    fs.mkdirSync(PATHS.shots, { recursive: true });
    await page.screenshot({ path: shotPath(id) });
  } catch (e) {
    problems.push(`render failed: ${e.message.split('\n')[0]}`);
  } finally {
    await page.close();
    if (own) await browser.close();
  }

  problems.push(...runtime.slice(0, 5));
  if (layout) problems.push(...layout.problems);
  return { ok: problems.length === 0, problems, shot: layout ? rel(shotPath(id)) : null, stats: layout?.stats };
}

// Runs in the page
function inspectSlide({ mustInclude, mustAnimate }) {
  const problems = [];
  const sec = document.querySelector('.reveal .slides section');
  if (!sec) return { problems: ['no <section> rendered'], stats: { elements: 0, required: mustInclude.length, missing: mustInclude.length } };
  const W = 1920;
  const H = 1080;
  const TOL = 2;
  const animated = (el) => {
    for (let e = el; e && e !== sec.parentElement; e = e.parentElement) if (e.getAnimations().some((a) => a.playState === 'running' && a.effect?.getTiming().iterations === Infinity)) return true;
    return false;
  };
  const label = (el) => {
    const cls = typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/).join('.') : '';
    const text = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40);
    return `<${el.tagName.toLowerCase()}${cls}>${text ? ` "${text}"` : ''}`;
  };

  let checked = 0;
  const outside = [];
  const clipped = [];
  for (const el of sec.querySelectorAll('*')) {
    if (el.closest('aside.notes, style')) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    checked++;
    if ((r.left < -TOL || r.top < -TOL || r.right > W + TOL || r.bottom > H + TOL) && !animated(el)) {
      // report only the outermost offender
      if (!outside.some((o) => o.contains(el))) outside.push(el);
    }
    if (/hidden|clip|auto|scroll/.test(cs.overflow) && el.textContent.trim() && (el.scrollHeight > el.clientHeight + 4 || el.scrollWidth > el.clientWidth + 4) && !(el instanceof SVGElement)) {
      clipped.push(el);
    }
  }
  for (const el of outside.slice(0, 6)) {
    const r = el.getBoundingClientRect();
    problems.push(`overflow: ${label(el)} at [${Math.round(r.left)},${Math.round(r.top)} → ${Math.round(r.right)},${Math.round(r.bottom)}] exceeds the 1920×1080 canvas`);
  }
  for (const el of clipped.slice(0, 4)) problems.push(`clipped text: ${label(el)} content is larger than its box`);

  const visible = [...sec.childNodes].filter((n) => !(n.nodeType === 1 && n.matches('aside.notes, style'))).map((n) => n.textContent).join(' ');
  const squash = (s) => s.replace(/[\s ]+/g, '');
  const missing = mustInclude.filter((p) => !squash(visible).includes(squash(p)));
  for (const p of missing) problems.push(`missing required text: "${p}"`);

  const loops = sec.getAnimations({ subtree: true }).filter((a) => a.playState === 'running' && a.effect?.getTiming().iterations === Infinity).length;
  if (mustAnimate && loops === 0) problems.push('no looping animation running (rendered with prefers-reduced-motion: reduce — the animation must not be switched off)');

  return { problems, stats: { elements: checked, required: mustInclude.length, missing: missing.length, loops } };
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const id = String(process.argv[2] ?? '').padStart(2, '0');
  if (!/^\d\d$/.test(id)) {
    console.error('usage: node demo/factory/verify.mjs <slide-id>');
    process.exit(2);
  }
  const res = await verifySlide(id);
  if (res.ok) console.log(`✅ PASS slide ${id} (${res.stats.elements} elements checked, ${res.stats.required} required phrases present)`);
  else console.log(`❌ FAIL slide ${id}\n${res.problems.map((p) => `- ${p}`).join('\n')}`);
  if (res.shot) console.log(`screenshot: ${res.shot}  (open it with the Read tool to check the visual result)`);
  process.exit(res.ok ? 0 : 1);
}

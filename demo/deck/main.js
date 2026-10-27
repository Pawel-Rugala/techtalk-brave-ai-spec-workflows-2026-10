// Demo deck: 5 hand-made slides + one slot per spec. A slot shows a live "in production"
// placeholder until the factory gate passes, then swaps in the generated slide in place.
import { createDeck, initFloaters } from './boot.js';

const PHASES = ['handover', 'discover', 'implement', 'verify', 'report'];
const BUILT = ['done', 'fallback'];
const slidesEl = document.querySelector('.reveal .slides');
const slots = new Map(); // id → { el, built, job }

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const fmtK = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

const visible = (job) => job.kind === 'batch' || job.status !== 'idle';

function placeholder(job) {
  const sec = document.createElement('section');
  sec.className = 'top factory-ph';
  sec.dataset.spec = job.id;
  sec.innerHTML = `
    <span class="tag ${job.tag && job.tag !== 'default' ? esc(job.tag) : ''}">${esc(job.section)}</span>
    <h2>${esc(job.title)}</h2>
    <div class="ph-card card ink">
      <div class="ph-head"><span class="ph-blink">■</span> SLIDE ${esc(job.id)} · <b class="ph-status"></b></div>
      <div class="ph-phases">${PHASES.map((p) => `<span data-phase="${p}">${p.toUpperCase()}</span>`).join('<i>→</i>')}</div>
      <div class="ph-meta"></div>
    </div>
    <aside class="notes">${job.notes ? job.notes.split('\n').filter(Boolean).map((p) => `<p>${esc(p)}</p>`).join('') : ''}</aside>`;
  updatePlaceholder(sec, job);
  return sec;
}

const STATUS_LABELS = { idle: 'waiting', queued: 'queued', running: 'in production', gate: 'quality gate', done: 'done', fallback: 'fallback', failed: 'failed', stopped: 'stopped', interrupted: 'interrupted' };

function updatePlaceholder(sec, job) {
  sec.querySelector('.ph-status').textContent = (STATUS_LABELS[job.status] ?? job.status).toUpperCase();
  const cur = PHASES.indexOf(job.phase);
  sec.querySelectorAll('.ph-phases span').forEach((el, i) => {
    el.classList.toggle('done', i < cur || BUILT.includes(job.status));
    el.classList.toggle('active', i === cur && !BUILT.includes(job.status));
  });
  const u = job.usage ?? {};
  const tokens = (u.input ?? 0) + (u.output ?? 0) + (u.cacheRead ?? 0) + (u.cacheWrite ?? 0);
  sec.querySelector('.ph-meta').textContent = `${job.model} · ${fmtK(tokens)} tokens · ${job.toolCalls ?? 0} tools${job.lastActivity ? ` · ${job.lastActivity.text}` : ''}`.slice(0, 120);
}

async function fetchSlide(id) {
  const res = await fetch(`/api/slide/${id}`);
  if (!res.ok) return null;
  const tpl = document.createElement('template');
  tpl.innerHTML = (await res.text()).trim();
  const sec = tpl.content.querySelector('section');
  if (sec) sec.dataset.spec = id;
  return sec;
}

// insert a slot element so slides stay ordered by spec order
function placeSlot(id, el, order) {
  const after = [...slots.entries()].filter(([, s]) => s.order < order).sort((a, b) => b[1].order - a[1].order)[0];
  const handMade = [...slidesEl.querySelectorAll(':scope > section:not([data-spec])')];
  (after ? after[1].el : handMade.at(-1)).after(el);
}

async function apply(state, deck) {
  let structural = false;
  for (const job of state.specs) {
    if (!visible(job)) continue;
    const slot = slots.get(job.id);
    const wantBuilt = BUILT.includes(job.status);
    if (slot && slot.built === wantBuilt && (wantBuilt ? slot.job.finishedAt === job.finishedAt : true)) {
      if (!wantBuilt) updatePlaceholder(slot.el, job);
      slot.job = job;
      continue;
    }
    const el = (wantBuilt && (await fetchSlide(job.id))) || placeholder(job);
    const built = !el.classList.contains('factory-ph');
    if (slot) slot.el.replaceWith(el);
    else placeSlot(job.id, el, job.order);
    slots.set(job.id, { el, built, job, order: job.order });
    structural = true;
  }
  if (structural && deck) {
    deck.sync();
    deck.layout();
  }
}

const deck = createDeck();
window.deck = deck;

let first = true;
const es = new EventSource('/api/stream');
let queue = Promise.resolve();
es.addEventListener('state', (e) => {
  const state = JSON.parse(e.data);
  queue = queue.then(async () => {
    if (first) {
      first = false;
      await apply(state, null);
      await deck.initialize();
      initFloaters();
    } else await apply(state, deck);
  });
});
// worker not running → show the 5 hand-made slides anyway
setTimeout(() => {
  if (first) {
    first = false;
    deck.initialize().then(initFloaters);
  }
}, 2500);

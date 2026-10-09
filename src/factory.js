// Pixel-art AI Factory. The scene is an SVG on a 480x270 grid (x4 = 1920x1080).
// Hidden fragments (`.factory-step`) on the slide drive `data-step` on the scene.

const W = 480;
const BELT_Y = 206;

const STATIONS = [
  { id: 'jira', x: 34, label: 'JIRA', color: '#ffd23f', sprite: 'box' },
  { id: 'spec', x: 100, label: 'SPEC', color: '#ffd23f', sprite: 'bot' },
  { id: 'arch', x: 166, label: 'ARCHITECT', color: '#8338ec', sprite: 'bot' },
  { id: 'impl', x: 238, label: 'BE + FE', color: '#3a86ff', sprite: 'bot2' },
  { id: 'test', x: 310, label: 'TESTS', color: '#06d6a0', sprite: 'bot' },
  { id: 'review', x: 376, label: 'REVIEW', color: '#ff5ca8', sprite: 'bot' },
  { id: 'human', x: 442, label: 'HUMAN', color: '#06d6a0', sprite: 'human' },
];

// Caption shown in the HUD for each step, per <html lang>
const CAPTIONS_BY_LANG = {
  pl: [
    'INPUT: PAY-123 „Add endpoint allowing a user to pay an invoice”',
    'SPEC AGENT → ticket staje się specyfikacją',
    'ARCHITECT AGENT → decyzje, kontrakty, plan',
    'BACKEND + FRONTEND AGENT → implementacja równolegle',
    'TESTING AGENT → BUG ODRZUCONY. Weryfikacja względem spec',
    'REVIEW AGENT → review względem spec, nie „vibe”',
    'PR → HUMAN APPROVAL ✓',
    'AI FACTORY = WORKFLOW, NIE MODEL',
  ],
  en: [
    'INPUT: "Add endpoint allowing a user to pay invoice"',
    'SPEC AGENT → the ticket becomes a specification',
    'ARCHITECT AGENT → decisions, contracts, plan',
    'BACKEND + FRONTEND AGENT → parallel implementation',
    'TESTING AGENT → BUG REJECTED. Verified against the spec',
    'REVIEW AGENT → reviewed against the spec, not the "vibe"',
    'PR → HUMAN APPROVAL ✓',
    'AI FACTORY = WORKFLOW, NOT A MODEL',
  ],
};
const CAPTIONS = CAPTIONS_BY_LANG[document.documentElement.lang] || CAPTIONS_BY_LANG.pl;

const r = (x, y, w, h, fill, extra = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;

// 16x16 robot, body colour via currentColor
const BOT = `
  <symbol id="px-bot" viewBox="0 0 16 16">
    ${r(7, 0, 2, 1, '#ffd23f')}${r(7, 1, 2, 2, '#111')}
    ${r(2, 3, 12, 8, '#111')}${r(3, 4, 10, 6, 'currentColor')}
    ${r(5, 5, 2, 2, '#111')}${r(9, 5, 2, 2, '#111')}
    ${r(5, 5, 1, 1, '#fff')}${r(9, 5, 1, 1, '#fff')}
    ${r(6, 8, 4, 1, '#111')}
    ${r(3, 11, 10, 5, '#111')}${r(4, 11, 8, 4, 'currentColor')}
    ${r(6, 12, 4, 2, '#fff6e5')}${r(7, 12, 1, 1, '#ef476f')}
    ${r(1, 12, 2, 3, '#111')}${r(13, 12, 2, 3, '#111')}
  </symbol>`;

const HUMAN = `
  <symbol id="px-human" viewBox="0 0 16 16">
    ${r(4, 0, 8, 3, '#111')}${r(3, 2, 10, 2, '#111')}
    ${r(4, 3, 8, 7, '#111')}${r(5, 4, 6, 5, '#f4c29a')}
    ${r(6, 5, 1, 2, '#111')}${r(9, 5, 1, 2, '#111')}
    ${r(7, 8, 2, 1, '#c0392b')}
    ${r(3, 10, 10, 6, '#111')}${r(4, 11, 8, 5, 'currentColor')}
    ${r(7, 11, 2, 3, '#fff6e5')}
  </symbol>`;

const BUG = `
  <symbol id="px-bug" viewBox="0 0 12 10">
    ${r(1, 1, 1, 1, '#111')}${r(10, 1, 1, 1, '#111')}
    ${r(2, 2, 8, 6, '#111')}${r(3, 3, 6, 4, '#ef476f')}
    ${r(4, 4, 1, 1, '#fff')}${r(7, 4, 1, 1, '#fff')}
    ${r(0, 4, 2, 1, '#111')}${r(10, 4, 2, 1, '#111')}
    ${r(0, 7, 2, 1, '#111')}${r(10, 7, 2, 1, '#111')}
    ${r(3, 8, 1, 2, '#111')}${r(8, 8, 1, 2, '#111')}
  </symbol>`;

function stars() {
  let out = '';
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  for (let i = 0; i < 70; i++) {
    const x = Math.floor(rnd() * W);
    const y = Math.floor(rnd() * 110);
    const d = (rnd() * 3).toFixed(2);
    out += `<rect class="star" style="animation-delay:-${d}s" x="${x}" y="${y}" width="1" height="1" fill="#fff6e5"/>`;
  }
  return out;
}

function skyline() {
  // back factory building silhouettes with windows
  let out = '';
  const blocks = [
    [0, 120, 70], [70, 100, 50], [120, 130, 80], [200, 92, 60], [260, 115, 90],
    [350, 98, 55], [405, 125, 75],
  ];
  blocks.forEach(([x, y, w], bi) => {
    out += r(x, y, w, 190 - y, '#231a45');
    for (let wy = y + 8; wy < 176; wy += 12) {
      for (let wx = x + 6; wx < x + w - 6; wx += 12) {
        const lit = (wx * 7 + wy * 3 + bi) % 5 < 2;
        out += r(wx, wy, 5, 6, lit ? '#ffd23f' : '#2f2560', lit ? `class="win" style="animation-delay:-${(wx % 7) / 2}s"` : '');
      }
    }
  });
  // chimneys + smoke
  [[212, 70], [372, 76]].forEach(([x, y], i) => {
    out += r(x, y, 12, 30, '#231a45') + r(x - 2, y, 16, 4, '#111');
    for (let p = 0; p < 3; p++) {
      out += `<rect class="smoke" style="animation-delay:-${p * 1.1 + i * 0.5}s" x="${x + 2}" y="${y - 10}" width="8" height="8" fill="#6c5f99"/>`;
    }
  });
  return out;
}

function gate(s, i) {
  const x = s.x;
  const top = 150;
  let g = `<g class="station" data-i="${i}" transform="translate(${x} 0)">`;
  if (s.id === 'jira') {
    // input hopper
    g += r(-20, 160, 40, 34, '#111') + r(-18, 162, 36, 30, '#fff6e5');
    g += r(-18, 162, 36, 6, s.color);
    g += `<text x="0" y="185" class="px-label dark" text-anchor="middle">${s.label}</text>`;
    g += r(-8, 150, 16, 10, '#111') + r(-6, 152, 12, 8, '#ffd23f');
  } else {
    // pillars
    g += r(-24, top, 6, BELT_Y - top, '#111') + r(-23, top, 4, BELT_Y - top, '#5b5b73');
    g += r(18, top, 6, BELT_Y - top, '#111') + r(19, top, 4, BELT_Y - top, '#5b5b73');
    // beam
    g += r(-28, top - 16, 56, 18, '#111');
    g += `<rect class="beam" x="-26" y="${top - 14}" width="52" height="14" fill="${s.color}"/>`;
    g += `<text x="0" y="${top - 4}" class="px-label" text-anchor="middle">${s.label}</text>`;
    // scanner light
    g += `<rect class="scan" x="-18" y="${top + 2}" width="36" height="2" fill="${s.color}"/>`;
    // lamp
    g += `<rect class="lamp" x="-3" y="${top - 22}" width="6" height="6" fill="#111"/>`;
    g += `<rect class="lamp-in" x="-2" y="${top - 21}" width="4" height="4" fill="#ef476f"/>`;
  }
  // sprite(s)
  const sy = s.id === 'jira' ? 128 : top - 42;
  if (s.sprite === 'bot') {
    g += `<g class="sprite"><use href="#px-bot" x="-10" y="${sy}" width="20" height="20" style="color:${s.color}"/></g>`;
  } else if (s.sprite === 'bot2') {
    g += `<g class="sprite"><use href="#px-bot" x="-22" y="${sy}" width="20" height="20" style="color:#3a86ff"/></g>`;
    g += `<g class="sprite alt"><use href="#px-bot" x="2" y="${sy}" width="20" height="20" style="color:#ff5ca8"/></g>`;
  } else if (s.sprite === 'human') {
    g += `<g class="sprite"><use href="#px-human" x="-10" y="${sy}" width="20" height="20" style="color:${s.color}"/></g>`;
  }
  g += '</g>';
  return g;
}

function item() {
  // the thing travelling on the belt; its look changes per step via CSS
  return `
  <g class="item">
    <g class="it it-ticket">
      ${r(-9, -16, 18, 16, '#111')}${r(-8, -15, 16, 14, '#ffd23f')}
      ${r(-5, -12, 10, 2, '#111')}${r(-5, -8, 7, 2, '#111')}
      ${r(3, -8, 2, 2, '#111')}
    </g>
    <g class="it it-spec">
      ${r(-9, -18, 18, 18, '#111')}${r(-8, -17, 16, 16, '#fff6e5')}
      ${r(-6, -15, 7, 2, '#ff5ca8')}${r(-6, -11, 12, 1, '#111')}${r(-6, -8, 10, 1, '#111')}
      ${r(-6, -5, 12, 1, '#111')}
    </g>
    <g class="it it-code">
      ${r(-11, -16, 22, 16, '#111')}${r(-10, -15, 20, 14, '#3a86ff')}
      ${r(-7, -11, 2, 2, '#fff')}${r(-9, -9, 2, 2, '#fff')}${r(-7, -7, 2, 2, '#fff')}
      ${r(5, -11, 2, 2, '#fff')}${r(7, -9, 2, 2, '#fff')}${r(5, -7, 2, 2, '#fff')}
      ${r(-1, -12, 2, 8, '#fff')}
    </g>
    <g class="it it-pr">
      ${r(-11, -16, 22, 16, '#111')}${r(-10, -15, 20, 14, '#06d6a0')}
      ${r(-5, -8, 2, 2, '#111')}${r(-3, -6, 2, 2, '#111')}${r(-1, -8, 2, 2, '#111')}
      ${r(1, -10, 2, 2, '#111')}${r(3, -12, 2, 2, '#111')}
    </g>
  </g>`;
}

function buildScene() {
  const belt = `
    ${r(0, BELT_Y - 2, W, 16, '#111')}
    <rect x="0" y="${BELT_Y}" width="${W}" height="10" fill="url(#belt-pattern)"/>
    ${Array.from({ length: 24 }, (_, i) => r(i * 20 + 6, BELT_Y + 14, 8, 8, '#111') + r(i * 20 + 8, BELT_Y + 16, 4, 4, '#5b5b73')).join('')}
  `;
  return `
  <svg class="factory-svg" viewBox="0 0 ${W} 270" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
    <defs>
      ${BOT}${HUMAN}${BUG}
      <pattern id="belt-pattern" width="12" height="10" patternUnits="userSpaceOnUse">
        <rect width="12" height="10" fill="#3b3656"/>
        <rect class="belt-stripe" width="6" height="10" fill="#57507d"/>
      </pattern>
    </defs>
    ${r(0, 0, W, 270, '#1a1433')}
    ${stars()}
    <g class="moon">${r(424, 16, 10, 2, '#fff6e5')}${r(421, 18, 16, 3, '#fff6e5')}${r(420, 21, 18, 8, '#fff6e5')}${r(421, 29, 16, 3, '#fff6e5')}${r(424, 32, 10, 2, '#fff6e5')}${r(428, 17, 12, 3, '#1a1433')}${r(431, 20, 10, 10, '#1a1433')}${r(428, 30, 12, 3, '#1a1433')}${r(423, 24, 2, 2, '#e3d9c0')}${r(425, 28, 2, 1, '#e3d9c0')}</g>
    ${skyline()}
    ${r(0, 190, W, 80, '#2b2150')}
    ${Array.from({ length: 30 }, (_, i) => r(i * 16, 236 + (i % 2) * 8, 8, 4, '#231a45')).join('')}
    ${belt}
    ${STATIONS.map(gate).join('')}
    <g class="bug"><use href="#px-bug" x="-6" y="-12" width="12" height="10"/></g>
    <g class="verdict fail" transform="translate(310 84)">${r(-24, 0, 48, 14, '#111')}${r(-23, 1, 46, 12, '#ef476f')}<text x="0" y="10" text-anchor="middle" class="px-label light">FAIL</text></g>
    <g class="verdict pass" transform="translate(310 84)">${r(-24, 0, 48, 14, '#111')}${r(-23, 1, 46, 12, '#06d6a0')}<text x="0" y="10" text-anchor="middle" class="px-label">PASS</text></g>
    ${item()}
  </svg>`;
}

export function initFactory(deck) {
  const root = document.querySelector('[data-factory]');
  if (!root) return;
  root.insertAdjacentHTML('afterbegin', buildScene());
  const svg = root.querySelector('svg');
  const caption = root.querySelector('.factory-caption');
  const itemEl = svg.querySelector('.item');
  const bug = svg.querySelector('.bug');
  const slide = root.closest('section');

  const setStep = (step) => {
    const s = Math.min(step, STATIONS.length - 1);
    root.dataset.step = step;
    const x = STATIONS[s].x;
    itemEl.style.transform = `translate(${x}px, ${BELT_Y}px)`;
    bug.style.transform = `translate(${STATIONS[4].x - 10}px, ${BELT_Y}px)`;
    svg.querySelectorAll('.station').forEach((st) => {
      const i = Number(st.dataset.i);
      st.classList.toggle('active', i === s && step < STATIONS.length);
      st.classList.toggle('done', i < s || step >= STATIONS.length);
    });
    if (caption) {
      caption.textContent = CAPTIONS[Math.min(step, CAPTIONS.length - 1)];
      caption.classList.remove('flash');
      void caption.offsetWidth;
      caption.classList.add('flash');
    }
  };

  // PDF export: show the finished factory instead of the empty belt
  if (/print-pdf/i.test(window.location.search)) {
    setStep(CAPTIONS.length - 1);
    slide.classList.add('factory-done');
    return;
  }

  // Autoplay (data-autoplay): the scene runs by itself while the slide is shown.
  // Otherwise hidden `.factory-step` fragments drive it.
  if (root.hasAttribute('data-autoplay')) {
    const STEP_MS = [2600, 2600, 2600, 2600, 3600, 2600, 2600];
    let timer = null;
    const stop = () => { clearTimeout(timer); timer = null; };
    const run = (step) => {
      setStep(step);
      slide.classList.toggle('factory-done', step >= CAPTIONS.length - 1);
      if (step < CAPTIONS.length - 1) timer = setTimeout(() => run(step + 1), STEP_MS[step] ?? 2600);
    };
    const onSlide = () => {
      stop();
      if (deck.getCurrentSlide() === slide) run(0);
    };
    setStep(0);
    onSlide();
    deck.on('slidechanged', onSlide);
    return;
  }

  const currentStep = () => slide.querySelectorAll('.factory-step.visible').length;
  const sync = () => {
    if (deck.getCurrentSlide() === slide) setStep(currentStep());
  };

  setStep(0);
  sync();
  deck.on('fragmentshown', sync);
  deck.on('fragmenthidden', sync);
  deck.on('slidechanged', sync);
}

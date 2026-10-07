// Types out every `.type` element inside a slide when it becomes current.
// Works across nested <span>s (syntax colouring) by filling text nodes in order.

const running = new WeakMap();

function textNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}

function prepare(el) {
  if (el._tw) return el._tw;
  const nodes = textNodes(el);
  el._tw = { nodes, full: nodes.map((n) => n.data) };
  return el._tw;
}

function finish(el) {
  const tw = prepare(el);
  tw.nodes.forEach((n, i) => (n.data = tw.full[i]));
  el.classList.remove('typing');
}

function type(el) {
  stop(el);
  const tw = prepare(el);
  const speed = Number(el.dataset.speed || 14); // ms per char
  const delay = Number(el.dataset.delay || 250);
  tw.nodes.forEach((n) => (n.data = ''));
  el.classList.add('typing');

  let node = 0;
  let pos = 0;
  let timer;
  const tick = () => {
    // write a few characters per frame for long blocks
    let budget = Math.max(1, Math.round(16 / speed));
    while (budget-- > 0) {
      if (node >= tw.nodes.length) {
        el.classList.remove('typing');
        running.delete(el);
        el.dispatchEvent(new CustomEvent('typed', { bubbles: true }));
        return;
      }
      const full = tw.full[node];
      pos++;
      tw.nodes[node].data = full.slice(0, pos);
      if (pos >= full.length) {
        node++;
        pos = 0;
      }
    }
    timer = setTimeout(tick, speed);
    running.set(el, timer);
  };
  timer = setTimeout(tick, delay);
  running.set(el, timer);
}

function stop(el) {
  const t = running.get(el);
  if (t) clearTimeout(t);
  running.delete(el);
}

export function initTypewriter(deck) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const enter = (slide) => {
    if (!slide) return;
    slide.querySelectorAll('.type').forEach((el) => (reduced ? finish(el) : type(el)));
  };
  const leave = (slide) => {
    if (!slide) return;
    slide.querySelectorAll('.type').forEach((el) => {
      stop(el);
      finish(el);
    });
  };

  enter(deck.getCurrentSlide());
  deck.on('slidechanged', (e) => {
    leave(e.previousSlide);
    enter(e.currentSlide);
  });
  deck.on('overviewshown', () => document.querySelectorAll('.type').forEach(finish));
}

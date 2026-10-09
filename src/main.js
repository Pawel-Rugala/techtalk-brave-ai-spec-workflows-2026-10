import Reveal from 'reveal.js';
import Notes from 'reveal.js/plugin/notes';
import 'reveal.js/reveal.css';

import '@fontsource/archivo-black/400.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';
import '@fontsource/silkscreen/400.css';

import './theme.css';
import './factory.css';

import { initFactory } from './factory.js';

const deck = new Reveal({
  width: 1920,
  height: 1080,
  margin: 0,
  center: false,
  display: 'flex',
  hash: true,
  controls: false,
  progress: true,
  slideNumber: 'c/t',
  transition: 'fade',
  transitionSpeed: 'fast',
  backgroundTransition: 'fade',
  fragments: false, // every slide shows complete; arrows always move whole slides
  pdfSeparateFragments: false, // PDF export: one page per slide, all fragments shown
  plugins: [Notes],
});

window.deck = deck;

document.documentElement.classList.add('static-build');

deck.initialize().then(() => {
  // PDF export: styles keyed on `.present` (entry animations, bars, arrows) apply to every slide
  if (/print-pdf/i.test(window.location.search)) {
    document.querySelectorAll('.reveal .slides section').forEach((s) => s.classList.add('present'));
  }
  initFactory(deck);
  initFloaters();
});

// decorative shapes floating gently in the page margins, behind the slide content
function initFloaters() {
  const layer = document.createElement('div');
  layer.className = 'floaters';
  layer.setAttribute('aria-hidden', 'true');
  layer.innerHTML = `
    <i class="fl sq"></i>
    <i class="fl dot"></i>
    <i class="fl plus"></i>
    <i class="fl star">✦</i>
    <i class="fl ring"></i>
    <i class="fl zig"><svg viewBox="0 0 120 30"><polyline points="2,26 22,4 42,26 62,4 82,26 102,4 118,22" /></svg></i>
    <i class="fl pill"></i>
    <i class="fl tri"></i>`;
  document.querySelector('.reveal').prepend(layer);
}

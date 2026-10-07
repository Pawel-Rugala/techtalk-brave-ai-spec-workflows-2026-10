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

import { initTypewriter } from './typewriter.js';
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
  pdfSeparateFragments: false, // PDF export: one page per slide, all fragments shown
  plugins: [Notes],
});

window.deck = deck;

deck.initialize().then(() => {
  // PDF export: styles keyed on `.present` (entry animations, bars, arrows) apply to every slide
  if (/print-pdf/i.test(window.location.search)) {
    document.querySelectorAll('.reveal .slides section').forEach((s) => s.classList.add('present'));
  }
  initTypewriter(deck);
  initFactory(deck);
});

// Shared reveal.js setup for the demo deck and the slide preview (mirrors src/main.js, minus the pixel factory).
import Reveal from 'reveal.js';
import Notes from 'reveal.js/plugin/notes';
import 'reveal.js/reveal.css';

import '@fontsource/archivo-black/400.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';
import '@fontsource/silkscreen/400.css';

import '../../src/theme.css';
import './deck.css';

export function createDeck(options = {}) {
  document.documentElement.classList.add('static-build');
  return new Reveal({
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
    fragments: false,
    plugins: [Notes],
    ...options,
  });
}

// decorative shapes floating gently in the page margins, behind the slide content
export function initFloaters() {
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

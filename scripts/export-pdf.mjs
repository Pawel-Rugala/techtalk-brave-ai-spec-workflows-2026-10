// Exports the built decks to PDF (one page per slide, all fragments shown).
// Usage: npm run export:pdf   → export/*.pdf
// Uses the locally installed Chrome; override with CHROME_PATH.

import { preview } from 'vite';
import { mkdir } from 'node:fs/promises';
import puppeteer from 'puppeteer-core';

const CHROME =
  process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const DECKS = [
  { page: 'index.html', out: 'export/the-end-of-hand-coding-EN.pdf' },
];

const server = await preview({ preview: { port: 4174, strictPort: true } });
const base = server.resolvedUrls.local[0];
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });

try {
  await mkdir('export', { recursive: true });
  for (const { page: file, out } of DECKS) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(`${base}${file}?print-pdf`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.deck?.isReady() && document.querySelector('.pdf-page'));
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 500));
    await page.pdf({ path: out, width: '1920px', height: '1080px', printBackground: true });
    await page.close();
    console.log(`✓ ${out}`);
  }
} finally {
  await browser.close();
  await server.close();
}

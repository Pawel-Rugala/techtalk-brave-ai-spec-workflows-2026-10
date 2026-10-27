// Spec loading + shared paths for the demo factory.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export const PATHS = {
  batchSpecs: path.join(ROOT, 'demo/specs/slides'),
  liveSpecs: path.join(ROOT, 'demo/specs/live'),
  designSystem: path.join(ROOT, 'demo/specs/design-system.md'),
  slides: path.join(ROOT, 'demo/deck/slides'),
  runs: path.join(ROOT, 'demo/runs'),
  shots: path.join(ROOT, 'demo/shots'),
  fullDeck: path.join(ROOT, 'index.html'),
};

export const rel = (p) => path.relative(ROOT, p);
export const slidePath = (id) => path.join(PATHS.slides, `${id}.html`);
export const shotPath = (id) => path.join(PATHS.shots, `${id}.png`);

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n?/;

export function parseSpec(file, kind) {
  const raw = fs.readFileSync(file, 'utf8');
  const fm = raw.match(FRONTMATTER);
  if (!fm) throw new Error(`${rel(file)}: missing frontmatter`);
  const meta = YAML.parse(fm[1]);
  const body = raw.slice(fm[0].length);
  return {
    id: String(meta.id).padStart(2, '0'),
    order: Number(meta.order ?? meta.id),
    title: meta.title,
    section: meta.section ?? '',
    tag: meta.tag ?? 'default',
    mustInclude: meta.must_include ?? [],
    mustAnimate: meta.must_animate === true,
    kind,
    file: rel(file),
    raw,
    notes: sectionOf(body, 'Speaker notes'),
  };
}

// Body of a "## Heading" section, up to the next "## "
function sectionOf(md, heading) {
  const re = new RegExp(`^## ${heading}\\s*\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, 'm');
  return (md.match(re)?.[1] ?? '').trim();
}

export function loadSpecs() {
  const read = (dir, kind) =>
    fs.existsSync(dir)
      ? fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => parseSpec(path.join(dir, f), kind))
      : [];
  return [...read(PATHS.batchSpecs, 'batch'), ...read(PATHS.liveSpecs, 'live')].sort((a, b) => a.order - b.order);
}

// The hand-made slide from the full deck (1-based position), used as fallback when the gate fails twice
export function originalSlide(order) {
  const html = fs.readFileSync(PATHS.fullDeck, 'utf8');
  const sections = html.match(/\n {8}<section[\s\S]*?\n {8}<\/section>/g) ?? [];
  return sections[order - 1]?.trim() ?? null;
}

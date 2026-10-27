---
id: "23"
order: 23
title: "This deck, from the factory"
section: "03 · AI Factory"
tag: "green"
must_include:
  - "from the factory"
  - "HANDOVER"
  - "DISCOVER"
  - "IMPLEMENT"
  - "VERIFY"
  - "REPORT"
  - "MODEL: OPUS 5.5"
  - "A human wrote the specs. The factory built the slides."
must_animate: true
---

# 23 · This deck, from the factory (LIVE)

## Goal
A slide built live, triggered by the speaker at the end of the talk. In pixel art, it shows the exact pipeline that just built the other slides: a spec rides a conveyor belt into the factory, passes five robot stations and drops onto a stack as a finished slide. The audience should get it: this isn't magic, it's a production line, and a human wrote the specs.

## Content
**Tag:** `03 · AI Factory`

**Heading (h2):** This deck, **from the factory** — “from the factory” in a green marker.

**HUD above the scene** (pixel font, small, ~22–26px, one line, framed like a display):
`MODEL: OPUS 5.5 · 1 SPEC → 1 SLIDE`

**Pixel-art scene** — a conveyor belt running left to right through five stations. Under each station: a label (pixel font, uppercase) and a one-line English caption (small text):

| station | label | caption | robot color |
|---|---|---|---|
| 1 | HANDOVER | spec enters the session | yellow |
| 2 | DISCOVER | reads the design system and repo | blue |
| 3 | IMPLEMENT | writes the slide | pink |
| 4 | VERIFY | Playwright · 1920×1080 | green |
| 5 | REPORT | tokens · time · model | yellow |

- At the start of the belt: a spec card labeled `spec.md` (optionally with a pixel-drawn document icon, not an emoji).
- At the end of the belt: a stack of finished slides (3–4 offset rectangles with thick borders) that the finished slide drops onto.

**Closing line below the scene** (heading font, ~40px, ink card, second part in yellow):
“A human wrote the specs. The factory built the slides.”
(You may split it into two spans: the first cream, the second — “The factory built the slides.” — yellow. The full text must appear verbatim.)

## Animation (the point of the slide)
One loop of about 8–10 s, repeating forever (`animation-iteration-count: infinite`):
1. The `spec.md` card rides the belt from the left, pausing briefly under each station.
2. While the card is under a station, that station's robot “works”: its screen or eyes blink, it hops 1 pixel, or a spark/puff appears above it. The active station's label is highlighted.
3. At IMPLEMENT, the card turns from a document into a slide (different color/border), e.g. two overlapping elements with toggled visibility.
4. At VERIFY, a green ✓ briefly appears (drawn in pixels or in the pixel font).
5. After REPORT, the finished slide drops onto the stack on the right and the loop restarts.
- The belt (stripes/rollers) moves continuously: a stripe pattern animated via `background-position` or by shifting SVG rectangles.
- All motion uses `steps(n)`: choppy and 8-bit, not smooth.
- The animation must **always** run, including under `prefers-reduced-motion: reduce`. We present from a laptop with Reduce Motion on, and motion is the point of the slide. **Do not add** any `@media (prefers-reduced-motion …)` block that disables it. The section must have the `data-motion="always"` attribute; without it, the theme (`src/theme.css`) stops all animations under reduced motion.

## Layout
- `top` section: tag → heading → HUD → scene → closing card.
- The scene spans the full content width (~1660px) and is about 480–560px tall. Draw it as a single inline `<svg>` with a `viewBox` on a small pixel grid (e.g. `0 0 420 140`), scaled up, with `shape-rendering="crispEdges"` so pixels stay sharp.
- Robots: a 16×16 pixel sprite built from `<rect>`s (head with an antenna, eyes, body in the station color, black `#111` outlines). You can define it once in a `<symbol>` and reuse it 5× via `<use>` with a different `color`/`fill`.
- Station labels can be HTML text below the SVG (pixel font) or `<text>` inside it. Either way, they must be legible (at least ~20px after scaling) and contain the exact strings from the table.
- Use only the theme palette: `--ink`, `--paper`/`--cream`, `--yellow`, `--pink`, `--green`, `--blue` (inside the SVG you may use the matching hex values from `src/theme.css`).

## Components
- `<section class="top s-23" data-motion="always">`, `.tag.green`, `h2` with `.mark.green`
- HUD: an element in `var(--font-pixel)` with a `var(--border)` border (display look)
- Scene: inline `<svg shape-rendering="crispEdges">` + custom classes prefixed with `.s-23`
- Closing card: `.card.ink`, `p` in `var(--font-head)`, accent `color: var(--yellow)`
- Sprite inspiration: `src/factory.js` (the pixel-art factory from an earlier version of the deck). You may look at how its robots are built from `<rect>`s, but do NOT import that file or rely on JS.

## Technical constraints
- **No `<script>`**: the slide is injected via `innerHTML`, so scripts won't run. HTML, CSS and inline SVG only.
- All styles go in a single `<style>` inside the section, and every selector starts with `.s-23` (no global selectors, no changes to theme.css).
- `@keyframes` names are prefixed with `s23-` so they don't collide with other slides.
- No external resources (images, fonts, URLs): the deck works offline.

## Acceptance criteria
- [ ] Fits in 1920×1080 with no scrolling and no clipped text.
- [ ] Five stations in the order HANDOVER → DISCOVER → IMPLEMENT → VERIFY → REPORT, each with a robot and a label.
- [ ] The animation loops in pure CSS (`steps()`); the card passes every station and lands on the stack. The loop also runs under `prefers-reduced-motion: reduce` (the gate renders the slide with that setting and checks that the looping animations are running).
- [ ] Sharp pixels (`crispEdges`); pixel font in the HUD and labels.
- [ ] No `<script>`; all selectors prefixed with `.s-23`, keyframes with `s23-`.
- [ ] The HUD contains “MODEL: OPUS 5.5”; the closing card contains “A human wrote the specs. The factory built the slides.”
- [ ] Speaker notes in `<aside class="notes">`.

## Speaker notes
**[LIVE]**
This slide didn't exist when I started talking. I launched it from the dashboard a minute ago: one spec, one Claude session, Opus 5.5.
*[walk through the stations]* HANDOVER: the spec enters the session. DISCOVER: the agent reads the design system and the repo. IMPLEMENT: it writes the slide. VERIFY: Playwright renders it at 1920×1080 and checks nothing overflows. REPORT: tokens, time and model land on the dashboard.
I wrote the specs. The factory built the slides. **That's what this whole talk was about.**

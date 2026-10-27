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
A slide built live, triggered manually by the speaker at the end of the talk. In pixel art it shows exactly the pipeline that just built the rest of the slides: a spec rides a conveyor belt into the factory, passes through five robot stations and drops out as a finished slide onto a stack. The audience should get it: this isn't magic, it's a production line — and a human wrote the specs.

## Content
**Tag:** `03 · AI Factory`

**Heading (h2):** This deck, **from the factory** — “from the factory” in a green marker.

**HUD above the scene** (pixel font, small, ~22–26px, one line, framed like a display):
`MODEL: OPUS 5.5 · 1 SPEC → 1 SLIDE`

**Pixel-art scene** — a conveyor belt running left to right, five stations. Under each station a label (pixel font, uppercase) and a one-line caption in English (small text):

| station | label | caption | robot color |
|---|---|---|---|
| 1 | HANDOVER | spec enters the session | yellow |
| 2 | DISCOVER | reads the design system and repo | blue |
| 3 | IMPLEMENT | writes the slide | pink |
| 4 | VERIFY | Playwright · 1920×1080 | green |
| 5 | REPORT | tokens · time · model | yellow |

- At the start of the belt, a spec card labeled `spec.md` (optionally with a document icon drawn in pixels — not an emoji).
- At the end of the belt, a stack of finished slides (3–4 offset rectangles with thick borders) onto which the finished slide drops.

**Closing line below the scene** (heading font, ~40px, ink card, second part in yellow):
“A human wrote the specs. The factory built the slides.”
(you may split it into two spans: the first cream, the second — “The factory built the slides.” — yellow; the full text must appear verbatim)

## Animation (the point of the slide)
One loop of about 8–10 s, repeating forever (`animation-iteration-count: infinite`):
1. The `spec.md` card rides the belt from the left, pausing briefly under each station.
2. While the card is under a station, that station's robot “works”: its screen/eyes blink, it hops by 1 pixel, or a spark/puff appears above it. The active station gets a highlighted label.
3. At the IMPLEMENT station the card changes from a document into a slide (different color/border) — e.g. via two overlapping elements with toggled visibility.
4. At the VERIFY station a green ✓ briefly appears (drawn in pixels or in the pixel font).
5. After REPORT the finished slide drops onto the stack on the right and the loop starts over.
- The belt (stripes/rollers) moves continuously — a stripe pattern animated via `background-position` or by shifting SVG rectangles.
- All motion uses `steps(n)` — choppy, “8-bit”, not smooth.
- The animation must **always** run, including under `prefers-reduced-motion: reduce` — we present from a laptop with “Reduce Motion” turned on, and motion is the point of the slide. **Do not add** any `@media (prefers-reduced-motion …)` block that disables the animation. The section must have the `data-motion="always"` attribute — without it, the theme (`src/theme.css`) stops all animations under reduced motion.

## Layout
- `top` section: tag → heading → HUD → scene → closing card.
- Scene spans the full content width (~1660px), about 480–560px tall. Draw it as a single inline `<svg>` with a `viewBox` on a small pixel grid (e.g. `0 0 420 140`) scaled up, with `shape-rendering="crispEdges"` — pixels must be sharp.
- Robots: a 16×16 “pixel” sprite built from `<rect>`s (head with an antenna, eyes, body in the station color, black `#111` outlines). You can define it once in a `<symbol>` and use it 5× via `<use>` with a different `color`/`fill`.
- Station labels can be HTML text under the SVG (pixel font) or `<text>` inside the SVG — what matters is that they're legible (at least ~20px after scaling) and contain the exact strings from the table.
- Palette only from the theme tokens: `--ink`, `--paper`/`--cream`, `--yellow`, `--pink`, `--green`, `--blue` (in the SVG you may use the corresponding hex values — look them up in `src/theme.css`).

## Components
- `<section class="top s-23" data-motion="always">`, `.tag.green`, `h2` with `.mark.green`
- HUD: an element in `var(--font-pixel)` with a `var(--border)` border (display look)
- Scene: inline `<svg shape-rendering="crispEdges">` + custom classes prefixed with `.s-23`
- Closing card: `.card.ink`, `p` in `var(--font-head)`, accent `color: var(--yellow)`
- Sprite inspiration: `src/factory.js` (the pixel-art factory from an earlier version of the deck) — you may look at how its robots are built from `<rect>`s, but do NOT import that file and do not require JS.

## Technical constraints
- **No `<script>`** — the slide is injected via `innerHTML`, so scripts won't run. HTML + CSS + inline SVG only.
- All styles in a single `<style>` inside the section; every selector starts with `.s-23` (no global selectors, no changes to theme.css).
- `@keyframes` names prefixed with `s23-` (so they don't collide with other slides).
- No external resources (images, fonts, URLs) — the deck works offline.

## Acceptance criteria
- [ ] Fits in 1920×1080 with no scrolling and no clipped text.
- [ ] Five stations in the order HANDOVER → DISCOVER → IMPLEMENT → VERIFY → REPORT, each with a robot and a label.
- [ ] The animation loops in pure CSS (`steps()`), the card travels through all stations and lands on the stack. The loop also runs under `prefers-reduced-motion: reduce` (the gate renders the slide with that setting and checks that the looping animations are running).
- [ ] Sharp pixels (`crispEdges`), pixel font in the HUD and labels.
- [ ] No `<script>`, all selectors prefixed with `.s-23`, keyframes prefixed with `s23-`.
- [ ] HUD contains “MODEL: OPUS 5.5”, the closing card contains “A human wrote the specs. The factory built the slides.”
- [ ] Speaker notes in `<aside class="notes">`.

## Speaker notes
**[LIVE]** This slide didn't exist when I started talking. I launched it a moment ago from the dashboard — one spec, one Claude session, Opus 5.5.
Walk through the stations: HANDOVER — the spec enters the session; DISCOVER — the agent reads the design system and the repo; IMPLEMENT — it writes the slide; VERIFY — Playwright renders it at 1920×1080 and checks that nothing overflows; REPORT — tokens, time and model land on the dashboard.
Punchline: I wrote the specs. The factory built the slides. That's exactly what this talk was about.

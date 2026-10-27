---
id: "18"
order: 18
title: "The agent is replaceable. The spec is durable."
section: "03 · AI Factory"
tag: "green"
must_include:
  - "The agent is"
  - "replaceable."
  - "The spec is"
  - "durable."
  - "Today's implementer:"
  - "architecture decisions"
  - "acceptance criteria"
---

# 18 · The agent is replaceable / The spec is durable

## Goal
Close the factory section with one contrast: the model or agent is a swappable part; the team's real asset is what stays behind — the spec, decisions, tests, constraints and acceptance criteria.

## Content
**Tag:** `03 · AI Factory`

No h2: just two big slogan columns.

**Left column:**
- Slogan (very large, ~110px, heading font): “The agent is⏎**replaceable.**” — “replaceable.” in a pink marker.
- Below it (40px, bold): “Today's implementer: [slot]”, where the slot is an animated “drum” that loops through `Claude` → `Codex` → `Gemini` → `???`.

**Right column:**
- Slogan (~110px): “The spec is⏎**durable.**” — “durable.” in a green marker.
- Below it, a stack of larger chips (~34px): `spec` (yellow), `architecture decisions`, `tests` (green), `constraints`, `acceptance criteria` (blue).
- Last line (lead): “…stay.”

## Layout
- Section WITHOUT the `top` class (default layout, content vertically centered).
- Two equal-width columns side by side, large gap (~80px), top-aligned.
- Left column: slogan, then the slot line. Right column: slogan, then a wrapping row of chips, then “…stay.”
- Color contrast: pink (replaceable, fleeting) vs green (durable).

## Components
- `section` (no `top`), `.tag.green`
- `.row` > two `.col.grow`
- `p.huge` with `.mark.pink` / `.mark.green`
- `.slot` > four `span` (ready-made name-cycling animation in theme.css)
- `.chips.durable-stack` > `.chip.yellow`, `.chip`, `.chip.green`, `.chip`, `.chip.blue`
- `p.lead`

## Acceptance criteria
- [ ] Fits in 1920×1080 with no scrolling and no clipped text.
- [ ] The slot cycles through Claude, Codex, Gemini, ??? (CSS animation from theme.css, no JS).
- [ ] Five chips in the given order and colors.
- [ ] Speaker notes in `<aside class="notes">`.

## Speaker notes
**[21:30–22:15]**
The agent is replaceable. Today it's Claude doing the implementing, tomorrow Codex, the day after something that doesn't exist yet.
What lasts is something else: the spec, the architecture decisions, the tests, the constraints and the acceptance criteria. They stay, whatever model you use. **That's your team's real capital.** Invest in what lasts.

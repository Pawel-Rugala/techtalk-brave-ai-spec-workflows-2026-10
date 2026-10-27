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
Close the factory part with a single contrast: the model/agent is a replaceable component, while the team's real asset is the artifacts that stay — the spec, decisions, tests, constraints, acceptance criteria.

## Content
**Tag:** `03 · AI Factory`

No h2 — two big slogan columns.

**Left column:**
- Slogan (very large, ~110px, heading font): “The agent is⏎**replaceable.**” — “replaceable.” in a pink marker.
- Below it (40px, bold): “Today's implementer: [slot]” — where the slot is an animated “drum” that cycles through the names in a loop: `Claude` → `Codex` → `Gemini` → `???`.

**Right column:**
- Slogan (~110px): “The spec is⏎**durable.**” — “durable.” in a green marker.
- Below it a stack of chips (larger chips, ~34px): `spec` (yellow), `architecture decisions`, `tests` (green), `constraints`, `acceptance criteria` (blue).
- At the end (lead): “…stay.”

## Layout
- Section WITHOUT the `top` class (content vertically centered, the default layout).
- Two equal-width columns side by side, large gap (~80px), aligned to the top.
- Left column: slogan, with the slot line below it. Right: slogan, a wrapping row of chips below it, “…stay.” below that.
- Color contrast: pink (replaceable, fleeting) vs green (durable).

## Components
- `section` (no `top`), `.tag.green`
- `.row` > two `.col.grow`
- `p.huge` with `.mark.pink` / `.mark.green`
- `.slot` > four `span` (ready-made animation in theme.css that cycles through the names)
- `.chips.durable-stack` > `.chip.yellow`, `.chip`, `.chip.green`, `.chip`, `.chip.blue`
- `p.lead`

## Acceptance criteria
- [ ] Fits in 1920×1080 with no scrolling and no clipped text.
- [ ] The slot shows Claude, Codex, Gemini, ??? in turn (CSS animation from theme.css, no JS).
- [ ] Five chips in the given order and colors.
- [ ] Speaker notes in `<aside class="notes">`.

## Speaker notes
**[21:30–22:15]**
The agent is replaceable. Today Claude implements, tomorrow Codex, the day after something that doesn't exist yet.
What lasts is something else: the spec, architecture decisions, tests, constraints and acceptance criteria. They stay no matter which model you use. **That's the team's real capital.** Invest in what lasts.

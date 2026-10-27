---
id: "06"
order: 6
title: "AI ≠ autocomplete"
section: "01 · Mindset"
tag: "yellow"
must_include:
  - "AI ≠ autocomplete"
  - "write this function"
  - "= faster typing"
  - "defines intent"
  - "AI agent"
  - "keyboard operator"
  - "system orchestrator"
---

# 06 · AI ≠ autocomplete

## Goal
Show the difference between using AI for "faster typing" (autocomplete) and delegating intent to an agent that works in a loop on its own. The audience should feel that the developer's role is changing: from keyboard operator to designer and supervisor.

## Content
**Tag:** `01 · Mindset` (yellow variant)

**Heading (h2):** `AI ≠ autocomplete`

**Left column — the old way (vertical flow, top to bottom, arrows between nodes):**
1. `Developer`
2. `"write this function"` — a "ghost" node (dashed border, dimmed)
3. `AI`
4. `code`

Below the flow, a stamp (ink variant, rotated about −4°): `= faster typing`

**Right column — the new way (vertical flow, left-aligned):**
1. `Developer`
2. `defines intent` — yellow node
3. `AI agent` — blue node
(an arrow down after each node; the last arrow leads to the chips)

Below the flow, a row of chips: `plans` · `implements` · `tests` · `reviews` · `fixes` · `↻ loop` (the last chip is pink)

**Bottom card (yellow, full content width):**
`The developer stops being a` **keyboard operator** `and becomes:` **architect · product engineer · reviewer · constraint designer · system orchestrator**
(bold: "keyboard operator" and the whole list of roles)

## Layout
- A "top" slide (content starts at the top): tag, heading, then a row of two columns, yellow card at the bottom.
- Two columns side by side, gap about 90 px, top-aligned, small margin above the row (~10 px).
- Left column: fixed width about 560 px, items centered; stamp ~20 px below the flow.
- Right column: takes the remaining width; arrows in the right column are shifted right (~90 px from the left edge) so they sit under the middle of the left-aligned nodes.
- Contrast: the left side is deliberately "poor" (ghost node, ink stamp), the right side is colorful (yellow, blue, pink loop).
- Yellow card: padding about 22×32 px, text about 34 px.

## Components
- `section.top`, `span.tag.yellow`, `h2`
- `.row` (two columns), `.col`, `.col.center` for the left column
- `.flow` with `.node` (variants `.ghost`, `.yellow`, `.blue`) and `.arrow` between nodes
- `.stamp.ink` with rotation (`--rot: -4deg`)
- `.chips` + `.chip` (the last one `.chip.pink`)
- `.card.yellow` at the bottom

## Acceptance criteria
- [ ] The left and right columns clearly contrast: "faster typing" vs an agent in a loop.
- [ ] The `"write this function"` node looks like a ghost (dimmed / dashed border).
- [ ] The `↻ loop` chip is pink and is the last one in the row.
- [ ] The whole list of roles in the yellow card is bold and fits without being cut off.
- [ ] Fits in 1920×1080, no overflow.
- [ ] Speaker notes present.

## Speaker notes
**[5:00–6:15]**
A lot of teams still use AI like a chat: "implement the specification pattern", "now do this", "now fix that".
In that setup the human is an **agent operator**, and the only gain is faster typing.
Instead, it's worth defining a **workflow** where the agent implements, tests and fixes in a loop on its own, and the human steps in only where they're really needed.

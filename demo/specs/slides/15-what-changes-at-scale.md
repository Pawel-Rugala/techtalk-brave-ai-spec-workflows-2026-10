---
id: "15"
order: 15
title: "What changes at scale?"
section: "03 · AI Factory"
tag: "green"
must_include:
  - "What changes"
  - "The human is the bottleneck"
  - "Separation of roles"
  - "The factory is code too"
  - "Measure the production line"
  - "Fix the factory, not every PR."
---

# 15 · What changes at scale?

## Goal
Show four things you don't notice with a single agent that become critical once you run many. The takeaway: at scale, the problem isn't the code. It's the human, the roles, the factory itself and measurement.

## Content
**Tag:** `03 · AI Factory`

**Heading (h2):** What changes **at scale?** — “at scale?” in a green marker.

**Grid of 4 cards** (each: number, h3 title, paragraph):

1. `01` · **The human is the bottleneck** — “Agents produce more PRs than the team can read. The bottleneck is spec and review — **not code.**”
2. `02` · **Separation of roles** — “Whoever implements doesn't review. Separate agent, separate context — review **against the spec**, not its own assumptions.”
3. `03` · **The factory is code too** — “Prompts, skills, CLAUDE.md, checklists — in the repo, versioned, reviewed. **Fix the factory, not every PR.**”
4. `04` · **Measure the production line** — “% of PRs with no fixes · rework · bugs in production · ticket → merge time · **cost per feature**.”

Bold (**…**) = `<strong>`.

## Layout
- Top-aligned slide (section with class `top`): tag, then heading, then grid.
- 2 × 2 grid with equal-width columns and generous gaps (about 40px vertical, 50px horizontal), spanning the content width.
- Card colors: 01 yellow, 02 and 03 default (paper), 04 green. Yellow opens with the problem; green closes with measurement.
- Small card number in the pixel font, above the title.

## Components
- `section.top`, `.tag.green`, `h2` with `.mark.green`
- `.scale` (ready-made 2×2 grid in theme.css) with four `.card` (`.card.yellow`, `.card`, `.card`, `.card.green`)
- Inside each card: `span.num`, `h3`, `p` with `strong`

## Acceptance criteria
- [ ] Fits in 1920×1080 with no scrolling and no clipped text.
- [ ] Four cards in a 2×2 grid, ordered 01–04, colored yellow, default, default, green.
- [ ] All text in English, word for word as in the Content section.
- [ ] Speaker notes in `<aside class="notes">`.

## Speaker notes
**[16:15–18:00]**
When we move to a factory, four things change.
**01. The human is the bottleneck.** Agents produce more PRs than the team can read. The bottleneck is spec and review, not code. So keep the gates few, but strong.
**02. Separation of roles.** An agent that reviews its own code will always say “looks good”. The reviewer is a separate agent, with its own context, checking the code against the spec, not against its own assumptions.
**03. The factory is code too.** Prompts, skills, CLAUDE.md, checklists: all in the repo, versioned, reviewed. When an agent makes the same mistake for the third time, you don't fix the PR. **You fix the factory.**
**04. Measure the production line.** How many PRs get through without fixes, how much rework there is, how many bugs reach production, how long it takes to go from ticket to merge, and what a feature costs. If you don't know those numbers, you don't know whether your factory works.
*[TODO: 1–2 short stories from other projects. Ideally a concrete number or a mishap that illustrates one of the points.]*

---
id: "11"
order: 11
title: "A spec is a contract"
section: "02 · Spec-driven development"
tag: "blue"
must_include:
  - "A spec is a"
  - "contract"
  - "one source for everything:"
  - "spec.md"
  - "implementation"
  - "code review"
  - "documentation"
  - "Spec = input to the machine."
---

# 11 · A spec is a contract

## Goal
Show the spec as a hub: a single spec.md is the shared source for implementation, code review, tests, QA and documentation, and for every role (Product, Developer, AI, Tests, QA). It isn't "more documentation"; it's the input to a machine that produces software.

## Content
**Tag:** `02 · Spec-driven development` (blue variant)

**Heading (h2):** `A spec is a` + `contract` (yellow marker)

**Lead (below the heading, no width limit):** `Product ↔ Developer ↔ AI ↔ Tests ↔ QA —` **one source for everything:**

**Radial diagram (hub and spokes):**
- Center: yellow card `spec.md`
- Satellites (chips), each joined to the center by a line:
  - top left: `implementation`
  - top right: `code review`
  - bottom left: `tests` (green)
  - bottom right: `QA` (green)
  - bottom center, below the hub: `documentation` (blue)

**Stamp (ink, bottom-right corner of the slide, rotated about −3°, about 30 px):**
`Not “more docs”. Spec = input to the machine.`

## Layout
- A "top" slide: tag, heading, lead (pulled up slightly toward the heading), diagram centered horizontally.
- Diagram about 1660×520 px: thick black lines (~5 px) radiate from the hub to five satellites; the lines may animate as if being drawn. Satellites are placed symmetrically: two high on the sides, two low and wider on the sides, one directly below the hub.
- The hub sits in the middle; each satellite chip is centered on the end of its line.
- The stamp is absolutely positioned about 130 px from the right and 80 px from the bottom of the slide.

## Components
- `section.top`, `span.tag.blue`, `h2` + `span.mark`
- `p.lead` with `strong`
- `.radial` with an SVG of lines (class `.draw`; each line has `--i` and `--len` for the draw animation), `.hub.card.yellow`, satellites `.sat.chip` (variants `.green`, `.blue`), optionally `.enter` with `--i`
- `.stamp.ink`

## Acceptance criteria
- [ ] spec.md is visually centered, with 5 lines joining it to 5 satellites.
- [ ] Satellite colors: tests and QA green, documentation blue, the rest default.
- [ ] The stamp doesn't overlap the diagram and stays inside the slide.
- [ ] Fits in 1920×1080, no overflow.
- [ ] Speaker notes present.

## Speaker notes
**[11:15–12:15]**

This is more interesting than “let's write better prompts”. A single `spec.md` file is the source for everything around it: implementation, code review, tests, QA and documentation. Product, developers, AI, tests and QA all work from the same file.

*[stamp in the corner]* This is **not** “more documentation”. Documentation used to be a by-product nobody read. Today the spec is **the input to a machine that produces software**. Write it badly, and the machine produces junk.

Personally, I think of specs like database migrations or git history: a record of **how and why** the system got to where it is today.

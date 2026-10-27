---
id: "21"
order: 21
title: "Finale: the future of software development"
section: "Recap"
tag: "none"
must_include:
  - "The future of software development"
  - "isn't"
  - "AI writing code."
  - "It's people designing systems that reliably produce software."
---

# 21 · Finale

## Goal
The last content slide: one manifesto sentence on a black background. It should land in silence. The first part upends expectations (“AI writing code” struck through); the second gives the answer in yellow.

## Content
**No tag and no heading.**

Two paragraphs in the heading font, ~84px:

1. “The future of software development⏎isn't ~~AI writing code.~~” — cream (`var(--cream)`), with “AI writing code.” struck through by a thick line.
2. “It's people designing systems that reliably produce software.” — yellow (`var(--yellow)`).

## Layout
- Dark slide: section with class `dark`, `#111111` background set via `data-background-color="#111111"`, plus `data-state="no-floaters"` (turns off the floating margin decorations).
- Section WITHOUT `top`: content vertically centered, left-aligned.
- Two huge paragraphs stacked, with plenty of breathing room. Nothing else on the slide.

## Components
- `section.dark` with `data-background-color="#111111"` and `data-state="no-floaters"`
- `p.huge` ×2 (inline size 84px), colored via `color: var(--cream)` and `color: var(--yellow)`
- `span.strike-line` on “AI writing code.”

## Acceptance criteria
- [ ] Fits in 1920×1080 with no scrolling and no clipped text.
- [ ] Black background (#111111), no floating decorations.
- [ ] First sentence in cream with the strike-through, second in yellow.
- [ ] Speaker notes in `<aside class="notes">`.

## Speaker notes
**[24:30–25:00]**
*[pause]*
“The future of software development isn't AI writing code. It's people designing systems that reliably produce software.”

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
The last content slide — a single manifesto sentence on a black background. It should land in silence: the first part overturns the expectation (“AI writing code” struck through), the second gives the answer in yellow.

## Content
**No tag and no heading.**

Two paragraphs, heading font, ~84px:

1. “The future of software development⏎isn't ~~AI writing code.~~” — cream color (`var(--cream)`), “AI writing code.” struck through with a thick line.
2. “It's people designing systems that reliably produce software.” — yellow (`var(--yellow)`).

## Layout
- Dark slide: section with class `dark`, background `#111111` set via `data-background-color="#111111"`, plus `data-state="no-floaters"` (turns off the floating decorations in the margins).
- Section WITHOUT `top` — content vertically centered, left-aligned.
- Two paragraphs one below the other, huge, lots of breathing room. Nothing else on the slide.

## Components
- `section.dark` with the attributes `data-background-color="#111111"` and `data-state="no-floaters"`
- `p.huge` ×2 (inline size 84px), colors via `color: var(--cream)` and `color: var(--yellow)`
- `span.strike-line` on “AI writing code.”

## Acceptance criteria
- [ ] Fits in 1920×1080 with no scrolling and no clipped text.
- [ ] Black background (#111111), no floating decorations.
- [ ] First sentence cream with the strike-through, second in yellow.
- [ ] Speaker notes in `<aside class="notes">`.

## Speaker notes
**[24:30–25:00]**
*[pause]*
“The future of software development isn't AI writing code. It's people designing systems that reliably produce software.”

---
id: "19"
order: 19
title: "Recap: AI → Spec → Agents → Verification"
section: "Recap"
tag: "default"
must_include:
  - "speeds things up"
  - "ends the guessing"
  - "take over execution"
  - "Verification"
  - "gives us trust"
  - "Don't optimize"
  - "typing speed."
---

# 19 · Recap — the arc of the whole talk

## Goal
The whole talk in one sentence, read left to right: AI speeds things up → the spec ends the guessing → agents take over execution → verification gives us trust. The takeaway: don't optimize typing speed (struck through).

## Content
**Tag:** `Recap` (default tag color)

**A row of four cards with `→` arrows between them.** Each card: small number (pixel font), h3 title, caption:

1. `01` · **AI** · speeds things up — default card
2. `02` · **Spec** · ends the guessing — yellow card
3. `03` · **Agents** · take over execution — blue card
4. `04` · **Verification** · gives us trust — green card

**Below, a huge slogan (~120px, heading font):**
“Don't optimize⏎~~typing speed.~~” — “typing speed.” struck through with a thick line (strike-line effect).

## Layout
- Section WITHOUT `top` (vertically centered by default).
- Cards in a single full-width row, equal widths, with arrows in the heading font between them.
- Cards may enter one by one (class `enter` with increasing `--i`: 0, 2, 4, 6 for the cards; 1, 3, 5 for the arrows).
- Slogan below the row, with a clear gap (~40px).

## Components
- `section`, `.tag`
- `.arc` > `.card` / `.card.yellow` / `.card.blue` / `.card.green` (each with `span.k2`, `h3`, `p`), separated by `span.arr` (`→`), optionally with `.enter` and `style="--i: n"`
- `p.huge` + `span.strike-line` on “typing speed.”

## Acceptance criteria
- [ ] Fits in 1920×1080 with no scrolling and no clipped text.
- [ ] Four cards in order, colored default, yellow, blue, green, with arrows between them.
- [ ] “typing speed.” is visibly struck through in the slide's final state.
- [ ] Speaker notes in `<aside class="notes">`.

## Speaker notes
**[22:15–23:00]**
AI speeds things up → the spec ends the guessing → agents take over execution → verification gives us trust.
The takeaway: **don't optimize how fast you write code.** That's not the bottleneck anymore.

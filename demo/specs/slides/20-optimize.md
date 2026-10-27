---
id: "20"
order: 20
title: "Instead, optimize:"
section: "Recap"
tag: "default"
must_include:
  - "Instead,"
  - "Intent"
  - "Constraints"
  - "Feedback loops"
  - "Verification"
  - "Writing code is almost free now."
  - "That's where your value is."
---

# 20 · Instead, optimize

## Goal
The answer to “so what should we optimize?”: four things, each as a question plus a concrete example from PAY-123. Punchline: code is almost free; a developer's value lies in these four areas.

## Content
**Tag:** `Recap`

**Heading (h2):** Instead, **optimize:** — “optimize:” in a yellow marker.

**Four cards** (pixel-font icon, h3 title, question, example):

| icon | title | question | example | color |
|---|---|---|---|---|
| `>_` | Intent | What are we building, and why? | “Add payment endpoint” → spec PAY-123 with goal, rules and AC | yellow |
| `[#]` | Constraints | What must never break? | amount ≤ remainingAmount · idempotency · one payment at a time | pink |
| `↻` | Feedback loops | How fast does the agent learn it's wrong? | tests and types in minutes, not a review comment two days later | blue |
| `✓` | Verification | How do we know it works? | types → tests → AI review vs spec → human | green |

**Black card (left-aligned, heading font ~44px):**
“Writing code is almost free now.⏎**These four things aren't. That's where your value is.**” — the second line in yellow.

## Layout
- `top` section: tag → heading → row of cards → ink card.
- Four cards in a single row, equal width (4-column grid), centered text inside the cards.
- In each card: large icon (~60px, pixel font) at the top, then the title, then the question (more prominent), then the example (smaller, mono or muted).
- Ink card below the row, left-aligned (`align-self: flex-start`), tight padding (~22px 34px).

## Components
- `section.top`, `.tag`, `h2` with `.mark`
- `.optimize.v2` > `.card.yellow` / `.card.pink` / `.card.blue` / `.card.green`, each with `span.ico`, `h3`, `p.q`, `p.ex`
- `.card.ink` with a `p` in `var(--font-head)`, accent `color: var(--yellow)`

## Acceptance criteria
- [ ] Fits in 1920×1080 with no scrolling and no clipped text (the examples in the cards may wrap, but must not overflow the card).
- [ ] Four cards in the given order and colors, each with an icon, a question and an example.
- [ ] Speaker notes in `<aside class="notes">`.

## Speaker notes
**[23:00–24:30]**
**Intent:** what are we building, and why? That's the difference between “add payment endpoint” and the PAY-123 spec.
**Constraints:** what must never break? The amount can't exceed what's still due, idempotency, one payment at a time.
**Feedback loops:** how fast does the agent find out it's wrong? A test that fails after a minute is worth more than a review comment two days later.
**Verification:** how do we know it works? From types, through tests, to AI review against the spec and a human at the end.
Writing code is almost free today. **These four things aren't.** And that's where your value is.

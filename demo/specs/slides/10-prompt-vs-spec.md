---
id: "10"
order: 10
title: "Good spec vs bad prompt"
section: "02 · Spec-driven development"
tag: "blue"
must_include:
  - "Good spec vs bad prompt"
  - "Add payment endpoint."
  - "…and the agent guesses the rest."
  - "payment.amount ≤ invoice.remainingAmount"
  - "optimistic lock on invoice"
  - "404 · 409 · 422 → retry only 5xx"
  - "less guessing."
---

# 10 · Good spec vs bad prompt

## Goal
Show the same feature twice: as a one-line prompt (the agent guesses) and as a concise spec where every line closes one gap from the PAY-123 example. Punchline: AI doesn't need more creative prompts; it needs less guessing.

## Content
**Tag:** `02 · Spec-driven development` (blue variant)

**Heading (h2):** `Good spec vs bad prompt`

**Left column:**
- A white card labeled `PROMPT`, containing (monospace, about 38 px, bold, no wrapping): `Add payment endpoint.` — struck through
- Below the card, small dimmed text: `…and the agent guesses the rest.`

**Right column — a blue card labeled `SPEC` (monospace, about 30 px, line height ~1.45), rows:**
1. **`POST /payments`**
2. **`Preconditions:`** `invoice exists · status = OPEN`
3. **`Invariant:`** `payment.amount ≤ invoice.remainingAmount`
4. **`Idempotency:`** `clientRequestId`
5. **`Concurrency:`** `optimistic lock on invoice`
6. **`Side effects:`** `PaymentCreated event`
7. **`Failure modes:`** `404 · 409 · 422 → retry only 5xx`
(the labels before the colon are bold)

**Bottom card (yellow, heading font, about 48 px):**
`AI doesn't need more creative prompts.` ⏎ `AI needs` `less guessing.` (pink marker)

## Layout
- A "top" slide: tag, heading, a two-column row (gap about 60 px, top-aligned), and the yellow card at the bottom, left-aligned (not full width).
- Left column: fixed width about 560 px; the blue card on the right grows to fill the remaining width.
- Contrast: the left side is one short, struck-through line; the right side is a dense, precise list.

## Components
- `section.top`, `span.tag.blue`, `h2`
- `.row`, `.col`
- `.card` with `span.label` "PROMPT", `span.strike-line` on the prompt
- `p.muted.small`
- `.card.blue.grow` with `span.label` "SPEC"; rows as `div` with `strong`
- `.card.yellow` + `span.mark.pink`

## Acceptance criteria
- [ ] The prompt is struck through and fits on one line.
- [ ] The spec has 7 rows in the given order, all visible.
- [ ] The symbols `≤`, `·` and `→` render correctly.
- [ ] "less guessing." sits on a pink marker.
- [ ] Fits in 1920×1080, no overflow.
- [ ] Speaker notes present.

## Speaker notes
**[10:15–11:15]**

On the left is what we usually throw at an agent today: “Add payment endpoint”. The agent has to guess the rest.

On the right, the same ticket, with nothing left unsaid. Every line closes one specific gap:

• **Preconditions** (status OPEN) → we won't pay an invoice that's already paid.<br />
• **Idempotency** (clientRequestId) → no double payments.<br />
• **Concurrency** (optimistic lock) → concurrent payments won't overwrite each other.<br />
• **Side effects** (PaymentCreated) → the event is guaranteed to go out.<br />
• **Failure modes** → we know what should happen when something breaks.

*[yellow card]* AI doesn't need more creative prompts. **It needs less guessing.** Every gap in the spec is a spot where the agent guesses. And it guesses with total confidence.

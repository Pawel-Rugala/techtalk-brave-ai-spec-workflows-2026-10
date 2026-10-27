---
id: "08"
order: 8
title: "Example: POST /payments"
section: "02 · Spec-driven development"
tag: "blue"
must_include:
  - "POST /payments"
  - "JIRA · PAY-123"
  - "Add endpoint allowing a user to pay an invoice."
  - "no idempotency key"
  - "invoice already paid?"
  - "what if it fails?"
  - "The code looks reasonable."
---

# 08 · Example: POST /payments

## Goal
Introduce the PAY-123 example that runs through the rest of the talk. A one-sentence ticket → the agent generates a reasonable-looking endpoint → stamps reveal the gaps nobody told the agent about. The problem isn't the model, it's the input.

## Content
**Tag:** `02 · Spec-driven development` (blue variant)

**Heading (h2):** `Example:` + `POST /payments` formatted as code (monospace, about 0.85 of the heading size)

**Left card (yellow) — the ticket:**
- label: `JIRA · PAY-123`
- body (about 40 px, bold): `Add endpoint allowing a user to pay an invoice.`
- small text below: `Priority: High · Estimate: 1 SP 🙂`

**Right side — a (dark) terminal with code:**
- terminal bar title: `agent · payments.ts`
- code (syntax-highlighted: comment, keywords, functions, strings, numbers):
```
// 🤖 agent: "Done! Endpoint ready ✅"
router.post('/payments', async (req, res) => {
  const invoice = await db.invoices.find(req.body.invoiceId);
  const payment = await db.payments.create({
    invoiceId: invoice.id,
    amount: req.body.amount,
  });
  res.status(201).json(payment);
});
```

**Stamps over the terminal (5 of them, slightly rotated, scattered):**
1. `no idempotency key` — top-right corner, sticking out a little past the terminal's right edge, rotated ~+5°
2. `concurrent payments?` — middle-right, ~−4°
3. `invoice already paid?` — lower, further right, ~+3°
4. `no event emitted` — lower still, right, ~−5°
5. `what if it fails?` — bottom, left side of the terminal, ~+4°

**Line below (lead):** **`The code looks reasonable.`** `The problem is, nobody knows if it's` `correct` (pink marker) `.`

## Layout
- A "top" slide: tag, heading, row (card + terminal), lead at the bottom.
- Row: gap about 60 px, top-aligned. The yellow card has a fixed width of about 520 px, the terminal takes the remaining width.
- The stamps are an absolute layer over the terminal (a `position: relative` container around the terminal). Staggered from top to bottom so they don't cover each other or fully hide the code. They must stay inside the slide.
- The terminal may have a typewriter effect, but in the final state all the code is visible.

## Components
- `section.top`, `span.tag.blue`, `h2` with `code`
- `.row`, `.card.yellow` with `span.label`, `p.small`
- `.term` (dark terminal) with `span.title`; highlighting: `.c` (comment), `.k` (keyword), `.f` (function), `.s` (string), `.n` (number/identifier). Optionally `.type` with `data-speed`.
- `.stamp-layer` with several `.stamp` (rotation via `--rot`)
- `p.lead` + `span.mark.pink`

## Acceptance criteria
- [ ] The ticket and the code are side by side; the code is readable and syntax-highlighted.
- [ ] All 5 stamps visible, rotated, and inside 1920×1080.
- [ ] "correct" on a pink marker.
- [ ] Fits in 1920×1080, no overflow.
- [ ] Speaker notes present.

## Speaker notes
**[7:30–9:00]**
Let's talk about spec-driven development. One example will stay with us for a while.
It's a made-up but typical ticket: "Add an endpoint for making payments".
The agent implemented it and opened a PR. Now what?
Is it good or bad? Who decides? You have to dig into the code and do a full code review just to check whether what the agent built works at all.
**It's not the agent's fault. The problem is what it got as input.**

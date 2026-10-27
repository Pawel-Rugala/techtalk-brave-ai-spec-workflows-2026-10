---
id: "17"
order: 17
title: "10× more code = 10× more bugs?"
section: "03 · AI Factory"
tag: "green"
must_include:
  - "10× more code ="
  - "Types · lint · schema"
  - "Contract tests"
  - "AI review vs spec"
  - "Human"
  - "We don't trust the agent."
  - "We trust the verification system around it."
---

# 17 · Trust pyramid

## Goal
A factory scales code — and bugs. Show that the answer is a layered verification system: from cheap, deterministic checks at the bottom up to the human at the very top. Each layer has a concrete example from PAY-123. Climax: the most important sentence of the talk.

## Content
**Tag:** `03 · AI Factory`

**Heading (h2, about 74px):** 10× more code = **10× more bugs?** — the second part in a pink marker.

**Pyramid** — six layers from the bottom (widest) to the top (narrowest). Each layer: name on the left + an example from PAY-123 (smaller, lighter text):

| layer (from bottom) | example | background | width |
|---|---|---|---|
| Types · lint · schema | amount is a number, not a string | paper | 1560px |
| Unit tests | amount ≤ remainingAmount | green | 1360px |
| Contract tests | 409 ALREADY_PAID | green | 1160px |
| Integration | 2 concurrent payments | blue, white text | 960px |
| AI review vs spec | PaymentCreated emitted? | pink | 760px |
| Human | does it make sense? | yellow | 560px |

**Black card, centered, centered text, heading font ~48px:**
“We don't trust the agent.⏎**We trust the verification system around it.**” — the second sentence in yellow.

## Layout
- `top` section: tag → heading → pyramid → card.
- Pyramid centered horizontally; in the HTML the layers may be written top to bottom, as long as visually the narrowest (Human) is on top and the widest (Types) at the bottom — keep the visual order from the table.
- Layers as wide, thick, bordered bars (neo-brutalism) of decreasing width, centered.
- Ink card below the pyramid, centered.

## Components
- `section.top`, `.tag.green`, `h2` with `.mark.pink`
- `.pyramid` > `.layer` (width and background inline), each layer with a `span.ex` holding the example
- `.card.ink` with a `p` in `var(--font-head)`, accent `color: var(--yellow)`

## Acceptance criteria
- [ ] Fits in 1920×1080 with no scrolling and no clipped text.
- [ ] Six layers with the given names, examples and colors; the human at the top.
- [ ] The sentence “We don't trust the agent. We trust the verification system around it.” in the black card, second part in yellow.
- [ ] Speaker notes in `<aside class="notes">`.

## Speaker notes
**[20:00–21:30]**
A factory scales code, but it scales bugs too. That's why, next to the code factory, you need a **verification factory**.
We build the pyramid from the bottom. First the deterministic, cheap stuff: types, linter, schemas. Above that, unit, contract and integration tests. Only at the very top, AI review against the spec, and the human.
The human's role changes: they don't check every line, they check **whether these safeguards make sense**.
**We don't trust the agent. We trust the verification system around the agent.**
I'll show you this in the demo at the end.

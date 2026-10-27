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
A factory scales code, and bugs along with it. Show that the answer is layered verification: cheap, deterministic checks at the bottom, the human at the very top. Each layer gets a concrete example from PAY-123. The climax is the most important sentence of the talk.

## Content
**Tag:** `03 · AI Factory`

**Heading (h2, about 74px):** 10× more code = **10× more bugs?** — the second part in a pink marker.

**Pyramid** — six layers, from the bottom (widest) to the top (narrowest). Each layer: name on the left plus an example from PAY-123 (smaller, lighter text):

| layer (from bottom) | example | background | width |
|---|---|---|---|
| Types · lint · schema | amount is a number, not a string | paper | 1560px |
| Unit tests | amount ≤ remainingAmount | green | 1360px |
| Contract tests | 409 ALREADY_PAID | green | 1160px |
| Integration | 2 concurrent payments | blue, white text | 960px |
| AI review vs spec | PaymentCreated emitted? | pink | 760px |
| Human | does it make sense? | yellow | 560px |

**Black card, centered, with centered text in the heading font (~48px):**
“We don't trust the agent.⏎**We trust the verification system around it.**” — the second sentence in yellow.

## Layout
- `top` section: tag → heading → pyramid → card.
- Pyramid centered horizontally. The HTML may list the layers top to bottom, as long as the narrowest (Human) appears on top and the widest (Types) at the bottom, matching the table's visual order.
- Layers are wide, thick, bordered bars (neo-brutalist), centered and decreasing in width.
- Ink card centered below the pyramid.

## Components
- `section.top`, `.tag.green`, `h2` with `.mark.pink`
- `.pyramid` > `.layer` (width and background inline), each with a `span.ex` for the example
- `.card.ink` with a `p` in `var(--font-head)`, accent `color: var(--yellow)`

## Acceptance criteria
- [ ] Fits in 1920×1080 with no scrolling and no clipped text.
- [ ] Six layers with the given names, examples and colors; Human on top.
- [ ] The black card reads “We don't trust the agent. We trust the verification system around it.”, with the second part in yellow.
- [ ] Speaker notes in `<aside class="notes">`.

## Speaker notes
**[20:00–21:30]**
A factory scales code, but it scales bugs too. So alongside the code factory, you need a **verification factory**.
We build the pyramid bottom-up. First the cheap, deterministic stuff: types, linter, schemas. Then unit, contract and integration tests. Only at the very top: AI review against the spec, and the human.
The human's role changes: they don't check every line, they check **whether these safeguards make sense**.
**We don't trust the agent. We trust the verification system around the agent.**
I'll show you this in action in the demo at the end.

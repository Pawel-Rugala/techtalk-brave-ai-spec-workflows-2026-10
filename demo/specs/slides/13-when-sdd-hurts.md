---
id: "13"
order: 13
title: "When SDD hurts"
section: "02 · Spec-driven development"
tag: "blue"
must_include:
  - "When SDD"
  - "hurts"
  - "Spec-waterfall"
  - "Spec drift"
  - "Spec for everything"
  - "A month later the spec lies."
  - "Match the spec to the risk."
---

# 13 · When SDD hurts

## Goal
Honestly show three SDD pitfalls (so it doesn't sound like a religion) — each with a symptom and a remedy. Closing rule: match the spec to the risk.

## Content
**Tag:** `02 · Spec-driven development` (blue variant)

**Heading (h2):** `When SDD` + `hurts` (pink marker)

**Three cards side by side — each: title (h3), symptom (bad), remedy (good):**

1. **`Spec-waterfall`**
   - symptom: `A week of writing the spec before anyone sees working code.`
   - remedy: `A small spec per feature, iteratively. A prototype can be input too.`

2. **`Spec drift`**
   - symptom: `The code changes, the spec doesn't. A month later the spec lies.`
   - remedy: `Update the spec in the same PR as the code. Review checks both.`

3. **`Spec for everything`**
   - symptom: `A spec for a typo in a label. Ceremony instead of value.`
   - remedy: `Write specs where there are business rules or risk.`

**Bottom card (yellow, heading font, about 46 px):** `Match the spec to the risk.`

## Layout
- A "top" slide: tag, heading, a row of three equal cards, yellow card at the bottom, left-aligned (padding about 22×34 px).
- Three cards of equal width in one row, equal height.
- In each card the symptom and the remedy are visually distinct (symptom = "bad" — e.g. a pink/red accent or a ✗ mark; remedy = "good" — a green accent or ✓), following the component's style in the theme.

## Components
- `section.top`, `span.tag.blue`, `h2` + `span.mark.pink`
- `.pitfalls` with three `.card`; in each `h3`, `p.bad`, `p.good`
- `.card.yellow` at the bottom

## Acceptance criteria
- [ ] Three cards in order: Spec-waterfall, Spec drift, Spec for everything.
- [ ] The symptom and the remedy in each card are visually distinct (bad vs good).
- [ ] "hurts" on a pink marker.
- [ ] Fits in 1920×1080, no overflow.
- [ ] Speaker notes present.

## Speaker notes
**[13:45–15:00]**
Three objections I hear most often:
**"This is waterfall all over again."** Yes, if you spend a week writing a spec before anyone sees working code. But agents write code ten times faster or more, so mocks, prototypes and PoCs are very cheap today. The answer is simple: **small specs, often, and ship code often.**
**"The spec will drift from the code."** Yes, if it lives outside the PR. We change the spec in the same PR as the code, and review checks both.
**"A spec for everything?"** No. A typo in a label doesn't need a spec. Payments do. We write specs where there are business rules or risk.

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
Be honest about three SDD pitfalls (so it doesn't sound like a religion), each with a symptom and a remedy. Closing rule: match the spec to the risk.

## Content
**Tag:** `02 · Spec-driven development` (blue variant)

**Heading (h2):** `When SDD` + `hurts` (pink marker)

**Three cards side by side — each with a title (h3), a symptom (bad) and a remedy (good):**

1. **`Spec-waterfall`**
   - symptom: `A week of writing the spec before anyone sees working code.`
   - remedy: `One small spec per feature, iterate. A prototype counts as input too.`

2. **`Spec drift`**
   - symptom: `The code changes, the spec doesn't. A month later the spec lies.`
   - remedy: `Update the spec in the same PR as the code. Review checks both.`

3. **`Spec for everything`**
   - symptom: `A spec for a label typo. Ceremony over value.`
   - remedy: `Write specs where there are business rules or risk.`

**Bottom card (yellow, heading font, about 46 px):** `Match the spec to the risk.`

## Layout
- A "top" slide: tag, heading, a row of three equal cards, and the yellow card at the bottom, left-aligned (padding about 22×34 px).
- Three cards in one row, equal in width and height.
- In each card the symptom and remedy are visually distinct, following the theme's component style: symptom = "bad" (e.g. a pink/red accent or ✗), remedy = "good" (a green accent or ✓).

## Components
- `section.top`, `span.tag.blue`, `h2` + `span.mark.pink`
- `.pitfalls` with three `.card`, each containing `h3`, `p.bad`, `p.good`
- `.card.yellow` at the bottom

## Acceptance criteria
- [ ] Three cards in order: Spec-waterfall, Spec drift, Spec for everything.
- [ ] In each card the symptom and remedy are visually distinct (bad vs good).
- [ ] "hurts" sits on a pink marker.
- [ ] Fits in 1920×1080, no overflow.
- [ ] Speaker notes present.

## Speaker notes
**[13:45–15:00]**

Here are the three objections I hear most:

**“This is waterfall all over again.”** Sure, if you spend a week writing a spec before anyone sees working code. But agents write code ten times faster, or more, so mocks, prototypes and PoCs are dirt cheap now. The answer is simple: **small specs, often, and ship code often.**

**“The spec will drift from the code.”** It will, if it lives outside the PR. We change the spec in the same PR as the code, and the review checks both.

**“A spec for everything?”** No. A typo in a label doesn't need a spec. Payments do. We write specs where there are business rules or risk.

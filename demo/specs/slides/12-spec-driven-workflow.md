---
id: "12"
order: 12
title: "Spec-driven workflow"
section: "02 · Spec-driven development"
tag: "blue"
must_include:
  - "Spec-driven workflow"
  - "Problem"
  - "Build loop · agent"
  - "repeats until the spec is met"
  - "SPEC = source of truth for every step"
  - "The human doesn't do every step."
  - "The human guards the gates."
---

# 12 · Spec-driven workflow

## Goal
Show the whole SDD flow: Problem → SPEC → the agent's build loop → PR, with two human gates (approving the spec, deciding on the PR) and the spec as the rail, the source of truth for every step. The human doesn't do the steps; the human guards the gates.

## Content
**Tag:** `02 · Spec-driven development` (blue variant)

**Heading (h2):** `Spec-driven workflow`

**Diagram — 4 columns joined horizontally by arrows (→):**
1. Node `Problem` with a small caption `ticket / idea`. Nothing below it.
2. Node `SPEC` (highlighted, "spec" variant). Below it, a gate: `✋ human` ⏎ `approves`
3. Build loop (the largest element): label `↻ Build loop · agent` (the ↻ spins); inside, a row of chips `plan` → `code` → `tests` → `review` → `fixes`; below the chips, a return arrow with the text `repeats until the spec is met`. Below the whole loop, a `vs spec` connector.
4. Node `PR`. Below it, a gate: `✋ human` ⏎ `decides`

**Rail below the diagram (yellow, full width):** `SPEC = source of truth for every step`

**Bottom card (black, heading font, about 42 px):**
`The human doesn't do every step.` ⏎ `The human guards the gates.` (second line in yellow)

## Layout
- A "top" slide: tag, heading, diagram (full width), yellow rail, black card left-aligned.
- Diagram: the top row holds the nodes and the loop; the bottom row holds what hangs underneath (gates and the "vs spec" connector), reaching down to the yellow rail so every step looks attached to the spec rail. The ✋ gates are styled differently from the plain connector, marking them as human checkpoints.
- The build loop column is the widest; the arrows between columns line up vertically with the middle of the nodes.
- Each column's bottom element has its own reach (the `--up` parameter: about 56 px under SPEC, 24 px under the loop, 64 px under PR).

## Components
- `section.top`, `span.tag.blue`, `h2`
- `.sdd` with `.sdd-col` columns, each with `.sdd-top` and `.sdd-bot` (variants `.gate` and `.link`, parameter `--up`); between columns, `.sdd-arrow` with `i.pipe-arrow`
- `.pipe-node` (variant `.spec`) with `small` for the caption
- `.build-loop` with `span.label` (containing `i.spin` for ↻), `.loop-steps` (`.chip` chips separated by `i` →), `.loop-back`
- `.sdd-rail` (yellow rail)
- `.card.ink` (black card), second line in `var(--yellow)`

## Acceptance criteria
- [ ] Order: Problem → SPEC → Build loop → PR, with arrows between them.
- [ ] Exactly two "✋ human" gates (under SPEC and under PR).
- [ ] The build loop holds 5 chips in the order plan, code, tests, review, fixes, plus the return text.
- [ ] The yellow rail is visible below the diagram across the full width.
- [ ] Fits in 1920×1080, no overflow.
- [ ] Speaker notes present.

## Speaker notes
**[12:15–13:45]**

You can sum up spec-driven development pretty simply.

It starts with **intent**. A human and AI turn it into a **spec**. When the spec is ready, the human **approves** it. That kicks off an agent that implements, tests, checks and fixes in a loop, and finally opens a pull request. **The merge is the human's call.**

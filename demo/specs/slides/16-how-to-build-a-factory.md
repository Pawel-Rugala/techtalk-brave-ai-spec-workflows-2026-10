---
id: "16"
order: 16
title: "How to build a factory? Examples"
section: "03 · AI Factory"
tag: "green"
must_include:
  - "How to build a factory?"
  - "GitHub = source of truth"
  - "Issue = spec"
  - "label: spec-ready"
  - "Team plugin"
  - "Production loop"
  - "event → agent → gate"
---

# 16 · How to build a factory? Examples

## Goal
Ground the idea of a factory: the simplest version can be set up tomorrow on GitHub and GitHub Actions. The top strip shows one complete event → agent → gate flow; the grid below shows six other variants of the same pattern.

## Content
**Tag:** `03 · AI Factory`

**Heading (h2, slightly smaller than standard, about 76px):** How to build a factory? **Examples** — “Examples” in a green marker.

**GitHub flow strip** — label above the strip: “GitHub = source of truth · Actions react to events”. Five steps joined by `→` arrows. Each step has three lines: event (mono, small), title (bold), description (small):

| event | title | description | kind |
|---|---|---|---|
| `issue` | Issue = spec | PO + dev refine it | spec |
| `label: spec-ready` | 🤖 Implementer | code + tests → PR | agent |
| `pull_request: opened` | 🤖 Reviewer | review vs spec in issue | agent |
| `label: ready-for-qa` | 🤖 QA agent | e2e, screenshots, report | agent |
| `review: approved` | ✋ Merge | human decides | human |

**Grid of 6 cards** (h3 title, a line of code, one sentence):

1. **Team plugin** · `/implement PAY-123` · “A dev invokes it, conventions shared by the team. The safest start.”
2. **Chat-ops (Slack)** · `PO writes → issue → 👍` · “PO and QA in the loop without opening GitHub. Emoji = approval.”
3. **Scheduled agents** · `cron · nightly` · “Dependencies, flaky tests, docs drift, nightly QA.”
4. **Production loop** · `Sentry alert → issue → PR` · “The agent reacts to a signal from production, not just a ticket.”
5. **Custom orchestrator** · `queue → agents` · “Agents connect, listen and pick up tasks from a queue.”
6. **…what's next?** · `event → agent → gate` · “The limit is your imagination. The pattern is always the same.” — this card is black (ink).

## Layout
- `top` section: tag → heading → GitHub strip (full width) → card grid (full width) below it.
- Strip: five equal-width steps in one row, arrows between them. The “spec” step highlighted yellow, agent steps blue/neutral, the human step green (consistent with the role colors used throughout the deck: spec = yellow, human = green).
- Grid: 3 columns × 2 rows, compact cards (small type, about 22–26px text), last card `ink`.
- The whole slide is dense — make sure it fits within 1080px of height.

## Components
- `section.top`, `.tag.green`, `h2` with `.mark.green`
- `.gh` > `span.label` + `.gh-flow` > `.gh-step.spec | .gh-step.agent | .gh-step.human` (containing `span.ev`, `b`, `small`) interleaved with `i.gh-arr`
- `.models` with six `.card` (the last one `.card.ink`), each card with `h3`, `code`, `p`

## Acceptance criteria
- [ ] Fits in 1920×1080 with no scrolling and no clipped text (especially the bottom row of cards).
- [ ] Five flow steps in the given order, with arrows between them.
- [ ] Six cards in a 3×2 grid, the last one black.
- [ ] Event texts in a monospace font.
- [ ] Speaker notes in `<aside class="notes">`.

## Speaker notes
**[18:00–20:00]**
What does it look like in practice? Here's the simplest factory you can set up tomorrow: GitHub as the source of truth and GitHub Actions reacting to events.
*[walk through the top strip]*
1. **The issue is the spec.** The PO and a developer refine it in the issue.
2. **The `spec-ready` label is the gate.** A human says “spec ready”, and an Action fires the implementer agent, which writes the code with tests and opens a PR.
3. **Opening the PR** is the next event. The reviewer agent starts and checks the code against the spec in the issue.
4. **The `ready-for-qa` label.** The QA agent runs the e2e tests, takes screenshots and posts a report.
5. **A human always does the merge.**
There's no magic here: events, labels and jobs you all already know.
Other variants:
• **Team plugin:** the developer invokes `/implement` themselves. That's the safest first step.
• **Chat-ops:** the PO writes on Slack, the agent creates an issue, and an emoji means approval.
• **Scheduled agents:** cron for maintenance work like dependencies, flaky tests or nightly QA.
• **Production loop:** a Sentry alert creates an issue and a PR with the fix.
• **Custom orchestrator:** agents pick up tasks from a queue.
The only limit is your imagination, but the pattern is always the same: **event → agent → gate.**

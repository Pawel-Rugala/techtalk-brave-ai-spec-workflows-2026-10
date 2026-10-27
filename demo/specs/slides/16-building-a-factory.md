---
id: "16"
order: 16
title: "Building a factory: examples"
section: "03 · AI Factory"
tag: "green"
must_include:
  - "Building a factory:"
  - "GitHub = source of truth"
  - "Issue = spec"
  - "label: spec-ready"
  - "Team plugin"
  - "Production loop"
  - "event → agent → gate"
---

# 16 · Building a factory: examples

## Goal
Make the factory concrete: the simplest version runs on GitHub and GitHub Actions, and you could set it up tomorrow. The top strip shows one complete event → agent → gate flow; the grid below shows six other variations on the same pattern.

## Content
**Tag:** `03 · AI Factory`

**Heading (h2, slightly smaller than standard, about 76px):** Building a factory: **examples** — “examples” (lowercase) in a green marker.

**GitHub flow strip** — label above the strip: “GitHub = source of truth · Actions react to events”. Five steps joined by `→` arrows. Each step has three lines: event (mono, small), title (bold), description (small):

| event | title | description | kind |
|---|---|---|---|
| `issue` | Issue = spec | PO + dev refine it | spec |
| `label: spec-ready` | 🤖 Implementer | code + tests → PR | agent |
| `pull_request: opened` | 🤖 Reviewer | review vs spec in issue | agent |
| `label: ready-for-qa` | 🤖 QA agent | e2e, screenshots, report | agent |
| `review: approved` | ✋ Merge | human decides | human |

**Grid of 6 cards** (h3 title, a line of code, one sentence):

1. **Team plugin** · `/implement PAY-123` · “A dev runs it; the team shares conventions. The safest start.”
2. **Chat-ops (Slack)** · `PO writes → issue → 👍` · “PO and QA in the loop without opening GitHub. Emoji = approval.”
3. **Scheduled agents** · `cron · nightly` · “Dependencies, flaky tests, docs drift, nightly QA.”
4. **Production loop** · `Sentry alert → issue → PR` · “The agent reacts to production signals, not just tickets.”
5. **Custom orchestrator** · `queue → agents` · “Agents connect, listen and pick up tasks from a queue.”
6. **…what's next?** · `event → agent → gate` · “The sky's the limit. The pattern never changes.” — this card is black (ink).

## Layout
- `top` section: tag → heading → GitHub strip (full width) → card grid (full width).
- Strip: five equal-width steps in one row, with arrows between them. The spec step is yellow, agent steps blue/neutral, the human step green (matching the role colors used throughout the deck: spec = yellow, human = green).
- Grid: 3 columns × 2 rows of compact cards (small type, about 22–26px text); the last card is `ink`.
- The slide is dense, so make sure everything fits within 1080px of height.

## Components
- `section.top`, `.tag.green`, `h2` with `.mark.green`
- `.gh` > `span.label` + `.gh-flow` > `.gh-step.spec | .gh-step.agent | .gh-step.human` (each with `span.ev`, `b`, `small`), separated by `i.gh-arr`
- `.models` with six `.card` (the last one `.card.ink`), each with `h3`, `code`, `p`

## Acceptance criteria
- [ ] Fits in 1920×1080 with no scrolling and no clipped text (watch the bottom row of cards).
- [ ] Five flow steps in the given order, with arrows between them.
- [ ] Six cards in a 3×2 grid, the last one black.
- [ ] Event texts in a monospace font.
- [ ] Speaker notes in `<aside class="notes">`.

## Speaker notes
**[18:00–20:00]**
What does it look like in practice? Here's the simplest factory you can set up tomorrow: GitHub as the source of truth and GitHub Actions reacting to events.
*[walk through the top strip]*
1. **The issue is the spec.** The PO and a developer refine it right there.
2. **The `spec-ready` label is the gate.** A human says “spec ready”, and an Action kicks off the implementer agent, which writes the code and tests and opens a PR.
3. **Opening the PR** is the next event. The reviewer agent kicks in and checks the code against the spec in the issue.
4. **The `ready-for-qa` label.** The QA agent runs the e2e tests, takes screenshots and posts a report.
5. **A human always hits merge.**
No magic here: just events, labels and jobs you all know already.
A few other variants:
• **Team plugin:** the developer runs `/implement` themselves. That's the safest first step.
• **Chat-ops:** the PO writes in Slack, the agent opens an issue, and an emoji means approval.
• **Scheduled agents:** cron for maintenance chores like dependencies, flaky tests or nightly QA.
• **Production loop:** a Sentry alert turns into an issue and a PR with the fix.
• **Custom orchestrator:** agents pick up tasks from a queue.
The only limit is your imagination, but the pattern is always the same: **event → agent → gate.**

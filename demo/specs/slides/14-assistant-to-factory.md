---
id: "14"
order: 14
title: "From assistant to factory"
section: "03 · AI Factory"
tag: "green"
must_include:
  - "From assistant to"
  - "factory"
  - "AI Assistant"
  - "AI Agent"
  - "AI Factory"
  - "The developer runs the whole process."
  - "The developer delegates the whole task."
  - "The developer designs the system that delivers."
---

# 14 · From assistant to factory

## Goal
Present three levels of working with AI as game levels: assistant (LVL 1), agent (LVL 2), factory (LVL 3). Each level gives the developer a different role: running the process, delegating a task, then designing the system that delivers.

## Content
**Tag:** `03 · AI Factory` (green variant)

**Heading (h2):** `From assistant to` + `factory` (green marker)

**Three level cards side by side:**

1. **LVL 1 card** (white)
   - level bar: `LVL 1` + HP meter at 1/3 (one full segment, two off)
   - h3: `AI Assistant`
   - monospace block: `Developer → AI → Developer`
   - small dimmed text: `ChatGPT · Claude · Copilot`
   - role: `The developer runs the whole process.`

2. **LVL 2 card** (white)
   - `LVL 2` + HP 2/3
   - h3: `AI Agent`
   - monospace block (a tree; keep the indentation and characters):
```
Task → Agent
  ├─ reads repository
  ├─ changes code
  ├─ runs tests
  ├─ fixes errors
  └─ opens a PR
```
   - role: `The developer delegates the whole task.`

3. **LVL 3 card** (yellow, the most important)
   - `LVL 3` + HP 3/3 (all full)
   - h3: `AI Factory`
   - monospace block (keep the indentation):
```
Jira → Spec Agent
     → Architect Agent
     → BE ∥ FE Agents
     → Testing Agent
     → Review Agent
     → Human approval
```
   - role: `The developer designs the system that delivers.`

## Layout
- A "top" slide: tag, heading, a row of three cards (~20 px below the heading).
- Three cards of equal width, top-aligned; "power" grows from left to right (HP bar, yellow highlight on LVL 3).
- Game-style LVL bar (pixel font) with HP segments as small squares; off segments are dimmed.
- Monospace blocks preserve whitespace (pre-wrap) so the trees stay intact.
- The role line at the bottom of each card is emphasized (e.g. bold) and ideally sits at the same height in all three cards.

## Components
- `section.top`, `span.tag.green`, `h2` + `span.mark.green`
- `.levels` with three `.card.level` (the third is `.card.level.yellow`)
- `.lvl` with `span.hp` containing `b` (full) and `b.off` (off)
- `h3`, `div.mono`, `p.small.muted`, `p.who`

## Acceptance criteria
- [ ] Three levels in order LVL 1 → LVL 2 → LVL 3, with HP 1/3, 2/3 and 3/3.
- [ ] The LVL 3 card is yellow.
- [ ] The monospace trees keep their indentation and the `├─`, `└─` and `∥` characters.
- [ ] Fits in 1920×1080, no overflow.
- [ ] Speaker notes present.

## Speaker notes
**[15:00–16:15]**

Back to the levels, this time in terms of tools.

**Level 1, the assistant:** ChatGPT, Claude, Copilot in your IDE. You run the whole process; AI makes suggestions.

**Level 2, the agent:** you hand it the whole task. It reads the repo, changes the code, runs the tests, fixes errors and opens a PR on its own. That's where most teams that take AI seriously are today.

**Level 3, the factory:** a ticket flows through specialized agents: spec, architect, backend and frontend in parallel, testing, review, and finally human approval. The developer doesn't write code anymore. **They design the system that delivers it.**

So let's talk about AI factories.

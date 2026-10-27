# AI Factory demo

The same talk, but only slides 01–05 are hand-made. Slides 06–22 are built from specs by
headless Claude Code sessions (Opus 5.5) while the talk is running. The full deck in the repo root remains the backup.

```
demo/
  specs/design-system.md   design documentation every builder gets
  specs/slides/NN-*.md     one spec per slide (06–22): Goal · Content · Layout · Components · Acceptance criteria · Speaker notes
  specs/live/23-*.md       the live example, triggered manually from the dashboard
  deck/                    demo deck: 5 hand-made slides + one slot per spec
  deck/slides/NN.html      ← builder agents write only here
  dashboard/               observability dashboard
  factory/server.mjs       one process: Vite + factory API (SSE)
  factory/worker.mjs       queue → `claude -p` per spec, phase tracking, gate, metrics
  factory/verify.mjs       Playwright headless gate
  factory/mcp.mjs          MCP server exposing the gate as the agents' verify_slide tool
  runs/<run>/              events.jsonl, state.json, reports/NN.json   (gitignored)
  shots/NN.png             latest gate screenshot per slide             (gitignored)
```

## Pipeline per spec

1. **HANDOVER** – the worker starts a fresh `claude -p --model claude-opus-5-5` session with the spec and the output path.
2. **DISCOVER** – the agent reads the design system, theme and hand-made slides. It has no shell and cannot read the backup `index.html` (permission deny rules).
3. **IMPLEMENT** – the agent writes `demo/deck/slides/NN.html`. It may only write there.
4. **VERIFY** – the agent calls the `verify_slide` MCP tool, checks the screenshot, and keeps fixing until the gate passes.
5. **REPORT** – the agent summarizes its work. The worker then re-runs the gate itself instead of taking the agent's word for it.
   - **Gate fails:** one fix round in the same session.
   - **Fails again:** status `fallback`; the hand-made slide from the backup deck is served instead, and the dashboard says so openly.

The gate checks:
- one `<section class="s-NN">` root
- speaker notes present
- no `<script>` and no external URLs
- CSS scoped to `.s-NN`
- no console/HTTP errors
- nothing outside 1920×1080
- no clipped text
- every `must_include` phrase from the spec visible
- for `must_animate: true` specs: a looping animation still runs with reduced motion on

## On stage

```bash
npm run demo          # http://localhost:5180/demo/dashboard/  ·  /demo/deck/  ·  / (backup deck)
```

- **Start** the factory with **▶ Start factory** on the dashboard (or `curl -XPOST localhost:5180/api/run`). Do it at 0:00; slide 06 is needed at ~5:00.
- **Present** from `/demo/deck/` (`S` opens speaker view).
  - Unbuilt slides show a live "in production" placeholder that still carries the speaker notes.
  - Built slides swap in place without a page reload.
- **Show observability** at the end on the dashboard:
  - the spec
  - model
  - tokens in/out/cache
  - cost
  - duration
  - trigger and finish time (Europe/Warsaw)
  - Playwright screenshot
  - full activity log
  - the agent's report
- **Live example:** press **▶ run** on row 23 (or `curl -XPOST localhost:5180/api/run/23`). The pixel-factory slide appears at the end of the demo deck.
- **If anything goes wrong**, switch to `/`, the full hand-made deck.

Other endpoints:
- `POST /api/stop` stops all sessions.
- `POST /api/reset` (dashboard **Reset**) stops everything, deletes all generated slides and clears the dashboard.
- `POST /api/run/NN` rebuilds one slide from scratch: the spec is re-read and the old file is deleted first.

Env vars:

| Variable | Default |
| --- | --- |
| `FACTORY_MODEL` | `claude-opus-5-5` |
| `FACTORY_CONCURRENCY` | `6` |
| `DEMO_PORT` | `5180` |

Requires a logged-in Claude Code (`claude` on PATH).

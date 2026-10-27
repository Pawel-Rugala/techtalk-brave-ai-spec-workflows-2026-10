# The End of Hand-Coding?

**Spec-driven development in modern teams** — a talk from Brave AI Szczecin (October 2026), about 25 minutes. Author: Paul Rugała · [LinkedIn](https://www.linkedin.com/in/paul-rugala).

> This is the English version. The original Polish version ("Koniec klepania kodu?") lives on the `main` branch.

If you were at the talk: this is the whole repo, including the **AI factory** that built slides live from specs during the talk. You can run it yourself.

## What's in here

The repo contains **two versions of the same talk**:

| | Full deck (backup) | Demo deck (AI factory) |
|---|---|---|
| Where | `index.html` in the repo root | `demo/deck/` |
| Who made the slides | all 22 slides by hand | slides 01–05 by hand, 06–22 **built live by AI agents** from the specs in `demo/specs/slides/` |
| What for | a stable version for presenting and exporting to PDF | a demonstration of the talk's thesis: a human writes the spec, the factory delivers |
| Start | `npm run dev` → http://localhost:5173 | `npm run demo` → http://localhost:5180/demo/dashboard/ |
| Requires | just Node | Node, Claude Code, Chrome / Playwright |

The full deck is also the safety net for the demo. If an agent fails to build a slide, the factory substitutes the hand-made slide from the backup and says so openly.

Also:
- `talk.md` — my raw notes for the talk,
- `talk-v2.md` — the polished speaker script; the same text is in the slide notes (`S` in the presentation).

## What the talk is about

- **00 · Starting point** — Bun rewritten in Rust in 11 days instead of 3 person-years; from sickle to a fleet of combines; where a team's effort goes today and what AI hasn't made cheaper.
- **01 · Mindset** — AI is not autocomplete; from writing code to designing intent.
- **02 · Spec-driven development** — the PAY-123 example (`POST /payments`), what a spec is, spec vs prompt, the spec as a contract, a workflow with human gates, and when SDD hurts.
- **03 · AI Factory** — from assistant to factory, what changes at scale, example factories (GitHub Actions, team plugin, chat-ops, scheduled agents, production loop, your own orchestrator), the trust pyramid.
- **Recap** — what to optimize instead of typing speed.

## Quick start

Requirements: **Node 20.19+** (or 22.12+).

```bash
git clone https://github.com/Pawel-Rugala/techtalk-brave-ai-spec-workflows-2026-10.git
cd techtalk-brave-ai-spec-workflows-2026-10
npm install
```

### 1. Full deck (hand-made)

```bash
npm run dev         # http://localhost:5173 with hot reload
npm run build       # static version in dist/
npm run preview     # preview the build (http://localhost:4173)
npm run export:pdf  # build + PDF into export/ (1 page = 1 slide)
```

Everything (reveal.js, fonts) is local, so no internet connection is needed.

The build has to be served (`npm run preview` or any static server). Opening `dist/index.html` straight from disk won't work, because Chrome blocks JS modules from `file://`.

The PDF export uses your local Chrome (different path: `CHROME_PATH=... npm run export:pdf`). Manually: open `…/index.html?print-pdf` in Chrome → Print → Save as PDF (margins: none, background graphics: on).

### 2. AI factory and demo deck

Additional requirements:
- **[Claude Code](https://docs.claude.com/en/docs/claude-code)** installed (`claude` on your `PATH`) and logged in. The factory runs real agent sessions, so it **uses tokens from your account**.
- **Chrome** or Playwright's browser: `npx playwright install chromium`.

```bash
npm run demo
```

A single process runs the Vite server and the factory API:

| URL | What it is |
|---|---|
| http://localhost:5180/demo/dashboard/ | factory dashboard: start, status, costs, logs |
| http://localhost:5180/demo/deck/ | demo deck that fills in live |
| http://localhost:5180/ | full deck (backup) |

1. Open the dashboard and click **▶ Start factory**.
2. Open the demo deck in a second tab. Slides that are still being built show an "in production" placeholder. Finished ones swap in on their own, without reloading the page.
3. For every slide the dashboard shows the spec, model, tokens, cost, time, the quality-gate screenshot, the activity log and the agent's report.
4. Row **23** is the live example: **▶ run** builds an extra slide from `demo/specs/live/23-pixel-factory.md`.
5. **Reset** stops everything and deletes the generated slides.

Details (API endpoints, environment variables, the exact gate rules) are in [`demo/README.md`](demo/README.md).

## How the factory works

This is exactly the pattern from the talk: **spec → agent → gate → human**.

```
 specs/slides/NN.md ──► queue ──► agent (claude -p) ──► slides/NN.html ──► gate (Playwright) ──► demo deck
        ▲                            │      ▲                                   │
   a human writes the spec           └──────┘ verify_slide in a loop       failed 2× → fallback
                                                                           to the hand-made backup slide
```

**Input: a spec, not a prompt.** Every slide has a file in `demo/specs/slides/` with the sections: Goal · Content · Layout · Components · Acceptance criteria · Speaker notes. Plus frontmatter with machine-checkable rules, e.g. `must_include` (phrases that must be visible) and `must_animate`. All agents also get a shared design system: `demo/specs/design-system.md`.

**The pipeline for each spec** (`demo/factory/worker.mjs`, 6 in parallel by default):
1. **HANDOVER** — a fresh, headless Claude Code session (`claude -p`, Opus 5.5 by default) gets the spec and the output path.
2. **DISCOVER** — the agent reads the design system, the theme and the hand-made slides.
3. **IMPLEMENT** — the agent writes `demo/deck/slides/NN.html`.
4. **VERIFY** — the agent calls the `verify_slide` MCP tool itself, looks at the screenshot and fixes things until it passes.
5. **REPORT** — the agent summarises what it did.

**We don't trust the agent, we trust the gate.** After the report, the worker runs the gate once more itself (`demo/factory/verify.mjs`, Playwright). Among other things it checks:
- a single `<section class="s-NN">` root and the presence of speaker notes,
- no `<script>` and no external URLs, CSS scoped to `.s-NN`,
- no console or HTTP errors,
- nothing sticks out of 1920×1080, no text is clipped,
- all `must_include` phrases are visible.

If the gate rejects a slide, the agent gets one fix round in the same session. If it fails a second time, the slide gets the `fallback` status and the deck shows the hand-made backup slide.

**Limited permissions.** Agents only have `Read`/`Glob`/`Grep` and the `verify_slide` tool, and they may write only to their own slide file. They have no shell, no internet and no subagents. They also can't peek at the answer key, i.e. the full deck's `index.html`.

**Observability.** Every run stores events, state and reports in `demo/runs/<run>/`, and screenshots in `demo/shots/` (both directories are in `.gitignore`). The dashboard reads them live over SSE.

## Presenting

1. Run `npm run dev` (or `npm run demo` for the factory version) and open the deck in Chrome.
2. Set the projector as an extended display (not mirrored).
3. `S` opens the speaker view with notes, a timer and the next slide. Keep it on the laptop.
4. Drag the presentation window to the projector and press `F`.

| Key | Action |
|---|---|
| `→` / `Space` | next slide |
| `←` | previous slide |
| `S` | speaker view (notes + timer) |
| `F` | fullscreen |
| `O` / `Esc` | overview of all slides |
| `B` / `.` | blank the screen |

## Repo structure

```
index.html                 full deck: 22 slides + speaker notes (<aside class="notes">)
src/main.js                reveal.js config (1920×1080, no fragments) and background decorations
src/theme.css              neobrutalist theme and slide components
src/factory.js|.css        pixel-art AI Factory (currently unused in the full deck)
src/typewriter.js          code-typing effect (currently not wired up)
scripts/export-pdf.mjs     PDF export (puppeteer-core + local Chrome)
talk.md, talk-v2.md        speaker notes: draft and final version

demo/
  specs/design-system.md   design system for all agents
  specs/slides/NN-*.md     one spec per slide (06–22)
  specs/live/23-*.md       live example, triggered manually
  deck/                    demo deck: 5 hand-made slides + a slot for each spec's slide
  deck/slides/NN.html      agents write here (and only here)
  dashboard/               observability dashboard
  factory/server.mjs       one process: Vite + factory API (SSE)
  factory/worker.mjs       queue → claude -p per spec, phases, gate, metrics
  factory/verify.mjs       quality gate (Playwright)
  factory/mcp.mjs          MCP server with the verify_slide tool for the agents
```

## Photos

The "From sickle to a fleet of combines" slide (`src/assets/harvest/`), all from Wikimedia Commons:

- `sickle.jpg` — [Traditional fonio harvest with a sickle, Natitingou](https://commons.wikimedia.org/wiki/File:Traditional_fonio_harvest_with_a_sickle,_Natitingou,_northern_Benin.jpg) · Crop Trust · CC BY-SA 4.0
- `reaper.jpg` — [Drie paarden trekken een maaimachine (zelfbinder)](https://commons.wikimedia.org/wiki/File:Drie_paarden_trekken_een_maaimachine_die_tevens_schoven_bindt_(zelfbinder),_Bestanddeelnr_190-1099.jpg) · Willem van de Poll / Nationaal Archief · CC0
- `combine.jpg` — [Combine in wheat field](https://commons.wikimedia.org/wiki/File:Combine_in_wheat_field.jpg) · Dan Kollmann · CC BY-SA 3.0
- `fleet.jpg` — [Комбайны в Ставропольском крае](https://commons.wikimedia.org/wiki/File:%D0%9A%D0%BE%D0%BC%D0%B1%D0%B0%D0%B9%D0%BD%D1%8B_%D0%B2_%D0%A1%D1%82%D0%B0%D0%B2%D1%80%D0%BE%D0%BF%D0%BE%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%BC_%D0%BA%D1%80%D0%B0%D0%B5.jpg) · Press service of the Presidential Envoy to the North Caucasian Federal District · CC BY 4.0

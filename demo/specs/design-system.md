# Design system — “The End of Hand-Coding?”

The source of truth for how every slide looks. You build **one slide** for an existing
reveal.js deck. It must be indistinguishable from the hand-made slides.

- Styles: `src/theme.css` (loaded globally — every class below is already available).
- Language on slides: **English**. Code and API names stay as written in the spec.
- Style: **neobrutalism** — cream dotted paper, thick ink borders, hard offset shadows,
  flat saturated color blocks, chunky display type.

---

## 1. Canvas

| Property | Value |
|---|---|
| Slide size | **1920 × 1080 px**, reveal.js, `margin: 0`, no scaling tricks |
| Section padding | `110px 130px 90px` → content box **1660 × 880 px** (x 130–1790, y 110–990) |
| Default flow | `section` is a flex **column**, `gap: 40px`, `justify-content: center` |
| `section.top` | same, but content starts at the top (`justify-content: flex-start`) — use for every slide with a heading + body |
| Default (no class) | vertically centered — use for statement slides (big quote, recap) |
| `section.dark` | ink slide; also add `data-background-color="#111111"` (and `data-state="no-floaters"`). Headings turn cream; `.lead` turns `#cfc8b8`; use `var(--cream)` / `var(--yellow)` for text |
| `section.title-slide` | title/thanks only (h1 176px) — hand-made slides, do not reuse |
| Base font | `.reveal` = Space Grotesk 40px, `line-height: 1.35` on `p` |
| Text alignment | left by default (`.center` to center a block) |

The section tag (`.tag`) is absolutely positioned at `top: 44px; left: 130px` — it sits in
the top padding, it does not take part in the flex flow.

Everything must stay inside 1920 × 1080; keep real content inside the padded content box.
Absolutely positioned decorations (stamps etc.) may go into the padding, never past the edge.

### Motion

- **Fragments are disabled globally** (`fragments: false`) — every element on the slide is visible
  at once. Fragment classes are still allowed (they get the end state immediately).
- `html.static-build` is always on: entrance animations (`.enter`, `.fragment.*`, `.draw`,
  `.pipe-arrow`, effort morph) jump to their end state with 0s duration.
- Motion classes that exist (all **optional**, purely decorative):
  - `.enter` (+ `style="--i: N"` stagger), `.enter.slam-e`
  - `.fragment.rise | .pop | .slam | .glitch | .stamp-in` (stamp-in uses `--rot`)
  - `.draw` on an `<svg>` whose `line/path` have `--len` and `--i`
  - `.strike-line` (`.auto` = strikes through when the slide appears; `.late` = inside a visible fragment)
  - `.slot` (cycling words), `.caret` (blinking cursor), `.glitch-text` (needs `data-text`)
- Ambient loops (caret, glitch, slot, spin, floaters) keep running. Never rely on motion to
  make content readable — the slide must read correctly as a still screenshot.

---

## 2. Tokens (`:root`)

| Token | Value | Role |
|---|---|---|
| `--cream` | `#fff6e5` | page background (with 36px dot grid), text on ink |
| `--paper` | `#ffffff` | card / chip / node background |
| `--ink` | `#111111` | text, borders, shadows, ink cards |
| `--ink-soft` | `#3b3b3b` | secondary text (`.lead`, `small`) |
| `--muted` | `#8a8374` | de-emphasised text (`.muted`) |
| `--yellow` | `#ffd23f` | primary accent: highlight, key card, spec |
| `--pink` | `#ff5ca8` | warning / punchline accent, ink-card shadow |
| `--blue` | `#3a86ff` | agents / machines (text on blue = `#fff`) |
| `--green` | `#06d6a0` | verification / success / human approval |
| `--red` | `#ef476f` | stamps, strike-through, errors |
| `--purple` | `#8338ec` | rare decorative accent |
| `--night` | `#1a1433` | rare dark accent |
| `--border` | `4px solid var(--ink)` | default thick border |
| `--shadow` | `10px 10px 0 var(--ink)` | card shadow |
| `--shadow-sm` | `6px 6px 0 var(--ink)` | smaller blocks, bars |
| `--font-head` | Archivo Black | headings, punchlines, big numbers |
| `--font-body` | Space Grotesk | body text |
| `--font-mono` | JetBrains Mono | code, chips, nodes, labels with data |
| `--font-pixel` | Silkscreen | tags, labels, kickers, HUD text (uppercase-ish, small) |
| `--snap` | `cubic-bezier(0.2, 1.6, 0.4, 1)` | overshoot easing |

Other fixed colors in use: terminal bg `#15121f`, terminal text `#e8e3f5`, old-row bg `#efe6d4`,
effort segment `#f3ead6`, dark green text `#089e76`.

There is **no radius token** — corners are square. (Only decorative floaters are round.)

### Section → tag color

| Section | Tag markup |
|---|---|
| `00 · Starting point` | `<span class="tag">` (pink shadow, default) |
| `01 · Mindset` | `<span class="tag yellow">` |
| `02 · Spec-driven development` | `<span class="tag blue">` |
| `03 · AI Factory` | `<span class="tag green">` |
| `Recap` | `<span class="tag">` (default) |

---

## 3. Typography

| Element | Font | Size (theme) | Seen in deck |
|---|---|---|---|
| `h1` | head | 150px | title slides only (176px) |
| `h2` | head | 92px | 68–92px; long titles get inline `style="font-size: 68–84px"` |
| `h3` | head | 52px | 32–52px inside components |
| `.huge` | head, `line-height: 1` | 128px | 64–120px statements |
| `.lead` | body, ink-soft | 46px, max-width 1400px | intro/sub line under h2 |
| `p` | body | 40px base | 23–44px depending on density |
| `.small` | — | 30px | metadata lines |
| `.muted` | — | color only | hints, sources |
| `.card .label` | pixel 22px on ink | — | label tab on a card's top edge |
| `code`, `.mono` | mono | inherits | API names, `POST /payments` (`font-size: 0.85em` in h2) |
| Punchline in a card | head, inline style | 40–58px, `line-height: 1.1–1.2` | yellow/ink cards at slide bottom |

Inline emphasis:

```html
<span class="mark">Hand-Coding</span>        <!-- yellow highlighter -->
<span class="mark green">factory</span>   <!-- also .pink, .blue -->
<span class="strike-line auto">40-page Word doc</span>  <!-- red strike through -->
<strong>…</strong>                          <!-- 700 weight -->
```

Typical headline pattern: plain words + **one** `.mark` on the key phrase.
`<h2>A spec is a <span class="mark">contract</span></h2>`

Minimum readable size on a slide: **24px** (19–22px only for tiny labels/badges/credits).

---

## 4. Component catalog

All snippets are minimal; add your own text. "Slide-specific" families were designed for one
slide — reuse them **only** when your spec asks for that slide.

### 4.1 Generic building blocks

**Tag** — section chip, top-left. Exactly one per slide (except dark/title slides).
```html
<span class="tag blue">02 · Spec-driven development</span>
```

**Card** — the main container. Variants: `yellow`, `pink`, `blue` (white text), `green`, `ink` (cream text, pink shadow). Optional `.label` tab.
```html
<div class="card yellow">
  <span class="label">JIRA · PAY-123</span>
  <p style="font-size: 36px">Card content.</p>
</div>
<div class="card ink" style="align-self: flex-start; padding: 22px 34px">
  <p style="font-family: var(--font-head); font-size: 44px; line-height: 1.15">
    Punchline sentence.<br /><span style="color: var(--yellow)">Second line in the accent color.</span>
  </p>
</div>
```
Punchline cards at the bottom of a slide use `align-self: flex-start` so they hug their text.

**Layout helpers** — `.row` (flex row, gap 48px, stretch), `.row.center`, `.col` (flex column, gap 28px), `.grow` (flex: 1), `.center` (center text + items).
```html
<div class="row" style="gap: 60px; align-items: flex-start">
  <div class="col" style="width: 560px; flex: none">…</div>
  <div class="card blue grow">…</div>
</div>
```

**Chips** — mono 30px bold tags with small shadow. Variants `yellow|pink|blue|green`.
```html
<div class="chips"><span class="chip">plan</span><span class="chip pink">↻ loop</span></div>
```

**Stamp** — rotated red rubber stamp (head font, uppercase). Variants `green`, `ink`. Set rotation with `--rot` + `transform`.
```html
<span class="stamp ink" style="--rot: -4deg; transform: rotate(-4deg)">= faster typing</span>
```
Over code: wrap in `.stamp-layer` (absolute, inset 0) and position each stamp absolutely.
```html
<div style="position: relative">
  <div class="term">…</div>
  <div class="stamp-layer"><span class="stamp" style="left: 480px; top: 222px; --rot: -4deg">concurrent payments?</span></div>
</div>
```

**Term** — terminal / code window with traffic-light bar. `.light` = white editor. `white-space: pre` — the content's line breaks are literal, so don't indent the inner text with your HTML.
Syntax spans: `.k` keyword, `.s` string, `.f` function, `.c` comment, `.n` number/name; markdown: `.h1md`, `.h2md`; `.fix` = small green marker pill.
```html
<div class="term light" style="font-size: 25px"><span class="title">specs/create-payment.md</span><span class="h1md"># Create Payment</span>

<span class="h2md">## Goal</span>
User can create a payment for an existing invoice.</div>
```

**List** — bulleted list for cards: `.list` (▸), `.list.x` (red ✗), `.list.ok` (green ✓).
```html
<ul class="list ok"><li>small specs</li><li>reviewed together with the code</li></ul>
```

**Flow** — vertical mini-diagram of nodes with down arrows. Node variants `yellow|pink|blue|green|ghost` (dashed, muted).
```html
<div class="flow">
  <div class="node">Developer</div><div class="arrow"></div>
  <div class="node ghost">"write this function"</div><div class="arrow"></div>
  <div class="node blue">AI agent</div>
</div>
```

**Pipe node + arrow** — horizontal process boxes. Variants `spec` (yellow, larger), `agent` (blue), `human` (green); `<small>` subtitle. `.pipe-arrow` needs `--i` (it grows from 0 width).
```html
<div class="pipe-row">
  <div class="pipe-node">Problem<small>ticket / idea</small></div>
  <i class="pipe-arrow" style="--i: 0"></i>
  <div class="pipe-node spec">SPEC</div>
</div>
```

**Split2** — two equal cards side by side, with `.kicker` pixel label.
```html
<div class="split2">
  <div class="card"><span class="kicker">CHEAP</span><h3>Code</h3><p>…</p></div>
  <div class="card yellow"><span class="kicker">EXPENSIVE</span><h3>Decisions</h3><p>…</p></div>
</div>
```

**Bars** — labeled horizontal progress bars (`--w` width, `--c` color, `--i` stagger; `.hot` = red label).
```html
<div class="bars">
  <div class="bar hot"><span>Review</span><div class="track"><i style="--w: 80%; --c: var(--pink); --i: 0"></i></div></div>
</div>
```

**Acts / agenda-line**, **voices + funnel**, **monday**, **anti** — available generic grids (3-col cards, numbered cards, 2×2 anti-pattern cards with `.num` and `.quote`). Use only if the spec calls for that shape.

### 4.2 Slide-specific families

**`.vs` — old vs new table** (slide “From writing code → to designing intent”). Grid `1fr 90px 1fr`.
```html
<div class="vs">
  <div class="vsrow"><div class="head muted">OLD MINDSET</div><div></div><div class="head">NEW MINDSET</div></div>
  <div class="vsrow"><div class="old">How do I code this?</div><div class="to">→</div><div class="new">What exactly do we want to achieve?</div></div>
</div>
```

**`.radial` — hub and satellites** (slide “A spec is a contract”). 1660×520 box; SVG lines from center (830,260); satellites positioned with `left/top` = line endpoints (they're centered via `translate`).
```html
<div class="radial" style="align-self: center">
  <svg viewBox="0 0 1660 520" class="draw" fill="none" stroke="#111" stroke-width="5">
    <line x1="830" y1="260" x2="250" y2="70" style="--i: 0; --len: 640" />
  </svg>
  <div class="hub card yellow">spec.md</div>
  <div class="sat chip" style="left: 250px; top: 70px">implementation</div>
</div>
```

**`.sdd` — spec-driven workflow** (slide “Spec-driven workflow”). Columns of `.sdd-top` (node) over `.sdd-bot` (`.gate` = green “✋ human” badge on a stem, `.link` = dashed line labeled “vs spec”; `--up` extends the stem upward), separated by `.sdd-arrow > .pipe-arrow`, followed by the `.sdd-rail` yellow bar. The middle column holds a `.build-loop`.
```html
<div class="sdd">
  <div class="sdd-col"><div class="sdd-top"><div class="pipe-node spec">SPEC</div></div>
    <div class="sdd-bot gate" style="--up: 56px"><span>✋ human<br />approves</span></div></div>
  <div class="sdd-arrow"><i class="pipe-arrow"></i></div>
  <div class="sdd-col"><div class="sdd-top"><div class="build-loop">
      <span class="label"><i class="spin">↻</i> Build loop · agent</span>
      <div class="loop-steps"><span class="chip">plan</span><i>→</i><span class="chip">code</span></div>
      <div class="loop-back"><span>repeats until the spec is met</span></div>
    </div></div>
    <div class="sdd-bot link" style="--up: 24px"><span>vs spec</span></div></div>
</div>
<div class="sdd-rail">SPEC = source of truth for every step</div>
```

**`.pitfalls` — 3 problem/solution cards** (slide “When SDD hurts”). `.bad` (grey, problem) then `.good` (bold, dashed top, green “→”).
```html
<div class="pitfalls">
  <div class="card"><h3>Spec drift</h3><p class="bad">The code changes, the spec doesn't.</p><p class="good">Change the spec in the same PR.</p></div>
</div>
```

**`.levels` — 3 level cards** (slide “From assistant to factory”). `.lvl` pixel header with `.hp` health squares (`b.off` = empty), `.mono` pre-formatted tree, `.who` dashed footer.
```html
<div class="levels">
  <div class="card level">
    <div class="lvl">LVL 1 <span class="hp"><b></b><b class="off"></b><b class="off"></b></span></div>
    <h3>AI Assistant</h3>
    <div class="mono">Developer → AI → Developer</div>
    <p class="who">The developer drives the whole process.</p>
  </div>
</div>
```

**`.scale` — 2×2 numbered cards** (slide “What changes at scale?”). `.num` ink badge top-right.
```html
<div class="scale">
  <div class="card yellow"><span class="num">01</span><h3>The bottleneck is people</h3><p>… <strong>not code.</strong></p></div>
</div>
```

**`.gh` + `.models` — GitHub event flow + example cards** (slide “Building a factory: examples”). `.gh-step` variants `spec|agent|human`, `.ev` = ink event badge, `.gh-arr` arrows; `.models` 3-col grid of small cards with `h3`, `code`, `p`.
```html
<div class="gh">
  <span class="label">GitHub = source of truth · Actions react to events</span>
  <div class="gh-flow">
    <div class="gh-step spec"><span class="ev">issue</span><b>Issue = spec</b><small>PO + dev refine it</small></div>
    <i class="gh-arr">→</i>
    <div class="gh-step agent"><span class="ev">label: spec-ready</span><b>🤖 Implementer</b><small>code + tests → PR</small></div>
  </div>
</div>
<div class="models">
  <div class="card"><h3>Team plugin</h3><code>/implement PAY-123</code><p>…</p></div>
</div>
```

**`.pyramid` — layered pyramid** (slide “10× more code…”). `column-reverse`: the **first** `.layer` is the **bottom**. Width and background set inline; `.ex` = example text.
```html
<div class="pyramid">
  <div class="layer" style="width: 1560px; background: var(--paper)">Types · lint · schema<span class="ex">amount is a number</span></div>
  <div class="layer" style="width: 560px; background: var(--yellow)">Human<span class="ex">does it make sense?</span></div>
</div>
```

**`.slot` + `.durable-stack`** (slide “The agent is replaceable / The spec is durable”). `.slot` cycles its `span`s (max 4).
```html
<p style="font-size: 40px; font-weight: 700">Today's implementer:
  <span class="slot"><span>Claude</span><span>Codex</span><span>Gemini</span><span>???</span></span></p>
<div class="chips durable-stack"><span class="chip yellow">spec</span><span class="chip green">tests</span></div>
```

**`.arc` — recap chain of cards with arrows** (slide “Recap”). `.k2` pixel number; `.arc.three` = stretched variant.
```html
<div class="arc">
  <div class="card"><span class="k2">01</span><h3>AI</h3><p>speeds things up</p></div>
  <span class="arr">→</span>
  <div class="card yellow"><span class="k2">02</span><h3>Spec</h3><p>ends the guessing</p></div>
</div>
```

**`.optimize.v2` — 4 lever cards** (slide “Instead, optimize:”). `.ico` pixel icon, `.q` question, `.ex` mono example pinned to the bottom with dashed rule.
```html
<div class="optimize v2">
  <div class="card yellow"><span class="ico">&gt;_</span><h3>Intent</h3>
    <p class="q">What are we building, and why?</p><p class="ex">“Add payment endpoint” → spec PAY-123</p></div>
</div>
```

**Hand-made only (slides 1–5), do not reuse:** `.title-slide` (+ `.deco`, `.speaker`, `.avatar`, `.thanks-slide`, `.repo-link`, `.qr-card`), `.bun*`, `.effort*` / `.eseg`, `.hv*` (harvest chart + photos), `.glitch-text` card on “AI has cut the cost of implementation.”.

**Not available to you:** the JS pixel factory (`.factory*`, `data-factory`) — it needs JavaScript, and slides may not contain scripts. Any pixel animation must be pure SVG/CSS (see Rules).

---

## 5. Rules

### Do
- **Neobrutalism:** `var(--border)` (or 3px ink for small items), hard offset shadows (`--shadow`, `--shadow-sm`, `4px 4px 0 var(--ink)`), flat fills from the tokens, square corners.
- Reuse existing classes first; inline `style` for one-off sizes/positions is normal in this deck.
- One heading (`h2`) per `section.top` slide, one `.mark` in it, then a body, then (often) a punchline card.
- At most ~**one accent per element** (a yellow card doesn't also get a pink mark *and* a stamp).
- English typography: quotes "…" or “…” (never „…”), en dash for ranges (`0:00–0:30`), em dash — as a pause, `·` as a separator, `→` for flow, `≠`, `≤`, `×` (not `x`).
- Keep body text ≥ **24px**; titles must fit on ≤ 2 lines.
- Images only from `/src/assets/…` (e.g. `/src/assets/harvest/fleet.jpg`).
- Pixel art: `font-family: var(--font-pixel)`, SVG `rect`s with `shape-rendering="crispEdges"`, CSS `steps()` animations.
- Reduced motion: the theme stops all looping animations when the OS has "Reduce Motion" on. If the spec says the motion **is** the content (`must_animate: true`), put `data-motion="always"` on the `<section>` and do not add your own `prefers-reduced-motion` block. The gate then renders the slide with reduced motion on and fails if no looping animation is running.

### Don't
- No gradients (except the existing `.mark`), no blur, no soft/large-radius rounded cards, no drop-shadow glow, no opacity-faded overlays as design.
- No external URLs of any kind: no CDN, no web fonts, no remote images, no `<link>`, no `<iframe>`. The deck runs **offline**.
- No `<script>`, no inline event handlers (`onclick` …).
- No new fonts, no new colors outside the token list (other than the fixed ones in §2).
- Don't change or override global classes; don't target `section` / `.reveal` / `body` in your CSS.
- Don't invent content: copy text exactly from the spec.

### Extra CSS
Only if existing classes are not enough:
- One `<style>` element **inside** your `<section>`.
- Give the section a class `s-<id>` (e.g. `class="top s-07"`) and prefix **every** selector with it: `.s-07 .grid { … }`, `@keyframes s07-blink { … }` (prefix keyframe names too).
- Use tokens: `var(--ink)`, `var(--yellow)`, `var(--font-mono)`, `var(--border)` …

---

## 6. Output contract (one slide file)

- The file contains **exactly one** root element: `<section …> … </section>`. Nothing before or after it (no doctype, no `<html>`, no comments outside).
- The section includes the right `class` (`top` for heading slides, `s-<id>` if you add CSS) and, for dark slides, `data-background-color="#111111" data-state="no-floaters"`.
- First child: the section `.tag` (except dark/title slides).
- Last child: the speaker notes from the spec:
  ```html
  <aside class="notes">
    <p><b>[mm:ss–mm:ss]</b> …</p>
    <p>…</p>
  </aside>
  ```
- Fits 1920 × 1080 with no overflow, no clipped text, no element outside the slide.
- Example skeleton:
  ```html
  <section class="top">
    <span class="tag green">03 · AI Factory</span>
    <h2>What changes <span class="mark green">at scale?</span></h2>
    <div class="scale">…</div>
    <aside class="notes"><p><b>[16:15–18:00]</b> …</p></aside>
  </section>
  ```

---
id: "22"
order: 22
title: "Thanks! Questions?"
section: "Q&A"
tag: "none"
must_include:
  - "Thanks!"
  - "Questions?"
  - "Paul Rugała"
  - "Full deck:"
  - "github.com/Pawel-Rugala/techtalk-brave-ai-spec-workflows-2026-10/tree/feat/eng-version"
  - "LinkedIn · /in/paul-rugala"
---

# 22 · Thanks! Questions?

## Goal
The closing Q&A slide: a thank-you, the speaker's name, a link to the full deck in the repo and a LinkedIn QR code so the audience can connect.

## Content
**No tag.**

- **Title (h1, huge):** “Thanks!⏎**Questions?**” — “Questions?” in a pink marker.
- **Speaker:** avatar (square placeholder) + “Paul Rugała”.
- **Repo link:** label “Full deck:” + code in a yellow box: `github.com/Pawel-Rugala/techtalk-brave-ai-spec-workflows-2026-10/tree/feat/eng-version`
- **QR card (top-right corner):** image `/src/assets/linkedin-qr.svg` (alt: “QR code: linkedin.com/in/paul-rugala”) + caption “LinkedIn · /in/paul-rugala”.

## Layout
- Title-slide layout: section with classes `title-slide thanks-slide` and `data-state="title"` (same background and layout as the opening slide).
- Large title on the left, the speaker below it, then the repo link.
- QR card absolutely positioned in the top-right corner (about 380px wide): a white card with a thick border and shadow, caption below the code.
- Elements enter one by one (`enter` with `--i`: speaker 4, link 5, QR card 6; the title uses the `slam-e` effect).
- No extra decorations (don't add a `.deco` block).

## Components
- `section.title-slide.thanks-slide[data-state="title"]`
- `h1.enter.slam-e` with `span.mark.pink`
- `.speaker.enter` > `span.avatar` + name
- `.repo-link.enter` > `span.repo-label` + `code`
- `.qr-card.card.enter` > `img` + `.qr-caption`
(all `.thanks-slide …` styles already exist in theme.css)

## Acceptance criteria
- [ ] Fits in 1920×1080 with no scrolling and no clipped text; the full repo URL is visible on one line, not cut off.
- [ ] QR code loads from `/src/assets/linkedin-qr.svg` (local, no external URLs) and is legible and undistorted.
- [ ] Speaker notes (Q&A) in `<aside class="notes">`.

## Speaker notes
And now, proof that this actually works. When this talk started, I kicked off my AI factory.
This whole time, the factory has been taking in specs, and agents have been building the next slides live. Of course, I had a backup in case anything went wrong. I also built a small dashboard so you can all see what's happening.
And finally, to prove I'm not making this up: **we'll build one slide together.**
**Q&A** — likely questions and short answers:
• “Which tools?” — Claude Code, Codex, Cursor; for specs: Spec Kit, Kiro, BMAD or your own commands. The tool is secondary; the habit of writing specs is what matters.
• “What about juniors? How are they supposed to learn?” — By reading and verifying the agent's code, writing specs and tests. It's an open problem, and worth discussing with your team.
• “How much does it cost?” — Tokens are cheap compared to an hour of a developer's time. What's expensive is rework and bugs in production, which is why we measure the line.
• “Isn't this waterfall?” — Not if the spec is small and iterative. Match the spec to the risk.
• “Security?” — The agent has junior-level permissions: no production access, secrets outside the repo, and a human always hits merge.

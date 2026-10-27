# The End of Hand-Coding? — speaker notes (v2)

> Text for speaking, not for reading off a page. Bold = vocal emphasis. `[in brackets]` = stage directions.

---

## Slide 1 — Opening and about me

Hi, I'm Paul. In the past year, **I haven't written a single line of code**. Agents wrote all of it.

AI is changing how we work. It's changing how teams work together, too. That's what today is about: how to make that shift in your own team.

A quick word about me. I've been in this industry since 2012. I've worked at small product companies, at software houses, and at corporations with around 100,000 people. I've been a frontend dev, a backend dev, a solution architect, a tech lead, and even an EMEA BI Director. Not necessarily in that order.

---

## Slide 2 — Bun in 11 days

This July, Jarred Sumner — the creator of Bun, who's now at Anthropic — announced he'd rewritten all of Bun in Rust. **By himself. In 11 days.**

Anthropic's internal estimate for a job like that? Three senior engineers, one full year.

`[point at the bars]` The top bar is three person-years: roughly 750 working days. The bottom one is 11 person-days. You can barely see it. That's about **70 times faster**.

We can ignore this. We can nitpick it. But the best teams in the world are showing that what used to take three person-years now takes one person 11 days. And if we ignore that, **we're just toying with AI while others go all in.**

---

## Slide 3 — The analogy: the harvest

Relax, this isn't another tip from an American productivity book. I wanted an analogy that puts us all on the same page. I picked **the harvest**.

- **Level 1:** every stalk goes through the farmer's hands. Just like every line of code used to go through ours.
- **Level 2:** the machine does the heavy lifting, but a human guides every step. Output jumps by an order of magnitude. That's an **AI assistant**, and that's where most teams are today.
- **Level 3:** one machine cuts, threshes and cleans. The human steers, but doesn't do the work anymore. Another order of magnitude. That's an **AI agent**.
- **Level 4:** one operator oversees several machines at once, and they follow planned routes on their own. That's an **AI factory**, and that's where we're heading.

None of these leaps came from the farmer swinging the scythe faster. Each time, **the way of working** changed, and each time people had to learn something new. Anyone can swing a scythe. Running a fleet of combines takes skill. Same with AI: **anyone can use an assistant, but a factory has to be designed.**

One more thing: the farmers who adapted didn't lose their jobs. People are still needed on the farm; they just do something different. Pretty much the only job that disappeared completely is the elevator operator.

---

## Slide 4 — Where does our effort go

So where does all our effort go today?

Each bar is the whole team's work on one feature. The proportions are illustrative. It's the direction that matters, not the percentages.

**Before AI**, coding was the biggest chunk. That's where the time went, and that's where we sweated.

**In the AI era**, it all comes down to **what** we want to build: what the requirements are, what should happen, and what must never happen. Writing code is cheap, and the agent does it. The other big chunk is **verification**: did the agent build exactly what we expected?

---

## Slide 5 — AI doesn't free us from thinking

Writing code is cheap and fast now. But bad requirements and bad decisions haven't gotten any cheaper. AI can generate **ten times more terrible code**, and do it really fast.

AI hasn't freed us from thinking. A human is still at the helm, just standing somewhere else.

---

## Slide 6 — Prompting is not a workflow

A lot of teams still use AI as a chat: “implement the specification pattern”, “now do this”, “now fix that”.

In that setup, the human is just an **agent operator**, and the only gain is faster typing.

Instead, define a **workflow** where the agent implements, tests and fixes in a loop on its own, and the human steps in only where they're actually needed.

---

## Slide 7 — The new unit of work

Developers don't have to rack their brains anymore over how to code something, or whether it follows every SOLID principle.

They should focus on **what** they want to achieve and **which rules** have to hold.

Code is no longer the unit of work. **The spec is.**

---

## Slide 8 — Example: a payments endpoint

Let's talk about spec-driven development. I'll stick with one example for the next few slides.

It's a made-up but typical ticket: “Add an endpoint for making payments”.

The agent implemented it and opened a PR. Now what?

Is it good? Is it bad? Who decides? You have to dig into the code and do a full code review just to find out whether what the agent built works at all.

**It's not the agent's fault. The problem is what we gave it.**

---

## Slide 9 — What is a spec

A spec is **not** a 40-page Word document. It's a short markdown file in the repo, next to the code, and it gets reviewed just like code.

It has to be concrete enough that another developer or an agent can build it **without asking twenty questions**.

`[point at the right side]` On the right is an example an agent generated. I'm not saying it's perfect, but it's still way more concrete than “add a new endpoint”.

---

## Slide 10 — Less guessing

On the left is what we usually throw at an agent today: “Add payment endpoint”. The agent has to guess the rest.

On the right, the same ticket, with nothing left unsaid. Every line closes one specific gap:

- **Preconditions** (status OPEN) → we won't pay an invoice that's already paid.
- **Idempotency** (clientRequestId) → no double payments.
- **Concurrency** (optimistic lock) → concurrent payments won't overwrite each other.
- **Side effects** (PaymentCreated) → the event is guaranteed to go out.
- **Failure modes** → we know what should happen when something breaks.

`[yellow card]` AI doesn't need more creative prompts. **It needs less guessing.** Every gap in the spec is a spot where the agent guesses. And it guesses with total confidence.

---

## Slide 11 — One spec, many uses

This is more interesting than “let's write better prompts”. A single `spec.md` file is the source for everything around it: implementation, code review, tests, QA and documentation. Product, developers, AI, tests and QA all work from the same file.

`[stamp in the corner]` This is **not** “more documentation”. Documentation used to be a by-product nobody read. Today the spec is **the input to a machine that produces software**. Write it badly, and the machine produces junk.

Personally, I think of specs like database migrations or git history: a record of **how and why** the system got to where it is today.

---

## Slide 12 — Spec-driven development in a nutshell

You can sum up spec-driven development pretty simply.

It starts with **intent**. A human and AI turn it into a **spec**. When the spec is ready, the human **approves** it. That kicks off an agent that implements, tests, checks and fixes in a loop, and finally opens a pull request. **The merge is the human's call.**

---

## Slide 13 — The most common objections

Here are the three objections I hear most:

**“This is waterfall all over again.”** Sure, if you spend a week writing a spec before anyone sees working code. But agents write code ten times faster, or more, so mocks, prototypes and PoCs are dirt cheap now. The answer is simple: **small specs, often, and ship code often.**

**“The spec will drift from the code.”** It will, if it lives outside the PR. We change the spec in the same PR as the code, and the review checks both.

**“A spec for everything?”** No. A typo in a label doesn't need a spec. Payments do. We write specs where there are business rules or risk.

---

## Slide 14 — Three levels of working with AI

Back to the levels, this time in terms of tools.

**Level 1, the assistant:** ChatGPT, Claude, Copilot in your IDE. You run the whole process; AI makes suggestions.

**Level 2, the agent:** you hand it the whole task. It reads the repo, changes the code, runs the tests, fixes errors and opens a PR on its own. That's where most teams that take AI seriously are today.

**Level 3, the factory:** a ticket flows through specialized agents: spec, architect, backend and frontend in parallel, testing, review, and finally human approval. The developer doesn't write code anymore. **They design the system that delivers it.**

So let's talk about AI factories.

---

## Slide 15 — What changes at scale

When we move to a factory, four things change.

**01. The human is the bottleneck.** Agents produce more PRs than the team can read. The bottleneck is spec and review, not code. So keep the gates few, but strong.

**02. Separation of roles.** An agent that reviews its own code will always say “looks good”. The reviewer is a separate agent, with its own context, checking the code against the spec, not against its own assumptions.

**03. The factory is code too.** Prompts, skills, CLAUDE.md, checklists: all in the repo, versioned, reviewed. When an agent makes the same mistake for the third time, you don't fix the PR. **You fix the factory.**

**04. Measure the production line.** How many PRs get through without fixes, how much rework there is, how many bugs reach production, how long it takes to go from ticket to merge, and what a feature costs. If you don't know those numbers, you don't know whether your factory works.

`[TODO: 1–2 short stories from other projects. Ideally a concrete number or a mishap that illustrates one of the points.]`

---

## Slide 16 — The simplest factory: GitHub + Actions

What does it look like in practice? Here's the simplest factory you can set up tomorrow: GitHub as the source of truth and GitHub Actions reacting to events.

`[walk through the top strip]`
1. **The issue is the spec.** The PO and a developer refine it right there.
2. **The `spec-ready` label is the gate.** A human says “spec ready”, and an Action kicks off the implementer agent, which writes the code and tests and opens a PR.
3. **Opening the PR** is the next event. The reviewer agent kicks in and checks the code against the spec in the issue.
4. **The `ready-for-qa` label.** The QA agent runs the e2e tests, takes screenshots and posts a report.
5. **A human always hits merge.**

No magic here: just events, labels and jobs you all know already.

A few other variants:
- **Team plugin:** the developer runs `/implement` themselves. That's the safest first step.
- **Chat-ops:** the PO writes in Slack, the agent opens an issue, and an emoji means approval.
- **Scheduled agents:** cron for maintenance chores like dependencies, flaky tests or nightly QA.
- **Production loop:** a Sentry alert turns into an issue and a PR with the fix.
- **Custom orchestrator:** agents pick up tasks from a queue.

The only limit is your imagination, but the pattern is always the same: **event → agent → gate.**

---

## Slide 17 — The verification factory

A factory scales code, but it scales bugs too. So alongside the code factory, you need a **verification factory**.

We build the pyramid bottom-up. First the cheap, deterministic stuff: types, linter, schemas. Then unit, contract and integration tests. Only at the very top: AI review against the spec, and the human.

The human's role changes: they don't check every line, they check **whether these safeguards make sense**.

**We don't trust the agent. We trust the verification system around the agent.**

I'll show you this in action in the demo at the end.

---

## Slide 18 — Invest in what lasts

The agent is replaceable. Today it's Claude doing the implementing, tomorrow Codex, the day after something that doesn't exist yet.

What lasts is something else: the spec, the architecture decisions, the tests, the constraints and the acceptance criteria. They stay, whatever model you use. **That's your team's real capital.** Invest in what lasts.

---

## Slide 19 — Recap

AI speeds things up → the spec ends the guessing → agents take over execution → verification gives us trust.

The takeaway: **don't optimize how fast you write code.** That's not the bottleneck anymore.

---

## Slide 20 — Four things that hold the value

**Intent:** what are we building, and why? That's the difference between “add payment endpoint” and the PAY-123 spec.

**Constraints:** what must never break? The amount can't exceed what's still owed. Idempotency. One payment at a time.

**Feedback loops:** how fast does the agent find out it's wrong? A test that fails after a minute is worth more than a review comment two days later.

**Verification:** how do we know it works? Types, then tests, then AI review against the spec, and a human at the end.

Writing code is almost free today. **These four things aren't.** And that's where your value is.

---

## Slide 21 — My take

`[pause]`

“The future of software development isn't AI writing code. It's people designing systems that reliably produce software.”

---

## Slide 22 — Demo: the factory live

And now, proof that this actually works. When this talk started, I kicked off my AI factory.

This whole time, the factory has been taking in specs, and agents have been building the next slides live. Of course, I had a backup in case anything went wrong. I also built a small dashboard so you can all see what's happening.

And finally, to prove I'm not making this up: **we'll build one slide together.**

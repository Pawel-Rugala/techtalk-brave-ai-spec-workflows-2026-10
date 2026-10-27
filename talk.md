Slide 1:

Hi. My name is Paul, and for the past year I haven't written any code. Agents did all of it.

AI is changing how we work. AI is changing team dynamics.
And that's what today's talk is about. How we can make that transformation in our own teams.

About me:

In the industry since 2012, at all kinds of companies, from small product companies and software houses to big corporations with around 100k people on board, in all kinds of roles from frontend, backend, solution architect and tech lead to even EMEA BI Director... not necessarily in that order, of course.

Slide 2:

"In July this year, Jarred Sumner, the creator of Bun — he works at Anthropic now — announced that he had rewritten all of Bun in Rust. On his own. In 11 days."

"The internal estimate at Anthropic: a team of three senior engineers, one year." Show the bars: the top one is three person-years, roughly 750 working person-days; the bottom one is 11 person-days. The bottom one barely exists: that's about 70× faster.

"We can ignore it, we can nitpick it. But the best teams in the world are saying: what used to take three person-years now takes one person 11 days. Ignoring it looks like this: we play with AI instead of fighting for it."

Slide 3:

Don't worry, this slide isn't another tip from an American productivity handbook.

I was really looking for an analogy here so we'd all be on the same page.

The harvest.

Level 1: Every stalk passes through the farmer's hands. Just like we used to write every line of code.
Level 2: The machine does the heaviest part, but a person guides every step. An order of magnitude more productivity. That's the AI assistant — and that's where most teams are today.
Level 3: one machine cuts, threshes and cleans. The person steers, they don't do the work. Another order of magnitude. That's the AI agent.
Level 4: one operator supervises several machines at once, driving along planned paths on their own. That's the AI factory — and that's where we're heading.

None of these leaps was about the farmer swinging the scythe faster. Each time the way of working changed — and you had to learn something. Anyone can cut with a scythe; managing a fleet of combines is a skill. It's the same with AI: everyone uses an assistant, a factory has to be designed.

What's more, the farmers who adapted didn't lose their jobs; that person is still needed there. Probably the only job that disappeared completely is the lift operator.

Slide 4:

OK, so where does all our effort go now?

Each bar is the whole team's effort on one feature. The proportions are illustrative — it's about the direction, not the percentages.

Before AI: the biggest chunk is coding. That's where the time went and that's where we sweated.

In the AI era: everything comes down to what we want to build, what the requirements are, what should happen and what shouldn't. Writing code is cheap, and the agent does it, so the other part is how we verify that the agent delivered what we expected.

Slide 5:

Writing code is cheap and fast, but bad requirements and bad decisions haven't gotten any easier. AI can generate 10× more terrible code.

My point is that AI hasn't freed us from thinking. A human is still at the helm, just in a different place.

Slide 6:

Many teams still use AI by "prompting", chatting with it like: implement the specification pattern, now do this and that.

Instead of defining a workflow where the agent implements, tests and fixes in a loop on its own.

The human ends up as the agent's operator, and all they get out of it is faster typing.

Slide 7:

The developer no longer has to rack their brain over how to code something, whether it follows all the SOLID principles, etc.

The developer should focus on what they want to achieve and which rules must hold. The unit of work is no longer CODE -> the specification becomes the unit of work.

Slide 8:

We'll talk about spec-driven development, and quickly, an example that will stay with us for a while.

My made-up example. A typical ticket: add an endpoint for making payments.

The agent implemented it. Opened a PR, and now what...
Is it done well? Badly? Who can tell? Now you have to dig into the code and do a full code review to see whether what the agent did works or not.

That's not the agent's fault. The problem is what it got as input.

Slide 9:

A spec is NOT a 40-page Word document. It's a short markdown file in the repo, next to the code, reviewed like code.

It's specific enough that another developer or an agent can do the work without asking 20 questions.

On the right, an example the agent generated (I'm not saying it's the best), but at the very least it's more specific than "add a new endpoint".

Slide 10:

Left side: what we usually throw at an agent today — "Add payment endpoint." And the agent guesses the rest.

Right side: the same thing, but with nothing left unsaid. Each line closes one stamp from the example:

• Preconditions (status OPEN) → an already-paid invoice.
• Idempotency (clientRequestId) → a double payment.
• Concurrency (optimistic lock) → concurrent payments.
• Side effects (PaymentCreated) → a missing event.
• Failure modes → what happens when it blows up.

The punchline on the yellow card: AI doesn't need more creative prompts. It needs less guessing. Every gap in the spec is a place where the agent guesses — and guesses confidently.

Slide 11:

This is more interesting than "let's write better prompts". One spec.md is the source for everything around it: implementation, code review, tests, QA and documentation. Product, the developer, AI, tests and QA all look at the same file.

The stamp in the corner: this is NOT "more documentation". Documentation used to be a by-product that nobody read. Now the spec is the input to a machine that produces software — write it badly and the machine produces badly.

Personally, specs are like database migrations to me. Or the git history log.

Slide 12:

We can sum up the whole of spec-driven development in a very simple way.

There's some intent; a human creates the specification together with AI. When the specification is OK, the human approves it. That triggers an agent that, in a loop, implements, tests, checks, fixes and opens a pull request. The human decides whether to merge.

Slide 13:

The most common objections I hear about spec-driven development:

"It's waterfall all over again." Yes — if you spend a week writing a spec before anyone sees working code.
Again, agents write code 10× or more faster, so it's easier to build mocks, prototypes, PoCs etc., because, again, writing code is cheap and fast. Spec more often and ship code more often.

Spec drift: "the spec will drift from the code." Yes — if it lives outside the PR. We change the spec in the same PR as the code, and the review checks both.

A spec for everything: a typo in a label doesn't need a spec. Payments — yes. Specs go where there are business rules or risk.

Slide 14:

LVL 1, assistant: ChatGPT, Claude, Copilot in the IDE. You drive the whole process, AI makes suggestions.

LVL 2, agent: you give it a whole task. It reads the repo, changes the code, runs the tests, fixes errors and opens a PR on its own. That's where most teams that use AI seriously are today.

LVL 3, factory: a ticket goes through specialised agents — spec, architect, backend and frontend in parallel, tests, review — and at the end a human approves. The developer no longer writes code; they design the system that delivers it.

Let's talk about AI factories now.

Slide 15:

the bottleneck is people. => ...

separation of roles => ...

the factory is code too. => ...

you measure the production line =>

Here I'll talk about examples from other projects ....

Slide 16:

What does it look like in practice? The simplest factory you could set up tomorrow: GitHub as the source of truth, with GitHub Actions reacting to events.

Walk through the top bar: the issue is the spec — the PO and dev refine it in the issue. The spec-ready label is a gate: a human says "the spec is ready" and an Action fires the implementer, which writes the code with tests and opens a PR. Opening the PR is another event — the reviewer starts and checks the code against the spec from the issue. The ready-for-qa label — a QA agent runs the e2e tests, takes screenshots and posts a report. A human always does the merge.

There's no magic here: events, labels and jobs you all know.

Other examples:
• Team plugin — the dev calls /implement themselves; the safest first step.
• Chat-ops — the PO writes in Slack, the agent creates an issue, an emoji is the approval.
• Scheduled agents — cron for maintenance: dependencies, flaky tests, nightly QA.
• Production loop — a Sentry alert creates an issue and a PR with the fix.
• Your own orchestrator — agents take tasks from a queue.

The limit is your imagination, but the pattern is always the same — event, agent, gate.

Slide 17:

A factory scales code — and it scales bugs. That's why next to the code factory you need a verification factory.

We build the pyramid from the bottom: first the deterministic, cheap things — types, lint, schemas. Then unit, contract and integration tests. Only at the top: AI review against the spec, and a human.

I'll show you this in my demo at the end..

The human only checks whether the verifications we've built make sense.

We don't trust the agent. We trust the verification system around the agent.

Slide 18:

The agent is replaceable: today Claude implements, tomorrow Codex, the day after something that doesn't exist yet.

The spec is durable: the spec, architecture decisions, tests, constraints and acceptance criteria stay, regardless of the model. That's the team's real core. Invest in what lasts.

Slide 19:

AI raises the pace → the spec ends the guessing → agents take over execution → verification gives us trust.

Takeaway: don't optimize typing speed. It's no longer the bottleneck.

Slide 20:

Intent — what are we building, and why? The difference between "add payment endpoint" and the PAY-123 spec.

Constraints — what must never break? Amount no greater than what's due, idempotency, one payment at a time.

Feedback loops — how fast does the agent know it's wrong? A test that fails after a minute is worth more than a review comment after two days.

Verification — how do we know it works? From types, through tests, to AI review against the spec and a human at the end.

Punchline: writing code is almost free now. These four things — aren't. That's where your value is.

Slide 21:

In my opinion...

"The future of software development isn't AI writing code. It's people designing systems that reliably produce software."

Slide 22:

OK, and now, to show that it's possible: at the start of the talk I launched my AI factory.

My AI factory received specifications, and an agent built the next slides on the fly. Of course I had a backup ready in case something went wrong. I built a small dashboard so everyone could see. And finally, so you don't think I'm lying, we'll build one slide together.

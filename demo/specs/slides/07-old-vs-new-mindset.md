---
id: "07"
order: 7
title: "From writing code → to designing intent"
section: "01 · Mindset"
tag: "yellow"
must_include:
  - "designing intent"
  - "OLD MINDSET"
  - "NEW MINDSET"
  - "How do I code this?"
  - "Which rules must never be broken?"
  - "How fast did we ship a correct system?"
  - "Unit of work:"
  - "spec"
---

# 07 · From writing code → to designing intent

## Goal
Contrast the questions developers used to ask with the ones they ask today. The takeaway: code is no longer the unit of work; the spec is.

## Content
**Tag:** `01 · Mindset` (yellow variant)

**Heading (h2, slightly smaller, about 68 px):** `From writing code → to` + `designing intent` (yellow marker highlight)

**"vs" table — column headers:**
- left: `OLD MINDSET` (dimmed)
- middle: empty
- right: `NEW MINDSET`

**Rows (left → right, with a `→` arrow in the middle):**
1. `How do I code this?` → `What exactly do we want to achieve?`
2. `How do I write this class?` → `What should the contract be?`
3. `How do I build this endpoint?` → `Which rules must never be broken?`
4. `Does the code look good?` → `Does the solution meet the spec?`
5. `How much code did I write?` → `How fast did we ship a correct system?`

**Punchline below the table (heading font, about 50 px):**
`Unit of work:` `code` (struck through) `→` `spec` (pink marker)

## Layout
- A "top" slide: tag, heading, vs table (~10 px below the heading), punchline (~10 px below the table).
- The table has three columns: old (left), a narrow arrow column (middle), new (right). The left column is visually weaker (the old way), the right one stronger.
- Each row is its own element (rows reveal one by one in the deck), but in the final state all rows are visible.
- The punchline is large, left-aligned, in the heading font.

## Components
- `section.top`, `span.tag.yellow`, `h2` with `span.mark`
- `.vs` with `.vsrow` rows; the header row uses `.head` (the left one `.head.muted`), content rows use `.old`, `.to` (arrow), `.new`
- Punchline: a paragraph in `var(--font-head)`, with `span.strike-line` on "code" and `span.mark.pink` on "spec"

## Acceptance criteria
- [ ] Five rows in the given order, each with a `→` arrow between the columns.
- [ ] "OLD MINDSET" is dimmed, "NEW MINDSET" prominent.
- [ ] "code" is struck through, "spec" sits on a pink marker.
- [ ] Fits in 1920×1080, no overflow.
- [ ] Speaker notes present.

## Speaker notes
**[6:15–7:30]**

Developers don't have to rack their brains anymore over how to code something, or whether it follows every SOLID principle.

They should focus on **what** they want to achieve and **which rules** have to hold.

Code is no longer the unit of work. **The spec is.**

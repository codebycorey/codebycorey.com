# Refactoring with Claude Code: A Practical Guide

This guide walks through refactoring the blog using the specialist agents, team blueprints, and knowledge compounding workflow from your dotfiles. It's written as a playbook you can follow session by session.

---

## What You Have

Everything lives in `~/.claude/` (stowed from your dotfiles):

```
~/.claude/
├── agents/              ← 6 specialist agents
│   ├── researcher.md    ← haiku, read-only, codebase/web exploration
│   ├── implementer.md   ← sonnet, full write, pattern-aware coding
│   ├── reviewer.md      ← sonnet, read-only, bugs/security/perf
│   ├── test-writer.md   ← sonnet, full write, test generation
│   ├── docs-writer.md   ← sonnet, no bash, documentation
│   └── architect.md     ← opus, read-only, system design/planning
├── commands/
│   ├── kickoff.md       ← session startup with focused context
│   ├── retro.md         ← post-work retrospective → LEARNINGS.md
│   └── blog-notes.md    ← capture insights for blog series
├── skills/
│   ├── team-blueprints/ ← 4 reusable team patterns
│   │   ├── SKILL.md     ← orchestrator
│   │   └── blueprints/
│   │       ├── feature.md
│   │       ├── bug-hunt.md
│   │       ├── refactor.md
│   │       └── review.md
│   ├── handoff/         ← session continuity documents
│   │   └── SKILL.md
│   └── project-init/    ← project setup (now generates agents too)
│       └── SKILL.md
└── rules/
    └── agent-workflow.md ← guidance for agent/team/context usage
```

---

## Phase 0: Project Bootstrap

### Step 1: Initialize Claude Code for the project

Open Claude Code in the blog project and run the project-init skill:

```
> Set up Claude Code for this project
```

This triggers the `project-init` skill which will:
- Detect Next.js, TypeScript, Tailwind, MDX (whatever the stack is)
- Generate a `CLAUDE.md` with working commands, architecture, conventions
- Generate custom commands (commit, review, test if tests exist)
- Generate a stack-specific agent (likely `component-builder.md` for React/Next.js)

**Review what it generates.** Edit the `CLAUDE.md` if anything is wrong. This file is the foundation — every future session reads it.

### Step 2: Create a feature branch

```
> Create a branch called refactor/modernize-blog for this work
```

Keep all refactoring work on this branch. You can create sub-branches for individual phases if the refactor is large.

---

## Phase 1: Assessment

Before changing anything, understand what you have and where you want to go. This is where the architect agent earns its keep.

### Step 3: Kick off an assessment session

```
/kickoff assess the current blog architecture and identify upgrade paths
```

This loads `CLAUDE.md`, checks recent git history, and finds relevant files. Review the plan it presents.

### Step 4: Run the architect

Ask Claude to use the architect agent for the assessment:

```
> Use the architect agent to analyze the current blog architecture.
> I want to understand: what versions am I behind on, what's vendor-locked,
> what's the migration path to modern equivalents, and what order should
> I tackle things in.
```

The architect (opus, read-only) will:
- Map the current dependencies and their versions
- Identify what's outdated and what the upgrade paths look like
- Flag vendor lock-in points (contentlayer, specific Next.js patterns, etc.)
- Propose 2-3 approaches with tradeoffs
- Recommend an order of operations

**This is read-only.** The architect cannot modify files. It produces a plan, not code.

### Step 5: Capture the assessment

Once you agree with the architect's analysis, save it:

```
> Save this assessment to ARCHITECTURE.md so we can reference it throughout the refactor
```

You now have a written record of where you are, where you're going, and why.

---

## Phase 2: Break It Down

A full blog refactor is too big for one session or one team. Break it into independent chunks that can each be a single session's work.

Typical chunks for a blog refactor:

1. **Dependency upgrades** — Next.js, React, TypeScript, Tailwind version bumps
2. **Content pipeline** — Replace vendor-locked MDX processing with a modern alternative
3. **Component modernization** — Update components to current React/Next.js patterns
4. **Styling migration** — If moving Tailwind versions or changing approach
5. **Build/deploy cleanup** — Update configs, remove dead code, optimize

Each chunk becomes its own `/kickoff` → work → `/retro` cycle.

### How to decide chunk order

- **Dependencies first.** Version upgrades unblock everything else. Do these before touching application code.
- **Content pipeline second.** This is usually the most vendor-locked part of a blog. Migrating it early means you can test everything else against the new pipeline.
- **Components third.** Now that deps are modern and content loads correctly, modernize components.
- **Styling and cleanup last.** These are lowest risk and easiest to verify.

---

## Phase 3: Execute — The Refactor Blueprint

Each chunk follows the same pattern using the **refactor blueprint**. Here's a chunk walkthrough.

### Session start

```
/kickoff upgrade Next.js from [current] to [target] and fix breaking changes
```

This loads context, surfaces any relevant learnings from past chunks (if you've done `/retro` on previous ones), and presents a plan.

### Use the refactor blueprint

For medium-to-large chunks (touching 4+ files):

```
> Use the refactor blueprint to upgrade Next.js. The current version is [X],
> target is [Y]. Keep the site building and functional after each step.
```

This creates a team:

| Role | Agent | What It Does |
|------|-------|--------------|
| **Lead** | you (Claude) | Orchestrates, manages tasks |
| **Architect** | `architect` (opus) | Designs the migration steps |
| **Implementer** | `implementer` (sonnet) | Executes each step |
| **Reviewer** | `reviewer` (sonnet) | Verifies behavior after each step |

The workflow:

```
Architect analyzes breaking changes between versions
    → Architect designs step-by-step migration plan
        → Lead breaks it into tasks
            → Implementer executes step 1
                → Reviewer verifies (build passes, site works)
            → Implementer executes step 2
                → Reviewer verifies
            → ... repeat for each step ...
        → Lead runs final verification
```

**The critical rule:** every step leaves the site in a working state. If `npm run build` breaks after a step, the implementer fixes it before moving on.

### For small chunks (1-3 files)

Skip the team. Just work directly:

```
/kickoff update the og:image generation to use the new API
```

Then implement it yourself (or ask Claude to use the implementer agent solo). No team overhead needed.

### When things go wrong — the bug hunt blueprint

If an upgrade breaks something and the cause isn't obvious:

```
> Use the bug hunt blueprint to investigate why the MDX content
> isn't rendering after the content pipeline migration
```

This spawns two researcher agents that investigate different hypotheses in parallel:
- Researcher A might trace the content loading path
- Researcher B might check the MDX compilation config

They report back, you synthesize, and the implementer applies the fix.

### Session end

When you're done for the day or the context is getting long:

```
> Create a handoff document for this session
```

This generates `.handoff.md` with:
- What you were working on
- What's done, what's in progress
- The approach and any blockers
- Specific resume instructions

### Capture learnings

After completing each chunk:

```
/retro
```

This analyzes the git diff for the branch and extracts learnings:

```
## Gotchas
- **Next.js 15 removed X** — Migration guide doesn't mention this, had to check the RFC

## Dependencies
- **Package Y conflicts with Z** — Pin Y to 2.x until Z releases a compatible version
```

You approve which learnings to keep. They go into `LEARNINGS.md`. The next `/kickoff` surfaces them.

---

## Phase 4: Feature Work — The Feature Blueprint

Once the refactor is done, use the **feature blueprint** for any new features you add:

```
> Use the feature blueprint to add an RSS feed to the blog
```

This creates:

```
Lead plans the feature
    → Implementer builds it
    → Test Writer + Reviewer work in parallel
        → Test Writer writes tests for the RSS output
        → Reviewer checks for bugs, security, correctness
    → Lead addresses any feedback
```

For small features (single file, under 50 lines), skip the team:

```
/kickoff add reading time estimate to blog posts
```

Just implement it directly.

---

## Phase 5: Review Before Merge — The Review Blueprint

Before merging your refactor branch back to main, run a thorough review:

```
> Use the review blueprint to review all changes on refactor/modernize-blog
> before merging to main
```

This spawns three reviewers working in parallel:

| Reviewer | Focus |
|----------|-------|
| Security | Auth, data exposure, dependency vulnerabilities |
| Quality | Logic errors, edge cases, missing error handling |
| Performance | Bundle size, rendering performance, image optimization |

The lead synthesizes findings into a single report grouped by severity.

---

## Quick Reference

### Commands

| Command | When to Use | What It Does |
|---------|-------------|--------------|
| `/kickoff <task>` | Start of every session | Loads focused context, surfaces learnings, presents plan |
| `/retro` | After completing a chunk | Extracts learnings from git diff, writes to LEARNINGS.md |
| `/blog-notes "Category: insight"` | When you discover something blog-worthy | Appends to ~/blog-notes.md |
| `/commit` | After each logical change | Analyzes diff, creates conventional commit |
| `/review` | Quick single-pass review | Reviews current changes for bugs/security/perf |

### Agents (used automatically or via "use the X agent")

| Agent | When to Use |
|-------|-------------|
| `researcher` | "Investigate how X works", "what are the breaking changes in Y" |
| `implementer` | "Implement the migration step", "build this component" |
| `reviewer` | "Review these changes", "check this for security issues" |
| `test-writer` | "Write tests for the RSS feed", "cover the edge cases" |
| `docs-writer` | "Document the new content pipeline", "update the README" |
| `architect` | "Design the migration path", "evaluate these two approaches" |

### Blueprints (used via "use the X blueprint")

| Blueprint | When to Use |
|-----------|-------------|
| `refactor` | Each major refactoring chunk (dep upgrades, pipeline migration) |
| `feature` | New features (RSS feed, search, new components) |
| `bug-hunt` | Something broke and the cause isn't obvious |
| `review` | Final review before merging to main |

### The Knowledge Loop

```
/kickoff     ← start (loads LEARNINGS.md + relevant context)
  ↓
  work       ← implement using agents/blueprints as needed
  ↓
  handoff    ← end of day (saves state to .handoff.md)
  ↓
/kickoff     ← next day (reads .handoff.md, picks up where you left off)
  ↓
  work       ← continue
  ↓
/retro       ← chunk complete (extracts learnings → LEARNINGS.md)
  ↓
/kickoff     ← next chunk (learnings from previous chunks inform this one)
```

---

## Scaling Rules — When to Use What

```
Change size        │ What to do
───────────────────┼──────────────────────────────────
< 50 lines         │ Just do it. No agents, no teams.
1-3 files          │ Solo agent (implementer or researcher). No team.
4-10 files         │ Lead + 1-2 agents. Pick from the blueprint.
10+ files          │ Full blueprint (3-4 agents). Rare.
Pre-merge review   │ Review blueprint (3 parallel reviewers).
```

The default is **no team**. Only reach for a team when there's real parallelism to exploit.

---

## Example: A Full Chunk Session

Here's what a single refactoring chunk looks like end to end.

```
# Day 1 morning — start the content pipeline migration

/kickoff migrate from contentlayer to next-mdx-remote for blog content

# Claude loads CLAUDE.md, LEARNINGS.md, finds relevant files,
# presents a 5-step plan. You approve.

> Use the refactor blueprint for this migration

# Architect analyzes contentlayer usage, designs replacement with
# next-mdx-remote. Proposes 4 migration steps.
# Implementer executes step 1 (install new deps, create loader).
# Reviewer verifies build passes.
# Implementer executes step 2 (migrate blog post rendering).
# Reviewer verifies.
# ... continues through all steps ...

# Context getting long, need to break for lunch

> Create a handoff for this session

# .handoff.md saved with state: steps 1-2 done, step 3 in progress,
# specific resume instructions.

# Day 1 afternoon — continue

/kickoff continue from .handoff.md

# Claude reads .handoff.md, loads context for step 3, continues.
# Remaining steps complete. Build passes. Site renders correctly.

/commit content pipeline migration from contentlayer to next-mdx-remote

/retro

# Claude analyzes the diff, identifies learnings:
# - Gotcha: contentlayer's frontmatter validation was implicit, need to add zod schema
# - Dependency: next-mdx-remote requires specific rehype plugin versions
# You approve. LEARNINGS.md updated.

# Capture a blog insight while it's fresh
/blog-notes "Gotcha: migrating content pipelines is 80% frontmatter edge cases"
```

---

## Tips

- **Run `/kickoff` every session, even short ones.** It takes 10 seconds and prevents the "forgot about that gotcha" problem.
- **Don't skip `/retro` after chunks.** The learnings compound. Chunk 3 goes faster because of what you learned in chunks 1 and 2.
- **Use the architect sparingly.** It runs on opus which costs more. Use it for structural decisions (content pipeline architecture, routing strategy), not for implementation details.
- **Read the handoff before deleting it.** Sometimes the resume instructions surface things you forgot about.
- **Blog notes are cheap.** If something surprises you, capture it. You can always discard it later. You can't recover an insight you forgot to write down.

# Context Engineering

PUDO treats context as an engineering artifact. The goal is not to give the AI more text; the goal is to give it the right evidence before implementation.

## Context Pack Format

Use this format before non-trivial coding work:

```md
# Context Pack

## Task
What needs to change.

## Current Phase
Plan / Understand / Develop / Optimize

## Relevant Files
- `path/to/file`: why it matters

## Verified Facts
- Fact backed by source inspection

## Assumptions
- Assumption that still needs confirmation

## Constraints
- Technical, product, security, release, or time constraints

## Edge Cases
- Edge cases that must be handled or explicitly deferred

## Verification
- Commands or manual checks that prove the change
```

## Context Window Guide

Match context pack size to your model's window:

| Model | Context Window | Max Files in Pack | Recommended Pack Size |
|---|---|---|---|
| Claude Opus 4.8 | 200K | 8-10 | 15-20K tokens |
| Claude Fable 5 | 1M | 25 | 40-80K tokens |
| GPT-4o | 128K | 6-8 | 10-15K tokens |

For Fable 5, take advantage of the 1M window for large refactors and multi-file analysis, but avoid filling the context with irrelevant files. **Include only files that help decide what to change or how to verify it.**

## What Files To Include Before Coding

Include only files that help decide what to change or how to verify it:

- The file being edited.
- Nearby examples that show local conventions.
- Tests for the affected behavior.
- API/schema/contract definitions.
- Config files that affect runtime behavior.
- Logs or stack traces for debugging tasks.

Avoid including:

- Whole directories without a reason.
- Build output, dependency folders, or generated files.
- Unrelated docs or examples.
- Large files when a targeted symbol or small range is enough.

## Evidence-First Prompting

Before asking for implementation, require evidence:

```text
Before coding, inspect the relevant files and report:
1. Files read
2. Existing patterns found
3. APIs or contracts verified
4. Assumptions still open
5. Smallest safe implementation path
```

Do not accept implementation that depends on unverified paths, APIs, env vars, database columns, or package behavior.

## Repo Map Before Implementation

For larger tasks, create a compact repo map:

```md
## Repo Map

| Area | Files | Why It Matters |
|---|---|---|
| Routing | `...` | Request entrypoint |
| Data | `...` | Persistence and migration risk |
| UI | `...` | User-facing state |
| Tests | `...` | Verification path |
| Config | `...` | Runtime behavior |
```

Stop expanding context once the implementation path is clear.

## Handoff

For work that crosses sessions or tools, update `.pudo/session.md` with inspected files, decisions, tests run, remaining risks, and next action.

---
name: pudo
description: >
  PUDO workflow: Plan -> Understand -> Develop -> Optimize. Use on any
  non-trivial coding task (features, bug fixes, refactors, releases) and when
  the user says "pudo", "/pudo", "plan first", "quality gate" or "session handoff".
---

# PUDO

Work through four phases. For tiny edits (typo, one-line config) compress them, but still know what changes, change only that, and verify it.

## 1. Plan

- Restate the goal. Write scope, out of scope, constraints and success criteria.
- Name risks and anything destructive or ambiguous. Ask only when the answer changes what you build.

## 2. Understand

- Read the files the change touches, their callers, tests and config before editing.
- Never guess APIs, paths or file contents. Grep before calling something unused.

## 3. Develop

- Small, scoped patches. Follow the patterns already in the codebase.
- Preserve the user's existing changes. No new dependency without a reason.
- Risky logic (a branch, a parser, security, data writes) gets a test that fails when it breaks.

## 4. Optimize

- Run the relevant tests and checks. Report failures and skipped checks plainly.
- Self-review the diff for edge cases, then list remaining risks.

## Tools

When the `pudo` MCP server is connected:

- `pudo.runQualityGate` with `plan`, `understand`, `develop`, `optimize` or `release` before moving to the next phase.
- `pudo.updateSessionHandoff` (with `confirmWrite: true`) at checkpoints in long work, so another session can continue.
- `pudo.createContextPack` to hand a bounded file set to another agent.
- `pudo.initProject` previews by default; pass `dryRun: false, confirmWrite: true` only after the user agrees.

## Enforcement

- A Stop hook blocks finishing once when code was edited after the last test or check run. Run the checks, or say plainly why they cannot run.
- Before context compaction a hook writes `.pudo/auto-handoff.md` and reloads it after.
- Focused skills: `/pudo:pudo-plan`, `/pudo:pudo-review`, `/pudo:pudo-handoff`.

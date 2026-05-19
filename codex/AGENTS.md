# Codex AGENTS.md (PUDO, Lean)

Template: copy this file to your project repository root as `AGENTS.md`.

Default workflow: Plan -> Understand -> Develop -> Optimize (PUDO).

## Token-Efficient Defaults

- Keep responses concise by default.
- Avoid dumping large file contents; summarize and reference paths.
- Prefer targeted search (`rg`) and small file slices over broad scans.

## Token and Time Budget

Use the smallest workflow that safely solves the task.

### Task Modes

- Micro: typos, one-line fixes, small docs/config edits. Skip full PUDO. Inspect only directly relevant files. Run the cheapest relevant check.
- Standard: normal features, bugs, and refactors. Use compact PUDO: brief plan, targeted understanding, small patch, relevant verification.
- Critical: auth, payments, database, migrations, security, public APIs, data loss risk. Use full PUDO with assumptions, edge cases, tests, rollback notes, and quality gate status.

### Context Budget

- Search first, read second.
- Prefer `rg`, file tree, and targeted snippets over opening whole files.
- Read only files needed for the current task.
- Stop expanding context once the implementation path is clear.
- Avoid dumping full file contents unless replacing the whole file.

Default limit before first patch:
- Inspect up to 5 relevant files.
- Expand only when blocked by missing context.

### Patch Discipline

- Make the smallest patch that satisfies the task.
- Do not rewrite unrelated files.
- Do not reformat files unless formatting is the task.
- Do not add dependencies without explicit justification.
- Do not change public contracts unless required.
- If the plan becomes wrong, stop and re-plan briefly.

### Verification Tiers

Use the cheapest sufficient verification.

- Tier 1: format, lint, typecheck, or targeted syntax check.
- Tier 2: targeted tests for changed modules.
- Tier 3: full test/build only for critical, cross-cutting, release, or risky changes.

If checks are skipped, state the reason briefly.

### Final Response Budget

Use this format by default:

Changed:
- ...

Verified:
- ...

Notes:
- Only assumptions, risks, skipped checks, or follow-ups.

## Plan

- For non-trivial tasks, propose a short plan with scope, constraints, and success criteria.
- Ask before destructive, high-risk, or ambiguous changes.

## Understand

- Read the relevant files before editing.
- Match existing patterns, conventions, and architecture.

## Develop

- Make small, reviewable patches.
- Add or update tests when the change is risky or user-facing.
- If the plan fails, stop and re-plan instead of forcing it.

## Optimize

- Self-review for correctness, readability, and maintainability.
- Run the most relevant available checks, or explain why they were skipped.
- Summarize what changed and how it was verified.

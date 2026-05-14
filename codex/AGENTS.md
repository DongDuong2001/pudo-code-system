# Codex AGENTS.md (PUDO, Lean)

Template: copy this file to your project repository root as `AGENTS.md`.

Default workflow: Plan -> Understand -> Develop -> Optimize (PUDO).

## Token-Efficient Defaults

- Keep responses concise by default.
- Avoid dumping large file contents; summarize and reference paths.
- Prefer targeted search (`rg`) and small file slices over broad scans.

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

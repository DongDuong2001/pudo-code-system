# Codex Workflow (PUDO, Lean)

Default loop: Plan -> Understand -> Develop -> Optimize (PUDO).

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

## Release & Package Quality

This repository contains publishable npm packages (e.g., `@dongduong2001/mcp-server` and `pudo-code-system`). AI agents must maintain package release readiness and stability:

- **Git Workflow:** Never work directly on default branches. Work on a dedicated feature branch.
- **Commit Strategy:** stage and commit files individually using **Conventional Commits** (e.g., `docs(database): add index guide` or `feat(mcp): add tool`).
- **Semantic Versioning:** Strictly follow SemVer when suggesting version bumps. Reference [VERSIONING.md](release/VERSIONING.md).
- **Release Documentation:** Update `CHANGELOG.md` following [CHANGELOG_TEMPLATE.md](release/CHANGELOG_TEMPLATE.md). Consult [RELEASE_CHECKLIST.md](release/RELEASE_CHECKLIST.md) and [PUBLISH_NPM.md](release/PUBLISH_NPM.md) before publishing.
- **Verification:** Run all linting, building, and tests (`npm run check`, `npm test`, `npm run mcp:test`) before considering development complete. Do not break backward compatibility unless explicitly approved.


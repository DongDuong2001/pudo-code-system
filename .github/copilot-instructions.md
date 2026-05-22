# GitHub Copilot Instructions

This repository is an AI engineering methodology and prompt/skill pack. Treat changes as documentation, workflow, and agent-instruction changes unless the task explicitly says otherwise.

## PUDO Workflow

Use the PUDO loop for non-trivial work:

1. Plan: define goal, scope, constraints, success criteria, and non-goals.
2. Understand: inspect relevant files and existing patterns before editing.
3. Develop: make small, focused patches that stay within scope.
4. Optimize: self-review, run relevant checks, and summarize risks.

Use quality gates before handoff:

- `quality/quality-gates.md`
- `quality/qc-checklists.md`
- `quality/ai-output-review.md`
- `quality/edge-cases/general.md`

## Repository Shape

- `prompts/`: reusable prompt templates grouped by PUDO phase.
- `skills/`: domain and tool skills with `SKILL.md` entrypoints.
- `quality/`: quality gates, QC, edge cases, and AI-output review.
- `docs/`: explanatory methodology docs.
- `examples/`: walkthroughs showing PUDO in practice.
- Agent integrations live in `AGENTS.md`, `codex/`, `claude/`, `cursor/`, `opencode/`, `antigravity/`, `kiro/`, and `.github/`.

## Editing Rules

- Prefer Markdown changes that are concise, scannable, and consistent with nearby files.
- Do not rename or restructure directories unless the task requires it.
- Do not update model names or tool-specific claims unless they are verified from current docs.
- Keep legacy compatibility notes when adding newer agent config formats.
- Avoid invented commands, unsupported config keys, and broken links.
- Preserve translations unless the task explicitly asks to update them.

## Verification

For docs-only changes, run the cheapest relevant checks:

- `git diff --check`
- targeted `Test-Path` checks for new internal links
- targeted `rg` searches for stale paths or deprecated wording

If checks are skipped, state why.

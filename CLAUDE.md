# Claude Code Instructions

Use PUDO as the operating workflow for this repository: Plan -> Understand -> Develop -> Optimize.

This root file is the Claude Code memory bridge. It keeps the README integration link valid and points Claude to the fuller Claude-specific guide in `claude/CLAUDE.md`.

## Required Workflow

- Plan before implementation for non-trivial work.
- Inspect relevant files before editing.
- Keep patches small and scoped.
- Preserve existing user changes.
- Run relevant checks, or state why checks were skipped.
- Use quality gates before handoff or release.

## Model-Specific Notes

### Claude Fable 5

When running on Fable 5 (model: `claude-fable-5`), leverage the 1M token context for:
- Large refactors spanning 10+ files — include all relevant files in a single context pack
- Long-running autonomous tasks — use session handoff for checkpoints across multi-hour work
- Self-correction loops — Fable 5 can refine its own work without user intervention

## Repository References

- Core agent workflow: `AGENTS.md`
- Claude-specific guide: `claude/CLAUDE.md`
- Quality gates: `quality/quality-gates.md`
- QC checklists: `quality/qc-checklists.md`
- AI output review: `quality/ai-output-review.md`
- Edge cases: `quality/edge-cases/general.md`

## Avoid

- Guessing APIs, paths, or file contents.
- Rewriting unrelated files.
- Adding dependencies without justification.
- Removing or weakening tests without approval.
- Hiding failed or skipped verification.

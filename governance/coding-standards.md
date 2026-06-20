# Coding Standards

## Principles

1. **Match existing patterns** — read surrounding code before adding new conventions
2. **Minimal scope** — change only what the task requires
3. **Self-explanatory code** — comments for non-obvious business logic only
4. **Tests for behavior** — add tests when behavior, security, or contracts change

## General Rules

- No secrets, credentials, or API keys in source or commits
- No drive-by refactors in feature PRs
- Preserve user changes; do not revert unrelated edits
- Run relevant checks or state why skipped

## Language-Specific

Follow stack conventions declared in:
- `.pudo/memory/coding-style.md` (project-specific)
- `templates/{stack}/AGENTS.md` (stack overlay)

## AI-Generated Code

Apply [AI Output Review](../quality/ai-output-review.md):
- Verify APIs and paths against source files
- Do not accept hallucinated imports or env vars
- Review diffs, not just agent summaries

## Enforcement

| Level | Mechanism |
| --- | --- |
| Lite | Agent rules + human review |
| Standard | + linter in CI |
| Enterprise | + CODEOWNERS + required review |

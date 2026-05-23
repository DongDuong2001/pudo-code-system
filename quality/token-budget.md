# Token Budget Rules

Token discipline is part of PUDO quality. The goal is to give the AI enough context to be correct without flooding the session with irrelevant files, logs, or generated text.

## Small Tasks

Use for one-line fixes, docs edits, small scripts, and obvious config changes.

- Use one short plan or no written plan when the change is obvious.
- Read only directly relevant files.
- Avoid full-file dumps unless replacing the whole file.
- Ask for patch-first output.
- Run the cheapest relevant check.

## Medium Tasks

Use for focused features, real bugs, and small refactors.

- Search first, then read targeted snippets.
- Summarize file purpose instead of pasting large sections.
- Reference paths and line numbers when useful.
- Keep one task checklist.
- Ask the AI to state assumptions and edge cases.
- Stop expanding context once the implementation path is clear.

## Large Tasks

Use for multi-file features, migrations, security work, and team handoff.

- Create a context map before implementation.
- Split work by component or boundary.
- Use handoff summaries between phases.
- Keep decisions and risks in a short log.
- Run broader checks only after targeted checks pass.
- Archive final context in `.pudo/session.md` or the PR description.

## Waste Signals

- Reading unrelated directories "just in case."
- Pasting whole files when a symbol or small range is enough.
- Repeating the same plan without new information.
- Asking for broad rewrites when a patch is sufficient.
- Continuing after the AI starts guessing APIs, paths, or commands.

## Minimal Context Prompt

```text
Use a token budget.

Task:
{{TASK}}

Before editing:
1. Search for the smallest relevant context.
2. Read only files needed for this change.
3. Summarize what you found.
4. Implement the smallest safe patch.
5. Run the cheapest relevant check.
```

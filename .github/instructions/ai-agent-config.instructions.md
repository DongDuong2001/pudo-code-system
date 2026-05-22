---
applyTo: "AGENTS.md,**/AGENTS.md,CLAUDE.md,GEMINI.md,cursor/**,claude/**,opencode/**,antigravity/**,kiro/**,.github/copilot-instructions.md,.github/instructions/*.instructions.md"
---

# AI Agent Config Instructions

- Keep agent instructions short enough to load as context.
- Put detailed procedures in skills, prompts, or quality docs instead of duplicating them.
- Preserve compatibility files when adding newer config formats.
- Name exact files and paths agents should read.
- Do not invent tool-specific settings; verify config keys before adding them.
- Include rules for scope control, file inspection, small patches, verification, and skipped-check reporting.
- Avoid model-specific claims unless the task explicitly requires them.

---
name: pudo-handoff
description: >
  Write the PUDO session handoff (.pudo/session.md) so another session, tool or
  teammate can continue the work. Use when the user says "handoff", "save
  progress", "/pudo-handoff", before ending long work, or when switching tools.
---

# PUDO Handoff

Collect facts from this session, not guesses: the task, the current PUDO phase, scope, files read, decisions, assumptions, tests run with results, remaining risks and the single next action.

- When the PUDO MCP server is connected, call `pudo.updateSessionHandoff` with those fields and `confirmWrite: true`.
- Otherwise write `.pudo/session.md` with the headings Task, Current Phase, Scope, Files Inspected, Decisions Made, Assumptions, Tests Run, Remaining Risks, Next Action.
- If `.pudo/auto-handoff.md` exists (written by the PreCompact hook), use it as a source, then check each fact before copying it.

The Next Action must be one concrete step someone can start without asking a question.

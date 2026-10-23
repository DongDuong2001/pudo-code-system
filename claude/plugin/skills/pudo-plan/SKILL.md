---
name: pudo-plan
description: >
  PUDO Plan phase: turn a request into a short plan card (goal, scope, out of
  scope, success criteria, risks, steps) before any code is written. Use when
  the user says "plan this", "/pudo-plan", or starts a non-trivial feature, fix
  or refactor.
---

# PUDO Plan

Read the request and the files it touches first. Then reply with this card and stop for approval when the work is risky or unclear:

```
Goal:              one sentence, in the user's terms
Scope:             files and behaviour that change
Out of scope:      what you will not touch
Success criteria:  checks that prove it works (tests, commands, observable result)
Risks:             data loss, breaking callers, security, unknowns
Steps:             3-7 small steps, each verifiable
```

Rules:

- Every success criterion must be checkable by a command or an observable result. "Works well" is not one.
- Name the smallest version that does the core job. List anything bigger as a follow-up, not a step.
- If a step deletes or overwrites data, say so in Risks and ask first.

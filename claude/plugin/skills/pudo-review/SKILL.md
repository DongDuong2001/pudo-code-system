---
name: pudo-review
description: >
  PUDO Optimize gate: review the current diff against the plan before calling
  work done: correctness, edge cases, tests, scope creep, remaining risks. Use
  when the user says "review", "/pudo-review", "is this done", or before a
  commit, PR or handoff.
---

# PUDO Review

1. Run `git diff` (and `git diff --staged`). Read every changed hunk and the callers of changed functions.
2. Run the project's tests and checks. Report the exact command and result. A failure is reported, never hidden.
3. Call `pudo.runQualityGate` with `develop`, then `optimize`, when the PUDO MCP server is connected.
4. Reply with:

```
Verdict:         ready / not ready (one line why)
Verified by:     commands run and their result
Findings:        numbered; each with file:line, the concrete failing case, the smallest fix
Scope creep:     changes the request did not ask for
Remaining risks: what is untested or assumed
```

No finding without a concrete case ("this input leads to this wrong result"). No style taste.

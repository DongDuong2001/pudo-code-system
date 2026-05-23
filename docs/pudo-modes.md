# PUDO Modes

PUDO should scale to the risk of the task. Use the smallest mode that gives enough structure to avoid rework.

| Mode | Use For | Process | Required Evidence |
|---|---|---|---|
| **PUDO Lite** | Small fixes, scripts, docs edits, tasks under 30 minutes | Three checks: scope, relevant files, verification | One-sentence scope, files touched, check run or skipped |
| **PUDO Standard** | Normal features, real bugs, focused refactors | Plan -> Understand -> Develop -> Optimize | Plan, inspected files, tests/checks, self-review |
| **PUDO Enterprise** | Team work, production, security, compliance, migrations | Full PUDO plus release discipline | Owner, rollback, monitoring, migration notes, risk log |

## PUDO Lite

Use Lite when ceremony would cost more than the change.

Prompt shape:

```text
Scope: {{WHAT_CHANGES}}
Relevant files: {{FILES_OR_AREAS}}
Verification: {{COMMAND_OR_MANUAL_CHECK}}
```

Rules:

- Keep the diff minimal.
- Inspect only directly relevant files.
- Run the cheapest relevant check.
- State skipped checks and why.

## PUDO Standard

Use Standard for most feature and bug work.

Required flow:

1. Plan with scope, success criteria, constraints, and risks.
2. Understand by inspecting relevant files and existing patterns.
3. Develop in small patches with tests when behavior changes.
4. Optimize with self-review and targeted verification.

Exit evidence:

- Scope and success criteria are traceable to the diff.
- Relevant code paths were inspected.
- Tests/checks ran or were explicitly skipped.
- Remaining risks are documented.

## PUDO Enterprise

Use Enterprise when failure has real operational, security, financial, compliance, or team coordination cost.

Additional requirements:

- Named owner or reviewer.
- Rollback or recovery plan.
- Monitoring/logging plan.
- Migration and compatibility notes.
- Security review when auth, data, secrets, or permissions change.
- Risk log with accepted risks and follow-up owners.

Enterprise is not "more prompts." It is stronger evidence before release.

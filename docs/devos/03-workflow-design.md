# 3. Workflow Design

## Overview

Workflows are the primary unit of the AI DevOS — not prompts. Each workflow defines a complete, repeatable engineering process with explicit contracts at every step.

## Lifecycle Map

```text
Idea → Discovery → Requirements → PRD → Architecture → Task Breakdown
  → Implementation → Testing → Review → Deployment → Release
  → Monitoring → Maintenance → Iteration
```

PUDO's 4 phases (Plan → Understand → Develop → Optimize) map to subsets of this lifecycle and remain the **kernel workflow** for code changes.

## Workflow Schema

Every workflow file (YAML) includes:

```yaml
id: string                    # Unique identifier
name: string
version: semver
description: string

inputs:                       # Required and optional inputs
  required: []
  optional: []

outputs:                      # Deliverables
  artifacts: []
  output_contract: schema_ref

dependencies:                 # Other workflows, skills, templates
  workflows: []
  skills: []
  templates: []

phases:                       # Ordered steps
  - id: string
    name: string
    pudo_phase: plan|understand|develop|optimize|release|null
    skills: []
    prompts: []
    templates: []
    gate: quality_gate_ref
    decision_points: []
    exit_conditions: []

failure_modes: []
success_criteria: []
quality_gates: []
non_goals: []
```

## Kernel Workflows (PUDO Phases)

### Plan (`workflows/pudo/plan.yaml`)

| Field | Value |
| --- | --- |
| **Inputs** | Task description, constraints, success criteria |
| **Outputs** | Scope doc, risk list, implementation plan |
| **Skills** | `skills/plan/architecture`, `skills/plan/security` |
| **Prompts** | `prompts/plan/scope-definition.md` |
| **Gate** | Plan Gate — scope, criteria, constraints, out-of-scope clear |
| **Failure modes** | Vague scope, missing non-goals, no verification strategy |
| **Exit** | Plan gate passed OR risk explicitly accepted |

### Understand (`workflows/pudo/understand.yaml`)

| Field | Value |
| --- | --- |
| **Inputs** | Plan output, repo access, relevant file hints |
| **Outputs** | File map, dependency graph, pattern notes, impact analysis |
| **Skills** | `skills/debug/crash-analysis` (if debugging) |
| **Prompts** | `prompts/understand/codebase-analysis.md` |
| **Gate** | Understand Gate — files verified, patterns documented |
| **Failure modes** | Acting from memory, skipping dependency audit |
| **Exit** | Understand gate passed |

### Develop (`workflows/pudo/develop.yaml`)

| Field | Value |
| --- | --- |
| **Inputs** | Plan + Understand outputs |
| **Outputs** | Code changes, tests, task checklist status |
| **Skills** | Domain skills (`skills/code/*`, `skills/test/*`) |
| **Prompts** | `prompts/develop/feature-implementation.md` |
| **Gate** | Develop Gate — in scope, tests present, edge cases handled |
| **Failure modes** | Scope creep, untested changes, breaking patterns |
| **Exit** | Develop gate passed |

### Optimize (`workflows/pudo/optimize.yaml`)

| Field | Value |
| --- | --- |
| **Inputs** | Develop output, diff |
| **Outputs** | Review notes, refactor patches, walkthrough doc |
| **Skills** | `skills/debug/performance` |
| **Prompts** | `prompts/optimize/code-review-checklist.md` |
| **Gate** | Optimize Gate — behavior preserved, risks reviewed |
| **Failure modes** | Cosmetic-only review, skipped security check |
| **Exit** | Optimize gate passed → Release workflow |

## Lifecycle Workflows

### Feature Delivery (`workflows/lifecycle/feature-delivery.yaml`)

Composes PUDO kernel workflows for a medium feature:

```text
Requirements (Plan) → Codebase Analysis (Understand) → Implementation (Develop)
  → Review + Test (Optimize) → Release Gate
```

**Decision points:**
- Scope too large? → Split into sub-features, loop Plan
- Unknown architecture? → Insert Architecture Draft prompt before Understand
- Security-sensitive? → Insert Security Threat Model in Plan phase

### Incident Response (`workflows/lifecycle/incident-response.yaml`)

```text
Triage (Lite Plan) → Log/Crash Analysis (Understand) → Hotfix (Develop Lite)
  → Postmortem Template (Optimize) → Decision Log update (Memory)
```

**Mode:** PUDO Lite for hotfix path; Enterprise for production incidents.

### Idea to MVP (`workflows/lifecycle/idea-to-mvp.yaml`)

```text
Discovery → PRD Template → Architecture → Task Breakdown
  → [Feature Delivery × N] → Deploy Playbook → Release
```

Uses playbooks and starter kits; spans multiple sessions with run traces.

## Decision Points (Global)

| Trigger | Action |
| --- | --- |
| New info invalidates plan | Return to Plan; update memory/decision-log |
| Files not found during Understand | Stop; ask human; do not invent paths |
| Test failure in Develop | Fix or return to Understand if root cause is architectural |
| Gate failure | Block advance; document in session + trace |
| Scope expansion detected | Require explicit Plan update |

## Quality Gate Integration

Each workflow phase references gates from `quality/quality-gates.md`. v3 adds:

- Gate results written to run trace JSON
- MCP `pudo.runQualityGate` validates structured evidence (v3.1), not just keywords (v1)

## Output Contract (Per Workflow)

Every workflow completion produces:

- Executive summary
- Objectives met / not met
- Assumptions and constraints applied
- Trade-offs and risks
- Acceptance criteria status
- Deliverables list
- Affected files
- Testing strategy executed
- Next recommended actions

Schema: `schemas/pudo-output-contract.schema.json`

## Failure Mode Catalog

| Mode | Detection | Recovery |
| --- | --- | --- |
| Context overflow | Token budget exceeded | Use context pack; reduce scope |
| Hallucinated API | Understand gate catches | Re-read source files |
| Gate bypass | Trace shows skipped gate | Block release; require gate pass |
| Session loss | Missing session.md | Restore from trace + memory |
| Skill mismatch | Wrong skill for task | Workflow reroutes via decision point |

## Success Metrics

| Metric | Target |
| --- | --- |
| Gate pass rate before release | > 95% |
| Rework loops (Plan revisits) | < 2 per feature |
| Trace completeness | 100% of Enterprise mode tasks |
| Time to first verified implementation | Measured via benchmarks |

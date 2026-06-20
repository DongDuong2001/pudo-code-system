# 11. Template Library

## Purpose

Templates are **reusable engineering artifact scaffolds** — structured starting points for documents, specs, and reports that workflows and skills produce.

## Organization

```text
templates/
├── README.md                    # Index (existing)
├── stacks/                      # Renamed conceptually from templates/{stack}/
│   ├── nextjs/
│   └── ...
├── engineering/                 # NEW — doc templates
│   ├── prd.md
│   ├── rfc.md
│   ├── adr.md
│   ├── api-specification.md
│   ├── database-design.md
│   ├── technical-design.md
│   ├── test-plan.md
│   ├── bug-report.md
│   ├── incident-report.md
│   ├── migration-plan.md
│   ├── release-notes.md
│   ├── changelog-entry.md
│   ├── postmortem.md
│   ├── retrospective.md
│   ├── sprint-planning.md
│   └── feature-proposal.md
├── output-contract/             # NEW
│   └── template.md
└── copilot-cloud-agent/         # Existing
```

Stack templates remain at `templates/{stack}/` during migration; v4 may move to `templates/stacks/`.

## Template Registry

| Template | Workflow Phase | Output Contract Section |
| --- | --- | --- |
| PRD | Plan / Discovery | Objectives, acceptance criteria |
| RFC | Plan / Architecture | Trade-offs, alternatives |
| ADR | Plan / Architecture | Decision, rationale, consequences |
| API Specification | Plan | Contracts, endpoints, schemas |
| Database Design | Plan | Schema, migrations, indexes |
| Technical Design | Plan / Understand | Architecture impact |
| Test Plan | Develop | Testing strategy |
| Bug Report | Understand | Reproduction, environment |
| Incident Report | Incident response | Timeline, impact, root cause |
| Migration Plan | Release | Rollback, data migration |
| Release Notes | Release | User-facing changes |
| Postmortem | Optimize / Incident | Lessons learned |
| Retrospective | Iteration | Improvements |
| Feature Proposal | Plan | Scope, ROI estimate |
| Sprint Planning | Plan | Tasks, owners, estimates |

## Template Format Standard

Each engineering template includes:

```markdown
# {Artifact Title}

> Template version: 1.0 | Workflow: {ref} | Skill: {ref}

## Metadata
- Author:
- Date:
- Status: draft | review | approved

## {Artifact-specific sections}

## Acceptance Criteria
- [ ] ...

## Related
- Memory files to update
- Quality gate reference
```

## Output Contract Template

Every workflow completion uses `templates/output-contract/template.md`:

| Section | Required |
| --- | --- |
| Executive Summary | Yes |
| Objectives | Yes |
| Assumptions | Yes |
| Constraints | Yes |
| Trade-offs | If applicable |
| Risks | Yes |
| Acceptance Criteria | Yes |
| Deliverables | Yes |
| Affected Files | Yes |
| Architecture Impact | If applicable |
| Testing Strategy | Yes |
| Deployment Notes | If releasing |
| Rollback Strategy | Enterprise |
| Future Improvements | Optional |
| Next Recommended Actions | Yes |

JSON equivalent: `schemas/pudo-output-contract.schema.json`

## Usage in Skills

Skills reference templates in Output Contract:

```markdown
## Output Contract
- Fill `templates/engineering/adr.md` for architectural decisions
- Update `.pudo/memory/decision-log.md`
```

## CLI Integration (v3.1)

```bash
pudo template list
pudo template show adr
pudo template new adr --output docs/adr/001-use-postgres.md
```

## Justification

Centralizing templates prevents every skill from inventing its own PRD format. Workflows declare which templates are required outputs for gate passage.

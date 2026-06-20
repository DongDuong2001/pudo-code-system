# Workflows

End-to-end, machine-readable workflow definitions for the PUDO AI DevOS.

## Purpose

Workflows are the primary execution unit — not prompts. Each workflow defines inputs, outputs, phases, skills, gates, and failure modes.

## Structure

```text
workflows/
├── README.md           # This file
├── pudo/               # Kernel workflows (PUDO 4 phases + release)
│   ├── plan.yaml
│   ├── understand.yaml
│   ├── develop.yaml
│   └── optimize.yaml
└── lifecycle/          # Composed lifecycle workflows
    ├── feature-delivery.yaml
    ├── incident-response.yaml
    └── idea-to-mvp.yaml
```

## Workflow Schema

See `schemas/workflow.schema.json` and `docs/devos/03-workflow-design.md`.

## Usage

### Humans

Pick a workflow matching your task in `lifecycle/` or use PUDO kernel phases for code changes.

### Agents

1. Read workflow YAML for current task
2. Load declared skills and prompts per phase
3. Produce output contract at phase completion
4. Pass quality gate before advancing
5. Emit run trace to `.pudo/traces/`

## Related

- [Workflow Design Spec](../docs/devos/03-workflow-design.md)
- [Quality Gates](../quality/quality-gates.md)
- [Playbooks](../playbooks/README.md)

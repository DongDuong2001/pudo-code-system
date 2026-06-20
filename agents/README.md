# Agents

Agent role definitions for the PUDO AI DevOS. Roles describe **who** acts; skills describe **how**.

## Purpose

- Define specialist agent responsibilities
- Map roles to skills and workflows
- Support future multi-agent delegation (v4)

## Structure

```text
agents/
├── README.md
└── roles/
    ├── product-owner.md
    ├── solution-architect.md
    ├── code-reviewer.md
    ├── security-engineer.md
    └── technical-writer.md
```

## Role Schema

Each role file includes:

- **Responsibilities** — what this agent owns
- **Inputs** — what it needs to start
- **Outputs** — what it produces
- **Skills** — linked skill files
- **Workflows** — when this role is primary
- **Decision Rules** — escalate, defer, refuse
- **Quality Checklist** — before handoff

## Role vs Skill

| Concept | Location | Example |
| --- | --- | --- |
| Role | `agents/roles/` | Code Reviewer — owns review process |
| Skill | `skills/` | Performance profiling — how to profile |

A role may invoke multiple skills. A skill may be used by multiple roles.

## Related

- [Skill System](../docs/devos/04-skill-system.md)
- [Agent Skill Contract](../docs/agent-skill-contract.md)

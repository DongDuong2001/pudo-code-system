# Memory System

Persistent project memory templates for the PUDO AI DevOS.

## Purpose

Reduce repeated context reconstruction across AI sessions. Templates install to `.pudo/memory/` via `pudo init --memory`.

## Templates

| Template | File | Purpose |
| --- | --- | --- |
| Project | `templates/project.md` | Vision, goals, stakeholders |
| Business | `templates/business.md` | Business rules, segments |
| Architecture | `templates/architecture.md` | System design, components |
| Coding Style | `templates/coding-style.md` | Conventions, patterns |
| Tech Stack | `templates/tech-stack.md` | Languages, frameworks, infra |
| Glossary | `templates/glossary.md` | Domain terminology |
| Roadmap | `templates/roadmap.md` | Planned work, priorities |
| Decision Log | `templates/decision-log.md` | ADR-style decisions |
| Known Issues | `templates/known-issues.md` | Active bugs, tech debt |

## Install

```bash
pudo init --memory              # All templates
pudo init --memory=minimal        # project.md + tech-stack.md only
pudo init --memory=enterprise     # All + glossary scaffold
```

## Agent Rules

- **Read** at session start: `project.md`, `tech-stack.md`
- **Write** requires approval (MCP `confirmWrite: true`)
- **Append** to decision-log — never overwrite history

## Related

- [Memory System Spec](../docs/devos/05-memory-system.md)
- [Session Handoff](../.pudo/session.md)

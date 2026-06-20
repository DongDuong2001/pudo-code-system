# 8. Documentation Strategy

## Principles

1. **Dual audience** — every doc readable by humans; structured for agent parsing
2. **Single source of truth** — no duplicated content; link instead
3. **Progressive disclosure** — README → guide → reference → schema
4. **Versioned with code** — docs change in same PR as features
5. **i18n where it matters** — README translations continue; DevOS docs English-first

## Documentation Layers

```text
Layer 1: Orientation     README.md, docs/getting-started.md
Layer 2: Methodology     docs/workflow.md, docs/philosophy.md, docs/pudo-modes.md
Layer 3: DevOS Spec      docs/devos/* (this set)
Layer 4: Reference       schemas/, commands/, workflows/*.yaml
Layer 5: Deep dives      quality/, governance/, context/domains/
```

## README Rewrite (v3)

The root README will explain:

| Section | Content |
| --- | --- |
| Vision | AI DevOS — not a prompt collection |
| Mission | Reliable human+AI software engineering |
| Design Philosophy | Workflow first, AI native, modular, deterministic |
| Architecture | OS module diagram |
| Workflow Model | Lifecycle + PUDO kernel |
| Skill System | Specialist capabilities |
| Memory System | Persistent project knowledge |
| Context System | Domain packs |
| Governance | Org standards |
| Quick Start | `npx pudo-code-system init` |
| Examples | Link to examples/ |
| Roadmap | Link to migration roadmap |
| FAQ | Common questions |
| Contributing | Conventional commits, PR process |

Existing README content preserved during transition; v3 adds DevOS sections above the fold.

## File Format Standards

| Doc Type | Format | Max Size |
| --- | --- | --- |
| Guides | Markdown, H2 sections | 500 lines |
| Reference | Markdown + tables | 300 lines |
| Workflows | YAML + JSON Schema | 200 lines |
| Skills | Markdown (skill contract) | 400 lines |
| Schemas | JSON Schema Draft 2020-12 | — |

### Agent-Friendly Markdown

- Use H2 (`##`) for major sections agents can jump to
- Tables for structured data (terminology, checklists)
- Explicit `## Input Contract` / `## Output Contract` headers
- No HTML except badges in README
- Code blocks with language tags

## Cross-Reference Rules

- Relative links only (`../quality/quality-gates.md`)
- Every module README links to parent and siblings
- `docs/README.md` indexes all doc sets
- Deprecated paths get redirect note for 2 major versions

## Documentation CI (v3.1)

Planned checks:

- Broken link checker
- `pudo lint` on prompts and skills
- Schema validation for workflow YAML
- Required sections in new skills

## Migration: Existing Docs

| Current | Action |
| --- | --- |
| `docs/architecture.md` | Keep; add pointer to `docs/devos/01-repository-architecture.md` |
| `docs/agent-skill-contract.md` | Keep as normative spec; skills migrate to comply |
| `ROADMAP.md` | Extend with v3-v5 milestones from migration roadmap |
| Translated READMEs | Update after English README stabilizes |

## Success Criteria

- New contributor can understand DevOS in < 30 minutes (getting-started path)
- Agent can navigate from AGENTS.md to any workflow without guessing paths
- Zero broken links in docs/ (CI enforced)

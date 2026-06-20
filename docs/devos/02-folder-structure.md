# 2. Folder Structure

## Target Layout (v3)

```text
pudo-code-system/
│
├── KERNEL & ENTRY
│   ├── AGENTS.md
│   ├── CLAUDE.md
│   ├── GEMINI.md
│   ├── README.md
│   └── docs/
│       ├── philosophy.md
│       ├── workflow.md
│       └── devos/                    # This design doc set
│
├── SERVICES
│   ├── workflows/                    # NEW — lifecycle workflow definitions
│   │   ├── README.md
│   │   ├── lifecycle/
│   │   │   ├── idea-to-mvp.yaml
│   │   │   ├── feature-delivery.yaml
│   │   │   └── incident-response.yaml
│   │   └── pudo/                     # Maps to existing 4 phases
│   │       ├── plan.yaml
│   │       ├── understand.yaml
│   │       ├── develop.yaml
│   │       └── optimize.yaml
│   │
│   ├── agents/                       # NEW — agent role definitions
│   │   ├── README.md
│   │   └── roles/
│   │       ├── solution-architect.md
│   │       ├── code-reviewer.md
│   │       └── ...
│   │
│   ├── skills/                       # EXISTING — upgrade to full contract
│   │   ├── plan/
│   │   ├── code/
│   │   └── ...
│   │
│   ├── prompts/                      # EXISTING — linked from workflows
│   │   ├── plan/
│   │   ├── understand/
│   │   ├── develop/
│   │   └── optimize/
│   │
│   └── quality/                      # EXISTING — gates and checklists
│
├── RUNTIME
│   ├── bin/pudo.js
│   ├── src/cli.js
│   ├── commands/                     # NEW — declarative command specs
│   ├── automation/                   # NEW — CI/release recipes
│   ├── schemas/
│   │   ├── pudo-score.schema.json
│   │   ├── pudo-run-trace.schema.json
│   │   ├── pudo-output-contract.schema.json   # NEW
│   │   └── workflow.schema.json               # NEW
│   └── packages/pudo-mcp-server/
│
├── STATE & KNOWLEDGE
│   ├── memory/                       # NEW — templates (installed to .pudo/memory/)
│   │   ├── templates/
│   │   │   ├── project.md
│   │   │   ├── architecture.md
│   │   │   └── decision-log.md
│   │   └── README.md
│   │
│   ├── context/                      # NEW — domain context packs
│   │   ├── domains/
│   │   │   ├── saas.md
│   │   │   ├── fintech.md
│   │   │   └── ...
│   │   └── README.md
│   │
│   └── knowledge/                    # NEW — patterns and research
│       └── README.md
│
├── USERLAND
│   ├── playbooks/                    # NEW
│   ├── starter-kits/                 # NEW (extends templates/)
│   ├── templates/                    # EXISTING — stack scaffolds + doc templates
│   ├── examples/                     # EXISTING
│   └── checklists/                   # NEW — workflow checklists (refs quality/)
│
├── GOVERNANCE
│   ├── governance/                   # NEW
│   │   ├── coding-standards.md
│   │   ├── git-workflow.md
│   │   └── release-process.md
│   └── research/                     # NEW — AI engineering research notes
│
├── DRIVERS
│   ├── cursor/
│   ├── claude/
│   ├── codex/
│   ├── integrations/               # NEW
│   └── .github/copilot-instructions.md
│
├── MEASUREMENT
│   └── benchmarks/
│
└── INSTALLED (per project via pudo init)
    └── .pudo/
        ├── config.json
        ├── session.md
        ├── memory/                   # NEW — project-specific memory
        ├── traces/                   # NEW — run trace JSON files
        └── checklists/
```

## Migration Mapping

| Current Path | v3 Path | Action |
| --- | --- | --- |
| `docs/workflow.md` | `docs/workflow.md` + `workflows/pudo/*.yaml` | Keep doc; add machine-readable workflow specs |
| `prompts/*` | `prompts/*` (linked from workflows) | No move; add workflow references |
| `skills/*` | `skills/*` | Upgrade format to full skill contract |
| `templates/nextjs/` etc. | `templates/` + `starter-kits/` | Starter kits wrap templates + workflow hooks |
| `quality/*` | `quality/*` + `governance/*` | Split org standards into governance |
| `.pudo/session.md` | `.pudo/session.md` + `.pudo/traces/` | Extend init to create trace dir |
| `docs/architecture.md` | `docs/architecture.md` + `architecture/` | Add pattern library |
| N/A | `agents/`, `playbooks/`, `context/`, `memory/` | New modules |

## File Naming Conventions

| Type | Pattern | Example |
| --- | --- | --- |
| Workflow spec | `{name}.yaml` | `workflows/lifecycle/feature-delivery.yaml` |
| Skill | `SKILL.md` | `skills/plan/architecture/SKILL.md` |
| Agent role | `{role}.md` | `agents/roles/code-reviewer.md` |
| Domain context | `{domain}.md` | `context/domains/saas.md` |
| Playbook | `{outcome}.md` | `playbooks/build-mvp.md` |
| Memory template | `{topic}.md` | `memory/templates/decision-log.md` |
| Output trace | `{trace_id}.json` | `.pudo/traces/550e8400-....json` |

## Coupling Rules

1. **Workflows** may reference skills, prompts, templates, quality gates — never tool-specific drivers
2. **Skills** may reference templates and quality checklists — never workflows directly
3. **Drivers** may only reference kernel (`AGENTS.md`) and service indexes (`workflows/README.md`)
4. **Memory** is written at project install time; templates live in repo, instances in `.pudo/memory/`
5. **Schemas** are the contract boundary between CLI, MCP, and documentation

## Size Budget

Keep the OS lightweight:

- Workflow YAML: max 200 lines each
- Skill files: max 400 lines (split sub-skills if larger)
- Domain context: max 300 lines (link to knowledge/ for depth)
- Playbooks: max 500 lines (compose workflows, don't duplicate)

**Justification:** Large monolithic files defeat context engineering and agent loading efficiency.

# 4. Skill System

## Purpose

Skills are **reusable specialist capabilities** — not copy-paste prompts. An agent loads a skill when the workflow or task matches the skill's activation criteria.

## Composition Hierarchy

```text
Workflow
  └── Step: "Design API contract"
        └── Skill: api-designer
              └── Template: api-specification.md
                    └── Output Contract
```

## Skill Contract (Required Sections)

Based on `docs/agent-skill-contract.md`, every v3 skill MUST include:

| Section | Purpose |
| --- | --- |
| **Name** | Clear identifier |
| **Use When** | Activation triggers (task type, keywords, workflow step) |
| **Responsibilities** | What this specialist owns |
| **Input Contract** | Required and optional inputs |
| **Output Contract** | Exact artifacts produced |
| **Decision Rules** | When to escalate, defer, or refuse |
| **Workflow** | Step-by-step procedure |
| **Best Practices** | Domain-specific guidance |
| **Common Mistakes** | Anti-patterns to avoid |
| **Quality Checklist** | Pass/fail before completion |
| **Failure Modes** | How the skill produces bad output |
| **Command / Tool Expectations** | Preferred tools and verification |
| **Example Transcript** | Request → action → result |

## Skill Registry

### Product & Design

| Skill ID | Path | Responsibilities |
| --- | --- | --- |
| `product-owner` | `agents/roles/product-owner.md` | Prioritize, define acceptance criteria |
| `business-analyst` | `agents/roles/business-analyst.md` | Requirements, process maps |
| `ux-researcher` | `agents/roles/ux-researcher.md` | User needs, journey maps |

### Architecture & Engineering

| Skill ID | Path | Responsibilities |
| --- | --- | --- |
| `solution-architect` | `skills/plan/architecture/` | System design, ADRs |
| `api-designer` | `skills/plan/api-design/` | REST/GraphQL contracts |
| `database-engineer` | `skills/plan/database/` | Schema, migrations |
| `security-engineer` | `skills/plan/security/` | Threat models, hardening |
| `backend-engineer` | `skills/code/backend/` | Server-side implementation |
| `frontend-engineer` | `skills/code/frontend/` | UI implementation |
| `mobile-engineer` | `skills/mobile/` | React Native, etc. |

### Quality & Operations

| Skill ID | Path | Responsibilities |
| --- | --- | --- |
| `qa-engineer` | `skills/test/` | Test strategy, coverage |
| `devops-engineer` | `skills/devops/` | CI/CD, infra |
| `performance-engineer` | `skills/debug/performance/` | Profiling, optimization |
| `code-reviewer` | `agents/roles/code-reviewer.md` | Review diffs, patterns |
| `technical-writer` | `agents/roles/technical-writer.md` | Docs, release notes |

## Skill Loading Rules

1. **Workflow declares skills** — agent loads only skills referenced by current workflow step
2. **One primary skill per step** — secondary skills are read-only references
3. **Domain context overlay** — if `context/domains/{domain}.md` is configured, merge terminology section
4. **Memory injection** — load relevant `.pudo/memory/*.md` files listed in skill input contract
5. **Token budget** — Lite mode loads skill summary only; Standard loads full skill; Enterprise loads skill + sub-skills

## Migration: Existing Skills → v3 Contract

Current skills (`skills/plan/SKILL.md`, etc.) use a simpler format:

```markdown
## Context / Variables / Prompt / Example Usage
```

**Migration steps per skill:**

1. Rename `Prompt` section to `Workflow`
2. Add `Use When`, `Input Contract`, `Output Contract`
3. Add `Quality Checklist` and `Failure Modes`
4. Add `Decision Rules`
5. Run `pudo lint --skills` (v3 CLI command, planned)

**Priority order:** plan → code → test → debug → devops (by usage frequency)

## Skill Discovery

| Method | v3 Support |
| --- | --- |
| Manual path | Agent reads path from workflow YAML |
| MCP tool | `pudo.listSkills` (v3.1) |
| CLI | `pudo skills list --domain=plan` (v3.1) |
| Cursor rule | `@skills/plan/architecture/SKILL.md` reference |

## Inter-Skill Delegation (v4 Preview)

```text
Staff Engineer skill
  ├── delegates to: backend-engineer (implementation)
  ├── delegates to: security-engineer (review)
  └── synthesizes: architecture impact
```

Delegation graphs live in `agents/` module; v3 defines roles only, v4 adds runtime routing.

## Quality Checklist (Skill Author)

- [ ] All 12 contract sections present
- [ ] Input contract lists required vs optional
- [ ] Output contract names specific file artifacts
- [ ] Failure modes include hallucination and scope creep
- [ ] Example transcript is realistic and repo-specific
- [ ] No duplicate content from parent domain SKILL.md (link instead)

# 6. Context System

## Purpose

Domain context packs provide **industry and product-type knowledge** that applies across projects. Unlike project memory (specific to one repo), context packs are **read-only overlays** loaded when the project's domain matches.

## Architecture

```text
context/domains/{domain}.md
        │
        ▼
.pudo/config.json → "domain": "saas"
        │
        ▼
Workflow step merges domain terminology + rules into agent context
```

## Domain Registry

| Domain | File | Key Contents |
| --- | --- | --- |
| SaaS | `context/domains/saas.md` | Multi-tenancy, billing, onboarding |
| FinTech | `context/domains/fintech.md` | PCI, KYC, audit trails |
| Healthcare | `context/domains/healthcare.md` | HIPAA, PHI handling |
| E-commerce | `context/domains/ecommerce.md` | Cart, inventory, payments |
| Developer Tools | `context/domains/devtools.md` | DX, CLI patterns, docs |
| AI Products | `context/domains/ai-products.md` | Prompt safety, eval, RAG |
| Internal Tools | `context/domains/internal-tools.md` | Auth, RBAC, admin panels |
| Marketplace | `context/domains/marketplace.md` | Two-sided, trust, disputes |

## Context Pack Schema

Each domain file includes:

```markdown
# {Domain} Context Pack

## Terminology
| Term | Definition |
| --- | --- |

## Business Rules
- Common constraints and invariants

## Architecture Patterns
- Recommended patterns for this domain

## Regulatory Concerns
- Compliance requirements (if applicable)

## Common Workflows
- Typical feature flows in this domain

## Recommended Practices
- Do's and don'ts

## Anti-Patterns
- Common mistakes in this domain

## Related Skills
- skills/plan/security (FinTech)
- skills/code/backend (SaaS)

## Related Playbooks
- playbooks/launch-saas.md
```

## Loading Rules

1. Domain set in `.pudo/config.json` at init or manually
2. Workflow YAML may override: `context: [saas, fintech]` for cross-domain
3. Agent loads **Terminology + Business Rules + Regulatory** sections by default
4. Full pack loaded in Enterprise mode or when workflow declares it
5. Context packs never written by agents — propose changes via PR to repo

## Context Engineering Integration

Combines with existing `docs/context-engineering.md`:

| Technique | Application |
| --- | --- |
| Context pack | Domain overlay (~2-5K tokens) |
| Memory files | Project-specific (~1-10K tokens) |
| Context pack tool (MCP) | Repo-bounded file selection |
| Token budget rules | `quality/token-budget.md` caps total |

**Load order:** Kernel rules → Domain context → Project memory → Workflow → Skill → Task-specific files

## Multi-Domain Projects

For projects spanning domains (e.g., FinTech SaaS):

```json
{
  "domain": "primary",
  "context_domains": ["fintech", "saas"]
}
```

Agent merges terminology tables; flags conflicts in decision-log.

## v3 Deliverables

- [x] Context module README
- [x] Sample domain packs (SaaS, FinTech, DevTools)
- [ ] CLI: `pudo context list|show {domain}` (v3.1)
- [ ] MCP: `pudo.loadContextPack` (v3.1)
- [ ] Init flag: `--domain=saas` (v3.1)

## Justification

Separating domain knowledge from project memory prevents bloat in `.pudo/memory/` and enables reuse across repos. A FinTech startup and a FinTech enterprise share regulatory context but differ in project memory.

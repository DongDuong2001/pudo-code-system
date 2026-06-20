# Launch SaaS Playbook

## Outcome

A production-ready SaaS application with authentication, billing, core user flow, and deployment infrastructure.

## Prerequisites

- PUDO: `npx pudo-code-system init --strictness=standard --memory`
- Starter kit: `starter-kits/saas/` (or `--project=nextjs --domain=saas`)
- Context: `context/domains/saas.md`

## Phases

### Phase 1: Product Definition

- **Templates:** `templates/engineering/prd.md`
- **Context:** SaaS terminology and business rules
- **Gate:** Plan Gate
- **Memory:** `project.md`, `roadmap.md`

### Phase 2: Architecture & Tenancy

- **Skills:** `skills/plan/architecture`, `skills/plan/database`, `skills/plan/security`
- **Templates:** `templates/engineering/adr.md`, `memory/templates/architecture.md`
- **Decision:** Row-level vs schema-per-tenant (document in ADR)
- **Gate:** Understand Gate

### Phase 3: Core Platform

- **Workflow:** `feature-delivery` for auth, onboarding, dashboard
- **Playbook ref:** [implement-auth](implement-auth.md) (when ready)
- **Gate:** Develop + Optimize per feature

### Phase 4: Billing & Subscriptions

- **Context:** SaaS billing rules (webhooks, idempotency)
- **Skills:** `skills/code/backend`, `skills/plan/security`
- **Gate:** Security review for payment webhooks

### Phase 5: Launch

- **Playbook:** [deploy-production](deploy-production.md)
- **Gate:** Release Gate (rollback, monitoring, changelog)
- **Memory:** `tech-stack.md`, `decision-log.md`

## Success Metrics

| Metric | Target |
| --- | --- |
| Signup → first value | < 5 minutes |
| Tenant isolation verified | 100% |
| Billing webhook idempotency | Tested |
| Production deploy | With rollback plan |

## Related

- [SaaS Context Pack](../context/domains/saas.md)
- [SaaS Starter Kit](../starter-kits/saas/kit.json)
- [Build MVP Playbook](build-mvp.md)

# Build MVP Playbook

## Outcome

A working minimum viable product deployed to staging or production with core user flow functional, basic tests, and documented scope.

## Prerequisites

- PUDO installed: `npx pudo-code-system init --strictness=standard --memory`
- Team size: 1-3 developers
- Starter kit (optional): any `starter-kits/*` matching your stack

## Phases

### Phase 1: Discovery & Scope (Week 1)

- **Workflow:** `workflows/lifecycle/idea-to-mvp.yaml` (Plan subset)
- **Templates:** `templates/engineering/prd.md`, `templates/engineering/feature-proposal.md`
- **Skills:** `skills/plan/architecture/SKILL.md`
- **Gate:** Plan Gate
- **Memory updates:** `project.md`, `roadmap.md`
- **Decision:** If scope > 2 weeks of work, cut features until it fits

### Phase 2: Foundation (Week 1-2)

- **Workflow:** Starter kit init or `pudo init --project={stack}`
- **Templates:** `memory/templates/architecture.md`
- **Skills:** `skills/plan/architecture/SKILL.md`, `skills/plan/database/SKILL.md`
- **Gate:** Understand Gate (architecture documented)
- **Memory updates:** `architecture.md`, `tech-stack.md`

### Phase 3: Core Features (Week 2-3)

- **Workflow:** `workflows/lifecycle/feature-delivery.yaml` (repeat per feature)
- **Skills:** Domain skills from `skills/code/`
- **Gate:** Develop + Optimize Gates per feature
- **Decision:** Defer nice-to-haves to post-MVP backlog

### Phase 4: Deploy (Week 3-4)

- **Playbook:** [deploy-production](deploy-production.md)
- **Gate:** Release Gate
- **Memory updates:** `tech-stack.md` (infra), `decision-log.md`

## Deliverables

- [ ] PRD with explicit MVP scope and non-goals
- [ ] Deployed application (staging minimum)
- [ ] Core user flow tested
- [ ] README with setup instructions
- [ ] `.pudo/memory/` populated
- [ ] Run trace for Enterprise mode

## Success Metrics

| Metric | Target |
| --- | --- |
| Time to deploy | ≤ 4 weeks |
| Core flow works | 100% |
| Gate pass rate | 100% before release |
| Post-launch P0 bugs | ≤ 2 in first week |

## Common Failures

| Failure | Recovery |
| --- | --- |
| Scope creep | Return to Phase 1; update PRD |
| Skipping tests | Block deploy until Develop gate passes |
| No rollback plan | Complete deploy-production playbook first |

## Related

- [Feature Delivery Workflow](../workflows/lifecycle/feature-delivery.yaml)
- [SaaS Context Pack](../context/domains/saas.md) (if applicable)

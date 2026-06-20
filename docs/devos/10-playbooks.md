# 10. Playbooks

## Purpose

Playbooks are **complete business outcome workflows** — multi-step processes that compose lifecycle workflows, skills, templates, and starter kits to achieve a specific goal.

## Playbook vs Workflow

| Aspect | Workflow | Playbook |
| --- | --- | --- |
| Scope | Single engineering process | End-to-end business outcome |
| Duration | Hours to days | Days to weeks |
| Composition | Skills + prompts + gates | Multiple workflows + decisions |
| Example | Feature delivery | Launch a SaaS |

## Playbook Schema

```markdown
# {Playbook Title}

## Outcome
{What success looks like}

## Prerequisites
- Starter kit, team size, tools

## Phases
### Phase 1: {Name}
- Workflow: {ref}
- Skills: {refs}
- Templates: {refs}
- Gate: {ref}
- Decision: {if X then Y}

## Deliverables
- List of artifacts produced

## Success Metrics
- Measurable outcomes

## Common Failures
- Pitfalls and recovery

## Related
- Starter kits, context packs, examples
```

## Playbook Registry

| Playbook | Outcome | Workflows Used | Starter Kit |
| --- | --- | --- | --- |
| [build-mvp](../playbooks/build-mvp.md) | Working MVP in 2-4 weeks | idea-to-mvp, feature-delivery | Any |
| [launch-saas](../playbooks/launch-saas.md) | Production SaaS launch | idea-to-mvp, feature-delivery, deploy | saas |
| [modernize-legacy](../playbooks/modernize-legacy.md) | Incremental modernization | understand-heavy, feature-delivery | — |
| [design-ai-product](../playbooks/design-ai-product.md) | AI product from concept | idea-to-mvp, security | ai-chatbot |
| [build-internal-tool](../playbooks/build-internal-tool.md) | Internal dashboard/tool | feature-delivery | admin-panel |
| [implement-auth](../playbooks/implement-auth.md) | Production auth system | plan (security), feature-delivery | — |
| [deploy-production](../playbooks/deploy-production.md) | First production deploy | optimize, release | — |
| [scale-infrastructure](../playbooks/scale-infrastructure.md) | Handle 10x traffic | performance, devops skills | microservices |
| [enterprise-readiness](../playbooks/enterprise-readiness.md) | SOC2-ready practices | governance full set | saas |
| [reduce-tech-debt](../playbooks/reduce-tech-debt.md) | Measurable debt reduction | refactor workflow | — |
| [security-hardening](../playbooks/security-hardening.md) | Security audit + fixes | security threat model | — |

## Sample Flow: Launch SaaS

```text
Week 1: Discovery + PRD (Plan workflows)
        └── playbook/launch-saas.md § Phase 1

Week 2: Architecture + starter kit init
        └── starter-kits/saas + skills/plan/architecture

Week 3-4: Core features (feature-delivery × N)
        └── workflows/lifecycle/feature-delivery.yaml

Week 5: Auth + billing (implement-auth sub-playbook)
        └── context/domains/saas.md + skills/plan/security

Week 6: Deploy + release
        └── playbooks/deploy-production.md

Ongoing: Monitoring + iteration
        └── memory/roadmap.md updates
```

## Decision Points in Playbooks

Playbooks include explicit human decision gates:

| Decision | Options | Default |
| --- | --- | --- |
| MVP scope too large? | Cut features / extend timeline | Cut features |
| Build vs buy (auth, billing)? | Build / Integrate (Stripe, Clerk) | Integrate for MVP |
| Single vs multi-tenant? | Document in ADR | Single-tenant MVP |
| Compliance required? | Enable Enterprise mode | If handling PII/payments |

## Integration with Memory

Playbooks update memory files at phase boundaries:

- End Phase 1 → `roadmap.md`, `project.md`
- Architecture complete → `architecture.md`
- Each ADR → `decision-log.md`
- Launch → `tech-stack.md` (production infra)

## Justification

Playbooks bridge the gap between methodology (PUDO loop) and business outcomes (launch, modernize, scale). They prevent teams from assembling workflows ad hoc.

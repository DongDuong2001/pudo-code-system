# SaaS Context Pack

Domain overlay for software-as-a-service products.

## Terminology

| Term | Definition |
| --- | --- |
| Tenant | An isolated customer organization or account |
| Subscription | Recurring billing relationship |
| MRR | Monthly recurring revenue |
| Churn | Rate of subscription cancellations |
| Onboarding | Flow from signup to first value |
| Feature flag | Runtime toggle for gradual rollout |

## Business Rules

- Every user action must be scoped to a tenant unless explicitly global
- Billing state (active, trialing, past_due) gates feature access
- Free tier limits must be enforceable server-side, not client-only
- Trial expiration requires graceful degradation, not hard lockout without notice

## Architecture Patterns

- **Multi-tenancy:** Row-level tenant_id vs schema-per-tenant vs database-per-tenant
- **Auth:** Session + JWT; OAuth for enterprise SSO
- **Billing:** Stripe or similar webhook-driven subscription sync
- **Background jobs:** Queue for emails, webhooks, usage aggregation
- **Admin panel:** Internal ops separate from customer app

## Regulatory Concerns

- GDPR: data export, deletion, consent
- SOC 2: audit logs, access controls (Enterprise customers)
- PCI: never store raw card data — use payment provider tokens

## Common Workflows

1. Signup → email verify → onboarding wizard → first value
2. Upgrade plan → proration → feature unlock
3. Invite team member → role assignment → tenant scope
4. Cancel subscription → retention offer → data export window

## Recommended Practices

- Idempotent webhook handlers with signature verification
- Usage metering at API boundary for billing alignment
- Tenant context in middleware — fail closed if missing
- Separate staging tenants for demo and QA

## Anti-Patterns

- Hardcoding tenant IDs in queries
- Client-side-only authorization checks
- Synchronous billing API calls in request path
- Sharing Redis/cache keys across tenants without prefix

## Related Skills

- `skills/plan/architecture/SKILL.md`
- `skills/plan/security/SKILL.md`
- `skills/code/backend/SKILL.md`

## Related Playbooks

- `playbooks/launch-saas.md`
- `playbooks/implement-auth.md`

## Related Starter Kits

- `starter-kits/saas/` (v3.1)

# PUDO Prompt

```text
Plan first.

Task:
Add a Stripe webhook handler for successful checkout sessions.

Success criteria:
- Verifies Stripe webhook signatures.
- Creates or updates the order record idempotently.
- Matches existing API route conventions.
- Includes a regression test or documented manual verification.

Understand before coding:
- Inspect existing API routes.
- Inspect order model or database access pattern.
- Inspect env var naming.
- Check existing Stripe client usage.

Quality gates:
- No invented env vars.
- No client-side secret usage.
- Duplicate webhook delivery is safe.
- Verification command is reported.
```

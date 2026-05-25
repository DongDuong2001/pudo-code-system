# Task

Add a Stripe webhook handler for checkout completion in an existing web app.

## Success Criteria

- Verify Stripe webhook signatures.
- Create or update order records idempotently.
- Match existing API route conventions.
- Avoid exposing Stripe secrets to the client.
- Report verification steps.

## Scope

Webhook handler only. Subscription billing, refunds, and payment-method expansion are out of scope.

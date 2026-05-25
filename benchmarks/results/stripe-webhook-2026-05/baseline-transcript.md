# Baseline Transcript

## User

```text
Add a Stripe webhook handler to this app.
```

## Agent Behavior

- Generated an API route before inspecting existing route conventions.
- Introduced two environment variable names that were not used elsewhere in the repo.
- Missed signature verification in the first implementation.
- Needed follow-up prompts to handle duplicate webhook delivery.

## Result

The first working version required several correction turns and had security-sensitive gaps during review.

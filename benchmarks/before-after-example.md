# Before / After Example

## Task

Add a Stripe webhook handler.

## Baseline

- 12 AI turns
- 31k tokens
- 3 wrong attempts
- 2 hallucinated environment variables
- Missing webhook signature verification on first implementation

## With PUDO

- 6 AI turns
- 19k tokens
- 1 wrong attempt
- No hallucinated config
- Signature verification identified during Understand

## Result

- 38.7% fewer tokens
- 27% faster verified implementation
- Fewer PR review comments because the quality gate caught the auth and verification risks earlier

## Notes

Use this as an illustrative format, not as a universal proof claim. Replace the numbers with real project measurements before using them externally.

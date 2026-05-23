# PUDO Result

## Observed Pattern

- 6 AI turns.
- 19k tokens.
- 1 wrong attempt.
- No hallucinated config.
- Signature verification identified during Understand.
- Idempotency handled before implementation was marked complete.

## Why It Improved

The prompt forced source grounding before code generation and made security and idempotency part of the gate, not a late review surprise.

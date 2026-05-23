# Metrics

| Metric | Baseline | With PUDO |
|---|---:|---:|
| AI turns | 12 | 6 |
| Tokens | 31k | 19k |
| Wrong attempts | 3 | 1 |
| Hallucinated env vars | 2 | 0 |
| Time to verified implementation | 100% baseline | 73% baseline |

## Result

- 38.7% fewer tokens.
- 27% faster verified implementation.
- Fewer review comments because webhook security and idempotency were part of the initial quality gate.

## Caveat

This is an illustrative example. Use the benchmark kit to record real project measurements before making external claims.

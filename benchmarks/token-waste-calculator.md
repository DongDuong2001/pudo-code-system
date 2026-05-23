# Token Waste Calculator

Use this worksheet to calculate directional token and time savings.

## Inputs

```text
Baseline wasted tokens:
PUDO wasted tokens:
Baseline verified time:
PUDO verified time:
```

## Formulas

```text
Token waste reduction =
(baseline wasted tokens - PUDO wasted tokens) / baseline wasted tokens * 100

Dev time reduction =
(baseline verified time - PUDO verified time) / baseline verified time * 100
```

## Example

```text
Baseline wasted tokens: 12000
PUDO wasted tokens: 7920

Token waste reduction =
(12000 - 7920) / 12000 * 100 = 34%
```

## Measurement Rules

- Count wasted tokens as irrelevant file dumps, repeated failed attempts, broad rewrites, and output discarded during review.
- Measure verified time, not just first working output.
- Record skipped checks and assumptions.
- Keep baseline and PUDO tasks comparable.

# PUDO Benchmark Kit

Use this kit to measure whether PUDO reduces token waste, rework, and time to verified implementation for your team.

## What to Measure

- Tokens in
- Tokens out
- Number of AI turns
- Number of failed attempts
- Number of files unnecessarily read
- Time to first working version
- Time to verified version
- Bugs found after AI output
- PR review comments

## Formulas

```text
Token waste reduction =
(baseline wasted tokens - PUDO wasted tokens) / baseline wasted tokens * 100

Dev time reduction =
(baseline time - PUDO time) / baseline time * 100
```

## Benchmark Flow

1. Pick one real task.
2. Run or reconstruct the baseline flow without PUDO.
3. Run the same task with PUDO using the same environment and tools.
4. Record metrics in `metrics-sheet.csv`.
5. Document the result in `before-after-example.md`.

## Evidence Standard

Do not claim improvement from one anecdote. Treat one task as a case study, three similar tasks as directional evidence, and ten or more tasks as a useful internal benchmark.

---
name: crash-analysis
description: Analyzing core dumps, stack traces, and unhandled exceptions
---

# Crash Analysis Skill

This skill is designed for debugging fatal errors that result in process termination or generic 500 crashes.

## When to use this skill
- When facing segmentation faults, null pointer exceptions, or stack overflows.
- When an application terminates abruptly without graceful error logs.
- When analyzing core dumps or fatal crash reports.

## Guidelines
- **Start at the Source:** Always look at the top/bottom of the stack trace to find the exact line of application code that triggered the failure, ignoring framework-level abstractions if possible.
- **Reproducibility:** Prioritize establishing a reliable reproduction path or writing a fast failing test.
- **State Capture:** Identify what the data state was exactly at the moment of the crash (variables, inputs).

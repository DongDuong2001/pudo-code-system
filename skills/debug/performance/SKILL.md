---
name: performance-debug
description: Diagnosing and resolving performance bottlenecks and latency issues
---

# Performance Debugging Skill

This skill focuses on identifying, analyzing, and resolving performance-related issues such as slow response times, CPU spikes, and UI lag.

## When to use this skill
- When the application is responding slower than SLAs allow.
- When CPU usage is unexpectedly high.
- When identifying database query bottlenecks (N+1 queries, missing indexes).

## Guidelines
- **Measure First:** Do not guess. Use profilers, APMs (Datadog, New Relic), and logging to find the bottleneck.
- **Isolate the Scope:** Determine if the issue is in the frontend, network, backend, or database layer.
- **Algorithmic Complexity:** Check for accidental O(n^2) or worse loops.
- **Caching:** Consider if a caching layer (Redis, Memcached) can bypass the heavy computation.

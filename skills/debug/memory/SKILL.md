---
name: memory-debug
description: Debugging memory leaks, out-of-memory errors, and garbage collection
---

# Memory Debugging Skill

This skill is designed for identifying and resolving memory leaks and excessive memory footprint allocations.

## When to use this skill
- When an application slowly consumes more RAM over time without releasing it (Memory Leak).
- When facing OutOfMemoryError (OOM) crashes.
- When optimizing Garbage Collection (GC) pauses causing latency.

## Guidelines
- **Heap Dumps:** Export and analyze heap dumps or memory snapshots to find retained objects.
- **Closures & Listeners:** In GC languages, look out for un-unregistered event listeners or dangling closures capturing large scopes.
- **Connections:** Ensure database and network connections are gracefully closed.
- **Streaming:** Avoid loading large files or datasets entirely into memory. Use streaming APIs instead.

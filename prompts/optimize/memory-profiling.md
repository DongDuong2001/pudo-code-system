# Memory Profiling
> Phase: Optimize, Tags: #debugging #memory #latency

## Context
Use this prompt to optimize high memory usage or debug memory leaks.

## Variables
- `{{symptoms}}`: What behavior you are observing.
- `{{language}}`: The language/runtime (e.g., Java GC, Node.js V8).

## Prompt
Act as a Performance Tuning Expert. My {{language}} application is exhibiting these symptoms: {{symptoms}}.

Please help me optimize this by:
1. Explaining the likely causes of this memory pattern.
2. Suggesting the exact commands or tools to generate and analyze a heap dump.
3. Providing code patterns to look for that typically cause memory leaks in this runtime.

## Example Usage
**Input:** My Node.js V8 application is exhibiting these symptoms: Memory usage steadily increases by 50MB every hour and eventually crashes with OutOfMemoryError.

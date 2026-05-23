# Go API PUDO Rules

Use PUDO: Plan -> Understand -> Develop -> Optimize.

## Stack Rules

- Inspect package boundaries before moving code.
- Follow existing error-handling and context propagation patterns.
- Run `go fmt` for touched Go files.
- Add table tests for behavior changes.
- Keep API contract changes explicit.
- Check concurrency and cancellation behavior for long-running work.

# Node + Express PUDO Rules

Use PUDO: Plan -> Understand -> Develop -> Optimize.

## Stack Rules

- Inspect route, middleware, validation, and error-handling conventions.
- Validate request input at trust boundaries.
- Preserve public API contracts unless the task requires a change.
- Check auth and permission middleware before adding endpoints.
- Add tests for status codes, failure paths, and edge cases.
- Avoid logging secrets, tokens, or raw PII.

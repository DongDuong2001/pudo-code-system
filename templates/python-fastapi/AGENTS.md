# Python FastAPI PUDO Rules

Use PUDO: Plan -> Understand -> Develop -> Optimize.

## Stack Rules

- Inspect routers, dependencies, schemas, and service boundaries before editing.
- Preserve Pydantic model conventions.
- Validate auth and dependency injection behavior.
- Add tests for status codes, validation errors, and permission failures.
- Keep async/sync boundaries consistent.
- Check migration and rollback impact for database changes.

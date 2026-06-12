---
applyTo: "**/*.ts,**/*.js,**/*.py,**/*.go,**/*.java,**/*.rb"
---

# Backend Code Guidelines

Follow PUDO workflow: Plan -> Understand -> Develop -> Optimize.

## API Changes

- Inspect existing API patterns and route structure before editing.
- Preserve API contracts and response formats.
- Keep request validation at trust boundaries.
- Document breaking changes in the PR description.

## Database Changes

- Treat migrations as release-risk changes.
- Preserve existing model conventions.
- Check queryset performance and N+1 risks.
- Add rollback notes for database changes.

## Authentication & Permissions

- Inspect auth middleware before adding endpoints.
- Preserve existing permission patterns.
- Add security review for auth/data changes.

## Verification

Run before submitting:
- `npm test` or project-specific test command
- API integration tests if available
- Lint and type checks
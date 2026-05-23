# Laravel PUDO Rules

Use PUDO: Plan -> Understand -> Develop -> Optimize.

## Stack Rules

- Inspect routes, controllers, requests, policies, models, migrations, jobs, and events before editing.
- Use existing validation and authorization patterns.
- Treat migrations and queue changes as release-risk changes.
- Preserve public API resource shapes unless intentionally changed.
- Add feature tests for routes and permission behavior.
- Avoid logging secrets, tokens, or raw PII.

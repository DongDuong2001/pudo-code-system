# Django PUDO Rules

Use PUDO: Plan -> Understand -> Develop -> Optimize.

## Stack Rules

- Inspect apps, models, migrations, views, serializers, forms, and permissions before editing.
- Treat migrations as release-risk changes.
- Preserve admin, signal, and management command conventions.
- Check queryset performance and N+1 risks.
- Add regression tests for bug fixes.
- Verify auth, permissions, and tenant boundaries where relevant.

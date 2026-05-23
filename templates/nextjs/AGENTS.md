# Next.js PUDO Rules

Use PUDO: Plan -> Understand -> Develop -> Optimize.

## Stack Rules

- Check App Router vs Pages Router before editing.
- Verify server/client component boundaries.
- Avoid adding `use client` unless necessary.
- Check route handlers, middleware, env vars, and server actions.
- Keep secrets server-side only.
- Test loading, empty, error, and not-found states when routes change.

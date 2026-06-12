---
description: PUDO rules for frontend code changes
applyWhen: "**/*.{tsx,jsx,vue,svelte,css,scss}"
---

# Frontend Code Guidelines

Follow PUDO workflow: Plan -> Understand -> Develop -> Optimize.

## Component Changes

- Inspect existing component patterns before editing.
- Preserve component boundaries and styling conventions.
- Cover loading, empty, error, and disabled states for UI changes.
- Avoid adding `use client` or client-side directives unless necessary.

## State Management

- Identify state management patterns (React hooks, stores, contexts) before editing.
- Preserve existing state management approach.
- Keep state updates predictable and traceable.

## Testing

- Add component tests for behavioral changes.
- Cover edge cases: loading, empty, error states.
- Use existing test patterns and utilities.

## Verification

Run before submitting:
- `npm run lint` (if available)
- `npm run typecheck` (if available)
- Component-specific tests
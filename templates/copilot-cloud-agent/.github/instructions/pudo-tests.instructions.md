---
applyTo: "**/*.{test,spec}.{ts,tsx,js,jsx,py,go}"
---

# Test Code Guidelines

Follow PUDO workflow: Plan -> Understand -> Develop -> Optimize.

## Test Structure

- Match existing test patterns and conventions.
- Use descriptive test names that explain expected behavior.
- Keep tests focused on a single behavior or scenario.

## Test Coverage

- Add tests for new features and bug fixes.
- Cover edge cases: empty input, boundary values, error conditions.
- Test both success and failure paths.

## Test Quality

- Avoid testing implementation details.
- Prefer testing public API contracts.
- Keep tests deterministic and independent.
- Mock external dependencies, not internal code.

## Verification

- Run full test suite: `npm test`
- Check for flaky tests
- Verify test isolation
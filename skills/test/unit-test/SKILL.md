---
name: unit-test
description: Unit testing techniques, mocking, and assertions
---

# Unit Test Skill

This skill focuses on writing fast, isolated tests for individual units of code (functions, methods, classes).

## When to use this skill
- When writing tests for utility functions, algorithms, or standalone classes.
- When using tools like Jest, pytest, JUnit, or xUnit.
- When needing to mock out dependencies (databases, APIs, file systems).

## Guidelines
- **Isolation:** A unit test should not rely on an external database or network. Use mocks or stubs instead.
- **Naming:** Use clear, descriptive names (e.g., `calculateTotal_withValidInput_returnsCorrectSum`).
- **Structure:** Use the Arrange-Act-Assert (AAA) pattern.
- **Speed:** Unit tests must be fast so developers can run them frequently.

# Test-Driven Development

> **Phase:** 🟢 Develop  
> **Tags:** `#testing` `#tdd` `#quality`  
> **AI Model:** Any (model-agnostic)

## Context

Use this prompt to **write tests alongside your implementation**, not after. The prompt instructs the AI to think test-first: define expected behavior → write the test → then write the code that makes it pass.

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{FEATURE_DESCRIPTION}}` | What the feature does | "User profile update form" |
| `{{TESTING_FRAMEWORK}}` | Which testing tools you use | "Vitest + React Testing Library" |
| `{{CODE_TO_TEST}}` | The implementation code (or description) | (paste the code or describe it) |
| `{{EDGE_CASES}}` | Known edge cases to cover | "Empty name, invalid email, network failure" |

## Prompt

```
Write tests for the following feature:

Feature: {{FEATURE_DESCRIPTION}}
Testing framework: {{TESTING_FRAMEWORK}}
Code/description: {{CODE_TO_TEST}}

Follow a test-driven approach:

1. **Define test cases first** — List all scenarios to test:
   - Happy path (expected usage)
   - Edge cases: {{EDGE_CASES}}
   - Error cases (what should fail gracefully?)
   - Boundary conditions

2. **Write the test file** with all test cases. Each test should:
   - Have a descriptive name (describe what behavior is being tested)
   - Follow the Arrange → Act → Assert pattern
   - Test ONE behavior per test
   - Use realistic test data (not "foo", "bar", "test123")

3. **For each failing test**, write the minimum code to make it pass.

4. **Organize tests** using describe/it blocks grouped by:
   - Feature area
   - Happy path vs edge cases vs error cases

Do NOT write tests that just verify implementation details 
(e.g., "calls useState"). Test BEHAVIOR that users care about.
```

## Example Usage

### Input
```
Write tests for the following feature:

Feature: Email validation utility function
Testing framework: Vitest
Code: A function validateEmail(email: string): ValidationResult 
that returns { valid: boolean, error?: string }

Edge cases: Empty string, missing @, multiple @, 
very long emails (>254 chars), unicode characters, 
spaces in email

[rest of prompt...]
```

### Expected Output
A test file with 10-15 test cases covering: valid emails (standard, subdomains, plus addressing), invalid emails (missing @, double @, trailing dots), edge cases (empty, whitespace, 255+ chars, unicode), organized in describe blocks, with realistic email examples like "developer@company.co.uk" instead of "test@test.com".

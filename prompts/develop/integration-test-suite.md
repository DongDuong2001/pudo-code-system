# Integration Test Suite
> Phase: Develop, Tags: #testing #integration

## Context
Use this prompt to generate tests that verify boundaries between components, like database reads/writes or API calls.

## Variables
- `{{component}}`: The file or module being tested.
- `{{external_dependency}}`: Database, API, etc.
- `{{testing_framework}}`: Jest, PyTest, JUnit, etc.

## Prompt
Act as a QA Automation Engineer. We need to write integration tests for {{component}}, which interacts with {{external_dependency}}. We are using {{testing_framework}}.

Please generate an integration test suite that:
1. Sets up the mock, test container, or test database.
2. Contains a happy path test case.
3. Contains failure path test cases (e.g., connection lost, invalid data).
4. Cleans up state after the test runs.

## Example Usage
**Input:** We need to write integration tests for `UserRepository.ts`, which interacts with PostgreSQL. We are using Jest and Testcontainers.

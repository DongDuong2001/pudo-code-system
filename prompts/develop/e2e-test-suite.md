# E2E Test Suite
> Phase: Develop, Tags: #testing #e2e #automation

## Context
Use this prompt to generate end-to-end tests for UI flows using browser automation frameworks like Playwright or Cypress.

## Variables
- `{{user_flow}}`: The flow you want to test (e.g., "Add to Cart and Checkout").
- `{{tool}}`: Playwright, Cypress, Selenium.

## Prompt
Act as a QA Automation Engineer. We need to write an E2E test for the following user journey: {{user_flow}}. We are using {{tool}}.

Please write the test code emphasizing:
1. Resilient selectors like `data-testid` or ARIA accessibility roles.
2. Waiting for network idle or element visibility rather than hardcoded slumbers.
3. Asserting the final visual state or URL.

## Example Usage
**Input:** We need to write an E2E test for the user journey: "Login with valid credentials and verify dashboard loads". We are using Playwright.

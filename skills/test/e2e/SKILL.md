---
name: e2e-test
description: End-to-end testing user flows using browser automation
---

# End-to-End (E2E) Test Skill

This skill handles full-stack browser and user-journey automation testing.

## When to use this skill
- When verifying critical business flows (e.g., User Signup, Checkout, Payment).
- When using tools like Playwright, Cypress, or Selenium.
- When testing the actual deployed frontend against a real environment.

## Guidelines
- **High ROI Flows:** Only E2E test the most critical user journeys. These tests are slow and brittle.
- **Resilient Selectors:** Prefer querying elements by testing-specific data attributes (e.g., `data-testid`) or ARIA roles rather than fragile CSS classes.
- **Avoid Sleep:** Never use hardcoded wait/sleep times. Wait for specific network requests to complete or elements to become visible/interactive.

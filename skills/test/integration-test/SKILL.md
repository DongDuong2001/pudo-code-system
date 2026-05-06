---
name: integration-test
description: Testing boundaries between components, databases, and external APIs
---

# Integration Test Skill

This skill governs testing the seams and connections between various components of the system.

## When to use this skill
- When validating database queries, ORM layers, and transaction logic.
- When ensuring microservices communicate correctly.
- When testing against third-party API contracts.

## Guidelines
- **Real Infrastructure:** Where possible, use real databases (via Docker/Testcontainers) instead of in-memory mocks for accurate behavior replication.
- **Clean State:** Ensure the database or state is reset before or after each integration test to prevent cross-test pollution.
- **Contract Testing:** Consider Consumer-Driven Contracts (like Pact) when integrating with external services to catch API changes early.

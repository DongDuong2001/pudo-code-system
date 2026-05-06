---
name: backend-code
description: Server-side logic, data processing, and state management
---

# Backend Code Skill

This skill handles backend service development, data processing, and integration.

## When to use this skill
- When building APIs, workers, or microservices.
- When interacting with databases, caches, and message queues.
- When implementing business logic and validation rules.

## Guidelines
- Validate and sanitize all incoming data at the API edge.
- Assume network calls and database queries will occasionally fail; implement retries and circuit breakers.
- Decouple business logic from the transport layer (e.g., Controllers should not contain complex logic).
- Log structured data (JSON) and ensure PII is masked.

---
name: api-design-plan
description: Planning and designing scalable, secure, and intuitive APIs
---

# API Design Skill

This skill is utilized during the PLAN phase when defining the contract between different services or between a client and a backend.

## When to use this skill
- When defining RESTful endpoints, GraphQL schemas, or gRPC definitions.
- When creating API documentation (OpenAPI/Swagger).
- When planning API versioning and deprecation strategies.

## Guidelines
- **Consistency:** Maintain consistent naming conventions (e.g., standardizing on plural nouns for REST collections).
- **Versioning:** Plan for API versioning from Day 1 (e.g., `/v1/users`).
- **Pagination & Filtering:** Design endpoints to handle large datasets natively.
- **Security:** Ensure authentication (OAuth2, JWT) and authorization (RBAC/ABAC) are built into the design.

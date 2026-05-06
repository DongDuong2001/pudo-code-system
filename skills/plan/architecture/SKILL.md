---
name: architecture-plan
description: Planning scalable system designs and architectural patterns
---

# Architecture Planning Skill

This skill is pivotal during the PLAN phase for determining system boundaries, deployment topologies, and core technologies.

## When to use this skill
- When starting a greenfield project or conducting a major refactor.
- When deciding between Monolith, Microservices, Serverless, or Event-Driven architectures.
- When preparing risk assessments and scaling strategies.

## Guidelines
- Prioritize simplicity. Do not over-engineer for traffic that doesn't exist yet (YAGNI).
- Map out clear domain boundaries (Domain-Driven Design) to ensure separation of concerns.
- Consider both synchronous (API) and asynchronous (Pub/Sub, Queues) communication paths.
- Ensure data ownership is clear (which service owns which data).

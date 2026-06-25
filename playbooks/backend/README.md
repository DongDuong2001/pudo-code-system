# Backend Engineering Playbooks

A collection of production-ready guides and templates for backend system implementation, covering security, state management, resilience, and observability.

## Table of Contents

1. **[API Design & Security](api-security.md)**
   - API Design (REST, gRPC, GraphQL)
   - Authentication (OAuth2, JWT best practices)
   - Authorization (RBAC, ABAC, PBAC)
   - Rate Limiting (Token Bucket, Leaky Bucket, Sliding Window)
2. **[Caching & Messaging](caching-messaging.md)**
   - Caching Strategies (Cache Aside, Write-Through, Write-Behind)
   - Redis Best Practices & Patterns
   - Message Queues (Kafka, RabbitMQ, Event Sourcing)
   - Real-time communication (WebSockets, SSE)
3. **[Resilience & Observability](resilience-observability.md)**
   - Distributed Systems & Architecture Patterns
   - Transactions (ACID, Saga, 2PC)
   - Error Handling & Fault Tolerance (Circuit Breakers, Retries, Backoff)
   - Logging, Monitoring, Tracing (Structured Logging, Prometheus, OpenTelemetry)
   - Performance Tuning & Bottleneck Identification

---

## How to Use These Playbooks

Each playbook contains:
- **Explanations:** Core concepts explained for production deployments.
- **Best Practices:** Practical design choices and patterns.
- **Common Mistakes:** Anti-patterns to avoid.
- **AI Prompts:** Reusable prompts to guide AI coding assistants in generating compliant code.
- **Checklists:** Step-by-step verification lists.
- **Examples:** Code and architectural patterns.

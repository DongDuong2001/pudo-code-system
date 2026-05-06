---
name: network-debug
description: Investigating API failures, DNS issues, and connection timeouts
---

# Network Debugging Skill

This skill focuses on tracing requests across distributed networks, resolving timeouts, and understanding protocol errors.

## When to use this skill
- When external APIs or microservices return 5xx/4xx errors or timeouts.
- When facing DNS resolution issues, TLS handshake failures, or CORS errors.
- When debugging load balancer or reverse proxy routing.

## Guidelines
- **Curl & Ping:** Use basic tools to ensure reachability before debugging application code.
- **Trace IDs:** Utilize distributed tracing (OpenTelemetry, Jaeger) to identify exactly where a request failed in a multi-service architecture.
- **Timeouts & Retries:** Verify that both read and connect timeouts are explicitly set, and retry logic is idempotent.

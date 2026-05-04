# Architecture Draft

> **Phase:** Plan  
> **Tags:** `#architecture` `#design` `#system`  
> **AI Model:** Any (model-agnostic)

## Context

Use this prompt when you need to **design the structure of a feature or system** before building it. Best for medium-to-large tasks where architecture decisions will impact the entire implementation.

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{FEATURE_DESCRIPTION}}` | What the system/feature needs to do | "Real-time notification system" |
| `{{TECH_STACK}}` | Technologies in use | "Next.js 14, Supabase, Redis" |
| `{{EXISTING_PATTERNS}}` | How the current codebase is structured | "Server Actions in app/actions/, Zustand for state" |
| `{{SCALE_REQUIREMENTS}}` | Expected load or growth | "~1000 concurrent users, 10k notifications/day" |

## Prompt

```
I need to design the architecture for:

{{FEATURE_DESCRIPTION}}

Tech stack: {{TECH_STACK}}
Existing patterns: {{EXISTING_PATTERNS}}
Scale requirements: {{SCALE_REQUIREMENTS}}

Create an architecture document that includes:

1. **Component diagram** — What are the major components and how do 
   they communicate? (Use ASCII or describe a diagram)
2. **Data flow** — How does data move through the system? 
   (request → processing → storage → response)
3. **Database schema** — What tables/collections are needed? 
   Include fields, types, and relationships.
4. **API surface** — What endpoints or server actions are needed? 
   Include method, path, and purpose.
5. **State management** — Where does state live? 
   (client, server, database, cache)
6. **Key decisions** — What are the major architectural choices 
   and why?
7. **Trade-offs** — What did you optimize for, and what did you 
   sacrifice?

Format this as a technical design document, not code.
```

## Example Usage

### Input
```
I need to design the architecture for:

A webhook delivery system that sends HTTP callbacks to registered 
endpoints when events occur in our application.

Tech stack: Node.js, Express, PostgreSQL, Redis
Existing patterns: REST API with controller/service/repo layers, 
Bull queues for async jobs
Scale requirements: ~500 registered webhooks, 50k events/day, 
99.9% delivery rate target

[rest of prompt...]
```

### Expected Output
A design doc covering: event bus → queue → delivery worker pipeline, webhook_endpoints and webhook_deliveries tables, retry strategy with exponential backoff, dead letter queue for failed deliveries, and the key trade-off between at-least-once vs. exactly-once delivery.

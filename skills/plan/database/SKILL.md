---
name: database-plan
description: Database architecture, schema design, and index planning
---

# Database Planning Skill

This skill is essential when designing data storage solutions and defining schema boundaries.

## When to use this skill
- When determining whether to use SQL vs NoSQL vs Time-Series databases.
- When designing entity-relationship diagrams (ERD) schemas.
- When planning indexing, partitioning, or sharding strategies.

## Guidelines
- Normalize data by default to reduce redundancy, but denormalize strategically for read-heavy performance bottlenecks.
- Plan indexes based on expected query patterns, not just foreign keys. Remember that excessive indexing slows down write operations.
- Avoid using UUIDs/GUIDs as primary clustered keys in massive tables where sequential inserts are critical for performance, unless mitigated by the DB engine.

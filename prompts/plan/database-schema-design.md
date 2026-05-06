# Database Schema Design
> Phase: Plan, Tags: #database #schema #planning

## Context
Use this prompt when designing the structure of a new database or updating an existing one. It leverages the Database Planning Skill.

## Variables
- `{{project_context}}`: A brief description of what the project does.
- `{{entities}}`: The main objects or concepts (e.g., Users, Products, Orders).
- `{{db_type}}`: SQL (PostgreSQL/MySQL) or NoSQL (MongoDB).

## Prompt
Act as an expert Database Architect. I need to design the schema for {{project_context}}.
The core entities involve: {{entities}}. We are targeting a {{db_type}} database.

Please provide:
1. The Entity-Relationship schema or document structure.
2. Suggested data types for each field.
3. Primary keys, foreign keys, and necessary indices.
4. Any potential data duplication trade-offs or constraints.

## Example Usage
**Input:** Act as an expert Database Architect. I need to design the schema for an E-commerce platform.
The core entities involve: Users, Carts, Orders, and Products. We are targeting a PostgreSQL database.

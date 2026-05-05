# Architecture & Planning Skill
> Skill, System Design, Architecture, Planning

## Context
Use this prompt when you are at the beginning of a project or feature and need to design the architecture, define the data models, map out the API contracts, or break down the implementation steps. This skill forces the AI to think like a Principal Architect.

## Variables
- `{{project_goal}}`: High-level description of what you are trying to build.
- `{{tech_stack}}`: The languages, frameworks, and databases you are using.
- `{{constraints}}`: Any technical, business, or timeline constraints.

## Prompt
```text
Adopt the persona of a Principal Software Architect. I need your expertise to design the architecture and implementation plan for the following project:

Goal: {{project_goal}}
Tech Stack: {{tech_stack}}
Constraints: {{constraints}}

Please provide a comprehensive architectural design that includes:
1. **System Overview:** A high-level explanation of how the system will work.
2. **Component Breakdown:** The major modules, services, or components required.
3. **Data Flow & Models:** How data moves through the system and the core schema structures.
4. **Risk Mitigation:** Potential bottlenecks, security concerns, or technical debt, and how to avoid them.
5. **Implementation Steps:** A logical, ordered sequence of development tasks to build this.

Do not write the implementation code. Focus purely on the design and architecture.
```

## Example Usage

**Input:**
```text
Adopt the persona of a Principal Software Architect. I need your expertise to design the architecture and implementation plan for the following project:

Goal: Build a real-time collaborative markdown editor.
Tech Stack: Next.js, WebSockets, Redis, PostgreSQL
Constraints: Must handle up to 50 concurrent users on the same document without latency issues.

Please provide a comprehensive architectural design that includes:
[...rest of prompt...]
```

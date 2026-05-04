# Dependency Audit

> **Phase:** Understand  
> **Tags:** `#dependencies` `#security` `#audit`  
> **AI Model:** Any (model-agnostic)

## Context

Use this prompt **before modifying code that touches external dependencies** or when onboarding onto a project to understand its dependency landscape. Helps prevent version conflicts, security issues, and unnecessary bloat.

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_ROOT}}` | Path to the project root | "." (current directory) |
| `{{FOCUS_AREA}}` | Specific area of concern | "Authentication libraries" |
| `{{PLANNED_CHANGES}}` | What you're about to add or modify | "Adding Stripe SDK for payments" |

## Prompt

```
Audit the dependencies of this project.

Focus area: {{FOCUS_AREA}}
Planned changes: {{PLANNED_CHANGES}}

Analyze the following:

1. **Dependency map** — List the key dependencies, their versions, 
   and what they're used for. Separate into:
   - Runtime dependencies
   - Dev dependencies
   - Peer dependencies

2. **Version health** — Are any dependencies:
   - Significantly outdated (2+ major versions behind)?
   - Deprecated or unmaintained?
   - Known to have security vulnerabilities?

3. **Conflict check** — Given the planned changes, are there any 
   potential conflicts with:
   - Existing library versions?
   - Overlapping functionality (two libs doing the same thing)?
   - Peer dependency requirements?

4. **Bundle impact** — What's the estimated bundle size impact 
   of the planned changes? Are there lighter alternatives?

5. **Recommendations** — Should any dependencies be:
   - Updated?
   - Replaced?
   - Removed?

Present findings as a table with severity ratings (INFO / WARN / CRITICAL).
```

## Example Usage

### Input
```
Audit the dependencies of this project.

Focus area: State management and data fetching libraries
Planned changes: Adding TanStack Query (React Query) for server 
state management

[rest of prompt...]
```

### Expected Output
A table showing: current state (Zustand v4.5 for client state, custom fetch wrappers), planned addition (TanStack Query v5), compatibility analysis (no conflicts, complementary with Zustand), bundle impact (+12kb gzipped), and recommendation to remove custom fetch wrappers after migration.

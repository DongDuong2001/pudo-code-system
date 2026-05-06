# PUDO Prompt Library

A collection of **21 ready-to-use prompts** organized by PUDO phase and domain skills. Copy, customize, and paste into any AI assistant.

> **Note:** Each directory contains its own `README.md` with detailed instructions on how to modify and use the prompts for your specific needs.

---

## How to Use

1. **Find the right prompt** — Browse by phase below, or search by tag
2. **Copy the prompt** — Each file contains a ready-to-use prompt template
3. **Fill in the `{{variables}}`** — Replace placeholders with your project-specific details
4. **Paste into your AI assistant** — Works with ChatGPT, Claude, Gemini, Copilot, etc.
5. **Iterate** — Use the output as a starting point, refine as needed

## Prompt Index

### Plan Phase

| Prompt | Use When | Tags |
|---|---|---|
| [Scope Definition](plan/scope-definition.md) | Starting a new task or feature | `#scoping` `#greenfield` `#requirements` |
| [Architecture Draft](plan/architecture-draft.md) | Designing system structure | `#architecture` `#design` `#system` |
| [Database Schema](plan/database-schema-design.md) | Designing a new database schema | `#database` `#schema` `#planning` |
| [API Contract](plan/api-contract-design.md) | Designing REST/GraphQL/gRPC APIs | `#api` `#rest` `#graphql` `#planning` |
| [Security Threat Model](plan/security-threat-model.md) | Planning secure architecture & mitigation | `#security` `#threat-model` `#risk` |
| [Risk Assessment](plan/risk-assessment.md) | Identifying what could go wrong | `#risk` `#planning` `#premortem` |

### Understand Phase

| Prompt | Use When | Tags |
|---|---|---|
| [Codebase Analysis](understand/codebase-analysis.md) | Exploring an unfamiliar codebase | `#analysis` `#exploration` `#onboarding` |
| [Dependency Audit](understand/dependency-audit.md) | Checking what your code depends on | `#dependencies` `#security` `#audit` |
| [Pattern Recognition](understand/pattern-recognition.md) | Learning codebase conventions | `#patterns` `#conventions` `#consistency` |
| [Crash Log Analysis](understand/crash-log-analysis.md) | Debugging stack traces and error logs | `#debugging` `#crash` `#logs` |

### Develop Phase

| Prompt | Use When | Tags |
|---|---|---|
| [Feature Implementation](develop/feature-implementation.md) | Building a planned feature | `#implementation` `#coding` `#feature` |
| [Test-Driven Dev](develop/test-driven-dev.md) | Writing tests alongside code | `#testing` `#tdd` `#quality` |
| [Component Scaffold](develop/component-scaffold.md) | Creating new components/modules | `#scaffold` `#component` `#boilerplate` |
| [Integration Test Suite](develop/integration-test-suite.md) | Testing DBs/APIs interactions | `#testing` `#integration` |
| [E2E Test Suite](develop/e2e-test-suite.md) | Writing browser automation tests | `#testing` `#e2e` `#automation` |

### Optimize Phase

| Prompt | Use When | Tags |
|---|---|---|
| [Performance Review](optimize/performance-review.md) | Profiling and improving speed | `#performance` `#profiling` `#speed` |
| [Memory Profiling](optimize/memory-profiling.md) | Debugging RAM leaks and GC issues | `#debugging` `#memory` `#latency` |
| [Network Troubleshooting](optimize/network-troubleshooting.md) | Debugging 5xx errors and timeouts | `#debugging` `#network` `#cloud` |
| [Code Review Checklist](optimize/code-review-checklist.md) | Reviewing code quality | `#review` `#quality` `#checklist` |
| [Refactor Opportunities](optimize/refactor-opportunities.md) | Cleaning up existing code | `#refactor` `#cleanup` `#maintainability` |

### Domain Skills

Skills are specialized templates that apply domain knowledge to any phase.

| Prompt | Use When | Tags |
|---|---|---|
| [Software Engineering](../skills/code/SKILL.md) | Writing robust frontend/backend code | `#coding` `#javascript` `#python` `#java` |
| [Troubleshooting & Debugging](../skills/debug/SKILL.md) | Diagnosing crashes, memory leaks | `#debugging` `#sre` `#diagnostics` |
| [DevOps Engineering](../skills/devops/SKILL.md) | Writing IaC, CI/CD, or deployment config | `#devops` `#infrastructure` `#automation` |
| [Architecture & Planning](../skills/plan/SKILL.md) | Threat modeling, DB models | `#planning` `#architecture` `#design` |
| [Test Engineering](../skills/test/SKILL.md) | TDD, E2E tests, Mocking | `#test` `#qa` `#automation` |

## Prompt Format

Every prompt follows a consistent structure:

```
# [Prompt Name]
> Phase, Tags, AI Model compatibility

## Context        — When to use this prompt
## Variables      — Placeholders you need to fill in
## Prompt         — The actual prompt text
## Example Usage  — A concrete input/output pair
```

## Contributing

Have a prompt that's been useful in your PUDO workflow? [Submit a PR](../CONTRIBUTING.md)! Follow the template above for consistency.

# Multi-Agent Orchestration & Subagent Collaboration Playbook

## Outcome

A coordinated, context-isolated multi-agent workflow architecture that prevents prompt drift, eliminates context bloat, and enforces clear separation of concerns across specialized coding agents.

---

## 1. Agent Role Taxonomy

```text
               ┌────────────────────────┐
               │    Supervisor / Host   │
               │   (Task Orchestrator)  │
               └───────────┬────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  │   Planner    │  │ Implementer  │  │   Reviewer   │
  │ (Read-Only)  │  │(Write-Access)│  │ (Audit & QA) │
  └──────────────┘  └──────────────┘  └──────────────┘
```

| Agent Role | Access Scope | Primary Objective | Key Tools |
|---|---|---|---|
| **Supervisor / Lead** | Coordination | Task delegation, user alignment, terminal gatekeeper | `invoke_subagent`, `send_message`, `pudo.runQualityGate` |
| **Planner / Architect** | Read-Only | Requirement breakdown, constraint mapping, risk log | `view_file`, `grep_search`, `pudo.validateAgentRules` |
| **Implementer / Coder** | Scoped Write | Minimal diff creation, targeted feature building | `replace_file_content`, `write_to_file`, `run_command` |
| **Reviewer / QA** | Read & Test | Static analysis, test execution, regression verification | `run_command` (linters/tests), `pudo.scoreRepoReadiness` |

---

## 2. Core Principles & Best Practices

### A. Context Isolation & Ephemeral Subagents
1. **Never share monolithic context:** Subagents should receive a curated, bounded context pack rather than the host's entire conversation history. Use `pudo.createContextPack` to bound inputs.
2. **Ephemeral Lifecycles:** Spawn subagents for a discrete, finite task (e.g. "Research schema", "Implement endpoint", "Run test suite"), then terminate them and return only the structured conclusion to the supervisor.

### B. Structured Handoff Protocol
1. **Standardized Session Handoff:** Pass state between agents using `.pudo/session.md`.
2. **Artifact-Driven Communication:** Agents communicate via durable markdown artifacts (`task.md`, `implementation_plan.md`, `walkthrough.md`) rather than noisy conversational logs.

### C. Deadlock & Loop Prevention
1. **Max Iteration Limits:** Every autonomous subagent loop must have an explicit iteration ceiling ($N \le 5$).
2. **Explicit Fallback to Plan Phase:** If an implementer agent fails tests 3 times consecutively, it must not guess or brute-force; it must halt and hand control back to the Planner agent for re-planning.

---

## 3. Production Checklist

- [ ] Clear agent role boundaries (read-only planner vs write-enabled implementer) defined.
- [ ] Context budget enforced per subagent using allowlisted file paths.
- [ ] Durable handoff document (`.pudo/session.md`) maintained across agent transitions.
- [ ] Autonomous tool call iteration limits configured to prevent runaway execution.
- [ ] Automated quality gates (`pudo.runQualityGate`) executed at phase transitions.

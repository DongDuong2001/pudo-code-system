# 1. Repository Architecture

## Executive Summary

PUDO AI DevOS v3 reorganizes the repository from a **prompt collection with tooling** into an **operating system for AI-native software engineering**. The architecture mirrors a real OS: kernel (methodology + runtime), drivers (tool adapters), services (workflows, skills, gates), and userland (templates, playbooks, starter kits).

## Current State (v1.2)

Three product surfaces with no runtime orchestration:

| Layer | Components | Role |
| --- | --- | --- |
| Config | `AGENTS.md`, `.cursor/rules`, Copilot instructions | Tell agents how to behave |
| Execution | CLI (`init`, `check`, `score`, `doctor`, `lint`) | Validate and score repos |
| Integration | MCP server (8 tools, stdio, sandboxed) | Agent-callable operations |

**Gap:** Documentation defines gates; nothing enforces them at runtime beyond keyword scans and file-existence checks.

## Target State (v3)

```text
┌─────────────────────────────────────────────────────────────────┐
│                     PUDO AI DevOS v3                            │
├─────────────────────────────────────────────────────────────────┤
│  USERLAND                                                       │
│  playbooks/ · starter-kits/ · examples/ · templates/            │
├─────────────────────────────────────────────────────────────────┤
│  SERVICES                                                       │
│  workflows/ · skills/ · agents/ · quality/ · checklists/       │
├─────────────────────────────────────────────────────────────────┤
│  RUNTIME                                                        │
│  commands/ · automation/ · schemas/ · packages/pudo-mcp-server │
├─────────────────────────────────────────────────────────────────┤
│  STATE & KNOWLEDGE                                              │
│  memory/ · context/ · knowledge/ · .pudo/                      │
├─────────────────────────────────────────────────────────────────┤
│  GOVERNANCE & COMPLIANCE                                        │
│  governance/ · quality/agent-tool-security.md · SECURITY.md      │
├─────────────────────────────────────────────────────────────────┤
│  DRIVERS (Tool Adapters)                                        │
│  cursor/ · claude/ · codex/ · .github/copilot-instructions.md   │
│  integrations/ (LangGraph, OpenAI Agents, Continue, etc.)       │
├─────────────────────────────────────────────────────────────────┤
│  KERNEL                                                         │
│  docs/philosophy.md · docs/workflow.md · AGENTS.md              │
└─────────────────────────────────────────────────────────────────┘
```

## Module Responsibilities

### Kernel — Methodology Core

Immutable principles and the PUDO loop. Changes require explicit ADR and semver major bump.

| Artifact | Responsibility |
| --- | --- |
| `docs/philosophy.md` | Design principles |
| `docs/workflow.md` | Phase definitions, entry/exit criteria |
| `docs/pudo-modes.md` | Lite / Standard / Enterprise scaling |
| `AGENTS.md` | Cross-tool invariant rules |

**Justification:** Separating kernel from services prevents methodology drift when adding features.

### Services — Executable Capabilities

| Module | Responsibility | Coupling |
| --- | --- | --- |
| `workflows/` | End-to-end lifecycle definitions with gates | Depends on kernel, quality, schemas |
| `skills/` | Specialist agent capabilities (invokable) | Depends on workflows, templates |
| `agents/` | Agent role definitions and delegation graphs | Depends on skills |
| `quality/` | Gates, checklists, anti-patterns | Consumed by all workflows |
| `prompts/` | Phase-specific prompt library (legacy + v3) | Mapped to workflow steps |

**Justification:** Workflows compose skills; skills produce output contracts. This replaces monolithic master prompts.

### Runtime — Execution Layer

| Module | Responsibility |
| --- | --- |
| `src/cli.js` | Local validation, scoring, init, lint |
| `packages/pudo-mcp-server/` | Agent-callable tools |
| `commands/` | Declarative command definitions for CLI/MCP expansion |
| `automation/` | CI recipes, GitHub Actions templates, release automation |
| `schemas/` | Machine-readable contracts (score, trace, output, policy) |

**Justification:** Schemas already exist (`pudo-run-trace.schema.json`) but are unused. v3 wires trace emission into session handoff and MCP.

### State & Knowledge — Persistent Context

| Module | Responsibility |
| --- | --- |
| `memory/templates/` | Project memory file templates |
| `.pudo/` (installed) | Runtime state: config, session, traces, memory |
| `context/domains/` | Domain packs (SaaS, FinTech, etc.) |
| `knowledge/` | Curated patterns, anti-patterns, research notes |

**Justification:** Reduces repeated prompting; improves cross-session consistency.

### Userland — Human + Team Artifacts

| Module | Responsibility |
| --- | --- |
| `playbooks/` | Multi-workflow business outcomes (Launch SaaS, Build MVP) |
| `starter-kits/` | Scaffold + workflow integration |
| `templates/` | PRD, ADR, RFC, test plan, etc. |
| `examples/` | Walkthrough evidence |

### Drivers — Tool Adapters

Thin translation layers. No business logic.

| Path | Tools |
| --- | --- |
| `cursor/.cursor/rules/` | Cursor phase rules |
| `claude/CLAUDE.md` | Claude Code |
| `codex/AGENTS.md` | OpenAI Codex |
| `integrations/` | Framework adapters (v4) |

**Justification:** Avoid vendor lock-in. Kernel and services are tool-agnostic; drivers map to each platform's config format.

### Governance — Organizational Control

| Module | Responsibility |
| --- | --- |
| `governance/` | Coding standards, git workflow, release process |
| `quality/agent-tool-security.md` | MCP/tool security |
| `SECURITY.md` | Vulnerability reporting |

## Data Flow

```text
Human intent
    │
    ▼
Playbook (optional) ──► Workflow selection
    │
    ▼
Workflow step ──► Skill invocation ──► Template fill
    │                    │
    │                    ▼
    │              Memory read/write (.pudo/memory/)
    │
    ▼
Output Contract (structured)
    │
    ▼
Quality Gate ──► Run Trace (.pudo/traces/)
    │
    ▼
Next step / Release
```

## Non-Goals (v3)

- Hosted multi-tenant SaaS (deferred to v5 "PUDO-as-a-service")
- LLM fine-tuning datasets
- Full autonomous agent runtime (orchestration engine is v4)

## Success Criteria

- [ ] Every workflow has defined inputs, outputs, gates, and failure modes
- [ ] Skills comply with agent skill contract
- [ ] Memory templates install via `pudo init`
- [ ] Run traces emitted to `.pudo/traces/`
- [ ] Zero breaking changes to existing `pudo init` output paths
- [ ] CI passes with new scaffold directories (docs-only additions)

## Architecture Impact

New directories are additive. Existing CLI, MCP, and agent config paths unchanged until v3.0 release cutover.

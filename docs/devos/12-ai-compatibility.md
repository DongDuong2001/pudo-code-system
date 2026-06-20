# 12. AI Compatibility Strategy

## Goal

PUDO AI DevOS must work across current and future AI coding agents **without vendor lock-in**. Tool-specific code lives only in drivers; kernel and services are universal.

## Compatibility Matrix

| Tool | Driver Path | Config Format | v1.2 | v3 Target |
| --- | --- | --- | ---: | ---: |
| Cursor | `cursor/.cursor/rules/` | `.mdc` rules | ✅ | ✅ |
| Claude Code | `claude/CLAUDE.md` | Markdown | ✅ | ✅ |
| OpenAI Codex | `codex/AGENTS.md` | Markdown | ✅ | ✅ |
| GitHub Copilot | `.github/copilot-instructions.md` | Markdown + `.instructions.md` | ✅ | ✅ |
| Gemini | `GEMINI.md`, `antigravity/` | Markdown + XML | ✅ | ✅ |
| OpenCode | `opencode/opencode.md` | Markdown | ✅ | ✅ |
| Kiro | `kiro/system-prompt.md` | Markdown | ✅ | ✅ |
| Continue | `integrations/continue/` | JSON config | — | v3.1 |
| Aider | `integrations/aider/` | `.aider.conf.yml` | — | v3.1 |
| Cline | `integrations/cline/` | Rules markdown | — | v3.2 |
| OpenHands | `integrations/openhands/` | Config TOML | — | v4 |
| Goose | `integrations/goose/` | Recipe format | — | v4 |
| Roo Code | `integrations/roo/` | Mode files | — | v3.2 |
| Windsurf | `integrations/windsurf/` | Rules | — | v3.2 |
| Gemini CLI | `integrations/gemini-cli/` | Extensions | — | v3.1 |

## Adapter Architecture

```text
┌─────────────────────────────────────┐
│     PUDO Kernel (AGENTS.md)         │
│     Services (workflows, skills)    │
└──────────────┬──────────────────────┘
               │
       ┌───────┴───────┐
       ▼               ▼
  Driver Generator   MCP Server
  (pudo init)        (agent tools)
       │
       ▼
  Tool-specific format
  (mdc, xml, json, etc.)
```

`pudo init --tools=cursor,claude,...` generates drivers from kernel — no manual sync.

## Interoperability Standards

PUDO aligns with emerging conventions:

| Standard | PUDO Usage |
| --- | --- |
| `AGENTS.md` | Cross-tool kernel bridge ([arXiv:2602.14690](https://arxiv.org/abs/2602.14690)) |
| MCP | Tool protocol for init, gates, context, session |
| JSON Schema | Machine-readable score, trace, output contracts |
| Conventional Commits | DevOS repo and generated changelog templates |

## MCP as Universal Interface

Agents with MCP support get full DevOS capabilities regardless of IDE:

| Capability | MCP Tool | CLI Equivalent |
| --- | --- | --- |
| Init project | `pudo.initProject` | `pudo init` |
| Validate setup | `pudo.validateAgentRules` | `pudo check` |
| Score readiness | `pudo.scoreRepoReadiness` | `pudo score` |
| Quality gate | `pudo.runQualityGate` | — |
| Context pack | `pudo.createContextPack` | — |
| Session handoff | `pudo.updateSessionHandoff` | — |
| List skills (v3.1) | `pudo.listSkills` | `pudo skills list` |
| Run trace (v3.1) | `pudo.emitRunTrace` | `pudo trace emit` |

## Framework Adapters (v4)

For agent frameworks, not IDEs:

| Framework | Adapter Path | Purpose |
| --- | --- | --- |
| LangGraph | `integrations/langgraph/` | Graph-based PUDO phases |
| OpenAI Agents SDK | `integrations/openai-agents/` | Agent handoffs |
| CrewAI | `integrations/crewai/` | Role-based crews mapped to agents/ |

Adapters translate PUDO workflows into framework-native graphs — kernel unchanged.

## Token Efficiency by Tool

| Tool | Strategy |
| --- | --- |
| Cursor | Phase-specific `.mdc` (load on demand) |
| Claude Code | Bridge file + deny-list for secrets |
| Codex | Token budget tiers in `codex/AGENTS.md` |
| Copilot | Path-specific instructions reduce noise |
| Long-context (Fable 5) | Full playbook loading acceptable |

## Avoiding Lock-In

1. **No proprietary formats** in kernel/services — YAML, Markdown, JSON Schema only
2. **Drivers are generated** — swappable without changing workflows
3. **MCP is optional** — CLI + markdown files work standalone
4. **Export path** — `pudo export --format=agents-md` dumps effective config (v3.1)

## Testing Compatibility

CI matrix (v1.4 roadmap, extended v3):

- Node 20.x, 22.x
- Init smoke test per supported tool flag
- MCP tool integration tests (existing)

## Justification

The AI tooling landscape fragments rapidly. A driver adapter layer lets PUDO add new tools in days without restructuring the OS.

# 13. Benchmark Report

## Methodology

Comparison of PUDO Code System v1.2 against modern AI engineering projects across architecture, DX, enforcement, and ecosystem maturity. Scoring: **Strong** / **Adequate** / **Gap** / **Missing**.

## Projects Benchmarked

| Project | Type | Notes |
| --- | --- | --- |
| **PUDO v1.2** | AI Dev methodology + CLI/MCP | Baseline |
| [AGENTS.md convention](https://agents.md/) | Cross-tool agent config | Emerging standard |
| [Cursor Rules / Skills](https://cursor.com/docs) | IDE-native agent config | Vendor-specific |
| [Anthropic Claude Code](https://docs.anthropic.com/en/docs/claude-code) | Agent + MCP | Tool integration |
| [GitHub Copilot Instructions](https://docs.github.com/en/copilot) | Repo-level context | Microsoft ecosystem |
| [Aider](https://aider.chat/) | CLI pair programmer | Git-centric |
| [OpenHands](https://github.com/All-Hands-AI/OpenHands) | Autonomous agent platform | Full runtime |
| [SWE-agent](https://github.com/SWE-agent/SWE-agent) | Research agent | Benchmark-focused |
| [Spec Kit / spec-driven](https://github.com/github/spec-kit) | Specification-driven dev | GitHub emerging |
| [Continue](https://continue.dev/) | Open agent IDE extension | Config + MCP |

## Strengths (PUDO)

| Area | Assessment | Evidence |
| --- | --- | --- |
| **Methodology clarity** | Strong | PUDO loop, modes, gates well-documented |
| **Cross-tool portability** | Strong | 7 tools supported via init |
| **Quality documentation** | Strong | anti-hallucination, token budget, MCP security |
| **Executable validation** | Adequate | CLI check/score/doctor |
| **MCP integration** | Adequate | 8 sandboxed tools |
| **Measurement mindset** | Adequate | Benchmark kit + 1 case study |
| **Zero-dep CLI** | Strong | Easy adoption |
| **Modular Cursor rules** | Strong | Phase-specific `.mdc` |
| **JSON schemas** | Adequate | Score, trace, metrics defined |
| **Community governance docs** | Adequate | CONTRIBUTING, CODEOWNERS, SECURITY |

## Weaknesses (PUDO)

| Area | Assessment | Gap Detail |
| --- | --- | --- |
| **Runtime enforcement** | Gap | Gates are honor-system; keyword scan only |
| **Run trace emission** | Gap | Schema exists, not wired |
| **Skill invocability** | Gap | Markdown prompts, not loadable capabilities |
| **Autonomous orchestration** | Missing | vs OpenHands, SWE-agent |
| **Benchmark evidence** | Gap | 1 case vs need 10+ |
| **Semantic context** | Gap | No RAG/auto-context selection |
| **IDE extensions** | Missing | vs Cursor native, Continue |
| **Spec-driven workflow** | Gap | vs Spec Kit PRD→plan→tasks |
| **CI gate enforcement** | Gap | score --strict not required check |
| **Plugin ecosystem** | Missing | No community registry |

## Architectural Gaps

```text
                    PUDO v1.2          Target DevOS v3
Workflow engine     Docs only    →     YAML specs + trace
Skill system        Prompts      →     Full contract + discovery
Memory              Session only →     Persistent memory dir
Context             Docs only    →     Domain packs
Orchestration       None         →     v4 multi-agent
Telemetry           Manual       →     v4 dashboard
Enforcement         File check   →     Structured gate evidence
```

## Competitive Position

PUDO occupies a unique niche: **portable operating layer** between raw prompting and full autonomous platforms.

|  | Lightweight | Full Runtime |
| --- | --- | --- |
| **Portable** | **PUDO** (target sweet spot) | OpenHands |
| **Vendor-tied** | Cursor rules | Copilot-only flows |

## Actionable Recommendations

### Immediate (v3.0)

1. **Scaffold OS modules** — workflows/, memory/, context/, playbooks/ (this redesign)
2. **Wire run trace schema** — emit JSON on session handoff
3. **Add output contract schema** — structured workflow outputs
4. **Upgrade 5 core skills** to full agent skill contract as reference implementations

### Short-term (v3.1)

5. **Structured quality gates** — gate evidence JSON, not keyword scan
6. **Skill discovery** — CLI + MCP listSkills
7. **Continue + Aider adapters** — integrations/
8. **Prompt lint in CI** — `pudo lint` in pudo-check workflow

### Mid-term (v4.0)

9. **GitHub App for gate enforcement** — required status checks
10. **Benchmark dataset** — 10+ measured cases
11. **Framework adapters** — LangGraph, OpenAI Agents
12. **Metrics dashboard** — score trends, token waste

### Long-term (v5.0)

13. **Knowledge graph** — linked memory, decisions, code
14. **Self-improving workflows** — benchmark-driven prompt/skill refinement
15. **Hosted MCP** — team governance without local setup

## DX Issues

| Issue | Impact | Fix |
| --- | --- | --- |
| Scattered workflow docs | Agents miss lifecycle | Central workflows/ module |
| Init doesn't copy stack templates | Incomplete setup | Starter kits |
| Version drift (MCP vs docs) | Confusion | Single version manifest |
| No `workflows/` directory | DevOS mental model mismatch | This redesign |
| High score without tests | False confidence | Behavioral scoring v4 |

## Adoption Risks

| Risk | Mitigation |
| --- | --- |
| Perceived as "just prompts" | Rebrand as DevOS; ship runtime features |
| Discipline required | CLI/MCP nudges; eventual enforcement |
| Maintainer bottleneck | Governance council (roadmap v2) |
| AI tool churn | Driver adapter pattern |

## Maintenance Risks

| Risk | Mitigation |
| --- | --- |
| Doc/code drift | Schemas as contracts; CI validation |
| i18n lag | English-first DevOS docs |
| MCP security regressions | Existing test suite + checklist |

## Conclusion

PUDO v1.2 is a **strong methodology layer** with emerging executable tooling. The v3 DevOS redesign closes structural gaps (modularity, workflows, memory, context) while v4+ addresses runtime enforcement and orchestration. The benchmark sweet spot is **lighter than OpenHands, more structured than AGENTS.md alone**.

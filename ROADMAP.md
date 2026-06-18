# Roadmap

> This roadmap reflects the current direction of PUDO. Priorities may shift based on community feedback. Items marked ✅ are shipped. Items marked 🔄 are in progress. Unmarked items are planned.

---

## Short-Term — v1.3 (Current)

Focus: stability, completeness, and team adoption.

| Item | Status |
| --- | --- |
| Prompt linter (`pudo lint`) | ✅ Shipped |
| JSON output for check and doctor (`--json` flag) | ✅ Shipped |
| Copilot cloud agent setup template | ✅ Shipped |
| Run trace and metrics schemas | ✅ Shipped |
| Team adoption guide (`docs/team-adoption-guide.md`) | ✅ Shipped |
| Publishable MCP server package with client config examples | ✅ Shipped |
| Claude Fable 5 support (1M context window, long-running tasks) | ✅ Shipped |
| Additional measured case studies | 🔄 In progress |
| `docs/getting-started.md` first-steps guide | 🔄 In progress |
| `docs/architecture.md` with system diagrams | 🔄 In progress |
| Expanded FAQ (team handoff, enterprise patterns) | Planned |
| `SUPPORT.md` community channels | ✅ Shipped |

---

## Mid-Term — v1.4

Focus: agent interoperability and broader ecosystem reach.

| Item | Notes |
| --- | --- |
| MCP remote transport and authentication guidance | Enables hosted / cloud-based agent use |
| Stack recipes with command detection | Auto-detect Next.js, FastAPI, Go, etc. |
| OpenAI Agents, LangGraph, and other framework adapters | Expand beyond coding-agent toolchains |
| Automated release workflow (version bump → publish) | Reduce manual release risk |
| Multi-version Node.js CI matrix (20.x, 22.x) | Catch compatibility regressions earlier |
| npm public registry publish for MCP server | Improve discoverability (`npm install @pudo/mcp-server`) |
| Dependency audit CI step (`npm audit`) | Supply chain safety in every PR |

---

## Long-Term — v2.0

Focus: enterprise readiness and ecosystem maturity.

| Item | Notes |
| --- | --- |
| Enterprise adoption guide | Compliance, governance, regulated environments |
| Metrics framework and dashboard | Visualize token waste, PUDO score trends over time |
| Agent skills and subagent workflows | Deep integration with emerging agent frameworks |
| GitHub App / bot for PUDO gate enforcement | Automated gate checks as a required status check |
| Community prompt registry | Searchable, rated, versioned community prompts |
| Benchmark dataset (10+ measured cases) | Validate directional targets with real evidence |
| Governance model (maintainer council) | Reduce single-maintainer risk |

---

## Future Ecosystem

Ideas under consideration — not committed, not scheduled:

- IDE extensions (VS Code sidebar for PUDO phase tracking)
- LLM fine-tuning dataset based on PUDO-structured sessions
- Certification or badging for PUDO-compliant repositories
- PUDO-as-a-service for teams without local MCP server setup

---

## What's Done

A full history of shipped features is in [CHANGELOG.md](CHANGELOG.md).

Key milestones:

- **v1.0** — Initial methodology, philosophy docs, prompt library
- **v1.1** — CLI (`pudo init`), stack templates, benchmark kit, session handoff
- **v1.2** — `pudo check/score/doctor`, MCP server alpha, agent tool security, CODEOWNERS, GitHub Actions
- **v1.3** — Prompt linter, JSON output, Claude Fable 5, team adoption guide, publishable MCP package

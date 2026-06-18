<p align="center">
  <a href="https://forg.to/products/pudo" target="_blank" rel="noopener">
    <img src="https://forg.to/api/badges/upvote/pudo?theme=light&shape=square" alt="Upvote PUDO on Forg" height="48" />
  </a>
  <a href="https://forg.to/products/pudo" target="_blank" rel="noopener">
    <img src="https://forg.to/api/badges/launch-winner/pudo" alt="1st Place on Forg" width="200" />
  </a>
  <a href="https://unikorn.vn/p/pudo?ref=embed-pudo" target="_blank">
    <img src="https://unikorn.vn/api/widgets/badge/pudo?theme=light" alt="PUDO on Unikorn.vn" height="48" />
  </a>
  <a href="https://unikorn.vn/p/pudo?ref=embed-pudo" target="_blank">
    <img src="https://unikorn.vn/api/widgets/badge/pudo/rank?theme=light&type=weekly" alt="PUDO Weekly Rank" height="48" />
  </a>
</p>

<p align="center">
  <img src="assets/Pudo_banner.png" alt="PUDO Code System" width="100%" />
</p>

<h3 align="center">A portable operating layer for reliable AI-assisted development.</h3>

<p align="center">
  <a href="https://github.com/DongDuong2001/pudo-code-system/actions/workflows/cli-install-test.yml">
    <img src="https://github.com/DongDuong2001/pudo-code-system/actions/workflows/cli-install-test.yml/badge.svg" alt="CLI Install Test" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT" />
  </a>
  <img src="https://img.shields.io/badge/version-1.2.0-brightgreen.svg" alt="Version 1.2.0" />
  <a href="CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-orange.svg" alt="PRs Welcome" />
  </a>
  <img src="https://img.shields.io/badge/AI-agnostic-purple.svg" alt="AI Agnostic" />
</p>

<p align="center">
  <strong>🌍 Languages:</strong>
  <a href="README.md">English</a> |
  <a href="README.vi.md">Tiếng Việt</a> |
  <a href="README.pt.md">Português</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.ru.md">Русский</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=yjRRjrx6Ews" target="_blank">
    <img src="https://img.youtube.com/vi/yjRRjrx6Ews/maxresdefault.jpg" alt="Watch the PUDO Code System overview video" width="80%" />
    <br />
    <strong>🎥 Watch the overview video</strong>
  </a>
</p>

---

## Table of Contents

- [The Problem](#the-problem)
- [The Solution: PUDO](#the-solution-pudo)
- [The MCP Server](#the-mcp-server)
- [The 4 Phases](#the-4-phases)
- [Architecture Overview](#architecture-overview)
- [Install Into a Project](#install-into-a-project)
- [Quick Start](#quick-start)
- [PUDO Modes](#pudo-modes)
- [Quality Gates](#quality-gates)
- [Examples](#examples)
- [Prompt Library](#prompt-library)
- [AI Integrations](#ai-integrations)
- [Repository Structure](#repository-structure)
- [Measurement Targets](#measurement-targets)
- [Philosophy](#philosophy)
- [Onboarding Paths](#onboarding-paths)
- [When Not To Use PUDO](#when-not-to-use-pudo)
- [Contributing](#contributing)
- [Support & Funding](#support--funding)
- [License](#license)

---

## The Problem

You open your editor. You type a vague request to your AI assistant. It generates something. You paste it in. It half-works. You ask for a fix. It breaks something else. Repeat for 3 hours.

**This is chaos coding.** It feels productive, but it's not.

The issue isn't the AI — it's the **lack of structure**. Without a clear methodology, AI-assisted development becomes a random walk through your codebase.

## The Solution: PUDO

**PUDO** is an AI Agent Operating Layer that installs into any repository. It gives you:

- **Installable agent rules** for Cursor, Claude, Codex, Copilot, Gemini, OpenCode, and Kiro
- **Measurable quality gates** to prevent shipping unverified AI output
- **Token-budgeted prompts** that get better results from every AI assistant
- **Workflow templates** for every task size, from a 5-minute fix to a multi-week feature
- **Benchmark evidence** to measure whether the method is actually working

PUDO is not a new AI model. It's the operating layer that makes your existing AI tools more reliable.

Recent research on configuring agentic coding tools identifies repository-level context files as the dominant mechanism and notes `AGENTS.md` emerging as an interoperable standard across tools. PUDO starts from that repo-level layer and adds executable checks, quality gates, handoff, and measurement. ([arXiv:2602.14690](https://arxiv.org/abs/2602.14690))

## The MCP Server

The PUDO MCP server turns the operating layer into tools that compatible coding agents can call directly. Instead of relying on an agent to remember documentation, the agent calls PUDO tools to generate rules, validate output, run quality gates, and maintain session continuity.

| MCP Tool | What It Gives The Agent |
| --- | --- |
| `pudo.generateAgentRules` | Project-specific agent instructions |
| `pudo.validateAgentRules` | Validation of installed workflow files |
| `pudo.createContextPack` | Repository-bounded context without sensitive or generated paths |
| `pudo.runQualityGate` | Evidence checks before advancing or releasing |
| `pudo.scoreRepoReadiness` | Machine-readable readiness scoring |
| `pudo.doctor` | Workflow and policy gap diagnosis |
| `pudo.initProject` | Approval-gated project initialization |
| `pudo.updateSessionHandoff` | Approval-gated continuity between sessions |

The alpha server uses local stdio, restricts reads to one configured repository root, requires explicit approval for writes, and exposes no shell or network execution.

```bash
# Via npx (no install needed)
npx @dongduong2001/mcp-server@alpha

# Or install globally
npm install -g @dongduong2001/mcp-server@alpha
pudo-mcp-server
```

See [PUDO MCP Server](docs/mcp.md), [Agent Tool Security](quality/agent-tool-security.md), and the [MCP Security Checklist](quality/mcp-security-checklist.md).

## The 4 Phases

| Phase | Goal | You Do | AI Does |
| :---: | --- | --- | --- |
| **(P) Plan** | Define *what* and *why* | Set scope, constraints, success criteria | Draft implementation plan, identify risks |
| **(U) Understand** | Know *where* and *how* | Point to relevant code, explain context | Analyze codebase, map dependencies, find patterns |
| **(D) Develop** | Build *it* | Review, approve, test | Write code, run tests, track progress |
| **(O) Optimize** | Make *it better* | Validate improvements, merge | Refactor, benchmark, document changes |

<p align="center">
  <img src="assets/pudo_4_phase.png" alt="PUDO 4-Phase Infographic" width="100%" />
</p>

> **Key insight:** PUDO is a **cycle**, not a pipeline. You revisit phases as you learn more. A discovery in Develop might send you back to Plan. That's expected and by design.

## Architecture Overview

PUDO has three product surfaces that work together:

```text
┌──────────────────────────────────────────────────────────────┐
│                    Your Repository                           │
│                                                              │
│  ┌─────────────────┐    ┌──────────────────┐                │
│  │  Agent Config   │    │  Quality Layer   │                │
│  │                 │    │                  │                │
│  │  AGENTS.md      │    │  quality-gates   │                │
│  │  CLAUDE.md      │    │  qc-checklists   │                │
│  │  GEMINI.md      │    │  anti-hallucin.  │                │
│  │  .cursor/rules  │    │  token-budget    │                │
│  │  copilot-inst.  │    │  ai-output-rev.  │                │
│  └────────┬────────┘    └────────┬─────────┘               │
│           │                      │                          │
│           ▼                      ▼                          │
│  ┌──────────────────────────────────────────────────┐       │
│  │              CLI  (npx pudo-code-system)          │       │
│  │                                                  │       │
│  │  init · check · score · score --strict · doctor  │       │
│  └──────────────────────┬───────────────────────────┘       │
│                         │                                   │
└─────────────────────────┼───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│            MCP Server  (stdio, local, sandboxed)            │
│                                                             │
│  generateAgentRules  ·  createContextPack                   │
│  runQualityGate      ·  scoreRepoReadiness                  │
│  initProject         ·  updateSessionHandoff                │
│  validateAgentRules  ·  doctor                              │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌────────────────────────────────────────────┐
│        AI Coding Agents                    │
│                                            │
│  Cursor  Claude  Codex  Copilot            │
│  Gemini  OpenCode  Kiro                    │
└────────────────────────────────────────────┘
```

**Agent Config files** tell every AI assistant how to behave in your repo.
**Quality Layer** provides checklists, gates, and anti-patterns to validate AI output.
**CLI** gives you executable workflow commands that produce machine-readable results.
**MCP Server** exposes all of the above as callable tools for compatible agents.

---

## Install Into a Project

Use the init command to generate agent rules, PR templates, quality checklists, and a session handoff file in any repository:

```bash
npx pudo-code-system init
```

Non-interactive setup:

```bash
npx pudo-code-system init \
  --yes \
  --tools=cursor,claude,codex,copilot,gemini,opencode,kiro \
  --project=nextjs \
  --strictness=standard
```

**Generated files include:** `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.cursor/rules/pudo-core.mdc`, `.github/copilot-instructions.md`, `opencode/opencode.md`, `kiro/system-prompt.md`, `.github/pull_request_template.md`, `.pudo/config.json`, and `.pudo/session.md`.

**Executable workflow commands:**

```bash
npx pudo-code-system check              # validate installed config files
npx pudo-code-system score              # score repo readiness (0-100)
npx pudo-code-system score --json       # machine-readable JSON output
npx pudo-code-system score --strict     # fail if score is below threshold
npx pudo-code-system doctor             # diagnose workflow gaps
```

`score` evaluates instruction specificity, context quality, workflow evidence, AI/MCP safety, tests, CI, benchmarks, and release traceability. Its JSON output follows [schemas/pudo-score.schema.json](schemas/pudo-score.schema.json).

## Quick Start

### 1. Plan

Before writing any code, define what you're building:

```text
I need to build [FEATURE].
The success criteria are [CRITERIA].
The constraints are [CONSTRAINTS].
Create an implementation plan before writing any code.
```

### 2. Understand

Research before you build:

```text
Before implementing, analyze the existing codebase:
- What patterns are already established?
- What dependencies are involved?
- What could break?
```

### 3. Develop

Build with structure:

```text
Implement the plan. Track progress with a task checklist.
Write tests alongside the implementation.
Flag any deviations from the plan.
```

### 4. Optimize

Don't ship the first draft:

```text
Review the implementation:
- Are there performance improvements?
- Is the code consistent with existing patterns?
- Write a walkthrough summarizing what changed and why.
```

### 5. Repeat

Every task, every feature, every bug fix — **Plan → Understand → Develop → Optimize.**

---

## PUDO Modes

Use the smallest mode that safely fits the task. See [PUDO Modes](docs/pudo-modes.md) for the full guide.

| Mode | Use For | Process |
| --- | --- | --- |
| **PUDO Lite** | Small fixes, scripts, tasks under 30 minutes | Three checks: scope, relevant files, verification |
| **PUDO Standard** | Medium features, real bugs, focused refactors | Full Plan → Understand → Develop → Optimize |
| **PUDO Enterprise** | Team, production, security, compliance | Full PUDO plus owner, rollback, monitoring, migration, risk log |

## Quality Gates

Each phase ends with a gate. Do not move forward until the gate passes, or until the risk is explicitly accepted.

| Gate | Run Before | Must Prove |
| --- | --- | --- |
| **Plan Gate** | Understand | Scope, success criteria, constraints, and out-of-scope items are clear |
| **Understand Gate** | Develop | Relevant files, architecture, APIs, and patterns were verified |
| **Develop Gate** | Optimize | Implementation stays in scope, has tests, and handles key edge cases |
| **Optimize Gate** | Release | Refactors preserve behavior; performance, security, docs, and risks reviewed |
| **Release Gate** | Merge/deploy | Changelog, migration, rollback, monitoring, and owner approval handled |

See [Quality Gates](quality/quality-gates.md), [QC Checklists](quality/qc-checklists.md), [AI Output Review](quality/ai-output-review.md), [Anti-Hallucination Rules](quality/anti-hallucination.md), [Token Budget Rules](quality/token-budget.md), [Context Engineering](docs/context-engineering.md), and the [Edge Case Catalogue](quality/edge-cases/general.md).

---

## Examples

See PUDO applied to real-world scenarios:

| # | Scenario | Complexity | Key Takeaway |
| --- | --- | :---: | --- |
| [01](examples/01-landing-page/walkthrough.md) | Building a landing page | Beginner | How Plan prevents scope creep |
| [02](examples/02-api-integration/walkthrough.md) | Stripe API integration | Intermediate | How Understand saves debugging time |
| [03](examples/03-debug-production/walkthrough.md) | Fixing a production bug | Advanced | How the full cycle prevents regressions |
| [04](examples/04-quality-gate-failure/walkthrough.md) | Quality gate failure case | Intermediate | How a failed gate prevents bad releases |
| [05](examples/05-before-after-token-waste/metrics.md) | Before/after token waste | Intermediate | How source grounding reduces wasted AI turns |

---

## Prompt Library

PUDO ships with **21 ready-to-use prompts** across 4 phases. Copy-paste into any AI assistant. Each phase folder includes a `README.md` explaining how to extend the prompts for your team.

| Phase | Prompts |
| --- | --- |
| **(P) Plan** | [Scope Definition](prompts/plan/scope-definition.md) · [Architecture Draft](prompts/plan/architecture-draft.md) · [Risk Assessment](prompts/plan/risk-assessment.md) · [Database Schema](prompts/plan/database-schema-design.md) · [API Contract](prompts/plan/api-contract-design.md) · [Security Threat Model](prompts/plan/security-threat-model.md) |
| **(U) Understand** | [Codebase Analysis](prompts/understand/codebase-analysis.md) · [Dependency Audit](prompts/understand/dependency-audit.md) · [Pattern Recognition](prompts/understand/pattern-recognition.md) · [Crash Log Analysis](prompts/understand/crash-log-analysis.md) |
| **(D) Develop** | [Feature Implementation](prompts/develop/feature-implementation.md) · [Test-Driven Dev](prompts/develop/test-driven-dev.md) · [Component Scaffold](prompts/develop/component-scaffold.md) · [Integration Test Suite](prompts/develop/integration-test-suite.md) · [E2E Test Suite](prompts/develop/e2e-test-suite.md) |
| **(O) Optimize** | [Performance Review](prompts/optimize/performance-review.md) · [Code Review Checklist](prompts/optimize/code-review-checklist.md) · [Refactor Opportunities](prompts/optimize/refactor-opportunities.md) · [Memory Profiling](prompts/optimize/memory-profiling.md) · [Network Troubleshooting](prompts/optimize/network-troubleshooting.md) |
| **Skills** | [Architecture & Planning](skills/plan/SKILL.md) · [Software Engineering](skills/code/SKILL.md) · [Troubleshooting & Debugging](skills/debug/SKILL.md) · [DevOps Engineering](skills/devops/SKILL.md) · [Test Engineering](skills/test/SKILL.md) |
| **DevOps Tools** | [GitHub Actions](skills/devops/github-actions/SKILL.md) · [GitLab CI](skills/devops/gitlab-ci/SKILL.md) · [Argo CD](skills/devops/argo-cd/SKILL.md) · [Jenkins](skills/devops/jenkins/SKILL.md) · [Terraform](skills/devops/terraform/SKILL.md) · [Docker](skills/devops/docker/SKILL.md) · [Kubernetes](skills/devops/kubernetes/SKILL.md) |

---

## AI Integrations

PUDO is designed to be the default operating layer for AI coding agents, working across all major tools.

| Tool | Current Files | Recommended Setup | Status |
| --- | --- | --- | --- |
| **Codex** | [AGENTS.md](AGENTS.md), [codex/AGENTS.md](codex/AGENTS.md) | Keep root `AGENTS.md`; copy `codex/AGENTS.md` for a fuller Codex template | OK |
| **Claude Code / Projects** | [CLAUDE.md](CLAUDE.md), [claude/CLAUDE.md](claude/CLAUDE.md), [.claude/settings.json](.claude/settings.json) | Use root `CLAUDE.md` as the bridge; keep detailed workflow in `claude/CLAUDE.md` | Updated |
| **Cursor** | [Project Rules](cursor/.cursor/rules/pudo-core.mdc), [legacy .cursorrules](cursor/.cursorrules) | Prefer `.cursor/rules/*.mdc`; keep `.cursorrules` for legacy Cursor versions | Migrated |
| **GitHub Copilot** | [.github/copilot-instructions.md](.github/copilot-instructions.md), [.github/instructions/](.github/instructions/) | Use repo-wide instructions plus path-specific `.instructions.md` files | Added |
| **Gemini** | [GEMINI.md](GEMINI.md), [antigravity/instructions.xml](antigravity/instructions.xml) | Use `GEMINI.md` as the instruction bridge; keep Antigravity XML for Gemini-style workspaces | CLI generated |
| **OpenCode** | [opencode/opencode.md](opencode/opencode.md) | Add to OpenCode system prompts or workspace instructions | CLI generated |
| **Kiro** | [kiro/system-prompt.md](kiro/system-prompt.md) | Set as the Kiro system prompt | CLI generated |

---

## Repository Structure

```text
pudo-code-system/
├── AGENTS.md                   # Shared agent rules (Codex, cross-tool)
├── CLAUDE.md                   # Claude Code memory bridge
├── GEMINI.md                   # Gemini agent instructions
│
├── docs/                       # Documentation
│   ├── README.md               # Documentation index
│   ├── philosophy.md           # Why PUDO exists and its design principles
│   ├── workflow.md             # Deep-dive into each phase
│   ├── pudo-modes.md           # Lite / Standard / Enterprise guide
│   ├── getting-started.md      # First steps for new users
│   ├── architecture.md         # System diagram and component overview
│   ├── context-engineering.md  # How to bound AI context effectively
│   ├── mcp.md                  # MCP server setup and usage
│   ├── agent-skill-contract.md # Agent capability contracts
│   ├── team-adoption-guide.md  # Multi-phase team rollout guide
│   └── faq.md                  # Frequently asked questions
│
├── prompts/                    # 21 ready-to-use AI prompts
│   ├── plan/                   # Scoping, architecture, risk
│   ├── understand/             # Codebase analysis, patterns
│   ├── develop/                # Implementation, testing
│   └── optimize/               # Performance, review, refactor
│
├── skills/                     # Domain-specific PUDO variants
│   ├── plan/                   # Architecture & planning
│   ├── code/                   # Software engineering
│   ├── debug/                  # Troubleshooting
│   ├── devops/                 # CI/CD, infra tools
│   ├── test/                   # Test engineering
│   ├── frontend/               # Frontend patterns
│   ├── backend/                # Backend patterns
│   └── mobile/                 # Mobile development
│
├── quality/                    # Quality enforcement
│   ├── quality-gates.md        # Phase gate checklists
│   ├── qc-checklists.md        # Product, eng, security checklists
│   ├── ai-output-review.md     # Reviewing AI-generated code
│   ├── anti-hallucination.md   # Preventing AI errors
│   ├── token-budget.md         # Context window management
│   ├── mcp-security-checklist.md
│   ├── agent-tool-security.md
│   └── edge-cases/             # Edge case catalogue
│
├── examples/                   # Real-world PUDO walkthroughs
│   ├── 01-landing-page/
│   ├── 02-api-integration/
│   ├── 03-debug-production/
│   ├── 04-quality-gate-failure/
│   └── 05-before-after-token-waste/
│
├── templates/                  # Stack-specific project scaffolds
│   ├── nextjs/
│   ├── react-vite/
│   ├── node-express/
│   ├── python-fastapi/
│   └── ...
│
├── benchmarks/                 # Measurement framework
│   ├── README.md               # How to benchmark
│   ├── metrics-sheet.csv       # Template for recording results
│   ├── token-waste-calculator.md
│   └── results/                # Measured case studies
│
├── schemas/                    # JSON schemas for machine-readable output
│   ├── pudo-score.schema.json
│   ├── pudo-metrics.schema.json
│   └── pudo-run-trace.schema.json
│
├── packages/
│   └── pudo-mcp-server/        # MCP server (TypeScript)
│       ├── src/server.ts
│       ├── tools/              # 8 callable MCP tools
│       └── tests/
│
├── bin/
│   └── pudo.js                 # CLI entry point
│
├── .pudo/                      # PUDO operating-kit state
│   ├── config.json
│   ├── session.md              # Session handoff file
│   └── checklists/
│
├── .github/
│   ├── workflows/              # CI: CLI install test, PUDO check
│   ├── ISSUE_TEMPLATE/         # Bug report, feature request
│   ├── pull_request_template.md
│   └── CODEOWNERS
│
└── cursor/, claude/, codex/,   # Tool-specific config dirs
    kiro/, opencode/, antigravity/
```

---

## Measurement Targets

These numbers are directional targets to validate with your own benchmark data, not proven PUDO-wide guarantees. Current public evidence is one measured case study — do not cite this table as a benchmark claim until you have your own data. Gains depend on task size, repo quality, and how consistently you follow PUDO.

| Task Type | Token Waste Reduction Target | Dev Time Reduction Target |
| --- | ---: | ---: |
| One-line fix / small script | 0–8% | -5% to +5% |
| Small / medium feature | 25–38% | 12–20% |
| Hard bug / production issue | 22–35% | 10–18% |
| Multi-file feature / tests / team handoff | 35–48% | 18–28% |
| Measurement target for mature usage | 34% | 18% |

Measure your own results with the [Benchmark Kit](benchmarks/). Track tokens, AI turns, failed attempts, unnecessary file reads, time to verified implementation, bugs found after AI output, and PR review comments. See the sample measured case in [benchmarks/results/stripe-webhook-2026-05](benchmarks/results/stripe-webhook-2026-05/).

---

## Philosophy

PUDO isn't just a checklist — it's a mindset. Read the [full philosophy](docs/philosophy.md) to understand the principles behind the method.

**TL;DR:**

- **Anti-chaos** — Structure beats improvisation at scale
- **Iterative** — It's a cycle, not a waterfall
- **AI-native** — Designed for human+AI pair programming
- **Phase integrity** — Each phase has clear entry and exit criteria

---

## Onboarding Paths

| Path | Best For | Setup |
| --- | --- | --- |
| **Solo dev** | Small projects, personal repos, fast iteration | `npx pudo-code-system init --strictness=lite` |
| **Team lead** | Shared PR review, handoff, medium features | `npx pudo-code-system init --strictness=standard --tools=cursor,claude,codex,copilot,gemini,opencode,kiro` |
| **Enterprise / security** | Production, compliance, migrations, sensitive data | `npx pudo-code-system init --strictness=enterprise` plus Release Gate |

See [Team Adoption Guide](docs/team-adoption-guide.md) for a multi-phase team rollout plan.

---

## When Not To Use PUDO

PUDO may be overkill for one-line fixes, throwaway prototypes, pure exploration, and non-critical scripts. Use the full cycle when correctness, maintainability, security, or team handoff matters.

## Current Limitations

- PUDO does not guarantee AI output is correct.
- Human review is still required.
- Security-sensitive changes still need dedicated security review.
- Examples are illustrative, not universal.
- The method requires discipline; skipping gates turns it back into ad hoc prompting.

## Who Is This For?

- **Developers using AI assistants** (ChatGPT, Claude, Gemini, Copilot, etc.) who want better results
- **Team leads** looking for a shared methodology for AI-assisted development
- **Students** learning to code with AI the right way from day one

---

## Contributing

PUDO grows with the community. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add prompts, submit walkthroughs, improve docs, and report issues.

Questions? Open a [Discussion](../../discussions) or check [SUPPORT.md](SUPPORT.md).

---

## Support & Funding

If you find PUDO helpful, consider supporting the project:

- [GitHub Sponsors](https://github.com/sponsors/DongDuong2001)
- [Patreon](https://patreon.com/DongDuong2001)
- [Ko-fi](https://ko-fi.com/dongphuduong)
- [Buy Me a Coffee](https://buymeacoffee.com/lab68dev)

---

## License

[MIT](LICENSE) — Use it, fork it, make it yours.

---

<p align="center">
  <strong>Stop vibing. Start PUDO-ing.</strong>
  <br /><br />
  <em>Plan → Understand → Develop → Optimize</em>
</p>

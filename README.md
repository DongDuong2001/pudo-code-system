<a href="https://forg.to/products/pudo" target="_blank" rel="noopener">
  <img src="https://forg.to/api/badges/upvote/pudo?theme=light&shape=square" alt="Pudo - Upvote on Forg on forg." height="48" />
</a>

<p align="center">
  <img src="assets/Pudo_banner.png" alt="PUDO Code System" width="100%" />
</p>

<h3 align="center">A structured 4-phase methodology for coding with AI assistants.</h3>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT" /></a>
  <img src="https://img.shields.io/badge/version-1.0.0-brightgreen.svg" alt="Version 1.0.0" />
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-orange.svg" alt="PRs Welcome" /></a>
  <img src="https://img.shields.io/badge/AI-agnostic-purple.svg" alt="AI Agnostic" />
</p>

<p align="center">
  <b>🌍 Languages:</b>
  <a href="README.md">English</a> |
  <a href="README.vi.md">Tiếng Việt</a> |
  <a href="README.pt.md">Português</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.ru.md">Русский</a>
</p>

<p align="center">
  <a href="assets/The_PUDO_Code_System.mp4"><strong>🎥 Watch the PUDO Code System overview video</strong></a>
</p>

---

## The Problem

You open your editor. You type a vague request to your AI assistant. It generates something. You paste it in. It half-works. You ask for a fix. It breaks something else. Repeat for 3 hours.

**This is chaos coding.** It feels productive, but it's not.

The issue isn't the AI — it's the **lack of structure**. Without a clear methodology, AI-assisted development becomes a random walk through your codebase.

## The Solution: PUDO

**PUDO** gives you a repeatable, 4-phase cycle that turns AI from a slot machine into a precision tool.

| Phase | Goal | You Do | AI Does |
|:---:|---|---|---|
| **(P) Plan** | Define *what* and *why* | Set scope, constraints, success criteria | Draft implementation plan, identify risks |
| **(U) Understand** | Know *where* and *how* | Point to relevant code, explain context | Analyze codebase, map dependencies, find patterns |
| **(D) Develop** | Build *it* | Review, approve, test | Write code, run tests, track progress |
| **(O) Optimize** | Make *it better* | Validate improvements, merge | Refactor, benchmark, document changes |

<p align="center">
  <img src="assets/pudo_4_phase.png" alt="PUDO 4-Phase Infographic" width="100%" />
</p>

> **Key insight:** PUDO is a **cycle**, not a pipeline. You revisit phases as you learn more. A discovery in Develop might send you back to Plan. That's expected.

## Quick Start

### 1. Start with Plan

Before writing any code, define what you're building:

```
I need to build [FEATURE]. 
The success criteria are [CRITERIA].
The constraints are [CONSTRAINTS].
Create an implementation plan before writing any code.
```

### 2. Move to Understand

Research before you build:

```
Before implementing, analyze the existing codebase:
- What patterns are already established?
- What dependencies are involved?
- What could break?
```

### 3. Execute in Develop

Build with structure:

```
Implement the plan. Track progress with a task checklist.
Write tests alongside the implementation.
Flag any deviations from the plan.
```

### 4. Close with Optimize

Don't ship the first draft:

```
Review the implementation:
- Are there performance improvements?
- Is the code consistent with existing patterns?
- Write a walkthrough summarizing what changed and why.
```

### 5. Repeat

Every task, every feature, every bug fix. **Plan → Understand → Develop → Optimize.**

## Examples

See PUDO applied to real-world scenarios:

| # | Scenario | Complexity | Key Takeaway |
|---|----------|:---:|---|
| [01](examples/01-landing-page/walkthrough.md) | Building a landing page | Beginner | How Plan prevents scope creep |
| [02](examples/02-api-integration/walkthrough.md) | Stripe API integration | Intermediate | How Understand saves debugging time |
| [03](examples/03-debug-production/walkthrough.md) | Fixing a production bug | Advanced | How the full cycle prevents regressions |

## Prompt Library

PUDO ships with a [ready-to-use prompt library](prompts/) — **21 prompts** across 4 phases and domain skills that you can copy-paste into any AI assistant. Each phase directory includes a detailed `README.md` explaining how to modify and extend the prompts for your team's needs.

| Phase | Prompts |
|---|---|
| **(P)** Plan | [Scope Definition](prompts/plan/scope-definition.md) · [Architecture Draft](prompts/plan/architecture-draft.md) · [Risk Assessment](prompts/plan/risk-assessment.md) · [Database Schema](prompts/plan/database-schema-design.md) · [API Contract](prompts/plan/api-contract-design.md) · [Security Threat Model](prompts/plan/security-threat-model.md) |
| **(U)** Understand | [Codebase Analysis](prompts/understand/codebase-analysis.md) · [Dependency Audit](prompts/understand/dependency-audit.md) · [Pattern Recognition](prompts/understand/pattern-recognition.md) · [Crash Log Analysis](prompts/understand/crash-log-analysis.md) |
| **(D)** Develop | [Feature Implementation](prompts/develop/feature-implementation.md) · [Test-Driven Dev](prompts/develop/test-driven-dev.md) · [Component Scaffold](prompts/develop/component-scaffold.md) · [Integration Test Suite](prompts/develop/integration-test-suite.md) · [E2E Test Suite](prompts/develop/e2e-test-suite.md) |
| **(O)** Optimize | [Performance Review](prompts/optimize/performance-review.md) · [Code Review Checklist](prompts/optimize/code-review-checklist.md) · [Refactor Opportunities](prompts/optimize/refactor-opportunities.md) · [Memory Profiling](prompts/optimize/memory-profiling.md) · [Network Troubleshooting](prompts/optimize/network-troubleshooting.md) |
| **Skills** | [Architecture & Planning](skills/plan/SKILL.md) · [Software Engineering](skills/code/SKILL.md) · [Troubleshooting & Debugging](skills/debug/SKILL.md) · [DevOps Engineering](skills/devops/SKILL.md) · [Test Engineering](skills/test/SKILL.md) |
| **DevOps Tools** | [GitHub Actions](skills/devops/github-actions/SKILL.md) · [GitLab CI](skills/devops/gitlab-ci/SKILL.md) · [Argo CD](skills/devops/argo-cd/SKILL.md) · [Jenkins](skills/devops/jenkins/SKILL.md) · [Terraform](skills/devops/terraform/SKILL.md) · [Docker](skills/devops/docker/SKILL.md) · [Kubernetes](skills/devops/kubernetes/SKILL.md) |

## AI Integrations

PUDO is designed to be the default operating system for your AI coding agents. We've included pre-written system instructions for the most popular tools:

- **[Claude Projects](claude.md)**: Paste into your Project's custom instructions.
- **[Cursor](cursor/.cursorrules)**: Copy to `.cursorrules` in your repository root.
- **[OpenCode](opencode/opencode.md)**: Add to your OpenCode system prompts or workspace instructions.
- **[Antigravity](antigravity/instructions.xml)**: Copy to `.gemini/antigravity/instructions.xml` in your workspace.
- **[Kiro](kiro/system-prompt.md)**: Set as the system prompt in your Kiro settings.

## Philosophy

PUDO isn't just a checklist — it's a mindset. Read the [full philosophy](docs/philosophy.md) to understand the principles behind the method.

**TL;DR:**
- **Anti-chaos** — Structure beats improvisation at scale
- **Iterative** — It's a cycle, not a waterfall
- **AI-native** — Designed for human+AI pair programming
- **Phase integrity** — Each phase has clear entry and exit criteria

## Who Is This For?

- **Developers using AI assistants** (ChatGPT, Claude, Gemini, Copilot, etc.) who want better results
- **Team leads** looking for a shared methodology for AI-assisted development
- **Students** learning to code with AI the right way from day one

## Contributing

PUDO grows with the community. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to:

- Add new prompts to the library
- Submit real-world example walkthroughs
- Improve the documentation

## Support & Funding

If you find PUDO helpful, consider supporting the project:

- [Ko-fi](https://ko-fi.com/dongphuduong)
- [Buy Me a Coffee](https://buymeacoffee.com/lab68dev)
- **PayPal:** dongduong840@gmail.com

## License

[MIT](LICENSE) — Use it, fork it, make it yours.

---

<p align="center">
  <strong>Stop vibing. Start PUDO-ing.</strong>
  <br /><br />
  <em>Plan → Understand → Develop → Optimize</em>
</p>

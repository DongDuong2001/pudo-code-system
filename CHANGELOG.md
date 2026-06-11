# Changelog

All notable changes to `pudo-code-system` will be documented in this file.

The format is inspired by Keep a Changelog and organized for practical repository tracking.

## [Unreleased]

### Added

- GitHub Actions CLI install smoke test that packs the npm artifact, runs `init` through `npx` in a clean project, verifies generated files, and runs `check`
- README CI badge linking directly to the CLI install test

### Changed

- Promoted the MCP server to the primary agent-facing product surface in the README, with its callable tools and security boundaries shown before the CLI documentation
- Updated the roadmap with packaged CLI verification and the path toward a publishable MCP server package

## [1.2.0] - 2026-06-10

### Added

- `pudo check`, `pudo score`, and `pudo doctor` executable workflow commands
- Evidence-based `pudo score --json` output and strict readiness enforcement with `pudo score --strict`
- PUDO MCP server alpha under [packages/pudo-mcp-server](packages/pudo-mcp-server/) with local stdio tools for init, validation, scoring, context packs, quality gates, diagnosis, and session handoff
- Agent tool and MCP security controls:
  - [quality/agent-tool-security.md](quality/agent-tool-security.md)
  - [quality/mcp-security-checklist.md](quality/mcp-security-checklist.md)
  - [templates/mcp/pudo-server-policy.json](templates/mcp/pudo-server-policy.json)
- Machine-readable schemas for score reports and MCP server policy in [schemas/](schemas/)
- Repository ownership enforcement through [.github/CODEOWNERS](.github/CODEOWNERS)
- GitHub Action checker at [.github/workflows/pudo-check.yml](.github/workflows/pudo-check.yml)
- Context engineering guide at [docs/context-engineering.md](docs/context-engineering.md)
- Agent skill contract at [docs/agent-skill-contract.md](docs/agent-skill-contract.md)
- Sample measured benchmark case under [benchmarks/results/stripe-webhook-2026-05](benchmarks/results/stripe-webhook-2026-05/)
- README onboarding paths for solo dev, team lead, and enterprise/security usage

### Changed

- Repositioned PUDO as an AI Agent Operating Layer across Cursor, Claude, Codex, GitHub Copilot, and Gemini/Antigravity
- Expanded CLI generation support to Gemini, OpenCode, and Kiro
- Synchronized package and README badge version to `1.2.0`
- Replaced file-existence scoring with content and evidence rubrics

## [1.1.0] - 2026-05-23

### Added

- `pudo init` CLI scaffold via [package.json](package.json) and [bin/pudo.js](bin/pudo.js)
- Stack-specific templates in [templates/](templates/) for Next.js, React Vite, Node Express, Python FastAPI, Django, Laravel, Go API, and React Native
- PUDO operating-kit state files in [.pudo/](.pudo/) including config, session handoff, and release checklist
- GitHub workflow artifacts: [pull request template](.github/pull_request_template.md) and [issue templates](.github/ISSUE_TEMPLATE/)
- Benchmark kit in [benchmarks/](benchmarks/) with metrics sheet, calculator, task template, and before/after example
- New example [05-before-after-token-waste](examples/05-before-after-token-waste/metrics.md) showing token and iteration reduction
- Governance and workflow docs:
  - [docs/pudo-modes.md](docs/pudo-modes.md)
  - [quality/anti-hallucination.md](quality/anti-hallucination.md)
  - [quality/token-budget.md](quality/token-budget.md)
  - [ROADMAP.md](ROADMAP.md)

### Changed

- Repositioned [README.md](README.md) from a methodology + prompt library toward a developer operating kit
- Added install flow, PUDO modes, benchmark references, and operating-kit sections to the main README
- Added and aligned `Expected Impact` claims across all README variants:
  - [README.md](README.md)
  - [README.vi.md](README.vi.md)
  - [README.es.md](README.es.md)
  - [README.pt.md](README.pt.md)
  - [README.ru.md](README.ru.md)
- Added `Quality Gates`, current limitations, and updated AI integration guidance across localized READMEs

### Integration Updates

- Added root [CLAUDE.md](CLAUDE.md) bridge file and [.claude/settings.json](.claude/settings.json)
- Added Cursor Project Rules in [cursor/.cursor/rules/](cursor/.cursor/rules/) while keeping [cursor/.cursorrules](cursor/.cursorrules) for legacy compatibility
- Added GitHub Copilot repository and path-specific instructions:
  - [.github/copilot-instructions.md](.github/copilot-instructions.md)
  - [.github/instructions/](.github/instructions/)

### Quality System

- Added [quality/quality-gates.md](quality/quality-gates.md)
- Expanded [quality/qc-checklists.md](quality/qc-checklists.md) into product, engineering, security, UX, testing, documentation, release, and AI-output review categories
- Added [quality/ai-output-review.md](quality/ai-output-review.md)
- Moved the edge case catalogue to [quality/edge-cases/general.md](quality/edge-cases/general.md)

### Notes

- The CLI is intentionally minimal and dependency-free at this stage.
- Benchmarks and expected impact numbers are directional until teams record their own measurements.

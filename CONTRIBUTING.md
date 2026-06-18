# Contributing to PUDO Code System

Thank you for taking the time to contribute. Every improvement — from a typo fix to a new example walkthrough — makes PUDO more useful for developers everywhere.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Contribution Types](#contribution-types)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Good First Issues](#good-first-issues)

---

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold its standards. Report unacceptable behavior to [dongduong840@gmail.com](mailto:dongduong840@gmail.com).

---

## How to Contribute

1. **Fork** the repository
2. **Create a branch** from `main` — `git checkout -b feat/your-feature-name`
3. **Make your changes** — follow the guidelines below
4. **Test your changes** — run `npm test` and `npx pudo-code-system check` from the repo root
5. **Open a Pull Request** — fill in the PR template completely

If you are unsure about a change before investing time in it, open a [Discussion](../../discussions) or [Issue](../../issues/new) first.

---

## Development Setup

### Prerequisites

- Node.js 20 or higher
- npm 9 or higher

### Install dependencies

```bash
# Root package (CLI)
npm install

# MCP server package
cd packages/pudo-mcp-server
npm install
```

### Build the MCP server

```bash
cd packages/pudo-mcp-server
npm run build
```

### Run tests

```bash
# CLI tests (root)
npm test

# MCP server tests
cd packages/pudo-mcp-server
npm test
```

### Verify the PUDO operating kit

```bash
npx pudo-code-system check
npx pudo-code-system score
npx pudo-code-system doctor
```

All three should pass before opening a PR.

---

## Contribution Types

### Report Issues

Found a typo, broken link, or confusing explanation? [Open an issue](../../issues/new?template=bug_report.md) with:

- A clear title describing the problem
- The file path or section where you found it
- A suggested fix (if you have one)

### Add a New Prompt

Prompts are the heart of PUDO. To add one:

1. Choose the right phase folder under `prompts/`:
   - `prompts/plan/` — Scoping, architecture, risk assessment
   - `prompts/understand/` — Codebase analysis, research, pattern recognition
   - `prompts/develop/` — Implementation, testing, scaffolding
   - `prompts/optimize/` — Performance, refactoring, code review
2. Follow the prompt template (see `CONTRIBUTING.md#prompt-template` below)
3. Test the prompt with at least one AI model and verify the output is useful
4. Submit a Pull Request describing when developers should use the prompt

#### Prompt Template

```markdown
# [Prompt Name]

> **Phase:** Plan | Understand | Develop | Optimize
> **Tags:** #tag1, #tag2, #tag3
> **AI Model:** Any (model-agnostic)

## Context

When to use this prompt and what it assumes about the project.

## Variables

| Variable | Description | Example |
|---|---|---|
| `{{variable_name}}` | What this represents | `example value` |

## Prompt

The actual prompt text here.

## Example Usage

### Input

Concrete example of filling in the variables.

### Expected Output

What a good response looks like.
```

### Add a New Example Walkthrough

Real-world examples make PUDO tangible. To add one:

1. Create a new folder under `examples/` with the pattern `XX-short-description/`
2. Include a `walkthrough.md` that covers all 4 PUDO phases
3. Show real decisions, tradeoffs, and outcomes — not idealized scenarios
4. Include a brief "Lessons Learned" section at the end

### Add a Benchmark Case Study

Measured evidence makes PUDO credible. To submit a case study:

1. Copy the template from `benchmarks/task-template.md`
2. Record baseline and PUDO metrics using `benchmarks/metrics-sheet.csv`
3. Create a folder under `benchmarks/results/` with the pattern `task-name-YYYY-MM/`
4. Include: `task.md`, `baseline-transcript.md`, `pudo-transcript.md`, `metrics.csv`, `conclusion.md`

### Improve Documentation

Documentation improvements are always welcome. Before editing:

1. Read the existing file to understand its scope and audience
2. Match the existing tone: practical, concise, developer-first
3. Update cross-references if you rename or move sections

### Report Security Issues

**Do not open a public issue for security vulnerabilities.** See [SECURITY.md](SECURITY.md) for responsible disclosure instructions.

---

## Commit Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat: add memory-profiling prompt to optimize phase
fix: correct broken link in docs/workflow.md
docs: expand FAQ with team handoff questions
chore: bump MCP server dependencies
refactor: simplify pudo_score.ts scoring logic
test: add edge case test for quality gate timeout
```

Keep commits focused. One logical change per commit.

---

## Pull Request Process

1. Fill in the pull request template completely — partial templates will be asked to complete
2. Link the PR to an issue if one exists (`Closes #123`)
3. Ensure `npx pudo-code-system check` passes in CI
4. Self-review your diff before requesting review — remove debug output, check for typos
5. PRs that add prompts must include a test run showing the prompt output
6. PRs that change the CLI or MCP server must include passing tests

PRs are reviewed by the maintainer within a few days. If you haven't heard back in a week, add a comment to ping.

---

## Good First Issues

Looking for a place to start? Check the [`good first issue`](../../labels/good%20first%20issue) label in the issue tracker.

Common good first contributions:

- Fix a typo or broken link in any doc
- Add an example to an existing walkthrough
- Add a new prompt to the library (pick a phase that has fewer prompts)
- Improve the FAQ with a question you had when getting started
- Submit a benchmark case study from your own codebase

---

## General Guidelines

- **Keep it practical.** PUDO is a methodology for doers, not theorists.
- **Be model-agnostic.** Prompts should work across AI assistants (ChatGPT, Claude, Gemini, etc.).
- **Write for clarity.** Assume the reader is a developer who has never heard of PUDO.
- **Test your prompts.** Before submitting, run the prompt with at least one AI model and verify the output.
- **Match existing conventions.** Read the surrounding files before writing new ones.

## Questions?

Open a [Discussion](../../discussions) or check [SUPPORT.md](SUPPORT.md). We are happy to help.

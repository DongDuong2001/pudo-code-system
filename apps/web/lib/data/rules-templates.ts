export interface RuleGeneratorOptions {
  tool: "codex" | "claude" | "cursor" | "windsurf" | "roo" | "gemini";
  project: "generic" | "next" | "react" | "fastapi" | "django" | "go" | "rust" | "bun";
  strictness: "standard" | "strict";
}

export interface RuleFileResult {
  filename: string;
  language: string;
  content: string;
  description: string;
  setupPath: string;
}

const STACK_INVARIANTS: Record<string, string> = {
  generic: "- Keep dependencies scoped and minimal.\n- Maintain reproducible test setups and linters.\n- Clean diffs with conventional commits.",
  next: "- Prefer React Server Components by default; opt-in to 'use client' only when interactivity is needed.\n- Keep data mutations in Server Actions or dedicated route handlers.\n- Enforce next/image, next/font, and layout caching best practices.",
  react: "- Keep state local whenever possible; avoid global state bloat.\n- Co-locate hooks, components, and tests.\n- Use Vite environment variables (VITE_*) carefully without exposing server secrets.",
  fastapi: "- Always use Pydantic models for request bodies and response schemas.\n- Keep routes asynchronous (async def) for I/O bound endpoints.\n- Type hint dependencies strictly with Annotated and Depends.",
  django: "- Follow fat models, thin views, and reusable service layers.\n- Use Django migrations for all schema adjustments; never edit raw DB state.\n- Keep settings segregated across environments (base, dev, prod).",
  go: "- Respect standard Go project layout (cmd/, internal/, pkg/).\n- Handle every error explicitly; do not panic in library code.\n- Write table-driven unit tests with t.Parallel() where safe.",
  rust: "- Prioritize memory safety, explicit Result/Option handling, and zero-cost abstractions.\n- Keep unsafe code strictly isolated and documented.\n- Run cargo clippy --all-targets --all-features and cargo test.",
  bun: "- Leverage built-in bun:test, bun:sqlite, and high-performance native APIs.\n- Use bunx for script executions.\n- Maintain bun.lockb integrity.",
};

export function generateRuleTemplate(options: RuleGeneratorOptions): RuleFileResult {
  const { tool, project, strictness } = options;
  const isStrict = strictness === "strict";
  const stackNotes = STACK_INVARIANTS[project] || STACK_INVARIANTS.generic;

  switch (tool) {
    case "cursor":
      return {
        filename: ".cursorrules",
        language: "markdown",
        description: "Cursor IDE system prompt & agent ruleset",
        setupPath: "Root directory of your repository",
        content: `# Cursor Agent Rules (PUDO Framework)

## Workflow Loop: Plan -> Understand -> Develop -> Optimize

### 1. Plan
- For every non-trivial task, outline scope, risks, and acceptance criteria before writing code.
- State which files will be touched and what tests will verify the change.
${isStrict ? "- Require explicit human confirmation before initiating database migrations or major refactors." : ""}

### 2. Understand
- Inspect relevant codebase files before modifying them.
- Respect established architectural invariants and design tokens.
- Stack-specific guidelines:
${stackNotes}

### 3. Develop
- Produce small, focused, reviewable patches.
- Never invent hypothetical APIs, configuration flags, or test outputs.
- Write or update unit/integration tests alongside changes.

### 4. Optimize
- Self-review code for regressions, memory leaks, and performance bottlenecks.
- Run local quality gates before declaring done.
- Stage files and commit using Conventional Commits.
`,
      };

    case "windsurf":
      return {
        filename: ".windsurfrules",
        language: "markdown",
        description: "Windsurf Cascade AI rules & behavioral constraints",
        setupPath: "Root directory of your repository",
        content: `# Windsurf Cascade Rules (PUDO Operating System)

## Operating Protocol: Plan -> Understand -> Develop -> Optimize

### Plan
- Propose a concise execution plan before editing code.
- Explicitly identify high-risk components and dependencies.

### Understand
- Read and inspect existing source files to preserve conventions.
- Tech Stack Invariants:
${stackNotes}

### Develop
- Execute targeted edits.
- Ensure every change has corresponding test assertions.
- Do not add extraneous dependencies without explicit user consent.

### Optimize
- Verify that linters and tests pass cleanly.
- Keep .pudo/session.md updated when handoff context is needed.
- Write clean Conventional Commit messages.
`,
      };

    case "roo":
      return {
        filename: ".clinerules",
        language: "markdown",
        description: "Roo Code / Cline autonomous agent instructions",
        setupPath: "Root directory of your repository",
        content: `# Roo Code / Cline Rules (PUDO Framework)

## Default Loop: Plan -> Understand -> Develop -> Optimize

### Plan
- Analyze task requirements and formulate a step-by-step checklist.
- Identify preconditions and testable milestones.

### Understand
- Traverse directory structure before proposing modifications.
- Tech Stack Invariants:
${stackNotes}

### Develop
- Make atomic edits.
- Validate types, imports, and syntax.
${isStrict ? "- Do not execute shell commands with destructive potential without user sign-off." : ""}

### Optimize
- Execute test suites to catch regressions early.
- Document session handoffs in .pudo/session.md.
`,
      };

    case "claude":
      return {
        filename: "CLAUDE.md",
        language: "markdown",
        description: "Claude Code CLI instructions & guidelines",
        setupPath: "Root directory of your repository",
        content: `# Claude Code Instructions (PUDO Framework)

## Workflow Loop
Default loop: Plan -> Understand -> Develop -> Optimize (PUDO).

## Token-Efficient Guidelines
- Keep responses concise and focused on code.
- Avoid dumping large files; reference file paths and line ranges.
- Prefer targeted greps over broad scans.

## Tech Stack Standards
${stackNotes}

## Quality Gates
- Always run the relevant test suite before completing a task.
- Enforce atomic Conventional Commits (feat, fix, docs, refactor, test).
- Check .pudo/session.md for active state handoff.
`,
      };

    case "gemini":
      return {
        filename: "GEMINI.md",
        language: "markdown",
        description: "Gemini CLI / Antigravity Agent Guidelines",
        setupPath: "Root directory of your repository",
        content: `# Gemini Agent Instructions (PUDO System)

## Methodology: Plan -> Understand -> Develop -> Optimize

- Plan before implementation; avoid jumping straight into large file edits.
- Inspect relevant codebase files before modifying.
- Do not invent APIs, file paths, env vars, or test results.
- Tech Stack Notes:
${stackNotes}

## Quality & Handoff
- Update .pudo/session.md for multi-session handoffs.
- Run available verification checks before declaring completion.
`,
      };

    case "codex":
    default:
      return {
        filename: "AGENTS.md",
        language: "markdown",
        description: "Codex & Universal Agent Operating Instructions",
        setupPath: "Root directory of your repository",
        content: `# Universal Agent Workflow (PUDO System)

Default loop: Plan -> Understand -> Develop -> Optimize (PUDO).

## Token-Efficient Defaults
- Keep responses concise by default.
- Avoid dumping large file contents; summarize and reference paths.
- Prefer targeted search and small file slices over broad scans.

## 1. Plan
- For non-trivial tasks, propose a short plan with scope, constraints, and success criteria.
- Ask before destructive, high-risk, or ambiguous changes.

## 2. Understand
- Read the relevant files before editing.
- Match existing patterns, conventions, and architecture.
- Stack Notes:
${stackNotes}

## 3. Develop
- Make small, reviewable patches.
- Add or update tests when the change is risky or user-facing.
- If the plan fails, stop and re-plan instead of forcing it.

## 4. Optimize
- Self-review for correctness, readability, and maintainability.
- Run the most relevant available checks, or explain why they were skipped.
- Summarize what changed and how it was verified.
`,
      };
  }
}

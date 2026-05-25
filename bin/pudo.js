#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const TOOL_NAMES = ["cursor", "claude", "codex", "copilot"];
const PROJECT_TYPES = [
  "generic",
  "nextjs",
  "react",
  "react-vite",
  "node",
  "node-express",
  "python",
  "python-fastapi",
  "django",
  "laravel",
  "go",
  "go-api",
  "react-native",
  "mobile-react-native"
];
const STRICTNESS = ["lite", "standard", "enterprise"];

function parseArgs(argv) {
  const args = {
    command: "init",
    yes: false,
    dryRun: false,
    force: false,
    tools: null,
    project: null,
    strictness: null,
    help: false
  };

  for (const arg of argv) {
    if (["init", "check", "score", "doctor"].includes(arg)) args.command = arg;
    else if (arg === "--help" || arg === "-h") args.help = true;
    else if (arg === "--yes" || arg === "-y") args.yes = true;
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--force") args.force = true;
    else if (arg.startsWith("--tools=")) args.tools = arg.slice("--tools=".length);
    else if (arg.startsWith("--project=")) args.project = arg.slice("--project=".length);
    else if (arg.startsWith("--strictness=")) args.strictness = arg.slice("--strictness=".length);
  }

  return args;
}

function help() {
  console.log(`pudo-code-system

Usage:
  pudo init
  pudo check
  pudo score
  pudo doctor
  pudo init --yes
  pudo init --tools=cursor,claude,codex,copilot --project=nextjs --strictness=standard

Options:
  --yes              Use defaults: all tools, generic project, standard strictness
  --tools=LIST       Comma-separated: cursor, claude, codex, copilot
  --project=TYPE     generic, nextjs, react-vite, node-express, python-fastapi, django, laravel, go-api, mobile-react-native
  --strictness=MODE  lite, standard, enterprise
  --dry-run          Show files that would be written
  --force            Overwrite existing files
`);
}

function question(rl, prompt) {
  return new Promise((resolve) => rl.question(prompt, resolve));
}

function normalizeList(value, allowed, fallback) {
  if (!value) return fallback;
  const items = value
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  const valid = items.filter((item) => allowed.includes(item));
  return valid.length ? Array.from(new Set(valid)) : fallback;
}

function normalizeChoice(value, allowed, fallback) {
  if (!value) return fallback;
  const normalized = value.trim().toLowerCase();
  return allowed.includes(normalized) ? normalized : fallback;
}

async function resolveOptions(args) {
  if (args.yes) {
    return {
      tools: normalizeList(args.tools, TOOL_NAMES, TOOL_NAMES),
      project: normalizeChoice(args.project, PROJECT_TYPES, "generic"),
      strictness: normalizeChoice(args.strictness, STRICTNESS, "standard")
    };
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const toolsAnswer = args.tools || await question(
      rl,
      "Which AI tools do you use? (cursor, claude, codex, copilot) [all]: "
    );
    const projectAnswer = args.project || await question(
      rl,
      "Project type? (generic, nextjs, react-vite, node-express, python-fastapi, django, laravel, go-api, mobile-react-native) [generic]: "
    );
    const strictnessAnswer = args.strictness || await question(
      rl,
      "Strictness? (lite, standard, enterprise) [standard]: "
    );

    return {
      tools: normalizeList(toolsAnswer || TOOL_NAMES.join(","), TOOL_NAMES, TOOL_NAMES),
      project: normalizeChoice(projectAnswer || "generic", PROJECT_TYPES, "generic"),
      strictness: normalizeChoice(strictnessAnswer || "standard", STRICTNESS, "standard")
    };
  } finally {
    rl.close();
  }
}

function stackNotes(project) {
  const notes = {
    nextjs: [
      "Check App Router vs Pages Router before editing.",
      "Verify server/client component boundaries.",
      "Avoid adding `use client` unless necessary.",
      "Check route handlers, middleware, env vars, and server actions."
    ],
    react: [
      "Identify the state management and routing patterns before editing.",
      "Preserve component boundaries and existing styling conventions.",
      "Cover loading, empty, error, and disabled states for UI changes."
    ],
    "react-vite": [
      "Identify the state management and routing patterns before editing.",
      "Preserve component boundaries and existing styling conventions.",
      "Cover loading, empty, error, and disabled states for UI changes.",
      "Verify Vite env var naming before adding config."
    ],
    node: [
      "Verify route, middleware, validation, and error-handling conventions.",
      "Keep request validation at trust boundaries.",
      "Avoid changing public API contracts without documenting impact."
    ],
    "node-express": [
      "Inspect route, middleware, validation, and error-handling conventions.",
      "Keep request validation at trust boundaries.",
      "Check auth and permission middleware before adding endpoints."
    ],
    python: [
      "Identify the package manager, test runner, and formatting conventions.",
      "Preserve type, lint, and import-order patterns.",
      "Keep behavior changes covered by targeted tests."
    ],
    "python-fastapi": [
      "Inspect routers, dependencies, schemas, and service boundaries before editing.",
      "Preserve Pydantic model conventions.",
      "Keep async/sync boundaries consistent."
    ],
    django: [
      "Inspect apps, models, migrations, views, serializers, forms, and permissions before editing.",
      "Treat migrations as release-risk changes.",
      "Check queryset performance and N+1 risks."
    ],
    laravel: [
      "Check routes, controllers, requests, policies, migrations, and jobs.",
      "Use existing validation and authorization patterns.",
      "Consider rollback for database changes."
    ],
    go: [
      "Run `go fmt` for touched Go files.",
      "Prefer existing package boundaries and error-handling patterns.",
      "Add table tests for behavior changes."
    ],
    "go-api": [
      "Run `go fmt` for touched Go files.",
      "Follow existing error-handling and context propagation patterns.",
      "Check concurrency and cancellation behavior for long-running work."
    ],
    "react-native": [
      "Inspect navigation, state management, platform-specific files, and styling conventions before editing.",
      "Check iOS and Android behavior for native or permission changes.",
      "Handle loading, empty, offline, permission denied, and retry states."
    ],
    "mobile-react-native": [
      "Inspect navigation, state management, platform-specific files, and styling conventions before editing.",
      "Check iOS and Android behavior for native or permission changes.",
      "Handle loading, empty, offline, permission denied, and retry states."
    ],
    generic: [
      "Inspect relevant files before editing.",
      "Follow existing conventions.",
      "Use the smallest safe patch."
    ]
  };

  return notes[project] || notes.generic;
}

function modeRules(strictness) {
  if (strictness === "lite") {
    return [
      "Use PUDO Lite: scope, relevant files, verification.",
      "Keep planning to one short statement.",
      "Run the cheapest relevant check."
    ];
  }

  if (strictness === "enterprise") {
    return [
      "Use PUDO Enterprise for risky work.",
      "Require owner/reviewer, rollback, monitoring, migration notes, and risk log.",
      "Use Release Gate before merge or deploy."
    ];
  }

  return [
    "Use PUDO Standard: Plan -> Understand -> Develop -> Optimize.",
    "Keep a focused task checklist for non-trivial work.",
    "Run targeted checks and summarize skipped checks."
  ];
}

function joinBullets(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function templates(options) {
  const config = {
    mode: options.strictness,
    projectType: options.project,
    tools: options.tools,
    qualityGates: true,
    tokenBudget: true,
    handoffFile: ".pudo/session.md"
  };

  const files = {
    ".pudo/config.json": `${JSON.stringify(config, null, 2)}\n`,
    ".pudo/session.md": `# PUDO Session Handoff

## Task

...

## Current Phase

Plan / Understand / Develop / Optimize / Release

## Mode

${options.strictness}

## Scope

...

## Files Inspected

- ...

## Decisions Made

- ...

## Tests Run

- ...

## Remaining Risks

- ...

## Next Action

...
`,
    ".pudo/checklists/release.md": `# PUDO Release Checklist

- [ ] Plan Gate passed or risk accepted.
- [ ] Understand Gate passed or risk accepted.
- [ ] Develop Gate passed or risk accepted.
- [ ] Optimize Gate passed or risk accepted.
- [ ] Tests/checks passed or failures explained.
- [ ] Rollback or recovery plan is clear.
- [ ] Monitoring/logging covers likely failure modes.
- [ ] Remaining risks are listed.
`
  };

  if (options.tools.includes("codex")) {
    files["AGENTS.md"] = `# Codex Workflow (PUDO)

Default loop: Plan -> Understand -> Develop -> Optimize.

## Mode

${joinBullets(modeRules(options.strictness))}

## Project Notes

${joinBullets(stackNotes(options.project))}

## Rules

- Read relevant files before editing.
- Keep patches small and scoped.
- Do not rewrite unrelated files.
- Do not add dependencies without justification.
- Run relevant checks or state why they were skipped.
- Use .pudo/session.md for handoff when context may be lost.
`;
  }

  if (options.tools.includes("claude")) {
    files["CLAUDE.md"] = `# Claude Code Instructions

Use PUDO as the operating workflow: Plan -> Understand -> Develop -> Optimize.

## Mode

${joinBullets(modeRules(options.strictness))}

## Project Notes

${joinBullets(stackNotes(options.project))}

## Required Behavior

- Inspect relevant files before editing.
- Keep changes scoped to the request.
- Do not invent APIs, paths, env vars, database fields, or test results.
- Run relevant checks or state why checks were skipped.
- Record handoff context in .pudo/session.md for long work.
`;
  }

  if (options.tools.includes("cursor")) {
    files[".cursor/rules/pudo-core.mdc"] = `---
description: Core PUDO rules for this project.
alwaysApply: true
---

# PUDO Core

Default loop: Plan -> Understand -> Develop -> Optimize.

## Mode

${joinBullets(modeRules(options.strictness))}

## Project Notes

${joinBullets(stackNotes(options.project))}

## Rules

- Inspect files before editing.
- Keep patches focused.
- Avoid unrelated rewrites.
- Do not invent APIs, paths, env vars, or test results.
- Run relevant checks or report skipped checks.
`;
  }

  if (options.tools.includes("copilot")) {
    files[".github/copilot-instructions.md"] = `# GitHub Copilot Instructions

Use PUDO for non-trivial work: Plan -> Understand -> Develop -> Optimize.

## Mode

${joinBullets(modeRules(options.strictness))}

## Project Notes

${joinBullets(stackNotes(options.project))}

## Rules

- Prefer small, reviewable diffs.
- Inspect relevant files before changing them.
- Follow existing conventions.
- Do not invent APIs, paths, env vars, config keys, or test results.
- Run targeted checks or state why they were skipped.
`;
  }

  files[".github/pull_request_template.md"] = `## PUDO Phase Summary

### Plan

- [ ] Scope is clear
- [ ] Success criteria are measurable
- [ ] Out-of-scope items are listed

### Understand

- [ ] Relevant files were inspected
- [ ] Existing patterns were followed
- [ ] APIs/dependencies were verified

### Develop

- [ ] Diff is focused
- [ ] Tests were added or updated when needed
- [ ] Edge cases were handled or deferred

### Optimize

- [ ] Self-review is done
- [ ] Docs were updated if needed
- [ ] Remaining risks are listed

### Verification

Commands run:

\`\`\`text

\`\`\`
`;

  return files;
}

function writeFiles(files, args) {
  const results = [];

  for (const [relativePath, content] of Object.entries(files)) {
    const target = path.resolve(process.cwd(), relativePath);
    const exists = fs.existsSync(target);

    if (args.dryRun) {
      results.push(`${exists ? "would-skip" : "would-create"} ${relativePath}`);
      continue;
    }

    if (exists && !args.force) {
      results.push(`skipped ${relativePath}`);
      continue;
    }

    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content, "utf8");
    results.push(`${exists ? "updated" : "created"} ${relativePath}`);
  }

  return results;
}

function exists(relativePath) {
  return fs.existsSync(path.resolve(process.cwd(), relativePath));
}

function readJson(relativePath) {
  try {
    return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), relativePath), "utf8"));
  } catch (_) {
    return null;
  }
}

function hasAny(paths) {
  return paths.some((relativePath) => exists(relativePath));
}

function evaluateProject() {
  const agentRulePaths = [
    "AGENTS.md",
    "CLAUDE.md",
    ".cursor/rules/pudo-core.mdc",
    ".github/copilot-instructions.md",
    "GEMINI.md"
  ];

  const checks = [
    {
      name: "PUDO config",
      pass: exists(".pudo/config.json"),
      fix: "Run `pudo init` or add `.pudo/config.json`."
    },
    {
      name: "Session handoff",
      pass: exists(".pudo/session.md"),
      fix: "Add `.pudo/session.md` for cross-agent handoff."
    },
    {
      name: "Release checklist",
      pass: exists(".pudo/checklists/release.md"),
      fix: "Add `.pudo/checklists/release.md`."
    },
    {
      name: "PR template",
      pass: exists(".github/pull_request_template.md"),
      fix: "Add `.github/pull_request_template.md`."
    },
    {
      name: "Agent rule file",
      pass: hasAny(agentRulePaths),
      fix: "Add at least one of AGENTS.md, CLAUDE.md, Cursor rules, Copilot instructions, or GEMINI.md."
    }
  ];

  return checks;
}

function runCheck() {
  const checks = evaluateProject();
  const failures = checks.filter((check) => !check.pass);

  console.log("PUDO check");
  for (const check of checks) {
    console.log(`- ${check.pass ? "PASS" : "FAIL"} ${check.name}`);
    if (!check.pass) console.log(`  fix: ${check.fix}`);
  }

  if (failures.length) {
    console.log(`Result: failed (${failures.length} missing requirement${failures.length === 1 ? "" : "s"})`);
    process.exitCode = 1;
  } else {
    console.log("Result: passed");
  }
}

function scoreCategory(name, earned, total, notes) {
  return { name, earned, total, notes };
}

function runScore() {
  const config = readJson(".pudo/config.json");
  const categories = [
    scoreCategory("Agent rules", hasAny(["AGENTS.md", "CLAUDE.md", ".cursor/rules/pudo-core.mdc", ".github/copilot-instructions.md"]) ? 25 : 0, 25, "repo-level agent configuration"),
    scoreCategory("Workflow", exists(".github/pull_request_template.md") && exists(".pudo/session.md") ? 25 : 10, 25, "PR template and session handoff"),
    scoreCategory("Quality gates", hasAny(["quality/quality-gates.md", ".pudo/checklists/release.md"]) ? 20 : 0, 20, "quality gates or release checklist"),
    scoreCategory("Token/context discipline", hasAny(["quality/token-budget.md", "docs/context-engineering.md"]) ? 15 : 0, 15, "token budget or context engineering guidance"),
    scoreCategory("Evidence", hasAny(["benchmarks/README.md", "benchmarks/results"]) ? 15 : 0, 15, "benchmark kit or measured results")
  ];

  const earned = categories.reduce((sum, item) => sum + item.earned, 0);
  const total = categories.reduce((sum, item) => sum + item.total, 0);
  const mode = config && config.mode ? config.mode : "unknown";

  console.log(`PUDO score: ${earned}/${total} (${Math.round((earned / total) * 100)}%)`);
  console.log(`Mode: ${mode}`);
  for (const category of categories) {
    console.log(`- ${category.name}: ${category.earned}/${category.total} (${category.notes})`);
  }
}

function hasTests() {
  const pkg = readJson("package.json");
  if (pkg && pkg.scripts && pkg.scripts.test) return true;

  return hasAny([
    "tests",
    "test",
    "__tests__",
    "src/__tests__",
    "pytest.ini",
    "vitest.config.ts",
    "jest.config.js",
    "go.mod"
  ]);
}

function runDoctor() {
  const findings = [];

  if (!hasTests()) {
    findings.push({
      severity: "WARN",
      issue: "No obvious test entrypoint found.",
      fix: "Add a test command, test directory, or document manual verification in the PR template."
    });
  }

  if (!exists(".pudo/checklists/release.md")) {
    findings.push({
      severity: "WARN",
      issue: "No release checklist found.",
      fix: "Add `.pudo/checklists/release.md` or run `pudo init`."
    });
  }

  if (!hasAny([".github/CODEOWNERS", "CODEOWNERS", "docs/owners.md"])) {
    findings.push({
      severity: "INFO",
      issue: "No owner file found.",
      fix: "Add CODEOWNERS or document owner approval in your PR process."
    });
  }

  if (!hasAny(["quality/anti-hallucination.md", "quality/ai-output-review.md"])) {
    findings.push({
      severity: "WARN",
      issue: "No AI-output review or anti-hallucination checklist found.",
      fix: "Add AI review rules for generated code and config."
    });
  }

  console.log("PUDO doctor");
  if (!findings.length) {
    console.log("- PASS no obvious workflow gaps found");
    return;
  }

  for (const finding of findings) {
    console.log(`- ${finding.severity} ${finding.issue}`);
    console.log(`  fix: ${finding.fix}`);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    help();
    return;
  }

  if (args.command === "check") {
    runCheck();
    return;
  }

  if (args.command === "score") {
    runScore();
    return;
  }

  if (args.command === "doctor") {
    runDoctor();
    return;
  }

  if (args.command !== "init") {
    help();
    return;
  }

  const options = await resolveOptions(args);
  const files = templates(options);
  const results = writeFiles(files, args);

  console.log(`PUDO init (${options.strictness}, ${options.project})`);
  for (const result of results) console.log(`- ${result}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

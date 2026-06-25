#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { lintPrompts } = require("./prompt-linter");

const TOOL_NAMES = ["cursor", "claude", "codex", "copilot", "gemini", "opencode", "kiro"];
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
    json: false,
    strict: false,
    help: false
  };

  for (const arg of argv) {
    if (["init", "check", "score", "doctor", "lint"].includes(arg)) args.command = arg;
    else if (arg === "--help" || arg === "-h") args.help = true;
    else if (arg === "--yes" || arg === "-y") args.yes = true;
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--force") args.force = true;
    else if (arg === "--json") args.json = true;
    else if (arg === "--strict") args.strict = true;
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
  pudo check --json
  pudo score
  pudo score --json
  pudo score --strict
  pudo doctor
  pudo doctor --json
  pudo lint
  pudo lint --json
  pudo init --yes
  pudo init --tools=cursor,claude,codex,copilot,gemini,opencode,kiro --project=nextjs --strictness=standard

Options:
  --yes              Use defaults: all tools, generic project, standard strictness
  --tools=LIST       Comma-separated: cursor, claude, codex, copilot, gemini, opencode, kiro
  --project=TYPE     generic, nextjs, react-vite, node-express, python-fastapi, django, laravel, go-api, mobile-react-native
  --strictness=MODE  lite, standard, enterprise
  --dry-run          Show files that would be written
  --force            Overwrite existing files
  --json             Emit machine-readable JSON for supported commands
  --strict           Exit non-zero when score is below 80
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
      `Which AI tools do you use? (${TOOL_NAMES.join(", ")}) [all]: `
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

## Assumptions

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

## Release & Package Quality

- Maintain npm package release-readiness and stability.
- Work on a dedicated feature branch.
- Stage and commit files individually using Conventional Commits.
- Determine SemVer using release/VERSIONING.md and update CHANGELOG.md.
`;
  }

  if (options.tools.includes("claude")) {
    files["CLAUDE.md"] = `# Claude Code Instructions

Use PUDO as the operating workflow: Plan -> Understand -> Develop -> Optimize.

## Mode

${joinBullets(modeRules(options.strictness))}

## Project Notes

${joinBullets(stackNotes(options.project))}

## Claude Fable 5

When using Claude Fable 5 (claude-fable-5), leverage its 1M context window:
- Include more files in context packs for large refactors (up to 25 files)
- Use extended session handoffs for long-running autonomous tasks
- Fable 5 can plan, execute, and refine over multi-hour runs
- Use .pudo/session.md for checkpoints across long work blocks

## Required Behavior

- Inspect relevant files before editing.
- Keep changes scoped to the request.
- Do not invent APIs, paths, env vars, database fields, or test results.
- Run relevant checks or state why checks were skipped.
- Record handoff context in .pudo/session.md for long work.

## Release & Package Quality

- Maintain npm package release-readiness and stability.
- Work on a dedicated feature branch.
- Stage and commit files individually using Conventional Commits.
- Determine SemVer using release/VERSIONING.md and update CHANGELOG.md.
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

## Release & Package Quality

- Maintain npm package release-readiness and stability.
- Work on a dedicated feature branch.
- Stage and commit files individually using Conventional Commits.
- Determine SemVer using release/VERSIONING.md and update CHANGELOG.md.
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

## Release & Package Quality

- Maintain npm package release-readiness and stability.
- Work on a dedicated feature branch.
- Stage and commit files individually using Conventional Commits.
- Determine SemVer using release/VERSIONING.md and update CHANGELOG.md.
`;
  }

  if (options.tools.includes("gemini")) {
    files["GEMINI.md"] = `# Gemini Agent Instructions

Use PUDO as the operating workflow: Plan -> Understand -> Develop -> Optimize.

## Mode

${joinBullets(modeRules(options.strictness))}

## Project Notes

${joinBullets(stackNotes(options.project))}

## Rules

- Inspect relevant files before editing.
- Keep patches small and scoped.
- Do not invent APIs, paths, env vars, config keys, or test results.
- Run relevant checks or state why checks were skipped.
- Use .pudo/session.md for handoff when context may be lost.

## Release & Package Quality

- Maintain npm package release-readiness and stability.
- Work on a dedicated feature branch.
- Stage and commit files individually using Conventional Commits.
- Determine SemVer using release/VERSIONING.md and update CHANGELOG.md.
`;
  }

  if (options.tools.includes("opencode")) {
    files["opencode/opencode.md"] = `# OpenCode Instructions

Use PUDO for coding tasks: Plan -> Understand -> Develop -> Optimize.

## Mode

${joinBullets(modeRules(options.strictness))}

## Project Notes

${joinBullets(stackNotes(options.project))}

## Rules

- Read relevant files before implementation.
- Keep diffs focused and reviewable.
- Avoid unrelated rewrites and dependency bloat.
- Do not claim checks passed unless they were run.
- Record long-running task context in .pudo/session.md.

## Release & Package Quality

- Maintain npm package release-readiness and stability.
- Work on a dedicated feature branch.
- Stage and commit files individually using Conventional Commits.
- Determine SemVer using release/VERSIONING.md and update CHANGELOG.md.
`;
  }

  if (options.tools.includes("kiro")) {
    files["kiro/system-prompt.md"] = `# Kiro System Prompt

Follow PUDO as the default development loop: Plan -> Understand -> Develop -> Optimize.

## Mode

${joinBullets(modeRules(options.strictness))}

## Project Notes

${joinBullets(stackNotes(options.project))}

## Rules

- Clarify scope, success criteria, and constraints before coding.
- Inspect existing files, APIs, and conventions before editing.
- Keep changes scoped to the task.
- Include tests or verification notes for risky changes.
- Surface release, rollback, migration, and monitoring risks when relevant.

## Release & Package Quality

- Maintain npm package release-readiness and stability.
- Work on a dedicated feature branch.
- Stage and commit files individually using Conventional Commits.
- Determine SemVer using release/VERSIONING.md and update CHANGELOG.md.
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

function readText(relativePath) {
  try {
    return fs.readFileSync(path.resolve(process.cwd(), relativePath), "utf8");
  } catch (_) {
    return "";
  }
}

function hasAny(paths) {
  return paths.some((relativePath) => exists(relativePath));
}

function readExisting(paths) {
  return paths
    .filter((relativePath) => exists(relativePath))
    .map((relativePath) => ({
      path: relativePath,
      content: readText(relativePath)
    }));
}

function containsAny(text, patterns) {
  const normalized = text.toLowerCase();
  return patterns.some((pattern) => normalized.includes(pattern.toLowerCase()));
}

function rubricCategory(name, maxScore, checks) {
  const score = checks.reduce((sum, check) => sum + (check.pass ? check.points : 0), 0);

  return {
    name,
    score,
    max_score: maxScore,
    evidence: checks.filter((check) => check.pass).map((check) => check.evidence),
    missing: checks.filter((check) => !check.pass).map((check) => check.missing)
  };
}

function evaluateProject() {
  const agentRulePaths = [
    "AGENTS.md",
    "CLAUDE.md",
    ".cursor/rules/pudo-core.mdc",
    ".github/copilot-instructions.md",
    "GEMINI.md",
    "opencode/opencode.md",
    "kiro/system-prompt.md"
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
      fix: "Add at least one of AGENTS.md, CLAUDE.md, .cursor/rules/pudo-core.mdc, .github/copilot-instructions.md, GEMINI.md, opencode/opencode.md, or kiro/system-prompt.md."
    }
  ];

  return checks;
}

function runCheck(options = {}) {
  const checks = evaluateProject();
  const failures = checks.filter((check) => !check.pass);

  if (options.json) {
    const report = {
      schema_version: "1.0",
      pudo_version: "1.3.0",
      command: "check",
      passed: failures.length === 0,
      total: checks.length,
      failed: failures.length,
      checks: checks.map((check) => ({
        name: check.name,
        passed: check.pass,
        fix: check.fix
      }))
    };
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log("PUDO check");
    for (const check of checks) {
      console.log(`- ${check.pass ? "PASS" : "FAIL"} ${check.name}`);
      if (!check.pass) console.log(`  fix: ${check.fix}`);
    }
    if (failures.length) {
      console.log(`Result: failed (${failures.length} missing requirement${failures.length === 1 ? "" : "s"})`);
    } else {
      console.log("Result: passed");
    }
  }

  if (failures.length) process.exitCode = 1;
}

function evaluateScore() {
  const config = readJson(".pudo/config.json");
  const agentRulePaths = [
    "AGENTS.md",
    "CLAUDE.md",
    ".cursor/rules/pudo-core.mdc",
    ".github/copilot-instructions.md",
    "GEMINI.md",
    "opencode/opencode.md",
    "kiro/system-prompt.md"
  ];
  const agentRules = readExisting(agentRulePaths);
  const agentText = agentRules.map((file) => file.content).join("\n");
  const sessionText = readText(".pudo/session.md");
  const prText = readText(".github/pull_request_template.md");
  const releaseText = [
    readText(".pudo/checklists/release.md"),
    readText("quality/quality-gates.md")
  ].join("\n");
  const safetyText = [
    readText("quality/anti-hallucination.md"),
    readText("quality/ai-output-review.md"),
    readText("quality/agent-tool-security.md"),
    readText("quality/mcp-security-checklist.md"),
    readText("templates/mcp/pudo-server-policy.json"),
    readText(".claude/settings.json")
  ].join("\n");

  const categories = {
    agent_rules: rubricCategory("Agent rules", 25, [
      {
        pass: agentRules.length > 0,
        points: 5,
        evidence: `${agentRules.length} agent instruction file(s) detected`,
        missing: "Add at least one supported agent instruction file"
      },
      {
        pass: containsAny(agentText, ["scope", "out of scope", "constraints"]),
        points: 5,
        evidence: "Agent instructions define scope or constraints",
        missing: "Define scope, constraints, or out-of-scope behavior"
      },
      {
        pass: containsAny(agentText, ["relevant files", "inspect", "read relevant"]),
        points: 5,
        evidence: "Agent instructions require repository inspection",
        missing: "Require relevant file inspection before editing"
      },
      {
        pass: containsAny(agentText, ["run relevant checks", "verification", "tests", "test"]),
        points: 5,
        evidence: "Agent instructions include verification expectations",
        missing: "Add explicit test or verification commands"
      },
      {
        pass: containsAny(agentText, ["do not invent", "secret", "unrelated", "approval"]),
        points: 5,
        evidence: "Agent instructions include safety boundaries",
        missing: "Add anti-hallucination, secret, or approval boundaries"
      }
    ]),
    context_quality: rubricCategory("Context quality", 20, [
      {
        pass: exists(".pudo/session.md"),
        points: 4,
        evidence: "Session handoff file exists",
        missing: "Add .pudo/session.md"
      },
      {
        pass: containsAny(sessionText, ["files inspected", "relevant files"]),
        points: 4,
        evidence: "Handoff records inspected files",
        missing: "Record relevant or inspected files in the handoff"
      },
      {
        pass: containsAny(sessionText, ["decisions made", "verified facts", "evidence"]),
        points: 4,
        evidence: "Handoff records decisions or verified evidence",
        missing: "Record decisions and verified facts"
      },
      {
        pass: containsAny(sessionText, ["assumptions"]),
        points: 4,
        evidence: "Handoff has an assumptions section",
        missing: "Mark assumptions explicitly"
      },
      {
        pass: containsAny(sessionText, ["remaining risks", "next action"]),
        points: 4,
        evidence: "Handoff tracks risks and next action",
        missing: "Track remaining risks and next action"
      }
    ]),
    workflow: rubricCategory("Workflow and quality gates", 20, [
      {
        pass: exists(".github/pull_request_template.md"),
        points: 4,
        evidence: "PR template exists",
        missing: "Add .github/pull_request_template.md"
      },
      {
        pass: containsAny(prText, ["commands run", "verification"]),
        points: 4,
        evidence: "PR template requests verification evidence",
        missing: "Ask for commands run or verification evidence in the PR template"
      },
      {
        pass: containsAny(releaseText, ["rollback", "recovery"]),
        points: 4,
        evidence: "Release gate covers rollback or recovery",
        missing: "Add rollback or recovery requirements"
      },
      {
        pass: containsAny(releaseText, ["monitoring", "logging"]),
        points: 4,
        evidence: "Release gate covers monitoring or logging",
        missing: "Add monitoring or logging requirements"
      },
      {
        pass: hasAny([".github/CODEOWNERS", "CODEOWNERS", "docs/owners.md"]) ||
          containsAny(releaseText, ["owner approval", "approved owner"]),
        points: 4,
        evidence: "Ownership or owner approval is defined",
        missing: "Add CODEOWNERS or an explicit owner approval gate"
      }
    ]),
    ai_safety: rubricCategory("AI and MCP safety", 20, [
      {
        pass: hasAny(["quality/anti-hallucination.md", "quality/ai-output-review.md"]),
        points: 5,
        evidence: "Anti-hallucination or AI-output review policy exists",
        missing: "Add an AI-output review or anti-hallucination policy"
      },
      {
        pass: containsAny(safetyText, ["secret", ".env", "redaction"]),
        points: 5,
        evidence: "Secret handling or redaction policy exists",
        missing: "Define secret handling and redaction"
      },
      {
        pass: containsAny(safetyText, ["allowlist", "denylist", "read-only", "readonly", "approval"]),
        points: 5,
        evidence: "Tool permission and approval boundaries exist",
        missing: "Define MCP tool allowlists, permissions, and approval mode"
      },
      {
        pass: containsAny(safetyText, ["prompt injection", "tool poisoning", "supply chain"]),
        points: 5,
        evidence: "Prompt-injection or MCP supply-chain review exists",
        missing: "Add prompt-injection and MCP supply-chain review"
      }
    ]),
    evidence: rubricCategory("Operational evidence", 15, [
      {
        pass: hasTests(),
        points: 5,
        evidence: "Test entrypoint detected",
        missing: "Add a runnable test entrypoint"
      },
      {
        pass: hasAny([".github/workflows/pudo-check.yml", ".github/workflows/ci.yml"]),
        points: 4,
        evidence: "CI workflow detected",
        missing: "Add CI that runs tests and PUDO checks"
      },
      {
        pass: exists("benchmarks/results") &&
          hasAny(["benchmarks/results/stripe-webhook-2026-05/metrics.csv"]),
        points: 3,
        evidence: "Measured benchmark result detected",
        missing: "Add at least one measured benchmark result"
      },
      {
        pass: exists("CHANGELOG.md"),
        points: 3,
        evidence: "Changelog exists",
        missing: "Add CHANGELOG.md"
      }
    ])
  };

  const score = Object.values(categories).reduce((sum, category) => sum + category.score, 0);
  const maxScore = Object.values(categories).reduce((sum, category) => sum + category.max_score, 0);
  const mode = config && config.mode ? config.mode : "unknown";

  return {
    schema_version: "1.0",
    pudo_version: "1.3.0",
    mode,
    score,
    max_score: maxScore,
    percentage: Math.round((score / maxScore) * 100),
    status: score >= 80 ? "ready" : score >= 60 ? "needs_improvement" : "high_risk",
    categories
  };
}

function runScore(options = {}) {
  const report = evaluateScore();

  if (options.json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(`PUDO score: ${report.score}/${report.max_score} (${report.percentage}%)`);
    console.log(`Status: ${report.status}`);
    console.log(`Mode: ${report.mode}`);
    for (const category of Object.values(report.categories)) {
      console.log(`- ${category.name}: ${category.score}/${category.max_score}`);
      for (const missing of category.missing) console.log(`  missing: ${missing}`);
    }
  }

  if (options.strict && report.score < 80) process.exitCode = 1;

  return report;
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

function evaluateDoctor() {
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

  if (!hasAny(["quality/agent-tool-security.md", "quality/mcp-security-checklist.md"])) {
    findings.push({
      severity: "WARN",
      issue: "No agent tool or MCP security policy found.",
      fix: "Add agent tool permissions, approval, secret, and prompt-injection controls."
    });
  }

  return findings;
}

function runDoctor(options = {}) {
  const findings = evaluateDoctor();

  if (options.json) {
    const report = {
      schema_version: "1.0",
      pudo_version: "1.3.0",
      command: "doctor",
      healthy: !findings.some((f) => f.severity === "WARN"),
      total_findings: findings.length,
      findings: findings.map((f) => ({
        severity: f.severity,
        issue: f.issue,
        fix: f.fix
      }))
    };
    console.log(JSON.stringify(report, null, 2));
  } else {
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
}

function runLint(options = {}) {
  const promptsDir = path.resolve(process.cwd(), "prompts");
  const report = lintPrompts(promptsDir);

  if (options.json) {
    const output = {
      schema_version: "1.0",
      pudo_version: "1.3.0",
      command: "lint",
      ...report
    };
    console.log(JSON.stringify(output, null, 2));
  } else {
    console.log("PUDO prompt lint");
    console.log(`- Files checked: ${report.total_files}`);
    console.log(`- Errors: ${report.total_errors}`);
    console.log(`- Warnings: ${report.total_warnings}`);

    for (const result of report.results) {
      if (!result.passed || result.warnings > 0) {
        console.log(`\n${result.file}:`);
        for (const issue of result.issues) {
          console.log(`  - ${issue.severity}: ${issue.message}`);
        }
      }
    }

    if (report.passed) {
      console.log("\nResult: passed");
    } else {
      console.log(`\nResult: failed (${report.total_errors} error${report.total_errors === 1 ? "" : "s"})`);
    }
  }

  if (!report.passed) process.exitCode = 1;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    help();
    return;
  }

  if (args.command === "check") {
    runCheck(args);
    return;
  }

  if (args.command === "score") {
    runScore(args);
    return;
  }

  if (args.command === "doctor") {
    runDoctor(args);
    return;
  }

  if (args.command === "lint") {
    runLint(args);
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

if (require.main === module) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}

module.exports = {
  TOOL_NAMES,
  PROJECT_TYPES,
  STRICTNESS,
  parseArgs,
  normalizeList,
  normalizeChoice,
  resolveOptions,
  templates,
  writeFiles,
  evaluateProject,
  evaluateScore,
  evaluateDoctor,
  runCheck,
  runScore,
  runDoctor,
  runLint,
  lintPrompts: require("./prompt-linter").lintPrompts,
  main
};

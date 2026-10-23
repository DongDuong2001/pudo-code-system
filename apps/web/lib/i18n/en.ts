const en = {
  meta: {
    title: "PUDO Code System — Operating Layer for AI Coding Agents",
    description:
      "Standardize coding workflows across Claude, Cursor, Windsurf, Roo, and Codex. Enforce quality gates, context handoffs, and 100-point repository readiness.",
    docsTitle: "Documentation — PUDO Code System",
    docsDescription:
      "Operational guides for AI agent orchestration, MCP server configuration, and resilient cloud architectures.",
    articleSuffix: "PUDO Documentation",
  },
  nav: {
    workflow: "Workflow",
    generator: "Rule Generator",
    mcp: "MCP Protocol",
    calculator: "Readiness Rubric",
    docs: "Docs & Playbooks",
    copyTitle: "Click to copy quickstart command",
    github: "GitHub Repository",
    exploreDocs: "Explore Docs",
    language: "Language",
  },
  hero: {
    release: "Release v1.4.0",
    announcement: "Interactive MCP Prompts & Multi-Agent Mesh",
    titleLead: "The Operating Layer for",
    titleAccent: "AI Coding Agents",
    subtitle:
      "Standardize coding workflows across Claude, Cursor, Windsurf, Roo, and Codex. Enforce architectural invariants, context handoffs, and evidence-based repository readiness.",
    ctaGenerate: "Generate Agent Rules",
    ctaMcp: "Setup MCP Server",
    ctaPlaybooks: "Read Playbooks",
    copyTitle: "Copy active command",
    copyCommand: "Copy Command",
  },
  workflow: {
    eyebrow: "Disciplined Agent Protocol",
    title: "The PUDO Workflow Loop",
    intro:
      "Autonomous agents drift when left unconstrained. PUDO anchors every AI action inside a verifiable 4-phase loop: Plan, Understand, Develop, and Optimize.",
    phase: "Phase",
    rulesHeading: "Enforced Rules & Constraints",
    outputLabel: "Real-world Agent Output",
    compliant: "PUDO Compliant",
    phases: {
      plan: {
        name: "Plan",
        tagline: "Before writing any code, define boundaries.",
        summary:
          "Prevents agents from leaping into destructive rewrites. Requires clear scope, acceptance criteria, test strategies, and explicit human consent for risky operations.",
        rules: [
          "Define exact files to touch before opening edits",
          "Declare out-of-scope items to prevent scope creep",
          "Explicit user sign-off required for destructive migrations",
          "Identify preconditions and regression risks upfront",
        ],
        gate: "Gate: Plan artifact or PR summary checklist approved.",
      },
      understand: {
        name: "Understand",
        tagline: "Inspect reality before assuming conventions.",
        summary:
          "Forces agents to read existing files and respect architectural invariants instead of hallucinating packages, imaginary APIs, or unaligned styling patterns.",
        rules: [
          "Read relevant implementation files before generating diffs",
          "Match existing patterns, frameworks, and directory structure",
          "No invented APIs, fictional flags, or phantom dependencies",
          "Preserve existing comments and license documentation",
        ],
        gate: "Gate: Zero hallucinated endpoints or uninspected paths.",
      },
      develop: {
        name: "Develop",
        tagline: "Make small, focused, reviewable patches.",
        summary:
          "Restricts the agent to atomic modifications accompanied by tests. If a plan fails or tests fail, stop and re-plan rather than applying messy band-aids.",
        rules: [
          "Atomic, reviewable diffs rather than entire file replacements",
          "Always add or update tests alongside functional changes",
          "Stop and re-plan if implementation encounters unexpected blockers",
          "Stage files individually with Conventional Commits",
        ],
        gate: "Gate: Passing unit and integration tests for every patch.",
      },
      optimize: {
        name: "Optimize",
        tagline: "Quality gates, self-review, and handoff continuity.",
        summary:
          "Final verification loop before code reaches main branches. Enforces linter passes, performance checks, and handoff state in .pudo/session.md.",
        rules: [
          "Self-review for memory leaks, edge cases, and performance",
          "Run repository quality gates (`npm test`, `npm run check`)",
          "Record multi-agent session handoff state in `.pudo/session.md`",
          "Verify 100/100 readiness score before release candidate tagging",
        ],
        gate: "Gate: Automated quality gate script exits with code 0.",
      },
    },
  },
  generator: {
    eyebrow: "Interactive Rule Generator",
    title: "Configure Agent Rules for Your Stack",
    intro:
      "Select your technology stack and target AI coding editor. Copy the generated rule file or download it directly into your repository root.",
    toolLabel: "1. Target AI Coding Tool",
    stackLabel: "2. Project Stack",
    modeLabel: "3. Enforcement Mode",
    standard: "Standard",
    standardDesc: "PUDO workflow + safety gates",
    strict: "Strict",
    strictDesc: "Mandatory approval on migrations & commands",
    cliLabel: "One-Liner CLI Equivalent",
    copy: "Copy",
    copied: "Copied!",
    copyCode: "Copy Code",
    downloadTitle: "Download file directly",
    download: "Download",
    ready: "Ready to save",
    frameworks: {
      next: "React Server Components, App Router",
      react: "SPA, client state, hooks",
      fastapi: "Async Python, Pydantic v2",
      django: "Python, ORM, fat models",
      go: "cmd/, internal/, standard layout",
      rust: "Cargo, zero-cost, clippy checks",
      bun: "High-speed runtime, bun:test",
    },
  },
  mcp: {
    eyebrow: "Model Context Protocol",
    title: "Plug PUDO Directly into Your AI Agent",
    intro:
      "Give Claude Desktop, Cursor, and Windsurf access to your repository's architectural invariants, playbook catalog, quality gate runners, and live context handoffs.",
    copied: "Copied",
    copyConfig: "Copy Config",
    target: "Target",
    npmPackage: "npm package",
    stdioTitle: "Stdio CLI / Custom Agent",
    stdioFile: "Process Execution",
    stdioPath: "Direct standard I/O communication pipe",
    promptsTitle: "Interactive MCP Prompts",
    promptsIntro: "Slash commands in Claude or Cursor that guide developers through standardized workflows:",
    promptInit: "Interactive project rule setup",
    promptPlan: "Formulate scope & test strategies",
    promptOptimize: "Run quality gate checklists",
    resourcesTitle: "MCP Protocol Resources",
    resourcesIntro: "Live context feeds for LLMs without flooding system prompt token limits:",
    resourceRules: "Active repo rule file",
    resourceSession: "Active session state",
    resourcePlaybooks: "Built-in playbooks",
  },
  score: {
    eyebrow: "Interactive Audit",
    title: "100-Point Repository Readiness Rubric",
    intro:
      "PUDO evaluates repositories against an evidence-based rubric. Toggle the criteria below to simulate your repository readiness score.",
    reset: "Reset to 100/100",
    pts: "pts",
    auditStatus: "Audit Status",
    ready: "READY",
    caution: "CAUTION",
    blocked: "BLOCKED",
    readyDesc: "Repository is fully hardened for autonomous coding agents.",
    cautionDesc: "Safe for copilots, but requires additional quality gates.",
    blockedDesc: "High risk of hallucination or unconstrained agent changes.",
    categories: {
      rules: {
        name: "Agent Rules & Invariants",
        short: "Rules",
        description: "Explicit instruction files guiding agent boundaries and decision making.",
      },
      context: {
        name: "Context Quality & State",
        short: "Context",
        description: "Repository configurations, architectural invariants, and multi-agent handoffs.",
      },
      workflow: {
        name: "Workflow & Quality Gates",
        short: "Workflow",
        description: "Automated linting, test suites, and pull request verification gates.",
      },
      safety: {
        name: "AI & MCP Protocol Safety",
        short: "Safety",
        description: "Dry-run protections, sensitive file exclusions, and permission controls.",
      },
      evidence: {
        name: "Operational Evidence",
        short: "Evidence",
        description: "Test execution telemetry, reproducible builds, and atomic git history.",
      },
    },
    items: {
      "rules-file": {
        title: "Primary Agent Ruleset Exists",
        description: "Repository contains AGENTS.md, .cursorrules, .windsurfrules, or CLAUDE.md.",
      },
      "rules-workflow": {
        title: "PUDO Loop Defined",
        description: "Rules file explicitly outlines Plan -> Understand -> Develop -> Optimize cycle.",
      },
      "rules-boundaries": {
        title: "Explicit Risk & Scope Boundaries",
        description: "Clear instructions against destructive migrations or hallucinated APIs.",
      },
      "rules-stack": {
        title: "Tech Stack Invariants Documented",
        description: "Framework guidelines (e.g. Server Components, Pydantic schemas) provided.",
      },
      "context-config": {
        title: "PUDO Configuration Present",
        description: "Valid .pudo/config.json with project metadata and strictness level.",
      },
      "context-session": {
        title: "Session Handoff File Exists",
        description: ".pudo/session.md maintains continuity across agent context windows.",
      },
      "context-arch": {
        title: "Architecture & Schema Standards",
        description: "Clear repository layout guidelines prevents architectural drift.",
      },
      "workflow-gates": {
        title: "Automated Verification Gates",
        description: "Executable scripts (npm test, npm run check) enforced on commits.",
      },
      "workflow-pr": {
        title: "PUDO Pull Request Template",
        description: ".github/pull_request_template.md enforces plan and test disclosures.",
      },
      "workflow-release": {
        title: "Release & Checklist Protocols",
        description: "Documented release checklists and SemVer bump procedures.",
      },
      "safety-sensitive": {
        title: "Sensitive Path Exclusion",
        description: ".env, secrets, and credentials excluded from AI context packs.",
      },
      "safety-dryrun": {
        title: "Dry-Run & Write Approval",
        description: "AI tools default to dry-run previews before writing to disk.",
      },
      "safety-hallucination": {
        title: "Anti-Hallucination Constraints",
        description: "Agents instructed to fail-fast rather than invent hypothetical APIs.",
      },
      "evidence-tests": {
        title: "Passing Test Suite Telemetry",
        description: "All unit and integration tests execute green with zero regressions.",
      },
      "evidence-git": {
        title: "Conventional Commit Discipline",
        description: "Clean git history with atomic, reviewable conventional commits.",
      },
    },
  },
  playbooks: {
    eyebrow: "Engineering Playbooks",
    title: "Architectural Standards for AI & Cloud",
    intro:
      "Real-world blueprints for building resilient LLM systems, coordinating multi-agent loops, and structuring distributed databases.",
    viewAll: "View All Playbooks",
    readGuide: "Read Guide",
  },
  footer: {
    about:
      "An open-source operating layer for AI coding agents. Enforces the PUDO methodology (Plan, Understand, Develop, Optimize), evidence-based repository readiness, and Model Context Protocol integrations.",
    toolsHeading: "Developer Tools",
    toolWorkflow: "PUDO Methodology Loop",
    toolGenerator: "Interactive Rule Generator",
    toolMcp: "Model Context Protocol Hub",
    toolRubric: "100-Point Readiness Rubric",
    docsHeading: "Playbooks & Docs",
    docQuickstart: "Quickstart Guide",
    docLlm: "LLM App Architecture",
    docAgents: "Multi-Agent Orchestration",
    docDatabase: "Database Design & Indexing",
    license: "MIT License © 2026 Dong Duong (DongDuong2001). Built for high-discipline AI engineering.",
    hosted: "Hosted on Vercel",
    tracking: "Zero Tracking",
  },
  docs: {
    sidebar: "Documentation",
    eyebrow: "Documentation & Playbooks",
    title: "PUDO Knowledge Hub",
    intro:
      "Comprehensive operational guides for AI agent orchestration, MCP server configuration, and resilient cloud architectures.",
    searchPlaceholder: "Search guides, playbooks, tags (e.g., RAG, MCP, PostgreSQL, Multi-Agent)...",
    read: "Read",
    noResults: "No articles matched your search query.",
    noResultsHint: 'Try searching for "RAG", "MCP", or "Index".',
    breadcrumb: "Docs",
    codeLabel: "PUDO standard",
    previous: "Previous",
    next: "Next",
    minRead: "min read",
    englishOnly: "This article is available in English only.",
    categories: {
      "Getting Started": "Getting Started",
      "AI Engineering": "AI Engineering",
      "DevOS System Architecture": "DevOS System Architecture",
    },
  },
};

export default en;
export type Dictionary = typeof en;

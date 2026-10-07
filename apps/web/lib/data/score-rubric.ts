export interface RubricItem {
  id: string;
  category: "rules" | "context" | "workflow" | "safety" | "evidence";
  title: string;
  points: number;
  description: string;
  defaultChecked: boolean;
}

export interface RubricCategory {
  id: "rules" | "context" | "workflow" | "safety" | "evidence";
  name: string;
  maxPoints: number;
  description: string;
}

export const RUBRIC_CATEGORIES: RubricCategory[] = [
  {
    id: "rules",
    name: "Agent Rules & Invariants",
    maxPoints: 25,
    description: "Explicit instruction files guiding agent boundaries and decision making.",
  },
  {
    id: "context",
    name: "Context Quality & State",
    maxPoints: 20,
    description: "Repository configurations, architectural invariants, and multi-agent handoffs.",
  },
  {
    id: "workflow",
    name: "Workflow & Quality Gates",
    maxPoints: 20,
    description: "Automated linting, test suites, and pull request verification gates.",
  },
  {
    id: "safety",
    name: "AI & MCP Protocol Safety",
    maxPoints: 20,
    description: "Dry-run protections, sensitive file exclusions, and permission controls.",
  },
  {
    id: "evidence",
    name: "Operational Evidence",
    maxPoints: 15,
    description: "Test execution telemetry, reproducible builds, and atomic git history.",
  },
];

export const RUBRIC_ITEMS: RubricItem[] = [
  // Rules (25 pts)
  {
    id: "rules-file",
    category: "rules",
    title: "Primary Agent Ruleset Exists",
    points: 10,
    description: "Repository contains AGENTS.md, .cursorrules, .windsurfrules, or CLAUDE.md.",
    defaultChecked: true,
  },
  {
    id: "rules-workflow",
    category: "rules",
    title: "PUDO Loop Defined",
    points: 5,
    description: "Rules file explicitly outlines Plan -> Understand -> Develop -> Optimize cycle.",
    defaultChecked: true,
  },
  {
    id: "rules-boundaries",
    category: "rules",
    title: "Explicit Risk & Scope Boundaries",
    points: 5,
    description: "Clear instructions against destructive migrations or hallucinated APIs.",
    defaultChecked: true,
  },
  {
    id: "rules-stack",
    category: "rules",
    title: "Tech Stack Invariants Documented",
    points: 5,
    description: "Framework guidelines (e.g. Server Components, Pydantic schemas) provided.",
    defaultChecked: true,
  },

  // Context (20 pts)
  {
    id: "context-config",
    category: "context",
    title: "PUDO Configuration Present",
    points: 10,
    description: "Valid .pudo/config.json with project metadata and strictness level.",
    defaultChecked: true,
  },
  {
    id: "context-session",
    category: "context",
    title: "Session Handoff File Exists",
    points: 5,
    description: ".pudo/session.md maintains continuity across agent context windows.",
    defaultChecked: true,
  },
  {
    id: "context-arch",
    category: "context",
    title: "Architecture & Schema Standards",
    points: 5,
    description: "Clear repository layout guidelines prevents architectural drift.",
    defaultChecked: true,
  },

  // Workflow (20 pts)
  {
    id: "workflow-gates",
    category: "workflow",
    title: "Automated Verification Gates",
    points: 10,
    description: "Executable scripts (npm test, npm run check) enforced on commits.",
    defaultChecked: true,
  },
  {
    id: "workflow-pr",
    category: "workflow",
    title: "PUDO Pull Request Template",
    points: 5,
    description: ".github/pull_request_template.md enforces plan and test disclosures.",
    defaultChecked: true,
  },
  {
    id: "workflow-release",
    category: "workflow",
    title: "Release & Checklist Protocols",
    points: 5,
    description: "Documented release checklists and SemVer bump procedures.",
    defaultChecked: true,
  },

  // Safety (20 pts)
  {
    id: "safety-sensitive",
    category: "safety",
    title: "Sensitive Path Exclusion",
    points: 10,
    description: ".env, secrets, and credentials excluded from AI context packs.",
    defaultChecked: true,
  },
  {
    id: "safety-dryrun",
    category: "safety",
    title: "Dry-Run & Write Approval",
    points: 5,
    description: "AI tools default to dry-run previews before writing to disk.",
    defaultChecked: true,
  },
  {
    id: "safety-hallucination",
    category: "safety",
    title: "Anti-Hallucination Constraints",
    points: 5,
    description: "Agents instructed to fail-fast rather than invent hypothetical APIs.",
    defaultChecked: true,
  },

  // Evidence (15 pts)
  {
    id: "evidence-tests",
    category: "evidence",
    title: "Passing Test Suite Telemetry",
    points: 10,
    description: "All unit and integration tests execute green with zero regressions.",
    defaultChecked: true,
  },
  {
    id: "evidence-git",
    category: "evidence",
    title: "Conventional Commit Discipline",
    points: 5,
    description: "Clean git history with atomic, reviewable conventional commits.",
    defaultChecked: true,
  },
];

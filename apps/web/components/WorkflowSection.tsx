"use client";

import { useState } from "react";
import { CheckCircle2, ShieldAlert, FileCode2, ArrowRight, Lightbulb, Compass, Code2, Gauge } from "lucide-react";

type PhaseKey = "plan" | "understand" | "develop" | "optimize";

interface PhaseDetail {
  letter: string;
  name: string;
  tagline: string;
  icon: typeof Compass;
  summary: string;
  rules: string[];
  snippet: string;
  gate: string;
}

const PHASES: Record<PhaseKey, PhaseDetail> = {
  plan: {
    letter: "P",
    name: "Plan",
    tagline: "Before writing any code, define boundaries.",
    icon: Compass,
    summary:
      "Prevents agents from leaping into destructive rewrites. Requires clear scope, acceptance criteria, test strategies, and explicit human consent for risky operations.",
    rules: [
      "Define exact files to touch before opening edits",
      "Declare out-of-scope items to prevent scope creep",
      "Explicit user sign-off required for destructive migrations",
      "Identify preconditions and regression risks upfront",
    ],
    snippet: `### Plan
- Scope: Implement hybrid search re-ranker in \`lib/rag/rerank.ts\`.
- Risks: Latency overhead; fall back to BM25 if API times out.
- Verification: Add unit test in \`tests/rerank.test.ts\` verifying top-K ordering.`,
    gate: "Gate: Plan artifact or PR summary checklist approved.",
  },
  understand: {
    letter: "U",
    name: "Understand",
    tagline: "Inspect reality before assuming conventions.",
    icon: Lightbulb,
    summary:
      "Forces agents to read existing files and respect architectural invariants instead of hallucinating packages, imaginary APIs, or unaligned styling patterns.",
    rules: [
      "Read relevant implementation files before generating diffs",
      "Match existing patterns, frameworks, and directory structure",
      "No invented APIs, fictional flags, or phantom dependencies",
      "Preserve existing comments and license documentation",
    ],
    snippet: `### Understand
- Inspected: \`src/core/retrieval.ts\` and \`packages/schemas/config.json\`.
- Invariant: Using Zod 3.25 for schema parsing.
- Constraint: Never expose server-side API keys in client components.`,
    gate: "Gate: Zero hallucinated endpoints or uninspected paths.",
  },
  develop: {
    letter: "D",
    name: "Develop",
    tagline: "Make small, focused, reviewable patches.",
    icon: Code2,
    summary:
      "Restricts the agent to atomic modifications accompanied by tests. If a plan fails or tests fail, stop and re-plan rather than applying messy band-aids.",
    rules: [
      "Atomic, reviewable diffs rather than entire file replacements",
      "Always add or update tests alongside functional changes",
      "Stop and re-plan if implementation encounters unexpected blockers",
      "Stage files individually with Conventional Commits",
    ],
    snippet: `### Develop
- Patch: Added cross-encoder rerank loop with score threshold.
- Test: Added \`tests/rerank.test.ts\` with 5 mocked vector responses.
- Commit: \`feat(rag): add cross-encoder re-ranking step\``,
    gate: "Gate: Passing unit and integration tests for every patch.",
  },
  optimize: {
    letter: "O",
    name: "Optimize",
    tagline: "Quality gates, self-review, and handoff continuity.",
    icon: Gauge,
    summary:
      "Final verification loop before code reaches main branches. Enforces linter passes, performance checks, and handoff state in .pudo/session.md.",
    rules: [
      "Self-review for memory leaks, edge cases, and performance",
      "Run repository quality gates (\`npm test\`, \`npm run check\`)",
      "Record multi-agent session handoff state in \`.pudo/session.md\`",
      "Verify 100/100 readiness score before release candidate tagging",
    ],
    snippet: `### Optimize
- Verification: \`npm test\` -> 15/15 passed.
- Checks: \`pudo check\` -> 100% compliant.
- Handoff: Saved session notes to \`.pudo/session.md\`.`,
    gate: "Gate: Automated quality gate script exits with code 0.",
  },
};

export function WorkflowSection() {
  const [selectedPhase, setSelectedPhase] = useState<PhaseKey>("plan");
  const current = PHASES[selectedPhase];
  const IconComponent = current.icon;

  return (
    <section id="workflow" className="py-20 border-t border-white/[0.08] bg-[#09090b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
            Disciplined Agent Protocol
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            The PUDO Workflow Loop
          </p>
          <p className="mt-4 text-base text-zinc-400 leading-relaxed">
            Autonomous agents drift when left unconstrained. PUDO anchors every AI action inside a verifiable 4-phase
            loop: Plan, Understand, Develop, and Optimize.
          </p>
        </div>

        {/* Phase Selector Tabs */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(Object.keys(PHASES) as PhaseKey[]).map((key) => {
            const item = PHASES[key];
            const isSelected = selectedPhase === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedPhase(key)}
                className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "border-emerald-500/40 bg-zinc-900/90 shadow-md ring-1 ring-emerald-500/30"
                    : "border-white/[0.08] bg-zinc-950/40 hover:border-zinc-700 hover:bg-zinc-900/40"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-md font-mono text-xs font-bold ${
                      isSelected ? "bg-emerald-500 text-black" : "bg-zinc-800 text-zinc-300"
                    }`}
                  >
                    {item.letter}
                  </span>
                  <span className={`text-base font-semibold ${isSelected ? "text-white" : "text-zinc-300"}`}>
                    {item.name}
                  </span>
                </div>
                <span className="mt-2 text-xs text-zinc-500 line-clamp-1">{item.tagline}</span>
              </button>
            );
          })}
        </div>

        {/* Phase Details Card */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#0c0c0e] p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Guidelines & Rules */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-zinc-900 text-emerald-400">
                  <IconComponent className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Phase {current.letter}: {current.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">{current.tagline}</p>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">{current.summary}</p>

              <div>
                <h4 className="text-xs font-mono font-semibold uppercase text-zinc-400 tracking-wider mb-3">
                  Enforced Rules & Constraints
                </h4>
                <ul className="space-y-2.5">
                  {current.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.05] p-3 text-xs font-mono text-emerald-300">
                {current.gate}
              </div>
            </div>

            {/* Right Column: Code Snippet Example */}
            <div className="lg:col-span-6">
              <div className="rounded-xl border border-white/10 bg-zinc-950 overflow-hidden shadow-inner">
                <div className="flex items-center justify-between border-b border-white/[0.08] bg-zinc-900/60 px-4 py-2 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-2">
                    <FileCode2 className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Real-world Agent Output ({current.name})</span>
                  </span>
                  <span className="text-emerald-400">PUDO Compliant</span>
                </div>
                <pre className="p-4 text-xs font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {current.snippet}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

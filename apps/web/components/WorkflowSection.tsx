"use client";

import { useState } from "react";
import { CheckCircle2, ShieldAlert, FileCode2, ArrowRight, Lightbulb, Compass, Code2, Gauge } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/en";

type PhaseKey = "plan" | "understand" | "develop" | "optimize";

// Snippets stay English: they show literal agent output.
interface PhaseDetail {
  letter: string;
  icon: typeof Compass;
  snippet: string;
}

const PHASES: Record<PhaseKey, PhaseDetail> = {
  plan: {
    letter: "P",
    icon: Compass,
    snippet: `### Plan
- Scope: Implement hybrid search re-ranker in \`lib/rag/rerank.ts\`.
- Risks: Latency overhead; fall back to BM25 if API times out.
- Verification: Add unit test in \`tests/rerank.test.ts\` verifying top-K ordering.`,
  },
  understand: {
    letter: "U",
    icon: Lightbulb,
    snippet: `### Understand
- Inspected: \`src/core/retrieval.ts\` and \`packages/schemas/config.json\`.
- Invariant: Using Zod 3.25 for schema parsing.
- Constraint: Never expose server-side API keys in client components.`,
  },
  develop: {
    letter: "D",
    icon: Code2,
    snippet: `### Develop
- Patch: Added cross-encoder rerank loop with score threshold.
- Test: Added \`tests/rerank.test.ts\` with 5 mocked vector responses.
- Commit: \`feat(rag): add cross-encoder re-ranking step\``,
  },
  optimize: {
    letter: "O",
    icon: Gauge,
    snippet: `### Optimize
- Verification: \`npm test\` -> 15/15 passed.
- Checks: \`pudo check\` -> 100% compliant.
- Handoff: Saved session notes to \`.pudo/session.md\`.`,
  },
};

export function WorkflowSection({ t }: { t: Dictionary["workflow"] }) {
  const [selectedPhase, setSelectedPhase] = useState<PhaseKey>("plan");
  const current = { ...PHASES[selectedPhase], ...t.phases[selectedPhase] };
  const IconComponent = current.icon;

  return (
    <section id="workflow" className="py-20 border-t border-white/[0.08] bg-[#09090b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
            {t.eyebrow}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t.title}
          </p>
          <p className="mt-4 text-base text-zinc-400 leading-relaxed">
            {t.intro}
          </p>
        </div>

        {/* Phase Selector Tabs */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(Object.keys(PHASES) as PhaseKey[]).map((key) => {
            const item = { ...PHASES[key], ...t.phases[key] };
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
                    {t.phase} {current.letter}: {current.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">{current.tagline}</p>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">{current.summary}</p>

              <div>
                <h4 className="text-xs font-mono font-semibold uppercase text-zinc-400 tracking-wider mb-3">
                  {t.rulesHeading}
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
                    <span>{t.outputLabel} ({current.name})</span>
                  </span>
                  <span className="text-emerald-400">{t.compliant}</span>
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

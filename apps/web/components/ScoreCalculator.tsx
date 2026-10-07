"use client";

import { useState, useMemo } from "react";
import { CheckSquare, Square, ShieldCheck, AlertTriangle, XCircle, RotateCcw, Award, Gauge } from "lucide-react";
import { RUBRIC_CATEGORIES, RUBRIC_ITEMS, RubricItem } from "@/lib/data/score-rubric";

export function ScoreCalculator() {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    RUBRIC_ITEMS.forEach((item) => {
      initial[item.id] = item.defaultChecked;
    });
    return initial;
  });

  const toggleItem = (id: string) => {
    setCheckedState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleReset = () => {
    const initial: Record<string, boolean> = {};
    RUBRIC_ITEMS.forEach((item) => {
      initial[item.id] = true;
    });
    setCheckedState(initial);
  };

  const { totalScore, status, categoryScores } = useMemo(() => {
    let score = 0;
    const catScores: Record<string, number> = {
      rules: 0,
      context: 0,
      workflow: 0,
      safety: 0,
      evidence: 0,
    };

    RUBRIC_ITEMS.forEach((item) => {
      if (checkedState[item.id]) {
        score += item.points;
        catScores[item.category] += item.points;
      }
    });

    let st: "ready" | "caution" | "blocked" = "blocked";
    if (score >= 80) st = "ready";
    else if (score >= 50) st = "caution";

    return {
      totalScore: score,
      status: st,
      categoryScores: catScores,
    };
  }, [checkedState]);

  return (
    <section id="calculator" className="py-20 border-t border-white/[0.08] bg-[#09090b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              Interactive Audit
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              100-Point Repository Readiness Rubric
            </p>
            <p className="mt-4 text-base text-zinc-400 leading-relaxed">
              PUDO evaluates repositories against an evidence-based rubric. Toggle the criteria below to simulate your
              repository readiness score.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-zinc-900 px-3 py-1.5 text-xs font-mono text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors self-start md:self-auto"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset to 100/100</span>
          </button>
        </div>

        {/* Dynamic Score Dashboard */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-[#0c0c0e] p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-white/[0.08] pb-8">
            {/* Score Big Display */}
            <div className="md:col-span-4 flex items-center gap-6">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl border border-white/10 bg-zinc-950 shadow-inner">
                <div className="text-center">
                  <span
                    className={`text-4xl font-extrabold font-mono tracking-tight ${
                      status === "ready"
                        ? "text-emerald-400"
                        : status === "caution"
                        ? "text-amber-400"
                        : "text-rose-400"
                    }`}
                  >
                    {totalScore}
                  </span>
                  <span className="block text-[11px] font-mono text-zinc-500 uppercase mt-0.5">/ 100 pts</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Audit Status</div>
                <div className="mt-1 flex items-center gap-2">
                  {status === "ready" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-bold text-emerald-400">
                      <ShieldCheck className="h-3.5 w-3.5" /> READY
                    </span>
                  )}
                  {status === "caution" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono font-bold text-amber-400">
                      <AlertTriangle className="h-3.5 w-3.5" /> CAUTION
                    </span>
                  )}
                  {status === "blocked" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-mono font-bold text-rose-400">
                      <XCircle className="h-3.5 w-3.5" /> BLOCKED
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs text-zinc-500">
                  {status === "ready"
                    ? "Repository is fully hardened for autonomous coding agents."
                    : status === "caution"
                    ? "Safe for copilots, but requires additional quality gates."
                    : "High risk of hallucination or unconstrained agent changes."}
                </p>
              </div>
            </div>

            {/* Pillar Breakdown Bars */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-5 gap-3">
              {RUBRIC_CATEGORIES.map((cat) => {
                const currentCatScore = categoryScores[cat.id];
                const percentage = Math.round((currentCatScore / cat.maxPoints) * 100);
                return (
                  <div key={cat.id} className="rounded-xl border border-white/[0.06] bg-zinc-950/60 p-3">
                    <div className="text-[11px] font-mono text-zinc-400 truncate">{cat.name.split(" ")[0]}</div>
                    <div className="mt-1 font-mono text-lg font-bold text-white">
                      {currentCatScore} <span className="text-xs text-zinc-500 font-normal">/ {cat.maxPoints}</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Checkbox Grid */}
          <div className="mt-8 space-y-6">
            {RUBRIC_CATEGORIES.map((category) => {
              const items = RUBRIC_ITEMS.filter((i) => i.category === category.id);
              return (
                <div key={category.id}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-mono font-semibold uppercase text-zinc-300 tracking-wider">
                      {category.name} ({categoryScores[category.id]}/{category.maxPoints} pts)
                    </h4>
                    <span className="text-xs text-zinc-500 hidden sm:inline">{category.description}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {items.map((item) => {
                      const isChecked = checkedState[item.id];
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleItem(item.id)}
                          className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all ${
                            isChecked
                              ? "border-emerald-500/30 bg-zinc-900/80 text-zinc-200"
                              : "border-white/[0.06] bg-zinc-950/40 text-zinc-500 hover:border-zinc-800"
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isChecked ? (
                              <CheckSquare className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <Square className="h-4 w-4 text-zinc-600" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <span className={`text-xs font-semibold ${isChecked ? "text-white" : "text-zinc-400"}`}>
                                {item.title}
                              </span>
                              <span className="font-mono text-[10px] text-emerald-400/90 font-bold shrink-0">
                                +{item.points}
                              </span>
                            </div>
                            <p className="mt-1 text-[11px] text-zinc-500 line-clamp-2">{item.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

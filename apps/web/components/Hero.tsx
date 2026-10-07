"use client";

import { useState } from "react";
import Link from "next/link";
import { Terminal, Shield, ArrowRight, CheckCircle2, Copy, Check, Sparkles, Play, Cpu } from "lucide-react";

type TerminalTab = "init" | "check" | "score";

export function Hero() {
  const [activeTab, setActiveTab] = useState<TerminalTab>("init");
  const [copied, setCopied] = useState(false);

  const terminalData: Record<TerminalTab, { command: string; output: string[] }> = {
    init: {
      command: "npx @dongduong2001/pudo-code-system init",
      output: [
        "Analyzing repository structure...",
        "✔ Detected stack: Next.js (TypeScript, React 19, App Router)",
        "✔ Target agents: Cursor, Windsurf, Claude Code, Codex",
        "Writing configuration files:",
        "  + .cursorrules (PUDO ruleset)",
        "  + .windsurfrules (Cascade guidelines)",
        "  + AGENTS.md (Universal PUDO workflow)",
        "  + .pudo/config.json (Project metadata)",
        "  + .pudo/session.md (Multi-agent handoff state)",
        "  + .github/pull_request_template.md",
        "✔ Repository initialized successfully. PUDO operational layer active.",
      ],
    },
    check: {
      command: "npx @dongduong2001/pudo-code-system check",
      output: [
        "Running PUDO repository compliance check...",
        "  [PASS] PUDO config (.pudo/config.json valid)",
        "  [PASS] Session handoff (.pudo/session.md present)",
        "  [PASS] Release checklist documented",
        "  [PASS] PR template enforces scope & verification",
        "  [PASS] Primary agent rule file configured",
        "Result: PASSED (All 5 invariant gates satisfied)",
      ],
    },
    score: {
      command: "npx @dongduong2001/pudo-code-system score",
      output: [
        "Evaluating evidence-based readiness rubric...",
        "  - Agent rules & invariants:   25 / 25",
        "  - Context quality & state:    20 / 20",
        "  - Workflow & quality gates:   20 / 20",
        "  - AI & MCP protocol safety:   20 / 20",
        "  - Operational test evidence:  15 / 15",
        "----------------------------------------------",
        "Total Readiness Score: 100 / 100 (100%)",
        "Status: READY for autonomous agent workflows.",
      ],
    },
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(terminalData[activeTab].command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background Precision Grid */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-fade pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/90 px-3.5 py-1 text-xs text-zinc-300 shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-zinc-400">Release v1.4.0</span>
            <span className="text-zinc-600">•</span>
            <span>Interactive MCP Prompts & Multi-Agent Mesh</span>
            <ArrowRight className="h-3 w-3 text-zinc-400" />
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl sm:leading-[1.1]">
            The Operating Layer for{" "}
            <span className="bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-400 bg-clip-text text-transparent">
              AI Coding Agents
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Standardize coding workflows across Claude, Cursor, Windsurf, Roo, and Codex.
            Enforce architectural invariants, context handoffs, and evidence-based repository readiness.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#generator"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-zinc-200 transition-colors shadow-sm"
            >
              <Cpu className="h-4 w-4" />
              Generate Agent Rules
            </Link>
            <Link
              href="#mcp"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-zinc-900/80 px-5 py-3 text-sm font-semibold text-zinc-200 hover:border-zinc-600 hover:text-white transition-colors"
            >
              <Terminal className="h-4 w-4 text-emerald-400" />
              Setup MCP Server
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Read Playbooks
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Interactive Terminal Simulator */}
        <div className="mt-14 mx-auto max-w-3xl">
          <div className="rounded-xl border border-white/10 bg-[#0c0c0e] shadow-2xl overflow-hidden">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-zinc-900/80 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-zinc-700/60" />
                  <div className="h-3 w-3 rounded-full bg-zinc-700/60" />
                  <div className="h-3 w-3 rounded-full bg-zinc-700/60" />
                </div>
                <div className="ml-3 flex gap-1">
                  {(["init", "check", "score"] as TerminalTab[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`rounded px-2.5 py-1 text-xs font-mono transition-colors ${
                        activeTab === tab
                          ? "bg-zinc-800 text-white font-semibold shadow-xs"
                          : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40"
                      }`}
                    >
                      pudo {tab}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleCopyCommand}
                className="flex items-center gap-1.5 rounded px-2 py-1 text-xs font-mono text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                title="Copy active command"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span className="hidden sm:inline">Copy Command</span>
              </button>
            </div>

            {/* Terminal Command Line & Animated Output */}
            <div className="p-5 font-mono text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-zinc-300 pb-3 border-b border-white/[0.04]">
                <span className="text-emerald-400">$</span>
                <span className="text-white font-semibold">{terminalData[activeTab].command}</span>
              </div>

              <div className="pt-3 space-y-1.5 text-zinc-400 min-h-[190px]">
                {terminalData[activeTab].output.map((line, idx) => {
                  const isPass = line.includes("[PASS]") || line.includes("✔") || line.includes("100 / 100");
                  const isReady = line.includes("Status: READY");
                  const isHeading = line.includes("Evaluating") || line.includes("Running") || line.includes("Analyzing");
                  return (
                    <div
                      key={idx}
                      className={
                        isReady
                          ? "text-emerald-400 font-semibold"
                          : isPass
                          ? "text-emerald-300/90"
                          : isHeading
                          ? "text-zinc-300 font-medium"
                          : "text-zinc-400"
                      }
                    >
                      {line}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Terminal Footer Status Bar */}
            <div className="flex items-center justify-between border-t border-white/[0.08] bg-zinc-950/60 px-4 py-2 text-xs font-mono text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>PUDO Engine v1.4.0</span>
              </div>
              <div>Node &gt;= 20 • Stdio Transport • Zero-Telemetry</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Download, Terminal, Sliders, CheckCircle2, FileText, Code } from "lucide-react";
import { generateRuleTemplate, RuleGeneratorOptions } from "@/lib/data/rules-templates";

const FRAMEWORKS = [
  { id: "next", label: "Next.js", desc: "React Server Components, App Router" },
  { id: "react", label: "React + Vite", desc: "SPA, client state, hooks" },
  { id: "fastapi", label: "FastAPI", desc: "Async Python, Pydantic v2" },
  { id: "django", label: "Django", desc: "Python, ORM, fat models" },
  { id: "go", label: "Go", desc: "cmd/, internal/, standard layout" },
  { id: "rust", label: "Rust", desc: "Cargo, zero-cost, clippy checks" },
  { id: "bun", label: "Bun", desc: "High-speed runtime, bun:test" },
] as const;

const TOOLS = [
  { id: "cursor", label: "Cursor", file: ".cursorrules", tag: "Cursor IDE" },
  { id: "windsurf", label: "Windsurf", file: ".windsurfrules", tag: "Cascade Agent" },
  { id: "roo", label: "Roo Code", file: ".clinerules", tag: "Cline / Roo" },
  { id: "claude", label: "Claude Code", file: "CLAUDE.md", tag: "Anthropic CLI" },
  { id: "codex", label: "Codex", file: "AGENTS.md", tag: "Universal" },
  { id: "gemini", label: "Gemini", file: "GEMINI.md", tag: "Antigravity / CLI" },
] as const;

export function ConfigGenerator() {
  const [project, setProject] = useState<RuleGeneratorOptions["project"]>("next");
  const [tool, setTool] = useState<RuleGeneratorOptions["tool"]>("cursor");
  const [strictness, setStrictness] = useState<RuleGeneratorOptions["strictness"]>("standard");

  const [copiedFile, setCopiedFile] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

  const ruleResult = useMemo(() => {
    return generateRuleTemplate({ tool, project, strictness });
  }, [tool, project, strictness]);

  const cliCommand = useMemo(() => {
    return `npx @dongduong2001/pudo-code-system init --tool ${tool} --project ${project} --strictness ${strictness}`;
  }, [tool, project, strictness]);

  const handleCopyFile = () => {
    navigator.clipboard.writeText(ruleResult.content);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText(cliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([ruleResult.content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = ruleResult.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="generator" className="py-20 border-t border-white/[0.08] bg-[#09090b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
            Interactive Rule Generator
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Configure Agent Rules for Your Stack
          </p>
          <p className="mt-4 text-base text-zinc-400 leading-relaxed">
            Select your technology stack and target AI coding editor. Copy the generated rule file or download it
            directly into your repository root.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Target AI Tool */}
            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-zinc-300 tracking-wider mb-2.5">
                1. Target AI Coding Tool
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TOOLS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTool(t.id as RuleGeneratorOptions["tool"])}
                    className={`flex flex-col p-2.5 rounded-lg border text-left transition-all ${
                      tool === t.id
                        ? "border-emerald-500/50 bg-zinc-900 text-white shadow-xs"
                        : "border-white/[0.08] bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    <span className="text-xs font-semibold">{t.label}</span>
                    <span className="text-[10px] font-mono text-zinc-500">{t.file}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Target Framework */}
            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-zinc-300 tracking-wider mb-2.5">
                2. Project Stack
              </label>
              <div className="grid grid-cols-2 gap-2">
                {FRAMEWORKS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setProject(f.id as RuleGeneratorOptions["project"])}
                    className={`flex flex-col p-2.5 rounded-lg border text-left transition-all ${
                      project === f.id
                        ? "border-emerald-500/50 bg-zinc-900 text-white shadow-xs"
                        : "border-white/[0.08] bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    <span className="text-xs font-semibold">{f.label}</span>
                    <span className="text-[10px] text-zinc-500 truncate">{f.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Strictness Mode */}
            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-zinc-300 tracking-wider mb-2.5">
                3. Enforcement Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setStrictness("standard")}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    strictness === "standard"
                      ? "border-emerald-500/50 bg-zinc-900 text-white"
                      : "border-white/[0.08] bg-zinc-950/60 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <div className="text-xs font-semibold">Standard</div>
                  <div className="text-[10px] text-zinc-500">PUDO workflow + safety gates</div>
                </button>
                <button
                  onClick={() => setStrictness("strict")}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    strictness === "strict"
                      ? "border-emerald-500/50 bg-zinc-900 text-white"
                      : "border-white/[0.08] bg-zinc-950/60 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <div className="text-xs font-semibold">Strict</div>
                  <div className="text-[10px] text-zinc-500">Mandatory approval on migrations & commands</div>
                </button>
              </div>
            </div>

            {/* Equivalent CLI Command */}
            <div className="rounded-xl border border-white/10 bg-zinc-950 p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 font-mono">
                  <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                  <span>One-Liner CLI Equivalent</span>
                </span>
                <button
                  onClick={handleCopyCli}
                  className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors"
                >
                  {copiedCli ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>Copy</span>
                </button>
              </div>
              <div className="font-mono text-xs text-emerald-300 bg-zinc-900/90 rounded p-2 overflow-x-auto whitespace-nowrap">
                {cliCommand}
              </div>
            </div>
          </div>

          {/* Code Preview Column */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-white/10 bg-[#0c0c0e] shadow-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] bg-zinc-900/70 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono text-xs font-semibold text-white">{ruleResult.filename}</span>
                  <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
                    ({ruleResult.setupPath})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyFile}
                    className="flex items-center gap-1.5 rounded bg-zinc-800 px-2.5 py-1 text-xs font-mono text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors"
                  >
                    {copiedFile ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 rounded border border-white/10 bg-zinc-900 px-2.5 py-1 text-xs font-mono text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors"
                    title="Download file directly"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-4 bg-zinc-950/80 max-h-[460px] overflow-y-auto font-mono text-xs leading-relaxed text-zinc-300">
                <pre className="whitespace-pre-wrap">{ruleResult.content}</pre>
              </div>

              {/* Footer Info */}
              <div className="border-t border-white/[0.08] bg-zinc-950 px-4 py-2 text-[11px] font-mono text-zinc-500 flex justify-between items-center">
                <span>{ruleResult.description}</span>
                <span className="text-emerald-400">Ready to save</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

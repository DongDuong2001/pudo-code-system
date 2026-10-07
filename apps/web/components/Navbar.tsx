"use client";

import { useState } from "react";
import Link from "next/link";
import { Terminal, Copy, Check, Github, ExternalLink, BookOpen, Layers, ShieldCheck, Sparkles } from "lucide-react";

export function Navbar() {
  const [copied, setCopied] = useState(false);
  const command = "npx @dongduong2001/pudo-code-system init";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#09090b]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Version */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-zinc-900 group-hover:border-zinc-700 transition-colors">
              <span className="font-mono text-sm font-bold text-white tracking-tighter">PD</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-white group-hover:text-zinc-200">
                PUDO Code System
              </span>
            </div>
          </Link>
          <span className="hidden sm:inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-mono text-emerald-400">
            v1.4.0
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
          <Link href="#workflow" className="hover:text-white transition-colors">
            Workflow
          </Link>
          <Link href="#generator" className="hover:text-white transition-colors">
            Rule Generator
          </Link>
          <Link href="#mcp" className="hover:text-white transition-colors">
            MCP Protocol
          </Link>
          <Link href="#calculator" className="hover:text-white transition-colors">
            Readiness Rubric
          </Link>
          <Link href="/docs" className="flex items-center gap-1.5 text-zinc-200 hover:text-white transition-colors">
            <BookOpen className="h-4 w-4 text-emerald-400" />
            <span>Docs & Playbooks</span>
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="hidden lg:flex items-center gap-2 rounded-md border border-white/10 bg-zinc-900/80 px-3 py-1.5 text-xs font-mono text-zinc-300 hover:border-zinc-700 hover:text-white transition-all"
            title="Click to copy quickstart command"
          >
            <Terminal className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-zinc-400">npx pudo init</span>
            {copied ? (
              <Check className="h-3 w-3 text-emerald-400" />
            ) : (
              <Copy className="h-3 w-3 text-zinc-500 group-hover:text-zinc-400" />
            )}
          </button>

          <a
            href="https://github.com/DongDuong2001/pudo-code-system"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-white/10 bg-zinc-900 p-2 text-zinc-400 hover:border-zinc-700 hover:text-white transition-colors"
            aria-label="GitHub Repository"
          >
            <Github className="h-4 w-4" />
          </a>

          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-black hover:bg-zinc-200 transition-colors shadow-sm"
          >
            Explore Docs
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useState } from "react";
import { Terminal, Copy, Check, Sparkles, BookOpen, Layers, ShieldCheck, Box } from "lucide-react";

type EditorTab = "claude" | "cursor" | "windsurf" | "stdio";

const CONFIGS: Record<EditorTab, { title: string; filename: string; path: string; json: string }> = {
  claude: {
    title: "Claude Desktop",
    filename: "claude_desktop_config.json",
    path: "%APPDATA%\\Claude\\claude_desktop_config.json (Windows) or ~/Library/Application Support/Claude/ (macOS)",
    json: `{
  "mcpServers": {
    "pudo": {
      "command": "npx",
      "args": ["-y", "@dongduong2001/mcp-server@latest"]
    }
  }
}`,
  },
  cursor: {
    title: "Cursor IDE",
    filename: "mcp.json / Settings > Features > MCP",
    path: "Settings > Features > MCP > Add New MCP Server",
    json: `{
  "name": "pudo",
  "type": "command",
  "command": "npx -y @dongduong2001/mcp-server@latest"
}`,
  },
  windsurf: {
    title: "Windsurf Cascade",
    filename: "mcp_config.json",
    path: "~/.codeium/windsurf/mcp_config.json",
    json: `{
  "mcpServers": {
    "pudo": {
      "command": "npx",
      "args": ["-y", "@dongduong2001/mcp-server@latest"]
    }
  }
}`,
  },
  stdio: {
    title: "Stdio CLI / Custom Agent",
    filename: "Process Execution",
    path: "Direct standard I/O communication pipe",
    json: `# Spawn process directly over Stdio
npx @dongduong2001/mcp-server

# Or execute with custom repo root environment
PUDO_PACKAGE_ROOT=/path/to/repo npx @dongduong2001/mcp-server`,
  },
};

export function McpHub() {
  const [activeEditor, setActiveEditor] = useState<EditorTab>("claude");
  const [copied, setCopied] = useState(false);

  const current = CONFIGS[activeEditor];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="mcp" className="py-20 border-t border-white/[0.08] bg-[#09090b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
            Model Context Protocol
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Plug PUDO Directly into Your AI Agent
          </p>
          <p className="mt-4 text-base text-zinc-400 leading-relaxed">
            Give Claude Desktop, Cursor, and Windsurf access to your repository&apos;s architectural invariants,
            playbook catalog, quality gate runners, and live context handoffs.
          </p>
        </div>

        {/* Configuration Hub */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Editor Switcher & JSON Box */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-white/10 bg-[#0c0c0e] shadow-xl overflow-hidden">
              {/* Tab Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] bg-zinc-900/80 px-4 py-2.5">
                <div className="flex gap-1 overflow-x-auto">
                  {(Object.keys(CONFIGS) as EditorTab[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveEditor(tab)}
                      className={`rounded px-3 py-1 text-xs font-mono transition-colors whitespace-nowrap ${
                        activeEditor === tab
                          ? "bg-zinc-800 text-white font-semibold"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {CONFIGS[tab].title}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded bg-zinc-800 px-2.5 py-1 text-xs font-mono text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors ml-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Config</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Box */}
              <div className="p-4 bg-zinc-950 font-mono text-xs leading-relaxed text-emerald-300">
                <div className="text-[11px] text-zinc-500 mb-2 font-mono">
                  # Target: {current.path}
                </div>
                <pre className="overflow-x-auto">{current.json}</pre>
              </div>

              <div className="border-t border-white/[0.08] bg-zinc-950/80 px-4 py-2.5 text-xs text-zinc-400 flex items-center justify-between">
                <span>npm package: <code className="font-mono text-zinc-300">@dongduong2001/mcp-server</code></span>
                <span className="text-emerald-400 font-mono text-[11px]">latest: 0.3.0-alpha.1</span>
              </div>
            </div>
          </div>

          {/* Protocol Capabilities Column */}
          <div className="lg:col-span-5 space-y-4">
            {/* Prompts Feature */}
            <div className="rounded-xl border border-white/10 bg-zinc-950/80 p-4">
              <div className="flex items-center gap-2.5 text-white font-semibold text-sm">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span>Interactive MCP Prompts</span>
              </div>
              <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                Slash commands in Claude or Cursor that guide developers through standardized workflows:
              </p>
              <div className="mt-2.5 space-y-1.5 font-mono text-xs">
                <div className="text-zinc-300 bg-zinc-900/60 rounded px-2 py-1">
                  <span className="text-emerald-400">/pudo-init</span> — Interactive project rule setup
                </div>
                <div className="text-zinc-300 bg-zinc-900/60 rounded px-2 py-1">
                  <span className="text-emerald-400">/pudo-plan</span> — Formulate scope & test strategies
                </div>
                <div className="text-zinc-300 bg-zinc-900/60 rounded px-2 py-1">
                  <span className="text-emerald-400">/pudo-optimize</span> — Run quality gate checklists
                </div>
              </div>
            </div>

            {/* Resources Feature */}
            <div className="rounded-xl border border-white/10 bg-zinc-950/80 p-4">
              <div className="flex items-center gap-2.5 text-white font-semibold text-sm">
                <Box className="h-4 w-4 text-cyan-400" />
                <span>MCP Protocol Resources</span>
              </div>
              <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                Live context feeds for LLMs without flooding system prompt token limits:
              </p>
              <div className="mt-2.5 space-y-1.5 font-mono text-xs">
                <div className="text-zinc-300 bg-zinc-900/60 rounded px-2 py-1 truncate">
                  <span className="text-cyan-400">pudo://rules/current</span> — Active repo rule file
                </div>
                <div className="text-zinc-300 bg-zinc-900/60 rounded px-2 py-1 truncate">
                  <span className="text-cyan-400">pudo://session/handoff</span> — Active session state
                </div>
                <div className="text-zinc-300 bg-zinc-900/60 rounded px-2 py-1 truncate">
                  <span className="text-cyan-400">pudo://playbooks/catalog</span> — Built-in playbooks
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

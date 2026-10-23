import Link from "next/link";
import { Github, Package, Terminal, Shield, Heart } from "lucide-react";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/en";

export function Footer({ locale, t }: { locale: Locale; t: Dictionary["footer"] }) {
  const home = localePath(locale, "/");
  return (
    <footer className="border-t border-white/[0.08] bg-[#09090b] py-12 text-zinc-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded border border-white/10 bg-zinc-900 font-mono text-xs font-bold text-white">
                PD
              </div>
              <span className="text-sm font-semibold text-white">PUDO Code System</span>
              <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-500/20">
                v1.4.0
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
              {t.about}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/DongDuong2001/pudo-code-system"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded border border-white/10 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-300 hover:text-white transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.npmjs.com/package/@dongduong2001/pudo-code-system"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded border border-white/10 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-300 hover:text-white transition-colors"
              >
                <Package className="h-3.5 w-3.5 text-rose-400" />
                <span>npm CLI</span>
              </a>
              <a
                href="https://www.npmjs.com/package/@dongduong2001/mcp-server"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded border border-white/10 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-300 hover:text-white transition-colors"
              >
                <Package className="h-3.5 w-3.5 text-cyan-400" />
                <span>MCP Server</span>
              </a>
            </div>
          </div>

          {/* Core Tools */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase text-zinc-300 tracking-wider mb-3">
              {t.toolsHeading}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={`${home}#workflow`} className="hover:text-zinc-300 transition-colors">
                  {t.toolWorkflow}
                </Link>
              </li>
              <li>
                <Link href={`${home}#generator`} className="hover:text-zinc-300 transition-colors">
                  {t.toolGenerator}
                </Link>
              </li>
              <li>
                <Link href={`${home}#mcp`} className="hover:text-zinc-300 transition-colors">
                  {t.toolMcp}
                </Link>
              </li>
              <li>
                <Link href={`${home}#calculator`} className="hover:text-zinc-300 transition-colors">
                  {t.toolRubric}
                </Link>
              </li>
            </ul>
          </div>

          {/* Documentation & Playbooks */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase text-zinc-300 tracking-wider mb-3">
              {t.docsHeading}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={localePath(locale, "/docs/quickstart")} className="hover:text-zinc-300 transition-colors">
                  {t.docQuickstart}
                </Link>
              </li>
              <li>
                <Link href={localePath(locale, "/docs/llm-app-architecture")} className="hover:text-zinc-300 transition-colors">
                  {t.docLlm}
                </Link>
              </li>
              <li>
                <Link href={localePath(locale, "/docs/multi-agent-orchestration")} className="hover:text-zinc-300 transition-colors">
                  {t.docAgents}
                </Link>
              </li>
              <li>
                <Link href={localePath(locale, "/docs/database-design-guide")} className="hover:text-zinc-300 transition-colors">
                  {t.docDatabase}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/[0.06] pt-8 text-xs text-zinc-500">
          <div>
            {t.license}
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-4">
            <span>{t.hosted}</span>
            <span>•</span>
            <span>{t.tracking}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

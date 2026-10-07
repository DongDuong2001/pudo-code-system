"use client";

import Link from "next/link";
import { BookOpen, ArrowRight, Clock, Tag, Cpu, Database, Network } from "lucide-react";
import { DOC_ARTICLES } from "@/lib/data/playbooks";

export function PlaybooksShowcase() {
  const featured = DOC_ARTICLES.filter((a) => a.category !== "Getting Started").slice(0, 4);

  return (
    <section className="py-20 border-t border-white/[0.08] bg-[#09090b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              Engineering Playbooks
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Architectural Standards for AI & Cloud
            </p>
            <p className="mt-4 text-base text-zinc-400 leading-relaxed">
              Real-world blueprints for building resilient LLM systems, coordinating multi-agent loops, and structuring
              distributed databases.
            </p>
          </div>

          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors self-start sm:self-auto"
          >
            <span>View All Playbooks</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((article) => (
            <Link
              key={article.slug}
              href={`/docs/${article.slug}`}
              className="group relative rounded-2xl border border-white/10 bg-[#0c0c0e] p-6 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-zinc-500 font-mono">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {article.title}
                </h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{article.summary}</p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-white/[0.04]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-medium text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-all flex items-center gap-1">
                  Read Guide <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

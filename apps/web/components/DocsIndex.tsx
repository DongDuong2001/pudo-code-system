"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, BookOpen, Clock, ArrowRight, Tag, Compass, Cpu, Database } from "lucide-react";
import { DOC_ARTICLES } from "@/lib/data/playbooks";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/en";

export function DocsIndex({ locale, t }: { locale: Locale; t: Dictionary["docs"] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return DOC_ARTICLES;
    const query = searchQuery.toLowerCase();
    return DOC_ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.summary.toLowerCase().includes(query) ||
        a.tags.some((t) => t.toLowerCase().includes(query)) ||
        a.category.toLowerCase().includes(query) ||
        t.categories[a.category].toLowerCase().includes(query)
    );
  }, [searchQuery, t]);

  const categories = ["Getting Started", "AI Engineering", "DevOS System Architecture"] as const;

  return (
    <div className="space-y-10">
      {/* Header & Search */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
          <span>{t.eyebrow}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          {t.title}
        </h1>
        <p className="mt-3 text-base text-zinc-400 max-w-2xl leading-relaxed">
          {t.intro}
        </p>

        {/* Search Bar */}
        <div className="mt-6 relative max-w-xl">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0c0c0e] py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 font-mono transition-all"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="space-y-8">
        {categories.map((cat) => {
          const items = filteredArticles.filter((a) => a.category === cat);
          if (items.length === 0) return null;

          return (
            <div key={cat} className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                <h2 className="text-sm font-mono font-semibold uppercase text-zinc-300 tracking-wider">
                  {t.categories[cat]} ({items.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((art) => (
                  <Link
                    key={art.slug}
                    href={localePath(locale, `/docs/${art.slug}`)}
                    className="group rounded-xl border border-white/10 bg-[#0c0c0e] p-5 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          {t.categories[art.category]}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-mono text-zinc-500">
                          <Clock className="h-3 w-3" />
                          {art.readTime.replace("min read", t.minRead)}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {art.title}
                      </h3>
                      <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed">{art.summary}</p>
                    </div>

                    <div className="mt-5 flex items-center justify-between pt-3 border-t border-white/[0.04]">
                      <div className="flex flex-wrap gap-1">
                        {art.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono text-zinc-500 bg-zinc-950 px-1.5 py-0.5 rounded border border-white/[0.04]"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      <span className="text-xs font-medium text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-all flex items-center gap-1">
                        {t.read} <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {filteredArticles.length === 0 && (
          <div className="rounded-xl border border-white/[0.08] bg-zinc-950/40 p-12 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-zinc-600 mb-3" />
            <p className="text-sm font-semibold text-zinc-300">{t.noResults}</p>
            <p className="text-xs text-zinc-500 mt-1">{t.noResultsHint}</p>
          </div>
        )}
      </div>
    </div>
  );
}

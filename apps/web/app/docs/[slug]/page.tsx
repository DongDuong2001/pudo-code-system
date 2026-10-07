import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ArrowRight, Clock, BookOpen, ChevronRight, Share2, Tag } from "lucide-react";
import { DOC_ARTICLES } from "@/lib/data/playbooks";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DOC_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = DOC_ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: "Documentation — PUDO Code System" };

  return {
    title: `${article.title} — PUDO Documentation`,
    description: article.summary,
  };
}

export default async function DocArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const articleIndex = DOC_ARTICLES.findIndex((a) => a.slug === slug);
  if (articleIndex === -1) notFound();

  const article = DOC_ARTICLES[articleIndex];
  const prevArticle = articleIndex > 0 ? DOC_ARTICLES[articleIndex - 1] : null;
  const nextArticle = articleIndex < DOC_ARTICLES.length - 1 ? DOC_ARTICLES[articleIndex + 1] : null;

  return (
    <article className="space-y-8 max-w-4xl">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-mono text-zinc-500">
        <Link href="/docs" className="hover:text-zinc-300 transition-colors">
          Docs
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span>{article.category}</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-zinc-300 truncate">{article.title}</span>
      </nav>

      {/* Header Info */}
      <div className="border-b border-white/[0.08] pb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-xs font-mono text-zinc-500">
            <Clock className="h-3 w-3" />
            {article.readTime}
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          {article.title}
        </h1>

        <p className="text-base text-zinc-400 leading-relaxed max-w-3xl">
          {article.summary}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {article.tags.map((t) => (
            <span
              key={t}
              className="text-[11px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-white/[0.04]"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>

      {/* Article Markdown Body */}
      <div className="prose prose-invert max-w-none space-y-6 text-zinc-300 text-sm leading-relaxed">
        {article.content.split("\n\n").map((block, idx) => {
          if (block.startsWith("# ")) {
            return null; // Skip main title as rendered in header
          }
          if (block.startsWith("## ")) {
            return (
              <h2
                key={idx}
                className="text-xl font-bold text-white pt-6 border-t border-white/[0.06] tracking-tight"
              >
                {block.replace("## ", "")}
              </h2>
            );
          }
          if (block.startsWith("### ")) {
            return (
              <h3 key={idx} className="text-base font-semibold text-zinc-100 pt-3 tracking-tight">
                {block.replace("### ", "")}
              </h3>
            );
          }
          if (block.startsWith("```")) {
            const lines = block.split("\n");
            const lang = lines[0].replace("```", "").trim();
            const code = lines.slice(1, -1).join("\n");
            return (
              <div key={idx} className="rounded-xl border border-white/10 bg-[#0c0c0e] overflow-hidden my-4">
                {lang && (
                  <div className="border-b border-white/[0.06] bg-zinc-950/80 px-4 py-1.5 text-[11px] font-mono text-zinc-500 flex justify-between items-center">
                    <span>{lang}</span>
                    <span className="text-zinc-600">PUDO standard</span>
                  </div>
                )}
                <pre className="p-4 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                  <code>{code}</code>
                </pre>
              </div>
            );
          }
          if (block.startsWith("- ") || block.startsWith("1. ")) {
            const items = block.split("\n");
            return (
              <ul key={idx} className="space-y-2 pl-4 list-disc marker:text-emerald-400">
                {items.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-zinc-300 text-xs sm:text-sm">
                    {item.replace(/^[-*]|\d+\.\s*/, "").trim()}
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <p key={idx} className="text-zinc-300 leading-relaxed text-xs sm:text-sm">
              {block}
            </p>
          );
        })}
      </div>

      {/* Prev / Next Pagination */}
      <div className="border-t border-white/[0.08] pt-8 mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevArticle ? (
          <Link
            href={`/docs/${prevArticle.slug}`}
            className="group rounded-xl border border-white/10 bg-[#0c0c0e] p-4 hover:border-zinc-700 transition-all text-left"
          >
            <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Previous
            </div>
            <div className="mt-1 text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
              {prevArticle.title}
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextArticle ? (
          <Link
            href={`/docs/${nextArticle.slug}`}
            className="group rounded-xl border border-white/10 bg-[#0c0c0e] p-4 hover:border-zinc-700 transition-all text-right"
          >
            <div className="text-[11px] font-mono text-zinc-500 flex items-center justify-end gap-1">
              Next <ArrowRight className="h-3 w-3" />
            </div>
            <div className="mt-1 text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
              {nextArticle.title}
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
}

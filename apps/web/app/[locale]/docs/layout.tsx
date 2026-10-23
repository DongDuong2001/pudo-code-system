import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { BookOpen, Compass, Cpu, Database, ChevronRight } from "lucide-react";
import { DOC_ARTICLES } from "@/lib/data/playbooks";
import { SITE_URL, getDictionary, languageAlternates, localePath, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = getDictionary(locale).meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: t.docsTitle,
    description: t.docsDescription,
    alternates: { canonical: localePath(locale, "/docs"), languages: languageAlternates("/docs") },
  };
}

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale as Locale;
  const t = getDictionary(locale);
  const categories = ["Getting Started", "AI Engineering", "DevOS System Architecture"] as const;

  return (
    <div className="flex min-h-screen flex-col bg-[#09090b]">
      <Navbar locale={locale} t={t.nav} />

      <div className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Docs Sidebar */}
          <aside className="lg:col-span-3 sticky top-24 rounded-xl border border-white/[0.08] bg-[#0c0c0e] p-4 hidden lg:block">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
              <BookOpen className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
                {t.docs.sidebar}
              </span>
            </div>

            <nav className="space-y-6 text-xs">
              {categories.map((cat) => {
                const articles = DOC_ARTICLES.filter((a) => a.category === cat);
                return (
                  <div key={cat}>
                    <div className="font-mono text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      {t.docs.categories[cat]}
                    </div>
                    <ul className="space-y-1">
                      {articles.map((art) => (
                        <li key={art.slug}>
                          <Link
                            href={localePath(locale, `/docs/${art.slug}`)}
                            className="block rounded px-2.5 py-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
                          >
                            {art.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 min-w-0">
            {children}
          </main>
        </div>
      </div>

      <Footer locale={locale} t={t.footer} />
    </div>
  );
}

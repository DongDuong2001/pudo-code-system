import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WorkflowSection } from "@/components/WorkflowSection";
import { ConfigGenerator } from "@/components/ConfigGenerator";
import { McpHub } from "@/components/McpHub";
import { ScoreCalculator } from "@/components/ScoreCalculator";
import { PlaybooksShowcase } from "@/components/PlaybooksShowcase";
import { Footer } from "@/components/Footer";
import { getDictionary, type Locale } from "@/lib/i18n";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const t = getDictionary(locale);

  return (
    <div className="flex min-h-screen flex-col bg-[#09090b]">
      <Navbar locale={locale} t={t.nav} />
      <main className="flex-1">
        <Hero locale={locale} t={t.hero} />
        <WorkflowSection t={t.workflow} />
        <ConfigGenerator t={t.generator} />
        <McpHub t={t.mcp} />
        <ScoreCalculator t={t.score} />
        <PlaybooksShowcase locale={locale} t={t.playbooks} docs={t.docs} />
      </main>
      <Footer locale={locale} t={t.footer} />
    </div>
  );
}

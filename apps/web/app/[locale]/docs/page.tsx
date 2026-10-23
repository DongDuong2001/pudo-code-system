import { DocsIndex } from "@/components/DocsIndex";
import { getDictionary, type Locale } from "@/lib/i18n";

export default async function DocsIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  return <DocsIndex locale={locale} t={getDictionary(locale).docs} />;
}

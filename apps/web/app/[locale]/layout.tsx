import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { LOCALES, SITE_URL, getDictionary, isLocale, languageAlternates, localePath } from "@/lib/i18n";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale).meta;

  return {
    metadataBase: new URL(SITE_URL),
    title: t.title,
    description: t.description,
    keywords: ["AI agents", "MCP server", "Cursor", "Windsurf", "Claude Code", "developer tools", "code quality", "PUDO"],
    authors: [{ name: "Dong Duong", url: "https://github.com/DongDuong2001" }],
    alternates: { canonical: localePath(locale, "/"), languages: languageAlternates("/") },
    openGraph: {
      title: t.title,
      description: t.description,
      url: localePath(locale, "/"),
      siteName: "PUDO Code System",
      type: "website",
      locale,
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className="dark">
      <body className="min-h-screen bg-[#09090b] text-[#fafafa] antialiased selection:bg-zinc-800 selection:text-white">
        {children}
      </body>
    </html>
  );
}

export const LOCALES = ["en", "vi", "es", "pt", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  vi: "Tiếng Việt",
  es: "Español",
  pt: "Português",
  ru: "Русский",
};

export const SITE_URL = "https://pudo-code-system.vercel.app";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

// English lives at the unprefixed URL; middleware rewrites it to /en internally.
export function localePath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

// Strips a leading locale segment so the switcher can rebuild the same page in another language.
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if (first && isLocale(first)) return "/" + rest.join("/");
  return pathname || "/";
}

export function languageAlternates(path: string) {
  const languages: Record<string, string> = { "x-default": path };
  for (const locale of LOCALES) languages[locale] = localePath(locale, path);
  return languages;
}

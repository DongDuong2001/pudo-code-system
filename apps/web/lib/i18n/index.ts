import en, { type Dictionary } from "./en";
import vi from "./vi";
import es from "./es";
import pt from "./pt";
import ru from "./ru";
import type { Locale } from "./config";

export * from "./config";
export type { Dictionary };

const DICTIONARIES: Record<Locale, Dictionary> = { en, vi, es, pt, ru };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

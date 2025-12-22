import { defaultLocale, locales, type Locale } from "./settings";

export function resolveLocale(preferred?: string | null): Locale {
  if (!preferred) {
    return defaultLocale;
  }

  const candidates = preferred
    .split(",")
    .map((part) => part.trim().split(";")[0]?.toLowerCase())
    .filter(Boolean) as string[];

  for (const candidate of candidates) {
    const base = candidate.split("-")[0] as Locale;

    if (locales.includes(base)) {
      return base;
    }
  }

  return defaultLocale;
}

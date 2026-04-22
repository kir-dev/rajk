import type { Lang } from "@/components/LanguageProvider";

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const getLocale = (lang: Lang) => (lang === "EN" ? "en-US" : "hu-HU");

// Extend this dictionary with your project's tags if needed
const TAG_LABELS: Record<string, { HU: string; EN: string }> = {
  research: { HU: "Kutatás", EN: "Research" },
  event: { HU: "Esemény", EN: "Event" },
  news: { HU: "Hír", EN: "News" },
};

export function translateTag(rawTag: string, lang: Lang): string {
  const key = rawTag.toLowerCase();
  const entry = TAG_LABELS[key];
  return entry ? entry[lang] : rawTag;
}

export function getTagRoute(rawTag: string, lang: Lang): string {
  const slug = rawTag.toLowerCase();
  return lang === "EN" ? `/en/tags/${slug}` : `/cimkek/${slug}`;
}

// Small helper for inline UI strings
export function t(lang: Lang, hu: string, en?: string) {
  return lang === "EN" ? en ?? hu : hu;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

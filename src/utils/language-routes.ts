{/*import { Lang } from "@/components/LanguageProvider";

type RouteMapping = {
  en: string;
  hu: string;
};

export const ROUTE_MAPPINGS: RouteMapping[] = [
  { en: "/about/institution", hu: "/rolunk/intezmeny" },
  { en: "/about/community", hu: "/rolunk/kozosseg" },
  { en: "/about/gallery", hu: "/rolunk/galeria" },
  { en: "/events", hu: "/esemenyek" },
  { en: "/academics", hu: "/szakma" },
  { en: "/admission", hu: "/felveteli" },
  { en: "/support", hu: "/tamogatas" },
  { en: "/awards", hu: "/dijak" },
];

export function getLanguageFromPath(path: string): Lang | null {
  for (const mapping of ROUTE_MAPPINGS) {
    if (path === mapping.en) return "EN";
    if (path === mapping.hu) return "HU";
  }
  return null;
}

export function getLocalizedPath(path: string, targetLang: Lang): string | null {
  for (const mapping of ROUTE_MAPPINGS) {
    if (targetLang === "EN" && path === mapping.hu) return mapping.en;
    if (targetLang === "HU" && path === mapping.en) return mapping.hu;
  }
  return null;
}
*/}
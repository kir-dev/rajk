import type { Lang } from "@/components/LanguageProvider";

export type NavSubItem = { label: string; href: string };
export type NavItem = {
  label: string;
  href: string;
  bordered?: boolean;
  subItems?: NavSubItem[];
};

export function getNavItems(lang: Lang): NavItem[] {
  const HU = lang === "HU";
  return [
    {
      label: HU ? "Rólunk" : "About",
      href: "/rolunk",
      subItems: [
        { label: HU ? "Intézmény" : "Institution", href: "/rolunk/intezmeny" },
        { label: HU ? "Közösség" : "Community", href: "/rolunk/kozosseg" },
        { label: HU ? "Galéria" : "Gallery", href: "/galeria" },
      ],
    },
    {
      label: HU ? "Szakma" : "Academics",
      href: "/szakma",
      /*subItems: [
        { label: HU ? 'Nemzetközi kapcsolataink' : 'Our international relations', href: '/szakma/nemzetkozi-kapcsolatok' },
      ],*/
    },
    { label: HU ? "Társasadalmi felelősségvállalás" : "Social Responsibility", href: "/social-responsibility" },
    {
      label: HU ? "Díjak" : "Awards",
      href: "/awards",
      subItems: [
        { label: "John von Neumann Award", href: "/awards/neumann" },
        { label: "Herbert Simon Award", href: "/awards/herbert" },
        { label: HU ? "Kaliforniától Budapestig" : "From California to Budapest", href: "/awards/california" },
      ],
    },
    { label: HU ? "Nemzetközi kapcsolatok" : "International Relations", href: "/international-relations" },
    { label: HU ? "Felvételi" : "Admission", href: "/felveteli", bordered: true },
    { label: HU ? "Támogatás" : "Support", href: "/tamogass", bordered: true },
  ];
}


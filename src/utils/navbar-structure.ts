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
      href: "/about/institution",
      subItems: [
        { label: HU ? "Intézmény" : "Institution", href: "/about/institution" },
        { label: HU ? "Közösség" : "Community", href: "/about/community" },
        { label: HU ? "Galéria" : "Gallery", href: "/about/gallery" },
      ],
    },
    {
      label: HU ? "Események" : "Events",
      href: "/events",
    },
    {
      label: HU ? "Szakma" : "Academics",
      href: "/academics",
      /*subItems: [
        { label: HU ? 'Nemzetközi kapcsolataink' : 'Our international relations', href: '/szakma/nemzetkozi-kapcsolatok' },
      ],*/
    },
    { label: HU ? "Társasadalmi felelősségvállalás" : "Social Responsibility", href: "https://szabokalmanprogram.hu/" },
    {
      label: HU ? "Díjak" : "Awards",
      href: "#",
      subItems: [
        { label: HU ? "Neumann János-díj" : "John von Neumann Award", href: "/awards/neumann-janos" /*href: "https://hu.wikipedia.org/wiki/Rajk_Szakkoll%C3%A9gium#Neumann_J%C3%A1nos-d%C3%ADj" */ },
        { label: HU ? "Herbert Simon-díj" : "Herbert Simon Award", href: "/awards/herbert-simon" /*href: "https://hu.wikipedia.org/wiki/Rajk_Szakkoll%C3%A9gium#Herbert_Simon-d%C3%ADj" */ },
        { label: HU ? "Andorka Rudolf-díj" : "Andorka Rudolf Award", href: "/awards/andorka-rudolf"},
      ],
    },
    { label: HU ? "Felvételi" : "Admission", href: "/admission", bordered: true },
    { label: HU ? "Támogatás" : "Support", href: "/support", bordered: true },
  ];
}


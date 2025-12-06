"use client";

import { Award as AwardIcon, Users, Trophy, Sparkles } from "lucide-react"
import {Award, Awardee} from "@/payload-types";
import Section from "@/components/Section";
import {useLanguage} from "@/components/LanguageProvider";
import { t } from "@/lib/utils";
import {getProgramDescription} from "@/lib/award-utils";
import {RichText} from "@payloadcms/richtext-lexical/react";

interface AwardAboutSectionProps {
    award: Award
}

export default function AwardAboutSection({ award } : AwardAboutSectionProps) {

    const awardees = award.awardees && (award.awardees as Awardee[]) || [];
    const numberOfNobelLaureates = awardees.filter(awardee => awardee.has_nobel).length;

    const statsHun = [
        {
            icon: AwardIcon,
            value: "1995",
            label: "Alapítás éve",
            description: "Magyarország",
        },
        {
            icon: Users,
            value: "28",
            label: "Díjazott",
            description: "tudós eddig",
        },
        {
            icon: Trophy,
            value: numberOfNobelLaureates.toString(),
            label: "Nobel-díjas",
            description: "a díjazottak közül",
        },
    ]

    const statsEn = statsHun;
    statsEn[0].label = "Founded in";
    statsEn[0].description = "Hungary";
    statsEn[1].label = "Awarded";
    statsEn[1].description = "scientists so far";
    statsEn[2].label = "Nobel laureates";
    statsEn[2].description = "among awardees";

    const { lang } = useLanguage();
    const stats = lang === "HU" ? statsHun : statsEn;

    const aboutTheProgramStr = getProgramDescription(lang)

    return (
        <Section id={"about"} title={"About"} className="py-24 px-4 border-t border-border">
            <div className="max-w-7xl mx-auto">
                {/* Award Description */}
                <div className="bg-card border border-border rounded-lg p-8 md:p-12 mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-background mb-4">{t(lang, "A díjról", "About the Award")}</h2>
                    <RichText data={lang == "HU" ? award.about : award.about_en} className="text-md text-background leading-relaxed" />
                </div>

                {/* About the Program */}
                <div className="bg-card border border-border rounded-lg p-8 md:p-12 mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-background mb-4">{t(lang, "A programról", "About the Program")}</h2>
                    <p className="text-md text-background leading-relaxed">
                        {aboutTheProgramStr}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border rounded-lg mb-16">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-card p-8 md:p-12 text-center md:text-left">
                            <stat.icon className="w-6 h-6 text-primary mb-4 mx-auto md:mx-0" />
                            <div className="text-4xl md:text-5xl font-bold text-background mb-2">{stat.value}</div>
                            <div className="text-lg text-background font-medium">{stat.label}</div>
                            <div className="text-sm text-muted-foreground">{stat.description}</div>
                        </div>
                    ))}
                </div>

                {/* Unique Feature Box */}
                <div className="bg-card border border-border rounded-lg p-8 md:p-12">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <Sparkles className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-background mb-2">{t(lang, "Miben egyedi?", "Why is it unique?")}</h2>
                            <p className="text-md text-muted-foreground">
                                {t(lang, `A díjazási folyamat, ami megkülönbözteti a ${award.name}at`, `The awarding process that sets the ${award.name} apart`)}
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-background">
                                {t(lang, "Hallgatói jelölés", "Student Nomination")}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {t(
                                    lang,
                                    "A Rajk Szakkollégium hallgatói maguk jelölhetik azokat a tudósokat, akiknek munkája meghatározó hatást gyakorolt az egzakt társadalomtudományok fejlődésére. Ez a megközelítés egyedülálló a tudományos díjak között.",
                                    "Students of the Rajk College can nominate scientists whose work has had a significant impact on the development of exact social sciences. This approach is unique among scientific awards."
                                )}
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-background">
                                {t(lang, "Demokratikus szavazás", "Democratic Voting")};
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {t(
                                    lang,
                                    "A jelöltek közül demokratikus szavazással választják ki a díjazottat. Ez a folyamat biztosítja, hogy a díj valóban azokat a tudósokat ismerje el, akik inspirálják a következő generációt.",
                                    "The awardee is selected through a democratic voting process among the nominees. This ensures that the award truly recognizes scientists who inspire the next generation."
                                )}

                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}

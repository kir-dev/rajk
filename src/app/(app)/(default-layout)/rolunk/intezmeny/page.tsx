// File: `src/app/(app)/(default-layout)/rolunk/intezmeny/page.tsx`
import { House, LibraryBig, ScrollText } from "lucide-react";
import IconTitle from "@/components/IconTitle";
import Timeline from "@/components/Intezmeny/Timeline";
import React from "react";
import Mukodes from "@/components/Intezmeny/Mukodes";
import Documents from "@/components/Intezmeny/Documents";
import getReportsGrouped from "@/payload-find/getReports";
import Section from "@/components/Section";
import VertNavBarLayout from "@/components/VertNavBarLayout";
import { cookies } from "next/headers";
import { t } from "@/lib/utils";
import type { Lang } from "@/components/LanguageProvider";

export default async function RolunkPage() {
    const cookieStore = await cookies();
    const cookieLang = cookieStore.get("lang")?.value;
    const lang: Lang = cookieLang === "EN" ? "EN" : "HU";
    // fetch server-side grouped reports
    const groups = await getReportsGrouped();

    // map groups -> Documents columns shape
    const columns = groups.map((g) => ({
        heading: g.topic,
        items: g.items.map((it) => ({
            title: it.title,
            href: it.link,
            targetBlank: true,
        })),
    }));

    return (
        <div>
            <div className="min-h-screen flex flex-col pb-40 bg-bezs text-black">
                <VertNavBarLayout>
                    <Section id={"tortenetunk"} title={"Történetünk"} lucideIconName={"LibraryBig"} className="w-full flex flex-col mt-20 items-center">
                        <IconTitle title={t(lang, "Történetünk", "Our history")} Icon={LibraryBig} />
                        <Timeline timeline={"about-timeline-event"} />
                    </Section>
                    <Section id={"onkormanyzatisag"} title={"Önkormányzatiság"} lucideIconName={"House"} className="w-full flex flex-col mt-20 items-center">
                        <IconTitle className="mt-20" title={"Önkormányzatiság"} Icon={House} />
                        <Mukodes lang={lang} />
                    </Section>
                    <Section id={"dokumentumok"} title={"Dokumentumok"} lucideIconName={"ScrollText"} className="w-full flex flex-col mt-20 items-center">
                        <IconTitle title={"Dokumentumok"} Icon={ScrollText} />
                        <Documents columns={columns} />
                    </Section>
                </VertNavBarLayout>
            </div>
        </div>
    );
}
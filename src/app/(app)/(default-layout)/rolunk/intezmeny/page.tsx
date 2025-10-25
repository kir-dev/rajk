import {LibraryBig} from "lucide-react";
import IconTitle from "@/components/IconTitle";
import Timeline from "@/components/Intezmeny/Timeline";
import React from "react";
import Mukodes from "@/components/Intezmeny/Mukodes";
import { cookies } from "next/headers";
import { t } from "@/lib/utils";
import type { Lang } from "@/components/LanguageProvider";

export default async function RolunkPage() {
    const cookieStore = await cookies();
    const cookieLang = cookieStore.get("lang")?.value;
    const lang: Lang = cookieLang === "EN" ? "EN" : "HU";

    return (
        <div>
            <div className="min-h-screen flex flex-col pb-40 pt-20 text-black px-2 sm:px-6">
                <IconTitle title={t(lang, "Történetünk", "Our history")} Icon={LibraryBig} />
                <Timeline timeline={"about-timeline-event"} />
                <Mukodes lang={lang}/>
            </div>
        </div>
    );
}
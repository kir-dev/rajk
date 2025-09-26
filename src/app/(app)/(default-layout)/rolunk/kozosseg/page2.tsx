import {LibraryBig} from "lucide-react";
import IconTitle from "@/components/IconTitle";
import Timeline from "@/components/Intezmeny/Timeline";
import React from "react";
import { cookies } from "next/headers";
import { t } from "@/lib/utils";
import type { Lang } from "@/components/LanguageProvider";

export const dynamic = "force-dynamic";

export default async function RolunkPage() {
    const cookieStore = cookies();
    const cookieLang = cookieStore.get("lang")?.value;
    const lang: Lang = cookieLang === "EN" ? "EN" : "HU";
    return (
        <div>
            <div className="min-h-screen flex flex-col pb-40 pt-20 bg-bezs text-black">
                <IconTitle title={t(lang, "Felvételi folyamat", "Admission process")} Icon={LibraryBig} />
                <Timeline timeline={"apply-timeline-event"} />
            </div>
        </div>
    );
}
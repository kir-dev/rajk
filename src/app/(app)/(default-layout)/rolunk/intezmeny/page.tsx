import {LibraryBig} from "lucide-react";
import IconTitle from "@/components/IconTitle";
import Timeline from "@/components/Intezmeny/Timeline";
import React from "react";
import Mukodes from "@/components/Intezmeny/Mukodes";

export default async function RolunkPage() {
    //const diakbizottsag = await getGroupMembers("Diákbizottság") || [];
    //const vezetoseg = await getGroupMembers("Vezetőség") || [];

    return (
        <div>
            <div className="min-h-screen flex flex-col pb-40 pt-20 text-black px-2 sm:px-6">
                <IconTitle title={"Történetünk"} Icon={LibraryBig} />
                <Timeline timeline={"about-timeline-event"} />
                <Mukodes/>
            </div>
        </div>
    );
}
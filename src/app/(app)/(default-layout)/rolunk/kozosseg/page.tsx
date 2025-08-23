import {House, LibraryBig} from "lucide-react";
import IconTitle from "@/components/IconTitle";
import Timeline from "@/components/Intezmeny/Timeline";
import Mukodes from "@/components/Intezmeny/Mukodes";
import PageTitle from "@/components/PageTitle/PageTitle";
import React from "react";

export default async function RolunkPage() {
    return (
        <div>
            <div className="min-h-screen flex flex-col pb-40 bg-bezs text-black">
                <IconTitle title={"Felvételi folyamat"} Icon={LibraryBig} />
                <Timeline timeline={"apply-timeline-event"} />
            </div>
        </div>
    );
}
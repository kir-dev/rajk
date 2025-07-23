import {HeartHandshake, LibraryBig, UsersRound} from "lucide-react";
import IconTitle from "@/components/IconTitle";
import Timeline from "@/components/Intezmeny/Timeline";
import MemberGrid from "@/components/MemberGrid";
import getGroupMembers from "@/payload-find/getDiakbizottsag";
import PageTitle from "@/components/PageTitle/PageTitle";
import React from "react";

export default async function RolunkPage() {
    const diakbizottsag = await getGroupMembers("Diákbizottság") || [];
    const vezetoseg = await getGroupMembers("Vezetőség") || [];

    return (
        <div>
            <PageTitle text = {"Intézmény"}/>
            <div className="min-h-screen flex flex-col pb-40 bg-bezs text-black">
                <IconTitle title={"Történetünk"} Icon={LibraryBig} />
                <Timeline timeline={"about-timeline-event"} />
                <div className="w-full flex flex-col mt-20 items-center">
                    <IconTitle title={"Diákbizottság"} Icon={UsersRound}/>
                    <MemberGrid members={diakbizottsag}/>
                </div>
                <div className="w-full flex flex-col mt-20 items-center">
                    <IconTitle title={"Vezetőség"} Icon={UsersRound}/>
                    <MemberGrid members={vezetoseg}/>
                </div>
                <div className="w-full flex flex-col mt-20 items-center">
                    <IconTitle title={"Támogatóink"} Icon={HeartHandshake}/>

                </div>
            </div>
        </div>
    );
}
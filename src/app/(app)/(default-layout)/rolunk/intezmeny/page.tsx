import {HeartHandshake, LibraryBig, PenTool, UsersRound} from "lucide-react";
import IconTitle from "@/components/IconTitle";
import Timeline from "@/components/Intezmeny/Timeline";
import Mukodes from "@/components/Intezmeny/Mukodes";
import Nevvalasztas from "@/components/Intezmeny/Nevvalasztas";
import MemberGrid from "@/components/MemberGrid";
import getGroupMembers from "@/payload-find/getDiakbizottsag";

export default async function RolunkPage() {
    const diakbizottsag = await getGroupMembers("Diákbizottság") || [];
    const vezetoseg = await getGroupMembers("Vezetőség") || [];

    return (
        <div className="min-h-screen flex flex-col pb-40 bg-bezs text-black">
            <IconTitle title={"Működésünk"} Icon={LibraryBig} />
            <Mukodes/>
            <div className="w-full bg-kek min-h-screen text-white text-center">
                <IconTitle title={"A névről"} Icon={PenTool} />
                <Nevvalasztas/>
            </div>
            <IconTitle title={"Történetünk"} Icon={LibraryBig} />
            <Timeline />
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
    );
}
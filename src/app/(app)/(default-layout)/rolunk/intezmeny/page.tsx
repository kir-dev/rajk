import {LibraryBig, PenTool} from "lucide-react";
import IconTitle from "@/components/IconTitle";
import Timeline from "@/components/Intezmeny/Timeline";
import Mukodes from "@/components/Intezmeny/Mukodes";
import Nevvalasztas from "@/components/Intezmeny/Nevvalasztas";

export default function RolunkPage() {


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
        </div>
    );
}
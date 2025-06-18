import {LibraryBig} from "lucide-react";
import IconTitle from "@/components/IconTitle";
import Timeline from "@/components/Intezmeny/Timeline";

export default async function RolunkPage() {
    return (
        <div className="min-h-screen flex flex-col pb-40 bg-bezs text-black">
            <IconTitle title={"Felvételi folyamat"} Icon={LibraryBig} />
            <Timeline />

        </div>
    );
}
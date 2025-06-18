import {Calendar, LibraryBig} from "lucide-react";
import IconTitle from "@/components/IconTitle";
import Timeline from "@/components/Intezmeny/Timeline";
import MyCarousel from "@/components/MyCarousel";
import getEvents from "@/payload-find/getEvents";

export default async function RolunkPage() {
    const data = await getEvents();
    return (
        <div className="min-h-screen flex flex-col pb-40 bg-bezs text-black">
            <IconTitle title={"Felvételi folyamat"} Icon={LibraryBig} />
            <Timeline />
            <IconTitle className="mt-20" title={"Események"} Icon={Calendar}/>
            <MyCarousel data={data}/>
        </div>
    );
}
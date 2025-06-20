import {Calendar, House, LibraryBig} from "lucide-react";
import IconTitle from "@/components/IconTitle";
import Timeline from "@/components/Intezmeny/Timeline";
import MyCarousel from "@/components/MyCarousel";
import getEvents from "@/payload-find/getEvents";
import Mukodes from "@/components/Intezmeny/Mukodes";

export default async function RolunkPage() {
    const data = await getEvents();
    return (
        <div className="min-h-screen flex flex-col pb-40 bg-bezs text-black">
            <IconTitle className="mt-20" title={"Bentlakás"} Icon={House}/>
            <Mukodes/>
            <IconTitle className="mt-20" title={"Események"} Icon={Calendar}/>
            <MyCarousel data={data}/>
            <IconTitle title={"Felvételi folyamat"} Icon={LibraryBig} />
            <Timeline />
        </div>
    );
}
import { LibraryBig } from "lucide-react";
import IconTitle from "@/components/IconTitle";
import getAboutTimelineEvents from "@/payload-find/getAboutTimelineEvents";
import {RichText} from "@payloadcms/richtext-lexical/react";
import Image from "next/image";

export default async function RolunkPage() {
    // Properly await the async function
    const eventsData = await getAboutTimelineEvents();
    const events = eventsData.docs || [];


    return (
        <div className="min-h-screen flex flex-col pb-40 bg-bezs text-black">
            <IconTitle title={"Történetünk"} Icon={LibraryBig} />
            <div className="container mx-auto relative py-12 px-4">
                {/* Vertical timeline line */}
                <div className="absolute left-1/2 -translate-x-1/2 bg-rajk-green w-2 h-full hidden md:block" />

                {/* Mobile timeline line */}
                <div className="absolute left-6 bg-rajk-green w-2 h-full md:hidden" />

                {/* Timeline content */}
                <div className="grid grid-cols-1 gap-16">
                    {events.map((event, index) => {
                        const isEven = index % 2 === 0;
                        const featuredImage = event.logo && typeof event.logo === "object"
                            ? event.logo
                            : null;

                        return (
                            <div key={event.id} className="grid grid-cols-1 md:grid-cols-9 items-center">
                                {/* Left side content (desktop only for even items) */}
                                <div className={`col-span-4 hidden ${isEven ? 'md:block' : ''}`}>
                                    <div className="bg-white rounded-2xl p-6 shadow-md relative">
                                        <p className="text-lg font-bold mb-4">
                                            {event.name}
                                        </p>
                                        <RichText data={event.description} className="text-md mb-4"/>
                                        <div className="absolute top-1/2 -right-10 w-10 h-2 bg-rajk-green" />
                                    </div>
                                </div>

                                {/* Timeline marker */}
                                <div className="col-span-1 col-start-5 relative flex md:justify-center justify-start pl-5 md:pl-0">
                                    <Image src={featuredImage?.url || "/placeholder.svg"}
                                           className="w-10 h-10 p-2 bg-rajk-green rounded-full border-4 border-rajk-blue"
                                           alt={event.name}
                                           width={24} height={24}
                                    />
                                </div>

                                {/* Right side content */}
                                <div className={`col-span-full md:col-span-4 md:col-start-6 pl-5 md:pl-0 ${isEven ? 'md:hidden' : ''}`}>
                                    <div className="bg-white rounded-2xl p-6 shadow-md relative">
                                        <p className="text-lg font-bold mb-4">
                                            {event.name}
                                        </p>
                                        <RichText data={event.description} className="text-md mb-4"/>
                                        <div className="absolute top-1/2 -left-10 w-10 h-2 bg-rajk-green hidden md:block" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
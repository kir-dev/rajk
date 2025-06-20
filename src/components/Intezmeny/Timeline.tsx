import {RichText} from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import getAboutTimelineEvents from "@/payload-find/getAboutTimelineEvents";

interface TimelineProps {
    timeline: ("about-timeline-event" | "apply-timeline-event")
}

export default async function Timeline(props: TimelineProps) {
    const eventsData = await getAboutTimelineEvents(props.timeline);
    const events = eventsData.docs || [];

    return (
    <div className="container mx-auto relative py-12 px-4">
        {/* Vertical timeline line */}
        <div className="absolute left-1/2 -translate-x-1/2 bg-rajk-green w-2 h-full hidden md:block" />

        {/* Mobile timeline line */}
        <div className="absolute left-6 bg-rajk-green w-2 h-full md:hidden" />

        {/* Timeline content */}
        <div className="grid grid-cols-1 gap-16">
            {events.map((event, index) => {
                const isEven = index % 2 === 0;
                let featuredImageUrl
                if ("logo" in event) {
                    const featuredImage = event.logo && typeof event.logo === "object"
                        ? event.logo
                        : null;
                    featuredImageUrl = featuredImage?.url || "/placeholder.svg";
                } else {
                    featuredImageUrl = "/calendar.svg";
                }

                // Extract month name from the date
                const date = new Date(event.date);
                const year = date.getFullYear();
                const monthName = date.toLocaleString('hu-HU', { month: 'long' });
                let displayedExtraText = "";
                if (props.timeline === "apply-timeline-event") {
                    displayedExtraText = `${monthName}`;
                } else if (props.timeline === "about-timeline-event") {
                    displayedExtraText = `${year}`;
                }

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
                            <Image src={featuredImageUrl}
                                   className="w-10 h-10 p-2 bg-rajk-green rounded-full border-4 border-rajk-blue"
                                   alt={event.name}
                                   width={24} height={24}
                            />
                            {/* Month name - only visible on desktop */}
                            <div className={`hidden md:block absolute text-rajk-green font-black text-2xl -translate-y-1/2 top-1/2 ${isEven ? 'left-30' : 'right-30'}`}>
                                {displayedExtraText}
                            </div>

                            {/* Month name for mobile */}
                            <div className="md:hidden absolute font-medium text-sm left-12 -translate-y-1/2 top-1/2">
                                {displayedExtraText}
                            </div>
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
    )
}
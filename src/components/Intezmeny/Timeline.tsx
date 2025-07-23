import {RichText} from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import getAboutTimelineEvents from "@/payload-find/getAboutTimelineEvents";
import {AboutTimelineEvent, ApplyTimelineEvent} from "@/payload-types";

interface TimelineProps {
    timeline: ("about-timeline-event" | "apply-timeline-event")
}

type TimelineEvent = AboutTimelineEvent | ApplyTimelineEvent;

// Props for mobile timeline item
interface TimelineItemProps {
    event: TimelineEvent;
    displayedExtraText: string;
    featuredImageUrl: string;
}

// Props for desktop timeline item (extends mobile props)
interface DesktopTimelineItemProps extends TimelineItemProps {
    isEven: boolean;
}

// Helper component for timeline items on mobile
function MobileTimelineItem({ event, displayedExtraText, featuredImageUrl }: TimelineItemProps) {
    return (
        <div className="flex flex-col md:hidden">
            {/* Timeline item header with icon and date */}
            <div className="flex items-center mb-4 relative pl-16">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Image
                        src={featuredImageUrl}
                        className="w-10 h-10 p-2 bg-rajk-green rounded-full border-4 border-rajk-blue"
                        alt={event.name}
                        width={24} height={24}
                    />
                </div>
                <span className="font-bold text-rajk-green text-xl">{displayedExtraText}</span>
            </div>

            {/* Content box */}
            <div className="bg-white rounded-2xl p-6 shadow-md ml-16 mb-8">
                <p className="text-lg font-bold mb-4">{event.name}</p>
                <RichText data={event.description} className="text-md mb-2"/>
            </div>
        </div>
    );
}

// Helper component for desktop timeline items
function DesktopTimelineItem({ event, displayedExtraText, featuredImageUrl, isEven }: DesktopTimelineItemProps) {
    return (
        <div className="hidden md:grid md:grid-cols-9 items-center">
            {/* Left content (for even items) */}
            <div className={`col-span-4 ${!isEven && 'invisible'}`}>
                <div className="bg-white rounded-2xl p-6 shadow-md relative">
                    <p className="text-lg font-bold mb-4">{event.name}</p>
                    <RichText data={event.description} className="text-md mb-4"/>
                    <div className="absolute top-1/2 -right-10 w-10 h-2 bg-rajk-green" />
                </div>
            </div>

            {/* Center marker */}
            <div className="col-span-1 flex justify-center relative">
                <Image
                    src={featuredImageUrl}
                    className="w-10 h-10 p-2 bg-rajk-green rounded-full border-4 border-rajk-blue z-50"
                    alt={event.name}
                    width={24} height={24}
                />
                <div className={`absolute text-rajk-green font-black text-2xl -translate-y-1/2 top-1/2 ${isEven ? 'left-16' : 'right-16'}`}>
                    {displayedExtraText}
                </div>
            </div>

            {/* Right content (for odd items) */}
            <div className={`col-span-4 ${isEven && 'invisible'}`}>
                <div className="bg-white rounded-2xl p-6 shadow-md relative">
                    <p className="text-lg font-bold mb-4">{event.name}</p>
                    <RichText data={event.description} className="text-md mb-4"/>
                    <div className="absolute top-1/2 -left-10 w-10 h-2 bg-rajk-green" />
                </div>
            </div>
        </div>
    );
}

export default async function Timeline(props: TimelineProps) {
    const eventsData = await getAboutTimelineEvents(props.timeline);
    const events = eventsData.docs || [];

    return (
        <div className="container mx-auto relative py-12 px-4">
            {/* Vertical timeline line - desktop */}
            <div className="absolute left-1/2 -translate-x-1/2 bg-rajk-green w-2 h-full hidden md:block" />

            {/* Mobile timeline line */}
            <div className="absolute left-4 bg-rajk-green w-2 h-full md:hidden" />

            {/* Timeline content */}
            <div className="flex flex-col gap-8 md:gap-16">
                {events.map((event, index) => {
                    const isEven = index % 2 === 0;
                    let featuredImageUrl;

                    if ("logo" in event) {
                        const featuredImage = event.logo && typeof event.logo === "object"
                            ? event.logo
                            : null;
                        featuredImageUrl = featuredImage?.url || "/placeholder.svg";
                    } else {
                        featuredImageUrl = "/calendar.svg";
                    }

                    // Extract date information
                    const date = new Date(event.date);
                    const year = date.getFullYear();
                    const monthName = date.toLocaleString('hu-HU', { month: 'long' });
                    const displayedExtraText = props.timeline === "apply-timeline-event"
                        ? monthName
                        : year.toString();

                    return (
                        <div key={event.id}>
                            <MobileTimelineItem
                                event={event}
                                displayedExtraText={displayedExtraText}
                                featuredImageUrl={featuredImageUrl}
                            />

                            <DesktopTimelineItem
                                event={event}
                                displayedExtraText={displayedExtraText}
                                featuredImageUrl={featuredImageUrl}
                                isEven={isEven}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
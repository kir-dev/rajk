import EventList from "@/components/Esemenyek/EventsList";
import NextEvent from "@/components/Esemenyek/NextEvent";
import Image from "next/image";
import EventArchive from "@/components/Esemenyek/EventArchive";
import { getPayload } from "payload";
import config from "@payload-config";

export default async function EventsPage() {
    const payload = await getPayload({ config });
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    // Fetch upcoming events (future)
    const upcomingResult = await payload.find({
        collection: "events",
        where: {
            date: {
                greater_than_equal: today.toISOString(),
            },
        },
        sort: "date",
    });
    const upcomingEvents = upcomingResult.docs;

    // Fetch recent past events (last 30 days)
    const recentPastResult = await payload.find({
        collection: "events",
        where: {
            and: [
                {
                    date: {
                        less_than: today.toISOString(),
                    },
                },
                {
                    date: {
                        greater_than_equal: thirtyDaysAgo.toISOString(),
                    },
                },
            ],
        },
        sort: "-date", // Most recent first
    });
    const recentPastEvents = recentPastResult.docs;

    // Fetch initial archive events (older than 30 days, limit 5)
    const archiveResult = await payload.find({
        collection: "events",
        where: {
            date: {
                less_than: thirtyDaysAgo.toISOString(),
            },
        },
        sort: "-date",
        limit: 5,
    });
    const archiveEvents = archiveResult.docs;

    // Upcoming events logic
    let nextEvent = null;
    let otherUpcomingEvents: typeof upcomingEvents = [];
    
    if (upcomingEvents.length > 0) {
        nextEvent = upcomingEvents[0];
        otherUpcomingEvents = upcomingEvents.slice(1);
    }

    return (
        <div className="min-h-screen py-20 px-4 bg-bezs w-full text-black">
            <div className="container mx-auto">
                <div className="text-3xl text-white font-bold mb-6 mt-15 p-4 w-full bg-zold rounded-lg flex">
                    <p className="self-center">Események</p>
                    <Image src={"/rajk_strucc_white.png"} alt={"Strucc"} width={60} height={60} className="ml-auto"/>
                </div>
                
                {/* Next Event Section */}
                {nextEvent && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">Következő eseményünk</h2>
                        <NextEvent event={nextEvent}/>
                    </div>
                )}

                {/* Other Upcoming Events Section */}
                {otherUpcomingEvents.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">Közelgő eseményeink</h2>
                        <EventList events={otherUpcomingEvents} baseHref="/esemenyek" />
                    </div>
                )}

                {/* Recent Past Events Section */}
                {recentPastEvents.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">Legutóbbi eseményeink</h2>
                        <EventList events={recentPastEvents} baseHref="/esemenyek" />
                    </div>
                )}

                {/* Archive Section */}
                <EventArchive initialEvents={archiveEvents} />
                
                {/* Fallback if no events at all */}
                {upcomingEvents.length === 0 && recentPastEvents.length === 0 && archiveEvents.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Jelenleg nincsenek megjeleníthető események.
                    </div>
                )}
            </div>
        </div>
    )
}
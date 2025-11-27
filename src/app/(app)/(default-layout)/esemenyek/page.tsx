import EventList from "@/components/Esemenyek/EventsList";
import getEvents from "@/payload-find/getEvents";
import NextEvent from "@/components/Esemenyek/NextEvent";
import Image from "next/image";

export default async function EventsPage() {
    const payloadEvents = await getEvents()
    let idxOfNextEvent = 0
    const today = new Date()
    for (const event of payloadEvents) {
        const eventDate = new Date(event.date)
        if (eventDate >= today) {
            break
        }
        idxOfNextEvent++
    }

    // Check if there are any upcoming events
    const hasUpcomingEvents = idxOfNextEvent < payloadEvents.length

    let nextEvent = null as typeof payloadEvents[0] | null
    let otherEvents = [] as typeof payloadEvents
    let sectionTitle = "Következő esemény"

    if (hasUpcomingEvents) {
        // Show upcoming events
        nextEvent = payloadEvents[idxOfNextEvent]
        otherEvents = payloadEvents.slice(idxOfNextEvent + 1)
    } else {
        // No upcoming events, show latest past events
        sectionTitle = "Legutóbbi esemény"
        if (payloadEvents.length > 0) {
            // Show events in reverse order (most recent first)
            const reversedEvents = [...payloadEvents].reverse()
            nextEvent = reversedEvents[0]
            otherEvents = reversedEvents.slice(1)
        }
    }

    return (
        <div className="min-h-screen py-20 px-4 bg-bezs w-full text-black">
            <div className="container mx-auto">
                <div className="text-3xl text-white font-bold mb-6 mt-15 p-4 w-full bg-rajk-green rounded-lg flex">
                    <p className="self-center">Események</p>
                    <Image src={"/rajk_strucc_white.png"} alt={"Strucc"} width={60} height={60} className="ml-auto"/>
                </div>
                <h2 className="text-2xl font-semibold mb-4">{sectionTitle}</h2>
                {nextEvent && (
                    <NextEvent event={nextEvent}/>
                    )
                }
                <EventList events={otherEvents} baseHref="/esemenyek" emptyLabel="Nincsenek elérhető események." />
            </div>
        </div>
    )
}
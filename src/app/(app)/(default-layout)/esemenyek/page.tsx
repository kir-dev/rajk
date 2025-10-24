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

    const nextEvent = payloadEvents[idxOfNextEvent]
    const otherEvents = payloadEvents.slice(idxOfNextEvent + 1)

    return (
        <div className="min-h-screen py-20 px-4 bg-bezs w-full text-black">
            <div className="container mx-auto">
                <div className="text-3xl font-bold mb-6 mt-15 p-4 w-full bg-rajk-green rounded-lg flex">
                    <p className="self-center">Események</p>
                    <Image src={"/rajk_strucc_black.png"} alt={"Strucc"} width={60} height={60} className="ml-auto"/>
                </div>
                <h2 className="text-2xl font-semibold mb-4">Következő esemény</h2>
                <NextEvent event={nextEvent} />
                <EventList events={otherEvents} baseHref="/esemenyek" emptyLabel="Nincsenek elérhető események." />
            </div>
        </div>
    )
}
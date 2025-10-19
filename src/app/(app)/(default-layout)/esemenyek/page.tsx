import EventList from "@/components/Esemenyek/EventsList";
import getEvents from "@/payload-find/getEvents";

const payloadEvents = await getEvents()

const events = payloadEvents;
console.log(payloadEvents);

export default function EventsPage() {
    return (
        <div className="min-h-screen py-10 px-4 bg-bezs w-full text-black">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-6 mt-15">Események</h1>
                <EventList events={events} baseHref="/esemenyek" emptyLabel="Nincsenek elérhető események." />
            </div>
        </div>
    )
}
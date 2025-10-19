import {getEventById} from "@/payload-find/getEvents";
import {RichText} from "@payloadcms/richtext-lexical/react";
import {CalendarDateCard} from "@/components/Esemenyek/CalendarDateCard";

export default async function EventDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const event = await getEventById(id);

    return (
        <div className="min-h-screen py-10 px-4 bg-bezs w-full text-black">
            <div className="mx-auto mt-20 mb-20 max-w-4xl flex flex-row gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-6 mt-15">{event.name}</h1>
                    <div className="rich-text-content w-full">
                        <RichText data={event.description} />
                    </div>
                    {event.date && (
                        <p className="mb-4">
                            <strong>Dátum:</strong> {new Date(event.date).toLocaleDateString()}
                        </p>
                    )}
                    {event.location && (
                        <p className="mb-4">
                            <strong>Helyszín:</strong> {event.location}
                        </p>
                    )}
                </div>
                <CalendarDateCard title={event.name} start={event.date}/>
            </div>
        </div>
    );

}
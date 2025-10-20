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
                    <a href={"/esemenyek"} className="bg-zold rounded-md p-3">Vissza az eseményekhez</a>
                    <h1 className="text-3xl font-bold mb-6 mt-15">{event.name}</h1>
                    <div className="rich-text-content w-full">
                        <RichText data={event.description} />
                    </div>
                </div>
                <CalendarDateCard title={event.name} start={event.date}/>
            </div>
        </div>
    );

}
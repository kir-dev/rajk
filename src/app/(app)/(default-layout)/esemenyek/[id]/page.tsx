import {getEventById} from "@/payload-find/getEvents";
import {RichText} from "@payloadcms/richtext-lexical/react";
import {CalendarDateCard} from "@/components/Esemenyek/CalendarDateCard";
import {isMedia} from "@/utils/isMedia";
import Image from "next/image";
import Link from "next/link";

export default async function EventDetails({
                                               params,
                                           }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const event = await getEventById(id);
    let pictureUrl = "";
    if (isMedia(event.picture)) {
        pictureUrl = event.picture.url || "";
    }

    return (
        <div className="min-h-screen py-10 px-4 bg-bezs w-full text-black">
            <div className="mx-auto mt-20 mb-20 max-w-4xl">
                <Link
                    href="/esemenyek"
                    className="inline-block bg-zold text-white rounded-md px-4 py-2 mb-6 hover:opacity-90 transition"
                >
                    Vissza az eseményekhez
                </Link>

                <div className="flex flex-col lg:flex-row gap-6 md:hidden">
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <CalendarDateCard title={event.name} start={event.date}/>
                    </div>

                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-6">{event.name}</h1>
                        <Image
                            src={pictureUrl}
                            alt="Event Image"
                            width={800}
                            height={400}
                            className="mb-6 rounded-lg w-full"
                        />
                        <div className="rich-text-content w-full">
                            <RichText data={event.description} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 max-md:hidden">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-6">{event.name}</h1>
                        <Image
                            src={pictureUrl}
                            alt="Event Image"
                            width={800}
                            height={400}
                            className="mb-6 rounded-lg w-full"
                        />
                        <div className="rich-text-content w-full">
                            <RichText data={event.description} />
                        </div>
                    </div>

                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <CalendarDateCard title={event.name} start={event.date}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
"use client";

import Image from "next/image";
import { Event } from "@/payload-types";
import Link from "next/link";
import {isMedia} from "@/utils/isMedia";
import {formatDateParts} from "@/components/Esemenyek/EventsList";

export type NextEventProps = {
    event: Event
};

export default function NextEvent({
                                      event
                                  }: NextEventProps) {
    let pictureUrl = "";
    if (isMedia(event.picture)) {
        pictureUrl = event.picture.url || "";
    }

    const date = formatDateParts(event.date)

    return (
        <Link
            href={`/esemenyek/${event.id}`}
            className="group flex cursor-pointer flex-col overflow-hidden transition mb-5 max-w-4xl mx-auto"
        >
            {/* Event image */}
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden">
                <Image
                    src={pictureUrl}
                    alt={event.name || "Event"}
                    fill
                    className="object-contain"
                    sizes="(min-width: 1280px) 896px, (min-width: 1024px) 80vw, (min-width: 640px) 90vw, 100vw"
                    quality={95}
                    priority={true}
                />
            </div>

            {/* Event info */}
            <div className="bg-[#06252e] px-5 py-4 text-white rounded-lg">
                <h3 className="text-lg font-medium leading-snug">{event.name}</h3>

                {event.speakers && (
                    <p className="mt-1 font-semibold text-white/90">{event.speakers}</p>
                )}

                <p className="mt-2 text-sm text-gray-300">
                    <span>{date.month} {date.day}, {date.year} • {date.time}</span>
                </p>
            </div>
        </Link>
    );
}
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
            className="group flex cursor-pointer flex-col overflow-hidden rounded-lg shadow-md transition hover:shadow-lg mb-5"
        >
            {/* Event image */}
            <div className="relative aspect-[16/9] w-full">
                <Image
                    src={pictureUrl}
                    alt={"Event"}
                    fill
                    className="object-cover"
                    // Desktop: card ≈ 33vw, tablet: 50vw, mobile: 100vw
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    quality={85}
                />
            </div>

            {/* Event info */}
            <div className="bg-[#06252e] px-5 py-4 text-white">
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
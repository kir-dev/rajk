"use client";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import {Event} from "@/payload-types";
import { Calendar, MapPin, User } from "lucide-react";
import {isMedia} from "@/utils/isMedia";

export function formatDateParts(iso: string) {
    const d = new Date(iso);
    const month = d.toLocaleString(undefined, { month: "short" }).toUpperCase();
    const day = d.getDate().toString().padStart(2, "0");
    const year = d.getFullYear();
    const time = d.toLocaleString(undefined, { hour: "numeric", minute: "2-digit" });
    return { month, day, year, time };
}

export default function EventList({
    events,
    baseHref = "/events",
    emptyLabel = "No upcoming events.",
}: {
    events: Event[];
    baseHref?: string;
    emptyLabel?: string;
}) {
    if (!events?.length) {
        return (
            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-12 text-center">
                <Calendar className="mb-4 h-12 w-12 text-neutral-300" />
                <p className="text-base font-medium text-neutral-400">{emptyLabel}</p>
            </div>
        );
    }

    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((ev) => (
                <li key={ev.id} className="h-full">
                    <EventCard event={ev} href={`${baseHref}/${ev.id}`} />
                </li>
            ))}
        </ul>
    );
}

export function EventCard({ event, href }: { event: Event; href: string }) {
    const date = useMemo(() => formatDateParts(event.date), [event.date]);

    return (
        <Link
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            href={href as any}
            className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:border-rajk-green/30 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-rajk-green/20"
        >
            {/* Thumbnail */}
            <div className="relative h-48 w-full overflow-hidden">
                {isMedia(event.picture) ? (
                    <Image
                        src={event.picture?.url ?? "/rajk_strucc_black.png"}
                        alt={event.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority={false}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-300">
                        <Calendar className="h-12 w-12" />
                    </div>
                )}
                {/* Date badge overlay */}
                <div className="absolute top-3 left-3 flex flex-col items-center justify-center rounded-lg bg-white/90 backdrop-blur-sm p-2 text-neutral-800 shadow-sm min-w-[60px]">
                    <div className="text-xs font-bold uppercase tracking-widest text-rajk-green">{date.month}</div>
                    <div className="text-2xl font-black leading-none">{date.day}</div>
                    <div className="text-xs font-semibold opacity-80">{date.year}</div>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow justify-between p-6">
                <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold leading-tight tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-rajk-green line-clamp-2">
                        {event.name}
                    </h3>

                    {/* Meta information */}
                    <div className="flex flex-col gap-2 text-sm text-neutral-600">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-rajk-green flex-shrink-0" />
                            <span>{date.year}, {date.month}, {date.day}, {date.time}</span>
                        </div>

                        {event.location && (
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-rajk-green flex-shrink-0" />
                                <span className="line-clamp-1">{event.location}</span>
                            </div>
                        )}
                        
                        {event.speakers && (
                            <div className="flex items-start gap-2 mt-1">
                                <User className="mt-0.5 h-4 w-4 flex-shrink-0 text-rajk-green" />
                                <span className="font-medium line-clamp-1">{event.speakers}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Read more indicator */}
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-rajk-green opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                    <span>Részletek</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}
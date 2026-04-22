"use client";

import { Event } from "@/payload-types";
import Link from "next/link";
import { formatDateParts } from "@/components/Esemenyek/EventsList";

export default function ArchiveEventCard({ event }: { event: Event }) {
  const { year, month, day } = formatDateParts(event.date);

  return (
    <Link
      href={`/esemenyek/${event.id}`}
      className="group flex items-center gap-4 rounded-lg border border-neutral-200 bg-white p-4 transition-all hover:border-rajk-green/30 hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="flex flex-col items-center justify-center rounded-md bg-neutral-100 px-3 py-2 text-neutral-600 group-hover:bg-rajk-green/10 group-hover:text-rajk-green transition-colors">
        <span className="text-xs font-bold uppercase">{month}</span>
        <span className="text-lg font-bold leading-none">{day}</span>
        <span className="text-[10px] opacity-80">{year}</span>
      </div>
      <div>
        <h3 className="font-semibold text-neutral-800 group-hover:text-rajk-green transition-colors">
          {event.name}
        </h3>
        {event.location && (
          <p className="text-sm text-neutral-500">{event.location}</p>
        )}
      </div>
    </Link>
  );
}

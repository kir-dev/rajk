"use client";

// --- Add-to-Calendar Date Card ---
import {useState} from "react";
import {MdKeyboardArrowUp, MdOutlineKeyboardArrowDown} from "react-icons/md";

export function CalendarDateCard({
                                     title,
                                     start,
                                     end,
                                     //timezone,
                                     location,
                                     description,
                                 }: {
    title: string;
    start: string; // ISO
    end?: string;  // ISO
    timezone?: string; // e.g. "Europe/Budapest"
    location?: string;
    description?: string;
}) {
    const d = new Date(start);
    const weekday = d.toLocaleString(undefined, { weekday: "long" });
    const month = d.toLocaleString(undefined, { month: "long" });
    const day = d.getDate();
    const year = d.getFullYear();
    const time = d.toLocaleString(undefined, { hour: "numeric", minute: "2-digit", hour12: false });
    const [downloadClicked, setDownloadClicked] = useState(false);

    function toICSDate(dt: Date) {
        // Convert to UTC basic format YYYYMMDDTHHmmssZ
        const pad = (n: number) => String(n).padStart(2, "0");
        return (
            dt.getUTCFullYear().toString() +
            pad(dt.getUTCMonth() + 1) +
            pad(dt.getUTCDate()) +
            "T" +
            pad(dt.getUTCHours()) +
            pad(dt.getUTCMinutes()) +
            pad(dt.getUTCSeconds()) +
            "Z"
        );
    }

    function downloadICS() {
        const uid = `${Date.now()}@example`;
        const dtStart = toICSDate(new Date(start));
        const dtEnd = toICSDate(new Date(end ?? new Date(new Date(start).getTime() + 60 * 60 * 1000)));
        //const tzLine = timezone ? `TZID:${timezone}` : "";

        const ics = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Your App//EN",
            "CALSCALE:GREGORIAN",
            "METHOD:PUBLISH",
            "BEGIN:VEVENT",
            `UID:${uid}`,
            `DTSTAMP:${toICSDate(new Date())}`,
            `DTSTART:${dtStart}`,
            `DTEND:${dtEnd}`,
            title ? `SUMMARY:${escapeICS(title)}` : "",
            description ? `DESCRIPTION:${escapeICS(description)}` : "",
            location ? `LOCATION:${escapeICS(location)}` : "",
            "END:VEVENT",
            "END:VCALENDAR",
        ]
            .filter(Boolean)
            .join("\r\n");

        const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${slugify(title || "event")}.ics`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }

    function googleCalendarUrl() {
        const params = new URLSearchParams({
            action: "TEMPLATE",
            text: title,
            dates: `${formatGoogleDate(start)}/${formatGoogleDate(
                end ?? new Date(new Date(start).getTime() + 60 * 60 * 1000).toISOString()
            )}`,
            details: description || "",
            location: location || "",
        });
        return `https://www.google.com/calendar/render?${params.toString()}`;
    }

    return (
        <div className="min-w-fit overflow-hidden rounded-lg md:rounded-xl border h-fit shadow-sm relative">
            <div className="flex items-center gap-1.5 md:gap-2 bg-neutral-200 px-2 py-1.5 md:px-4 md:py-3 text-neutral-900">
                <svg aria-hidden className="h-3.5 w-3.5 md:h-5 md:w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7m12 8H5v8h14v-8Z"/></svg>
                <button
                    className="font-semibold tracking-wide w-full text-[10px] md:text-base"
                    onClick={() => setDownloadClicked(!downloadClicked)}
                >
                    ADD TO CALENDAR
                </button>
                {downloadClicked ? (
                    <MdKeyboardArrowUp className="text-base md:text-xl flex-shrink-0" onClick={() => setDownloadClicked(!downloadClicked)} />
                ) : (
                    <MdOutlineKeyboardArrowDown className="text-base md:text-xl flex-shrink-0" onClick={() => setDownloadClicked(!downloadClicked)} />
                )}
            </div>
            {downloadClicked ? (
                <div className="flex flex-col items-center gap-1 md:gap-2 container p-1.5 md:p-3 z-50 absolute bg-neutral-50 text-neutral-900 shadow-lg border-x border-b rounded-b-lg md:rounded-b-xl">
                    <button onClick={downloadICS} className="underline decoration-dotted underline-offset-4 hover:bg-neutral-200 w-full py-1 md:py-1.5 rounded text-xs md:text-base">ICS</button>
                    <a href={googleCalendarUrl()} target="_blank" rel="noreferrer" className="underline decoration-dotted underline-offset-4 text-center hover:bg-neutral-200 w-full py-1 md:py-1.5 rounded text-xs md:text-base">Google</a>
                </div>
            ) : null}

            <div className="bg-zold px-3 py-2.5 md:px-6 md:py-5 text-center text-neutral-50">
                {/* Mobile: Single line compact format */}
                <div className="md:hidden">
                    <div className="text-2xl font-bold mb-1">{day}</div>
                    <div className="text-xs opacity-90">{month} {year}</div>
                    <div className="text-sm font-semibold mt-1.5">{time}</div>
                </div>

                {/* Desktop: Original multi-line format */}
                <div className="hidden md:block">
                    <div className="text-sm opacity-90">{weekday}</div>
                    <hr className="mx-auto my-2 w-32 border-rajk-blue" />
                    <div className="text-xl font-medium">{month}</div>
                    <div className="py-1.5 text-5xl font-bold leading-none">{day}</div>
                    <div className="text-xl opacity-90">{year}</div>
                    <hr className="mx-auto my-2 w-32 border-rajk-blue" />
                    <div className="text-lg font-semibold">{time}</div>
                </div>
            </div>
        </div>
    );
}

function escapeICS(input: string) {
    return input
        .replace(/\\/g, "\\\\")
        .replace(/\n/g, "\\n")
        .replace(/,/g, "\\,")
        .replace(/;/g, "\\;");
}

function slugify(s: string) {
    return s
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

function formatGoogleDate(iso: string) {
    const dt = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    return (
        dt.getUTCFullYear().toString() +
        pad(dt.getUTCMonth() + 1) +
        pad(dt.getUTCDate()) +
        "T" +
        pad(dt.getUTCHours()) +
        pad(dt.getUTCMinutes()) +
        pad(dt.getUTCSeconds()) +
        "Z"
    );
}

"use client";
import { useState, useEffect, useRef } from "react";
import { Event } from "@/payload-types";
import { Search, Loader2 } from "lucide-react";
import { getArchiveEvents } from "@/app/actions/getArchiveEvents";
import ArchiveEventCard from "@/components/Esemenyek/ArchiveEventCard";

// Simple debounce implementation
function useDebounceValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default function EventArchive({ initialEvents }: { initialEvents: Event[] }) {
    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedYear, setSelectedYear] = useState<number | "all">("all");
    const [hasMore, setHasMore] = useState(initialEvents.length >= 5); 
    const [isLoading, setIsLoading] = useState(false);
    const [offset, setOffset] = useState(initialEvents.length);

    const debouncedSearch = useDebounceValue(searchQuery, 500);

    // Track if it's the first run to avoid overriding initial data
    const isFirstRun = useRef(true);

    // Fetch events when filters change
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        const fetchFiltered = async () => {
            setIsLoading(true);
            try {
                // Reset offset when filters change
                const result = await getArchiveEvents(0, debouncedSearch, selectedYear);
                setEvents(result.events);
                setHasMore(result.hasMore);
                setOffset(result.events.length);
            } catch (error) {
                console.error("Failed to fetch archive events", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchFiltered();
    }, [debouncedSearch, selectedYear]);


    const loadMore = async () => {
        setIsLoading(true);
        try {
            const result = await getArchiveEvents(offset, debouncedSearch, selectedYear);
            setEvents((prev) => [...prev, ...result.events]);
            setHasMore(result.hasMore);
            setOffset((prev) => prev + result.events.length);
        } catch (error) {
            console.error("Failed to load more events", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Generate years for filter - hardcoded or dynamic?
    // Since we lazy load, we can't know all years from client data.
    // We should probably pass available years from server or just list recent years + "Older".
    // For now, let's generate a reasonable range or just keep it simple (e.g. 2020-2025).
    // Or better: The user said "querried based on the search conditions".
    // Let's just list the last 10 years dynamically.
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Korábbi eseményeink</h2>
            
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Keresés név alapján..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rajk-green/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                
                <select
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rajk-green/50 bg-white"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value === "all" ? "all" : parseInt(e.target.value))}
                >
                    <option value="all">Minden év</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                    <ArchiveEventCard key={event.id} event={event} />
                ))}
            </div>

            {events.length === 0 && !isLoading && (
                <div className="text-center py-8 text-gray-500">
                    Nincs a keresésnek megfelelő esemény.
                </div>
            )}

            {hasMore && (
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={loadMore}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                        {isLoading ? "Betöltés..." : "Továbbiak betöltése"}
                    </button>
                </div>
            )}
        </div>
    );
}

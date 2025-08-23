"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import BuildingSVG from "@/components/BuildingSVG";

interface HotspotData {
    id: string
    x: number
    y: number
    title: string
    description: string
}

const hotspots: HotspotData[] = [
    {
        id: "roof-right",
        x: 75,
        y: 15,
        title: "Diákbizottság",
        description: "felelős a Rajk mindennapi ügyeiért, koordinációjáért",
    },
    {
        id: "main-entrance",
        x: 55,
        y: 40,
        title: "Szakmai Munka Tanácsa",
        description: "felelős a szakmai rendszer megfelelő működéséért",
    },
    {
        id: "side-entrance",
        x: 75,
        y: 70,
        title: "Kollégiumi Gyűlés",
        description: "a kollégium legfontosabb döntési szerve. Évente négy alkalommal tartjuk meg, és az összes jelenlegi tag részt vesz rajta.",
    },
    {
        id: "ground-left",
        x: 25,
        y: 85,
        title: "Felvételi Bizottság",
        description: "felelős az új évfolyam felvételéért",
    },
]

export default function InteractiveBuilding() {
    const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null)

    return (
        <div className="relative w-full max-w-4xl bg-transparent rounded-lg">
            {/* Building Image */}
            <div className="relative aspect-square w-full">
                <BuildingSVG className={"h-full w-full"} />

                {/* Interactive Hotspots */}
                {hotspots.map((hotspot) => (
                    <div
                        key={hotspot.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        style={{
                            left: `${hotspot.x}%`,
                            top: `${hotspot.y}%`,
                        }}
                        onMouseEnter={() => setHoveredHotspot(hotspot.id)}
                        onMouseLeave={() => setHoveredHotspot(null)}
                    >
                        {/* Circle with Plus Icon */}
                        <div className="relative">
                            <div className="w-12 h-12 bg-slate-800 rounded-full border-4 border-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-slate-700  animate-bounce delay-1000">
                                <Plus className="w-6 h-6 text-white" strokeWidth={3} />
                            </div>

                            {/* Tooltip */}
                            {hoveredHotspot === hotspot.id && (
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                                    <div className="bg-slate-800 text-white px-4 py-3 rounded-lg shadow-xl min-w-48 max-w-64">
                                        <div className="font-semibold text-sm mb-1">{hotspot.title}</div>
                                        <div className="text-xs text-slate-300">{hotspot.description}</div>
                                        {/* Tooltip Arrow */}
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                                            <div className="border-4 border-transparent border-t-slate-800"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

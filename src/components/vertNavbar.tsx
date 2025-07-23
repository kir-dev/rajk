"use client"

import { useEffect, useState } from "react"
import cn from "@/utils/concatenate"
import { GraduationCap, UsersRound, Handshake } from "lucide-react"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"

const VertNavbar = () => {
    const [activeSection, setActiveSection] = useState("")
    const [activePillStyle, setActivePillStyle] = useState({ transform: 'translateY(0px)', opacity: 0 })

    useIntersectionObserver(setActiveSection)

    const sections = [
        { id: "rolunk", title: "Közösség", Icon: UsersRound },
        { id: "szakma", title: "Szakma", Icon: GraduationCap },
        { id: "tarsadalmi", title: "Társadalmi felelősség", Icon: Handshake },
    ]

    useEffect(() => {
        const activeIndex = sections.findIndex(s => s.id === activeSection)
        if (activeIndex !== -1) {
            // Each icon container is 48px tall (h-12)
            const newY = activeIndex * 48
            setActivePillStyle({ transform: `translateY(${newY}px)`, opacity: 1 })
        } else {
            // Hide the pill if no section is active
            setActivePillStyle({ transform: 'translateY(0px)', opacity: 0 })
        }
    }, [activeSection, sections])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <div className="fixed left-5 top-1/2 -translate-y-1/2 z-30">
            <div className="relative p-2 rounded-full bg-white/60 backdrop-blur-lg shadow-lg border border-white/30">
                {/* Sliding Pill Indicator */}
                <div
                    className="absolute top-2 left-2 w-10 h-10 bg-rajk-green/10 rounded-full transition-transform duration-500 ease-in-out"
                    style={{ transform: activePillStyle.transform, opacity: activePillStyle.opacity }}
                />

                {/* Navigation Icons */}
                <div className="relative z-10 flex flex-col space-y-2">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className="group relative flex items-center justify-center h-10 w-10 rounded-full"
                            aria-label={`Navigate to ${section.title}`}
                        >
                            <section.Icon
                                className={cn(
                                    "w-5 h-5 transition-colors duration-300",
                                    activeSection === section.id
                                        ? "text-rajk-green"
                                        : "text-gray-500 group-hover:text-rajk-green"
                                )}
                            />

                            {/* Tooltip Label */}
                            <div
                                className={cn(
                                    "absolute left-full ml-4 px-3 py-1.5 rounded-md shadow-md bg-white",
                                    "opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none",
                                    "whitespace-nowrap text-sm font-medium text-gray-700"
                                )}
                            >
                                {section.title}
                                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default VertNavbar
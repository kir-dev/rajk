"use client"

import { useEffect, useState } from "react"
import cn from "@/utils/concatenate"
import {GraduationCap, UsersRound, Handshake, Calendar, MapPin} from "lucide-react"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { useLanguage } from "@/components/LanguageProvider"
import { t } from "@/lib/utils"

// Define sections outside the component to prevent re-creation on each render
const sections = [
    //{ id: "video", title: "", Icon: "/rajk_strucc_black.png" },
    { id: "rolunk", Icon: UsersRound },
    { id: "szakma", Icon: GraduationCap },
    { id: "tarsadalmi", Icon: Handshake },
    { id: "events", Icon: Calendar },
    { id: "location", Icon: MapPin },
] as const

type SectionItem = typeof sections[number]

function assertUnreachable(x: never): never {
    void x
    throw new Error("Unexpected section id")
}

const VertNavbar = () => {
    const [activeSection, setActiveSection] = useState("")
    const [activePillStyle, setActivePillStyle] = useState({ transform: 'translateY(0px)', opacity: 0 })
    const { lang } = useLanguage()

    useIntersectionObserver(setActiveSection)

    useEffect(() => {
        const activeIndex = sections.findIndex(s => s.id === activeSection)
        if (activeIndex !== -1) {
            // Each nav item is now 48px tall with spacing
            const newY = activeIndex * 48
            setActivePillStyle({ transform: `translateY(${newY}px)`, opacity: 1 })
        } else {
            setActivePillStyle({ transform: 'translateY(0px)', opacity: 0 })
        }
    }, [activeSection])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    const getLabel = (s: SectionItem): string => {
        switch (s.id) {
            case "rolunk":
                return t(lang, "Közösség", "Community")
            case "szakma":
                return t(lang, "Szakma", "Academics")
            case "tarsadalmi":
                return t(lang, "Társadalmi felelősségvállalás", "Social Responsibility")
            case "events":
                return t(lang, "Események", "Events")
            case "location":
                return t(lang, "Helyszín", "Location")
            default:
                return assertUnreachable(s as never)
        }
    }

    return (
        <div className="fixed left-5 top-1/2 -translate-y-1/2 z-30">
            <div className="relative p-2 rounded-xl bg-white/60 backdrop-blur-lg shadow-lg border border-white/30">
                {/* Sliding Pill Indicator */}
                <div
                    className="absolute top-2 left-2 w-[calc(100%-16px)] h-10 bg-rajk-green/10 rounded-lg transition-transform duration-500 ease-in-out"
                    style={{ transform: activePillStyle.transform, opacity: activePillStyle.opacity }}
                />

                {/* Navigation Items with Icons and Text */}
                <div className="relative z-10 flex flex-col space-y-2">
                    {sections.map((section) => {
                        const label = getLabel(section)
                        return (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={cn(
                                    "group flex items-center h-10 px-3 rounded-lg transition-colors duration-300",
                                    activeSection === section.id
                                        ? "text-rajk-green"
                                        : "text-gray-500 hover:text-rajk-green"
                                )}
                                aria-label={t(lang, `Ugrás ide: ${label}`, `Navigate to ${label}`)}
                            >
                                {/* Section Title */}
                                <span className="text-sm font-medium whitespace-nowrap">
                                    {label}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default VertNavbar
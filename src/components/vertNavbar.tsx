"use client"

import { useEffect, useState } from "react"
import cn from "@/utils/concatenate";
import {GraduationCap, UsersRound, Handshake} from "lucide-react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

const TableOfContents = () => {
    const [activeSection, setActiveSection] = useState("")

    useIntersectionObserver(setActiveSection)

    useEffect(() => {
        console.log(`Active section: ${activeSection}`)
    }, [activeSection])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    const sections = [
        { id: "rolunk", title: "Közösség", Icon: UsersRound },
        { id: "szakma", title: "Szakma", Icon: GraduationCap },
        { id: "tarsadalmi", title: "Társadalmi felelősség", Icon: Handshake },
    ]

    return (
        <nav className="hidden md:block sticky top-1/2 self-start h-full z-20 pb-5 px-4 bg-bezs rounded-br-2xl">
            <ul className="flex flex-col justify-start h-full space-y-6 relative">
                <div className="sticky top-1/2 space-y-6 p-5 rounded-lg backdrop-blur-sm bg-black/20">
                    {sections.map((section) => (
                        <li key={section.id}>
                            <button
                                onClick={() => scrollToSection(section.id)}
                                className={cn(
                                    "transition-all duration-300 p-3 rounded-xl text-left flex items-center gap-3 hover:bg-white/10 w-full",
                                    activeSection === section.id
                                        ? "font-bold bg-white/20 shadow-lg transform scale-105"
                                        : "text-white/80",
                                )}
                            >
                                <section.Icon className={`w-6 h-6 ${activeSection === section.id ? 'text-rajk-green' : 'text-white/70'}`} />
                                <span>{section.title}</span>
                                {activeSection === section.id && (
                                    <div className="ml-auto w-2 h-2 rounded-full bg-rajk-green animate-pulse"></div>
                                )}
                            </button>
                        </li>
                    ))}
                </div>
            </ul>
        </nav>
    )
}

export default TableOfContents

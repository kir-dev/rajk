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
        { id: "kozosseg", title: "Közösség", Icon: UsersRound },
        { id: "szakma", title: "Szakma", Icon: GraduationCap },
        { id: "tarsadalmi", title: "Társadalmi felelősség", Icon: Handshake },
    ]

    return (
        <nav className="sticky top-1/2 self-start h-full justify-between z-20 pb-5">
            <ul className="flex flex-col justify-start h-full space-y-4 relative">
                <div className="sticky top-1/2 space-y-4 p-4 rounded-lg text-white">
                    {sections.map((section) => (
                        <li key={section.id} className="flex flex-row bg-rajk-purple rounded-2xl">
                            <button
                                onClick={() => scrollToSection(section.id)}
                                className={cn(
                                    "transition-colors pl-2 text-left text-foreground flex flex-col hover:text-blue-950",
                                    activeSection === section.id
                                        ? "font-bold text-lg"
                                        : "text-white",
                                )}
                            >
                                <section.Icon className="w-7 h-7 mr-2 rounded-2xl" />
                                {section.title}
                            </button>
                        </li>
                    ))}
                </div>
            </ul>
        </nav>
    )
}

export default TableOfContents

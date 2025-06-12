"use client"

import { useEffect, useState } from "react"
import cn from "@/utils/concatenate";
import {GraduationCap, UsersRound, Handshake} from "lucide-react";

const TableOfContents = () => {
    const [activeSection, setActiveSection] = useState("")

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { threshold: 0.3, rootMargin: "-10% 0px -90% 0px" },
        )

        document.querySelectorAll("section[id]").forEach((section) => {
            observer.observe(section)
        })

        return () => observer.disconnect()
    }, [])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    const sections = [
        { id: "kozosseg", title: "Közösség", Icon: UsersRound },
        { id: "szakma", title: "Szakma", Icon: GraduationCap },
        { id: "tarsadalmi", title: "Társadalmi felelősségvállalás", Icon: Handshake },
    ]

    return (
        <nav className="sticky top-1/2 self-start h-full justify-between z-20 pb-5">
            <ul className="flex flex-col justify-start h-full space-y-4 relative">
                <div className="bg-rajk-green sticky top-1/2 space-y-4 p-4 rounded-lg text-white">
                    {sections.map((section) => (
                        <li key={section.id} className="flex flex-row">
                            <section.Icon className="w-7 h-7 rounded-2xl text-white" />
                            <button
                                onClick={() => scrollToSection(section.id)}
                                className={cn(
                                    "text-sm transition-colors pl-2 border-l-2 text-left text-white",
                                    activeSection === section.id
                                        ? "text-[#022029] border-[#022029]"
                                        : "text-[#02202999] hover:text-[#022029cc] border-transparent",
                                )}
                            >
                                - {section.title}
                            </button>
                        </li>
                    ))}
                </div>
            </ul>
        </nav>
    )
}

export default TableOfContents

"use client"

import { useEffect, useState } from "react"
import cn from "@/utils/concatenate";

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
        { id: "kozosseg", title: "Közösség" },
        { id: "szakma", title: "Szakma" },
        { id: "tarsadalmi", title: "Társadalmi felelősségvállaás" },
    ]

    return (
        <nav className="sticky top-4 self-start p-4 backdrop-blur-md bg-white/30 rounded-lg shadow-lg h-full justify-between z-20">
            <ul className="flex flex-col justify-center h-full space-y-4">
                {sections.map((section) => (
                    <li key={section.id} className="">
                        <button
                            onClick={() => scrollToSection(section.id)}
                            className={cn(
                                "text-sm transition-colors pl-2 border-l-2 text-left",
                                activeSection === section.id
                                    ? "text-[#022029] border-[#022029]"
                                    : "text-[#02202999] hover:text-[#022029cc] border-transparent",
                            )}
                        >
                            {section.title}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default TableOfContents

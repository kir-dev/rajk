"use client"

import { useEffect, useState } from "react"
import cn from "@/utils/concatenate"
import { GraduationCap, UsersRound, Handshake } from "lucide-react"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"

const VertNavbar = () => {
    const [activeSection, setActiveSection] = useState("")
    const [scrollProgress, setScrollProgress] = useState(0)

    useIntersectionObserver(setActiveSection)

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight - windowHeight
            const scrollTop = window.scrollY
            const scrollPercentage = documentHeight > 0 ? scrollTop / documentHeight : 0
            setScrollProgress(Math.min(Math.max(scrollPercentage, 0), 1))
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        setTimeout(handleScroll, 100)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30">
            <div className="relative flex flex-col items-center p-4 rounded-2xl bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/40">
                {/* Glass card effect background */}
                <div className="absolute inset-0 rounded-2xl bg-rajk-green/5 backdrop-filter"></div>

                {/* Progress container */}
                <div className="relative z-10 flex flex-col items-center">
                    {/* Progress background */}
                    <div className="absolute h-[180px] w-1.5 bg-gray-200/50 rounded-full"></div>

                    {/* Progress fill */}
                    <div
                        className="absolute top-0 w-1.5 bg-rajk-green rounded-full transition-all duration-150 ease-out"
                        style={{ height: `${scrollProgress * 100}%` }}
                    ></div>

                    {/* Section navigation dots */}
                    <div className="relative h-[180px] flex flex-col justify-between py-2">
                        {sections.map((section, index) => {
                            const position = index / (sections.length - 1);

                            return (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className="group flex items-center"
                                    aria-label={`Navigate to ${section.title}`}
                                >
                                    {/* Dot indicator */}
                                    <div
                                        className={cn(
                                            "w-4 h-4 rounded-full border-2 transition-all duration-300",
                                            position <= scrollProgress
                                                ? "border-rajk-green bg-rajk-green"
                                                : "border-gray-300 bg-white",
                                            activeSection === section.id ? "scale-125 ring-2 ring-rajk-green/30" : ""
                                        )}
                                    ></div>

                                    {/* Section label */}
                                    <div
                                        className={cn(
                                            "ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300",
                                            "whitespace-nowrap bg-white/90 py-1.5 px-3 rounded-lg shadow-md",
                                            activeSection === section.id ? "text-rajk-green font-medium" : "text-gray-600"
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            <section.Icon className={`w-4 h-4 ${activeSection === section.id ? "text-rajk-green" : "text-gray-500"}`} />
                                            <span>{section.title}</span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VertNavbar
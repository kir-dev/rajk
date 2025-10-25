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
            const [isOpen, setIsOpen] = useState(false)
            const { lang } = useLanguage()

            useIntersectionObserver(setActiveSection)

            useEffect(() => {
                const activeIndex = sections.findIndex(s => s.id === activeSection)
                if (activeIndex !== -1) {
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
                <>
                    {/* Mobile Toggle Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "md:hidden fixed top-1/2 -translate-y-1/2 z-30 bg-white/60 backdrop-blur-lg shadow-lg border border-white/30 p-2 transition-all duration-300 text-black rounded-r-full",
                            isOpen ? "left-[4.8rem]" : "left-0"
                        )}
                        aria-label="Toggle navigation"
                    >
                        {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
                    </button>

                    {/* Navbar */}
                    <div className={cn(
                        "fixed top-1/2 -translate-y-1/2 z-30 transition-all duration-300 ease-in-out",
                        "md:left-5",
                        isOpen ? "left-5" : "-left-full"
                    )}>
                        <div className="relative p-2 rounded-full bg-white/60 backdrop-blur-lg shadow-lg border border-white/30">
                            <div
                                className="absolute top-2 left-2 w-10 h-10 bg-rajk-green/10 rounded-full transition-transform duration-500 ease-in-out"
                                style={{ transform: activePillStyle.transform, opacity: activePillStyle.opacity }}
                            />

                            <div className="relative z-10 flex flex-col space-y-2">
                                {sections.map((section) => (
                                    const label = getLabel(section)
                                    return (
                                    <button
                                    key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className="group relative flex items-center justify-center h-10 w-10 rounded-full"
                                aria-label={`Navigate to ${section.title}`}
                            >
                                {section.Icon && typeof section.Icon === "string" ? (
                                    <Image
                                        width={200}
                                        height={200}
                                        src={section.Icon}
                                        alt={section.title}
                                        className={cn(
                                            "w-10 h-10 transition-opacity duration-300",
                                            activeSection === section.id
                                                ? "opacity-100"
                                                : "opacity-50 group-hover:opacity-100"
                                        )}
                                    />
                                ) : (
                                    <section.Icon
                                        className={cn(
                                            "w-5 h-5 transition-colors duration-300",
                                            activeSection === section.id
                                                ? "text-rajk-green"
                                                : "text-gray-500 group-hover:text-rajk-green"
                                        )}
                                    />
                                )}

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
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )
        }

        export default VertNavbar
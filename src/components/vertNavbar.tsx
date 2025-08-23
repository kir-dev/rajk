"use client"

import {useEffect, useState} from "react"
import cn from "@/utils/concatenate"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import Image from "next/image";
import {SectionLabelProps} from "@/components/Section";
import {DynamicLucideIcon} from "@/components/DynamicLucideIcon";

// Define sections outside the component to prevent re-creation on each render
/*
const sections = [
    { id: "video", title: "", Icon: "/rajk_strucc_black.png" },
    { id: "rolunk", title: "Közösség", Icon: UsersRound },
    { id: "szakma", title: "Szakma", Icon: GraduationCap },
    { id: "tarsadalmi", title: "Társadalmi érzékenység", Icon: Handshake },
    { id: "events", title: "Események", Icon: Calendar },
    { id: "location", title: "Elérhetőség", Icon: MapPin },
]
*/

export function VertNavbar({sections}: { sections: SectionLabelProps[] }) {
    const [activeSection, setActiveSection] = useState("")
    const [activePillStyle, setActivePillStyle] = useState({transform: 'translateY(0px)', opacity: 0})
    
    useIntersectionObserver(setActiveSection)
    
    
    useEffect(() => {
        const activeIndex = sections.findIndex(s => s.id === activeSection)
        if (activeIndex !== -1) {
            // Each nav item is now 48px tall with spacing
            const newY = activeIndex * 48
            setActivePillStyle({transform: `translateY(${newY}px)`, opacity: 1})
        } else {
            setActivePillStyle({transform: 'translateY(0px)', opacity: 0})
        }
    }, [activeSection])
    
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({behavior: "smooth", block: "start"})
        }
        setActiveSection(id)
    }
    
    return (
        <div className = {cn(
            "fixed top-1/2 z-30 -translate-y-1/2 transition-transform duration-500 ease-in-out",
            activeSection === "video" ? "-translate-x-60" : "translate-x-0",
            "left-5" // marad mindig a bal oldalon
        )}>
            <div
                className = "relative p-2 rounded-xl bg-white/60 backdrop-blur-lg shadow-lg border border-white/30 group">
                {/* Sliding Pill Indicator */}
                <div
                    className = "absolute top-2 left-2 w-[calc(100%-16px)] h-10 bg-rajk-green/10 rounded-lg transition-transform duration-500 ease-in-out"
                    style = {{transform: activePillStyle.transform, opacity: activePillStyle.opacity}}
                />
                
                {/* Navigation Items with Icons and Text */}
                <div className = "relative z-10 flex flex-col space-y-2 ">
                    {sections.map((section) => (
                        <button
                            key = {section.id}
                            onClick = {() => scrollToSection(section.id)}
                            className = {cn(
                                "group flex items-center h-10 px-2 rounded-lg transition-colors duration-300",
                                activeSection === section.id
                                    ? "text-rajk-green"
                                    : "text-gray-500 hover:text-rajk-green"
                            )}
                            aria-label = {`Navigate to ${section.title}`}
                        >
                            {/* Icon/Image */}
                            <div className = "flex items-center justify-center h-5">
                                {section.lucideIconName &&
                                    (section.lucideIconName!.startsWith("/") ? (
                                            <Image
                                                width = {50}
                                                height = {50}
                                                src = {section.lucideIconName}
                                                alt = ""
                                                className = {cn(
                                                    "w-5 h-5 transition-opacity duration-300 mx-1",
                                                    activeSection === section.id
                                                        ? "opacity-100"
                                                        : "opacity-60 group-hover:opacity-100"
                                                )}
                                            />
                                        ) : (
                                            <DynamicLucideIcon
                                                iconName = {section.lucideIconName || ""}
                                                className = "w-5 h-5 mx-0.5"
                                            />
                                        )
                                    )
                                }
                            </div>
                            
                            {/* Section Title */}
                            <span
                                className = "text-sm font-medium inline-block max-w-0 opacity-0 transition-all duration-500 ease-in-out ml-0 group-hover:max-w-xs group-hover:ml-2 group-hover:opacity-100 text-nowrap"
                            >
                                {section.title}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default VertNavbar

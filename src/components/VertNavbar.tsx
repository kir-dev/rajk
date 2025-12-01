'use client';

import { useEffect, useState, useMemo } from "react"
import cn from "@/utils/concatenate"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import Image from "next/image";
import { SectionLabelProps } from "@/components/Section";
import { DynamicLucideIcon } from "@/components/DynamicLucideIcon";
import { ChevronLeft, ChevronRight } from "lucide-react";

const defSections: SectionLabelProps[] = [
  { id: "video", title: "", lucideIconName: "/rajk_strucc_black.png" },
  { id: "rolunk", title: "Közösség", lucideIconName: "UsersRound" },
  { id: "szakma", title: "Szakma", lucideIconName: "GraduationCap" },
  { id: "tarsadalmi", title: "Társadalmi felelősségvállalás", lucideIconName: "Handshake" },
  { id: "events", title: "Események", lucideIconName: "Calendar" },
  { id: "location", title: "Elérhetőség", lucideIconName: "MapPin" },
]

export function VertNavbar({ sections }: { sections?: SectionLabelProps[] }) {
  // keep a stable reference for sections (use provided or defaults)
  const localSections = useMemo(() => sections ?? defSections, [sections])

  const [activeSection, setActiveSection] = useState("")
  const [activePillStyle, setActivePillStyle] = useState({ transform: "translateY(0px)", opacity: 0 })
  const [isOpen, setIsOpen] = useState(false)

  useIntersectionObserver(setActiveSection)

  useEffect(() => {
    const activeIndex = localSections.findIndex(s => s.id === activeSection)
    const newY = activeIndex !== -1 ? activeIndex * 48 : 0
    const newOpacity = activeIndex !== -1 ? 1 : 0
    const newTransform = `translateY(${newY}px)`

    // only update state when values actually change to avoid infinite loops
    setActivePillStyle(prev => {
      if (prev.transform === newTransform && prev.opacity === newOpacity) return prev
      return { transform: newTransform, opacity: newOpacity }
    })
  }, [activeSection, localSections])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setActiveSection(id)
    // when navigating from mobile, close the panel
    setIsOpen(false)
  }

  return (
    <>
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

      <div
        className={cn(
          "fixed top-1/2 z-30 -translate-y-1/2 transition-transform duration-500 ease-in-out left-5",
          // mobile: hidden by default, slide in when isOpen
          isOpen ? "translate-x-0" : "-translate-x-60",
          // desktop: keep existing scroll-based behavior
          activeSection === "video" ? "md:-translate-x-60" : "md:translate-x-0"
        )}
      >
        <div className="relative p-2 rounded-xl bg-white/60 backdrop-blur-lg shadow-lg border border-white/30 group">
          <div
            className="absolute top-2 left-2 w-[calc(100%-16px)] h-10 bg-rajk-green/10 rounded-lg transition-transform duration-500 ease-in-out"
            style={{ transform: activePillStyle.transform, opacity: activePillStyle.opacity }}
          />

          <div className="relative z-10 flex flex-col space-y-2">
            {localSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "group flex items-center h-10 px-2 rounded-lg transition-colors duration-300",
                  activeSection === section.id ? "text-rajk-green" : "text-gray-800 hover:text-rajk-green"
                )}
                aria-label={`Navigate to ${section.title}`}
              >
                <div className="flex items-center justify-center h-5">
                  {section.lucideIconName &&
                    (section.lucideIconName!.startsWith("/") ? (
                      <Image
                        width={50}
                        height={50}
                        src={section.lucideIconName}
                        alt=""
                        className={cn(
                          "w-5 h-5 transition-opacity duration-300 mx-1",
                          activeSection === section.id ? "opacity-100" : "opacity-60 group-hover:opacity-100"
                        )}
                      />
                    ) : (
                      <DynamicLucideIcon iconName={section.lucideIconName || ""} className="w-5 h-5 mx-0.5" />
                    ))
                  }
                </div>

                <span
                  className="text-sm font-medium inline-block max-w-0 opacity-0 transition-all duration-500 ease-in-out ml-0 md:group-hover:max-w-xs md:group-hover:ml-3 md:group-hover:opacity-100 whitespace-nowrap"
                >
                  {section.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default VertNavbar
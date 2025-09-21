// src/hooks/useIntersectionObserver.ts
"use client"

import { useEffect } from "react"

const useIntersectionObserver = (setActiveSection: (id: string) => void) => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { threshold: 0.4 }
        )

        const sections = document.querySelectorAll("section[id]")
        console.log(`Sections found: ${sections.length}`)
        sections.forEach((section) => observer.observe(section))

        return () => {
            sections.forEach((section) => observer.unobserve(section))
            observer.disconnect()
        }
    }, [setActiveSection])
}

export default useIntersectionObserver
// src/hooks/useIntersectionObserver.ts
"use client"

import {useEffect} from "react"

const useIntersectionObserver = (setActiveSection: (id: string) => void) => {
    useEffect(() => {
        const observer = new IntersectionObserver(() => {
            const sections = document.querySelectorAll<HTMLElement>("section[id]")
            
            // Legalább 40%-ban látható szekciók
            const visibleSections = Array.from(sections).filter(section => {
                const rect = section.getBoundingClientRect()
                const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
                return visibleHeight / rect.height >= 0.5
            })
            
            if (visibleSections.length === 0) return
            
            // A legfelső látható szekció
            const topMost = visibleSections.reduce((prev, curr) =>
                curr.getBoundingClientRect().top < prev.getBoundingClientRect().top ? curr : prev
            )
            
            setActiveSection(topMost.id)
        }, {
            threshold: Array.from({length: 101}, (_, i) => i / 100)
        })
        
        const sections = document.querySelectorAll<HTMLElement>("section")
        console.log("Sections to observe:", Array.from(sections).map(s => s.id))
        sections.forEach((section) => observer.observe(section))
        
        return () => {
            sections.forEach((section) => observer.unobserve(section))
            observer.disconnect()
        }
    }, [setActiveSection])
}

export default useIntersectionObserver

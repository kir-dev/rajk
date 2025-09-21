"use client"

import { useEffect, useState } from "react"

interface ScrollProgressLineProps {
    position?: "left" | "right"
    width?: number
    color?: string
    backgroundColor?: string
}

export default function ScrollProgressLine({
                                               position = "left",
                                               width = 4,
                                               color = "#000000",
                                               backgroundColor = "#e5e5e5",
                                           }: ScrollProgressLineProps) {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const scrollPosition = window.scrollY
            const progress = (scrollPosition / totalHeight) * 100
            setScrollProgress(progress)
        }

        // Initial calculation
        handleScroll()

        // Add scroll event listener
        window.addEventListener("scroll", handleScroll, { passive: true })

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <div className="bg-rajk-green sticky">
            <div
                className="fixed top-0 bottom-0 z-50"
                style={{
                    [position]: "20px",
                    width: `${width}px`,
                    backgroundColor,
                }}
            >
                <div
                    className="absolute bottom-0 w-full"
                    style={{
                        height: `${scrollProgress}%`,
                        backgroundColor: color,
                        transition: "height 0.1s",
                    }}
                />
            </div>
        </div>
    )
}

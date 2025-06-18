"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import Image from "next/image"
import ActionButton from "@/components/ActionButton";
import {Event, Media} from "@/payload-types"

interface MultiImageCarouselProps {
    events: Event[]
}

export default function MultiImageCarousel(props: MultiImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isHovered, setIsHovered] = useState(false)
    const [imagesPerView, setImagesPerView] = useState(4)
    const events = props.events || []

    //const images = events.map(event => event.picture).flat().filter(image => image !== null && typeof image !== "number");

    // Responsive images per view
    useEffect(() => {
        const updateImagesPerView = () => {
            if (window.innerWidth < 640) {
                setImagesPerView(1)
            } else if (window.innerWidth < 768) {
                setImagesPerView(2)
            } else if (window.innerWidth < 1024) {
                setImagesPerView(3)
            } else if (window.innerWidth < 1280) {
                setImagesPerView(4)
            } else {
                setImagesPerView(5)
            }
        }

        updateImagesPerView()
        window.addEventListener("resize", updateImagesPerView)
        return () => window.removeEventListener("resize", updateImagesPerView)
    }, [])

    const maxIndex = Math.max(0, events.length - imagesPerView)

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex >= maxIndex) {
                return 0 // Loop back to start
            }
            return prevIndex + 1
        })
    }, [maxIndex])

    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex <= 0) {
                return maxIndex // Loop to end
            }
            return prevIndex - 1
        })
    }, [maxIndex])

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    // Auto-play functionality
    useEffect(() => {
        if (isPlaying && !isHovered) {
            const interval = setInterval(nextSlide, 3000)
            return () => clearInterval(interval)
        }
    }, [isPlaying, isHovered, nextSlide])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") {
                prevSlide()
            } else if (event.key === "ArrowRight") {
                nextSlide()
            } else if (event.key === " ") {
                event.preventDefault()
                togglePlayPause()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [nextSlide, prevSlide])

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <div className="relative z-10 p-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">Image Gallery</h1>
                <p className="text-slate-300 text-lg">Discover beautiful moments captured in time</p>
            </div>

            {/* Main carousel container */}
            <div
                className="relative w-full overflow-hidden group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Images container */}
                <div className="relative h-[60vh] md:h-[70vh]">
                    <div
                        className="flex transition-transform duration-1000 ease-in-out h-full"
                        style={{
                            transform: `translateX(-${(currentIndex * 100) / imagesPerView}%)`,
                            width: `${(events.length * 100) / imagesPerView}%`,
                        }}
                    >
                        {events.map((event, index) => (
                            <div key={index} className="relative flex-shrink-0 px-2" style={{ width: `${100 / events.length}%` }}>
                                <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                                    <Image
                                        src={(event.picture as Media).url || "/placeholder.svg"}
                                        alt={(event.picture as Media).alt}
                                        fill
                                        className="object-cover"
                                        priority={index < imagesPerView}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                                        <p className="text-sm text-slate-200">{event.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation arrows */}
                    <ActionButton
                        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border-white/20 text-white shadow-2xl backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                        onClick={prevSlide}
                        aria-label="Previous images"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </ActionButton>

                    <ActionButton
                        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border-white/20 text-white shadow-2xl backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                        onClick={nextSlide}
                        aria-label="Next images"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </ActionButton>

                    {/* Play/Pause button */}
                    <ActionButton
                        className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 border-white/20 text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110"
                        onClick={togglePlayPause}
                        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                    >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </ActionButton>

                    {/* Auto-play indicator */}
                    {isPlaying && (
                        <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            Auto-playing
                        </div>
                    )}

                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                        <div
                            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-100 ease-linear"
                            style={{
                                width: isPlaying && !isHovered ? "100%" : "0%",
                                transitionDuration: isPlaying && !isHovered ? "3000ms" : "100ms",
                            }}
                        />
                    </div>
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center items-center gap-3 p-8">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                        <button
                            key={index}
                            className={`transition-all duration-300 rounded-full ${
                                index === currentIndex ? "w-8 h-3 bg-white" : "w-3 h-3 bg-white/40 hover:bg-white/60"
                            }`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Image counter and info */}
                <div className="text-center pb-8">
                    <div className="text-white/80 text-lg mb-2">
                        Showing {Math.min(imagesPerView, events.length - currentIndex)} of {events.length} images
                    </div>
                    <div className="text-white/60 text-sm">
                        Use arrow keys to navigate • Spacebar to play/pause • Hover to pause
                    </div>
                </div>
            </div>

            {/* Responsive indicator */}
            <div className="fixed bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                {imagesPerView} per view
            </div>
        </div>
    )
}

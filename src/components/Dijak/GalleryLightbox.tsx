"use client"

import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { GalleryImage } from "@/components/Dijak/AwardAwardeesSection"
import Image from "next/image";

interface GalleryLightboxProps {
    images: GalleryImage[]
    initialIndex?: number
    onClose: () => void
}

export function GalleryLightbox({ images, initialIndex = 0, onClose }: GalleryLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowLeft") setCurrentIndex((i) => (i > 0 ? i - 1 : images.length - 1))
            if (e.key === "ArrowRight") setCurrentIndex((i) => (i < images.length - 1 ? i + 1 : 0))
        }
        window.addEventListener("keydown", handleKeyDown)
        document.body.style.overflow = "hidden"
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = ""
        }
    }, [images.length, onClose])

    const currentImage = images[currentIndex]

    return (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
                aria-label="Bezárás"
            >
                <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={() => setCurrentIndex((i) => (i > 0 ? i - 1 : images.length - 1))}
                        className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors z-10"
                        aria-label="Előző kép"
                    >
                        <ChevronLeft className="w-10 h-10" />
                    </button>
                    <button
                        onClick={() => setCurrentIndex((i) => (i < images.length - 1 ? i + 1 : 0))}
                        className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
                        aria-label="Következő kép"
                    >
                        <ChevronRight className="w-10 h-10" />
                    </button>
                </>
            )}

            {/* Image */}
            <div className="max-w-5xl max-h-[80vh] px-16">
                <Image
                    src={currentImage.src || "/placeholder.svg"}
                    alt={currentImage.alt}
                    width={700}
                    height={700}
                    className="max-w-full max-h-[70vh] object-contain mx-auto"
                />
                {currentImage.caption && <p className="text-center text-white/80 mt-4 text-sm">{currentImage.caption}</p>}
            </div>

            {/* Dots */}
            {images.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={cn(
                                "w-2 h-2 rounded-full transition-colors",
                                index === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/60",
                            )}
                            aria-label={`${index + 1}. kép`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

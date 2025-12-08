"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Play } from "lucide-react"
import Section from "@/components/Section";
import {Award} from "@/payload-types";
import React from "react";

interface AwardHeroSectionProps {
    award: Award;
}

export default function íAwardHeroSection({ award }: AwardHeroSectionProps) {
    const scrollToLatest = () => {
        document.getElementById("awardees")?.scrollIntoView({ behavior: "smooth" })
    }

    const awardName = award.name;

    return (
        <Section id={"hero"} title={"Hero"} className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Video Background Placeholder */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-background/80 z-10" />
                <iframe
                    src="https://www.youtube.com/embed/IW8xtoDKA6w?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="aspect-video w-full max-w-full h-full object-cover opacity-90"
                />
                {/* Fallback image if video doesn't load */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ // TODO: Replace with award.heroImage when available
                        backgroundImage: `url('/academic-ceremony-university-prestigious-award.jpg')`,
                    }}
                />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-primary/20 rounded-full opacity-20" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-primary/10 rounded-full opacity-10" />

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="h-px w-12 bg-primary/50" />
                    <Play className="w-4 h-4 text-primary" />
                    <div className="h-px w-12 bg-primary/50" />
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground mb-6 tracking-tight text-balance">
                    {awardName}
                </h1>

                <p className="text-lg md:text-xl text-foreground max-w-4xl mx-auto mb-12 leading-relaxed text-pretty">
                    A Rajk Szakkollégium hallgatóinak tudományos díja az egzakt társadalomtudományok területén
                </p>

                <Button
                    onClick={scrollToLatest}
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-medium rounded-full hover:cursor-pointer"
                >
                    Ugorj a legfrissebb díjazottra
                    <ChevronDown className="ml-2 w-5 h-5" />
                </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                <ChevronDown className="w-6 h-6 text-muted-foreground" />
            </div>
        </Section>
    )
}

"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { MyCarousel } from "@/components/MyCarousel";
import {CommunityPicture} from "@/payload-types";

// --------------------
// Types
// --------------------
export type CommunitySection = {
    id: string;
    title: string;
    /** Optional short blurb shown even when collapsed */
    summary?: string;
    /** Rich text already rendered to HTML from Payload (or plain text). */
    contentHtml: string;
};

export type CommunityParallaxAccordionProps = {
    title?: string;
    heroImage: { src: string; alt?: string };
    sections: CommunitySection[];
    /**
     * Provide your own carousel node (from your existing implementation).
     * It will render in the bottom section spanning full width.
     */
    carousel?: React.ReactNode;
    className?: string;
};

// --------------------
// Component
// --------------------
export default function CommunityParallaxAccordion({
                                                       title = "Közösség",
                                                       heroImage,
                                                       sections,
                                                       carousel,
                                                       className = "",
                                                   }: CommunityParallaxAccordionProps) {
    const [openId, setOpenId] = React.useState<string | null>(sections?.[0]?.id ?? null);

    const bgImage = "/lap_bezs.png";

    return (
        <section className={`relative w-full ${className}`}>
            {/* Background - now static, covers full section */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                <Image
                    src={heroImage.src}
                    alt={heroImage.alt || "Background"}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
            </div>

            {/* Top wavy border */}
            <div className="absolute left-0 top-0 w-full overflow-hidden leading-none z-10">
                <svg
                    className="relative block w-full h-[70px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0 L200,60 L400,30 L600,80 L800,20 L1000,70 L1200,40 L1200,0 L0,0 Z"
                        fill="transparent"
                        style={{ fill: 'url(#img-bezs)' }}
                    />
                    <defs>
                        <pattern id={`img-bezs`} patternUnits="userSpaceOnUse" width="100%" height="100%">
                            <image href={bgImage} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
                        </pattern>
                    </defs>
                </svg>
            </div>

            {/* Bottom wavy border */}
            <div className="absolute left-0 bottom-0 w-full overflow-hidden leading-none transform rotate-180 z-10">
                <svg
                    className="relative block w-full h-[70px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0 L200,60 L400,30 L600,80 L800,20 L1000,70 L1200,40 L1200,0 L0,0 Z"
                        fill="transparent"
                        style={{ fill: 'url(#img-bezs)' }}
                    />
                    <defs>
                        <pattern id={`img-bezs`} patternUnits="userSpaceOnUse" width="100%" height="100%">
                            <image href={bgImage} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
                        </pattern>
                    </defs>
                </svg>
            </div>

            {/* Content container */}
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 md:py-16">
                {/* Title bar */}
                <div className="rounded-2xl border border-white/25 bg-white/10 px-6 py-3 backdrop-blur">
                    <h2 className="text-center text-3xl font-bold tracking-wide text-white md:text-4xl">
                        {title}
                    </h2>
                </div>

                {/* Accordion */}
                <div className="rounded-2xl border border-white/25 bg-black/30 backdrop-blur">
                    {sections.map((s) => {
                        const isOpen = openId === s.id;
                        return (
                            <div key={s.id} className="border-b border-white/20 last:border-b-0">
                                <button
                                    className="flex w-full items-center gap-3 px-5 py-4 text-left text-white/95 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                                    aria-expanded={isOpen}
                                    aria-controls={`panel-${s.id}`}
                                    onClick={() => setOpenId(isOpen ? null : s.id)}
                                >
                                    <ChevronDown
                                        className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                                            isOpen ? "rotate-180" : "rotate-0"
                                        }`}
                                        aria-hidden
                                    />
                                    <span className="text-lg font-semibold md:text-xl">{s.title}</span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            id={`panel-${s.id}`}
                                            key={`panel-${s.id}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.28, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 text-white/90">
                                                {s.summary && (
                                                    <p className="mb-3 text-base/6 opacity-90">{s.summary}</p>
                                                )}
                                                {/* If you render Payload RichText to HTML on the server, place it below */}
                                                <div
                                                    className="prose prose-invert max-w-none prose-p:my-3 prose-li:my-1"
                                                    dangerouslySetInnerHTML={{ __html: s.contentHtml }}
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom carousel area (user-provided) */}
                {carousel && (
                    <div className="mt-2 rounded-2xl border border-white/20 bg-black/30 p-2 backdrop-blur h-fit">
                        {carousel}
                    </div>
                )}
            </div>
        </section>
    );
}

interface CommunityProps {
    pictures: CommunityPicture[];
}

export function Community(props: CommunityProps) {
    const sections: CommunitySection[] = [
        {
            id: "kollegiumi-elet",
            title: "Kollégiumi élet",
            summary:
                "A mindennapi élet adja számunkra a közös évek esszenciáját.",
            contentHtml:
                "<p>A kollégiumban töltött éveink során különböző utakat megismerve tanulunk egymástól. Közösen éljük meg a kirándulásokat, táborokat, és az ünnepeket. A figyelem, egymás elfogadása, szeretete teszi igazán élménnyé az együtt töltött időt.</p>",
        },
        {
            id: "alumni",
            title: "Alumni",
            contentHtml:
                "<p>Diploma után is aktív közösség maradunk: szakmai estek, mentorprogramok, és visszatérő találkozók várják a végzetteket.</p>",
        },
        {
            id: "osszakkollegiumi-mozgalom",
            title: "Összakkollégiumi mozgalom",
            contentHtml:
                "<p>Kapcsolataink országos hálózatot alkotnak. Együttműködünk más szakkollégiumokkal, közös projekteket és eseményeket szervezünk.</p>",
        },
    ];

    // Plug your own Carousel component here
    const carousel = (
        <div className="w-full overflow-hidden rounded-xl">
            <MyCarousel data={props.pictures} clickable={false}/>
        </div>
    );

    return (
        <CommunityParallaxAccordion
            heroImage={{ src: "/9.jpg", alt: "Közösség" }}
            sections={sections}
            carousel={carousel}
        />
    );
}

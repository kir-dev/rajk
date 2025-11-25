import Image from "next/image";
import {isMedia} from "@/utils/isMedia";
import {Award, Media} from "@/payload-types";
import Section from "@/components/Section";
import React from "react";

interface AwardHeroSectionProps {
    award: Award;
}

export default function AwardHeroSection({ award }: AwardHeroSectionProps) {
    const awardLogo = award.logo;

    return (
        <Section id={"video"} title={"Video"}>
            <div className="relative w-full">
                <iframe
                    src="https://www.youtube.com/embed/ehMg6zvXuMY?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="aspect-video w-full max-w-full"
                />
                <Image
                    src={(awardLogo && isMedia(awardLogo)) ? ((awardLogo as Media).url || "") : "/koli.jpg"}
                    alt="Neumann János-díj logó"
                    width={400}
                    height={400}
                    className="absolute inset-0 m-auto pointer-events-none aspect-square w-80 md:w-100 opacity-80"
                />
            </div>
        </Section>
    )
}
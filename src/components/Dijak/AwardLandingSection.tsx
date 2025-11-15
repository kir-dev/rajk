import {Award} from "lucide-react";
import {Media} from "@/payload-types";
import {isMedia} from "@/utils/isMedia";
import React from "react";
import Image from "next/image";

interface AwardLandingSectionProps {
    title?: string;
    logo?: Media | number;
    background?: Media | number;
}

export default function AwardLandingSection({title, logo, background}: AwardLandingSectionProps) {
    return (<div className = "h-screen w-screen overflow-hidden flex flex-col items-center text-white justify-center relative">
        <Image
            src = {(background && isMedia(background)) ? ((background as Media).url || "") : "/koli.jpg"}
            alt = "Background Image"
            fill
            className = "object-cover absolute opacity-50 z-0"
        />
        <Image
            src = {(logo && isMedia(logo)) ? ((logo as Media).url || "") : "/koli.jpg"}
            alt = "Logo"
            width = {64}
            height = {64}
            className= "z-10"
        />
        <h2 className = "text-2xl font-bold mt-4 z-10 flex gap-2"><Award/>{title}</h2>
    
    </div>)
}

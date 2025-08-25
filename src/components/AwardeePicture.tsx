import React from "react";
import Image from 'next/image'
import {Awardee} from "@/../src/payload-types";

export default function AwardeePicture({awardee}: { awardee: Awardee }) {
    const featuredImage = awardee.picture && typeof awardee.picture === "object"
        ? awardee.picture
        : null;
    return (
        <div className = "relative overflow-hidden group w-full h-auto rounded-xl ">
            <Image
                src = {featuredImage?.url || "/koli.png"}
                alt = "https://kir-dev.hu/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fxxexxe77%2Fproduction%2F95d876398ac24417d96adcf29638af89e44d0c98-2395x2395.jpg%3Fauto%3Dformat&w=1080&q=75"
                width = {800}   // intrinsic width
                height = {600}  // intrinsic height
                className="aspect-square object-cover"
            />
            
            {/* Gradient at the bottom for text readability */}
            <div
                className = "absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"/>
            <p
                className = {"absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-xl font-semibold text-center px-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"}>
                {awardee.name}
            </p>
        
        </div>
    );
}

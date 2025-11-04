import React from "react";
import Image from 'next/image'
import {Person} from "@/../src/payload-types";

export default function MemberPicture({ member }: { member: Person }) {
    const featuredImage = member.picture && typeof member.picture === "object"
        ? member.picture
        : null;

    console.log("Dump:")
    console.log(featuredImage);
    console.log(typeof featuredImage);
    console.log(member)
    console.log(member.picture)
    return (
        <div className="relative w-32 h-32 rounded-full overflow-hidden group">
            <Image
                src={featuredImage?.url || "/koli.png"}
                alt="https://kir-dev.hu/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fxxexxe77%2Fproduction%2F95d876398ac24417d96adcf29638af89e44d0c98-2395x2395.jpg%3Fauto%3Dformat&w=1080&q=75"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
            />

            {/* Gradient at the bottom for text readability */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Curved text SVG */}
            <svg
                className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                viewBox="0 0 160 160"
            >
                <defs>
                    <path
                        id="bottomTextPath"
                        d="M80,80 m-70,0 a70,70 0 0,0 140,0"
                    />
                </defs>
                <text className="fill-white text-[16px] font-semibold">
                    <textPath
                        xlinkHref="#bottomTextPath"
                        startOffset="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                    >
                        {member.name}
                    </textPath>
                </text>
            </svg>
        </div>
    );
}

// src/components/MemberPicture.tsx
import React from "react";
import Image from 'next/image'
import {Person} from "@/../src/payload-types";

interface MemberPictureProps{
    member: Person;
    joinedAt?: string | null;
}

export default function MemberPicture(props: MemberPictureProps) {
    const featuredImage = props.member.picture && typeof props.member.picture === "object"
        ? props.member.picture
        : null;

    //const yearDisplay = props.joinedAt ? new Date(props.joinedAt).getFullYear() : null;

    return (
        <div className="relative w-32 h-32 rounded-full overflow-hidden group">
            <Image
                src={featuredImage?.url || "/koli.png"}
                alt={props.member.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
            />

            {/* Gradient at the bottom for text readability */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Curved name - appears on hover */}
            <svg
                className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                viewBox="0 0 160 160"
            >
                <defs>
                    <path
                        id="bottomTextPath"
                        d="M80,80 m-70,0 a70,70 0 0,0 140,0"
                    />
                    {/* moved inner path up for better readability */}
                    <path
                        id="innerTextPath"
                        d="M80,74 m-58,0 a58,58 0 0,0 116,0"
                    />
                </defs>

                {/*<text className="fill-white text-[14px] font-semibold">
                    <textPath
                        xlinkHref="#bottomTextPath"
                        startOffset="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                    >
                        {props.member.name}
                    </textPath>
                </text>
                    <text className="fill-white text-[14px] font-semibold">
                    <textPath
                    xlinkHref="#innerTextPath"
                    startOffset="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    >
                        {yearDisplay}
                    </textPath>
                </text>
                */}
            </svg>
        </div>
    );
}
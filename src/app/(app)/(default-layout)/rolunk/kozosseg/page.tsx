import React from "react";
import {Community} from "@/components/Kozosseg/Community";
import getCommunityPictures from "@/payload-find/getCommunityPictures";

export default async function RolunkPage() {
    const events = await getCommunityPictures()

    return (
        <div className="min-h-screen w-full bg-bezs py-32">
            <div className="relative z-10 w-full">
                <Community pictures={events} />
            </div>
        </div>
    );
}
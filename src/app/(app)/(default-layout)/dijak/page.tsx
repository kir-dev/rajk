import PageTitle from "@/components/PageTitle/PageTitle";
import React from "react";
import {PillarCard} from "@/components/LandingPage/PillarCard";
import Description from "@/components/Description";
import {fetchAwards} from "@/fetch/fetchAwards";
import {AwardIcon} from "lucide-react";
import {isMedia} from "@/utils/isMedia";
import {Media} from "@/payload-types";


export default async function page() {
    const awards = await fetchAwards();
    return (<>
        <div>
            <PageTitle text = {"Díjak"}/>
            <div className = "flex flex-col pb-40 bg-bezs text-black items-center">
                <Description text = {"Ja am osztunk díjakat is , nagyon menő az összes."}/>
                {awards.map((award) =>
                    <>
                        <PillarCard key = {award.id} title = {award.name} description = {award.name}
                                    icon = {AwardIcon} buttonText = {"Felfedezés"}
                                    href = {"/dijak/" + award.id} imageSrc={isMedia(award.logo) && (award.logo as Media).url || ""}/>
                    </>
                )}
            </div>
        </div>
    </>)
}

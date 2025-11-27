import {fetchAwardBySlug} from "@/fetch/fetchAwards";
import React from "react";
import VertNavBarLayout from "@/components/VertNavBarLayout";
import {Award, Awardee} from "@/payload-types";
import AwardTitleSection from "@/components/Dijak/AwardTitleSection";
import {notFound} from "next/navigation";
import AwardHeroSection from "@/components/Dijak/AwardHeroSection";
import AwardAboutSection from "@/components/Dijak/AwardAboutSection";
import AwardAwardeesSection from "@/components/Dijak/AwardAwardeesSection";
import AwardHeroSectionTemplate from "@/components/Dijak/AwardHeroSectionTemplate";
import AwardAboutSectionTemplate from "@/components/Dijak/AwardAboutSectionTemplate";
import AwardAwardeesSectionTemplate from "@/components/Dijak/AwardAwardeesSectionTemplate";

export default async function Page({ params }: PageProps<'/dijak/[name]'>) {

    const {name: awardName} = await params;
    const award = await fetchAwardBySlug(awardName);

    // TODO: Only commented out for the demo, re-enable later
    /*if (!award) {
        notFound()
    }

    const awardees = award.awardees && (award.awardees as Awardee[]) || [];
    const currentAwardee = awardees[0];*/

    return (
        <div className="flex flex-row h-fit w-full relative bg-foreground">
            <VertNavBarLayout>
                <AwardHeroSectionTemplate />
                <AwardAboutSectionTemplate />
                <AwardAwardeesSectionTemplate />
                {/*<AwardHeroSection award={award} />
                <AwardTitleSection award={award}/>
                <AwardAboutSection award={award} />
                <AwardAwardeesSection awardees={awardees} currentAwardee={currentAwardee} />*/}
            </VertNavBarLayout>
        </div>
    )
}

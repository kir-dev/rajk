import {fetchAwardBySlug} from "@/fetch/fetchAwards";
import React from "react";
import VertNavBarLayout from "@/components/VertNavBarLayout";
import {notFound} from "next/navigation";
import AwardHeroSection from "@/components/Dijak/AwardHeroSection";
import AwardAboutSection from "@/components/Dijak/AwardAboutSection";
import AwardAwardeesSection from "@/components/Dijak/AwardAwardeesSection";
import Section from "@/components/Section";
import {getAwardMockData} from "@/lib/award-utils";

export default async function Page({params}: PageProps<'/dijak/[name]'>) {

    const {name: awardName} = await params;
    let award = await fetchAwardBySlug(awardName);

    if (!award) {
        // TODO: This will be the desired behaviour once the production db is set up
        //throw notFound()

        award = getAwardMockData("Neumann János-díj");
    }

    return (
        <div className="flex flex-row h-fit w-full relative bg-foreground">
            <VertNavBarLayout>
                <Section id="hero" title="" lucideIconName="/rajk_strucc_black.png">
                    <AwardHeroSection award={award} />
                </Section>
                <Section id="about" title="" lucideIconName="ScrollText">
                    <AwardAboutSection award={award} />
                </Section>
                <Section id="awardees" title="" lucideIconName="Award">
                    <AwardAwardeesSection award={award} />
                </Section>
            </VertNavBarLayout>
        </div>
    )
}

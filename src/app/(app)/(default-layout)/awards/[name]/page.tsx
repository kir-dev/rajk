import {fetchAwardBySlug} from "@/fetch/fetchAwards";
import React from "react";
import VertNavBarLayout from "@/components/VertNavBarLayout";
import AwardHeroSection from "@/components/Dijak/AwardHeroSection";
import AwardAboutSection from "@/components/Dijak/AwardAboutSection";
import AwardAwardeesSection from "@/components/Dijak/AwardAwardeesSection";
import Section from "@/components/Section";
import {getAwardMockData} from "@/lib/award-utils";
import NextEvent from "@/components/Esemenyek/NextEvent";
import {Event} from "@/payload-types";
import { getMediaUrl } from "@/utils/isMedia";

export default async function Page({params}: PageProps<'/awards/[name]'>) {

    const {name: awardName} = await params;
    let award = await fetchAwardBySlug(awardName);
    console.log(award);

    if (!award) {
        // TODO: This will be the desired behaviour once the production db is set up
        //throw notFound()

        award = getAwardMockData(awardName == "neumann-janos" ? "Neumann János-díj" : "Herbert Simon-díj");
    }

    return (
        <div className="flex flex-row h-fit w-full relative bg-bezs">
            <VertNavBarLayout>
                <Section id="hero" title="" lucideIconName={getMediaUrl(award.logo)}>
                    <AwardHeroSection award={award} />
                </Section>
                <Section id="about" title="Leírás" lucideIconName="ScrollText">
                    <AwardAboutSection award={award} />
                </Section>
                <Section id="awardees" title="Díjazottak" lucideIconName="Award">
                    <AwardAwardeesSection award={award} />
                </Section>
                {award.event && (
                    <Section id="event" title="Esemény" lucideIconName="Calendar" className="mb-20">
                        <NextEvent event={award.event as Event}/>
                    </Section>
                )}
            </VertNavBarLayout>
        </div>
    )
}

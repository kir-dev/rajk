import AwardLandingSection from "@/components/Dijak/AwardLandingSection";
import TitleNextToContent from "@/components/TitleNextToContent";
import SubTitle from "@/components/PageTitle/SubTitle";
import {fetchAwardBySlug} from "@/fetch/fetchAwards";
import React from "react";
import Section from "@/components/Section";
import VertNavBarLayout from "@/components/VertNavBarLayout";
import {Awardee, Media} from "@/payload-types";
import Image from "next/image";
import {isMedia} from "@/utils/isMedia";
import {RichText} from "@payloadcms/richtext-lexical/react";
import AwardeeGrid from "@/components/AwardeeGrid";
import {t} from "@/lib/utils";
import AwardTitleSection from "@/components/Dijak/AwardTitleSection";
import {notFound} from "next/navigation";
import AwardHeroSection from "@/components/Dijak/AwardHeroSection";
import Statistics from "@/components/LandingPage/Statistics";

export default async function Page({params}: {
    params: Promise<{ name: string }>
}) {

    const {name: awardName} = await params;
    const award = await fetchAwardBySlug(awardName);

    if (!award) {
        notFound()
    }

    const awardees = award.awardees && (award.awardees as Awardee[]) || [];
    const currentAwardee = awardees[0];

    return (
        <div className="flex flex-row h-fit w-full relative bg-black">
            <VertNavBarLayout>
                <AwardHeroSection award={award}/>ú
                <AwardTitleSection award={award}/>
                <Section id={"Statistics"} title={"Statistics"} lucideIconName="ChartColumnBig">
                    <Statistics isLast={false} color={"blue"} szin={"kek"} title={"Until this year"}
                                data={
                                    [
                                        ["", awardees.length, "awardees"],
                                        ["", 156, "course attendee"],
                                        ["", 9846, "lecture participant"]
                                    ]
                                }
                    />
                    <TitleNextToContent title="Statistics"
                                        content="Az elmúlt években retek sokan nyerték meg ezt a díjat."/>

                </Section>
                {currentAwardee &&
                    <Section id={"Latest awardee"} title={"This year's awardee"} lucideIconName="User">
                        <SubTitle text={"This year's awardee"}></SubTitle>
                        <div className="flex flex-col md:flex-row gap-8 items-center w-full justify-center flex-1">
                            <div>
                                <Image
                                    src={isMedia(currentAwardee!.picture) && (currentAwardee!.picture as Media).url || ""}
                                    alt={currentAwardee!.name || "Tiszt Bence"}
                                    width={400}
                                    height={400}
                                    className="rounded-lg border"
                                />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold mb-4">{currentAwardee.name}</h2>
                                <RichText className={"w-5/6 wrap-normal"} data={currentAwardee.about}/>
                            </div>
                        </div>
                    </Section>
                }
                {awardees &&
                    <Section id={"Prev awardees"} title={"Previous awardees"} className="mb-40" lucideIconName="Users">
                        <SubTitle text={"Previous awardees"}></SubTitle>
                        <AwardeeGrid awardees={awardees}/>
                    </Section>
                }
            </VertNavBarLayout>
        </div>
    )
}

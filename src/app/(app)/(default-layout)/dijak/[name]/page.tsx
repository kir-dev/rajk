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

export default async function Page({ params }: {
    params: Promise<{ name: string }>
}) {

    const { name: awardName } = await params;
    const award = await fetchAwardBySlug(awardName);
    const awardee = award.awardees && (award.awardees as Awardee) || null;
    
    if (!award) {
        return <div className = "text-white">Award not found</div>;
    }
    
    return (
        <div className = "flex flex-row h-fit w-full relative bg-black">
            {/*<div className = "absolute left-0 top-0 h-full z-30 md:block">
                <VertNavbar/>
            </div>*/}
            <VertNavBarLayout>
                <Section id = "Top" title = "Top" lucideIconName = "Award" className={"-mx-4"}>
                    <AwardLandingSection logo = {award.logo} title = {award.name}
                                         background = {award.covers ? award.covers[0].cover : 0}/>
                </Section>
                <Section id = {"About"} title = "About" lucideIconName = "Info">
                    <TitleNextToContent title = "About the John von Neumann Award"
                                        content = "The John von Neumann Award, named after John von Neumann is given annually by the Rajk College for Advanced Studies (Budapest, Hungary), to an outstanding scholar in the exact social sciences, whose works have had substantial influence over a long period of time on the studies and intellectual activity of the students of the college. The award was established in 1994 and is given annually. In 2013, separately from the annual prize, Kenneth J. Arrow was given the Honorary John von Neumann Award."/>
                </Section>
                <Section id = {"Statistics"} title = {"Statistics"} lucideIconName = "ChartColumnBig">
                    {/*<Statistics isLast = {false} color = {"blue"} szin = {"kek"} title = {"Until this year"}
                                data = {
                                    [
                                        ["", 28, "awardees"],
                                        ["", 156, "course attendee"],
                                        ["", 9846, "lecture participant"]
                                    ]
                                }
                    />*/}
                    <TitleNextToContent title = "Statistics"
                                        content = "Az elmúlt években retek sokan nyerték meg ezt a díjat."/>
                
                </Section>
                {awardee &&
                    <Section id = {"Latest awardee"} title = {"This year's awardee"} lucideIconName = "User">
                        <SubTitle text = {"This year's awardee"}></SubTitle>
                        <div className = "flex flex-col md:flex-row gap-8 items-center w-full justify-center flex-1">
                            <div>
                                <Image
                                    src = {isMedia(awardee!.picture) && (awardee!.picture as Media).url || ""}
                                    alt = {awardee!.name || "Tiszt Bence"}
                                    width = {400}
                                    height = {400}
                                    className = "rounded-lg border"
                                />
                            </div>
                            <div>
                                <h2 className = "text-3xl font-bold mb-4">{awardee.name}</h2>
                                <RichText className={"w-5/6 wrap-normal"} data={awardee.about}/>
                            </div>
                        </div>
                    </Section>
                }
                {award.awardees && typeof award.awardees !== "number" &&
                    <Section id = {"Prev awardees"} title = {"Previous awardes"} className = "mb-40" lucideIconName = "Users">
                        <SubTitle text = {"Previous awardes"}></SubTitle>
                        <AwardeeGrid awardees={[award.awardees, award.awardees, award.awardees, award.awardees, award.awardees]}/>
                    </Section>
                }
            </VertNavBarLayout>
        </div>
    )
}

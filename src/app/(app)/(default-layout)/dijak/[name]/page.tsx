import AwardLandingSection from "@/components/Dijak/AwardLandingSection";
import TitleNextToContent from "@/components/TitleNextToContent";
import SubTitle from "@/components/PageTitle/SubTitle";
import {fetchAward} from "@/fetch/fetchAwards";
import React from "react";
import Statistics from "@/components/LandingPage/Statistics";
import Section from "@/components/Section";
import VertNavbar from "@/components/vertNavbar";

export default async function Page({params}: { params: { id?: string } }) {
    
    const award = await fetchAward(params.id || "1");
    
    if (!award) {
        return <div className = "text-white">Award not found</div>;
    }
    
    return (
        <div className = "flex flex-row h-fit w-full relative">
            <div className = "absolute left-0 top-0 h-full z-30 md:block">
                <VertNavbar/>
            </div>
            <div className = "bg-black min-h-screen flex flex-col items-center py-20">
                <Section id = {"Top"} title = {"Top"}>
                    <AwardLandingSection logo = {award.logo} title = {award.name}
                                         background = {award.covers ? award.covers[0].cover : 0}/>
                </Section>
                <Section id = {"About"} title = {"About"}>
                    <TitleNextToContent title = "About the John von Neumann Award"
                                        content = "The John von Neumann Award, named after John von Neumann is given annually by the Rajk College for Advanced Studies (Budapest, Hungary), to an outstanding scholar in the exact social sciences, whose works have had substantial influence over a long period of time on the studies and intellectual activity of the students of the college. The award was established in 1994 and is given annually. In 2013, separately from the annual prize, Kenneth J. Arrow was given the Honorary John von Neumann Award."/>
                </Section>
                <Section id = {"Statistics"} title = {"Statistics"}>
                    <Statistics isLast = {false} color = {"blue"} szin = {"kek"} title = {"Until this year"}
                                data = {
                                    [
                                        ["", 28, "awardees"],
                                        ["", 156, "course attendee"],
                                        ["", 9846, "lecture participant"]
                                    ]
                                }
                    />
                </Section>
                <Section id = {"Latest awardee"} title = {"Latest awardee"}>
                    <TitleNextToContent title = "Tiszt Ferenc"
                                        content = "The John von Neumann Award, named after John von Neumann is given annually by the Rajk College for Advanced Studies (Budapest, Hungary), to an outstanding scholar in the exact social sciences, whose works have had substantial influence over a long period of time on the studies and intellectual activity of the students of the college. The award was established in 1994 and is given annually. In 2013, separately from the annual prize, Kenneth J. Arrow was given the Honorary John von Neumann Award."/>
                </Section>
                <Section id = {"Latest awardee"} title = {"Latest awardee"}>
                    <SubTitle text = {"Korábbi díjazottak"}></SubTitle>
                    {/*<MemberGrid members={award.awardees || []} />*/}
                </Section>
            
            
            </div>
        </div>
    )
}

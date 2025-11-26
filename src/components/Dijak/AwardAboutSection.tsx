import {Award} from "@/payload-types";
import Section from "@/components/Section";
import Statistics from "@/components/LandingPage/Statistics";
import TitleNextToContent from "@/components/TitleNextToContent";

interface AwardAboutSectionProps {
    award: Award
}

export default function AwardAboutSection({award}: AwardAboutSectionProps) {

    const awardees = award.awardees || [];

    return (
        <>
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
        </>
    )
}
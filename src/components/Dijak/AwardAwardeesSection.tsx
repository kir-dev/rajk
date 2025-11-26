import type {Awardee, Media} from "@/payload-types";
import Section from "@/components/Section";
import SubTitle from "@/components/PageTitle/SubTitle";
import {isMedia} from "@/utils/isMedia";
import {RichText} from "@payloadcms/richtext-lexical/react";
import AwardeeGrid from "@/components/AwardeeGrid";
import Image from "next/image";

interface AwardAwardeesSectionProps {
    awardees: Awardee[]
    currentAwardee: Awardee
}

export default function AwardAwardeesSection({ awardees, currentAwardee }: AwardAwardeesSectionProps) {

    return (
        <>
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
        </>
    )
}
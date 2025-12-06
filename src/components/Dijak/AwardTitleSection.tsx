"use client";

import {Award} from "@/payload-types";
import {useLanguage} from "@/components/LanguageProvider";
import Section from "@/components/Section";
import AwardLandingSection from "@/components/Dijak/AwardLandingSection";
import TitleNextToContent from "@/components/TitleNextToContent";
import {t} from "@/lib/utils";
import React from "react";
import {getAwardDescription, getAwardLocalizedName} from "@/lib/award-utils";

interface AwardTitleSectionProps {
    award: Award
}

export default function AwardTitleSection({ award }: AwardTitleSectionProps) {
    const { lang } = useLanguage();
    const awardDescription = getAwardDescription(award, lang);
    const awardLocalizedName = getAwardLocalizedName(award, lang);

    return (
        <>
            <Section id = "Top" title = "Top" lucideIconName = "Award" className={"-mx-4"}>
                <AwardLandingSection logo = {award.logo} title = {award.name}
                                     background = {award.covers ? award.covers[0].cover : 0}/>
            </Section>
            <Section id = {"About"} title = "About" lucideIconName = "Info">
                <TitleNextToContent title = {t(lang, `A ${awardLocalizedName}ról`, `About the ${awardLocalizedName}`)}
                                    content = {awardDescription}/>
            </Section>
        </>
    )
}
"use client"

import { useState } from "react"
import Section from "@/components/Section";
import {AwardeeCard} from "@/components/Dijak/AwardeeCard";
import {FilterChips} from "@/components/Dijak/FilterChips";
import {useLanguage} from "@/components/LanguageProvider";
import {t} from "@/lib/utils"

// TODO: Ez a séme jobban megfelel szerintem a leírásnak, lehet meg kéne változtatni a Payload sémát
export interface Awardee {
    id: number
    name: string
    year: number
    country: string
    institution: string
    field: string
    hasNobel: boolean
    nobelYear?: number
    image: string
    description: string
    fullBio: string
}

const awardees: Awardee[] = [
    {
        id: 1,
        name: "Kahneman, Daniel",
        year: 2024,
        country: "USA / Izrael",
        institution: "Princeton University",
        field: "Viselkedési közgazdaságtan",
        hasNobel: true,
        nobelYear: 2002,
        image: "/images/placeholders/daniel-kahneman-portrait-economist.png",
        description:
            "A viselkedési közgazdaságtan úttörője, aki forradalmasította a döntéshozatal és kockázatészlelés megértését.",
        fullBio:
            "Daniel Kahneman izraeli-amerikai pszichológus és közgazdász, aki 2002-ben Nobel-emlékdíjat kapott közgazdaságtanban. Munkássága a kognitív torzítások és a kilátáselmélet kidolgozása terén alapvetően megváltoztatta a közgazdaságtan és pszichológia kapcsolatát. Legismertebb műve, a 'Gyors és lassú gondolkodás' világszerte bestseller lett.",
    },
    {
        id: 2,
        name: "Acemoglu, Daron",
        year: 2023,
        country: "Törökország / USA",
        institution: "MIT",
        field: "Politikai gazdaságtan",
        hasNobel: false,
        image: "/images/placeholders/daron-acemoglu-portrait-economist-mit.png",
        description:
            "A modern politikai gazdaságtan egyik legbefolyásosabb alakja, az intézmények és gazdasági fejlődés kapcsolatának kutatója.",
        fullBio:
            "Daron Acemoglu török származású amerikai közgazdász, az MIT professzora. Kutatásai az intézmények szerepére, a politikai gazdaságtanra és a gazdasági növekedés okaira koncentrálnak. A 'Miért buknak el nemzetek?' című bestsellere széles körben ismertté tette munkásságát.",
    },
    {
        id: 3,
        name: "Thaler, Richard H.",
        year: 2022,
        country: "USA",
        institution: "University of Chicago",
        field: "Viselkedési közgazdaságtan",
        hasNobel: true,
        nobelYear: 2017,
        image: "/images/placeholders/richard-thaler-portrait-economist-chicago.png",
        description:
            "A viselkedési közgazdaságtan és a nudge elmélet megalkotója, aki megmutatta, hogyan befolyásolják a pszichológiai tényezők a gazdasági döntéseket.",
        fullBio:
            "Richard H. Thaler amerikai közgazdász, a Chicagói Egyetem professzora. 2017-ben Nobel-emlékdíjat kapott a viselkedési közgazdaságtanhoz való hozzájárulásáért. A 'Nudge' című könyve, amelyet Cass Sunsteinnel írt, a döntési architektúra és a lágy paternalizmus alapművévé vált.",
    },
    {
        id: 4,
        name: "Sen, Amartya",
        year: 2021,
        country: "India / UK",
        institution: "Harvard University",
        field: "Jóléti közgazdaságtan",
        hasNobel: true,
        nobelYear: 1998,
        image: "/images/placeholders/amartya-sen-portrait-economist-harvard.png",
        description: "A jóléti közgazdaságtan és fejlődés-gazdaságtan meghatározó alakja, a képességszemlélet megalkotója.",
        fullBio:
            "Amartya Sen indiai közgazdász és filozófus, aki 1998-ban Nobel-emlékdíjat kapott a jóléti közgazdaságtanhoz való hozzájárulásáért. A képességszemlélet (capability approach) megalkotójaként az emberi fejlődés és szabadság új megközelítését dolgozta ki.",
    },
    {
        id: 5,
        name: "Ostrom, Elinor",
        year: 2020,
        country: "USA",
        institution: "Indiana University",
        field: "Politikai gazdaságtan",
        hasNobel: true,
        nobelYear: 2009,
        image: "/images/placeholders/elinor-ostrom-portrait-economist-woman.png",
        description: "A közösségi erőforrások kezelésének kutatója, az első nő, aki közgazdasági Nobel-díjat kapott.",
        fullBio:
            "Elinor Ostrom amerikai politológus és közgazdász, aki 2009-ben elsőként kapott nőként Nobel-emlékdíjat közgazdaságtanban. Kutatásai megmutatták, hogyan képesek közösségek hatékonyan kezelni a közös erőforrásokat központi irányítás nélkül.",
    },
    {
        id: 6,
        name: "Kornai, János",
        year: 2019,
        country: "Magyarország",
        institution: "Harvard University / Corvinus",
        field: "Összehasonlító közgazdaságtan",
        hasNobel: false,
        image: "/images/placeholders/janos-kornai-portrait-hungarian-economist.png",
        description: "A szocialista gazdaságok működésének és a rendszerváltás közgazdaságtanának világhírű kutatója.",
        fullBio:
            "Kornai János magyar közgazdász, a Harvard Egyetem és a Budapesti Corvinus Egyetem emeritus professzora. A hiánygazdaság és a puha költségvetési korlát fogalmainak megalkotója, munkássága alapvető az átmeneti gazdaságok megértéséhez.",
    },
    {
        id: 7,
        name: "North, Douglass C.",
        year: 2018,
        country: "USA",
        institution: "Washington University",
        field: "Gazdaságtörténet",
        hasNobel: true,
        nobelYear: 1993,
        image: "/images/placeholders/douglass-north-portrait-economist-historian.png",
        description: "Az új intézményi közgazdaságtan egyik alapítója, a gazdaságtörténet megújítója.",
        fullBio:
            "Douglass Cecil North amerikai közgazdász és gazdaságtörténész, aki 1993-ban Nobel-emlékdíjat kapott. Az intézmények gazdasági szerepének kutatásával új irányt szabott a gazdaságtörténet és a közgazdaságtan fejlődésének.",
    },
]

const years = [...new Set(awardees.map((l) => l.year))].sort((a, b) => b - a)
const fields = [...new Set(awardees.map((l) => l.field))]
const institutions = [...new Set(awardees.map((l) => l.institution))]

/*interface AwardAwardeesSectionProps {
    awardees: Awardee[];
}*/

export default function AwardAwardeesSectionTemplate() {
    const { lang } = useLanguage()

    const [filters, setFilters] = useState({
        year: null as number | null,
        hasNobel: null as boolean | null,
        field: null as string | null,
        institution: null as string | null,
    })

    const filteredAwardees = awardees.filter((l) => {
        if (filters.year && l.year !== filters.year) return false
        if (filters.hasNobel !== null && l.hasNobel !== filters.hasNobel) return false
        if (filters.field && l.field !== filters.field) return false
        if (filters.institution && l.institution !== filters.institution) return false
        return true
    })

    const latestAwardee = awardees[0]

    return (
        <Section id={"awardees"} title={"Awardees"} className="py-24 px-4 border-t border-border">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-background mb-4">{t(lang, "Díjazottak", "Awardees")}</h2>
                <p className="text-muted-foreground mb-12 max-w-2xl">
                    A Neumann János-díj eddigi kitüntetettjei, akik kiemelkedő hozzájárulást tettek az egzakt társadalomtudományok
                    fejlődéséhez.
                </p>

                {/* Latest Laureate Feature */}
                <div className="mb-16">
                    <div className="text-sm text-primary font-medium mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        Legfrissebb díjazott
                    </div>
                    <AwardeeCard awardee={latestAwardee} featured />
                </div>

                {/* Filters */}
                <FilterChips
                    years={years}
                    fields={fields}
                    institutions={institutions}
                    filters={filters}
                    setFilters={setFilters}
                />

                {/* Timeline */}
                <div className="space-y-4">
                    {filteredAwardees.slice(1).map((awardee) => (
                        <AwardeeCard key={awardee.id} awardee={awardee} />
                    ))}
                </div>

                {filteredAwardees.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">Nincs találat a megadott szűrőkkel.</div>
                )}
            </div>
        </Section>
    )
}

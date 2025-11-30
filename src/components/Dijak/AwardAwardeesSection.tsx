"use client"

import { useState } from "react"
import Section from "@/components/Section";
import {AwardeeCard} from "@/components/Dijak/AwardeeCard";
import {FilterChips} from "@/components/Dijak/FilterChips";
import {useLanguage} from "@/components/LanguageProvider";
import {t} from "@/lib/utils"

export interface Publication {
    title: string
    author: string
    date: string
    url?: string
    pdfUrl?: string
}

export interface RelatedContent {
    type: "interview" | "video" | "podcast"
    title: string
    url: string
    thumbnail?: string
}

export interface GalleryImage {
    src: string
    alt: string
    caption?: string
}

export interface AwardeeLinks {
    institutional?: string
    googleScholar?: string
    nobel?: string
    personalWebpage?: string
}

export interface AwardeeDownloads {
    laudationPdf?: string
    pressPhotoPack?: string
}

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
    // New fields
    shortJustification?: string
    extendedJustification?: string
    ceremonyVideoUrl?: string
    lectureVideoUrl?: string
    gallery?: GalleryImage[]
    relatedContent?: RelatedContent[]
    publications?: Publication[]
    links?: AwardeeLinks
    downloads?: AwardeeDownloads
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
        shortJustification: "A közgazdasági gondolkodás megújításáért és a pszichológia integrálásáért a döntéselméletbe.",
        fullBio:
            "Daniel Kahneman izraeli-amerikai pszichológus és közgazdász, aki 2002-ben Nobel-emlékdíjat kapott közgazdaságtanban. Munkássága a kognitív torzítások és a kilátáselmélet kidolgozása terén alapvetően megváltoztatta a közgazdaságtan és pszichológia kapcsolatát. Legismertebb műve, a 'Gyors és lassú gondolkodás' világszerte bestseller lett.",
        extendedJustification:
            "Daniel Kahneman munkássága forradalmasította a közgazdaságtant azzal, hogy bemutatta: az emberek nem a klasszikus közgazdaságtan által feltételezett racionális döntéshozók. A kilátáselmélet, amelyet Amos Tverskyvel együtt dolgozott ki, megmutatta, hogy az emberek másképp értékelik a nyereségeket és veszteségeket, és hajlamosak a kognitív torzításokra. Ez a felismerés alapjaiban változtatta meg a közgazdaságtan, pénzügy és közpolitika területeit. A Rajk Szakkollégium közössége Kahneman professzort a viselkedési közgazdaságtan úttörőjeként, a tudományos gondolkodás megújítójaként tiszteli.",
        ceremonyVideoUrl: "https://www.youtube.com/embed/placeholder-ceremony",
        lectureVideoUrl: "https://www.youtube.com/embed/placeholder-lecture",
        gallery: [
            {
                src: "/images/placeholders/kahneman-students-ceremony.png",
                alt: "Kahneman a díjátadón hallgatókkal",
                caption: "A díjátadó ünnepség a Rajk Szakkollégiumban",
            },
            { src: "/images/placeholders/kahneman-lecture-audience.png", alt: "Kahneman előadása", caption: "Nobel-előadás a közönség előtt" },
            {
                src: "/images/placeholders/kahneman-discussion-students.png",
                alt: "Beszélgetés hallgatókkal",
                caption: "Informális beszélgetés a szakkollégistákkal",
            },
            { src: "/images/placeholders/kahneman-award-handshake.png", alt: "Díjátadás pillanata", caption: "A díj átvétele" },
        ],
        relatedContent: [
            {
                type: "interview",
                title: "Interjú Daniel Kahnemannel a döntéshozatalról",
                url: "#",
                thumbnail: "/images/image-placeholder.png",
            },
            {
                type: "video",
                title: "Thinking Fast and Slow - Összefoglaló",
                url: "#",
                thumbnail: "/images/placeholders/thinking-fast-slow-book.jpg",
            },
            { type: "podcast", title: "Rajk Podcast: Viselkedési közgazdaságtan", url: "#" },
        ],
        publications: [
            { title: "Kahneman és a magyar közgazdaságtan", author: "Kovács Péter", date: "2024. március 15.", url: "#" },
            { title: "A viselkedési közgazdaságtan hatása", author: "Nagy Anna", date: "2024. március 20.", pdfUrl: "#" },
            { title: "Interjú a díjátadó után", author: "Rajk Hírek", date: "2024. április 1.", url: "#" },
        ],
        links: {
            institutional: "https://www.princeton.edu",
            googleScholar: "https://scholar.google.com",
            nobel: "https://www.nobelprize.org/prizes/economic-sciences/2002/kahneman",
        },
        downloads: {
            laudationPdf: "/downloads/kahneman-laudacio.pdf",
            pressPhotoPack: "/downloads/kahneman-sajto-fotok.zip",
        },
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
        shortJustification: "Az intézmények gazdasági szerepének feltárásáért és a gazdasági egyenlőtlenségek kutatásáért.",
        fullBio:
            "Daron Acemoglu török származású amerikai közgazdász, az MIT professzora. Kutatásai az intézmények szerepére, a politikai gazdaságtanra és a gazdasági növekedés okaira koncentrálnak. A 'Miért buknak el nemzetek?' című bestsellere széles körben ismertté tette munkásságát.",
        extendedJustification:
            "Daron Acemoglu munkássága alapvetően megváltoztatta azt, ahogyan a közgazdászok az intézmények és a gazdasági fejlődés kapcsolatát értelmezik. James Robinsonnal közösen írt 'Why Nations Fail' című könyve világszerte vitát generált az intézmények szerepéről. Kutatásai megmutatták, hogy a befogadó versus kizsákmányoló intézmények közötti különbség magyarázza a gazdasági fejlettség országok közötti eltéréseit.",
        ceremonyVideoUrl: "https://www.youtube.com/embed/placeholder-acemoglu-ceremony",
        lectureVideoUrl: "https://www.youtube.com/embed/placeholder-acemoglu-lecture",
        gallery: [
            { src: "/images/placeholders/acemoglu-students-university.png", alt: "Acemoglu hallgatókkal", caption: "Találkozás a Rajk hallgatóival" },
            { src: "/images/placeholders/acemoglu-lecture-hall.png", alt: "Előadás", caption: "Nobel-előadás" },
        ],
        relatedContent: [
            { type: "interview", title: "Why Nations Fail - Interjú Acemogluval", url: "#" },
            { type: "podcast", title: "Intézmények és fejlődés", url: "#" },
        ],
        publications: [{ title: "Acemoglu Budapesten", author: "Szabó Márton", date: "2023. november 10.", url: "#" }],
        links: {
            institutional: "https://economics.mit.edu/people/faculty/daron-acemoglu",
            googleScholar: "https://scholar.google.com",
        },
        downloads: {
            laudationPdf: "/downloads/acemoglu-laudacio.pdf",
        },
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
        shortJustification: "A nudge elmélet kidolgozásáért és a viselkedési közgazdaságtan gyakorlati alkalmazásáért.",
        fullBio:
            "Richard H. Thaler amerikai közgazdász, a Chicagói Egyetem professzora. 2017-ben Nobel-emlékdíjat kapott a viselkedési közgazdaságtanhoz való hozzájárulásáért. A 'Nudge' című könyve, amelyet Cass Sunsteinnel írt, a döntési architektúra és a lágy paternalizmus alapművévé vált.",
        links: {
            institutional: "https://www.chicagobooth.edu",
            googleScholar: "https://scholar.google.com",
            nobel: "https://www.nobelprize.org/prizes/economic-sciences/2017/thaler",
        },
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
        shortJustification: "A képességszemlélet kidolgozásáért és az emberi fejlődés új megközelítéséért.",
        fullBio:
            "Amartya Sen indiai közgazdász és filozófus, aki 1998-ban Nobel-emlékdíjat kapott a jóléti közgazdaságtanhoz való hozzájárulásáért. A képességszemlélet (capability approach) megalkotójaként az emberi fejlődés és szabadság új megközelítését dolgozta ki.",
        links: {
            institutional: "https://www.harvard.edu",
            googleScholar: "https://scholar.google.com",
            nobel: "https://www.nobelprize.org/prizes/economic-sciences/1998/sen",
        },
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
        shortJustification: "A közösségi erőforrás-kezelés úttörő kutatásáért.",
        fullBio:
            "Elinor Ostrom amerikai politológus és közgazdász, aki 2009-ben elsőként kapott nőként Nobel-emlékdíjat közgazdaságtanban. Kutatásai megmutatták, hogyan képesek közösségek hatékonyan kezelni a közös erőforrásokat központi irányítás nélkül.",
        links: {
            nobel: "https://www.nobelprize.org/prizes/economic-sciences/2009/ostrom",
        },
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
        shortJustification: "A hiánygazdaság elméletének kidolgozásáért és a rendszerváltás közgazdaságtanáért.",
        fullBio:
            "Kornai János magyar közgazdász, a Harvard Egyetem és a Budapesti Corvinus Egyetem emeritus professzora. A hiánygazdaság és a puha költségvetési korlát fogalmainak megalkotója, munkássága alapvető az átmeneti gazdaságok megértéséhez.",
        links: {},
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
        shortJustification: "Az intézményi közgazdaságtan megalapozásáért.",
        fullBio:
            "Douglass Cecil North amerikai közgazdász és gazdaságtörténész, aki 1993-ban Nobel-emlékdíjat kapott. Az intézmények gazdasági szerepének kutatásával új irányt szabott a gazdaságtörténet és a közgazdaságtan fejlődésének.",
        links: {
            nobel: "https://www.nobelprize.org/prizes/economic-sciences/1993/north",
        },
    },
]

const years = [...new Set(awardees.map((l) => l.year))].sort((a, b) => b - a)
const fields = [...new Set(awardees.map((l) => l.field))]
const institutions = [...new Set(awardees.map((l) => l.institution))]

/*interface AwardAwardeesSectionProps {
    awardees: Awardee[];
}*/

export default function AwardAwardeesSection() {
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

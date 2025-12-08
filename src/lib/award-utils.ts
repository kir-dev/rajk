import {Award, Awardee} from "@/payload-types";
import {Lang} from "@/components/LanguageProvider";
import {Event} from "@/payload-types";

/**
 * Returns a title for the given award in the specified language.
 */
export function getAwardDescription(award: Award, lang: Lang): string {
    switch (award.name) {
        case "Neumann János-díj": {
            if (lang === "HU") {
                return "A Neumann János-díjat a Rajk László Szakkollégium alapította 1994-ben, és évente ítélik oda egy kiemelkedő tudósnak a pontos társadalomtudományok területén, akinek munkássága hosszú időn keresztül jelentős hatást gyakorolt a szakkollégium hallgatóinak tanulmányaira és szellemi tevékenységére. 2013-ban, az éves díjtól elkülönítve, Kenneth J. Arrow kapta a tiszteletbeli Neumann János-díjat.";
            }
            return "The John von Neumann Award, named after John von Neumann is given annually by the Rajk College for Advanced Studies (Budapest, Hungary), to an outstanding scholar in the exact social sciences, whose works have had substantial influence over a long period of time on the studies and intellectual activity of the students of the college. The award was established in 1994 and is given annually. In 2013, separately from the annual prize, Kenneth J. Arrow was given the Honorary John von Neumann Award.";

        }
        case "Herbert Simon-díj": {
            if (lang === "HU") {
                return "A Herbert Simon-díjat a Rajk László Szakkollégium évente ítéli oda egy olyan tudósnak, aki jelentős hozzájárulást tett a döntéshozatal és problémamegoldás területén, tükrözve Herbert A. Simon munkásságának interdiszciplináris jellegét. A díj elismeri azokat a kiemelkedő kutatásokat, amelyek tartós hatást gyakoroltak mind az akadémiai tudományos életre, mind a gyakorlati alkalmazásokra különböző területeken.";
            }
            return "The Herbert Simon Award is given annually by the Rajk College for Advanced Studies to a scholar who has made significant contributions to the field of decision-making and problem-solving, reflecting the interdisciplinary nature of Herbert A. Simon's work. The award recognizes outstanding research that has had a lasting impact on both academic scholarship";
        }
    }

    throw new Error("Unknown award name: " + award.name);
}

export function getProgramDescription(lang: Lang): string {
    if (lang === "HU") {
        return "A díjátadás minden esetben egy többnapos budapesti látogatás keretében valósul meg, amelyet a logisztikától a szakmai tartalomig teljes egészében a szakkollégisták szerveznek. A programsorozat két fő szakmai pillérre épül: a széles közönség számára meghirdetett előadásra, valamint a díjazott és a diákok közötti közvetlen párbeszédre épülő zártkörű mesterkurzusra. Ezen a szemináriumon kizárólag azok a rajkosok vehetnek részt, akik hónapokon át tartó kutatómunka során mélyedtek el a vendégprofesszor munkásságában.\n" +
            "A feszes szakmai napirendet kötetlen események egészítik ki. A szakmai ebédek és a díszvacsora lehetőséget teremtenek a hazai szakmai elit, a díjak anyagi támogatóinak és a kollégium vezetésének bevonására, míg a hallgatók által szervezett szabadidős programok során a vendég személyes kapcsolatba kerül a közösséggel, megismerve Budapestet és a magyar viszonyokat, illetve kultúrát.";
    } else {
        return "In every instance, the award presentation takes place within the framework of a multi-day visit to Budapest, organized entirely by the students of the College, from logistics to professional content. The program series is built upon two main professional pillars: a public lecture announced to a wide audience, and a closed-door masterclass built on direct dialogue between the awardee and the students. Participation in this seminar is reserved exclusively for those Rajk students who have immersed themselves in the guest professor’s work during months of preparatory research.\n" +
            "The tight professional agenda is complemented by informal events. Professional lunches and the Gala Dinner provide an opportunity to involve the Hungarian professional elite, the financial sponsors of the awards, and the College leadership, while leisure programs organized by the students allow the guest to establish a personal connection with the community, getting to know Budapest, the Hungarian context, and culture.";
    }
}

const demoAwardees: Awardee[] = [
    {
        id: 1,
        name: "Kahneman, Daniel",
        year: 2024,
        origin_country: "USA / Izrael",
        institution: "Princeton University",
        fields_of_science: [{field: "Viselkedési közgazdaságtan"}],
        fields_of_science_en: [{field: "Behavioral Economics"}],
        has_nobel: true,
        nobel_year: 2002,
        picture: {
            url: "/images/placeholders/daniel-kahneman-portrait-economist.png",
            id: 1,
            alt: "Daniel Kahneman portréja",
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        },
        short_justification: "A közgazdasági gondolkodás megújításáért és a pszichológia integrálásáért a döntéselméletbe.",
        //fullBio: "Daniel Kahneman izraeli-amerikai pszichológus és közgazdász, aki 2002-ben Nobel-emlékdíjat kapott közgazdaságtanban. Munkássága a kognitív torzítások és a kilátáselmélet kidolgozása terén alapvetően megváltoztatta a közgazdaságtan és pszichológia kapcsolatát. Legismertebb műve, a 'Gyors és lassú gondolkodás' világszerte bestseller lett.",
        //description: "A viselkedési közgazdaságtan úttörője, aki forradalmasította a döntéshozatal és kockázatészlelés megértését.",
        extended_justification: "Daniel Kahneman munkássága forradalmasította a közgazdaságtant azzal, hogy bemutatta: az emberek nem a klasszikus közgazdaságtan által feltételezett racionális döntéshozók. A kilátáselmélet, amelyet Amos Tverskyvel együtt dolgozott ki, megmutatta, hogy az emberek másképp értékelik a nyereségeket és veszteségeket, és hajlamosak a kognitív torzításokra. Ez a felismerés alapjaiban változtatta meg a közgazdaságtan, pénzügy és közpolitika területeit. A Rajk Szakkollégium közössége Kahneman professzort a viselkedési közgazdaságtan úttörőjeként, a tudományos gondolkodás megújítójaként tiszteli.",
        ceremony_video_link: "https://www.youtube.com/embed/placeholder-ceremony",
        video_description: {
            root: {
                type: "",
                children: [],
                direction: null,
                format: "",
                indent: 0,
                version: 0
            }
        },
        video_description_en: {
            root: {
                type: "",
                children: [],
                direction: null,
                format: "",
                indent: 0,
                version: 0
            }
        },
        image_gallery: [
            {
                id: "1",
                image: {
                    url: "/images/placeholders/kahneman-students-ceremony.png",
                    id: 1,
                    alt: "Acemoglu ",
                    createdAt: new Date().toDateString(),
                    updatedAt: new Date().toDateString()
                },
                caption: "A díjátadó ünnepség a Rajk Szakkollégiumban",
                caption_en: "Award Ceremony at Rajk College"
            },
            {
                id: "2",
                image: {
                    url: "/images/placeholders/kahneman-lecture-audience.png",
                    id: 1,
                    alt: "Acemoglu ",
                    createdAt: new Date().toDateString(),
                    updatedAt: new Date().toDateString()
                },
                caption: "Nobel-előadás a közönség előtt",
                caption_en: "Nobel Lecture in front of the audience"
            },
            {
                id: "3",
                image: {
                    url: "/images/placeholders/kahneman-discussion-students.png",
                    id: 1,
                    alt: "",
                    createdAt: new Date().toDateString(),
                    updatedAt: new Date().toDateString()
                },
                caption: "Beszélgetés a szakkollégistákkal",
                caption_en: "Talking with students"
            },
            {
                id: "4",
                image: {
                    url: "/images/placeholders/kahneman-award-handshake.png",
                    id: 1,
                    alt: "Kahneman díjátadó pillanat",
                    createdAt: new Date().toDateString(),
                    updatedAt: new Date().toDateString()
                },
                caption: "A díj átvétele",
                caption_en: "Receiving the award"
            },
        ],
        publications: [
            {
                title: "Kahneman és a magyar közgazdaságtan",
                title_en: "Kahneman and Hungarian Economics",
                cover_image: {
                    url: "/images/image-placeholder.png",
                    id: 1,
                    alt: "",
                    createdAt: new Date().toDateString(),
                    updatedAt: new Date().toDateString()
                },
                author: "Kovács Péter",
                date: "2024. március 15.",
                link: "#",
            },
            {
                title: "A viselkedési közgazdaságtan hatása",
                title_en: "Effects of Behavioral Economics",
                cover_image: {
                    url: "/images/image-placeholder.png",
                    id: 1,
                    alt: "",
                    createdAt: new Date().toDateString(),
                    updatedAt: new Date().toDateString()
                },
                author: "Nagy Anna",
                date: "2024. március 20.",
                link: "#"
            },
            {
                title: "Interjú a díjátadó után",
                title_en: "Interview after the Award Ceremony",
                cover_image: {
                    url: "/images/image-placeholder.png",
                    id: 1,
                    alt: "",
                    createdAt: new Date().toDateString(),
                    updatedAt: new Date().toDateString()
                },
                author: "Rajk Hírek",
                date: "2024. április 1.",
                link: "#"
            },
        ],
        websites: {
            institution_website_link: "https://www.princeton.edu",
            google_scholar_link: "https://scholar.google.com",
            nobel_website_link: "https://www.nobelprize.org/prizes/economic-sciences/2002/kahneman",
        },
        downloads: {
            laudation_pdf: {
                id: 1,
                alt: "Daniel Kahneman laudációja",
                url: "/downloads/kahneman-laudacio.pdf",
                updatedAt: new Date().toDateString(),
                createdAt: new Date().toDateString(),
            },
            press_photo_pack: {
                id: 1,
                alt: "Daniel Kahneman laudációja",
                url: "/downloads/kahneman-sajto-fotok.zip",
                updatedAt: new Date().toDateString(),
                createdAt: new Date().toDateString(),
            }
        },
        short_justification_en: "",
        updatedAt: "",
        createdAt: ""
    },
    {
        id: 2,
        name: "Acemoglu, Daron",
        year: 2023,
        origin_country: "Törökország / USA",
        institution: "MIT",
        fields_of_science: [{field: "Politikai gazdaságtan"}],
        fields_of_science_en: [{field: "Political Economy"}],
        has_nobel: false,
        picture: {
            url: "/images/placeholders/daron-acemoglu-portrait-economist-mit.png",
            id: 1,
            alt: "Acemoglu ",
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        },
        //description: "A modern politikai gazdaságtan egyik legbefolyásosabb alakja, az intézmények és gazdasági fejlődés kapcsolatának kutatója.",
        //fullBio: "Daron Acemoglu török származású amerikai közgazdász, az MIT professzora. Kutatásai az intézmények szerepére, a politikai gazdaságtanra és a gazdasági növekedés okaira koncentrálnak. A 'Miért buknak el nemzetek?' című bestsellere széles körben ismertté tette munkásságát.",
        short_justification: "Az intézmények gazdasági szerepének feltárásáért és a gazdasági egyenlőtlenségek kutatásáért.",
        extended_justification: "Daron Acemoglu munkássága alapvetően megváltoztatta azt, ahogyan a közgazdászok az intézmények és a gazdasági fejlődés kapcsolatát értelmezik. James Robinsonnal közösen írt 'Why Nations Fail' című könyve világszerte vitát generált az intézmények szerepéről. Kutatásai megmutatták, hogy a befogadó versus kizsákmányoló intézmények közötti különbség magyarázza a gazdasági fejlettség országok közötti eltéréseit.",
        ceremony_video_link: "https://www.youtube.com/embed/placeholder-acemoglu-ceremony",
        video_description: {
            root: {
                type: "",
                children: [],
                direction: null,
                format: "",
                indent: 0,
                version: 0
            }
        },
        video_description_en: {
            root: {
                type: "",
                children: [],
                direction: null,
                format: "",
                indent: 0,
                version: 0
            }
        },
        image_gallery: [
            {
                image: {
                    url: "/images/placeholders/acemoglu-students-university.png",
                    id: 1,
                    alt: "Acemoglu diákokkal",
                    createdAt: new Date().toDateString(),
                    updatedAt: new Date().toDateString()
                },
                caption: "Találkozás a Rajk hallgatóival",
                caption_en: "Meeting with Rajk students"
            },
            {
                image: {
                    url: "/images/placeholders/acemoglu-lecture-hall.png",
                    id: 1,
                    alt: "Acemoglu előadása",
                    createdAt: new Date().toDateString(),
                    updatedAt: new Date().toDateString()
                },
                caption: "Nobel-előadás",
                caption_en: "Nobel Lecture"
            },
        ],
        publications: [
            {
                title: "Acemoglu Budapesten",
                title_en: "Acemoglu in Budapest",
                cover_image: {
                    url: "/images/image-placeholder.png",
                    id: 1,
                    alt: "",
                    createdAt: new Date().toDateString(),
                    updatedAt: new Date().toDateString()
                },
                author: "Szabó Márton",
                date: "2023. november 10.",
                link: "#"
            }
        ],
        websites: {
            institution_website_link: "https://economics.mit.edu/people/faculty/daron-acemoglu",
            google_scholar_link: "https://scholar.google.com",
        },
        downloads: {
            laudation_pdf: {
                url: "/downloads/acemoglu-laudacio.pdf",
                id: 1,
                alt: "Acemoglu laudációja",
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
        },
        short_justification_en: "",
        updatedAt: "",
        createdAt: ""
    },
    {
        id: 3,
        name: "Thaler, Richard H.",
        year: 2022,
        origin_country: "USA",
        institution: "University of Chicago",
        fields_of_science: [{field: "Viselkedési közgazdaságtan"}],
        fields_of_science_en: [{field: "Behavioral Economics"}],
        has_nobel: true,
        nobel_year: 2017,
        picture: {
            url: "/images/placeholders/richard-thaler-portrait-economist-chicago.png",
            id: 1,
            alt: "Sen Amartya portréja",
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        },
        short_justification: "A nudge elmélet kidolgozásáért és a viselkedési közgazdaságtan gyakorlati alkalmazásáért.",
        //description: "A viselkedési közgazdaságtan és a nudge elmélet megalkotója, aki megmutatta, hogyan befolyásolják a pszichológiai tényezők a gazdasági döntéseket.",
        //fullBio: "Richard H. Thaler amerikai közgazdász, a Chicagói Egyetem professzora. 2017-ben Nobel-emlékdíjat kapott a viselkedési közgazdaságtanhoz való hozzájárulásáért. A 'Nudge' című könyve, amelyet Cass Sunsteinnel írt, a döntési architektúra és a lágy paternalizmus alapművévé vált.",
        websites: {
            institution_website_link: "https://www.chicagobooth.edu",
            google_scholar_link: "https://scholar.google.com",
            nobel_website_link: "https://www.nobelprize.org/prizes/economic-sciences/2017/thaler",
        },
        short_justification_en: "",
        image_gallery: [],
        downloads: {
            laudation_pdf: null,
            press_photo_pack: null
        },
        publications: [],
        updatedAt: "",
        createdAt: ""
    },
    {
        id: 4,
        name: "Sen, Amartya",
        year: 2021,
        origin_country: "India / UK",
        institution: "Harvard University",
        fields_of_science: [{field: "Jóléti közgazdaságtan"}],
        fields_of_science_en: [{field: "Welfare Economics"}],
        has_nobel: true,
        nobel_year: 1998,
        picture: {
            url: "/images/placeholders/amartya-sen-portrait-economist-harvard.png",
            id: 1,
            alt: "Sen Amartya portréja",
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        },
        short_justification: "A képességszemlélet kidolgozásáért és az emberi fejlődés új megközelítéséért.",
        short_justification_en: "",
        //description: "A jóléti közgazdaságtan és fejlődés-gazdaságtan meghatározó alakja, a képességszemlélet megalkotója.",
        //fullBio: "Amartya Sen indiai közgazdász és filozófus, aki 1998-ban Nobel-emlékdíjat kapott a jóléti közgazdaságtanhoz való hozzájárulásáért. A képességszemlélet (capability approach) megalkotójaként az emberi fejlődés és szabadság új megközelítését dolgozta ki.",
        websites: {
            institution_website_link: "https://www.harvard.edu",
            google_scholar_link: "https://scholar.google.com",
            nobel_website_link: "https://www.nobelprize.org/prizes/economic-sciences/1998/sen",
        },
        image_gallery: [],
        downloads: {
            laudation_pdf: null,
            press_photo_pack: null
        },
        publications: [],
        updatedAt: "",
        createdAt: ""
    },
    {
        id: 5,
        name: "Ostrom, Elinor",
        year: 2020,
        origin_country: "USA",
        institution: "Indiana University",
        fields_of_science: [{field: "Politikai gazdaságtan"}],
        fields_of_science_en: [{field: "Political Economy"}],
        has_nobel: true,
        nobel_year: 2009,
        picture: {
            url: "/images/placeholders/elinor-ostrom-portrait-economist-woman.png",
            id: 1,
            alt: "Elinor Ostrom portréja",
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        },
        short_justification: "A közösségi erőforrás-kezelés úttörő kutatásáért.",
        //description: "A közösségi erőforrások kezelésének kutatója, az első nő, aki közgazdasági Nobel-díjat kapott.",
        //fullBio: "Elinor Ostrom amerikai politológus és közgazdász, aki 2009-ben elsőként kapott nőként Nobel-emlékdíjat közgazdaságtanban. Kutatásai megmutatták, hogyan képesek közösségek hatékonyan kezelni a közös erőforrásokat központi irányítás nélkül.",
        websites: {
            nobel_website_link: "https://www.nobelprize.org/prizes/economic-sciences/2009/ostrom",
        },
        short_justification_en: "",
        image_gallery: [],
        downloads: {},
        publications: [],
        updatedAt: "",
        createdAt: ""
    },
    {
        id: 6,
        name: "Kornai, János",
        year: 2019,
        origin_country: "Magyarország",
        institution: "Harvard University / Corvinus",
        fields_of_science: [{field: "Összehasonlító közgazdaságtan"}],
        fields_of_science_en: [{field: "Comparative Economics"}],
        has_nobel: false,
        picture: {
            url: "/images/placeholders/janos-kornai-portrait-hungarian-economist.png",
            id: 1,
            alt: "Kornai János portréja",
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        },
        short_justification: "A hiánygazdaság elméletének kidolgozásáért és a rendszerváltás közgazdaságtanáért.",
        //description: "A szocialista gazdaságok működésének és a rendszerváltás közgazdaságtanának világhírű kutatója.",
        //fullBio: "Kornai János magyar közgazdász, a Harvard Egyetem és a Budapesti Corvinus Egyetem emeritus professzora. A hiánygazdaság és a puha költségvetési korlát fogalmainak megalkotója, munkássága alapvető az átmeneti gazdaságok megértéséhez.",
        websites: {},
        short_justification_en: "",
        image_gallery: [],
        downloads: {
            laudation_pdf: null,
            press_photo_pack: null
        },
        publications: [],
        updatedAt: "",
        createdAt: ""
    },
    {
        id: 7,
        name: "North, Douglass C.",
        year: 2018,
        origin_country: "USA",
        institution: "Washington University",
        fields_of_science: [{field: "Gazdaságtörténet"}],
        fields_of_science_en: [{field: ""}],
        has_nobel: true,
        nobel_year: 1993,
        picture: {
            url: "/images/placeholders/douglass-north-portrait-economist-historian.png",
            id: 1,
            alt: "Douglass North portréja",
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        },
        short_justification: "Az intézményi közgazdaságtan megalapozásáért.",
        short_justification_en: "For founding institutional economics.",
        image_gallery: [],
        websites: {
            nobel_website_link: "https://www.nobelprize.org/prizes/economic-sciences/1993/north",
        },
        downloads: {
            laudation_pdf: null,
            press_photo_pack: null
        },
        publications: [],
        updatedAt: "",
        createdAt: ""
    },
]

const demoEvent: Event = {
    id: 1,
    name: "Neumann János-díj",
    picture: {
        url: "/images/placeholders/n30s20.jpg",
        id: 1,
        alt: "Esemény borító kép",
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
    },
    description: {
            root: {
                type: "",
                children: [],
                direction: null,
                format: "",
                indent: 0,
                version: 0
            }
        },
    location: "",
    date: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7).toDateString(),
    speakers: "",
    createdAt: "",
    updatedAt: "",
}

export function getAwardLocalizedName(award: Award, lang: Lang): string {
    switch (award.name) {
        case "Neumann János-díj": {
            return lang === "HU" ? "Neumann János-díj" : "John von Neumann Award";
        }
        case "Herbert Simon-díj": {
            return lang === "HU" ? "Herbert Simon-díj" : "Herbert Simon Award";
        }
    }

    throw new Error("Unknown award name: " + award.name);
}

export function getAwardMockData(awardName: string): Award {
    return {
        about_en: {root: {children: [], direction: "rtl", format: "left", indent: 0, type: "", version: 0}},
        about: {root: {children: [], direction: "rtl", format: "left", indent: 0, type: "", version: 0}},
        logo: {
            url: "/neumannlogo_2020_white-2.png",
            id: 1,
            alt: "Neumann János-díj logó",
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        },
        id: 1,
        name: awardName,
        awardees: demoAwardees,
        createdAt: "",
        updatedAt: "",
        event: demoEvent,
    }
}
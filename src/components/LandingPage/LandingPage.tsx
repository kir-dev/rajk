'use client'

import VertNavbar from "@/components/VertNavbar";
import Section from "@/components/Section";
import {PillarCard} from "@/components/LandingPage/PillarCard";
import {Calendar, ExternalLink, GraduationCap, Handshake, MapPin, UsersRound} from "lucide-react";
import Statistics from "@/components/LandingPage/Statistics";
import WawyBorder from "@/components/WawyBorder";
import IconTitle from "@/components/IconTitle";
import Link from "next/link";
import dynamic from "next/dynamic";
import {Event} from "@/payload-types";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/utils";
import MyCarousel from "@/components/MyCarousel";

interface LandingPageProps {
    data: Event[]
}

export default function LandingPage(props: LandingPageProps) {
    const Map = dynamic(() => import('@/components/LandingPage/Map'), { ssr: false });
    const rajkMapLink = "https://www.google.com/maps/place/Rajk+Szakkoll%C3%A9gium/@47.566434,19.0794354,323527m/data=!3m1!1e3!4m6!3m5!1s0x4741dc5c16189aab:0xa4ca0fbc0eb330af!8m2!3d47.4924152!4d19.06774!16zL20vMDkyenc3?entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D";
    const thisYear = new Date().getFullYear();
    const lastYear = thisYear - 1;
    const { lang } = useLanguage();

    return (
        <div className="min-h-screen min-w-full flex flex-col pb-40 bg-bezs">
            <div>
                <Section id={"video"} title={t(lang, "Videó", "Video")}>
                    <iframe
                        src="https://www.youtube.com/embed/lJgPfSw4w2c?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1"
                        title="YouTube video player"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="aspect-video w-full max-w-full"
                    />
                </Section>
            </div>
            <div className="flex flex-col lg:flex-row h-fit w-full relative">
                <div className="absolute left-0 top-0 h-full z-30 md:block">
                    <VertNavbar />
                </div>
                <div className="bg-foreground h-full w-full flex flex-col">
                    <Section id={"rolunk"} title={t(lang, "Közösség", "Community")}>
                        <div className="flex flex-col w-full h-full rounded-2xl">
                            <PillarCard
                                title={t(lang, "Közösség", "Community")}
                                description={t(
                                    lang,
                                    "A Rajk mindenekelőtt egy összetartó közösség. A közös lakhatás, a mindennapok megélése és az általunk szervezett programok olyan bizalmi közeget teremtenek, ahol a tagok folyamatosan tanulnak egymástól, és számíthatnak egymás támogatására. Ehhez szorosan kapcsolódik az is, hogy a kollégium működését mi magunk irányítjuk: a közös döntések nemcsak felelősséget jelentenek, hanem valódi közösségi élményt adnak. Ennek köszönhető, hogy az itt kialakuló kötelékek a végzés után is megmaradnak – ezt az aktív alumni közösség is jól mutatja.",
                                    "Above all, Rajk is a tight-knit community. Shared living, everyday experiences, and the programs we organize create a trusting environment where members constantly learn from each other and can rely on one another. We also run the college ourselves: shared decisions bring responsibility as well as a genuine community experience. Thanks to this, the bonds formed here last long after graduation, as our active alumni network shows."
                                )}
                                icon={UsersRound}
                                buttonText={t(lang, "Tovább", "Learn more")}
                                href={lang === "HU" ? "/rolunk/kozosseg" : "/about/community"}
                                imageSrc={"/Mainpage_kozosseg.jpg"}
                            />
                            <Statistics isLast={false} color={"purple"} szin={"lila"} title={t(lang, "Közösség", "Community")}
                                data={
                                    [
                                        [t(lang, "Az alapítás számítva ", "Since foundation "), 55, t(lang, " évnyi csodálatos közös emlék", " years of wonderful shared memories")],
                                        [t(lang, "1970-től mostanáig ", "From 1970 to today "), 904, t(lang, " kiosztott alumni plakett", " awarded alumni plaques")],
                                        [t(lang, "A 2025/2026-os tanévben ", "In the 2025/2026 academic year "), 95, t(lang, " jelenlegi szakkollégista", " current student members")]
                                    ]
                                }
                            />
                        </div>
                    </Section>
                    <Section id={"szakma"} title={t(lang, "Szakma", "Academics")}>
                        <div className="flex flex-col h-full rounded-2xl">
                            <PillarCard
                                title={t(lang, "Szakma", "Academics")}
                                description={t(
                                    lang,
                                    "A Rajk már alapításakor eltért a hagyományos egyetemi oktatási modelltől: a kurzusrendszert a hallgatók maguk alakították ki, interaktív, 4–8 fős szemináriumokra építve. Így kerülhettek be olyan, nemzetközi szinten is élvonalbeli tárgyak – mint az ökonometria vagy a vállalatértékelés –, amelyek akkoriban Magyarországon még nem, vagy csak más formában voltak elérhetők. Ezt a szemléletet ma is tovább visszük: a tagok határozzák meg a kurzusok irányait, részt vesznek a mentorprogramok és az akadémiai díjak szervezésében, miközben elismert hazai és nemzetközi oktatóktól tanulnak. Évente több mint ötven szakmai kurzus valósul meg a kollégisták kezdeményezése nyomán, alumnik, partnereink és állandó tanáraink támogatásával.",
                                    "Since its founding, Rajk has differed from traditional university education: our course system is shaped by students themselves, built on interactive 4–8 person seminars. This allowed internationally leading subjects—like econometrics or valuation—to be taught here even before they became common elsewhere in Hungary. We continue this approach today: members define the directions of courses, take part in mentoring programs and academic awards, and learn from renowned Hungarian and international lecturers. Each year, more than fifty academic courses are organized by students with support from alumni, partners, and our faculty."
                                )}
                                icon={GraduationCap}
                                buttonText={t(lang, "Tovább", "Learn more")}
                                href={lang === "HU" ? "/szakma" : "/academics"}
                                imageSrc={"/Mainpage_szakma.jpg"}
                            />
                            <Statistics isLast={false} color={"blue"} szin={"kek"} title={t(lang, "Szakma", "Academics")}
                                data={
                                    [
                                        [t(lang, `${lastYear}/${thisYear}-ös tanévben`, `${lastYear}/${thisYear} academic year`), 48, t(lang, "kurzus", "courses")],
                                        [t(lang, "Az elmúlt 5 évben", "In the past 5 years"), 156, t(lang, "leadott TDK", "TDK submissions")],
                                        [t(lang, `${thisYear}-ben`, `in ${thisYear}`), 17, t(lang, "OTDK helyezés", "OTDK placements")]
                                    ]
                                }
                            />
                        </div>
                    </Section>
                    <Section id={"tarsadalmi"} title={t(lang, "Társadalmi felelősségvállalás", "Social Responsibility")}>
                        <div className="flex flex-col h-full rounded-2xl">
                            <PillarCard
                                title={t(lang, "Társadalmi felelősségvállalás", "Social Responsibility")}
                                description={t(
                                    lang,
                                    "A Rajk mindig is érzékenyen reagált a közéleti folyamatokra – a rendszerváltás előtti fórumoktól egészen a napjainkban felmerülő társadalmi kérdésekig. A kollégiumban rendszeresen tartunk előadásokat, vitákat és saját kezdeményezésű projekteket, amelyek arra ösztönöznek, hogy túllépjünk a szűken vett szakmai nézőponton, és felelősen gondolkodjunk a közélet és a társadalom egészéről. A cél nem pusztán az ismeretszerzés, hanem az, hogy a tagok készek legyenek aktívan alakítani a környezetüket – és ez a szemlélet a végzés után is meghatározza a rajkosok gondolkodását.",
                                    "Rajk has always been responsive to public affairs—from the forums before the regime change to today’s social issues. We regularly host talks, debates, and student-initiated projects that encourage us to look beyond a narrow academic perspective and think responsibly about public life and society as a whole. The goal is not just acquiring knowledge, but enabling members to actively shape their environment—an approach that continues to influence Rajk members long after graduation."
                                )}
                                icon={Handshake}
                                buttonText={t(lang, "Tovább", "Learn more")}
                                href={"https://szabokalmanprogram.hu/"}
                                imageSrc={"/Mainpage_Tarsifel.jpg"}
                            />
                            <Statistics isLast={true} color={"green"} szin={"zold"} title={t(lang, "Társadalmi felelősségvállalás", "Social Responsibility")}
                                data={
                                    [
                                        [t(lang, "15 év alatt ", "Over 15 years, "), 123, t(lang, " Szabó Kálmán Tehetségprogram ösztöndíjas", " Szabó Kálmán Talent Program scholarship recipients")],
                                        [t(lang, "Az elmúlt években", "In recent years"), 4, t(lang, " Társadalmi Felelősségvállalás Projekt", " Social Responsibility projects")],
                                        [t(lang, "Anyagi helyzet alapján", "Based on financial situation"), 4, t(lang, " választható kollégiumi-díj sáv\n", " college fee bands\n")]
                                    ]
                                }
                            />
                        </div>
                    </Section>
                </div>
                <WawyBorder direction={"bottom"} color={"green"} szin={"zold"} />
            </div>
            <Section id={"events"} title={t(lang, "Események", "Events")}>
                <div className="w-full flex flex-col items-center justify-center">
                    <IconTitle className="mt-10 text-black text-center" title={t(lang, "Események", "Events")}
                               Icon={Calendar}/>
                    {props.data.length > 0 ? (
                        <>
                            <div className="w-full max-w-full overflow-x-auto">
                                <MyCarousel data={props.data} clickable={true}/>
                            </div>
                            <Link href={"/esemenyek"}
                                  className="mt-8 bg-rajk-green/90 hover:bg-rajk-green text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg">
                                Tovább az eseményekhez
                            </Link>
                        </>
                    ) : (
                        <p className="mt-6 text-center text-black opacity-80">
                            {t(lang, "Jelenleg nincsenek elérhető események.", "There are currently no available events.")}
                        </p>
                    )}
                </div>
            </Section>
            <Section id="location" title={t(lang, "Helyszín", "Location")}>
                <div className="relative bg-bezs text-black py-8 px-2 sm:px-6 lg:px-8 rounded-3xl mt-10 mb-20 overflow-hidden">
                    <div className="relative max-w-7xl mx-auto">
                        <div className="text-center mb-8">
                            <IconTitle title={t(lang, "Hol vagyunk?", "Where are we?")} Icon={MapPin} iconAnimation={"animate-bounce"}/>
                            <p className="mt-4 text-base sm:text-lg max-w-2xl mx-auto opacity-80">
                                {t(
                                    lang,
                                    "Látogass el hozzánk a Horánszky utcába, ahol mindig nyitott ajtókkal várunk minden érdeklődőt!",
                                    "Visit us on Horánszky Street—we always welcome everyone with open doors!"
                                )}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                            <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(28,150,71,0.3)] transition-all duration-500 hover:shadow-[0_0_50px_rgba(28,150,71,0.5)] w-full h-64 sm:h-96">
                                <Link href={rajkMapLink} target="_blank" className="block h-full w-full">
                                    <Map />
                                </Link>
                            </div>
                            <div className="p-4 sm:p-8 rounded-2xl border border-rajk-green/20 hover:border-rajk-green/40 transition-all duration-300 flex flex-col space-y-4 sm:space-y-6">
                                <div className="flex flex-col space-y-2">
                                    <h3 className="text-lg sm:text-xl font-bold text-rajk-green">Rajk Szakkollégium</h3>
                                    <p className="">1085 Budapest, Horánszky utca 6.</p>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <h4 className="text-base sm:text-lg font-semibold text-rajk-green">{t(lang, "Megközelítés", "Getting there")}</h4>
                                    <ul className="space-y-1">
                                        <li className="flex items-center gap-2">
                                            <span className="inline-block w-9 h-9 p-1 rounded-full bg-blue-900 text-white text-center font-bold">M3</span>
                                            <span>{t(lang, "Kálvin tér (5 perc séta)", "Kálvin tér (5 min walk)")}</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="inline-block w-9 h-9 p-1 rounded-full bg-green-700 text-white text-center font-bold">M4</span>
                                            <span>{t(lang, "Kálvin tér (5 perc séta)", "Kálvin tér (5 min walk)")}</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="inline-block w-9 h-9 p-1 rounded-full bg-yellow-500 text-white text-center font-bold">4-6</span>
                                            <span>{t(lang, "Rákóczi tér (5 perc séta)", "Rákóczi tér (5 min walk)")}</span>
                                        </li>
                                    </ul>
                                </div>
                                <Link
                                    href={rajkMapLink}
                                    target="_blank"
                                    className="group bg-rajk-green/90 hover:bg-rajk-green text-white font-bold py-3 px-6 rounded-lg mt-4 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg text-center"
                                >
                                    <span>{t(lang, "Útvonaltervezés", "Get directions")}</span>
                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    )
}
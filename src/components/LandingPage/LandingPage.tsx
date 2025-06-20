'use client'

import VertNavbar from "@/components/vertNavbar";
import Section from "@/components/Section";
import {PillarCard} from "@/components/LandingPage/PillarCard";
import {Calendar, ExternalLink, GraduationCap, Handshake, MapPin, UsersRound} from "lucide-react";
import Statistics from "@/components/LandingPage/Statistics";
import WawyBorder from "@/components/WawyBorder";
import MyCarousel from "@/components/MyCarousel";
import NewsLetter from "@/components/LandingPage/NewsLetter";
import IconTitle from "@/components/IconTitle";
import Link from "next/link";
import dynamic from "next/dynamic";

interface LandingPageProps {
    data: {
        docs: { url: string; alt: string }[];
    };
}

export default function LandingPage(props: LandingPageProps) {
    const Map = dynamic(() => import('@/components/LandingPage/Map'), { ssr: false });
    const rajkMapLink = "https://www.google.com/maps/place/Rajk+Szakkollégium/@47.566434,19.0794354,323527m/data=!3m1!1e3!4m6!3m5!1s0x4741dc5c16189aab:0xa4ca0fbc0eb330af!8m2!3d47.4924152!4d19.06774!16zL20vMDkyenc3?entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D"

    return (
        <div className="min-h-screen min-w-screen flex flex-col pb-40 bg-bezs">
            <div>
                <iframe
                    src="https://www.youtube.com/embed/lJgPfSw4w2c?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1"
                    title="YouTube video player"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="aspect-video w-full"
                />
            </div>
            <div className="flex flex-row h-fit w-full relative">
                <div className="absolute left-0 top-0 h-full z-30 md:block hidden">
                    <VertNavbar />
                </div>
                <div className="bg-foreground h-full w-full flex flex-col">
                    <Section id={"rolunk"} title={"Közösség"}>
                        <div className="flex flex-col w-full h-full rounded-2xl">
                            <PillarCard
                                title="Közösség"
                                description="A rajkosság egy életre szól. Közös élmények sokasága kovácsolja össze az itt végzetteket, ez a kapcsolat pedig a végzés után sem ér véget: A kollégium mindig visszavárja végzettjeit."
                                icon={UsersRound}
                                buttonText="Tovább"
                                href={"/rolunk/kozosseg"}
                            />
                            <Statistics isLast={false} color={"purple"} szin={"lila"} />
                        </div>
                    </Section>
                    <Section id={"szakma"} title={"Szakma"}>
                        <div className="flex flex-col h-full rounded-2xl">
                            <PillarCard
                                title="Szakma"
                                description="A Rajk segíti tagjait a fejlődésben, hogy célokat tűzzenek maguk elé és el is érjék azokat. Felkészültté teszi őket a társadalom egészét érintő kérdésekben is."
                                icon={GraduationCap}
                                buttonText="Tovább"
                                href={"/szakma"}
                            />
                            <Statistics isLast={false} color={"blue"} szin={"kek"} />
                        </div>
                    </Section>
                    <Section id={"tarsadalmi"} title={"Társadalmi felelősségvállalás"}>
                        <div className="flex flex-col h-full rounded-2xl">
                            <PillarCard
                                title="Társadalmi felelősség"
                                description="Egy rajkos társadalmi szinten gondolkodik: Bővíti ismereteit a közélet és közpolitika terén, érzékenyen kapcsolódik a mindenkori társadalmi problémákhoz."
                                icon={Handshake}
                                buttonText="Tovább"
                                href={"/tarsadalmi-felelossegvallalas"}
                            />
                            <Statistics isLast={true} color={"green"} szin={"zold"} />
                        </div>
                    </Section>
                </div>
                <WawyBorder direction={"bottom"} color={"green"} szin={"zold"} />
            </div>
            <IconTitle className="mt-20 text-black" title={"Események"} Icon={Calendar}/>
            <MyCarousel data={props.data}/>
            <div className="my-25 mx-4">
                <NewsLetter/>
            </div>
            <Section id="location" title="">
                <div className="relative bg-transparent text-black py-16 px-4 sm:px-6 lg:px-8 rounded-3xl mt-10 mb-20 overflow-hidden">
                    <div className="absolute inset-0  backdrop-blur-sm"></div>
                    <div className="relative max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <IconTitle title={"Hol vagyunk?"} Icon={MapPin} iconAnimation={"animate-bounce"}/>
                            <p className="mt-6  text-lg max-w-2xl mx-auto opacity-80">
                                Látogass el hozzánk a Horánszky utcába, ahol mindig nyitott ajtókkal várunk minden érdeklődőt!
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
                            <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(28,150,71,0.3)] transition-all duration-500 hover:shadow-[0_0_50px_rgba(28,150,71,0.5)]">
                                <Link href={rajkMapLink} target="_blank" className="block h-full w-full">
                                    <Map />
                                </Link>
                            </div>

                            <div className=" p-8 rounded-2xl border border-rajk-green/20 hover:border-rajk-green/40 transition-all duration-300 flex flex-col space-y-6">
                                <div className="flex flex-col space-y-2">
                                    <h3 className="text-xl font-bold text-rajk-green">Rajk Szakkollégium</h3>
                                    <p className="">1085 Budapest, Horánszky utca 6.</p>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <h4 className="text-lg font-semibold text-rajk-green">Megközelítés</h4>
                                    <ul className=" space-y-1">
                                        <li className="flex items-center gap-2">
                                            <span className="inline-block w-9 h-9 p-1 rounded-full bg-blue-900  text-white text-center font-bold">M3</span>
                                            <span>Kálvin tér (5 perc séta)</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="inline-block w-9 h-9 p-1 rounded-full bg-green-700 text-white text-center font-bold">M4</span>
                                            <span>Kálvin tér (5 perc séta)</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="inline-block w-9 h-9 p-1 rounded-full bg-yellow-500 text-white text-center font-bold">4-6</span>
                                            <span>Rákóczi tér (5 perc séta)</span>
                                        </li>
                                    </ul>
                                </div>

                                <Link
                                    href={rajkMapLink}
                                    target="_blank"
                                    className="group bg-rajk-green/90 hover:bg-rajk-green text-white font-bold py-3 px-6 rounded-lg mt-4 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
                                >
                                    <span>Útvonaltervezés</span>
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
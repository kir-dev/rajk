'use client'

import ActionButton from "@/components/ActionButton";
import {ArrowRight, GraduationCap, UsersRound, Handshake} from "lucide-react";
import SubTitle from "@/components/SubTitle";
import IconTitle from "@/components/IconTitle";
import VertNavbar from "@/components/vertNavbar";
import Section from "@/components/Section";
import {PillarCard} from "@/components/PillarCard";
import WawyBorder from "@/components/WawyBorder";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <div>
                <iframe
                    src="https://www.youtube.com/embed/lJgPfSw4w2c?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1"
                    title="YouTube video player"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="aspect-video w-full"
                />
            </div>
            <div className="flex flex-row h-screen w-full bg-foreground overflow-auto">
                <VertNavbar />
                <div className="bg-foreground h-full container mx-auto px-4 flex flex-col">
                    <Section id={"kozosseg"} title={"Közösség"}>
                        <div className="flex flex-col w-full h-full rounded-2xl">
                            <PillarCard
                                title="Közösség"
                                description="A rajkosság egy életre szól. Közös élmények sokasága kovácsolja össze az itt végzetteket, ez a kapcsolat pedig a végzés után sem ér véget: A kollégium mindig visszavárja végzettjeit."
                                icon={GraduationCap}
                                buttonText="Tovább"
                            />
                        </div>
                    </Section>
                    <Section id={"szakma"} title={"Szakma"}>
                        <div className="flex flex-col h-full rounded-2xl">
                            <PillarCard
                                title="Szakma"
                                description="A Rajk segíti tagjait a fejlődésben, hogy célokat tűzzenek maguk elé és el is érjék azokat. Felkészültté teszi őket a társadalom egészét érintő kérdésekben is."
                                icon={UsersRound}
                                buttonText="Tovább"
                            />
                            <div className="relative">
                                <WawyBorder direction={"top"}/>
                                <div className="bg-rajk-green text-white py-16 px-8">
                                    <div className="max-w-6xl mx-auto">
                                        {/* Header */}
                                        <div className="text-center mb-16">
                                            <h2 className="text-4xl md:text-5xl font-bold mb-2">SZAKMA</h2>
                                            <div className="w-20 h-1 bg-white mx-auto"></div>
                                        </div>

                                        {/* Statistics Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                                            {/* First Stat */}
                                            <div className="space-y-4">
                                                <p className="text-lg md:text-xl font-light">A 2022/23-es tanévben</p>
                                                <div className="text-6xl md:text-7xl font-bold">48</div>
                                                <p className="text-lg md:text-xl font-light">Kurzus</p>
                                            </div>

                                            {/* Second Stat */}
                                            <div className="space-y-4">
                                                <p className="text-lg md:text-xl font-light">Az elmúlt 5 évben</p>
                                                <div className="text-6xl md:text-7xl font-bold">201</div>
                                                <p className="text-lg md:text-xl font-light">Leadott TDK</p>
                                            </div>

                                            {/* Third Stat */}
                                            <div className="space-y-4">
                                                <p className="text-lg md:text-xl font-light">Az elmúlt 5 év alatt</p>
                                                <div className="text-6xl md:text-7xl font-bold">93</div>
                                                <p className="text-lg md:text-xl font-light">Helyezett TDK</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <WawyBorder direction={"bottom"}/>
                            </div>
                        </div>
                    </Section>
                    <Section id={"tarsadalmi"} title={"Társadalmi felelősségvállalás"}>
                        <div className="flex flex-col h-full rounded-2xl">
                            <PillarCard
                                title="Társadalmi felelősség"
                                description="Egy rajkos társadalmi szinten gondolkodik: Bővíti ismereteit a közélet és közpolitika terén, érzékenyen kapcsolódik a mindenkori társadalmi problémákhoz."
                                icon={Handshake}
                                buttonText="Tovább"
                            />
                        </div>
                    </Section>
                    <SubTitle text="Második cím" />
                    <ActionButton>
                        Menjünk
                        <ArrowRight size={20} />
                    </ActionButton>
                    <IconTitle text="Rajk László Szakkollégium" icon="Landmark" />
                </div>
            </div>
        </div>
    );
}
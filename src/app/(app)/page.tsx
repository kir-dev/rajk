'use client'

import {GraduationCap, UsersRound, Handshake} from "lucide-react";
import VertNavbar from "@/components/vertNavbar";
import Section from "@/components/Section";
import {PillarCard} from "@/components/PillarCard";
import Statistics from "@/components/LandingPage/Statistics";
import WawyBorder from "@/components/WawyBorder";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col pb-40 bg-foreground">
            <div>
                <iframe
                    src="https://www.youtube.com/embed/lJgPfSw4w2c?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1"
                    title="YouTube video player"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="aspect-video w-full"
                />
            </div>
            <div className="flex flex-row h-fit w-full">
                <div className="bg-rajk-green relative">
                    <VertNavbar />
                    <WawyBorder direction={"bottom"} />
                </div>
                <div className="bg-foreground h-full container mx-auto flex flex-col">
                    <Section id={"kozosseg"} title={"Közösség"}>
                        <div className="flex flex-col w-full h-full rounded-2xl">
                            <PillarCard
                                title="Közösség"
                                description="A rajkosság egy életre szól. Közös élmények sokasága kovácsolja össze az itt végzetteket, ez a kapcsolat pedig a végzés után sem ér véget: A kollégium mindig visszavárja végzettjeit."
                                icon={UsersRound}
                                buttonText="Tovább"
                            />
                            <Statistics />
                        </div>
                    </Section>
                    <Section id={"szakma"} title={"Szakma"}>
                        <div className="flex flex-col h-full rounded-2xl">
                            <PillarCard
                                title="Szakma"
                                description="A Rajk segíti tagjait a fejlődésben, hogy célokat tűzzenek maguk elé és el is érjék azokat. Felkészültté teszi őket a társadalom egészét érintő kérdésekben is."
                                icon={GraduationCap}
                                buttonText="Tovább"
                            />
                            <Statistics />
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
                            <Statistics />
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    );
}
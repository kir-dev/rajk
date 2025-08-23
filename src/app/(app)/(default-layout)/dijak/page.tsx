"use client";
import PageTitle from "@/components/PageTitle/PageTitle";
import React from "react";
import {CircleDotDashed, Plane, Spool} from 'lucide-react';
import {PillarCard} from "@/components/LandingPage/PillarCard";
import Description from "@/components/Description";

const awards = [
    {
        title: "John von Neumann Award",
        description: "A legjobb közösségi díjat azok a tagok kapják, akik kiemelkedően hozzájárulnak a közösség életéhez.",
        icon: Spool,
        href: "/dijak/john-von-neumann"
    },
    {
        title: "Herbert Simon Award",
        description: "A legaktívabb tag díjat azok kapják, akik a legtöbb eseményen vesznek részt és aktívan részt vesznek a közösségi munkában.",
        icon: CircleDotDashed,
        href: "/dijak/herbert-simon"
    },
    {
        title: "Kaliforniától Budapestig",
        description: "A kreatív ötletek díjat azok kapják, akik új és innovatív ötletekkel járulnak hozzá a közösség fejlődéséhez.",
        icon: Plane,
        href: "/dijak/kaliforniatol-budapesteig"
    }
];


export default function page() {
    return (<>
        <div>
            <PageTitle text = {"Díjak"}/>
            <div className = "flex flex-col pb-40 bg-bezs text-black items-center">
                <Description text={"Ja am osztunk díjakat is , nagyon menő az összes."}/>
                {awards.map((award, index) => (
                    <PillarCard key = {index} title = {award.title} description = {award.description}
                                icon = {award.icon} buttonText={"Felfedezés"} href={award.href}/>
                ))}
            </div>
        </div>
    </>)
}

"use client";
import Image from "next/image";
import React from "react";
import {Download} from "lucide-react";

export default function ApplyPage() {
    
    
    return (
        <div className = "flex flex-col justify-center my-20 bg-foreground">
            <div className = "flex flex-col items-center bg-rajk-green">
                
                <h1 className = "text-6xl font-bold mb-4 mt-4 text-center">{"Ajtókat nyitunk a világra"}
                    <br/> {"-Rajk a Szakkollégium-"}</h1>
                {/*<div className = "flex flex-row items-center gap-6 justify-center mb-4">*/}
                <div className = "grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    <div className = "flex flex-col self-end items-end">
                        <p className = "text-4xl w-1/2 text-right font-bold mr-2 mb-4">Töltsd le a 2025-ös kérdőívet!</p>
                        <a
                            href = "/2025_Rajk-kerdoiv-2.pdf"
                            download
                            className = "m-2 font-bold text-foreground py-2 px-4 rounded-md h-fit flex gap-2 items-center hover:bg-green-700 duration-100 inline-flex bg-green-800"
                        >
                                <Download className = "mr-2" size = {20}/>
                                Letöltés
                        </a>
                    </div>
                    <Image width = {450} height = {400} src = {"/felvi.png"} alt = {"Felvételi"}></Image>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-white self-center p-4">
                <div className="flex flex-row w-1/2">
                    <Image src={"/slider_4.png"} alt={"Rajk"} width={459} height={381} className="mr-20"/>
                    <div className="flex flex-col items-start justify-center ml-4">
                        <h2 className="text-2xl font-black mb-4 text-rajk-green underline">{"A Felvételi Menete"}</h2>
                        <p className="text-rajk-green font-bold">A Rajk Szakkollégiumba első- és másodéves Corvinusos és ELTE TÁTK-s hallgatók jelentkezését várjuk. A felvételi folyamata két részből áll: írásbeli és szóbeli fordulóból. Mi nem hiszünk a rossz válaszokban, arra leszünk kíváncsiak, hogyan látod a világot, és magad benne.</p>
                    </div>
                </div>
                <div className="flex flex-row w-1/2 mt-15">
                    <p className="font-bold text-9xl text-rajk-green mr-10">1</p>
                    <div className="flex flex-col items-start justify-center ml-4">
                        <h2 className="text-3xl font-black mb-4 text-rajk-green underline">{"Írásbeli"}</h2>
                        <p className="text-rajk-green font-bold">A felvételi első szakasza egy írásbeli, ahol rövidebb -hosszabb szakmai, személyes, kreatív és elgondolkodtató kérdések vannak. A kérdőív április 29-től elérhető ezen az oldalon. Arra kérünk, hogy a kitöltött kérdőívet PDF formátumban küldd el számunkra a rajkfelveteli2024@gmail.com emailre május 15. szerda 19:59-ig!</p>
                    </div>
                </div>
                <div className="flex flex-row w-1/2 mt-15">
                    <div className="flex flex-col items-start justify-center ml-4">
                        <h2 className="text-3xl font-black mb-4 text-rajk-green underline">{"Szóbeli"}</h2>
                        <p className="text-rajk-green font-bold">A szóbeli fordulóra mindenkit behívunk, aki leadta a kérdőívet. Egy személyes beszélgetésre számíthattok majd június 3. és június 7. között, mely a kollégium épületében a Horánszky utca 6-ban kap helyet. A részleteket az írásbeli leadása után egyeztetjük a jelentkezőkkel.</p>
                    </div>
                    <p className="font-bold text-9xl text-rajk-green ml-10">2</p>
                </div>
            </div>
        </div>
    )
}

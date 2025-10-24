"use client";
import Image from "next/image";
import React, {useState} from "react";
import {Download} from "lucide-react";
import Countdown from "@/components/countDown";
import ActionButton from "@/components/ActionButton";
import {EmailReg} from "@/utils/emailReg";

export default function ApplyPage() {
    const [emailReg, setEmailReg] = useState(false);
    const [email, setEmail] = useState('');

    const handleEmailReg = () => {
        EmailReg(email).then(() => {
            setEmailReg(false);
            setEmail('');
        })
    }
    
    return (
        <div className="bg-bezs">
            <div className={`flex flex-col justify-center pb-20 ${emailReg ? 'brightness-50' : ''}`}>
                <div className="relative">
                    <Image src={"/koli.png"} alt={"Koli"} width={500} height={500}
                           className="w-full h-screen object-cover object-top brightness-50 z-10"/>
                    <div
                        className="flex flex-col absolute font-black top-0 left-0 w-full h-full items-center justify-center mt-20">
                        <h2 className="text-2xl md:text-4xl font-black mx-8 lg:w-1/2 text-center lg:text-left mb-16">Ajtót
                            nyitunk a világra</h2>
                        <Image className={'px-8'} src={"/rajk_logo2_white.png"} alt={"Rajk logo"} width={700}
                               height={400}/>
                        <h2 className="text-2xl md:text-4xl font-black text-right lg:w-1/2 mb-20">Felvételi</h2>
                        <Countdown targetDate={new Date('2025-05-21T19:59:59')}/>
                    </div>
                </div>
                <div className="flex flex-col items-center bg-rajk-green py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                        <div className="flex flex-col md:self-end md:items-end">
                            <p className="text-4xl md:text-5xl xl:text-6xl mx-8 lg:w-1/2 md:text-right font-bold mr-2 mb-4">Töltsd
                                le a 2025-ös kérdőívet!</p>
                            <ActionButton className="max-md:mx-8 max-md:justify-center m-2 font-bold text-foreground py-2 px-4 rounded-md h-fit flex gap-2 items-center hover:bg-green-700 duration-100 inline-flex bg-green-800" onClick={() => setEmailReg(true)}>
                                <Download className="mr-2" size={20}/>
                                Letöltés
                            </ActionButton>
                        </div>
                        <Image className={"max-md:w-full px-8"} width={450} height={400} src={"/felvi.png"}
                               alt={"Felvételi"}></Image>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center self-center p-4 py-20">
                    <div className="flex flex-col md:flex-row lg:w-3/4 xl:w-1/2">
                        <Image src={"/slider_4.png"} alt={"Rajk"} width={459} height={381}
                               className="mr-20 max-md:p-16"/>
                        <div className="flex flex-col items-start justify-center ml-4">
                            <h2 className="text-3xl font-black mb-4 text-rajk-green underline">A Felvételi Menete</h2>
                            <p className="text-rajk-green font-normal">A Rajk Szakkollégiumba első- és másodéves
                                Corvinusos és ELTE TÁTK-s hallgatók jelentkezését várjuk. A felvételi folyamata két
                                részből áll: írásbeli és szóbeli fordulóból. Mi nem hiszünk a rossz válaszokban, arra
                                leszünk kíváncsiak, hogyan látod a világot, és magad benne.</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row lg:w-3/4 xl:w-1/2 mt-16 gap-14 p-4">
                        <p className="font-bold text-9xl text-rajk-green max-md:hidden">1</p>
                        <div className="flex flex-col items-start justify-center">
                            <h2 className="text-3xl font-black mb-4 text-rajk-green underline">Írásbeli</h2>
                            <p className="text-rajk-green font-normal">A felvételi első szakasza egy írásbeli, ahol
                                rövidebb -hosszabb szakmai, személyes, kreatív és elgondolkodtató kérdések vannak. A
                                kérdőív április 29-től elérhető ezen az oldalon. Arra kérünk, hogy a kitöltött kérdőívet
                                PDF formátumban küldd el számunkra a rajkfelveteli2025@gmail.com emailre május 21.
                                szerda 19:59-ig!</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row lg:w-3/4 xl:w-1/2 mt-16 gap-16 p-4">
                        <div className="flex flex-col items-start justify-center">
                            <h2 className="text-3xl font-black mb-4 text-rajk-green underline md:text-right w-full">Szóbeli</h2>
                            <p className="text-rajk-green font-normal md:text-right">A szóbeli fordulóra mindenkit
                                behívunk, aki leadta a kérdőívet. Egy személyes beszélgetésre számíthattok majd június
                                10. és június 14. között, mely a kollégium épületében a Horánszky utca 6-ban kap helyet.
                                A részleteket az írásbeli leadása után egyeztetjük a jelentkezőkkel.</p>
                        </div>
                        <p className="font-bold text-9xl text-rajk-green  max-md:hidden">2</p>
                    </div>
                </div>
            </div>
            <div>
                {emailReg ? (
                    <div className="absolute z-20 text-black">
                        <div className="fixed inset-0 flex items-center justify-center z-30">
                            <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
                                <h2 className="text-2xl font-bold mb-4">Email cím megadása</h2>
                                <p className="mb-4">Kérjük add meg az email címedet a letöltéshez, hogy a jövőben
                                    fel tudjuk venni veled a kapcsolatot!</p>
                                <input type="text" placeholder="Email cím"
                                       className="border border-gray-300 p-2 rounded w-full mb-4"
                                       onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="flex flex-row w-full gap-2">
                                    <a
                                        href="/2025_Rajk-kerdoiv.docx"
                                        download
                                        className="max-md:mx-8 max-md:justify-center font-bold text-foreground py-2 px-4 rounded-md h-fit flex gap-2 items-center hover:bg-green-700 duration-100 inline-flex bg-green-800"
                                        onClick={handleEmailReg}
                                    >
                                        Letöltés
                                    </a>
                                    <button className='font-bold text-black py-2 px-4 rounded-md h-fit flex gap-2 items-center hover:bg-gray-400 bg-gray-300 duration-100' onClick={() => setEmailReg(false)}>
                                        Bezárás
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : ('')}
            </div>
        </div>
    )
}


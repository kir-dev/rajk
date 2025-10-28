'use client'


import React from "react";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageSelector() {
    const { lang, setLang } = useLanguage();

    function toggleLanguage() {
        setLang(lang === "HU" ? "EN" : "HU");
    }
    
    return (
        <div className = ' text-3xl select-none cursor-pointer'
                 onClick = {toggleLanguage}
        >
            {lang === 'HU' ? (
                <Image src={"/Flag-Hungary.jpg.webp"} alt={"magyar"} width={40} height={40} className="border-2 border-white" />
            ) : (
                <Image src={"/Flag_of_the_United_Kingdom_(1-2).svg.png"} alt={"angol"} width={40} height={40} className="border-2 border-white" />
            )}
        </div>
    )
}

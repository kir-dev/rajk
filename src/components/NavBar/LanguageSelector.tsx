'use client'


import React from "react";
import Image from "next/image";

export default function LanguageSelector() {
    const languages = [
        'hu', 'en']
    const [selectedLanguage, setSelectedLanguage] = React.useState(languages[0])
    
    return (
        <div className = ' text-3xl select-none cursor-pointer'
                 onClick = {() => {
                     const newLang = selectedLanguage === 'hu' ? 'en' : 'hu'
                     setSelectedLanguage(newLang)
                 }}
        >
            {selectedLanguage === 'hu' ? (
                <Image src={"/Flag-Hungary.jpg.webp"} alt={"magyar"} width={40} height={40} className="border-2 border-white" />
            ) : (
                <Image src={"/Flag_of_the_United_Kingdom_(1-2).svg.png"} alt={"angol"} width={40} height={40} className="border-2 border-white" />
            )}
        </div>
    )
}

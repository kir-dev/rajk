'use client'


import React from "react";

export default function LanguageSelector() {
    const languages = [
        'hu', 'en']
    const [selectedLanguage, setSelectedLanguage] = React.useState(languages[0])
    
    return (
        <div className = 'ml-8 mr-2 text-3xl select-none cursor-pointer hover:scale-105 duration-100'
                 onClick = {() => {
                     const newLang = selectedLanguage === 'hu' ? 'en' : 'hu'
                     setSelectedLanguage(newLang)
                 }}
        >
            {selectedLanguage === 'hu' ? '🇭🇺' : '🇬🇧'}
        </div>
    )
}

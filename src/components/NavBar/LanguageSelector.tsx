'use client'


import React from "react";

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
            {selectedLanguage === 'hu' ? '🇭🇺' : '🇬🇧'}
        </div>
    )
}

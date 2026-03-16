"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";
import ActionButton from "@/components/ActionButton";
import { EmailReg } from "@/utils/emailReg";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/utils";
import Countdown from "@/components/countDown";

interface DownloadQuestionnaireProps {
  releaseDate: Date;
  questionnaireUrl: string;
  archiveUrl: string;
}

export function DownloadQuestionnaire({ releaseDate, questionnaireUrl, archiveUrl }: DownloadQuestionnaireProps) {
  const [emailReg, setEmailReg] = useState(false);
  const [email, setEmail] = useState('');
  const { lang } = useLanguage();

  const isReleased = new Date() >= releaseDate;

  const handleEmailReg = () => {
    EmailReg(email).then(() => {
      setEmailReg(false);
      setEmail('');
    });
  };

  return (
    <div className="flex flex-col items-center bg-rajk-green py-16 w-full text-white">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col md:items-end md:text-right">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t(lang, "Töltsd le a 2026-os kérdőívet!", "Download the 2026 questionnaire!")}
            </h2>
            
            {!isReleased ? (
              <div className="flex flex-col items-center md:items-end w-full">
                <p className="text-xl mb-4 opacity-90">
                  {t(lang, "Hamarosan elérhető a 2026-os felvételi kérdőív:", "The 2026 admission questionnaire will be available soon:")}
                </p>
                <Countdown targetDate={releaseDate} className="!justify-center md:!justify-end p-0" />
              </div>
            ) : (
              <ActionButton 
                className="font-bold text-white py-3 px-6 rounded-md h-fit flex gap-2 items-center hover:bg-green-700 duration-100 bg-green-800 shadow-lg" 
                onClick={() => setEmailReg(true)}
              >
                <Download size={24}/>
                {t(lang, "Letöltés", "Download")}
              </ActionButton>
            )}
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm w-full">
               <p className="mb-4 font-medium text-lg">
                {t(lang, "Itt tudod megnézni a korábbi évek kérdőíveit:", "Check out the questionnaires from previous years here:")}
              </p>
              <a 
                href={archiveUrl} 
                download
                className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors underline underline-offset-4"
              >
                <Download size={18} />
                {t(lang, "2025-ös felvételi kérdőív", "2025 admission questionnaire")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {emailReg && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/60 backdrop-blur-sm text-black">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold mb-4">{t(lang, "Email cím megadása", "Enter your email address")}</h2>
            <p className="mb-6 text-gray-600 leading-relaxed">
              {t(lang, "Kérjük add meg az email címedet a letöltéshez, hogy a jövőben fel tudjuk venni veled a kapcsolatot!", "Please provide your email to download so we can contact you in the future if needed.")}
            </p>
            <input 
              type="email" 
              placeholder={t(lang, "Email cím", "Email address")}
              className="border border-gray-200 p-3 rounded-lg w-full mb-6 focus:ring-2 focus:ring-rajk-green outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex flex-row w-full gap-3">
              <a
                href={questionnaireUrl}
                download
                className="flex-1 font-bold text-white py-3 px-4 rounded-lg flex gap-2 items-center justify-center hover:bg-green-700 bg-green-800 transition-colors shadow-sm"
                onClick={handleEmailReg}
              >
                {t(lang, "Letöltés", "Download")}
              </a>
              <button 
                className='flex-1 font-bold text-gray-700 py-3 px-4 rounded-lg flex gap-2 items-center justify-center hover:bg-gray-200 bg-gray-100 transition-colors' 
                onClick={() => setEmailReg(false)}
              >
                {t(lang, "Bezárás", "Close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client'

import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/utils";

export default function NewsLetter() {
    const { lang } = useLanguage();
    return (
        <div className="bg-zold p-8 rounded-lg shadow-md max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">{t(lang, "Iratkozz fel hírlevelünkre!", "Subscribe to our newsletter!")}</h2>
            <p className="text-rajk-cream mb-6 text-center">{t(lang, "Legyél naprakész a legfrissebb hírekkel és eseményekkel!", "Stay up to date with the latest news and events!")}</p>
            <form className="flex flex-col space-y-4">
                <input
                    type="email"
                    placeholder={t(lang, "Email címed", "Your email")}
                    className="p-3 border border-rajk-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-rajk-blue"
                    required
                />
                <button
                    type="submit"
                    className="bg-lila text-white py-3 rounded-lg hover:bg-rajk-blue hover:scale-105 duration-400 transition"
                >
                    {t(lang, "Feliratkozás", "Subscribe")}
                </button>
            </form>
        </div>
    )
}
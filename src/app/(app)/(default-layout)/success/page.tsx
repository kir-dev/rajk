'use client';

import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { t } from '@/lib/utils';

export default function SuccessPage() {
    const [animationComplete, setAnimationComplete] = useState(false);
    const { lang } = useLanguage();

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationComplete(true);
        }, 600);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-bezs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border-2 border-black shadow-lg p-8 max-w-md w-full text-center">
                <div className="flex justify-center mb-6">
                    <div className={`transition-all duration-700 ease-out ${animationComplete ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                        <CheckCircle className="h-24 w-24 text-zold" strokeWidth={2} />
                    </div>
                </div>

                <h1 className={`text-3xl font-bold mb-4 transition-all delay-200 duration-500 ${animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    {t(lang, 'Sikeres fizetés!', 'Payment successful!')}
                </h1>

                <p className={`text-gray-700 mb-8 transition-all delay-300 duration-500 ${animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    {t(lang, 'Köszönjük a támogatást! Adományod segít a Rajk Szakkollégium céljainak megvalósításában.', 'Thank you for your support! Your donation helps advance Rajk College\'s mission.')}
                </p>

                <div className={`transition-all delay-500 duration-500 ${animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <Link href="/" className="inline-block px-6 py-3 bg-zold hover:bg-kek text-white font-medium border-2 border-black rounded-2xl transition-colors duration-300">
                        {t(lang, 'Vissza a főoldalra', 'Back to homepage')}
                    </Link>
                </div>
            </div>
        </div>
    );
}
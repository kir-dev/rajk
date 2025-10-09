'use client';

import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import PaymentForm from "@/components/Stripe/PaymentForm";
import {AlertCircle, Loader2} from "lucide-react";
import { useLanguage } from '@/components/LanguageProvider';
import { t } from '@/lib/utils';

interface CheckoutInterface {
    clientSecret: string;
    amount: number;
    error: string | null;
    isLoading: boolean;
    setStep: (step: 'choose-amount' | 'payment') => void;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function Checkout({clientSecret, amount, error, isLoading, setStep}: CheckoutInterface) {
    const { lang } = useLanguage();
    const locale = lang === 'EN' ? 'en-US' : 'hu-HU';
    return (
        <>
            {isLoading ? (
                <div className="bg-white rounded-2xl border-2 border-black p-6 shadow-lg flex flex-col items-center justify-center min-h-[300px]">
                    <Loader2 className="h-12 w-12 text-zold animate-spin mb-4" />
                    <p className="text-gray-700">{t(lang,'Fizetési felület betöltése...','Loading payment interface...')}</p>
                </div>
            ) : error ? (
                <div className="bg-white rounded-2xl border-2 border-black p-6 shadow-lg">
                    <div className="flex flex-col items-center text-center">
                        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                        <h2 className="text-xl font-bold mb-2">{t(lang,'Hiba történt','An error occurred')}</h2>
                        <p className="text-gray-700 mb-4">{error}</p>
                        <button
                            onClick={() => setStep('choose-amount')}
                            className="py-2 px-6 bg-zold hover:bg-kek text-white font-medium border-2 border-black rounded-2xl transition-colors"
                        >
                            {t(lang,'Vissza','Back')}
                        </button>
                    </div>
                </div>
            ) : clientSecret ? (
                <div>
                    <h2 className="py-2 px-6 mb-6 bg-white hover:bg-gray-100 text-black text-center text-2xl font-medium border-2 border-black rounded-2xl transition-colors">{(amount / 100).toLocaleString(locale)} Ft</h2>
                    <Elements stripe={stripePromise} options={{clientSecret}}>
                        <PaymentForm />
                    </Elements>
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => setStep('choose-amount')}
                            className="py-2 px-6 bg-white hover:bg-gray-100 text-black font-medium border-2 border-black rounded-2xl transition-colors"
                        >
                            {t(lang,'Vissza az előző lépéshez','Back to previous step')}
                        </button>
                    </div>
                </div>
            ) : null}
        </>
    );

}
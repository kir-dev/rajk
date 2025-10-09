'use client';

import { createPaymentIntent } from "@/app/(app)/(default-layout)/tamogass/actions";
import Checkout from "@/components/Stripe/Checkout";
import { useState } from "react";
import ChooseAmount from "@/components/Stripe/ChooseAmount";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";
import { useLanguage } from '@/components/LanguageProvider';
import { t } from '@/lib/utils';

export default function CheckoutPage() {
    const { lang } = useLanguage();
    const [amount, setAmount] = useState<number>(500000); // Default 500,000 fillér (5000 HUF)
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState<'choose-amount' | 'payment'>('choose-amount');

    async function handleContinue(captchaToken: string) {
        if (!name || !email) {
            setError(t(lang, 'Kérjük, add meg a neved és email címed.', 'Please enter your name and email.'));
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await createPaymentIntent(amount, name, email, captchaToken);
            if (response.clientSecret) {
                setClientSecret(response.clientSecret);
                setStep('payment');
            } else {
                setError(t(lang,'Nem sikerült létrehozni a fizetési szándékot.','Could not create payment intent.'));
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : t(lang,'Váratlan hiba történt','An unexpected error occurred'));
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-bezs py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-3">{t(lang,'Támogasd a Rajk Szakkollégiumot','Support Rajk College')}</h1>
                    <p className="text-gray-700 max-w-2xl mx-auto">
                        {t(lang,
                           'Adományoddal hozzájárulsz a Rajk Szakkollégium működéséhez és programjaihoz. Segíts, hogy továbbra is biztosíthassuk a minőségi képzést a jövő generációinak.',
                           'Your donation supports the operation and programs of Rajk College. Help us continue providing high-quality education for future generations.'
                        )}
                    </p>
                </div>
                <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
                    {step === 'choose-amount' ? (
                        <div className="max-w-md mx-auto">
                            <ChooseAmount
                                amounts={[500000, 1000000, 2000000]}
                                amount={amount}
                                setAmount={setAmount}
                                name={name}
                                setName={setName}
                                email={email}
                                setEmail={setEmail}
                                onContinue={handleContinue}
                                isLoading={isLoading}
                                error={error}
                                setError={setError}
                            />
                        </div>
                    ) : (
                        <div className="max-w-md mx-auto">
                            {clientSecret ? (
                                <Checkout
                                    clientSecret={clientSecret}
                                    amount={amount}
                                    error={error}
                                    isLoading={isLoading}
                                    setStep={setStep}
                                />
                            ) : null}
                        </div>
                    )}
                </GoogleReCaptchaProvider>
            </div>
        </div>
    );
}
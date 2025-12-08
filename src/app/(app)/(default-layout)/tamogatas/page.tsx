'use client';

import { createPaymentIntent } from "@/app/(app)/(default-layout)/tamogatas/actions";
import Checkout from "@/components/Stripe/Checkout";
import React, {useEffect, useState} from "react";
import ChooseAmount from "@/components/Stripe/ChooseAmount";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";
import Image from "next/image";
import getSponsorImages from "@/payload-find/getSponsorImages";
import {Sponsor} from "@/payload-types";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from 'lucide-react';

export default function CheckoutPage() {
    const [amount, setAmount] = useState<number>(500000);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState<'choose-amount' | 'payment'>('choose-amount');
    const [paymentIntentUsed, setPaymentIntentUsed] = useState<boolean>(false);

    // Sponsors state and loader
    const [sponsors, setSponsors] = useState<Sponsor[]>([]);
    const [sponsorsLoading, setSponsorsLoading] = useState<boolean>(true);

    useEffect(() => {
        let mounted = true;
        async function fetchSponsors() {
            setSponsorsLoading(true);
            try {
                const res = await getSponsorImages();
                if (mounted && Array.isArray(res)) {
                    setSponsors(res);
                }
            } catch (err) {
                console.error("Failed to load sponsors", err);
            } finally {
                if (mounted) setSponsorsLoading(false);
            }
        }
        fetchSponsors();
        return () => { mounted = false; };
    }, []);

    async function handleContinue(captchaToken: string) {
        if (!name || !email) {
            setError('Kérjük, add meg a neved és email címed.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await createPaymentIntent(amount, name, email, note, captchaToken);
            if (response.clientSecret) {
                setClientSecret(response.clientSecret);
                setPaymentIntentUsed(false); // Mark as unused
                setStep('payment');
            } else {
                setError('Nem sikerült létrehozni a fizetési szándékot.');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Váratlan hiba történt');
        } finally {
            setIsLoading(false);
        }
    }

    const handleBackToChooseAmount = () => {
        // Invalidate client secret when going back
        setClientSecret(null);
        setPaymentIntentUsed(true);
        setStep('choose-amount');
    };

    // Safely extract media URL (handles number | Media union shapes)
    const getMediaUrl = (media: unknown): string | undefined => {
        if (!media) return undefined;
        if (typeof media === 'object' && media !== null && 'url' in media) {
            return (media).url as string | undefined;
        }
        return undefined;
    };

    const gridContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.1 },
        },
    };

    const gridItem = {
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
    };

    return (
        <div className="min-h-screen bg-bezs py-20 px-4 text-slate-900">
            <div className="max-w-4xl mx-auto">
                <div className="my-8 text-center items-center flex flex-col">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Támogasd a Rajk Szakkollégiumot</h1>
                    <div className="mx-auto my-2 h-1 w-96 rounded-full bg-emerald-600" />
                    <p className="text-gray-700 max-w-2xl mx-auto">
                        Adományoddal hozzájárulsz a Rajk Szakkollégium működéséhez és programjaihoz.
                        Segíts, hogy továbbra is biztosíthassuk a minőségi képzést a jövő generációinak.
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
                                note={note}
                                setNote={setNote}
                            />
                        </div>
                    ) : (
                        <div className="max-w-md mx-auto">
                            {clientSecret && !paymentIntentUsed ? (
                                <Checkout
                                    clientSecret={clientSecret}
                                    amount={amount}
                                    error={error}
                                    isLoading={isLoading}
                                    setStep={handleBackToChooseAmount}
                                />
                            ) : null}
                        </div>
                    )}
                </GoogleReCaptchaProvider>
            </div>

            <div className="mt-8 max-w-6xl mx-auto px-4">
                <div className="mb-8 text-center">
                    <Link
                        href="https://tamogatas.rajk.uni-corvinus.hu/"
                        className="inline-flex items-center gap-1 text-2xl tracking-tight hover:text-emerald-600 text-slate-900 transition-colors duration-200 group bg-kek rounded-xl border-2 max-w-xl mx-auto p-2"
                    >
                        <span>Konkrét projektjeinket ide kattintva találod</span>
                        <ArrowUpRight className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                    {/*<div className="mx-auto mt-2 h-1 w-24 rounded-full bg-emerald-600" />*/}
                    <p className="text-gray-700 max-w-2xl mx-auto">Ezen a felületen mindig láthatod mennyi támogatásra van szükség és milyen célból. <br></br>Mostantól 3 egyszerű lépésben támogathatod régi vagy új szívügyeidet a kollégiumban!</p>
                </div>
            </div>

            <div className="mt-8 max-w-6xl mx-auto px-4">
                <div className="mb-8 text-center">
                    <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">Támogatóink</h2>
                    <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-emerald-600" />
                </div>

                {sponsorsLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-pulse space-x-4 flex">
                            <div className="h-12 w-24 bg-gray-200 rounded" />
                            <div className="h-12 w-24 bg-gray-200 rounded" />
                            <div className="h-12 w-24 bg-gray-200 rounded" />
                        </div>
                    </div>
                ) : (
                    <motion.ul
                        variants={gridContainer}
                        initial="hidden"
                        animate="show"
                        className="grid md:grid-cols-2 gap-4 items-center"
                    >
                        {sponsors.map((sponsor) => {
                            const logoUrl = getMediaUrl(sponsor.logo);
                            return (
                                <motion.li
                                    key={sponsor.id}
                                    variants={gridItem}
                                    className="flex items-center justify-center"
                                >
                                    {logoUrl ? (
                                        <Image
                                            src={logoUrl}
                                            alt={sponsor.name || "sponsor"}
                                            width={1000}
                                            height={500}
                                            className="object-contain"
                                        />
                                    ) : (
                                        <div className="h-12 w-full bg-gray-50 flex items-center justify-center text-xs text-gray-500">
                                            {sponsor.name || "Sponsor"}
                                        </div>
                                    )}
                                </motion.li>
                            );
                        })}
                    </motion.ul>
                )}
            </div>
        </div>
    );
}
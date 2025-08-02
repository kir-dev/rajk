'use client';

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

export default function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsProcessing(true);
        setErrorMessage(null);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required"
        });

        if (error) {
            if (error.code === 'rate_limit' ||
                error.message?.includes('too many requests') ||
                error.message?.includes('rate limit') ||
                error.message?.includes('A kártyáját elutasítottuk.')) {
                setErrorMessage('Túl sok kísérlet történt. Kérjük, próbáld újra később, vagy vedd fel velünk a kapcsolatot.');
            } else {
                setErrorMessage(error.message || 'Payment failed. Please try again.');
            }
            setIsProcessing(false);
        } else if (paymentIntent?.status === 'succeeded') {
            setPaymentSuccess(true);
            setTimeout(() => {
                window.location.href = '/success';
            }, 1500);
        } else {
            setIsProcessing(false);
            setErrorMessage('Payment failed. Please try again.');
        }
    }

    return (
        <div className="w-full text-black max-w-md bg-white rounded-2xl border-2 border-black p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Fizetési adatok</h2>

            {paymentSuccess ? (
                <div className="flex flex-col items-center py-6">
                    <CheckCircle className="h-16 w-16 text-zold mb-4" />
                    <p className="text-center font-medium">Sikeres fizetés! Átirányítás...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6" id="payment-form">
                    <div className="p-1 bg-white rounded-lg">
                        <PaymentElement className="payment-element" />
                    </div>

                    {errorMessage && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600">
                            <AlertCircle className="h-5 w-5 flex-shrink-0" />
                            <span className="text-sm">{errorMessage}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isProcessing || !stripe || !elements}
                        className="w-full py-3 px-6 bg-zold hover:bg-kek text-white font-medium border-2 border-black rounded-2xl transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                                <span>Feldolgozás...</span>
                            </>
                        ) : (
                            <span>Fizetés</span>
                        )}
                    </button>

                    <p className="text-xs text-gray-500 text-center mt-4">
                        A fizetés gombra kattintva elfogadod a feltételeket és hozzájárulsz az adomány feldolgozásához.
                    </p>
                </form>
            )}
        </div>
    );
}
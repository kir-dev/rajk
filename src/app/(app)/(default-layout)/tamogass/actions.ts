'use server';

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {});

async function verifyRecaptcha(token: string) {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            secret: process.env.RECAPTCHA_SECRET_KEY!,
            response: token
        })
    });

    const data = await response.json();
    return data.success && data.score >= 0.5; // Adjust threshold as needed
}

export async function createPaymentIntent(amount: number, name: string, email: string, recaptchaToken: string) {
    // Validate reCAPTCHA first
    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
        throw new Error('Security check failed. Please try again.');
    }

    // Validate inputs
    if (!amount || amount < 500000) { // 5000 HUF minimum
        throw new Error('Érvénytelen összeg (minimum 5000 Ft)');
    }

    if (!name || name.trim().length < 2) {
        throw new Error('Érvényes név szükséges');
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Érvényes email szükséges');
    }
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'huf',
            automatic_payment_methods: { enabled: true },
            metadata: {
                source: 'donation_page',
                donorName: name,
                donorEmail: email,
            },
        })

        return {
            clientSecret: paymentIntent.client_secret,
        };
    }catch {
        throw new Error('Failed to create payment intent');
    }


}
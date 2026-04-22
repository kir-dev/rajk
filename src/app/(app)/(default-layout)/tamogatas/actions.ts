'use server';

import Stripe from "stripe";
import { headers } from 'next/headers';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY not configured');
}
if (!process.env.RECAPTCHA_SECRET_KEY) {
    throw new Error('RECAPTCHA_SECRET_KEY not configured');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {});

// In-memory rate limiting (use Redis in production)
const rateLimitCache = new Map<string, { count: number; resetAt: number }>();

async function checkRateLimit(identifier: string): Promise<boolean> {
    const now = Date.now();
    const limit = rateLimitCache.get(identifier);

    if (!limit || now > limit.resetAt) {
        rateLimitCache.set(identifier, { count: 1, resetAt: now + 60000 });
        return true;
    }

    if (limit.count >= 5) return false;

    limit.count++;
    return true;
}

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
    return data.success && data.score >= 0.7;
}

export async function createPaymentIntent(amount: number, name: string, email: string, note: string, recaptchaToken: string) {
    // Get IP for rate limiting
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] ||
        headersList.get('x-real-ip') ||
        'unknown';

    // Check rate limit
    if (!await checkRateLimit(ip)) {
        throw new Error('Túl sok kísérlet. Kérjük, várj egy percet.');
    }
    // Validate reCAPTCHA first
    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
        console.warn('reCAPTCHA validation failed');
        throw new Error('Security check failed. Please try again.');
    }

    // Validate inputs
    const MIN_AMOUNT = 50000; // 500 HUF
    const MAX_AMOUNT = 100000000; // 1,000,000 HUF

    if (!amount || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
        //console.warn(`Invalid amount attempt: ${amount / 100} forint from ${email}`);
        throw new Error('Érvénytelen összeg (minimum 500 Ft, maximum 1,000,000 Ft)');
    }

    if (!name || name.trim().length < 2 || name.trim().length > 100) {
        throw new Error('Érvényes név szükséges');
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
        throw new Error('Érvényes email szükséges');
    }
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'huf',
            automatic_payment_methods: { enabled: true },
            metadata: {
                source: 'donation_page',
                donorName: name.substring(0,100),
                donorEmail: email.substring(0,254),
                note: note.substring(0,254),
            },
        })

        return {
            clientSecret: paymentIntent.client_secret,
        };
    }catch {
        throw new Error('Failed to create payment intent');
    }


}
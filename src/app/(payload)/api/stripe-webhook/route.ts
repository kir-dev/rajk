import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { writeToPayload } from "@/payload-find/logTransaction";
import {securityHeaders} from "@/utils/securityHeaders";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-07-30.basil' as unknown as Stripe.StripeConfig['apiVersion'],
});

// Prevents Next.js from parsing the request body
export const config = { api: { bodyParser: false } };

// Track processed events to prevent duplicate processing
const processedEvents = new Set<string>();

export async function POST(request: NextRequest) {
    try {
        const sig = request.headers.get('stripe-signature');
        if (!sig) {
            return NextResponse.json(
                { error: 'Missing Stripe signature' },
                {
                    status: 400,
                    headers: securityHeaders
                }
            );
        }

        const body = await request.text();
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

        if (!endpointSecret) {
            //console.error('Missing STRIPE_WEBHOOK_SECRET environment variable');
            return NextResponse.json(
                { error: 'Configuration error' },
                {
                    status: 500,
                    headers: securityHeaders
                }
            );
        }

        let event: Stripe.Event;
        try {
            event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
        } catch {
            //console.error('Webhook signature verification failed:', err);
            return NextResponse.json(
                { error: 'Invalid signature' },
                {
                    status: 400,
                    headers: securityHeaders
                }
            );
        }

        // Implement idempotency to prevent duplicate processing
        if (processedEvents.has(event.id)) {
            //console.log(`Event ${event.id} already processed, skipping`);
            return NextResponse.json(
                { received: true, status: 'already_processed' },
                {
                    status: 200,
                    headers: securityHeaders
                }
            );
        }

        // Add event to processed set
        processedEvents.add(event.id);

        // Clean up old events occasionally to prevent memory leaks
        if (processedEvents.size > 1000) {
            // Keep only the most recent 500 events
            const eventsArray = Array.from(processedEvents);
            const eventsToKeep = eventsArray.slice(eventsArray.length - 500);
            processedEvents.clear();
            eventsToKeep.forEach(id => processedEvents.add(id));
        }

        switch (event.type) {
            case 'payment_intent.succeeded':
                const pi = event.data.object as Stripe.PaymentIntent;
                //console.log('✅ Payment succeeded:', pi.id);

                // Keep amount in the smallest currency unit for consistency
                // Comment explains the unit conversion for clarity
                await writeToPayload({
                    stripePaymentIntentId: pi.id,
                    amount: pi.amount, // Store in smallest currency unit (fillér)
                    currency: pi.currency,
                    metadata: pi.metadata,
                    status: 'succeeded',
                });
                break;

            case 'payment_intent.payment_failed':
                const failed = event.data.object as Stripe.PaymentIntent;
                //console.warn('❌ Payment failed:', failed.id, failed.last_payment_error?.message);

                await writeToPayload({
                    stripePaymentIntentId: failed.id,
                    amount: failed.amount, // Store in smallest currency unit (fillér)
                    currency: failed.currency,
                    metadata: failed.metadata,
                    status: 'failed',
                });
                break;

            default:
                //console.log(`Received unhandled event: ${event.type}`);
        }

        return NextResponse.json(
            { received: true },
            {
                status: 200,
                headers: securityHeaders
            }
        );
    } catch {
        //console.error('Unexpected error in webhook handler:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            {
                status: 500,
                headers: securityHeaders
            }
        );
    }
}
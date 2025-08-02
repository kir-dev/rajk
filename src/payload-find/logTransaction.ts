import { getPayload } from "payload";
import config from "../payload.config";  // Fixed relative path
import Stripe from "stripe";

export async function writeToPayload(record: {
    stripePaymentIntentId: string;
    amount: number;
    currency: string;
    metadata?: Stripe.Metadata;
    status: 'succeeded' | 'failed';
}) {
    const payload = await getPayload({ config });

    const existing = await payload.find({
        collection: 'stripe-transactions',
        where: { stripePaymentIntentId: { equals: record.stripePaymentIntentId } }
    });

    if (existing.docs.length > 0) return;

    const donorName = record.metadata?.donorName || record.metadata?.donor_name || 'Unknown';
    const donorEmail = record.metadata?.donorEmail || record.metadata?.donor_email || 'Unknown';

    await payload.create({
        collection: 'stripe-transactions',
        data: {
            stripePaymentIntentId: record.stripePaymentIntentId,
            amount: record.amount, // Keep in smallest currency unit
            formattedAmount: (record.amount / 100).toLocaleString('hu-HU'),
            currency: record.currency,
            donorName,
            donorEmail,
            metadata: record.metadata,
            status: record.status,
        },
    });
}
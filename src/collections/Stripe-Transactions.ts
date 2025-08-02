import type { CollectionConfig } from 'payload'

export const StripeTransactions: CollectionConfig = {
    slug: 'stripe-transactions',
    admin: {
        useAsTitle: 'donorName',
        description: 'Szponzorok, akik támogatják a szakkollégiumot.',
    },
    fields: [
        {
            name: 'donorName',
            label: 'Adományozó Neve',
            type: 'text',
            required: false,
        },
        {
            name: 'formattedAmount',
            label: 'Formázott Összeg',
            type: 'text',
            required: false,
        },
        {
            name: 'currency',
            label: 'Pénznem',
            type: 'text',
            required: false,
        },
        {
            name: 'donorEmail',
            label: 'Adományozó Email',
            type: 'text',
            required: false,
        },
        {
            name: 'stripePaymentIntentId',
            label: 'stripePaymentIntentId',
            type: 'text',
            required: true,
        },
        {
            name: 'amount',
            label: 'Összeg',
            type: 'number',
            required: false,
        },
        {
            name: 'metadata',
            label: 'Metaadatok',
            type: 'json',
            required: false,
        },
        {
            name: 'status',
            label: 'Státusz',
            type: 'select',
            options: [
                { label: 'Sikerült', value: 'succeeded' },
                { label: 'Sikertelen', value: 'failed' },
            ],
            required: true,
        },
    ],
}

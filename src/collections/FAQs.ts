import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
    slug: 'faqs',
    admin: {
        useAsTitle: 'question',
        description: 'TDK dolgozatok',
    },
    fields: [
        {
            name: 'question',
            label: 'Kérdés',
            type: 'text',
            required: true,
        },
        {
            name: 'answer',
            label: 'Válasz',
            type: 'richText',
            required: true,
        },
    ],
}

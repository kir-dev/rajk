import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
    slug: 'events',
    admin: {
        useAsTitle: 'name',
        description: 'Események és eseményekkel kapcsolatos információk',
    },
    fields: [
        {
            name: 'name',
            label: 'Név',
            type: 'text',
            required: true,
        },
        {
            name: 'picture',
            label: 'Kép',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'description',
            label: 'Leírás',
            type: 'text',
            required: true,
        },
    ],
}

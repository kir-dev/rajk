import type { CollectionConfig } from 'payload'

export const Reports: CollectionConfig = {
    slug: 'reports',
    admin: {
        useAsTitle: 'title',
        description: 'Jelentések',
    },
    fields: [
        {
            name: 'title',
            label: 'Cím',
            type: 'text',
            required: true,
        },
        {
            name: 'topic',
            label: 'Témakör',
            type: 'text',
            required: false,
        },
    ],
}

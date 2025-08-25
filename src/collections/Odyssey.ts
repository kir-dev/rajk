import type { CollectionConfig } from 'payload'

export const Odyssey: CollectionConfig = {
    slug: 'odyssey',
    admin: {
        useAsTitle: 'title',
        description: 'Jelentések',
    },
    fields: [
        {
            name: 'participants',
            label: 'Résztvevők',
            type: 'array',
            fields: [
                {
                    name: 'participant',
                    label: 'Résztvevő',
                    type: 'relationship',
                    relationTo: 'people',
                    required: true,
                },
            ]
        },
        {
            name: 'title',
            label: 'Cím',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            label: 'Leírás',
            type: 'text',
            required: false,
        },
    ],
}

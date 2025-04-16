import type { CollectionConfig } from 'payload'

export const TDKs: CollectionConfig = {
    slug: 'tdks',
    admin: {
        useAsTitle: 'title',
        description: 'TDK dolgozatok',
    },
    fields: [
        {
            name: 'title',
            label: 'Cím',
            type: 'text',
            required: true,
        },
        {
            name: 'section_name',
            label: 'Témakör',
            type: 'text',
            required: false,
        },
        {
            name: 'author',
            label: 'Készítő',
            type: 'relationship',
            relationTo: 'people',
            hasMany: true,
            required: false,
        },
        {
            name: 'year',
            label: 'Év',
            type: 'number',
        },
        {
            name: 'placement',
            label: 'Helyezés',
            type: 'number',
        },
    ],
}

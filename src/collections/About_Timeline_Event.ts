import type {CollectionConfig} from 'payload'

export const About_Timeline_Event: CollectionConfig = {
    slug: 'about-timeline-event',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            label: 'Cím',
            type: 'text',
            required: true,
        },
        {
            name: 'date',
            label: 'Dátum',
            type: 'date',
            required: true,
        },
        {
            name: 'description',
            label: 'Leírás',
            type: 'richText',
            required: true,
        },
        {
            name: 'logo',
            label: 'logo',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
    ]
}
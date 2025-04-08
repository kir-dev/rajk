import type {CollectionConfig} from 'payload'

export const Awardees: CollectionConfig = {
    slug: 'awardees',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            label: 'Név',
            type: 'text',
            required: true,
        },
        {
            name: 'about',
            label: 'Leírás',
            type: 'richText',
            required: true,
        },
        {
            name: 'year',
            label: 'Év',
            type: 'number',
            required: true,
        },
        {
            name: 'picture',
            label: 'Önarckép',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'testimony',
            label: 'Tanúsítvány',
            type: 'text',
            required: true,
        },
        {
            name: 'facebook_link',
            label: 'Facebook link',
            type: 'text',
            required: false,
        }
    ]
}
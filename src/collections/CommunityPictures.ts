import type { CollectionConfig } from 'payload'

export const CommunityPictures: CollectionConfig = {
    slug: 'community-pictures',
    admin: {
        useAsTitle: 'name',
        description: 'Közösségi események képei',
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
    ],
}

import type { CollectionConfig } from 'payload'

export const RecruitmentPictures: CollectionConfig = {
    slug: 'recruitment-pictures',
    admin: {
        useAsTitle: 'name',
        description: 'Felvételi oldal képei',
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

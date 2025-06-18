import {CollectionConfig} from 'payload';

export const People: CollectionConfig = {
    slug: 'people',
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
            name: 'picture',
            label: 'Profilkép',
            type: 'upload',
            relationTo: 'media',
            maxDepth: 1,
            required: false,
        }
    ],
};

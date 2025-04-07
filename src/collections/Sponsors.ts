import type { CollectionConfig } from 'payload'

export const Sponsors: CollectionConfig = {
    slug: 'sponsors',
    admin: {
        useAsTitle: 'name',
        description: 'Szponzorok, akik támogatják a szakkollégiumot.',
    },
    fields: [
        {
            name: 'name',
            label: 'Név',
            type: 'text',
            required: true,
        },
        {
            name: 'logo',
            label: 'Logó',
            type: 'upload',
                relationTo: 'media',
                maxDepth: 1,
            required: true,
        },
    ],
}

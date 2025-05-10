import type {CollectionConfig} from 'payload'

export const Applicants: CollectionConfig = {
    slug: 'applicants',
    admin: {
        useAsTitle: 'email',
    },
    fields: [
        {
            name: 'email',
            label: 'Email',
            type: 'text',
            required: true,
        },
    ],
    access: {
        create: () => true,
    }
}
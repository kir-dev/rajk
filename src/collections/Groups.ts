import type {CollectionConfig} from 'payload'

export const Groups: CollectionConfig = {
    slug: 'groups',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            label: 'Csoportnév',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            label: 'Leírás',
            type: 'richText',
            required: false,
        },
        {
            name: 'members',
            type: 'array',
            label: 'Tagok',
            admin :{

            },
            fields: [
                {
                    name: 'member',
                    label: 'Tag',
                    type: 'relationship',
                    relationTo: 'people',
                    required: true,
                },
                {
                    name: 'role',
                    label: 'Szerep',
                    type: 'text',
                    required: false,
                },
                {
                    name: 'joined_at',
                    label: 'Csatlakozás dátuma',
                    type: 'date',
                    required: false,
                },
            ],
        },
    ],
};



import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type {CollectionConfig} from 'payload'

export const Awards: CollectionConfig = {
    slug: 'awards',
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
            name: 'logo',
            label: 'Logó',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'about',
            label: 'Leírás',
            type: 'richText',
            required: true,
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    FixedToolbarFeature(),
                ]
            })
        },
        {
            name: 'about_en',
            label: 'About',
            type: 'richText',
            required: true,
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    FixedToolbarFeature(),
                ]
            })
        },
        {
            name: 'awardees',
            label: 'Díjazottak',
            type: 'relationship',
            relationTo: 'awardees',
            hasMany: true,
            required: false,
        },
        {
            name: 'covers',
            type: 'array',
            label: 'Borítók',
            fields: [
                {
                    name: 'cover',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
            required: false,
        },
        {
            name: 'event',
            label: 'Web esemény',
            type: 'relationship',
            relationTo: 'events',
            required: false,
        },
        {
            name: 'facebook_link',
            label: 'Facebook link',
            type: 'text',
            required: false,
        },
        {
            name: 'event_facebook_link',
            label: 'Esemény facebook link',
            type: 'text',
            required: false,
        },
        {
            name: 'connected_publicatios',
            label: 'Kapcsolódó publikációk',
            type: "number",
            required: false,
        },
        {
            name: 'block_seminar_participants',
            label: 'Block szeminárium résztvevők',
            type: "number",
            required: false,
        },
        {
            name: 'lecture_participants',
            label: 'Előadás résztvevők',
            type: "number",
            required: false,
        },
        {
            name: 'video',
            label: 'Videó',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
    ]
}
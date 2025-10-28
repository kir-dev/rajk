import type { CollectionConfig } from 'payload'
import {FixedToolbarFeature, lexicalEditor} from "@payloadcms/richtext-lexical";

export const Events: CollectionConfig = {
    slug: 'events',
    admin: {
        useAsTitle: 'name',
        description: 'Események és eseményekkel kapcsolatos információk',
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
        {
            name: "description",
            type: "richText",
            required: true,
            label: "Rövid leírás",
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    FixedToolbarFeature(),
                ]
            })
        },
        {
            name: 'date',
            label: 'Dátum és időpont',
            type: 'date',
            required: true,
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                    displayFormat: 'yyyy. MM. dd. HH:mm',
                    timeFormat: 'HH:mm',
                },
            },
        },
        {
            name: 'location',
            label: 'Helyszín',
            type: 'text',
            required: true,
        },
        {
            name: 'speakers',
            label: 'Előadók',
            type: 'text',
            required: false,
        },
    ],
}

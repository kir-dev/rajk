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
            name: 'institution',
            label: 'Intézmény',
            type: 'text',
            required: true,
        },
        {
            name: 'origin_country',
            label: 'Származási ország',
            type: 'text',
            required: true,
        },
        {
            name: 'fields_of_science',
            label: 'Tudományterületek',
            type: "array",
            required: true,
            minRows: 1,
            fields: [
                {
                    name: 'field',
                    label: 'Tudományterület',
                    type: 'text',
                    required: true,
                }
            ]
        },
        {
            name: 'fields_of_science_en',
            label: 'Fields of Science',
            type: "array",
            required: true,
            minRows: 1,
            fields: [
                {
                    name: 'field',
                    label: 'Field of Science',
                    type: 'text',
                    required: true,
                }
            ]
        },
        {
            name: 'about',
            label: 'Leírás',
            type: 'richText',
            required: true,
        },
        {
            name: 'about_en',
            label: 'Description',
            type: 'richText',
            required: true,
        },
        {
            name: 'short_justification',
            label: 'Rövid indoklás a díjazásra',
            type: 'richText',
            required: true,
        },
        {
            name: 'short_justification_en',
            label: 'Short justification for the award',
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
            name: 'has_nobel',
            label: 'Nobel-kapcsolat',
            type: 'checkbox',
            required: false,
            defaultValue: false,
        },
        {
            name: 'nobel_year',
            label: 'Nobel év',
            type: 'number',
            required: false,
        },
        {
            name: 'google_scholar_link',
            label: 'Google Scholar link',
            type: 'text',
            required: false,
        },
        {
            name: 'personal_website_link',
            label: 'Személyes weboldal',
            type: 'text',
            required: false,
        },
        {
            name: 'institution_website_link',
            label: 'Intézményi honlap',
            type: 'text',
            required: false,
        },
        {
            name: 'nobel_website_link',
            label: 'Nobel oldal',
            type: 'text',
            required: false,
        },
        {
            name: 'facebook_link',
            label: 'Facebook link',
            type: 'text',
            required: false,
        }
    ]
}
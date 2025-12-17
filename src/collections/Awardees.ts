import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
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
            name: 'short_justification',
            label: 'Rövid indoklás a díjazásra',
            type: 'text',
            required: true,
        },
        {
            name: 'short_justification_en',
            label: 'Short justification for the award',
            type: 'text',
            required: true,
        },
        {
            name: 'extended_justification',
            label: 'Bővebb indoklás a díjazásra',
            type: 'text',
            required: false,
        },
        {
            name: 'extended_justification_en',
            label: 'Extended justification for the award',
            type: 'text',
            required: false,
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
            name: 'ceremony_video_link',
            label: 'Díjátadó videó link',
            type: 'text',
            required: false,
        },
        {
            name: "video_description",
            type: "richText",
            required: false,
            label: "Video leírás",
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    FixedToolbarFeature(),
                ]
            })
        },
        {
            name: "video_description_en",
            type: "richText",
            required: false,
            label: "Video description",
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    FixedToolbarFeature(),
                ]
            })
        },
        {
            name: 'interview_video_link',
            label: 'Interview videó link',
            type: 'text',
            required: false,
        },
        {
            name: 'image_gallery',
            label: 'Galéria',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'caption',
                    label: 'Képfelirat',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'caption_en',
                    label: 'Image caption',
                    type: 'text',
                    required: true,
                }
            ],
            minRows: 0,
            required: false,
        },
        {
            name: "downloads",
            label: "Letöltések",
            type: "group",
            interfaceName: "AwardeeDownloads",
            fields: [
                {
                    name: 'laudation_pdf',
                    label: 'Laudáció PDF',
                    type: 'upload',
                    relationTo: 'media',
                    required: false,
                },
                {
                    name: 'press_photo_pack',
                    label: 'Sajtófotó csomag',
                    type: 'upload',
                    relationTo: 'media',
                    required: false,
                },
                ],
            required: false,
        },
        {
            name: 'publications',
            label: 'Kiadvány',
            type: 'array',
            fields: [
                {
                    name: 'title',
                    label: 'Cím',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'title_en',
                    label: 'Title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'abstract',
                    label: 'Absztrakt',
                    type: 'text',
                    required: false,
                },
                {
                    name: 'abstract_en',
                    label: 'Abstract',
                    type: 'text',
                    required: false,
                },
                {
                    name: 'cover_image',
                    label: 'Cover image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'author',
                    label: 'Szerző(k)',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'date',
                    label: 'Megjelenés dátuma',
                    type: 'date',
                    required: true,
                },
                {
                    name: 'link',
                    label: 'Link',
                    type: 'text',
                    required: false,
                }
            ],
            minRows: 0,
            required: false,
        },
        {
            name: 'articles',
            label: 'Cikkek',
            type: 'array',
            fields: [
                {
                    name: 'title',
                    label: 'Cím',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'title_en',
                    label: 'Title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'abstract',
                    label: 'Absztrakt',
                    type: 'text',
                    required: false,
                },
                {
                    name: 'abstract_en',
                    label: 'Abstract',
                    type: 'text',
                    required: false,
                },
                {
                    name: 'cover_image',
                    label: 'Cover image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'author',
                    label: 'Szerző(k)',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'date',
                    label: 'Megjelenés dátuma',
                    type: 'date',
                    required: true,
                },
                {
                    name: 'link',
                    label: 'Link',
                    type: 'text',
                    required: false,
                },
                {
                    name: 'download',
                    label: 'Download',
                    type: 'upload',
                    relationTo: 'media',
                    required: false,
                }
            ],
            minRows: 0,
            required: false,
        },
        {
            name: "websites",
            label: "Weboldalak",
            type: "group",
            interfaceName: "AwardeeWebsites",
            fields: [
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
            ],
            required: false,
        }
    ]
}
import type { Block } from 'payload'
import {FixedToolbarFeature, HeadingFeature, lexicalEditor} from "@payloadcms/richtext-lexical";

export const ServicesBlock: Block = {
  slug: 'servicesBlock',
  interfaceName: 'servicesBlock',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'serviceItems',
      type: "array",
      fields: [
        {
          name: 'richText',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
              ]
            },
          }),
          label: false,
        },
        {
          name: 'stack',
          type: 'text'
        }
      ]
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

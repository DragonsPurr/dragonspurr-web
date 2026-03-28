import { defineArrayMember, defineField, defineType } from 'sanity';

export const brandType = defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    defineField({
      name: 'brandTitle',
      title: 'Brand Title',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'Link URL',
          type: 'url',
          validation: (rule) =>
            rule.required().uri({
              allowRelative: false,
              scheme: ['http', 'https'],
            }),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'brandDescription',
      title: 'Brand Description',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'brandImage',
      title: 'Brand Image',
      type: 'object',
      fields: [
        defineField({
          name: 'asset',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'Link URL',
          type: 'url',
          validation: (rule) =>
            rule.required().uri({
              allowRelative: false,
              scheme: ['http', 'https'],
            }),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'brandTitle.text',
      media: 'brandImage.asset',
      subtitle: 'brandTitle.url',
    },
  },
});

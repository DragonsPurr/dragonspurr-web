import { defineArrayMember, defineField, defineType } from 'sanity';

type TextSpan = { text: string; marks?: string[] };

function portableTextBlock(children: TextSpan[]) {
  return {
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: children.map(({ text, marks = [] }) => ({
      _type: 'span',
      marks,
      text,
    })),
  };
}

const whoWeAreInitialContent = [
  portableTextBlock([{ text: "Hi! We're Kayt and Ryan!" }]),
  portableTextBlock([
    { text: 'Co-Founders of ' },
    { text: "Dragon's Purr Crafts and Sundry!", marks: ['strong', 'em'] },
  ]),
  portableTextBlock([
    {
      text: "We started Dragon's Purr for a bunch of different reasons, but chief among them was a desire to share our creativity with the world, and to make dorky little trinkets that folks like us would find funny, charming, and above all, inclusive; it's our hope that you'll find a bit of yourselves in our quirky designs.",
    },
  ]),
  portableTextBlock([
    {
      text: 'Beyond that, we believe in helping out where we can, and championing causes close to our hearts, both through the art we make, and through direct support in the form of charitable donations which come from the sale of that same art.',
    },
  ]),
];

const whatWeMakeInitialContent = [
  portableTextBlock([
    {
      text: 'If you can slap vinyl on it, we can make it. From t-shirts to stickers, to mugs, keychains, and much more. Beyond the custom die-cut vinyl, we also offer small-scale custom engravings, and our own in-house designs on apparel courtesy of our sister brand, Hipster Donut Apparel. Check our portfolio page for some of our past work!',
    },
  ]),
];

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Portrait shown beside the "Who We Are" section (e.g. kayt-and-ryan.png).',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          initialValue: 'Kayt and Ryan',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'whoWeAre',
      title: 'Who We Are',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Who We Are',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
          initialValue: whoWeAreInitialContent,
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'whatWeMake',
      title: 'What We Make',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'What We Make',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
          initialValue: whatWeMakeInitialContent,
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Page' };
    },
  },
});

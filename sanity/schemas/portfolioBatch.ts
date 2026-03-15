import type { ReactNode } from 'react';

/**
 * Batch upload document: add many images here, then use the
 * "Create portfolio items" action to turn each into a Portfolio Item.
 */
export const portfolioBatch = {
  name: 'portfolioBatch',
  title: 'Portfolio batch upload',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional label for this batch (e.g. "March 2025 upload"). Not used on the site.',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Add multiple images here. When ready, use "Create portfolio items" in the document actions to create one portfolio item per image.',
    },
  ],
  preview: {
    select: { title: 'title', count: 'images' },
    prepare({ title, count }: { title?: string | null; count?: unknown[] }) {
      const n = Array.isArray(count) ? count.length : 0;
      return {
        title: title || 'Untitled batch',
        subtitle: n ? `${n} image${n === 1 ? '' : 's'}` : 'No images',
        media: undefined as ReactNode,
      };
    },
  },
};

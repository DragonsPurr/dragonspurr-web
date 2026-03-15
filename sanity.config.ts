'use client';

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio_portfolio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { createPortfolioItemsFromBatch } from './sanity/actions/createPortfolioItemsFromBatch';
import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

export default defineConfig({
  basePath: '/studio_portfolio',
  projectId: projectId!,
  dataset: dataset!,
  schema,
  document: {
    actions: (prev, { schemaType }) =>
      schemaType === 'portfolioBatch'
        ? [createPortfolioItemsFromBatch, ...prev]
        : prev,
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});

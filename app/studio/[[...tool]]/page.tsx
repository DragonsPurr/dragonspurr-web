/**
 * Embedded Sanity Studio at /studio
 */

import { NextStudio, NextStudioLayout } from 'next-sanity/studio';
import config from '../../../sanity.config';

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  return (
    <NextStudioLayout>
      <NextStudio config={config} />
    </NextStudioLayout>
  );
}

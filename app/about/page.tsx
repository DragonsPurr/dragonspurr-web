import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getAboutPage } from '@/app/lib/about';
import { isSanityConfigured, urlFor } from '@/app/lib/sanity';

export const metadata: Metadata = {
  title: 'About',
};

const aboutPortableTextComponents: PortableTextComponents = {
  marks: {
    strong: ({ children }) => <strong className="text-red-600">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
};

function AboutSection({
  heading,
  content,
}: {
  heading: string;
  content: PortableTextBlock[];
}) {
  return (
    <div className="dp-body-text">
      <strong className="dp-section-header">{heading}</strong>
      <div className="mt-4 [&_p+p]:mt-4">
        <PortableText value={content} components={aboutPortableTextComponents} />
      </div>
    </div>
  );
}

export default async function About() {
  const about = await getAboutPage();

  return (
    <div className="container mx-auto">
      {!isSanityConfigured() ? (
        <p className="dp-body-text mb-6">
          Add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` to start loading
          the About page from Sanity.
        </p>
      ) : null}
      {isSanityConfigured() && !about ? (
        <p className="dp-body-text">
          No About page content yet. Add the About Page document in `/studio`.
        </p>
      ) : null}
      {about ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex justify-start items-start">
            <Image
              src={urlFor(about.heroImage).width(500).auto('format').url()}
              alt={about.heroImage.alt}
              className="dp-circular-image"
              width={500}
              height={500}
            />
          </div>
          <AboutSection heading={about.whoWeAre.heading} content={about.whoWeAre.content} />
          <AboutSection heading={about.whatWeMake.heading} content={about.whatWeMake.content} />
        </div>
      ) : null}
    </div>
  );
}

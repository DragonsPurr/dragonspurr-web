import type { SanityImageSource } from '@sanity/image-url';
import type { PortableTextBlock } from '@portabletext/types';
import { groq } from 'next-sanity';
import { isSanityConfigured, sanityClient } from '@/app/lib/sanity';

export type AboutPageSection = {
  heading: string;
  content: PortableTextBlock[];
};

export type SanityAboutPage = {
  heroImage: {
    asset: SanityImageSource;
    alt: string;
  };
  whoWeAre: AboutPageSection;
  whatWeMake: AboutPageSection;
};

const aboutPageQuery = groq`
  *[_id == "aboutPage"][0]{
    heroImage {
      asset,
      alt
    },
    whoWeAre,
    whatWeMake
  }
`;

export async function getAboutPage(): Promise<SanityAboutPage | null> {
  if (!isSanityConfigured()) {
    return null;
  }

  return sanityClient.fetch<SanityAboutPage | null>(
    aboutPageQuery,
    {},
    { next: { revalidate: 60 } },
  );
}

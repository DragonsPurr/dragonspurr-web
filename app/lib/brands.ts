import type { SanityImageSource } from '@sanity/image-url';
import { groq } from 'next-sanity';
import { sanityClient, isSanityConfigured } from '@/app/lib/sanity';

export type BrandNavItem = {
  _id: string;
  text: string;
  url: string;
};

type PortableTextBlock = {
  _key: string;
  _type: 'block';
  children?: Array<{
    _key: string;
    _type: string;
    text?: string;
  }>;
};

export type SanityBrand = {
  _id: string;
  displayOrder: number;
  brandTitle: { text: string; url: string };
  brandDescription: PortableTextBlock[];
  brandImage: {
    asset: SanityImageSource;
    alt: string;
    url: string;
  };
};

const brandNavQuery = groq`
  *[_type == "brand"] | order(displayOrder asc) {
    _id,
    "text": brandTitle.text,
    "url": brandTitle.url,
  }
`;

const brandsPageQuery = groq`
  *[_type == "brand"] | order(displayOrder asc) {
    _id,
    displayOrder,
    brandTitle,
    brandDescription,
    brandImage,
  }
`;

export async function getBrandNavLinks(): Promise<BrandNavItem[]> {
  if (!isSanityConfigured()) {
    return [];
  }

  return sanityClient.fetch<BrandNavItem[]>(brandNavQuery, {}, { next: { revalidate: 60 } });
}

export async function getBrands(): Promise<SanityBrand[]> {
  if (!isSanityConfigured()) {
    return [];
  }

  return sanityClient.fetch<SanityBrand[]>(brandsPageQuery, {}, { next: { revalidate: 60 } });
}

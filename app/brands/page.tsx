import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { getBrands } from '@/app/lib/brands';
import { isSanityConfigured, urlFor } from '@/app/lib/sanity';

export default async function Brands() {
  const brands = await getBrands();

  return (
    <div className="container mx-auto">
      <div className="space-y-8 mb-6">
      {!isSanityConfigured() ? (
        <p className="dp-body-text mb-6">
          Add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` to start loading
          brands from Sanity.
        </p>
      ) : null}
      {isSanityConfigured() && brands.length === 0 ? (
        <p className="dp-body-text">
          No brands yet. Add `brand` documents in `/studio` to populate this page.
        </p>
      ) : null}
        {brands.map((brand) => (
          <div key={brand._id} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <a href={brand.brandImage.url} target="_blank" rel="noreferrer" className="block">
              <Image
                src={urlFor(brand.brandImage.asset).width(800).auto('format').url()}
                alt={brand.brandImage.alt}
                width={400}
                height={225}
                className="max-w-full h-auto"
              />
            </a>
            <div>
              <h3 className="dp-section-header mb-2 max-md:portrait:hidden">
                <a href={brand.brandTitle.url} target="_blank" rel="noreferrer">
                  {brand.brandTitle.text}
                </a>
              </h3>
              <div className="dp-body-text">
                <PortableText value={brand.brandDescription} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

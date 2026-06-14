jest.mock('next-sanity', () => ({
  groq: (strings: TemplateStringsArray, ...values: unknown[]) =>
    String.raw({ raw: strings }, ...values),
}));

jest.mock('@/app/lib/sanity', () => ({
  isSanityConfigured: jest.fn(),
  sanityClient: { fetch: jest.fn() },
}));

import { getBrandNavLinks, getBrands } from '@/app/lib/brands';
import { isSanityConfigured, sanityClient } from '@/app/lib/sanity';

const mockIsSanityConfigured = isSanityConfigured as jest.Mock;
const mockFetch = sanityClient.fetch as jest.Mock;

const mockBrands = [
  {
    _id: 'brand-1',
    displayOrder: 0,
    brandTitle: { text: 'Hipster Donut', url: 'https://example.com' },
    brandDescription: [],
    brandImage: {
      asset: { _ref: 'image-brand' },
      alt: 'Brand',
      url: 'https://example.com',
    },
  },
];

const mockNavLinks = [
  { _id: 'brand-1', text: 'Hipster Donut', url: 'https://example.com' },
];

describe('brand data fetchers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBrandNavLinks', () => {
    it('returns an empty array when Sanity is not configured', async () => {
      mockIsSanityConfigured.mockReturnValue(false);

      await expect(getBrandNavLinks()).resolves.toEqual([]);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('fetches nav links ordered by displayOrder with ISR revalidation', async () => {
      mockIsSanityConfigured.mockReturnValue(true);
      mockFetch.mockResolvedValue(mockNavLinks);

      await expect(getBrandNavLinks()).resolves.toEqual(mockNavLinks);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const [query, params, options] = mockFetch.mock.calls[0];
      expect(query).toContain('_type == "brand"');
      expect(query).toContain('order(displayOrder asc)');
      expect(query).toContain('brandTitle.text');
      expect(params).toEqual({});
      expect(options).toEqual({ next: { revalidate: 60 } });
    });
  });

  describe('getBrands', () => {
    it('returns an empty array when Sanity is not configured', async () => {
      mockIsSanityConfigured.mockReturnValue(false);

      await expect(getBrands()).resolves.toEqual([]);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('fetches full brand documents with ISR revalidation', async () => {
      mockIsSanityConfigured.mockReturnValue(true);
      mockFetch.mockResolvedValue(mockBrands);

      await expect(getBrands()).resolves.toEqual(mockBrands);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const [query, params, options] = mockFetch.mock.calls[0];
      expect(query).toContain('_type == "brand"');
      expect(query).toContain('brandDescription');
      expect(query).toContain('brandImage');
      expect(params).toEqual({});
      expect(options).toEqual({ next: { revalidate: 60 } });
    });
  });
});

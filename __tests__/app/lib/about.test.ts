jest.mock('next-sanity', () => ({
  groq: (strings: TemplateStringsArray, ...values: unknown[]) =>
    String.raw({ raw: strings }, ...values),
}));

jest.mock('@/app/lib/sanity', () => ({
  isSanityConfigured: jest.fn(),
  sanityClient: { fetch: jest.fn() },
}));

import { getAboutPage } from '@/app/lib/about';
import { isSanityConfigured, sanityClient } from '@/app/lib/sanity';

const mockIsSanityConfigured = isSanityConfigured as jest.Mock;
const mockFetch = sanityClient.fetch as jest.Mock;

const mockAboutPage = {
  heroImage: {
    asset: { _ref: 'image-hero' },
    alt: 'Hero',
  },
  whoWeAre: {
    heading: 'Who we are',
    content: [],
  },
  whatWeMake: {
    heading: 'What we make',
    content: [],
  },
};

describe('getAboutPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns null when Sanity is not configured', async () => {
    mockIsSanityConfigured.mockReturnValue(false);

    await expect(getAboutPage()).resolves.toBeNull();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('fetches the aboutPage singleton with ISR revalidation', async () => {
    mockIsSanityConfigured.mockReturnValue(true);
    mockFetch.mockResolvedValue(mockAboutPage);

    await expect(getAboutPage()).resolves.toEqual(mockAboutPage);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [query, params, options] = mockFetch.mock.calls[0];
    expect(query).toContain('aboutPage');
    expect(query).toContain('heroImage');
    expect(query).toContain('whoWeAre');
    expect(query).toContain('whatWeMake');
    expect(params).toEqual({});
    expect(options).toEqual({ next: { revalidate: 60 } });
  });
});

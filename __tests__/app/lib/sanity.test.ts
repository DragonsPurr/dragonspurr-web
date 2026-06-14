jest.mock('next-sanity', () => ({
  createClient: jest.fn(() => ({
    config: () => ({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'build-placeholder',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    }),
  })),
}));

const mockImage = jest.fn(() => ({
  width: jest.fn().mockReturnValue({
    url: jest.fn().mockReturnValue('https://cdn.sanity.io/images/abc123/production/test.jpg?w=500'),
  }),
}));

jest.mock('@sanity/image-url', () => ({
  createImageUrlBuilder: jest.fn(() => ({
    image: mockImage,
  })),
}));

describe('sanity lib', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('isSanityConfigured', () => {
    it('returns false when NEXT_PUBLIC_SANITY_PROJECT_ID is missing', async () => {
      delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
      process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';

      const { isSanityConfigured } = await import('@/app/lib/sanity');
      expect(isSanityConfigured()).toBe(false);
    });

    it('returns true when project id and dataset are set', async () => {
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'test-project';
      process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';

      const { isSanityConfigured } = await import('@/app/lib/sanity');
      expect(isSanityConfigured()).toBe(true);
    });

    it('defaults dataset to production when unset', async () => {
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'test-project';
      delete process.env.NEXT_PUBLIC_SANITY_DATASET;

      const { isSanityConfigured } = await import('@/app/lib/sanity');
      expect(isSanityConfigured()).toBe(true);
    });
  });

  describe('urlFor', () => {
    it('delegates image sources to the Sanity image URL builder', async () => {
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'abc123';
      process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';

      const { urlFor } = await import('@/app/lib/sanity');
      const source = { _ref: 'image-abc456-jpg' };
      const url = urlFor(source).width(500).url();

      expect(mockImage).toHaveBeenCalledWith(source);
      expect(url).toBe('https://cdn.sanity.io/images/abc123/production/test.jpg?w=500');
    });
  });
});

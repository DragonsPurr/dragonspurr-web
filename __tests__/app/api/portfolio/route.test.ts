/**
 * @jest-environment node
 */

jest.mock('@/app/lib/sanity', () => ({
  isSanityConfigured: jest.fn(),
  sanityClient: { fetch: jest.fn() },
  urlFor: jest.fn(() => ({
    width: (size: number) => ({
      url: () => `https://cdn.sanity.io/images/test/portfolio-${size}.jpg`,
    }),
  })),
}));

import { GET } from '@/app/api/portfolio/route';
import { isSanityConfigured, sanityClient } from '@/app/lib/sanity';
import type { NextRequest } from 'next/server';

const mockIsSanityConfigured = isSanityConfigured as jest.Mock;
const mockFetch = sanityClient.fetch as jest.Mock;

function createRequest(url = 'http://localhost/api/portfolio?page=1'): NextRequest {
  return { url } as NextRequest;
}

describe('GET /api/portfolio', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 503 when Sanity is not configured', async () => {
    mockIsSanityConfigured.mockReturnValue(false);

    const response = await GET(createRequest());
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toContain('Sanity is not configured');
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('returns paginated portfolio photos when Sanity is configured', async () => {
    mockIsSanityConfigured.mockReturnValue(true);
    mockFetch.mockImplementation((query: string) => {
      if (query.includes('count(')) {
        return Promise.resolve(3);
      }
      return Promise.resolve([
        {
          _id: 'portfolio-1',
          title: 'Engraved mug',
          description: 'Custom work',
          url: 'https://example.com/work',
          image: { _ref: 'image-portfolio' },
        },
      ]);
    });

    const response = await GET(createRequest());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      photos: [
        {
          id: 'portfolio-1',
          title: 'Engraved mug',
          description: 'Custom work',
          url: 'https://example.com/work',
          urlMedium: 'https://cdn.sanity.io/images/test/portfolio-500.jpg',
          urlLarge: 'https://cdn.sanity.io/images/test/portfolio-640.jpg',
          urlModal: 'https://cdn.sanity.io/images/test/portfolio-1200.jpg',
        },
      ],
      page: 1,
      pages: 1,
      total: 3,
      perPage: 18,
    });
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('returns 502 when Sanity fetch fails', async () => {
    mockIsSanityConfigured.mockReturnValue(true);
    mockFetch.mockRejectedValue(new Error('Sanity unavailable'));

    const response = await GET(createRequest());
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body.error).toBe('Sanity unavailable');
  });
});

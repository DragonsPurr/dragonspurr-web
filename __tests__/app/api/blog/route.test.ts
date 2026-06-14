/**
 * @jest-environment node
 */

jest.mock('@/app/lib/sanity', () => ({
  isSanityConfigured: jest.fn(),
  sanityClient: { fetch: jest.fn() },
  urlFor: jest.fn(() => ({
    width: () => ({
      height: () => ({
        url: () => 'https://cdn.sanity.io/images/test/author.jpg',
      }),
      url: () => 'https://cdn.sanity.io/images/test/post.jpg',
    }),
    url: () => 'https://cdn.sanity.io/images/test/post.jpg',
  })),
}));

import { GET } from '@/app/api/blog/route';
import { isSanityConfigured, sanityClient } from '@/app/lib/sanity';
import type { NextRequest } from 'next/server';

const mockIsSanityConfigured = isSanityConfigured as jest.Mock;
const mockFetch = sanityClient.fetch as jest.Mock;

function createRequest(url = 'http://localhost/api/blog?page=1'): NextRequest {
  return { url } as NextRequest;
}

describe('GET /api/blog', () => {
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

  it('returns paginated blog posts when Sanity is configured', async () => {
    mockIsSanityConfigured.mockReturnValue(true);
    mockFetch.mockImplementation((query: string) => {
      if (query.includes('count(')) {
        return Promise.resolve(2);
      }
      return Promise.resolve([
        {
          _id: 'post-1',
          title: 'First post',
          publishedAt: '2026-01-01T00:00:00.000Z',
          author: { _id: 'author-1', name: 'Kayt', image: { _ref: 'image-author' } },
          tags: ['news', 42],
          content: [{ _type: 'block', children: [{ text: 'Hello world' }] }],
          image: { _ref: 'image-post', caption: 'A caption' },
        },
      ]);
    });

    const response = await GET(createRequest());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      blogPosts: [
        {
          id: 'post-1',
          title: 'First post',
          publishedAt: '2026-01-01T00:00:00.000Z',
          author: {
            name: 'Kayt',
            imageUrl: 'https://cdn.sanity.io/images/test/author.jpg',
          },
          tags: ['news'],
          content: [{ _type: 'block', children: [{ text: 'Hello world' }] }],
          image: 'https://cdn.sanity.io/images/test/post.jpg',
          imageCaption: 'A caption',
        },
      ],
      page: 1,
      pages: 2,
      total: 2,
      perPage: 1,
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

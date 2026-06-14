/**
 * @jest-environment node
 */

jest.mock('@/app/lib/sanity', () => ({
  isSanityConfigured: jest.fn(),
  sanityClient: { fetch: jest.fn() },
}));

import { GET } from '@/app/api/blog/list/route';
import { isSanityConfigured, sanityClient } from '@/app/lib/sanity';
import type { NextRequest } from 'next/server';

const mockIsSanityConfigured = isSanityConfigured as jest.Mock;
const mockFetch = sanityClient.fetch as jest.Mock;

function createRequest(url = 'http://localhost/api/blog/list'): NextRequest {
  return { url } as NextRequest;
}

describe('GET /api/blog/list', () => {
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

  it('returns sidebar posts with excerpts when Sanity is configured', async () => {
    mockIsSanityConfigured.mockReturnValue(true);
    mockFetch.mockResolvedValue([
      {
        _id: 'post-1',
        title: 'First post',
        publishedAt: '2026-01-01T00:00:00.000Z',
        author: { _id: 'author-1', name: 'Kayt' },
        tags: ['news', null],
        content: [
          {
            _type: 'block',
            children: [{ text: 'Hello from Sanity' }],
          },
        ],
      },
    ]);

    const response = await GET(createRequest());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      posts: [
        {
          id: 'post-1',
          title: 'First post',
          publishedAt: '2026-01-01T00:00:00.000Z',
          author: 'Kayt',
          tags: ['news'],
          excerpt: 'Hello from Sanity',
          page: 1,
        },
      ],
    });
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toContain('blogPost');
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

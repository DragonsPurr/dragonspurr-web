jest.mock('@medusajs/js-sdk', () => {
  class FetchError extends Error {
    status?: number;
    statusText?: string;

    constructor(message: string, statusText?: string, status?: number) {
      super(message);
      this.name = 'FetchError';
      this.status = status;
      this.statusText = statusText;
    }
  }

  class Medusa {
    client = { fetch: jest.fn() };
  }

  return { __esModule: true, default: Medusa, FetchError };
});

import { FetchError } from '@medusajs/js-sdk';
import { formatMedusaError } from '@/app/lib/medusa';

describe('formatMedusaError', () => {
  it('returns actionable guidance for 403 responses', () => {
    const err = new FetchError('Forbidden', 'Forbidden', 403);
    expect(formatMedusaError(err, 'Failed to load products from Medusa.')).toContain(
      '403 Forbidden'
    );
    expect(formatMedusaError(err, 'Failed to load products from Medusa.')).toContain(
      'MEDUSA_PUBLISHABLE_KEY'
    );
  });

  it('returns the Medusa message for publishable key errors', () => {
    const err = new FetchError(
      'Publishable API key required in the request header: x-publishable-api-key.',
      'Bad Request',
      400
    );
    expect(formatMedusaError(err, 'fallback')).toContain('Publishable API key required');
  });

  it('falls back for unknown errors', () => {
    expect(formatMedusaError(new Error('network down'), 'Something failed.')).toBe('network down');
    expect(formatMedusaError(null, 'Something failed.')).toBe('Something failed.');
  });
});

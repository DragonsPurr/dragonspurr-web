import Medusa, { FetchError } from '@medusajs/js-sdk';
import type { FetchArgs } from '@medusajs/js-sdk';

function readEnv(name: string, publicName: string): string | undefined {
  const value = process.env[name]?.trim() || process.env[publicName]?.trim();
  return value || undefined;
}

const MEDUSA_BACKEND_URL =
  readEnv('MEDUSA_BACKEND_URL', 'NEXT_PUBLIC_MEDUSA_BACKEND_URL') ??
  'http://localhost:9000';

export const medusaPublishableKey = readEnv(
  'MEDUSA_PUBLISHABLE_KEY',
  'NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY'
);

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === 'development',
  publishableKey: medusaPublishableKey,
  auth: {
    type: 'jwt',
    jwtTokenStorageMethod: 'memory',
  },
});

const medusaFetch = sdk.client.fetch.bind(sdk.client);
sdk.client.fetch = (input, init?: FetchArgs) =>
  medusaFetch(input, { cache: 'no-store', ...init });

export function isMedusaConfigured(): boolean {
  return Boolean(medusaPublishableKey);
}

export function formatMedusaError(err: unknown, fallback: string): string {
  if (err instanceof FetchError) {
    if (err.status === 403) {
      return (
        'Medusa rejected this request (403 Forbidden). Confirm MEDUSA_PUBLISHABLE_KEY is set in ' +
        'production, linked to your sales channel in Medusa Admin, and redeploy after updating env vars.'
      );
    }
    if (err.status === 400 && err.message.includes('publishable')) {
      return err.message;
    }
    if (err.message && err.message !== err.statusText) {
      return err.message;
    }
    if (err.status) {
      return `${fallback} (HTTP ${err.status}${err.statusText ? `: ${err.statusText}` : ''})`;
    }
  }

  if (err instanceof Error && err.message) {
    return err.message;
  }

  return fallback;
}

import { headers } from 'next/headers';

export async function getRequestPathname(): Promise<string> {
  return (await headers()).get('x-pathname') ?? '';
}

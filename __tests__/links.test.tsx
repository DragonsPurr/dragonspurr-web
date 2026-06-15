import { render, waitFor } from '@testing-library/react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Home from '@/app/page';
import About from '@/app/about/page';
import Brands from '@/app/brands/page';
import Portfolio from '@/app/portfolio/page';
import Contact from '@/app/contact/page';
import NotFound from '@/app/not-found';

jest.mock('@/app/lib/about', () => ({
  getAboutPage: jest.fn(),
}));

jest.mock('@/app/lib/brands', () => ({
  getBrands: jest.fn(),
}));

jest.mock('@/app/lib/sanity', () => ({
  isSanityConfigured: jest.fn(() => true),
  urlFor: jest.fn(() => ({
    width: () => ({
      auto: () => ({
        url: () => 'https://example.com/brand-image.jpg',
      }),
    }),
  })),
}));

const { getAboutPage } = jest.requireMock<{ getAboutPage: jest.Mock }>('@/app/lib/about');
const { getBrands } = jest.requireMock<{ getBrands: jest.Mock }>('@/app/lib/brands');

const mockAboutPage = {
  heroImage: {
    asset: { _ref: 'image-about' },
    alt: 'Kayt and Ryan',
  },
  whoWeAre: {
    heading: 'Who We Are',
    content: [
      {
        _key: 'who-1',
        _type: 'block',
        children: [{ _key: 'who-span-1', _type: 'span', text: "Hi! We're Kayt and Ryan!" }],
      },
    ],
  },
  whatWeMake: {
    heading: 'What We Make',
    content: [
      {
        _key: 'what-1',
        _type: 'block',
        children: [{ _key: 'what-span-1', _type: 'span', text: 'Vinyl and more.' }],
      },
    ],
  },
};

const mockBrands = [
  {
    _id: 'brand-1',
    displayOrder: 1,
    brandTitle: { text: "Dragon's Purr Crafts and Sundry", url: 'https://dragonspurr.ca' },
    brandDescription: [
      {
        _key: 'desc-1',
        _type: 'block',
        children: [{ _key: 'span-1', _type: 'span', text: 'Main brand description.' }],
      },
    ],
    brandImage: {
      asset: { _ref: 'image-1' },
      alt: "Dragon's Purr Crafts and Sundry",
      url: 'https://dragonspurr.ca',
    },
  },
  {
    _id: 'brand-2',
    displayOrder: 2,
    brandTitle: { text: 'Hipster Donut Apparel', url: 'https://hipsterdonut.myspreadshop.ca' },
    brandDescription: [
      {
        _key: 'desc-2',
        _type: 'block',
        children: [{ _key: 'span-2', _type: 'span', text: 'Donut apparel description.' }],
      },
    ],
    brandImage: {
      asset: { _ref: 'image-2' },
      alt: 'Hipster Donut Apparel',
      url: 'https://hipsterdonut.myspreadshop.ca',
    },
  },
];

const mockFetch = (url: string) => {
  if (url.startsWith('/api/portfolio'))
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ photos: [], page: 1, pages: 0, total: 0 }),
    });
  return Promise.reject(new Error('unexpected fetch'));
};
beforeAll(() => {
  global.fetch = mockFetch as typeof fetch;
  getAboutPage.mockResolvedValue(mockAboutPage);
  getBrands.mockResolvedValue(mockBrands);
});

const VALID_INTERNAL_PATHS = [
  '/',
  '/about',
  '/brands',
  '/blog',
  '/portfolio',
  '/shop',
  '/shop/account',
  '/shop/orders',
  '/shop/cart',
  '/shop/login',
  '/shop/signup',
  '/shop/checkout',
  '/contact',
  '/privacy',
];

function getAllLinks(container: HTMLElement): HTMLAnchorElement[] {
  return Array.from(container.querySelectorAll('a[href]'));
}

function getLinkHrefs(container: HTMLElement): string[] {
  return getAllLinks(container).map((a) => a.getAttribute('href')!.trim());
}

describe('All links have valid hrefs', () => {
  it('Navigation links have valid hrefs', () => {
    const { container } = render(<Navigation />);
    const hrefs = getLinkHrefs(container);
    expect(hrefs.length).toBeGreaterThan(0);
    hrefs.forEach((href) => {
      expect(href).toBeTruthy();
      if (href.startsWith('/')) {
        expect(VALID_INTERNAL_PATHS).toContain(href);
      } else {
        expect(href).toMatch(/^https?:\/\//);
      }
    });
  });

  it('Footer links have valid hrefs', () => {
    const { container } = render(<Footer />);
    const hrefs = getLinkHrefs(container);
    expect(hrefs.length).toBeGreaterThan(0);
    hrefs.forEach((href) => {
      expect(href).toBeTruthy();
      if (href.startsWith('/')) {
        expect(VALID_INTERNAL_PATHS).toContain(href);
      } else {
        expect(href).toMatch(/^https?:\/\//);
      }
    });
  });

  it('Brands page brand links have valid hrefs', async () => {
    const { container } = render(await Brands());
    const hrefs = getLinkHrefs(container);
    expect(hrefs.length).toBeGreaterThanOrEqual(2);
    hrefs.forEach((href) => {
      expect(href).toBeTruthy();
      expect(href).toMatch(/^https?:\/\//);
    });
  });

  it('Contact page links have valid hrefs', () => {
    const { container } = render(<Contact />);
    const hrefs = getLinkHrefs(container);
    expect(hrefs.length).toBeGreaterThanOrEqual(2);
    hrefs.forEach((href) => {
      expect(href).toBeTruthy();
      expect(href).toMatch(/^(https?:\/\/|tel:|mailto:)/);
    });
  });

  it('Home page has no standalone links (only nav/footer when in layout)', () => {
    const { container } = render(<Home />);
    const links = getAllLinks(container);
    expect(links.length).toBe(0);
  });

  it('About page has no links in content', async () => {
    const { container } = render(await About());
    const links = getAllLinks(container);
    expect(links.length).toBe(0);
  });

  it('Portfolio page has no links in content', async () => {
    const { container } = render(<Portfolio />);
    await waitFor(() => {
      expect(container.querySelector('.animate-pulse')).toBeNull();
    });
    const links = getAllLinks(container);
    expect(links.length).toBe(0);
  });

  it('Not-found page has no links in content', () => {
    const { container } = render(<NotFound />);
    const links = getAllLinks(container);
    expect(links.length).toBe(1);
    expect(links[0].getAttribute('href')).toBe('/');
  });
});

describe('All expected links are present and resolve to correct targets', () => {
  it('Navigation contains all expected internal and external links', () => {
    const { container } = render(<Navigation />);
    const hrefs = getLinkHrefs(container);
    expect(hrefs).toContain('/');
    expect(hrefs).toContain('/about');
    expect(hrefs).toContain('/brands');
    expect(hrefs).toContain('/blog');
    expect(hrefs).toContain('/portfolio');
    expect(hrefs).toContain('/contact');
    expect(hrefs).toContain('/shop');
  });

  it('Footer contains expected external links', () => {
    const { container } = render(<Footer />);
    const hrefs = getLinkHrefs(container);
    expect(hrefs.filter((h) => h === 'https://dragonspurr.ca').length).toBe(1);
    expect(hrefs.filter((h) => h === 'https://boxingoctop.us').length).toBe(1);
    expect(hrefs).toContain('/privacy');
  });

  it('Brands page links resolve to expected brand URLs', async () => {
    const { container } = render(await Brands());
    const hrefs = getLinkHrefs(container);
    expect(hrefs).toContain('https://dragonspurr.ca');
    expect(hrefs).toContain('https://hipsterdonut.myspreadshop.ca');
  });

  it('Contact page links resolve to expected targets', () => {
    const { container } = render(<Contact />);
    const hrefs = getLinkHrefs(container);
    expect(hrefs.some((href) => href.startsWith('tel:'))).toBe(true);
    expect(hrefs.some((href) => href.startsWith('mailto:info@dragonspurr.ca'))).toBe(true);
  });
});

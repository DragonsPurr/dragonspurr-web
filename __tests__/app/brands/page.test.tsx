import { render, screen } from '@testing-library/react';
import Brands from '@/app/brands/page';

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

const { getBrands } = jest.requireMock<{ getBrands: jest.Mock }>('@/app/lib/brands');

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

describe('Brands page', () => {
  beforeEach(() => {
    getBrands.mockResolvedValue(mockBrands);
  });

  it('renders all brand images with correct alt text', async () => {
    render(await Brands());
    expect(screen.getByRole('img', { name: /dragon's purr crafts and sundry/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /hipster donut apparel/i })).toBeInTheDocument();
  });

  it('brand images use Sanity image URLs', async () => {
    render(await Brands());
    const img = screen.getByRole('img', { name: /dragon's purr crafts and sundry/i });
    expect(img).toHaveAttribute('src', expect.stringContaining('example.com%2Fbrand-image.jpg'));
  });

  it('brand images are wrapped in links to the correct URLs', async () => {
    render(await Brands());
    const dragonLinks = screen.getAllByRole('link', { name: /dragon's purr crafts and sundry/i });
    expect(dragonLinks.length).toBeGreaterThan(0);
    const imageLink = dragonLinks.find((el) => el.querySelector('img'));
    expect(imageLink).toBeDefined();
    expect(imageLink).toHaveAttribute('href', 'https://dragonspurr.ca');
    expect(imageLink).toHaveAttribute('target', '_blank');
  });

  it('renders brand descriptions from Sanity', async () => {
    render(await Brands());
    expect(screen.getByText('Main brand description.')).toBeInTheDocument();
    expect(screen.getByText('Donut apparel description.')).toBeInTheDocument();
  });
});

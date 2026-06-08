/// <reference types="jest" />
import { render, screen } from '@testing-library/react';
import About from '@/app/about/page';

jest.mock('@/app/lib/about', () => ({
  getAboutPage: jest.fn(),
}));

jest.mock('@/app/lib/sanity', () => ({
  isSanityConfigured: jest.fn(() => true),
  urlFor: jest.fn(() => ({
    width: () => ({
      auto: () => ({
        url: () => 'https://example.com/kayt-and-ryan.png',
      }),
    }),
  })),
}));

const { getAboutPage } = jest.requireMock<{ getAboutPage: jest.Mock }>('@/app/lib/about');

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
      {
        _key: 'who-2',
        _type: 'block',
        children: [
          {
            _key: 'who-span-2',
            _type: 'span',
            text: "We started Dragon's Purr for a bunch of different reasons, but chief among them was a desire to share our creativity with the world, and to make dorky little trinkets that folks like us would find funny, charming, and above all, inclusive; it's our hope that you'll find a bit of yourselves in our quirky designs.",
          },
        ],
      },
      {
        _key: 'who-3',
        _type: 'block',
        children: [
          {
            _key: 'who-span-3',
            _type: 'span',
            text: 'Beyond that, we believe in helping out where we can, and championing causes close to our hearts, both through the art we make, and through direct support in the form of charitable donations which come from the sale of that same art.',
          },
        ],
      },
    ],
  },
  whatWeMake: {
    heading: 'What We Make',
    content: [
      {
        _key: 'what-1',
        _type: 'block',
        children: [
          {
            _key: 'what-span-1',
            _type: 'span',
            text: 'If you can slap vinyl on it, we can make it. From t-shirts to stickers, to mugs, keychains, and much more.',
          },
        ],
      },
    ],
  },
};

describe('About page', () => {
  beforeEach(() => {
    getAboutPage.mockResolvedValue(mockAboutPage);
  });

  it('renders the profile image with correct alt text', async () => {
    render(await About());
    const img = screen.getByRole('img', { name: /kayt and ryan/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', 'Kayt and Ryan');
  });

  it('profile image uses Sanity image URL', async () => {
    render(await About());
    const img = screen.getByRole('img', { name: /ryan/i });
    expect(img).toHaveAttribute('src', expect.stringContaining('kayt-and-ryan.png'));
  });

  it('renders the bio text from Sanity', async () => {
    render(await About());
    expect(screen.getByText(/hi! we're kayt and ryan!/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /we started dragon's purr for a bunch of different reasons, but chief among them was a desire to share our creativity with the world, and to make dorky little trinkets that folks like us would find funny, charming, and above all, inclusive; it's our hope that you'll find a bit of yourselves in our quirky designs./i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /beyond that, we believe in helping out where we can, and championing causes close to our hearts, both through the art we make, and through direct support in the form of charitable donations which come from the sale of that same art./i,
      ),
    ).toBeInTheDocument();
  });

  it('renders section headings from Sanity', async () => {
    render(await About());
    expect(screen.getByText('Who We Are')).toBeInTheDocument();
    expect(screen.getByText('What We Make')).toBeInTheDocument();
  });
});

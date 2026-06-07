import { render, screen } from '@testing-library/react';
import { Navigation } from '@/components/Navigation';

describe('Navigation', () => {
  it('renders the logo with correct alt text', () => {
    render(<Navigation />);
    expect(screen.getByAltText("Dragon's Purr Crafts and Sundry")).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /brands/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /portfolio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /shop/i })).toBeInTheDocument();
  });

  it('links to correct internal paths', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: /blog/i })).toHaveAttribute('href', '/blog');
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: /shop/i })).toHaveAttribute('href', '/shop');
  });

  it('Shop link is an internal route (not external)', () => {
    render(<Navigation />);
    const shopLink = screen.getByRole('link', { name: /shop/i });
    expect(shopLink).not.toHaveAttribute('target', '_blank');
  });
});

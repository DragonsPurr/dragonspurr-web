import { render, screen } from '@testing-library/react';
import Projects from '@/app/brands/page';

describe('Projects page', () => {
  it('renders the Projects title', () => {
    render(<Projects />);
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('renders all four project images with correct alt text', () => {
    render(<Projects />);
    expect(screen.getByRole('img', { name: /ryan draga's nerd emporium/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /my life in music/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /hipster donut apparel/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /chains invent insanity/i })).toBeInTheDocument();
  });

  it('Nerd Emporium image has correct src', () => {
    render(<Projects />);
    const img = screen.getByRole('img', { name: /ryan draga's nerd emporium/i });
    expect(img).toHaveAttribute('src', expect.stringContaining('nerd-emporium-banner-logo.png'));
  });

  it('My Life In Music image has correct src', () => {
    render(<Projects />);
    const img = screen.getByRole('img', { name: /my life in music/i });
    expect(img).toHaveAttribute('src', expect.stringContaining('mlim-circular-logo.png'));
  });

  it('Hipster Donut image has correct src', () => {
    render(<Projects />);
    const img = screen.getByRole('img', { name: /hipster donut apparel/i });
    expect(img).toHaveAttribute('src', expect.stringContaining('hipsterdonut-logo-wide.png'));
  });

  it('Chains Invent Insanity image has correct src', () => {
    render(<Projects />);
    const img = screen.getByRole('img', { name: /chains invent insanity/i });
    expect(img).toHaveAttribute('src', expect.stringContaining('ci2-logo-black.png'));
  });

  it('project images are wrapped in links to the correct URLs', () => {
    render(<Projects />);
    const nerdLink = screen.getByRole('link', { name: /ryan draga's nerd emporium/i });
    expect(nerdLink).toHaveAttribute('href', 'https://ryandraga.me');
    expect(nerdLink).toHaveAttribute('target', '_blank');
  });
});

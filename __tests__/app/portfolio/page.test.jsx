import { render, screen } from '@testing-library/react';
import Portfolio from '@/app/portfolio/page';

describe('Portfolio page', () => {
  it('renders the Portfolio title', () => {
    render(<Portfolio />);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('renders the portfolio logo image with correct alt text', () => {
    render(<Portfolio />);
    const img = screen.getByRole('img', { name: /dragon's purr crafts and sundry logo/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', "Dragon's Purr Crafts and Sundry logo");
  });

  it('portfolio logo has correct src', () => {
    render(<Portfolio />);
    const img = screen.getByRole('img', { name: /dragon's purr crafts and sundry logo/i });
    expect(img).toHaveAttribute('src', expect.stringContaining('square-logo-for-dark-bkgds.png'));
  });

  it('renders the Discord iframe', () => {
    render(<Portfolio />);
    expect(screen.getByText(/coming soon!/i)).toBeInTheDocument();
  });
});

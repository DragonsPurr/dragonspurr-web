import { render, screen } from '@testing-library/react';
import Collective from '@/app/portfolio/page';

describe('Collective page', () => {
  it('renders the Collective title', () => {
    render(<Collective />);
    expect(screen.getByText('Collective')).toBeInTheDocument();
  });

  it('renders the collective logo image with correct alt text', () => {
    render(<Collective />);
    const img = screen.getByRole('img', { name: /collective logo/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', 'Collective logo');
  });

  it('collective logo has correct src', () => {
    render(<Collective />);
    const img = screen.getByRole('img', { name: /collective logo/i });
    expect(img).toHaveAttribute('src', 'https://assets.boxingoctop.us/img%2Fcollective-logo.png');
  });

  it('renders the Discord iframe', () => {
    render(<Collective />);
    const iframe = screen.getByTitle('Discord');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', expect.stringContaining('discord.com/widget'));
  });

  it('renders the collective description text', () => {
    render(<Collective />);
    expect(screen.getByText(/one of my great passions/i)).toBeInTheDocument();
    expect(screen.getByText(/discord server/i)).toBeInTheDocument();
  });
});

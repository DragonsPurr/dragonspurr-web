import { render, screen } from '@testing-library/react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Home from '@/app/page';
import About from '@/app/about/page';
import Projects from '@/app/brands/page';
import Collective from '@/app/portfolio/page';
import Contact from '@/app/contact/page';
import NotFound from '@/app/not-found';

const VALID_INTERNAL_PATHS = ['/', '/about', '/projects', '/collective', '/contact'];

function getAllLinks(container) {
  return Array.from(container.querySelectorAll('a[href]'));
}

function getLinkHrefs(container) {
  return getAllLinks(container).map((a) => a.getAttribute('href').trim());
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
      expect(href).toMatch(/^https?:\/\//);
    });
  });

  it('Projects page project links have valid hrefs', () => {
    const { container } = render(<Projects />);
    const hrefs = getLinkHrefs(container);
    expect(hrefs.length).toBe(4);
    hrefs.forEach((href) => {
      expect(href).toBeTruthy();
      expect(href).toMatch(/^https?:\/\//);
    });
  });

  it('Contact page social links have valid hrefs', () => {
    const { container } = render(<Contact />);
    const hrefs = getLinkHrefs(container);
    expect(hrefs.length).toBeGreaterThanOrEqual(3);
    hrefs.forEach((href) => {
      expect(href).toBeTruthy();
      expect(href).toMatch(/^https?:\/\//);
    });
  });

  it('Home page has no standalone links (only nav/footer when in layout)', () => {
    const { container } = render(<Home />);
    const links = getAllLinks(container);
    expect(links.length).toBe(0);
  });

  it('About page has no links in content', () => {
    const { container } = render(<About />);
    const links = getAllLinks(container);
    expect(links.length).toBe(0);
  });

  it('Collective page has no links in content', () => {
    const { container } = render(<Collective />);
    const links = getAllLinks(container);
    expect(links.length).toBe(0);
  });

  it('Not-found page has no links in content', () => {
    const { container } = render(<NotFound />);
    const links = getAllLinks(container);
    expect(links.length).toBe(0);
  });
});

describe('All expected links are present and resolve to correct targets', () => {
  it('Navigation contains all expected internal and external links', () => {
    const { container } = render(<Navigation />);
    const hrefs = getLinkHrefs(container);
    expect(hrefs).toContain('/');
    expect(hrefs).toContain('/about');
    expect(hrefs).toContain('/projects');
    expect(hrefs).toContain('/collective');
    expect(hrefs).toContain('/contact');
    expect(hrefs).toContain('https://github.com/boxingoctopus');
  });

  it('Footer contains expected external links', () => {
    const { container } = render(<Footer />);
    const hrefs = getLinkHrefs(container);
    expect(hrefs.filter((h) => h === 'https://boxingoctop.us').length).toBe(2);
    expect(hrefs).toContain('https://nextjs.org');
    expect(hrefs).toContain('https://tailwindcss.com');
  });

  it('Projects page links resolve to expected project URLs', () => {
    const { container } = render(<Projects />);
    const hrefs = getLinkHrefs(container);
    expect(hrefs).toContain('https://ryandraga.me');
    expect(hrefs).toContain('https://mylifeinmusic.me');
    expect(hrefs).toContain('https://hipsterdonut.myspreadshop.ca');
    expect(hrefs).toContain('https://chainsinventinsanity.com');
  });

  it('Contact page social links resolve to expected URLs', () => {
    const { container } = render(<Contact />);
    const hrefs = getLinkHrefs(container);
    expect(hrefs).toContain('https://bsky.app/profile/boxingoctopus.social');
    expect(hrefs).toContain('https://www.linkedin.com/in/ryandraga');
    expect(hrefs).toContain('https://hey.cafe/@boxingoctopus');
  });
});

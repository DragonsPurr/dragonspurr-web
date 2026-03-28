'use client';

import type { BrandNavItem } from '@/app/lib/brands';
import { externalLinkAttributes, logoTypes } from '@/app/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/brands', label: 'Brands' },
  { href: '/blog', label: 'Blog' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
];

type NavigationProps = {
  brandNavLinks?: BrandNavItem[];
};

export function Navigation({ brandNavLinks = [] }: NavigationProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 1024;
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const mq = window.matchMedia('(max-width: 1023px)');
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    }

    if (typeof mq.addListener === 'function' && typeof mq.removeListener === 'function') {
      mq.addListener(onChange);
      return () => mq.removeListener(onChange);
    }
  }, []);

  useEffect(() => {
    if (!isMobile && menuOpen) setMenuOpen(false);
  }, [isMobile, menuOpen]);

  const isActive = (href: string) => {
    if (pathname == null) return false;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  const linkClass = (active: boolean) =>
    active
      ? 'text-red-600 no-underline hover:text-red-600 focus:text-red-600'
      : 'dp-link';

  const renderNavLink = (href: string, label: string) => {
    const active = isActive(href);

    if (href === '/brands' && brandNavLinks.length > 0) {
      return (
        <div key={href} className="group relative inline-block">
          <Link
            href={href}
            aria-current={active ? 'page' : undefined}
            aria-haspopup="menu"
            className={`inline-flex items-center gap-0.5 ${linkClass(active)}`}
          >
            {label}
            <span aria-hidden className="text-[0.65em] opacity-80">
              ▾
            </span>
          </Link>
          <div
            className="pointer-events-none absolute left-0 top-full z-[60] pt-1 opacity-0 invisible transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:visible group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible"
          >
            <ul
              role="menu"
              aria-label="Brand links"
              className="min-w-[12rem] rounded-md border border-red-800 bg-black/95 py-2 shadow-lg md:min-w-[14rem]"
            >
              {brandNavLinks.map((b) => (
                <li key={b._id} role="none">
                  <a
                    role="menuitem"
                    href={b.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block whitespace-normal px-4 py-2 font-cinzel text-base md:text-xl dp-link"
                  >
                    {b.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    return (
      <Link
        key={href}
        href={href}
        aria-current={active ? 'page' : undefined}
        className={linkClass(active)}
      >
        {label}
      </Link>
    );
  };

  const navLinksContent = (
    <>
      {navLinks.map(({ href, label }) => renderNavLink(href, label))}
      <a href="https://shop.dragonspurr.ca" className="dp-link" {...externalLinkAttributes}>
        Shop
      </a>
    </>
  );

  return (
    <nav className="bg-black w-full flex justify-center pt-2.5 md:pr-[100px] sticky top-0 z-50 border-b-2 border-red-800 pb-2 px-3 md:px-0">
      <div className="w-full max-w-7xl flex items-center justify-between gap-3 md:gap-6">
        <Link href="/" className="flex items-center">
          <Image
            src={logoTypes.wide_for_dark_bkgds}
            alt="Dragon's Purr Crafts and Sundry"
            className="w-36 sm:w-44 md:w-60 h-auto"
            width={400}
            height={400}
          />
        </Link>

        {!isMobile && <div className="dp-nav-item">{navLinksContent}</div>}

        {isMobile && (
          <div className="relative">
            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex items-center justify-center w-10 h-10 p-0 rounded border border-red-800 hover:bg-red-950/40 focus:outline-none focus:ring-2 focus:ring-red-600 shrink-0"
            >
              <span className="sr-only">Menu</span>
              <span aria-hidden className="flex flex-col justify-between w-6 h-5 leading-none">
                <span className="block w-full h-0.5 bg-white flex-none" />
                <span className="block w-full h-0.5 bg-white flex-none" />
                <span className="block w-full h-0.5 bg-white flex-none" />
              </span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-max max-w-[80vw] rounded-lg border border-red-800 bg-black/95 px-4 py-3 flex flex-col gap-3 text-left">
                <div className="flex flex-col gap-3 items-start">
                  {navLinks.map(({ href, label }) => {
                    const active = isActive(href);
                    if (href === '/brands' && brandNavLinks.length > 0) {
                      return (
                        <div key={href} className="flex w-full flex-col gap-2 items-start">
                          <Link
                            href={href}
                            aria-current={active ? 'page' : undefined}
                            className={`${linkClass(active)} self-start whitespace-nowrap text-base md:text-lg`}
                            onClick={() => setMenuOpen(false)}
                          >
                            {label}
                          </Link>
                          <ul className="w-full border-l border-red-800 pl-3 flex flex-col gap-2" aria-label="Brand links">
                            {brandNavLinks.map((b) => (
                              <li key={b._id}>
                                <a
                                  href={b.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="dp-link block whitespace-normal text-base"
                                  onClick={() => setMenuOpen(false)}
                                >
                                  {b.text}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={href}
                        href={href}
                        aria-current={active ? 'page' : undefined}
                        className={`${linkClass(active)} self-start whitespace-nowrap text-base md:text-lg`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {label}
                      </Link>
                    );
                  })}
                  <a
                    href="https://shop.dragonspurr.ca"
                    className="dp-link self-start whitespace-nowrap text-base"
                    {...externalLinkAttributes}
                    onClick={() => setMenuOpen(false)}
                  >
                    Shop
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

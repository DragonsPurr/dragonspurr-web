'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { externalLinkAttributes, logoTypes } from "@/app/lib/constants";
import Image from 'next/image';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/brands", label: "Brands" },
  { href: "/blog", label: "Blog" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
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

    // Avoid calling setState on mount (prevents unnecessary test warnings)
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    }

    // Safari fallback
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

  const navLinksContent = (
    <>
      {navLinks.map(({ href, label }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={
              active
                ? 'text-red-600 no-underline hover:text-red-600 focus:text-red-600'
                : 'dp-link'
            }
          >
            {label}
          </Link>
        );
      })}
      <a
        href="https://shop.dragonspurr.ca"
        className="dp-link"
        {...externalLinkAttributes}
      >
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

        {/* Desktop nav */}
        {!isMobile && <div className="dp-nav-item">{navLinksContent}</div>}

        {/* Mobile hamburger */}
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
                {/* Keep nav link labels identical to desktop for tests and consistency */}
                <div className="flex flex-col gap-3 items-start">
                  {navLinks.map(({ href, label }) => {
                    const active = isActive(href);
                    return (
                      <Link
                        key={href}
                        href={href}
                        aria-current={active ? 'page' : undefined}
                        className={`${active ? 'text-red-600 no-underline hover:text-red-600 focus:text-red-600' : 'dp-link'} self-start whitespace-nowrap text-base md:text-lg`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {label}
                      </Link>
                    );
                  })}
                  <a
                    href="https://shop.dragonspurr.ca"
                    className={`dp-link self-start whitespace-nowrap text-base`}
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

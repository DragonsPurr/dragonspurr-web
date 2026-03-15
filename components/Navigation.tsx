'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { externalLinkAttributes, commonClasses, logoTypes } from "@/app/lib/constants";
import Image from 'next/image';

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

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <nav className="bg-black w-full flex justify-center pt-2.5 pr-[100px] sticky top-0 z-50 border-b-2 border-red-800 pb-2">
      <div className="w-full max-w-7xl flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src={logoTypes.wide_for_dark_bkgds}
            alt="Dragon's Purr Crafts and Sundry"
            className="w-60 h-auto"
            width={400}
            height={400}
          />
        </Link>
        <div className={commonClasses.navItem}>
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
                    : commonClasses.link
                }
              >
                {label}
              </Link>
            );
          })}

          {/* external link stays as <a> */}

          <a href="https://shop.dragonspurr.ca" className={commonClasses.link} {...externalLinkAttributes}>
            Shop
          </a>
        </div>
      </div>
    </nav>
  );
}

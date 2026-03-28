'use client';

import type { BrandNavItem } from '@/app/lib/brands';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type LayoutSwitcherProps = {
  children: ReactNode;
  brandNavLinks?: BrandNavItem[];
};

export function LayoutSwitcher({ children, brandNavLinks = [] }: LayoutSwitcherProps) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  if (isStudio) {
    return (
      <div className="h-screen w-screen overflow-hidden flex flex-col">
        {children}
      </div>
    );
  }

  return (
    <>
      <Navigation brandNavLinks={brandNavLinks} />
      <main className="dp-main-content">
        <div className="w-full max-w-7xl mx-auto ">{children}</div>
      </main>
      <Footer />
    </>
  );
}

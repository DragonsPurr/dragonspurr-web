'use client';

import type { BrandNavItem } from '@/app/lib/brands';
import type { ShopCartNavPreview } from '@/app/lib/medusa-cart';
import type { ShopCategoryNavItem } from '@/app/lib/shop';
import { Navigation } from '@/components/Navigation';
import { ShopSubNav } from '@/components/shop/ShopSubNav';
import { Footer } from '@/components/Footer';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type LayoutSwitcherProps = {
  children: ReactNode;
  brandNavLinks?: BrandNavItem[];
  shopCategories?: ShopCategoryNavItem[];
  cart?: ShopCartNavPreview;
  isCustomerLoggedIn?: boolean;
  customerDisplayName?: string | null;
  customerAvatarUrl?: string | null;
};

const emptyCart: ShopCartNavPreview = {
  itemCount: 0,
  items: [],
  total: null,
  currencyCode: null,
};

export function LayoutSwitcher({
  children,
  brandNavLinks = [],
  shopCategories = [],
  cart = emptyCart,
  isCustomerLoggedIn = false,
  customerDisplayName = null,
  customerAvatarUrl = null,
}: LayoutSwitcherProps) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');
  const isShop = pathname?.startsWith('/shop');

  if (isStudio) {
    return (
      <div className="h-screen w-screen overflow-hidden flex flex-col">
        {children}
      </div>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <Navigation brandNavLinks={brandNavLinks} embedded={isShop} />
        {isShop ? (
          <ShopSubNav
            categories={shopCategories}
            cart={cart}
            isCustomerLoggedIn={isCustomerLoggedIn}
            customerDisplayName={customerDisplayName}
            customerAvatarUrl={customerAvatarUrl}
          />
        ) : null}
      </header>
      <main className="dp-main-content">
        <div className="w-full max-w-7xl mx-auto ">{children}</div>
      </main>
      <Footer />
    </>
  );
}

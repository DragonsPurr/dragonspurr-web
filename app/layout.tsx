import { Analytics } from '@vercel/analytics/next';
import { LayoutSwitcher } from './LayoutSwitcher';
import { getBrandNavLinks } from './lib/brands';
import { getCustomerAvatarProxyUrl } from './lib/customer-avatar';
import { getCustomerDisplayName } from './lib/customer-display';
import { retrieveLoggedInCustomer } from './lib/medusa-auth';
import { getShopCartNavPreview, type ShopCartNavPreview } from './lib/medusa-cart';
import { getRequestPathname } from './lib/request-pathname';
import { listShopCategories, type ShopCategoryNavItem } from './lib/shop';
import type { HttpTypes } from '@medusajs/types';
import { logoTypes, siteInfo } from './lib/constants';
import {
  Cinzel_Decorative,
  Cinzel,
  Cormorant_Garamond,
} from 'next/font/google';
import './globals.css';
import type { CSSProperties, ReactNode } from 'react';

const cinzelDecorative = Cinzel_Decorative({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-cinzel-decorative',
});
const cinzel = Cinzel({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-cinzel',
});
const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant',
});

export const viewport = {
  themeColor: '#000000',
};

export const metadata = {
  title: siteInfo.name,
  description: siteInfo.description,
  openGraph: {
    url: siteInfo.url,
  },
  icons: {
    icon: logoTypes.square_for_dark_bkgds,
    apple: logoTypes.square_for_dark_bkgds,
  },
};

function isStudioRoute(pathname: string): boolean {
  return pathname.startsWith('/studio');
}

const emptyShopCartPreview: ShopCartNavPreview = {
  itemCount: 0,
  items: [],
  total: null,
  currencyCode: null,
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const pathname = await getRequestPathname();

  if (isStudioRoute(pathname)) {
    return (
      <html lang="en" className="h-full">
        <body className="m-0 h-full overflow-hidden bg-white">{children}</body>
      </html>
    );
  }

  const isShopRoute = pathname.startsWith('/shop');

  const brandNavLinksPromise = getBrandNavLinks();
  const shopDataPromise: Promise<
    [ShopCategoryNavItem[], ShopCartNavPreview, HttpTypes.StoreCustomer | null]
  > = isShopRoute
    ? Promise.all([
        listShopCategories(),
        getShopCartNavPreview(),
        retrieveLoggedInCustomer(),
      ])
    : Promise.resolve([[], emptyShopCartPreview, null]);

  const [brandNavLinks, [shopCategories, cart, customer]] = await Promise.all([
    brandNavLinksPromise,
    shopDataPromise,
  ]);

  return (
    <html
      lang="en"
      className={`bg-black ${cinzelDecorative.variable} ${cinzel.variable} ${cormorant.variable}`}
      style={
        {
          '--dp-main-content-bg-image': `url("${logoTypes.publication_banner}")`,
        } as CSSProperties
      }
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
            `,
          }}
        />
      </head>
      <body className="bg-black text-white min-h-screen flex flex-col">
        <LayoutSwitcher
          brandNavLinks={brandNavLinks}
          shopCategories={shopCategories}
          cart={cart}
          isCustomerLoggedIn={customer != null}
          customerDisplayName={customer ? getCustomerDisplayName(customer) : null}
          customerAvatarUrl={customer ? getCustomerAvatarProxyUrl(customer) : null}
        >
          {children}
        </LayoutSwitcher>
        <Analytics />
      </body>
    </html>
  );
}

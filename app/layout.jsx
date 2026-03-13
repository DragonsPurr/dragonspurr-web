import { Analytics } from './Analytics';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import './globals.css';
import { logoTypes, siteInfo, commonClasses } from './lib/constants';

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
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
        <Analytics />
        <Navigation />
        <main className={commonClasses.mainContent}>
          <div className="w-full max-w-7xl mx-auto ">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}

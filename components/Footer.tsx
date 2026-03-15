import { externalLinkAttributes, commonClasses } from "@/app/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 bg-black w-full py-4 border-t-2 border-red-800 pt-2">
      <div className="text-center font-cormorant_garamond text-lg text-white">
        Site design by{' '}
        <a href="https://boxingoctop.us" className={commonClasses.link} {...externalLinkAttributes}>
          Boxing Octopus Creative
        </a>{' '}
        | All content and assets are Copyright © {year}{' '}
        <a href="https://dragonspurr.ca" className={commonClasses.link}{...externalLinkAttributes}>
          Dragon&apos;s Purr Crafts and Sundry Ltd.
        </a>
      </div>
    </footer>
  );
}

import { externalLinkAttributes } from "@/app/lib/constants";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="md:fixed md:bottom-0 md:left-0 md:right-0 z-10 bg-black w-full py-2 border-t-2 border-red-800">
      <div className="text-center font-cormorant_garamond text-sm md:text-base text-white px-4">
        Site design by{' '}
        <a href="https://boxingoctop.us" className="dp-link" {...externalLinkAttributes}>
          Boxing Octopus Creative
        </a>{' '}
        | All content and assets are <strong>Copyright © {year}{' '}
        <a href="https://dragonspurr.ca" className="dp-link" {...externalLinkAttributes}>
          Dragon&apos;s Purr Crafts and Sundry Ltd.
        </a></strong>{' '}
        |{' '}
        <Link href="/privacy" className="dp-link">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}

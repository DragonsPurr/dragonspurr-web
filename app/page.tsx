import { logoTypes } from "@/app/lib/constants";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 w-full items-center">
      <div className="flex items-center justify-center md:justify-start w-full px-2 md:pl-12">
        <Image
          src={logoTypes.square_for_dark_bkgds}
          alt="Dragon's Purr Crafts and Sundry logo"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md mt-8 md:mt-[100px]"
          width={400}
          height={400}
        />
      </div>
      <div className="flex justify-center md:justify-end items-center font-cormorant_garamond text-3xl sm:text-4xl md:text-[40px] leading-tight md:leading-none mt-2 md:mt-[100px] px-2 md:px-0 text-center md:text-left">
        <p>
          Welcome to Dragon&apos;s Purr Crafts and Sundry!
          <br /><br />
          We&apos;re a Toronto-Based creative duo that makes quirky, bespoke crafts out of die-cut vinyl, paper, and various other mediums.
        </p>
      </div>
    </div>
  );
}

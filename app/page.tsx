import { logoTypes } from "@/app/lib/constants";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-center">
      <div className="flex items-center w-full pl-4 md:pl-12">
        <Image
          src={logoTypes.square_for_dark_bkgds}
          alt="Dragon's Purr Crafts and Sundry logo"
          className="w-full max-w-md mt-[100px]"
          width={400}
          height={400}
        />
      </div>
      <div className="flex justify-end items-center font-cormorant_garamond text-[40px] leading-none mt-[100px]">
        <p>
          Welcome to Dragon&apos;s Purr Crafts and Sundry!
          <br /><br />
          We&apos;re a Toronto-Based creative duo that makes quirky, bespoke crafts out of die-cut vinyl, paper, and various other mediums.
        </p>
      </div>
    </div>
  );
}

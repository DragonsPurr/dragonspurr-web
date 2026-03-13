import { logoTypes } from "@/app/lib/constants";
export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-center">
      <div className="flex items-center w-full pl-4 md:pl-12">
        <img
          src={logoTypes.square_for_dark_bkgds}
          alt="Dragon's Purr Crafts and Sundry logo"
          className="w-full max-w-md mt-[100px]"
        />
      </div>
      <div className="flex justify-end items-center font-cinzel_decorative text-[40px] leading-none mt-[100px]">
        Welcome to Dragon's Purr Crafts and Sundry. We're a Toronto-Based Creative Duo that makes things.
      </div>
    </div>
  );
}

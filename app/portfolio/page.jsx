import { commonClasses, logoTypes } from "@/app/lib/constants";
export default function Portfolio() {
  return (
    <div className="container mx-auto">
      <div className={commonClasses.pageHeader}><strong>Portfolio</strong></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="flex justify-center items-center">
          <img
            src={logoTypes.square_for_dark_bkgds}
            alt="Dragon's Purr Crafts and Sundry logo"
            className="w-[400px] max-w-full h-auto"
          />
        </div>
        <div className={commonClasses.sectionHeader}>
          <p>
            <strong>Coming soon!</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

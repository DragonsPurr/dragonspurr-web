import { commonClasses, asset_base_url } from "@/app/lib/constants";
export default function NotFound() {
  return (
    <div className="container mx-auto">
      <div className={commonClasses.pageHeader}><strong>Page Not Found</strong></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center items-center">
          <img
            src={`${asset_base_url}/eeby-deeby-404.jpg`}
            alt="404"
            className="w-[50%] max-w-md h-auto"
          />
        </div>
        <div className={commonClasses.bodyText}>
          Oh No, You seem to have taken a wrong turn.<br />
          <a href="/" className="text-red-600 hover:text-red-600">Go back to the home page</a>
        </div>
      </div>
    </div>
  );
}

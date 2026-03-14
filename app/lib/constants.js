const envConfig = {
    emailjs: {
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        userId: process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
    },
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    logrocketId: process.env.NEXT_PUBLIC_LOGROCKET_ID,
};

const asset_base_url = "https://dp-assets.tor1.digitaloceanspaces.com";

const externalLinkAttributes = { target: "_blank", rel: "noreferrer" };

const siteInfo = {
    name: "Dragon's Purr Crafts and Sundry",
    url: "https://dragonspurr.ca",
    email: "info@dragonspurr.ca",
    phone: "+1 (416) 555-1234",
    address: "608-26 Carluke Crescent, Toronto, ON M2L 2J2",
    hours: "Monday - Friday: 9:00 AM - 5:00 PM",
    description: "Dragon's Purr Crafts and Sundry is a Toronto-Based Creative Duo that makes things",
};

const socialMedia = {
    bluesky: "https://bsky.app/profile/dragonspurr.bsky.social",
    heycafe: "https://hey.cafe/@dragonspurr",
    eh: "https://ehnw.ca/u/dragonspurr",
    instagram: "https://www.instagram.com/dragonspurr",
    facebook: "https://www.facebook.com/dragonspurr",
};

const commonClasses = {
    pageHeader: "font-cinzel_decorative text-[60px] text-red-600 leading-none mb-12",
    sectionHeader: "font-cinzel_decorative text-4xl text-red-600",
    circularImage: "w-[500px] h-auto rounded-full",
    bodyText: "font-cormorant_garamond text-2xl",
    link: "text-white no-underline hover:text-red-600 target:text-red-600",
    navItem: "flex gap-4 font-cinzel text-white text-3xl",
    formLabel: "block font-cinzel text-xl mb-1 text-red-600",
    formInput: "w-full font-cormorant_garamond text-lg px-3 py-2 rounded-md border border-gray-600 bg-black text-white",
    formButton: "font-cinzel text-lg px-4 py-2 rounded-md bg-red-800 text-white hover:bg-red-600",
    mainContent: "flex-1 flex justify-center items-center mt-[100px] px-4 pb-24 bg-[url('https://dp-assets.tor1.digitaloceanspaces.com/brand/publication-banner.png')] bg-cover bg-center bg-fixed bg-gray-800 bg-blend-soft-light",
};

const logoTypes = {
    circular_white: `${asset_base_url}/brand/circular-logo-white.png`,
    circular_black: `${asset_base_url}/brand/circular-logo.png`,
    square: `${asset_base_url}/brand/square-logo.png`,
    square_for_dark_bkgds: `${asset_base_url}/brand/square-logo-for-dark-bkgds.png`,
    square_no_text: `${asset_base_url}/brand/square-logo-no-text.png`,
    wide_for_dark_bkgds: `${asset_base_url}/brand/wide-logo-for-dark-bkgds.png`,
    wide: `${asset_base_url}/brand/wide-logo.png`,
    publication_banner: `${asset_base_url}/brand/publication-banner.png`,
};

export { asset_base_url, externalLinkAttributes, commonClasses, logoTypes, siteInfo, socialMedia, envConfig };
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

const externalLinkAttributes = { target: "_blank", rel: "noreferrer" as const };

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

const logoTypes = {
  circular_white: `${asset_base_url}/brand/circular-logo-white.png`,
  circular_black: `${asset_base_url}/brand/circular-logo.png`,
  square: `${asset_base_url}/brand/square-logo.png`,
  square_for_dark_bkgds: `${asset_base_url}/brand/square-logo-for-dark-bkgds.png`,
  square_no_text: `${asset_base_url}/brand/square-logo-no-text.png`,
  wide_for_dark_bkgds: `${asset_base_url}/brand/wide-logo-for-dark-bkgds.png`,
  wide: `${asset_base_url}/brand/wide-logo.png`,
  publication_banner: `${asset_base_url}/brand/publication-banner.png`,
  hipsterdonut_logo: `${asset_base_url}/brand/hipsterdonut-logo-wide.png`,
};

export { asset_base_url, externalLinkAttributes, logoTypes, siteInfo, socialMedia, envConfig };

import { buildSiteAssetUrl, SITE_ASSETS_PROXY_BASE } from './site-assets';

const asset_base_url = SITE_ASSETS_PROXY_BASE;

const externalLinkAttributes = { target: "_blank", rel: "noreferrer" as const };

const siteInfo = {
  name: "Dragon's Purr Crafts and Sundry",
  url: "https://dragonspurr.ca",
  productSupportEmail: "productsupport@dragonspurr.ca",
  generalInquiryEmail: "info@dragonspurr.ca",
  billingInquiryEmail: "billing@dragonspurr.ca",
  phone: "+1 (289) 269-2529",
  address: "608-26 Carluke Crescent, Toronto, ON M2L 2J2",
  hours: "Monday - Friday: 9:00 AM - 5:00 PM",
  description: "Dragon's Purr Crafts and Sundry is a Toronto-Based Creative Duo that makes things",
};

const logoTypes = {
  square_for_dark_bkgds: buildSiteAssetUrl('brand/dragonspurr_square-for-dark-bg.png'),
  wide_for_dark_bkgds: buildSiteAssetUrl('brand/dragonspurr_wide-for-dark-bg.png'),
  publication_banner: buildSiteAssetUrl('brand/publication-banner.png'),
  favicon: buildSiteAssetUrl('brand/dragonspurr_favicon.png'),
};

export { asset_base_url, externalLinkAttributes, logoTypes, siteInfo };

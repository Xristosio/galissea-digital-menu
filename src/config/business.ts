import type { Lang } from "@/i18n/types";
import { SOCIAL_LINKS, MENU_QR_IMAGE_PATH } from "@/config/site";

export const SITE_NAME = "Galissea";
export const SITE_URL = "https://galissea.gr";
export const DEFAULT_THEME_COLOR = "#7b5448";

export const BRAND_LOGO_PATH = "/logo-512.png";
export const BRAND_ICON_192_PATH = "/icon-192.png";
export const BRAND_ICON_512_PATH = "/icon-512.png";
export const APPLE_TOUCH_ICON_PATH = "/apple-touch-icon.png";
export const SOCIAL_PREVIEW_IMAGE_PATH = "/galissea-og.jpg";

export const BUSINESS_PHONE_DISPLAY = "+30 22810 45686";
export const BUSINESS_PHONE_URI = "tel:+302281045686";
export const BUSINESS_EMAIL = "galissea.bar@gmail.com";
export const BUSINESS_EMAIL_URI = `mailto:${BUSINESS_EMAIL}`;
export const BUSINESS_PLACE_ID = "ChIJMdffDT59ohQRcaoqm2WCgus";

export const BUSINESS_ADDRESS = {
  streetAddressEl: "Γαλησσάς",
  streetAddressEn: "Galissas",
  postalCode: "841 00",
  localityEl: "Γαλησσάς",
  localityEn: "Galissas",
  regionEl: "Σύρος",
  regionEn: "Syros",
  countryCode: "GR",
  compactEl: "Γαλησσάς, Σύρος",
  compactEn: "Galissas, Syros",
  displayEl: "Γαλησσάς 841 00, Σύρος, Κυκλάδες",
  displayEn: "Galissas 841 00, Syros, Cyclades, Greece",
} as const;

export const BUSINESS_HOURS = {
  opens: "09:00",
  closes: "22:00",
  displayEl: "Καθημερινά 09:00 - 22:00",
  displayEn: "Daily 09:00 - 22:00",
} as const;

export const BUSINESS_SAME_AS = [
  SOCIAL_LINKS.instagram,
  SOCIAL_LINKS.facebook,
] as const;

export const BUSINESS_SERVES = [
  "Coffee",
  "Breakfast",
  "Brunch",
  "Snacks",
  "Pizza",
  "Burgers",
  "Cocktails",
] as const;

export const BUSINESS_PRICE_RANGE = "€€";
export const BUSINESS_MENU_QR_PATH = MENU_QR_IMAGE_PATH;

export const HERO_SUMMARY: Record<Lang, string> = {
  el: "Beach cafe, πρωινό, snacks και cocktails δίπλα στην παραλία του Γαλησσά στη Σύρο.",
  en: "Beach cafe, breakfast, snacks and cocktails right by Galissas Beach in Syros.",
};

export const HOME_META_DESCRIPTION: Record<Lang, string> = {
  el: "Το Galissea είναι all-day beach cafe, snack bar και cocktail spot στον Γαλησσά Σύρου. Δείτε το μενού, τις ώρες λειτουργίας, τη τοποθεσία και τις αξιολογήσεις Google.",
  en: "Galissea is an all-day beach cafe, snack bar and cocktail spot in Galissas, Syros. Explore the menu, opening hours, location and Google reviews.",
};

export const HOME_META_TITLE: Record<Lang, string> = {
  el: "Galissea | Beach Cafe, Breakfast & Cocktails στον Γαλησσά Σύρου",
  en: "Galissea | Beach Cafe, Breakfast & Cocktails in Galissas, Syros",
};

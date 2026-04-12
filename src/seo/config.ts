import {
  APPLE_TOUCH_ICON_PATH,
  BRAND_ICON_192_PATH,
  BRAND_ICON_512_PATH,
  BRAND_LOGO_PATH,
  BUSINESS_ADDRESS,
  BUSINESS_EMAIL,
  BUSINESS_HOURS,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PRICE_RANGE,
  BUSINESS_SAME_AS,
  BUSINESS_SERVES,
  DEFAULT_THEME_COLOR,
  HOME_META_DESCRIPTION,
  HOME_META_TITLE,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PREVIEW_IMAGE_PATH,
} from "@/config/business";
import { DEFAULT_OPEN_MAPS_URL } from "@/config/maps";
import {
  DEFAULT_LOCALE,
  HREFLANGS,
  LOCALE_PATHS,
  OG_LOCALES,
  getLangFromPath,
  getLocalePath,
  normalizePathname,
} from "@/i18n/routing";
import type { Lang } from "@/i18n/types";

const MAX_ROBOTS_PREVIEW =
  "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

export type PageType = "home" | "not-found";

export type ResolvedPage = {
  type: PageType;
  lang: Lang;
  pathname: string;
  canonicalPath: string;
  canonicalUrl: string;
  title: string;
  description: string;
  robots: string;
  indexable: boolean;
  htmlLang: string;
  ogLocale: string;
};

export const PRERENDER_ROUTES = [
  { url: "/", output: "index.html" },
  { url: "/en/", output: "en/index.html" },
  { url: "/404.html", output: "404.html" },
] as const;

export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path}`;

const resolveHomePage = (lang: Lang): ResolvedPage => {
  const canonicalPath = getLocalePath(lang);

  return {
    type: "home",
    lang,
    pathname: canonicalPath,
    canonicalPath,
    canonicalUrl: absoluteUrl(canonicalPath),
    title: HOME_META_TITLE[lang],
    description: HOME_META_DESCRIPTION[lang],
    robots: MAX_ROBOTS_PREVIEW,
    indexable: true,
    htmlLang: HREFLANGS[lang],
    ogLocale: OG_LOCALES[lang],
  };
};

const resolveNotFoundPage = (lang: Lang): ResolvedPage => ({
  type: "not-found",
  lang,
  pathname: "/404.html",
  canonicalPath: "/404.html",
  canonicalUrl: absoluteUrl("/404.html"),
  title:
    lang === "el"
      ? "Η σελίδα δεν βρέθηκε | Galissea"
      : "Page not found | Galissea",
  description:
    lang === "el"
      ? "Η σελίδα που ζητήσατε δεν βρέθηκε. Επιστρέψτε στην αρχική σελίδα του Galissea."
      : "The page you requested could not be found. Return to the Galissea homepage.",
  robots: "noindex,follow",
  indexable: false,
  htmlLang: HREFLANGS[lang],
  ogLocale: OG_LOCALES[lang],
});

export const resolvePage = (rawPathname: string): ResolvedPage => {
  const pathname = normalizePathname(rawPathname);
  const lang = getLangFromPath(pathname);

  if (pathname === "/" || pathname === "/en/") {
    return resolveHomePage(lang);
  }

  if (pathname === "/404.html/") {
    return resolveNotFoundPage(DEFAULT_LOCALE);
  }

  return resolveNotFoundPage(lang);
};

const getAlternateLocaleLinks = (page: ResolvedPage) => {
  if (!page.indexable) return "";

  return (
    Object.entries(LOCALE_PATHS)
      .map(([lang, path]) => {
        const hrefLang = HREFLANGS[lang as Lang];
        return `<link rel="alternate" hreflang="${hrefLang}" href="${absoluteUrl(path)}" />`;
      })
      .join("\n") +
    `\n<link rel="alternate" hreflang="x-default" href="${absoluteUrl(LOCALE_PATHS[DEFAULT_LOCALE])}" />`
  );
};

const getStructuredData = (page: ResolvedPage) => {
  if (!page.indexable) return [];

  const primaryImageUrl = absoluteUrl(SOCIAL_PREVIEW_IMAGE_PATH);
  const logoUrl = absoluteUrl(BRAND_LOGO_PATH);

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
      },
      telephone: BUSINESS_PHONE_DISPLAY,
      email: BUSINESS_EMAIL,
      sameAs: [...BUSINESS_SAME_AS],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: Object.values(HREFLANGS),
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "CafeOrCoffeeShop",
      "@id": `${SITE_URL}/#localbusiness`,
      name: SITE_NAME,
      url: SITE_URL,
      image: [primaryImageUrl],
      logo: logoUrl,
      telephone: BUSINESS_PHONE_DISPLAY,
      email: BUSINESS_EMAIL,
      priceRange: BUSINESS_PRICE_RANGE,
      servesCuisine: [...BUSINESS_SERVES],
      address: {
        "@type": "PostalAddress",
        streetAddress:
          page.lang === "el"
            ? BUSINESS_ADDRESS.streetAddressEl
            : BUSINESS_ADDRESS.streetAddressEn,
        postalCode: BUSINESS_ADDRESS.postalCode,
        addressLocality:
          page.lang === "el"
            ? BUSINESS_ADDRESS.localityEl
            : BUSINESS_ADDRESS.localityEn,
        addressRegion:
          page.lang === "el"
            ? BUSINESS_ADDRESS.regionEl
            : BUSINESS_ADDRESS.regionEn,
        addressCountry: BUSINESS_ADDRESS.countryCode,
      },
      openingHoursSpecification: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ].map((day) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: day,
        opens: BUSINESS_HOURS.opens,
        closes: BUSINESS_HOURS.closes,
      })),
      sameAs: [...BUSINESS_SAME_AS],
      hasMap: DEFAULT_OPEN_MAPS_URL,
      hasMenu: absoluteUrl(`${page.canonicalPath}#menu`),
      currenciesAccepted: "EUR",
      description: page.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${page.canonicalUrl}#webpage`,
      url: page.canonicalUrl,
      name: page.title,
      description: page.description,
      inLanguage: page.htmlLang,
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#localbusiness`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        "@id": `${page.canonicalUrl}#primaryimage`,
        url: primaryImageUrl,
      },
    },
  ];
};

const serializeJsonLd = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c");

export const renderHeadTags = (page: ResolvedPage) => {
  const alternateLocales = Object.values(OG_LOCALES)
    .filter((locale) => locale !== page.ogLocale)
    .map(
      (locale) => `<meta property="og:locale:alternate" content="${locale}" />`,
    )
    .join("\n");

  const alternateLinks = getAlternateLocaleLinks(page);
  const structuredData = getStructuredData(page)
    .map(
      (entry) =>
        `<script type="application/ld+json">${serializeJsonLd(entry)}</script>`,
    )
    .join("\n");

  return [
    `<title>${page.title}</title>`,
    `<meta name="description" content="${page.description}" />`,
    `<meta name="robots" content="${page.robots}" />`,
    `<meta name="author" content="${SITE_NAME}" />`,
    `<meta name="application-name" content="${SITE_NAME}" />`,
    `<meta name="apple-mobile-web-app-title" content="${SITE_NAME}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${page.ogLocale}" />`,
    alternateLocales,
    `<meta property="og:title" content="${page.title}" />`,
    `<meta property="og:description" content="${page.description}" />`,
    `<meta property="og:url" content="${page.canonicalUrl}" />`,
    `<meta property="og:image" content="${absoluteUrl(SOCIAL_PREVIEW_IMAGE_PATH)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${page.lang === "el" ? "Galissea beach cafe στον Γαλησσά Σύρου" : "Galissea beach cafe in Galissas, Syros"}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${page.title}" />`,
    `<meta name="twitter:description" content="${page.description}" />`,
    `<meta name="twitter:image" content="${absoluteUrl(SOCIAL_PREVIEW_IMAGE_PATH)}" />`,
    `<link rel="canonical" href="${page.canonicalUrl}" />`,
    alternateLinks,
    structuredData,
  ]
    .filter(Boolean)
    .join("\n");
};

export const getRobotsTxt = () =>
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;

export const getSitemapXml = () => {
  const today = new Date().toISOString().split("T")[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${absoluteUrl(LOCALE_PATHS.el)}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="${HREFLANGS.el}" href="${absoluteUrl(LOCALE_PATHS.el)}" />
    <xhtml:link rel="alternate" hreflang="${HREFLANGS.en}" href="${absoluteUrl(LOCALE_PATHS.en)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(LOCALE_PATHS.el)}" />
  </url>
  <url>
    <loc>${absoluteUrl(LOCALE_PATHS.en)}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="${HREFLANGS.el}" href="${absoluteUrl(LOCALE_PATHS.el)}" />
    <xhtml:link rel="alternate" hreflang="${HREFLANGS.en}" href="${absoluteUrl(LOCALE_PATHS.en)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(LOCALE_PATHS.el)}" />
  </url>
</urlset>
`;
};

export const getWebManifest = () =>
  JSON.stringify(
    {
      name: `${SITE_NAME} | Cafe Snack Bar`,
      short_name: SITE_NAME,
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: "#f5efe7",
      theme_color: DEFAULT_THEME_COLOR,
      icons: [
        {
          src: BRAND_ICON_192_PATH,
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: BRAND_ICON_512_PATH,
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    null,
    2,
  );

export const STATIC_HEAD_LINKS = [
  `<link rel="icon" href="/favicon.ico" sizes="any" />`,
  `<link rel="apple-touch-icon" href="${APPLE_TOUCH_ICON_PATH}" />`,
  `<link rel="manifest" href="/site.webmanifest" />`,
];

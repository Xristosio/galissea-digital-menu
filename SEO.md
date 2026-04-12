# SEO Setup

This project now ships prerendered static HTML for:

- `/`
- `/en/`
- `/404.html`

The build pipeline:

1. Builds the Vite client bundle
2. Builds a small SSR renderer
3. Prerenders crawlable HTML into `dist`
4. Generates `robots.txt`, `sitemap.xml`, and `site.webmanifest`

## Commands

- `npm run build`: production client build + prerender
- `npm run seo:check`: validates core SEO/build artifacts inside `dist`

## Multilingual

- Greek canonical: `https://galissea.gr/`
- English canonical: `https://galissea.gr/en/`
- `hreflang` and `x-default` are emitted in the prerendered HTML and sitemap

## Central Sources Of Truth

- Business/site constants: `src/config/business.ts`
- Locale routing: `src/i18n/routing.ts`
- SEO metadata + schema + sitemap/robots generation: `src/seo/config.ts`

## Small Manual Follow-Ups

- Submit `https://galissea.gr/sitemap.xml` to Google Search Console and Bing Webmaster Tools
- Keep Google Business Profile phone, hours, address, and social links aligned with `src/config/business.ts`
- If hours or rating details change, update the business config / Google-facing links accordingly

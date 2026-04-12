# SEO Setup

This project now ships prerendered static HTML for:

- `/`
- `/en/`
- `/404.html`

The production build pipeline:

1. Builds the Vite client bundle
2. Builds a small SSR renderer
3. Prerenders crawlable HTML into `dist`
4. Generates `robots.txt`, `sitemap.xml`, and `site.webmanifest`
5. Validates the final artifacts with `scripts/check-seo.mjs`

## Commands

- `npm run build`: production client build + prerender
- `npm run seo:check`: validates final SEO/build artifacts inside `dist`
- `npm run indexnow:notify`: submits the live canonical URLs from `https://galissea.gr/sitemap.xml` to IndexNow after deploy

## Multilingual

- Greek canonical: `https://galissea.gr/`
- English canonical: `https://galissea.gr/en/`
- `hreflang` and `x-default` are emitted in the prerendered HTML and sitemap

## Central Sources Of Truth

- Business/site constants: `src/config/business.ts`
- Locale routing: `src/i18n/routing.ts`
- SEO metadata + schema + sitemap/robots generation: `src/seo/config.ts`
- IndexNow constants: `scripts/indexnow-config.mjs`

## IndexNow

- Static verification key file: `public/46f887cd-564c-4880-ac3d-4a2eb699c7eb.txt`
- Live key URL: `https://galissea.gr/46f887cd-564c-4880-ac3d-4a2eb699c7eb.txt`
- GitHub Pages deploy workflow now attempts an IndexNow submission after deploy
- The notification step is non-blocking by design so a transient external API issue will not break deployment

## Optional Verification Meta Tags

If you want HTML meta-tag verification instead of DNS/file verification, set these build-time environment variables before running the production build:

- `GOOGLE_SITE_VERIFICATION`
- `BING_SITE_VERIFICATION`

If they are present, the prerendered HTML will emit:

- `google-site-verification`
- `msvalidate.01`

## Post-Deploy Verification Checklist

### Google Search Console

1. Open the URL-prefix property for `https://galissea.gr/` in Google Search Console.
2. Submit `https://galissea.gr/sitemap.xml` in `Indexing > Sitemaps`.
3. Use `URL Inspection` for:
   - `https://galissea.gr/`
   - `https://galissea.gr/en/`
4. Confirm the inspected URLs are canonical, indexable, and rendered with the expected title/description.
5. After Google recrawls, confirm the Greek and English versions appear as alternate language versions rather than duplicates.

### Bing Webmaster Tools

1. Add or verify the site property for `https://galissea.gr/`.
2. Submit `https://galissea.gr/sitemap.xml` in the Sitemaps area.
3. Open the IndexNow section and confirm submissions are being received after deploys.
4. Inspect:
   - `https://galissea.gr/`
   - `https://galissea.gr/en/`
5. Confirm Bing reports the correct canonical and does not treat the language variants as duplicates.

### Google Business Profile

1. Open the live Google Business Profile for Galissea.
2. Verify the primary website URL is `https://galissea.gr/`.
3. Verify phone, opening hours, address, and social links match `src/config/business.ts`.
4. If seasonal or holiday hours change, update both Google Business Profile and `src/config/business.ts` on the same day.
5. After any profile edit, re-check that the website button still resolves to the canonical homepage and that the review/write-review links still point to the correct place profile.

## Live Output Checks

After deploy, verify these production URLs directly in the browser or via `curl`:

- `https://galissea.gr/robots.txt`
- `https://galissea.gr/sitemap.xml`
- `https://galissea.gr/46f887cd-564c-4880-ac3d-4a2eb699c7eb.txt`
- `https://galissea.gr/`
- `https://galissea.gr/en/`
- `https://galissea.gr/galissea-og.jpg`

Expected results:

- `robots.txt` allows crawling and references the sitemap
- `sitemap.xml` lists only canonical public URLs and includes hreflang alternates
- the IndexNow key file returns the raw key value only
- the prerendered HTML contains title, description, canonical, robots, hreflang, JSON-LD, and social image tags in the initial response
- the social preview image responds with `200 OK`

## Small Ongoing Follow-Ups

- Keep Google Business Profile phone, hours, address, and social links aligned with `src/config/business.ts`
- If hours, social URLs, or brand assets change, update the business config and rebuild
- If you add a new public canonical page, add it to the prerender route list and confirm it appears in sitemap/hreflang output

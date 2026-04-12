import fs from "node:fs/promises";
import path from "node:path";
import { JSDOM } from "jsdom";

import {
  INDEXNOW_KEY,
  INDEXNOW_KEY_LOCATION,
  INDEXNOW_SITE_URL,
} from "./indexnow-config.mjs";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const expectedAlternateLocales = {
  "el-GR": `${INDEXNOW_SITE_URL}/`,
  en: `${INDEXNOW_SITE_URL}/en/`,
  "x-default": `${INDEXNOW_SITE_URL}/`,
};

const pageChecks = [
  {
    file: "index.html",
    expectedLang: "el-GR",
    expectedCanonical: `${INDEXNOW_SITE_URL}/`,
    expectedRobots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    requiresH1: true,
    requiresSchema: true,
  },
  {
    file: path.join("en", "index.html"),
    expectedLang: "en",
    expectedCanonical: `${INDEXNOW_SITE_URL}/en/`,
    expectedRobots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    requiresH1: true,
    requiresSchema: true,
  },
  {
    file: "404.html",
    expectedLang: "el-GR",
    expectedCanonical: `${INDEXNOW_SITE_URL}/404.html`,
    expectedRobots: "noindex,follow",
    requiresH1: true,
    requiresSchema: false,
  },
];

const requiredRootFiles = [
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "favicon.ico",
  "apple-touch-icon.png",
  "icon-192.png",
  "icon-512.png",
  "galissea-og.jpg",
  `${INDEXNOW_KEY}.txt`,
];

const requiredSchemaTypes = [
  "Organization",
  "WebSite",
  "CafeOrCoffeeShop",
  "WebPage",
  "BreadcrumbList",
];

const readText = async (file) =>
  fs.readFile(path.join(distDir, file), "utf8");

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const fileExists = async (relativePath) => {
  try {
    await fs.access(path.join(distDir, relativePath));
    return true;
  } catch {
    return false;
  }
};

const getDistFilePathFromAbsoluteUrl = (url) => {
  const parsedUrl = new URL(url);
  const relativePath = parsedUrl.pathname.replace(/^\/+/, "");
  return path.join(distDir, relativePath);
};

const getAlternateLinks = (document) =>
  [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((link) => ({
    hrefLang: link.getAttribute("hreflang"),
    href: link.getAttribute("href"),
  }));

const getSchemaEntries = (document) =>
  [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(
    (script) => {
      const raw = script.textContent?.trim();
      if (!raw) return [];

      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [parsed];
    },
  );

const getSchemaTypes = (schemaEntries) =>
  new Set(
    schemaEntries.flatMap((entry) => {
      const type = entry?.["@type"];
      if (Array.isArray(type)) return type;
      return type ? [type] : [];
    }),
  );

const verifyRobotsTxt = async () => {
  const robotsTxt = await readText("robots.txt");

  assert(
    robotsTxt.includes("User-agent: *"),
    "robots.txt: missing User-agent directive",
  );
  assert(robotsTxt.includes("Allow: /"), "robots.txt: missing Allow: /");
  assert(
    !robotsTxt.includes("Disallow: /"),
    "robots.txt: contains a blocking Disallow directive",
  );
  assert(
    robotsTxt.includes(`Sitemap: ${INDEXNOW_SITE_URL}/sitemap.xml`),
    "robots.txt: missing sitemap reference",
  );
};

const verifySitemap = async () => {
  const sitemapXml = await readText("sitemap.xml");
  const urlBlocks = [...sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(
    (match) => match[1],
  );

  assert(
    urlBlocks.length === 2,
    `sitemap.xml: expected 2 canonical URL entries, found ${urlBlocks.length}`,
  );

  for (const expectedCanonical of [
    `${INDEXNOW_SITE_URL}/`,
    `${INDEXNOW_SITE_URL}/en/`,
  ]) {
    const block = urlBlocks.find((value) => value.includes(`<loc>${expectedCanonical}</loc>`));

    assert(block, `sitemap.xml: missing URL block for ${expectedCanonical}`);

    for (const [hrefLang, href] of Object.entries(expectedAlternateLocales)) {
      assert(
        block.includes(
          `<xhtml:link rel="alternate" hreflang="${hrefLang}" href="${href}" />`,
        ),
        `sitemap.xml: missing hreflang ${hrefLang} for ${expectedCanonical}`,
      );
    }
  }
};

const verifyIndexNowKeyFile = async () => {
  const relativePath = INDEXNOW_KEY_LOCATION.replace(`${INDEXNOW_SITE_URL}/`, "");
  const keyContents = (await readText(relativePath)).trim();

  assert(
    keyContents === INDEXNOW_KEY,
    `${relativePath}: expected key ${INDEXNOW_KEY}, received ${keyContents || "(empty)"}`,
  );
};

for (const file of requiredRootFiles) {
  assert(await fileExists(file), `Missing required build artifact: ${file}`);
}

await verifyRobotsTxt();
await verifySitemap();
await verifyIndexNowKeyFile();

for (const check of pageChecks) {
  const html = await readText(check.file);
  const dom = new JSDOM(html);
  const { document } = dom.window;

  assert(
    document.documentElement.lang === check.expectedLang,
    `${check.file}: unexpected html lang ${document.documentElement.lang}`,
  );

  const title = document.querySelector("title")?.textContent?.trim();
  assert(title, `${check.file}: missing <title>`);

  const description = document
    .querySelector('meta[name="description"]')
    ?.getAttribute("content")
    ?.trim();
  assert(description, `${check.file}: missing meta description`);

  const robots = document
    .querySelector('meta[name="robots"]')
    ?.getAttribute("content")
    ?.trim();
  assert(robots, `${check.file}: missing robots meta`);
  assert(
    robots === check.expectedRobots,
    `${check.file}: unexpected robots meta ${robots}`,
  );

  const canonical = document
    .querySelector('link[rel="canonical"]')
    ?.getAttribute("href")
    ?.trim();
  assert(
    canonical === check.expectedCanonical,
    `${check.file}: unexpected canonical ${canonical}`,
  );

  const ogImage = document
    .querySelector('meta[property="og:image"]')
    ?.getAttribute("content")
    ?.trim();
  assert(ogImage, `${check.file}: missing og:image`);
  await fs.access(getDistFilePathFromAbsoluteUrl(ogImage));

  const ogSecureImage = document
    .querySelector('meta[property="og:image:secure_url"]')
    ?.getAttribute("content")
    ?.trim();
  assert(
    ogSecureImage === ogImage,
    `${check.file}: og:image:secure_url does not match og:image`,
  );

  const twitterCard = document
    .querySelector('meta[name="twitter:card"]')
    ?.getAttribute("content");
  assert(twitterCard, `${check.file}: missing twitter card`);

  const twitterImage = document
    .querySelector('meta[name="twitter:image"]')
    ?.getAttribute("content")
    ?.trim();
  assert(
    twitterImage === ogImage,
    `${check.file}: twitter:image does not match og:image`,
  );

  const twitterImageAlt = document
    .querySelector('meta[name="twitter:image:alt"]')
    ?.getAttribute("content")
    ?.trim();
  assert(twitterImageAlt, `${check.file}: missing twitter:image:alt`);

  if (check.requiresSchema) {
    const schemaEntries = getSchemaEntries(document);
    const schemaTypes = getSchemaTypes(schemaEntries);

    for (const requiredType of requiredSchemaTypes) {
      assert(
        schemaTypes.has(requiredType),
        `${check.file}: missing JSON-LD schema type ${requiredType}`,
      );
    }
  }

  if (check.requiresH1) {
    assert(
      document.querySelectorAll("h1").length === 1,
      `${check.file}: expected exactly one H1`,
    );
  }

  assert(
    document.querySelector("main#main-content"),
    `${check.file}: missing main landmark`,
  );

  if (check.requiresSchema) {
    const alternateLinks = getAlternateLinks(document);

    assert(
      alternateLinks.length === Object.keys(expectedAlternateLocales).length,
      `${check.file}: unexpected alternate link count ${alternateLinks.length}`,
    );

    for (const [hrefLang, href] of Object.entries(expectedAlternateLocales)) {
      assert(
        alternateLinks.some(
          (link) => link.hrefLang === hrefLang && link.href === href,
        ),
        `${check.file}: missing hreflang ${hrefLang}`,
      );
    }
  }

  for (const anchor of [...document.querySelectorAll('a[href^="#"]')]) {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") continue;

    const targetId = href.slice(1);
    assert(
      document.getElementById(targetId),
      `${check.file}: broken in-page anchor target ${href}`,
    );
  }
}

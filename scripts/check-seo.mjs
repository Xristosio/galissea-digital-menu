import fs from "node:fs/promises";
import path from "node:path";
import { JSDOM } from "jsdom";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");

const pageChecks = [
  {
    file: "index.html",
    expectedLang: "el-GR",
    expectedCanonical: "https://galissea.gr/",
    requiresH1: true,
    requiresSchema: true,
  },
  {
    file: path.join("en", "index.html"),
    expectedLang: "en",
    expectedCanonical: "https://galissea.gr/en/",
    requiresH1: true,
    requiresSchema: true,
  },
  {
    file: "404.html",
    expectedLang: "el-GR",
    expectedCanonical: "https://galissea.gr/404.html",
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
];

const readHtml = async (file) =>
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

for (const file of requiredRootFiles) {
  assert(await fileExists(file), `Missing required build artifact: ${file}`);
}

for (const check of pageChecks) {
  const html = await readHtml(check.file);
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
    ?.getAttribute("content");
  assert(ogImage, `${check.file}: missing og:image`);

  const twitterCard = document
    .querySelector('meta[name="twitter:card"]')
    ?.getAttribute("content");
  assert(twitterCard, `${check.file}: missing twitter card`);

  if (check.requiresSchema) {
    const schemaScripts = document.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    assert(schemaScripts.length > 0, `${check.file}: missing JSON-LD schema`);
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

import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const serverEntryPath = path.join(distDir, "server", "entry-server.js");

const ensureDir = async (filePath) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
};

const writeFile = async (filePath, contents) => {
  await ensureDir(filePath);
  await fs.writeFile(filePath, contents, "utf8");
};

const templatePath = path.join(distDir, "index.html");
const template = await fs.readFile(templatePath, "utf8");

const {
  PRERENDER_ROUTES,
  getRobotsTxt,
  getSitemapXml,
  getWebManifest,
  render,
} = await import(pathToFileURL(serverEntryPath).href);

for (const route of PRERENDER_ROUTES) {
  const { appHtml, headTags, htmlLang } = render(route.url);
  const html = template
    .replace("__HTML_LANG__", htmlLang)
    .replace("<!--app-head-->", headTags)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  await writeFile(path.join(distDir, route.output), html);
}

await writeFile(path.join(distDir, "robots.txt"), getRobotsTxt());
await writeFile(path.join(distDir, "sitemap.xml"), getSitemapXml());
await writeFile(path.join(distDir, "site.webmanifest"), getWebManifest());
await fs.rm(path.join(distDir, "server"), { recursive: true, force: true });

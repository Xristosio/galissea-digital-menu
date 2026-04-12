import {
  INDEXNOW_API_ENDPOINT,
  INDEXNOW_HOST,
  INDEXNOW_KEY,
  INDEXNOW_KEY_LOCATION,
  INDEXNOW_SITEMAP_URL,
} from "./indexnow-config.mjs";

const WAIT_MS = 15000;
const MAX_ATTEMPTS = 6;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (url, label) => {
  let lastError;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          "user-agent": "galissea-indexnow-bot/1.0",
        },
      });

      if (!response.ok) {
        throw new Error(`${label} responded with ${response.status}`);
      }

      return response;
    } catch (error) {
      lastError = error;

      if (attempt < MAX_ATTEMPTS) {
        console.log(
          `[IndexNow] ${label} not ready yet (attempt ${attempt}/${MAX_ATTEMPTS}). Retrying in ${WAIT_MS / 1000}s...`,
        );
        await sleep(WAIT_MS);
      }
    }
  }

  throw lastError;
};

const extractUrlsFromSitemap = (xml) => {
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];

  return [...new Set(matches.map((match) => match[1]).filter(Boolean))];
};

const validateKeyFile = async () => {
  const response = await fetchWithRetry(INDEXNOW_KEY_LOCATION, "IndexNow key file");
  const body = (await response.text()).trim();

  if (body !== INDEXNOW_KEY) {
    throw new Error(
      `IndexNow key file content mismatch. Expected ${INDEXNOW_KEY}, received ${body || "(empty)"}.`,
    );
  }
};

const loadCanonicalUrls = async () => {
  const response = await fetchWithRetry(INDEXNOW_SITEMAP_URL, "sitemap.xml");
  const sitemapXml = await response.text();
  const urls = extractUrlsFromSitemap(sitemapXml).filter(
    (url) => !url.endsWith("/404.html"),
  );

  if (urls.length === 0) {
    throw new Error("No canonical URLs were found in the live sitemap.");
  }

  return urls;
};

const submitIndexNow = async (urlList) => {
  const payload = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList,
  };

  const response = await fetch(INDEXNOW_API_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=utf-8",
      "user-agent": "galissea-indexnow-bot/1.0",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `IndexNow submission failed with ${response.status}: ${body || "(empty body)"}`,
    );
  }
};

const urls = await loadCanonicalUrls();
await validateKeyFile();
await submitIndexNow(urls);

console.log(
  `[IndexNow] Submitted ${urls.length} canonical URL(s) for ${INDEXNOW_HOST}: ${urls.join(", ")}`,
);

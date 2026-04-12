export const DEFAULT_OPEN_MAPS_URL = "https://maps.google.com/?q=Galissea+Galissas+Syros";
export const DEFAULT_EMBED_MAPS_URL =
  "https://www.google.com/maps?q=Galissea%20Galissas%20Syros&output=embed";
export const DEFAULT_GOOGLE_PLACE_ID = "ChIJMdffDT59ohQRcaoqm2WCgus";
export const DEFAULT_WRITE_REVIEW_URL =
  `https://search.google.com/local/writereview?placeid=${DEFAULT_GOOGLE_PLACE_ID}`;
export const DEFAULT_RATING_VALUE = "4.7";
export const DEFAULT_RATING_COUNT = "48";

type MapsEnv = {
  VITE_GOOGLE_MAPS_EMBED_URL?: string;
  VITE_GOOGLE_MAPS_OPEN_URL?: string;
  VITE_GOOGLE_MAPS_API_KEY?: string;
  VITE_GOOGLE_MAPS_PLACE_QUERY?: string;
  VITE_GOOGLE_REVIEWS_URL?: string;
  VITE_GOOGLE_WRITE_REVIEW_URL?: string;
  VITE_GOOGLE_RATING_VALUE?: string;
  VITE_GOOGLE_RATING_COUNT?: string;
};

export type MapsConfig = {
  embedUrl: string | null;
  openUrl: string;
  reviewsUrl: string;
  writeReviewUrl: string;
  ratingValue: string | null;
  ratingCount: string | null;
  missingConfig: boolean;
};

const normalizeValue = (value: string | undefined) => value?.trim() ?? "";

export const resolveMapsConfig = (
  env: MapsEnv = import.meta.env as unknown as MapsEnv
): MapsConfig => {
  const directEmbedUrl = normalizeValue(env.VITE_GOOGLE_MAPS_EMBED_URL);
  const apiKey = normalizeValue(env.VITE_GOOGLE_MAPS_API_KEY);
  const placeQuery = normalizeValue(env.VITE_GOOGLE_MAPS_PLACE_QUERY);
  const openUrl = normalizeValue(env.VITE_GOOGLE_MAPS_OPEN_URL) || DEFAULT_OPEN_MAPS_URL;
  const reviewsUrl = normalizeValue(env.VITE_GOOGLE_REVIEWS_URL) || openUrl;
  const writeReviewUrl =
    normalizeValue(env.VITE_GOOGLE_WRITE_REVIEW_URL) || DEFAULT_WRITE_REVIEW_URL;
  const ratingValue = normalizeValue(env.VITE_GOOGLE_RATING_VALUE) || DEFAULT_RATING_VALUE;
  const ratingCount = normalizeValue(env.VITE_GOOGLE_RATING_COUNT) || DEFAULT_RATING_COUNT;

  if (directEmbedUrl) {
    return {
      embedUrl: directEmbedUrl,
      openUrl,
      reviewsUrl,
      writeReviewUrl,
      ratingValue,
      ratingCount,
      missingConfig: false,
    };
  }

  if (apiKey || placeQuery) {
    if (apiKey && placeQuery) {
      return {
        embedUrl: `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(apiKey)}&q=${encodeURIComponent(placeQuery)}`,
        openUrl,
        reviewsUrl,
        writeReviewUrl,
        ratingValue,
        ratingCount,
        missingConfig: false,
      };
    }

    return {
      embedUrl: null,
      openUrl,
      reviewsUrl,
      writeReviewUrl,
      ratingValue,
      ratingCount,
      missingConfig: true,
    };
  }

  return {
    embedUrl: DEFAULT_EMBED_MAPS_URL,
    openUrl,
    reviewsUrl,
    writeReviewUrl,
    ratingValue,
    ratingCount,
    missingConfig: false,
  };
};

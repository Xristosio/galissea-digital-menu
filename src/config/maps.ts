export const DEFAULT_OPEN_MAPS_URL = "https://maps.google.com/?q=Galissea+Galissas+Syros";
export const DEFAULT_EMBED_MAPS_URL =
  "https://www.google.com/maps?q=Galissea%20Galissas%20Syros&output=embed";

type MapsEnv = {
  VITE_GOOGLE_MAPS_EMBED_URL?: string;
  VITE_GOOGLE_MAPS_OPEN_URL?: string;
  VITE_GOOGLE_MAPS_API_KEY?: string;
  VITE_GOOGLE_MAPS_PLACE_QUERY?: string;
};

export type MapsConfig = {
  embedUrl: string | null;
  openUrl: string;
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

  if (directEmbedUrl) {
    return {
      embedUrl: directEmbedUrl,
      openUrl,
      missingConfig: false,
    };
  }

  if (apiKey || placeQuery) {
    if (apiKey && placeQuery) {
      return {
        embedUrl: `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(apiKey)}&q=${encodeURIComponent(placeQuery)}`,
        openUrl,
        missingConfig: false,
      };
    }

    return {
      embedUrl: null,
      openUrl,
      missingConfig: true,
    };
  }

  return {
    embedUrl: DEFAULT_EMBED_MAPS_URL,
    openUrl,
    missingConfig: false,
  };
};

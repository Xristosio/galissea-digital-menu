import type { Lang } from "@/i18n/types";

export const DEFAULT_LOCALE: Lang = "el";
export const SUPPORTED_LOCALES: Lang[] = ["el", "en"];

export const LOCALE_PATHS: Record<Lang, string> = {
  el: "/",
  en: "/en/",
};

export const HREFLANGS: Record<Lang, string> = {
  el: "el-GR",
  en: "en",
};

export const OG_LOCALES: Record<Lang, string> = {
  el: "el_GR",
  en: "en_GB",
};

export const getLocalePath = (lang: Lang, hash = "") => {
  const basePath = LOCALE_PATHS[lang];
  return hash ? `${basePath}${hash}` : basePath;
};

export const normalizePathname = (pathname: string) => {
  if (!pathname) return "/";
  if (pathname === "/") return pathname;
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
};

export const getLangFromPath = (pathname: string): Lang => {
  const normalizedPath = normalizePathname(pathname);
  return normalizedPath === "/en/" || normalizedPath.startsWith("/en/")
    ? "en"
    : "el";
};

export const getAlternateLang = (lang: Lang): Lang =>
  lang === "el" ? "en" : "el";

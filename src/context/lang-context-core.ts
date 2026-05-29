import { createContext, useContext } from "react";
import type { Lang } from "@/i18n/types";

export interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (el: string, en: string) => string;
}

export const LangContext = createContext<LangContextType>({
  lang: "el",
  setLang: () => {},
  t: (el) => el,
});

export const useLang = () => useContext(LangContext);

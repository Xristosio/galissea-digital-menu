import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Lang = "el" | "en";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (el: string, en: string) => string;
}

const LANG_STORAGE_KEY = "galissea-lang";

const LangContext = createContext<LangContextType>({
  lang: "el",
  setLang: () => {},
  t: (el) => el,
});

export const useLang = () => useContext(LangContext);

const getInitialLanguage = (): Lang => {
  if (typeof window === "undefined") return "el";

  const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
  return saved === "en" || saved === "el" ? saved : "el";
};

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  }, [lang]);

  const t = (el: string, en: string) => (lang === "el" ? el : en);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
};

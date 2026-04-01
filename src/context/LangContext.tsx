import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "el" | "en";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (el: string, en: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "el",
  setLang: () => {},
  t: (el) => el,
});

export const useLang = () => useContext(LangContext);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("el");

  const t = (el: string, en: string) => (lang === "el" ? el : en);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

import { ReactNode, useEffect, useState } from "react";
import type { Lang } from "@/i18n/types";
import { LangContext } from "@/context/lang-context-core";

const LANG_STORAGE_KEY = "galissea-lang";

export const LangProvider = ({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang: Lang;
}) => {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    setLang(initialLang);
  }, [initialLang]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  }, [lang]);

  const t = (el: string, en: string) => (lang === "el" ? el : en);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
};

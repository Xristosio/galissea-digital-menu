import { useReducedMotion } from "framer-motion";
import { Instagram, MapPin, Phone } from "lucide-react";
import type { MouseEvent } from "react";
import { useLocation } from "react-router-dom";
import {
  BUSINESS_PHONE_URI,
} from "@/config/business";
import { SOCIAL_LINKS } from "@/config/site";
import { useLang } from "@/context/LangContext";
import { getLocalePath } from "@/i18n/routing";
import type { Lang } from "@/i18n/types";

const SCROLL_OFFSET = 12;

const Navbar = () => {
  const { lang, t } = useLang();
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const currentHash = location.hash || "";
  const localeHref = (targetLang: Lang) => getLocalePath(targetLang, currentHash);

  const handleLocationClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const section = document.getElementById("location");
    if (!section) return;

    const navHeight =
      document.querySelector("nav")?.getBoundingClientRect().height ?? 56;
    const top =
      section.getBoundingClientRect().top +
      window.scrollY -
      navHeight -
      SCROLL_OFFSET;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/90 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-display text-lg font-bold tracking-wide text-primary">
            Galissea
          </span>
        </a>

        <div className="flex items-center gap-1.5">
          <a
            href={BUSINESS_PHONE_URI}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-accent transition-all hover:bg-card/70 hover:text-primary active:scale-95"
            aria-label={t("Τηλέφωνο", "Phone")}
          >
            <Phone size={16} />
          </a>
          <a
            href="#location"
            onClick={handleLocationClick}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-accent transition-all hover:bg-card/70 hover:text-primary active:scale-95"
            aria-label={t("Πού θα μας βρείτε", "Find us")}
            title={t("Πού θα μας βρείτε", "Find us")}
          >
            <MapPin size={16} />
          </a>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-8 w-8 items-center justify-center rounded-full text-accent transition-all hover:bg-card/70 hover:text-primary active:scale-95 min-[361px]:inline-flex"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>

          <div className="ml-1 flex rounded-full bg-muted p-0.5 text-xs font-body font-semibold">
            <a
              href={localeHref("el")}
              hrefLang="el-GR"
              aria-label={t("Ελληνικά", "Greek")}
              aria-current={lang === "el" ? "page" : undefined}
              className={`min-w-9 rounded-full px-2.5 py-1.5 text-center transition-all ${
                lang === "el"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EL
            </a>
            <a
              href={localeHref("en")}
              hrefLang="en"
              aria-label={t("Αγγλικά", "English")}
              aria-current={lang === "en" ? "page" : undefined}
              className={`min-w-9 rounded-full px-2.5 py-1.5 text-center transition-all ${
                lang === "en"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

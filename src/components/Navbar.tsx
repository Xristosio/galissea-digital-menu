import { useReducedMotion } from "framer-motion";
import { Instagram, MapPin, Phone } from "lucide-react";
import type { MouseEvent } from "react";
import { useLang } from "@/context/LangContext";

const SCROLL_OFFSET = 12;

const Navbar = () => {
  const { lang, setLang, t } = useLang();
  const reduceMotion = useReducedMotion();

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
            href="tel:+302281045686"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-accent transition-all hover:bg-card/70 hover:text-primary active:scale-95"
            aria-label={t(
              "Τηλέφωνο",
              "Phone",
            )}
          >
            <Phone size={16} />
          </a>
          <a
            href="#location"
            onClick={handleLocationClick}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-accent transition-all hover:bg-card/70 hover:text-primary active:scale-95"
            aria-label={t(
              "Πού θα μας βρείτε",
              "Find us",
            )}
            title={t(
              "Πού θα μας βρείτε",
              "Find us",
            )}
          >
            <MapPin size={16} />
          </a>
          <a
            href="https://www.instagram.com/galissea_bar/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-8 w-8 items-center justify-center rounded-full text-accent transition-all hover:bg-card/70 hover:text-primary active:scale-95 min-[361px]:inline-flex"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>

          <div className="ml-1 flex rounded-full bg-muted p-0.5 text-xs font-body font-semibold">
            <button
              type="button"
              onClick={() => setLang("el")}
              aria-label={t(
                "Ελληνικά",
                "Greek",
              )}
              aria-pressed={lang === "el"}
              className={`min-w-9 rounded-full px-2.5 py-1.5 transition-all ${
                lang === "el"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EL
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-label={t(
                "Αγγλικά",
                "English",
              )}
              aria-pressed={lang === "en"}
              className={`min-w-9 rounded-full px-2.5 py-1.5 transition-all ${
                lang === "en"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

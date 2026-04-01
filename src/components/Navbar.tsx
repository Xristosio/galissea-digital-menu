import { useReducedMotion } from "framer-motion";
import { Instagram, MapPin, Phone } from "lucide-react";
import type { MouseEvent } from "react";
import { useLang } from "@/context/LangContext";
import logo from "@/assets/logo.png";

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
          {/* <img src={logo} alt="Galissea" className="h-8 w-8" width={512} height={512} /> */}
          <span className="font-display text-lg font-bold tracking-wide text-primary">
            Galissea
          </span>
        </a>

        <div className="flex items-center gap-1.5">
          <a
            href="tel:+302281045686"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-accent transition-all hover:bg-card/70 hover:text-primary active:scale-95"
            aria-label={t(
              "\u03a4\u03b7\u03bb\u03ad\u03c6\u03c9\u03bd\u03bf",
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
              "\u03a0\u03bf\u03cd \u03b8\u03b1 \u03bc\u03b1\u03c2 \u03b2\u03c1\u03b5\u03af\u03c4\u03b5",
              "Find us",
            )}
            title={t(
              "\u03a0\u03bf\u03cd \u03b8\u03b1 \u03bc\u03b1\u03c2 \u03b2\u03c1\u03b5\u03af\u03c4\u03b5",
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
                "\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac",
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
                "\u0391\u03b3\u03b3\u03bb\u03b9\u03ba\u03ac",
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

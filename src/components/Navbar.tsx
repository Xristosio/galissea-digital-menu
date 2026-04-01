import { useLang } from "@/context/LangContext";
import { Instagram, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const { lang, setLang, t } = useLang();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/40">
      <div className="flex items-center justify-between h-14 px-4">
        <a href="#top" className="flex items-center gap-2">
          <img src={logo} alt="Galissea" className="w-8 h-8" width={512} height={512} />
          <span className="font-display text-lg font-bold text-primary tracking-wide">
            Galissea
          </span>
        </a>

        <div className="flex items-center gap-2">
          <a
            href="tel:+302281045686"
            className="p-2 text-accent hover:text-primary transition-colors"
            aria-label={t("Τηλέφωνο", "Phone")}
          >
            <Phone size={17} />
          </a>
          <a
            href="https://www.instagram.com/galissea_bar/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-accent hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={17} />
          </a>

          {/* Language switcher */}
          <div className="flex rounded-full bg-muted p-0.5 text-xs font-body font-semibold ml-1">
            <button
              onClick={() => setLang("el")}
              className={`px-2.5 py-1 rounded-full transition-all ${
                lang === "el"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EL
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-full transition-all ${
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

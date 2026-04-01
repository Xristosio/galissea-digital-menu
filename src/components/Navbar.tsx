import { useLang } from "@/context/LangContext";
import { Instagram, Facebook, Phone, Mail } from "lucide-react";

const Navbar = () => {
  const { lang, setLang, t } = useLang();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="container flex items-center justify-between h-14 px-4">
        <a href="#top" className="font-display text-xl font-semibold text-primary tracking-wide">
          Galissea
        </a>

        <div className="flex items-center gap-3">
          <a href="tel:+302281045686" className="p-2 text-accent hover:text-primary transition-colors" aria-label={t("Τηλέφωνο", "Phone")}>
            <Phone size={18} />
          </a>
          <a href="https://www.instagram.com/galissea_bar/" target="_blank" rel="noopener noreferrer" className="p-2 text-accent hover:text-primary transition-colors" aria-label="Instagram">
            <Instagram size={18} />
          </a>

          {/* Language switcher */}
          <div className="flex rounded-full bg-muted p-0.5 text-sm font-body font-medium">
            <button
              onClick={() => setLang("el")}
              className={`px-3 py-1 rounded-full transition-all ${
                lang === "el"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EL
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-full transition-all ${
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

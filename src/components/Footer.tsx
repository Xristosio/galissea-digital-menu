import {
  BUSINESS_ADDRESS,
  BUSINESS_EMAIL,
  BUSINESS_EMAIL_URI,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_URI,
} from "@/config/business";
import { useLang } from "@/context/LangContext";

const Footer = () => {
  const { lang, t } = useLang();
  const sectionLinks = [
    { href: "#menu", label: t("Μενού", "Menu") },
    { href: "#about", label: t("Εμπειρία", "Experience") },
    { href: "#gallery", label: "Gallery" },
    { href: "#location", label: t("Τοποθεσία", "Location") },
    { href: "#contact", label: t("Επικοινωνία", "Contact") },
  ];

  return (
    <footer className="border-t border-border/30 bg-card/30 px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-8 text-center">
      <div className="flex flex-col items-center gap-2">
        <span className="font-display text-base font-semibold text-primary/80">
          Galissea
        </span>
        <span className="font-body text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Cafe · Snack · Bar
        </span>
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2">
        {sectionLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-body text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </a>
        ))}
      </div>

      <p className="mt-4 font-body text-[11px] leading-relaxed text-muted-foreground">
        {lang === "el" ? BUSINESS_ADDRESS.displayEl : BUSINESS_ADDRESS.displayEn}
      </p>
      <p className="mt-1 font-body text-[11px] text-muted-foreground">
        <a href={BUSINESS_PHONE_URI} className="transition-colors hover:text-foreground">
          {BUSINESS_PHONE_DISPLAY}
        </a>{" "}
        ·{" "}
        <a href={BUSINESS_EMAIL_URI} className="transition-colors hover:text-foreground">
          {BUSINESS_EMAIL}
        </a>
      </p>
      <p className="mt-4 font-body text-[11px] text-muted-foreground/70">
        {t(
          `© ${new Date().getFullYear()} Galissea`,
          `© ${new Date().getFullYear()} Galissea`,
        )}
      </p>
    </footer>
  );
};

export default Footer;

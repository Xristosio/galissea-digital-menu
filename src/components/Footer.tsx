import { useLang } from "@/context/LangContext";

const Footer = () => {
  const { t } = useLang();

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
      <p className="mt-4 font-body text-[11px] text-muted-foreground/70">
        {t(
          `© ${new Date().getFullYear()} Galissea - Γαλησσάς, Σύρος`,
          `© ${new Date().getFullYear()} Galissea - Galissas, Syros`,
        )}
      </p>
    </footer>
  );
};

export default Footer;

import { useLang } from "@/context/LangContext";
import logo from "@/assets/logo.png";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="border-t border-border/30 bg-card/30 py-8 px-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <img src={logo} alt="Galissea" className="w-10 h-10 opacity-70" loading="lazy" width={512} height={512} />
        <span className="font-display text-base font-semibold text-primary/80">
          Galissea
        </span>
        <span className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
          Cafe · Snack · Bar
        </span>
      </div>
      <p className="font-body text-[11px] text-muted-foreground/60 mt-4">
        © {new Date().getFullYear()} Galissea — Galissas, Syros
      </p>
    </footer>
  );
};

export default Footer;

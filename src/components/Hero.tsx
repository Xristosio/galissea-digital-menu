import { useLang } from "@/context/LangContext";
import { MapPin, Clock } from "lucide-react";

const Hero = () => {
  const { t } = useLang();

  return (
    <section id="top" className="relative pt-14">
      {/* Hero content */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-16 md:py-24">
        {/* Decorative line */}
        <div className="w-12 h-px bg-accent mb-6" />

        <h1 className="font-display text-5xl md:text-6xl font-semibold text-primary tracking-wide mb-3">
          Galissea
        </h1>

        <p className="font-body text-accent text-sm tracking-[0.3em] uppercase mb-6">
          Cafe · Snack · Bar
        </p>

        <div className="flex flex-col items-center gap-2 text-muted-foreground text-sm font-body mb-8">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-accent" />
            Galissas, Syros
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-accent" />
            09:00 – 22:00
          </span>
        </div>

        <p className="font-body text-muted-foreground text-base max-w-xs md:max-w-md leading-relaxed mb-8">
          {t(
            "Απολαύστε τον καφέ, τα σνακ και τα κοκτέιλ σας με θέα τη θάλασσα στη Γαλησσά.",
            "Enjoy your coffee, snacks and cocktails with a sea view in Galissas."
          )}
        </p>

        <a
          href="#menu"
          className="inline-flex items-center justify-center bg-primary text-primary-foreground font-body font-medium text-sm px-8 py-3 rounded-full hover:opacity-90 transition-opacity active:scale-[0.98]"
        >
          {t("Δες τον Κατάλογο", "View Menu")}
        </a>

        {/* Bottom decorative element */}
        <div className="w-8 h-px bg-border mt-12" />
      </div>
    </section>
  );
};

export default Hero;

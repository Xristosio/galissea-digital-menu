import { motion } from "framer-motion";
import { ChevronDown, MapPin, Clock } from "lucide-react";
import { useLang } from "@/context/LangContext";
import logo from "@/assets/logo.png";

const Hero = () => {
  const { t } = useLang();

  return (
    <section
      id="top"
      className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 pt-20 pb-12 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-br from-primary/8 via-accent/5 to-transparent" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm mx-auto">
        {/* Logo */}
        <motion.img
          src={logo}
          alt="Galissea"
          className="w-32 h-32 mb-5 drop-shadow-lg"
          width={512}
          height={512}
          initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />

        {/* Name */}
        <motion.h1
          className="font-display text-[2.5rem] font-bold text-primary leading-none mb-2"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Galissea
        </motion.h1>

        {/* Slogan */}
        <motion.p
          className="font-body text-xs tracking-[0.35em] uppercase text-accent font-medium mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Cafe · Snack · Bar
        </motion.p>

        {/* Info pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-body text-muted-foreground">
            <MapPin size={12} className="text-accent" />
            Galissas, Syros
          </span>
          <span className="inline-flex items-center gap-1.5 bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-body text-muted-foreground">
            <Clock size={12} className="text-accent" />
            09:00 – 22:00
          </span>
        </motion.div>

        {/* CTA */}
        <motion.a
          href="#menu"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-body font-semibold text-sm shadow-lg hover:shadow-xl transition-all active:scale-[0.97]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          whileTap={{ scale: 0.97 }}
        >
          {t("Δες τον Κατάλογο", "View Menu")}
          <ChevronDown size={16} />
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;

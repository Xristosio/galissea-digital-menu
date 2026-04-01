import { motion } from "framer-motion";
import { ChevronDown, Clock, MapPin } from "lucide-react";
import { useLang } from "@/context/LangContext";
import logo from "@/assets/logo.png";

const Hero = () => {
  const { t } = useLang();

  return (
    <section
      id="top"
      className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 pb-12 pt-[calc(env(safe-area-inset-top)+5rem)]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
      <div className="absolute left-0 right-0 top-0 h-64 bg-gradient-to-br from-primary/8 via-accent/5 to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-sm flex-col items-center text-center">
        <motion.img
          src={logo}
          alt="Galissea"
          className="mb-5 h-32 w-32 drop-shadow-lg"
          width={512}
          height={512}
          initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />

        <motion.h1
          className="mb-2 font-display text-[2.25rem] font-bold leading-none text-primary sm:text-[2.5rem]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Galissea
        </motion.h1>

        <motion.p
          className="mb-6 font-body text-xs font-medium uppercase tracking-[0.35em] text-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Cafe · Snack · Bar
        </motion.p>

        <motion.div
          className="mb-8 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-card/80 px-3 py-1.5 font-body text-xs text-muted-foreground backdrop-blur-sm">
            <MapPin size={12} className="text-accent" />
            Galissas, Syros
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-card/80 px-3 py-1.5 font-body text-xs text-muted-foreground backdrop-blur-sm">
            <Clock size={12} className="text-accent" />
            09:00 - 22:00
          </span>
        </motion.div>

        <motion.a
          href="#menu"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl active:scale-[0.97]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          whileTap={{ scale: 0.97 }}
        >
          {t(
            "\u0394\u03b5\u03c2 \u03c4\u03bf\u03bd \u039a\u03b1\u03c4\u03ac\u03bb\u03bf\u03b3\u03bf",
            "View Menu",
          )}
          <ChevronDown size={16} />
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;

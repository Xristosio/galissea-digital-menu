import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { menuData } from "@/data/menu";
import { X } from "lucide-react";

const MenuSection = () => {
  const { lang, t } = useLang();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  const activeCat = menuData.find((c) => c.id === activeCategory);

  // Scroll active chip into view
  useEffect(() => {
    if (!activeCategory) return;
    const activeBtn = navRef.current?.querySelector(
      `[data-cat="${activeCategory}"]`
    ) as HTMLElement | null;
    if (activeBtn && navRef.current) {
      const nav = navRef.current;
      const scrollLeft =
        activeBtn.offsetLeft - nav.offsetWidth / 2 + activeBtn.offsetWidth / 2;
      nav.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeCategory]);

  // Scroll to items when category selected
  useEffect(() => {
    if (activeCategory && itemsRef.current) {
      const y =
        itemsRef.current.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [activeCategory]);

  return (
    <section id="menu" className="pb-8">
      {/* Section header */}
      <div className="text-center px-4 pt-10 pb-6">
        <motion.h2
          className="font-display text-2xl font-bold text-primary mb-1"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("Κατάλογος", "Menu")}
        </motion.h2>
        <div className="w-12 h-0.5 bg-accent/60 mx-auto rounded-full" />
      </div>

      {/* Category cards grid */}
      <div className="px-4 grid grid-cols-2 gap-3 mb-2">
        {menuData.map((cat, i) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              setActiveCategory(activeCategory === cat.id ? null : cat.id)
            }
            className={`relative overflow-hidden rounded-2xl aspect-[4/3] group transition-all duration-300 ${
              activeCategory === cat.id
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg"
                : "shadow-sm"
            }`}
          >
            <img
              src={cat.image}
              alt={lang === "el" ? cat.nameEl : cat.nameEn}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              width={640}
              height={512}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <span className="font-display text-sm font-semibold text-white drop-shadow-md leading-tight">
                {lang === "el" ? cat.nameEl : cat.nameEn}
              </span>
              <span className="block font-body text-[10px] text-white/70 mt-0.5">
                {cat.items.length} {t("προϊόντα", "items")}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Sticky category chips (visible when a category is open) */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="sticky top-14 z-40 bg-background/95 backdrop-blur-md border-b border-border/30 shadow-sm"
          >
            <div
              ref={navRef}
              className="flex gap-1.5 overflow-x-auto hide-scrollbar px-4 py-2.5"
            >
              {menuData.map((cat) => (
                <button
                  key={cat.id}
                  data-cat={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-body font-medium transition-all whitespace-nowrap ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {lang === "el" ? cat.nameEl : cat.nameEn}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active category items */}
      <div ref={itemsRef} className="px-4 pt-2 min-h-[200px]">
        <AnimatePresence mode="wait">
          {activeCat ? (
            <motion.div
              key={activeCat.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {/* Category header */}
              <div className="flex items-center justify-between mb-3 pt-2">
                <div className="flex items-center gap-3">
                  <img
                    src={activeCat.image}
                    alt=""
                    className="w-10 h-10 rounded-xl object-cover"
                    loading="lazy"
                  />
                  <h3 className="font-display text-lg font-bold text-primary">
                    {lang === "el" ? activeCat.nameEl : activeCat.nameEn}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="p-2 rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Items */}
              <div className="bg-card/50 rounded-2xl overflow-hidden divide-y divide-border/30">
                {activeCat.items.map((item, idx) => {
                  const name = lang === "el" ? item.nameEl : item.nameEn;
                  const desc = lang === "el" ? item.descEl : item.descEn;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      className="flex items-start justify-between py-3.5 px-4"
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <span className="font-body text-[15px] font-medium text-foreground leading-tight block">
                          {name}
                        </span>
                        {desc && (
                          <p className="font-body text-[11px] text-muted-foreground mt-0.5 leading-snug">
                            {desc}
                          </p>
                        )}
                      </div>
                      <span className="font-body text-sm font-bold text-primary whitespace-nowrap pt-0.5 tabular-nums">
                        {item.price}€
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground font-body text-sm py-8"
            >
              {t(
                "Επιλέξτε μια κατηγορία παραπάνω",
                "Tap a category above to explore"
              )}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MenuSection;

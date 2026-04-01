import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { menuData } from "@/data/menu";

const MENU_SCROLL_OFFSET = 120;

const MenuSection = () => {
  const { lang, t } = useLang();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const scrollBehavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";

  const activeCat = menuData.find((category) => category.id === activeCategory);

  useEffect(() => {
    if (!activeCategory || !navRef.current) return;

    const activeButton = navRef.current.querySelector(
      `[data-cat="${activeCategory}"]`
    ) as HTMLElement | null;

    if (!activeButton) return;

    const nav = navRef.current;
    const scrollLeft =
      activeButton.offsetLeft - nav.offsetWidth / 2 + activeButton.offsetWidth / 2;

    nav.scrollTo({ left: scrollLeft, behavior: scrollBehavior });
  }, [activeCategory, scrollBehavior]);

  useEffect(() => {
    if (!activeCategory || !itemsRef.current) return;

    const y = itemsRef.current.getBoundingClientRect().top + window.scrollY - MENU_SCROLL_OFFSET;
    window.scrollTo({ top: y, behavior: scrollBehavior });
  }, [activeCategory, scrollBehavior]);

  return (
    <section id="menu" className="pb-8">
      <div className="px-4 pb-6 pt-10 text-center">
        <motion.h2
          className="mb-1 font-display text-2xl font-bold text-primary"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("\u039a\u03b1\u03c4\u03ac\u03bb\u03bf\u03b3\u03bf\u03c2", "Menu")}
        </motion.h2>
        <div className="mx-auto h-0.5 w-12 rounded-full bg-accent/60" />
      </div>

      <div className="mb-2 grid grid-cols-2 gap-3 px-4">
        {menuData.map((category, index) => (
          <motion.button
            type="button"
            key={category.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: index * 0.04, duration: 0.4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              setActiveCategory(activeCategory === category.id ? null : category.id)
            }
            className={`group relative aspect-[4/3] overflow-hidden rounded-2xl transition-all duration-300 touch-manipulation ${
              activeCategory === category.id
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg"
                : "shadow-sm"
            }`}
          >
            <img
              src={category.image}
              alt={lang === "el" ? category.nameEl : category.nameEn}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              width={640}
              height={512}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
              <span className="block font-display text-sm font-semibold leading-tight text-white drop-shadow-md">
                {lang === "el" ? category.nameEl : category.nameEn}
              </span>
              <span className="mt-0.5 block font-body text-[10px] text-white/70">
                {category.items.length} {t("\u03c0\u03c1\u03bf\u03ca\u03cc\u03bd\u03c4\u03b1", "items")}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="sticky top-[calc(env(safe-area-inset-top)+3.5rem)] z-40 border-b border-border/30 bg-background/95 shadow-sm backdrop-blur-md"
          >
            <div ref={navRef} className="hide-scrollbar flex gap-1.5 overflow-x-auto px-4 py-2.5">
              {menuData.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  data-cat={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-body font-medium transition-all ${
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {lang === "el" ? category.nameEl : category.nameEn}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={itemsRef} className="min-h-[200px] px-4 pt-2">
        <AnimatePresence mode="wait">
          {activeCat ? (
            <motion.div
              key={activeCat.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-3 flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <img
                    src={activeCat.image}
                    alt=""
                    className="h-10 w-10 rounded-xl object-cover"
                    loading="lazy"
                  />
                  <h3 className="font-display text-lg font-bold text-primary">
                    {lang === "el" ? activeCat.nameEl : activeCat.nameEn}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={t("\u039a\u03bb\u03b5\u03af\u03c3\u03b9\u03bc\u03bf", "Close")}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl bg-card/50 divide-y divide-border/30">
                {activeCat.items.map((item, index) => {
                  const name = lang === "el" ? item.nameEl : item.nameEn;
                  const description = lang === "el" ? item.descEl : item.descEn;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="flex items-start justify-between px-4 py-3.5"
                    >
                      <div className="min-w-0 flex-1 pr-4">
                        <span className="block font-body text-[15px] font-medium leading-tight text-foreground">
                          {name}
                        </span>
                        {description && (
                          <p className="mt-0.5 font-body text-[11px] leading-snug text-muted-foreground">
                            {description}
                          </p>
                        )}
                      </div>
                      <span className="whitespace-nowrap pt-0.5 font-body text-sm font-bold tabular-nums text-primary">
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
              className="py-8 text-center font-body text-sm text-muted-foreground"
            >
              {t(
                "\u0395\u03c0\u03b9\u03bb\u03ad\u03be\u03c4\u03b5 \u03bc\u03b9\u03b1 \u03ba\u03b1\u03c4\u03b7\u03b3\u03bf\u03c1\u03af\u03b1 \u03c0\u03b1\u03c1\u03b1\u03c0\u03ac\u03bd\u03c9",
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

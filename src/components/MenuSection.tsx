import { useState, useRef, useEffect } from "react";
import { useLang } from "@/context/LangContext";
import { menuData } from "@/data/menu";

const MenuSection = () => {
  const { lang, t } = useLang();
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);
  const navRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const el = categoryRefs.current[id];
    if (el) {
      const offset = 120; // navbar + sticky nav height
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Scroll active chip into view in nav
  useEffect(() => {
    const activeBtn = navRef.current?.querySelector(`[data-cat="${activeCategory}"]`) as HTMLElement | null;
    if (activeBtn && navRef.current) {
      const nav = navRef.current;
      const scrollLeft = activeBtn.offsetLeft - nav.offsetWidth / 2 + activeBtn.offsetWidth / 2;
      nav.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeCategory]);

  // Intersection observer for active category
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        }
      },
      { rootMargin: "-130px 0px -60% 0px", threshold: 0 }
    );

    menuData.forEach((cat) => {
      const el = categoryRefs.current[cat.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="menu" className="pb-12">
      {/* Section title */}
      <div className="text-center px-4 pt-8 pb-4">
        <h2 className="font-display text-2xl font-semibold text-primary mb-1">
          {t("Κατάλογος", "Menu")}
        </h2>
        <div className="w-10 h-px bg-accent mx-auto" />
      </div>

      {/* Sticky category navigation */}
      <div className="sticky top-14 z-40 bg-background/95 backdrop-blur-sm border-b border-border/40">
        <div
          ref={navRef}
          className="flex gap-1.5 overflow-x-auto hide-scrollbar px-4 py-3"
        >
          {menuData.map((cat) => (
            <button
              key={cat.id}
              data-cat={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-body font-medium transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {lang === "el" ? cat.nameEl : cat.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Menu items */}
      <div className="px-4 pt-4">
        {menuData.map((cat) => (
          <div
            key={cat.id}
            id={cat.id}
            ref={(el) => { categoryRefs.current[cat.id] = el; }}
            className="mb-8"
          >
            <h3 className="font-display text-lg font-semibold text-primary mb-4 pl-1">
              {lang === "el" ? cat.nameEl : cat.nameEn}
            </h3>

            <div className="space-y-1">
              {cat.items.map((item, idx) => {
                const name = lang === "el" ? item.nameEl : item.nameEn;
                const desc = lang === "el" ? item.descEl : item.descEn;

                return (
                  <div
                    key={idx}
                    className="flex items-start justify-between py-3 px-3 rounded-lg hover:bg-card/60 transition-colors"
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <span className="font-body text-[15px] font-medium text-foreground leading-tight">
                        {name}
                      </span>
                      {desc && (
                        <p className="font-body text-xs text-muted-foreground mt-0.5 leading-snug">
                          {desc}
                        </p>
                      )}
                    </div>
                    <span className="font-body text-sm font-semibold text-accent whitespace-nowrap pt-0.5">
                      {item.price}€
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;

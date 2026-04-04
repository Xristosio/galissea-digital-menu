import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useLang } from "@/context/LangContext";
import {
  getCategoryGeneralFootnotes,
  getCategoryItemsCount,
  getCategoryProductFootnotes,
  getCategorySegments,
  menuData,
  type MenuCategory,
  type MenuFootnote,
  type MenuItem,
  type MenuSegment,
} from "@/data/menu";

const MENU_SCROLL_OFFSET = 120;

const normalizeSearchValue = (value: string) =>
  value
    .toLocaleLowerCase("el-GR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

interface SearchCategoryResult {
  id: string;
  nameEl: string;
  nameEn: string;
  image: string;
  hasStructuredSegments: boolean;
  segments: MenuSegment[];
  itemCount: number;
}

const getCategorySearchTerms = (category: MenuCategory) =>
  [category.nameEl, category.nameEn].map(normalizeSearchValue).join(" ");

const getSegmentSearchTerms = (segment: MenuSegment) =>
  [segment.titleEl, segment.titleEn].map(normalizeSearchValue).join(" ");

const getItemSearchTerms = (item: MenuItem) =>
  [
    item.nameEl,
    item.nameEn,
    item.descEl ?? "",
    item.descEn ?? "",
    item.marker ?? "",
    item.extraEl ?? "",
    item.extraEn ?? "",
    item.price,
  ]
    .map(normalizeSearchValue)
    .join(" ");

const MenuSection = () => {
  const { lang, t } = useLang();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const reduceMotion = useReducedMotion();
  const scrollBehavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";

  const activeCat = menuData.find((category) => category.id === activeCategory) ?? null;
  const activeSegments = useMemo(
    () => (activeCat ? getCategorySegments(activeCat) : []),
    [activeCat]
  );
  const activeProductFootnotes = useMemo(
    () => (activeCat ? getCategoryProductFootnotes(activeCat) : []),
    [activeCat]
  );
  const activeGeneralFootnotes = useMemo(
    () => (activeCat ? getCategoryGeneralFootnotes(activeCat) : []),
    [activeCat]
  );
  const activeHasStructuredSegments = Boolean(activeCat?.segments?.length);

  const normalizedQuery = useMemo(() => normalizeSearchValue(searchQuery), [searchQuery]);
  const isSearchActive = normalizedQuery.length > 0;

  const filteredCategories = useMemo<SearchCategoryResult[]>(() => {
    if (!isSearchActive) return [];

    return menuData
      .map((category) => {
        const categoryTerms = getCategorySearchTerms(category);
        const matchesCategory = categoryTerms.includes(normalizedQuery);
        const sourceSegments = getCategorySegments(category);

        const matchingSegments = sourceSegments
          .map((segment) => {
            const segmentTerms = getSegmentSearchTerms(segment);
            const matchesSegment = segmentTerms.includes(normalizedQuery);

            const matchingItems = segment.items.filter((item) => {
              if (matchesCategory || matchesSegment) return true;
              return getItemSearchTerms(item).includes(normalizedQuery);
            });

            return {
              ...segment,
              items: matchingItems,
            };
          })
          .filter((segment) => segment.items.length > 0);

        if (matchingSegments.length === 0) {
          return null;
        }

        return {
          id: category.id,
          nameEl: category.nameEl,
          nameEn: category.nameEn,
          image: category.image,
          hasStructuredSegments: Boolean(category.segments?.length),
          segments: matchingSegments,
          itemCount: matchingSegments.reduce(
            (total, segment) => total + segment.items.length,
            0
          ),
        };
      })
      .filter((category): category is SearchCategoryResult => category !== null);
  }, [isSearchActive, normalizedQuery]);

  const totalSearchResults = useMemo(
    () => filteredCategories.reduce((total, category) => total + category.itemCount, 0),
    [filteredCategories]
  );

  const searchTransition = reduceMotion
    ? { duration: 0.12 }
    : { duration: 0.24, ease: "easeOut" as const };

  const focusSearchInput = () => {
    const input = searchInputRef.current;
    if (!input) return;

    input.focus({ preventScroll: true });
    const caretPos = input.value.length;
    input.setSelectionRange(caretPos, caretPos);
  };

  const openSearch = () => {
    if (isSearchOpen) {
      focusSearchInput();
      return;
    }

    flushSync(() => setIsSearchOpen(true));
    focusSearchInput();

    window.requestAnimationFrame(() => {
      focusSearchInput();
    });
  };

  const closeSearch = () => {
    setSearchQuery("");
    setIsSearchOpen(false);
    searchInputRef.current?.blur();
  };

  useEffect(() => {
    if (!activeCategory || !navRef.current || isSearchActive) return;

    const activeButton = navRef.current.querySelector(
      `[data-cat="${activeCategory}"]`
    ) as HTMLElement | null;

    if (!activeButton) return;

    const nav = navRef.current;
    const scrollLeft =
      activeButton.offsetLeft - nav.offsetWidth / 2 + activeButton.offsetWidth / 2;

    nav.scrollTo({ left: scrollLeft, behavior: scrollBehavior });
  }, [activeCategory, isSearchActive, scrollBehavior]);

  useEffect(() => {
    if (!activeCategory || !itemsRef.current || isSearchActive) return;

    const y = itemsRef.current.getBoundingClientRect().top + window.scrollY - MENU_SCROLL_OFFSET;
    window.scrollTo({ top: y, behavior: scrollBehavior });
  }, [activeCategory, isSearchActive, scrollBehavior]);

  useEffect(() => {
    if (!isSearchOpen) return;
    const rafId = window.requestAnimationFrame(() => {
      focusSearchInput();
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (isSearchActive && activeCategory) {
      setActiveCategory(null);
    }
  }, [activeCategory, isSearchActive]);

  useEffect(() => {
    if (!isSearchOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();

      if (searchQuery) {
        setSearchQuery("");
      } else {
        closeSearch();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isSearchOpen, searchQuery]);

  const renderMenuItem = (
    item: MenuItem,
    key: string,
    delay: number
  ) => {
    const name = lang === "el" ? item.nameEl : item.nameEn;
    const marker = item.marker ?? "";
    const description = lang === "el" ? item.descEl : item.descEn;
    const extra = lang === "el" ? item.extraEl : item.extraEn;

    return (
      <motion.div
        key={key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay }}
        className="flex items-start justify-between px-4 py-3.5"
      >
        <div className="min-w-0 flex-1 pr-4">
          <span className="block font-body text-[15px] font-medium leading-tight text-foreground">
            {name}
            {marker && (
              <sup className="ml-1 align-super font-body text-[10px] font-semibold text-accent">
                {marker}
              </sup>
            )}
          </span>
          {description && (
            <p className="mt-0.5 font-body text-[11px] leading-snug text-muted-foreground">
              {description}
            </p>
          )}
          {extra && (
            <p className="mt-1 font-body text-[10px] leading-snug text-accent/95">
              {extra}
            </p>
          )}
        </div>
        <span className="whitespace-nowrap pt-0.5 font-body text-sm font-bold tabular-nums text-primary">
          {item.price}&euro;
        </span>
      </motion.div>
    );
  };

  return (
    <section id="menu" className="pb-8">
      <div className="px-4 pb-6 pt-10 text-center">
        <motion.h2
          className="mb-1 font-display text-2xl font-bold text-primary"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("Κατάλογος", "Menu")}
        </motion.h2>
        <div className="mx-auto h-0.5 w-12 rounded-full bg-accent/60" />
      </div>

      <div className="px-4 pb-3">
        <div className="mx-auto w-full max-w-md">
          <div className="relative mx-auto h-10 w-full max-w-xs">
            <AnimatePresence initial={false}>
              {isSearchOpen ? (
                <motion.div
                  key="search-open"
                  data-search-shell
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 6 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 6 }}
                  transition={searchTransition}
                  onKeyDown={(event) => {
                    if (event.key !== "Escape") return;
                    if (searchQuery) {
                      setSearchQuery("");
                    } else {
                      closeSearch();
                    }
                  }}
                  className="absolute inset-0 flex items-center gap-1.5 overflow-hidden rounded-full border border-border/60 bg-card/90 px-2 py-1.5 shadow-sm backdrop-blur-sm"
                >
                  <Search size={15} className="flex-shrink-0 text-accent" />
                  <label htmlFor="menu-search" className="sr-only">
                    {t("Αναζήτηση καταλόγου", "Search menu")}
                  </label>
                  <input
                    id="menu-search"
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder={t("Αναζήτηση...", "Search...")}
                    className="h-8 w-full min-w-0 bg-transparent px-1 font-body text-[16px] leading-none text-foreground placeholder:text-muted-foreground focus:outline-none sm:h-7 sm:text-sm"
                    aria-label={t("Αναζήτηση καταλόγου", "Search menu")}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      aria-label={t("Καθαρισμός αναζήτησης", "Clear search")}
                    >
                      <X size={14} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={closeSearch}
                    className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label={t("Κλείσιμο αναζήτησης", "Close search")}
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ) : (
                <div data-search-trigger-wrap className="absolute left-1/2 top-0 -translate-x-1/2">
                  <motion.button
                    key="search-trigger"
                    data-search-trigger
                    type="button"
                    onClick={openSearch}
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                    animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                    transition={searchTransition}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-card/70 text-accent shadow-sm transition-colors hover:bg-card hover:text-primary"
                    aria-label={t("Άνοιγμα αναζήτησης", "Open menu search")}
                    title={t("Αναζήτηση", "Search")}
                  >
                    <Search size={17} />
                  </motion.button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {isSearchActive && (
          <p className="mt-2 text-center font-body text-[11px] text-muted-foreground">
            {t("Φιλτραρισμένα", "Filtered")}: "{searchQuery.trim()}" - {totalSearchResults}{" "}
            {t("αποτελέσματα", "results")}
          </p>
        )}
      </div>

      {!isSearchActive && (
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
                  {getCategoryItemsCount(category)} {t("προϊόντα", "items")}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {activeCategory && !isSearchActive && (
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
          {isSearchActive ? (
            filteredCategories.length > 0 ? (
              <motion.div
                key={`search-results-${normalizedQuery}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24 }}
                className="space-y-4"
              >
                {filteredCategories.map((category) => (
                  <div
                    key={`search-group-${category.id}`}
                    className="overflow-hidden rounded-2xl bg-card/50 shadow-sm divide-y divide-border/30"
                  >
                    <div className="flex items-center justify-between gap-3 bg-muted/35 px-4 py-2.5">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <img
                          src={category.image}
                          alt=""
                          className="h-8 w-8 rounded-lg object-cover"
                          loading="lazy"
                        />
                        <h3 className="truncate font-display text-base font-semibold text-primary">
                          {lang === "el" ? category.nameEl : category.nameEn}
                        </h3>
                      </div>
                      <span className="whitespace-nowrap font-body text-[11px] text-muted-foreground">
                        {category.itemCount} {t("προϊόντα", "items")}
                      </span>
                    </div>

                    {category.segments.map((segment, segmentIndex) => (
                      <Fragment key={`search-segment-${category.id}-${segment.id}`}>
                        {category.hasStructuredSegments && (
                          <div className="bg-muted/25 px-4 py-2">
                            <h4 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                              {lang === "el" ? segment.titleEl : segment.titleEn}
                            </h4>
                          </div>
                        )}

                        {segment.items.map((item, index) =>
                          renderMenuItem(
                            item,
                            `${category.id}-${segment.id}-${index}-${item.price}`,
                            Math.min(segmentIndex * 0.05 + index * 0.02, 0.22)
                          )
                        )}
                      </Fragment>
                    ))}
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={`search-empty-${normalizedQuery}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl bg-card/50 px-4 py-8 text-center"
              >
                <p className="font-body text-sm text-foreground">
                  {t("Δεν βρέθηκαν αποτελέσματα", "No matches found")}
                </p>
                <p className="mt-1 font-body text-xs text-muted-foreground">
                  {t("Δοκιμάστε άλλο όρο αναζήτησης.", "Try a different search term.")}
                </p>
              </motion.div>
            )
          ) : activeCat ? (
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
                  aria-label={t("Κλείσιμο", "Close")}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl bg-card/50 divide-y divide-border/30">
                {activeSegments.map((segment, segmentIndex) => (
                  <Fragment key={`active-segment-${segment.id}`}>
                    {activeHasStructuredSegments && (
                      <div className="bg-muted/25 px-4 py-2.5">
                        <h4 className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          {lang === "el" ? segment.titleEl : segment.titleEn}
                        </h4>
                      </div>
                    )}

                    {segment.items.map((item, index) =>
                      renderMenuItem(
                        item,
                        `${segment.id}-${index}-${item.price}`,
                        Math.min(segmentIndex * 0.05 + index * 0.03, 0.24)
                      )
                    )}
                  </Fragment>
                ))}
              </div>

              {(activeProductFootnotes.length > 0 || activeGeneralFootnotes.length > 0) && (
                <div
                  data-category-footnotes
                  className="mt-2.5 border-t border-border/35 px-1 pt-2.5"
                >
                  <h4 className="font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {t("Σημειώσεις", "Notes")}
                  </h4>

                  {activeProductFootnotes.length > 0 && (
                    <div className="mt-1.5">
                      <h5 className="font-body text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground/90">
                        {t("Σχετικά με τα προϊόντα", "Product notes")}
                      </h5>
                      <ul className="mt-1 space-y-1">
                        {activeProductFootnotes.map((footnote: MenuFootnote, index) => (
                          <li
                            data-footnote-item
                            data-footnote-type="product"
                            key={`product-footnote-${index}-${footnote.marker ?? "text"}`}
                            className="flex items-start gap-1.5 font-body text-[10px] leading-snug text-muted-foreground"
                          >
                            <span className="min-w-[1.35rem] pt-[1px] text-[10px] font-semibold text-accent">
                              {footnote.marker ?? "•"}
                            </span>
                            <span>{lang === "el" ? footnote.textEl : footnote.textEn}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeGeneralFootnotes.length > 0 && (
                    <div
                      className={`${
                        activeProductFootnotes.length > 0
                          ? "mt-2 border-t border-border/25 pt-2"
                          : "mt-1.5"
                      }`}
                    >
                      <h5 className="font-body text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground/90">
                        {t("Γενικές πληροφορίες", "General information")}
                      </h5>
                      <ul className="mt-1 space-y-1">
                        {activeGeneralFootnotes.map((footnote: MenuFootnote, index) => (
                          <li
                            data-footnote-item
                            data-footnote-type="general"
                            key={`general-footnote-${index}`}
                            className="flex items-start gap-1.5 font-body text-[10px] leading-snug text-muted-foreground"
                          >
                            <span className="min-w-[1.35rem] pt-[1px] text-accent/70">•</span>
                            <span>{lang === "el" ? footnote.textEl : footnote.textEn}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8 text-center font-body text-sm text-muted-foreground"
            >
              {t("Επιλέξτε μια κατηγορία παραπάνω", "Tap a category above to explore")}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MenuSection;

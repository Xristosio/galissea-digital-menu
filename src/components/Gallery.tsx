import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/context/LangContext";
import { galleryData, type GalleryImage } from "@/data/gallery";

const MAIN_IMAGE_COUNT = 3;
const MAIN_PRIMARY_SIZES =
  "(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) calc(100vw - 5rem), 52rem";
const MAIN_SECONDARY_SIZES =
  "(max-width: 640px) calc(50vw - 1rem), (max-width: 1024px) calc(50vw - 2.5rem), 26rem";
const STRIP_SIZES = "(max-width: 640px) 9.5rem, 11rem";
const LIGHTBOX_SIZES = "(max-width: 640px) 92vw, (max-width: 1024px) 86vw, 72vw";

const Gallery = () => {
  const { lang, t } = useLang();
  const reduceMotion = useReducedMotion();
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const primaryImages = galleryData.slice(0, MAIN_IMAGE_COUNT);
  const remainingImages = galleryData.slice(MAIN_IMAGE_COUNT);
  const stripImages =
    remainingImages.length >= 2
      ? remainingImages
      : [
          ...remainingImages,
          ...galleryData.slice(0, Math.max(0, 2 - remainingImages.length)),
        ];

  const markLoaded = (key: string) => {
    setLoadedImages((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
  };

  const openLightbox = (image: GalleryImage, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setActiveImage(image);
  };

  const closeLightbox = () => {
    setActiveImage(null);
    window.setTimeout(() => {
      lastTriggerRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    if (!activeImage) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeLightbox();
    };

    window.addEventListener("keydown", onKeyDown);
    const rafId = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.cancelAnimationFrame(rafId);
    };
  }, [activeImage]);

  useEffect(() => {
    if (!activeImage) return;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarCompensation = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarCompensation > 0) {
      body.style.paddingRight = `${scrollbarCompensation}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [activeImage]);

  return (
    <section id="gallery" className="px-4 py-12">
      <div className="mb-6 text-center">
        <motion.h2
          className="mb-1 font-display text-2xl font-bold text-primary"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("Η Ατμόσφαιρά μας", "Our Place")}
        </motion.h2>
        <div className="mx-auto h-0.5 w-12 rounded-full bg-accent/60" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {primaryImages.map((image, index) => {
          const loadKey = `main-${image.id}`;
          const isLoaded = Boolean(loadedImages[loadKey]);
          const caption = lang === "el" ? image.captionEl : image.captionEn;

          return (
            <motion.button
              type="button"
              key={image.id}
              onClick={(event) => openLightbox(image, event.currentTarget)}
              aria-label={t("Μεγέθυνση εικόνας", "Open larger image") + `: ${caption}`}
              className={`group relative overflow-hidden rounded-2xl will-change-transform [transform:translateZ(0)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                index === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
              }`}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <div
                className={`absolute inset-0 bg-muted/25 transition-opacity duration-300 ${
                  isLoaded ? "opacity-0" : "opacity-100"
                }`}
              />
              <img
                src={image.image.src}
                srcSet={image.image.srcSet}
                sizes={index === 0 ? MAIN_PRIMARY_SIZES : MAIN_SECONDARY_SIZES}
                alt={caption}
                className={`h-full w-full object-cover transition-[opacity,transform] duration-500 motion-safe:group-hover:scale-105 motion-safe:group-active:scale-[1.01] [backface-visibility:hidden] [transform:translateZ(0)] ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
                loading={index === 0 ? "eager" : "lazy"}
                decoding={index === 0 ? "sync" : "async"}
                fetchPriority={index === 0 ? "high" : "auto"}
                width={image.image.width}
                height={image.image.height}
                onLoad={() => markLoaded(loadKey)}
                onError={() => markLoaded(loadKey)}
              />
            </motion.button>
          );
        })}
      </div>

      {stripImages.length > 0 && (
        <motion.div
          className="mt-4 rounded-2xl bg-card/35 p-2.5"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.35 }}
        >
          <p className="px-1 font-body text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {t("Περισσότερες στιγμές", "More moments")}
          </p>

          <div className="hide-scrollbar mt-2 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1 touch-pan-x">
            {stripImages.map((image) => {
              const loadKey = `strip-${image.id}`;
              const isLoaded = Boolean(loadedImages[loadKey]);
              const caption = lang === "el" ? image.captionEl : image.captionEn;

              return (
                <button
                  key={image.id}
                  type="button"
                  onClick={(event) => openLightbox(image, event.currentTarget)}
                  aria-label={t("Μεγέθυνση εικόνας", "Open larger image") + `: ${caption}`}
                  className="group relative h-28 w-48 shrink-0 snap-start overflow-hidden rounded-xl border border-border/20 bg-background/40 will-change-transform [transform:translateZ(0)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <div
                    className={`absolute inset-0 bg-muted/30 transition-opacity duration-300 ${
                      isLoaded ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <img
                    src={image.image.src}
                    srcSet={image.image.srcSet}
                    sizes={STRIP_SIZES}
                    alt={caption}
                    className={`h-full w-full object-cover transition-[opacity,transform] duration-500 motion-safe:group-hover:scale-105 [backface-visibility:hidden] [transform:translateZ(0)] ${
                      isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    width={image.image.width}
                    height={image.image.height}
                    onLoad={() => markLoaded(loadKey)}
                    onError={() => markLoaded(loadKey)}
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-2 py-1.5 text-left font-body text-[10px] text-white/90">
                    {caption}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {activeImage && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t("Μεγέθυνση εικόνας", "Image preview")}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/75 px-4 py-[max(1rem,env(safe-area-inset-top))] backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.22 }}
            onClick={closeLightbox}
          >
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 8 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: reduceMotion ? 0.12 : 0.22 }}
              className="relative w-full max-w-4xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeLightbox}
                aria-label={t("Κλείσιμο εικόνας", "Close image")}
                className="absolute right-2 top-2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white transition-colors hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
              >
                <X size={18} />
              </button>

              <img
                src={activeImage.image.src}
                srcSet={activeImage.image.srcSet}
                sizes={LIGHTBOX_SIZES}
                alt={lang === "el" ? activeImage.captionEl : activeImage.captionEn}
                className="max-h-[80vh] w-full rounded-2xl border border-white/15 bg-black/10 object-contain shadow-2xl"
                width={activeImage.image.width}
                height={activeImage.image.height}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;

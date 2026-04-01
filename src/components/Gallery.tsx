import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useLang } from "@/context/LangContext";
import { galleryData } from "@/data/gallery";

const MAIN_IMAGE_COUNT = 3;
const MAIN_PRIMARY_SIZES =
  "(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) calc(100vw - 5rem), 52rem";
const MAIN_SECONDARY_SIZES =
  "(max-width: 640px) calc(50vw - 1rem), (max-width: 1024px) calc(50vw - 2.5rem), 26rem";
const STRIP_SIZES = "(max-width: 640px) 9.5rem, 11rem";

const Gallery = () => {
  const { lang, t } = useLang();
  const reduceMotion = useReducedMotion();
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

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

          return (
            <motion.div
              key={image.id}
              className={`group relative overflow-hidden rounded-2xl will-change-transform [transform:translateZ(0)] ${
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
                alt={lang === "el" ? image.captionEl : image.captionEn}
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
            </motion.div>
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

              return (
                <figure
                  key={image.id}
                  className="group relative h-28 w-48 shrink-0 snap-start overflow-hidden rounded-xl border border-border/20 bg-background/40 will-change-transform [transform:translateZ(0)]"
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
                    alt={lang === "el" ? image.captionEl : image.captionEn}
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
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-2 py-1.5 font-body text-[10px] text-white/90">
                    {lang === "el" ? image.captionEl : image.captionEn}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;

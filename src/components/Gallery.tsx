import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useLang } from "@/context/LangContext";
import { galleryData } from "@/data/gallery";

const Gallery = () => {
  const { lang, t } = useLang();
  const reduceMotion = useReducedMotion();
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const markLoaded = (src: string) => {
    setLoadedImages((prev) => (prev[src] ? prev : { ...prev, [src]: true }));
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
        {galleryData.map((image, index) => {
          const isLoaded = Boolean(loadedImages[image.src]);

          return (
            <motion.div
              key={image.src}
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
                src={image.src}
                alt={lang === "el" ? image.captionEl : image.captionEn}
                className={`h-full w-full object-cover transition-[opacity,transform] duration-500 motion-safe:group-hover:scale-105 motion-safe:group-active:scale-[1.01] [backface-visibility:hidden] [transform:translateZ(0)] ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
                loading={index === 0 ? "eager" : "lazy"}
                decoding={index === 0 ? "sync" : "async"}
                fetchPriority={index === 0 ? "high" : "auto"}
                width={1024}
                height={768}
                onLoad={() => markLoaded(image.src)}
                onError={() => markLoaded(image.src)}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Gallery;

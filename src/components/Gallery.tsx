import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { galleryData } from "@/data/gallery";

const Gallery = () => {
  const { lang, t } = useLang();

  return (
    <section id="gallery" className="px-4 py-12">
      <div className="mb-6 text-center">
        <motion.h2
          className="mb-1 font-display text-2xl font-bold text-primary"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("\u0397 \u0391\u03c4\u03bc\u03cc\u03c3\u03c6\u03b1\u03b9\u03c1\u03ac \u03bc\u03b1\u03c2", "Our Atmosphere")}
        </motion.h2>
        <div className="mx-auto h-0.5 w-12 rounded-full bg-accent/60" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {galleryData.map((image, index) => (
          <motion.div
            key={index}
            className={`group overflow-hidden rounded-2xl ${
              index === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
            }`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
          >
            <img
              src={image.src}
              alt={lang === "el" ? image.captionEl : image.captionEn}
              className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
              loading="lazy"
              width={1024}
              height={768}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;

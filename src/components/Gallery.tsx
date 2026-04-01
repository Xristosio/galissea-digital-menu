import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { galleryData } from "@/data/gallery";

const Gallery = () => {
  const { lang, t } = useLang();

  return (
    <section className="py-12 px-4">
      <div className="text-center mb-6">
        <motion.h2
          className="font-display text-2xl font-bold text-primary mb-1"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("Η Ατμόσφαιρά μας", "Our Atmosphere")}
        </motion.h2>
        <div className="w-12 h-0.5 bg-accent/60 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {galleryData.map((img, i) => (
          <motion.div
            key={i}
            className={`overflow-hidden rounded-2xl ${
              i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
            }`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <img
              src={img.src}
              alt={lang === "el" ? img.captionEl : img.captionEn}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
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

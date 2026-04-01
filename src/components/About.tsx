import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

const About = () => {
  const { t } = useLang();

  return (
    <section id="about" className="px-6 py-12">
      <motion.div
        className="mx-auto max-w-md"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-5 text-center">
          <h2 className="mb-1 font-display text-2xl font-bold text-primary">
            {t("\u0397 \u0395\u03bc\u03c0\u03b5\u03b9\u03c1\u03af\u03b1", "The Experience")}
          </h2>
          <div className="mx-auto h-0.5 w-12 rounded-full bg-accent/60" />
        </div>

        <div className="space-y-4 text-left">
          <p className="font-body text-sm leading-relaxed text-muted-foreground">
            {t(
              "\u03a4\u03bf Galissea \u03b2\u03c1\u03af\u03c3\u03ba\u03b5\u03c4\u03b1\u03b9 \u03b1\u03ba\u03c1\u03b9\u03b2\u03ce\u03c2 \u03c0\u03ac\u03bd\u03c9 \u03b1\u03c0\u03cc \u03c4\u03b7\u03bd \u03c0\u03b1\u03c1\u03b1\u03bb\u03af\u03b1 \u03c4\u03b7\u03c2 \u0393\u03b1\u03bb\u03b7\u03c3\u03c3\u03ac\u03c2 \u03c3\u03c4\u03b7 \u03a3\u03cd\u03c1\u03bf. \u0388\u03bd\u03b1\u03c2 \u03c7\u03ce\u03c1\u03bf\u03c2 \u03c0\u03bf\u03c5 \u03c3\u03c5\u03bd\u03b4\u03c5\u03ac\u03b6\u03b5\u03b9 \u03c4\u03b7 \u03c7\u03b1\u03bb\u03b1\u03c1\u03ae \u03b1\u03c4\u03bc\u03cc\u03c3\u03c6\u03b1\u03b9\u03c1\u03b1 \u03c4\u03b7\u03c2 \u03b8\u03ac\u03bb\u03b1\u03c3\u03c3\u03b1\u03c2 \u03bc\u03b5 \u03b3\u03b5\u03cd\u03c3\u03b5\u03b9\u03c2 \u03c0\u03bf\u03c5 \u03c3\u03b1\u03c2 \u03c4\u03b1\u03be\u03b9\u03b4\u03b5\u03cd\u03bf\u03c5\u03bd.",
              "Galissea sits right above the sandy beach of Galissas in Syros. A place where the relaxed seaside atmosphere meets flavors that take you on a journey."
            )}
          </p>
          <p className="font-body text-sm leading-relaxed text-muted-foreground">
            {t(
              "\u0391\u03c0\u03cc \u03c4\u03bf\u03bd \u03c0\u03c1\u03c9\u03b9\u03bd\u03cc \u03ba\u03b1\u03c6\u03ad \u03bc\u03ad\u03c7\u03c1\u03b9 \u03c4\u03b1 \u03b2\u03c1\u03b1\u03b4\u03b9\u03bd\u03ac \u03ba\u03bf\u03ba\u03c4\u03ad\u03b9\u03bb, \u03c3\u03b1\u03c2 \u03c5\u03c0\u03bf\u03b4\u03b5\u03c7\u03cc\u03bc\u03b1\u03c3\u03c4\u03b5 \u03bc\u03b5 \u03c6\u03c1\u03ad\u03c3\u03ba\u03b1 \u03c5\u03bb\u03b9\u03ba\u03ac, \u03b5\u03c0\u03b9\u03bc\u03b5\u03bb\u03b7\u03bc\u03ad\u03bd\u03b5\u03c2 \u03c3\u03c5\u03bd\u03c4\u03b1\u03b3\u03ad\u03c2 \u03ba\u03b1\u03b9 \u03c4\u03b7 \u03b8\u03ad\u03b1 \u03c4\u03bf\u03c5 \u0391\u03b9\u03b3\u03b1\u03af\u03bf\u03c5.",
              "From morning coffee to evening cocktails, we welcome you with fresh ingredients, curated recipes, and views of the Aegean Sea."
            )}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;

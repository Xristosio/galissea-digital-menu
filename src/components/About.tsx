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
            {t("Η Εμπειρία", "The Experience")}
          </h2>
          <div className="mx-auto h-0.5 w-12 rounded-full bg-accent/60" />
        </div>

        <div className="space-y-4 text-left">
          <p className="font-body text-sm leading-relaxed text-muted-foreground">
            {t(
              "Το Galissea βρίσκεται ακριβώς πάνω από την παραλία της Γαλησσάς στη Σύρο. Ένας χώρος που συνδυάζει τη χαλαρή ατμόσφαιρα της θάλασσας με γεύσεις που σας ταξιδεύουν.",
              "Galissea sits right above the sandy beach of Galissas in Syros. A place where the relaxed seaside atmosphere meets flavors that take you on a journey."
            )}
          </p>
          <p className="font-body text-sm leading-relaxed text-muted-foreground">
            {t(
              "Από τον πρωινό καφέ μέχρι τα βραδινά κοκτέιλ, σας υποδεχόμαστε με φρέσκα υλικά, επιμελημένες συνταγές και τη θέα του Αιγαίου.",
              "From morning coffee to evening cocktails, we welcome you with fresh ingredients, curated recipes, and views of the Aegean Sea."
            )}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;

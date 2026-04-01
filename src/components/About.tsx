import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

const About = () => {
  const { t } = useLang();

  return (
    <section id="about" className="py-12 px-6">
      <motion.div
        className="max-w-md mx-auto text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-display text-2xl font-bold text-primary mb-1">
          {t("Η Εμπειρία", "The Experience")}
        </h2>
        <div className="w-12 h-0.5 bg-accent/60 mx-auto rounded-full mb-5" />

        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
          {t(
            "Το Galissea βρίσκεται ακριβώς πάνω από τη παραλία της Γαλησσάς στη Σύρο. Ένας χώρος που συνδυάζει τη χαλαρή ατμόσφαιρα της θάλασσας με γεύσεις που σας ταξιδεύουν.",
            "Galissea sits right above the sandy beach of Galissas in Syros. A place where the relaxed seaside atmosphere meets flavors that take you on a journey."
          )}
        </p>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          {t(
            "Από τον πρωινό καφέ μέχρι τα βραδινά κοκτέιλ, σας υποδεχόμαστε με φρέσκα υλικά, επιμελημένες συνταγές και τη θέα του Αιγαίου.",
            "From morning coffee to evening cocktails, we welcome you with fresh ingredients, curated recipes, and views of the Aegean Sea."
          )}
        </p>
      </motion.div>
    </section>
  );
};

export default About;

import { motion } from "framer-motion";
import { useLang } from "@/context/lang-context-core";

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
            {t("Μια μέρα στο Galissea", "A Day at Galissea")}
          </h2>
          <div className="mx-auto h-0.5 w-12 rounded-full bg-accent/60" />
        </div>

        <div className="space-y-4 text-left">
          <p className="font-body text-sm leading-relaxed text-muted-foreground">
            {t(
              "Το Galissea βρίσκεται σε προνομιακή θέση πάνω από την παραλία του Γαλησσά, μία από τις πιο αγαπημένες παραλίες της Σύρου. Σε υποδέχεται από νωρίς με καφέ και brunch, συνεχίζει με δροσερές επιλογές και γρήγορα snacks για μετά τη θάλασσα, και ακολουθεί τον χαλαρό ρυθμό των διακοπών με άνετο εξωτερικό χώρο, θέα και φιλική εξυπηρέτηση.",
              "Galissea sits in a privileged spot above Galissas Beach, one of the most loved beaches in Syros. It welcomes you from early morning with coffee and brunch, continues with refreshing choices and quick snacks after the sea, and follows the easy rhythm of island days with comfortable outdoor seating, a view and friendly service.",
            )}
          </p>
          <p className="font-body text-sm leading-relaxed text-muted-foreground">
            {t(
              "Όσο η μέρα προχωρά, τη θέση τους παίρνουν χορταστικές επιλογές, burgers, πίτσες και κρέπες, ενώ το βράδυ η ατμόσφαιρα αλλάζει με cocktails, παγωμένες μπίρες και μουσικές που ταιριάζουν στο κυκλαδίτικο ηλιοβασίλεμα. Ένα all-day στέκι στον Γαλησσά για να μείνεις λίγο ακόμα.",
              "As the day moves on, the menu turns to generous options, burgers, pizzas and crepes, while the evening brings cocktails, ice-cold beers and music that fits the Cycladic sunset. An all-day spot in Galissas made for staying a little longer.",
            )}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;

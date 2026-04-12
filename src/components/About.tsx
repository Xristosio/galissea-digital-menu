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
              "Το Galissea βρίσκεται πάνω από την παραλία του Γαλησσά στη Σύρο και συνδυάζει την ανεπιτήδευτη αίσθηση του νησιού με all-day γεύσεις για καφέ, brunch, snack και ποτό.",
              "Galissea sits right above Galissas Beach in Syros, pairing the laid-back island atmosphere with all-day flavors for coffee, brunch, snacks and drinks.",
            )}
          </p>
          <p className="font-body text-sm leading-relaxed text-muted-foreground">
            {t(
              "Από τον πρώτο καφέ της ημέρας μέχρι τα cocktails στο ηλιοβασίλεμα, σας καλωσορίζουμε με προσεγμένο μενού, χαλαρό ρυθμό και θέα που ανήκει απόλυτα στο καλοκαίρι των Κυκλάδων.",
              "From the first coffee of the day to sunset cocktails, we welcome you with a carefully curated menu, easygoing rhythm, and views that feel unmistakably Cycladic.",
            )}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;

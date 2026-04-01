import { useLang } from "@/context/LangContext";

const About = () => {
  const { t } = useLang();

  return (
    <section id="about" className="px-6 py-12 md:py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="w-10 h-px bg-accent mx-auto mb-6" />
        <h2 className="font-display text-2xl font-semibold text-primary mb-4">
          {t("Η Εμπειρία", "The Experience")}
        </h2>
        <p className="font-body text-muted-foreground text-[15px] leading-relaxed mb-4">
          {t(
            "Το Galissea βρίσκεται ακριβώς πάνω από την παραλία της Γαλησσάς στη Σύρο. Ένα σύγχρονο beach cafe-snack-bar, όπου η χαλαρή ατμόσφαιρα συναντά τη φιλοξενία και τη θέα στο Αιγαίο.",
            "Galissea sits right above Galissas beach in Syros. A contemporary beach cafe-snack-bar where relaxed vibes meet warm hospitality and Aegean sea views."
          )}
        </p>
        <p className="font-body text-muted-foreground text-[15px] leading-relaxed">
          {t(
            "Από τον πρωινό καφέ μέχρι το βραδινό κοκτέιλ, σας περιμένουμε να απολαύσετε κάθε στιγμή του καλοκαιριού.",
            "From morning coffee to evening cocktails, we're here for every moment of your summer."
          )}
        </p>
        <div className="w-8 h-px bg-border mx-auto mt-8" />
      </div>
    </section>
  );
};

export default About;

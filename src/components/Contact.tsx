import { useLang } from "@/context/LangContext";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react";

const Contact = () => {
  const { t } = useLang();

  return (
    <section id="contact" className="px-6 py-12 md:py-16 bg-card/50">
      <div className="max-w-md mx-auto text-center">
        <h2 className="font-display text-2xl font-semibold text-primary mb-6">
          {t("Επικοινωνία", "Contact")}
        </h2>

        <div className="space-y-4 text-sm font-body">
          <div className="flex items-center justify-center gap-2 text-foreground">
            <MapPin size={16} className="text-accent flex-shrink-0" />
            <span>Galissas, Syros, Greece</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-foreground">
            <Clock size={16} className="text-accent flex-shrink-0" />
            <span>09:00 – 22:00</span>
          </div>

          <a
            href="tel:+302281045686"
            className="flex items-center justify-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <Phone size={16} className="text-accent flex-shrink-0" />
            <span>+30 22810 45686</span>
          </a>

          <a
            href="mailto:galissea.bar@gmail.com"
            className="flex items-center justify-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <Mail size={16} className="text-accent flex-shrink-0" />
            <span>galissea.bar@gmail.com</span>
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <a
            href="https://www.instagram.com/galissea_bar/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Instagram size={16} />
            Instagram
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-muted text-foreground rounded-full text-sm font-medium hover:bg-muted/80 transition-colors"
          >
            <Facebook size={16} />
            Facebook
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;

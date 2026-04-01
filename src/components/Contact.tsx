import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import { useLang } from "@/context/LangContext";

const Contact = () => {
  const { t } = useLang();

  const items = [
    {
      icon: <MapPin size={18} />,
      label: "Galissas, Syros",
      href: "https://maps.google.com/?q=Galissas+Syros",
    },
    {
      icon: <Clock size={18} />,
      label: "09:00 – 22:00",
    },
    {
      icon: <Phone size={18} />,
      label: "+30 22810 45686",
      href: "tel:+302281045686",
    },
    {
      icon: <Mail size={18} />,
      label: "galissea.bar@gmail.com",
      href: "mailto:galissea.bar@gmail.com",
    },
  ];

  return (
    <section id="contact" className="py-12 px-6">
      <motion.div
        className="max-w-md mx-auto"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <h2 className="font-display text-2xl font-bold text-primary mb-1">
            {t("Επικοινωνία", "Contact")}
          </h2>
          <div className="w-12 h-0.5 bg-accent/60 mx-auto rounded-full" />
        </div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const inner = (
              <div className="flex items-center gap-3 bg-card/60 rounded-xl px-4 py-3.5 transition-colors hover:bg-card">
                <span className="text-accent">{item.icon}</span>
                <span className="font-body text-sm text-foreground">
                  {item.label}
                </span>
              </div>
            );
            return item.href ? (
              <a key={i} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              <div key={i}>{inner}</div>
            );
          })}
        </div>

        {/* Social */}
        <div className="flex justify-center gap-4 mt-6">
          <a
            href="https://www.instagram.com/galissea_bar/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-card/60 rounded-full text-accent hover:text-primary hover:bg-card transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href="#"
            className="p-3 bg-card/60 rounded-full text-accent hover:text-primary hover:bg-card transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;

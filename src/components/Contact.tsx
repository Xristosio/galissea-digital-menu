import { motion } from "framer-motion";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { resolveMapsConfig } from "@/config/maps";

const Contact = () => {
  const { t } = useLang();
  const { openUrl } = resolveMapsConfig();

  const items = [
    {
      icon: <MapPin size={18} />,
      label: t(
        "\u0393\u03b1\u03bb\u03b7\u03c3\u03c3\u03ac\u03c2, \u03a3\u03cd\u03c1\u03bf\u03c2",
        "Galissas, Syros",
      ),
      href: openUrl,
      external: true,
    },
    {
      icon: <Clock size={18} />,
      label: t(
        "\u039a\u03b1\u03b8\u03b7\u03bc\u03b5\u03c1\u03b9\u03bd\u03ac 09:00 - 22:00",
        "Daily 09:00 - 22:00",
      ),
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

  const quickActions = [
    {
      href: "https://www.instagram.com/galissea_bar/",
      icon: <Instagram size={20} />,
      label: "Instagram",
      external: true,
    },
    {
      href: "https://www.facebook.com/galissea.bar/",
      icon: <Facebook size={20} />,
      label: "Facebook",
      external: true,
    },
    {
      href: "tel:+302281045686",
      icon: <Phone size={20} />,
      label: t("\u039a\u03bb\u03ae\u03c3\u03b7", "Call"),
    },
    {
      href: "mailto:galissea.bar@gmail.com",
      icon: <Mail size={20} />,
      label: t("\u0395\u03bc\u03b1\u03b9\u03bb", "Email"),
    },
  ];

  return (
    <section id="contact" className="px-6 py-12">
      <motion.div
        className="mx-auto max-w-md"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 text-center">
          <h2 className="mb-1 font-display text-2xl font-bold text-primary">
            {t(
              "\u0395\u03c0\u03b9\u03ba\u03bf\u03b9\u03bd\u03c9\u03bd\u03af\u03b1",
              "Contact",
            )}
          </h2>
          <div className="mx-auto h-0.5 w-12 rounded-full bg-accent/60" />
        </div>

        <div className="space-y-3">
          {items.map((item, index) => {
            const card = (
              <div className="flex min-h-12 items-center gap-3 rounded-xl bg-card/60 px-4 py-3.5 transition-colors hover:bg-card">
                <span className="text-accent">{item.icon}</span>
                <span className="font-body text-sm text-foreground">
                  {item.label}
                </span>
              </div>
            );

            if (!item.href) {
              return <div key={index}>{card}</div>;
            }

            return (
              <a
                key={index}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                {card}
              </a>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center gap-3">
          {quickActions.map((action) => (
            <a
              key={action.href}
              href={action.href}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noopener noreferrer" : undefined}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-card/60 text-accent transition-colors hover:bg-card hover:text-primary"
              aria-label={action.label}
              title={action.label}
            >
              {action.icon}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;

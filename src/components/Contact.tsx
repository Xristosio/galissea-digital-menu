import { motion } from "framer-motion";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { resolveMapsConfig } from "@/config/maps";
import { SOCIAL_LINKS } from "@/config/site";

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

  const socialLinks = [
    {
      href: SOCIAL_LINKS.instagram,
      icon: <Instagram size={18} />,
      label: "Instagram",
    },
    {
      href: SOCIAL_LINKS.facebook,
      icon: <Facebook size={18} />,
      label: "Facebook",
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

        <div className="mt-6 rounded-2xl border border-border/40 bg-card/45 p-4">
          <h3 className="font-display text-lg font-semibold text-primary">
            {t(
              "\u039a\u03bf\u03b9\u03bd\u03c9\u03bd\u03b9\u03ba\u03ac \u0394\u03af\u03ba\u03c4\u03c5\u03b1",
              "Social Media",
            )}
          </h3>
          <p className="mt-1 font-body text-xs leading-relaxed text-muted-foreground">
            {t(
              "\u0391\u03ba\u03bf\u03bb\u03bf\u03c5\u03b8\u03ae\u03c3\u03c4\u03b5 \u03bc\u03b1\u03c2 \u03b3\u03b9\u03b1 \u03c3\u03c4\u03b9\u03b3\u03bc\u03ad\u03c2 \u03b1\u03c0\u03cc \u03c4\u03b7\u03bd \u03c0\u03b1\u03c1\u03b1\u03bb\u03af\u03b1 \u03c4\u03b7\u03c2 \u0393\u03b1\u03bb\u03b7\u03c3\u03c3\u03ac.",
              "Follow us on.",
            )}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {socialLinks.map((action) => (
              <a
                key={action.href}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-background/75 px-3 py-2.5 font-body text-sm font-medium text-foreground transition-colors hover:bg-background"
                aria-label={action.label}
                title={action.label}
              >
                <span className="text-accent">{action.icon}</span>
                <span>{action.label}</span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;

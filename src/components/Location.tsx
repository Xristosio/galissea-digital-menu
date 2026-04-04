import { motion } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { resolveMapsConfig } from "@/config/maps";

const Location = () => {
  const { t } = useLang();
  const { embedUrl, openUrl, missingConfig } = resolveMapsConfig();

  return (
    <section id="location" className="px-6 py-12">
      <motion.div
        className="mx-auto max-w-md"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 text-center">
          <h2 className="mb-1 font-display text-2xl font-bold text-primary">
            {t("Πού θα μας βρείτε", "Find Us")}
          </h2>
          <div className="mx-auto h-0.5 w-12 rounded-full bg-accent/60" />
          <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
            {t(
              "Ανακαλύψτε το Galissea στην παραλία του Γαλησσά, στη Σύρο.",
              "Find Galissea by the beach in Galissas, Syros.",
            )}
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border/40 bg-card/45 shadow-sm">
          {embedUrl ? (
            <div className="relative aspect-[16/11] w-full bg-muted/40">
              <iframe
                src={embedUrl}
                title={t("Χάρτης τοποθεσίας Galissea", "Galissea location map")}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex aspect-[16/11] w-full items-center justify-center bg-muted/30 px-6 text-center">
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {missingConfig
                  ? t(
                      "Λείπουν ρυθμίσεις του Google Maps. Χρησιμοποιήστε το παρακάτω link για πλοήγηση.",
                      "Google Maps configuration is incomplete. Use the link below for directions.",
                    )
                  : t(
                      "Ο χάρτης δεν είναι διαθέσιμος προς το παρόν.",
                      "Map preview is currently unavailable.",
                    )}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 px-4 py-3.5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} className="text-accent" />
              <span className="font-body">
                {t("Γαλησσάς, Σύρος", "Galissas, Syros")}
              </span>
            </div>
            <a
              href={openUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 font-body text-xs font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {t("Άνοιγμα στο Google Maps", "Open in Google Maps")}
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Location;

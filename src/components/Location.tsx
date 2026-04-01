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
            {t("\u03a0\u03bf\u03cd \u03b8\u03b1 \u03bc\u03b1\u03c2 \u03b2\u03c1\u03b5\u03af\u03c4\u03b5", "Find Us")}
          </h2>
          <div className="mx-auto h-0.5 w-12 rounded-full bg-accent/60" />
          <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
            {t(
              "\u0391\u03bd\u03b1\u03ba\u03b1\u03bb\u03cd\u03c8\u03c4\u03b5 \u03c4\u03bf Galissea \u03c3\u03c4\u03b7\u03bd \u03c0\u03b1\u03c1\u03b1\u03bb\u03af\u03b1 \u0393\u03b1\u03bb\u03b7\u03c3\u03c3\u03ac, \u03c3\u03c4\u03b7 \u03a3\u03cd\u03c1\u03bf.",
              "Find Galissea by the beach in Galissas, Syros."
            )}
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border/40 bg-card/45 shadow-sm">
          {embedUrl ? (
            <div className="relative aspect-[16/11] w-full bg-muted/40">
              <iframe
                src={embedUrl}
                title={t("\u03a7\u03ac\u03c1\u03c4\u03b7\u03c2 \u03c4\u03bf\u03c0\u03bf\u03b8\u03b5\u03c3\u03af\u03b1\u03c2 Galissea", "Galissea location map")}
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
                      "\u039b\u03b5\u03af\u03c0\u03bf\u03c5\u03bd \u03c1\u03c5\u03b8\u03bc\u03af\u03c3\u03b5\u03b9\u03c2 \u03c4\u03bf\u03c5 Google Maps. \u03a7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03b9\u03ae\u03c3\u03c4\u03b5 \u03c4\u03bf \u03c0\u03b1\u03c1\u03b1\u03ba\u03ac\u03c4\u03c9 link \u03b3\u03b9\u03b1 \u03c0\u03bb\u03bf\u03ae\u03b3\u03b7\u03c3\u03b7.",
                      "Google Maps configuration is incomplete. Use the link below for directions."
                    )
                  : t(
                      "\u039f \u03c7\u03ac\u03c1\u03c4\u03b7\u03c2 \u03b4\u03b5\u03bd \u03b5\u03af\u03bd\u03b1\u03b9 \u03b4\u03b9\u03b1\u03b8\u03ad\u03c3\u03b9\u03bc\u03bf\u03c2 \u03c0\u03c1\u03bf\u03c2 \u03c4\u03bf \u03c0\u03b1\u03c1\u03cc\u03bd.",
                      "Map preview is currently unavailable."
                    )}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 px-4 py-3.5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} className="text-accent" />
              <span className="font-body">
                {t("\u0393\u03b1\u03bb\u03b7\u03c3\u03c3\u03ac\u03c2, \u03a3\u03cd\u03c1\u03bf\u03c2", "Galissas, Syros")}
              </span>
            </div>
            <a
              href={openUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 font-body text-xs font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {t("\u0386\u03bd\u03bf\u03b9\u03b3\u03bc\u03b1 \u03c3\u03c4\u03bf Google Maps", "Open in Google Maps")}
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Location;

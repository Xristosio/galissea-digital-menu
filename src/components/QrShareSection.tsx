import { motion } from "framer-motion";
import { QrCode, Share2 } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/context/LangContext";
import { MENU_QR_IMAGE_PATH } from "@/config/site";

const QrShareSection = () => {
  const { t } = useLang();
  const [qrFailed, setQrFailed] = useState(false);

  return (
    <section id="share-menu" className="px-6 py-10">
      <motion.div
        className="mx-auto max-w-md"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <div className="mb-5 text-center">
          <h2 className="mb-1 font-display text-2xl font-bold text-primary">
            {t("Θες να το μοιραστείς;", "Want to share?")}
          </h2>
          <div className="mx-auto h-0.5 w-12 rounded-full bg-accent/60" />
          <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
            {t(
              "Δείξε το QR στην παρέα για γρήγορη πρόσβαση στο μενού.",
              "Show this QR to friends nearby for instant menu access.",
            )}
          </p>
        </div>

        <div className="mx-auto w-full max-w-[230px] rounded-2xl bg-white p-3 shadow-sm">
          {qrFailed ? (
            <div className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/70 bg-muted/30 px-4 text-center">
              <QrCode size={28} className="text-accent" />
              <p className="font-body text-xs leading-relaxed text-muted-foreground">
                {t(
                  "Προσθέστε το αρχείο /public/menu-qr.png",
                  "Add /public/menu-qr.png",
                )}
              </p>
            </div>
          ) : (
            <img
              src={MENU_QR_IMAGE_PATH}
              alt={t(
                "QR κωδικός για άμεσο άνοιγμα του καταλόγου Galissea",
                "QR code for instantly opening the Galissea menu",
              )}
              width={1024}
              height={1024}
              loading="lazy"
              decoding="async"
              onError={() => setQrFailed(true)}
              className="h-auto w-full rounded-xl"
            />
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default QrShareSection;

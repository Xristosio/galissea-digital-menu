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
            {t(
              "\u039c\u03bf\u03b9\u03c1\u03ac\u03c3\u03bf\u03c5 \u03c4\u03bf\u03bd \u039a\u03b1\u03c4\u03ac\u03bb\u03bf\u03b3\u03bf",
              "Want to share?",
            )}
          </h2>
          <div className="mx-auto h-0.5 w-12 rounded-full bg-accent/60" />
          <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
            {t(
              "\u0395\u03ac\u03bd \u03b5\u03af\u03c3\u03b1\u03b9 \u03ae\u03b4\u03b7 \u03c3\u03c4\u03bf\u03bd \u03be\u03b1\u03c0\u03bb\u03ce\u03c3\u03c4\u03c1\u03b1, \u03b4\u03b5\u03af\u03be\u03b5 \u03c4\u03bf QR \u03c3\u03b5 \u03c0\u03b1\u03c1\u03ad\u03b1 \u03b3\u03b9\u03b1 \u03b3\u03c1\u03ae\u03b3\u03bf\u03c1\u03b7 \u03c0\u03c1\u03cc\u03c3\u03b2\u03b1\u03c3\u03b7 \u03c3\u03c4\u03bf menu.",
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
                  "\u03a0\u03c1\u03bf\u03c3\u03b8\u03ad\u03c3\u03c4\u03b5 \u03c4\u03bf \u03b1\u03c1\u03c7\u03b5\u03af\u03bf /public/menu-qr.png",
                  "Add /public/menu-qr.png",
                )}
              </p>
            </div>
          ) : (
            <img
              src={MENU_QR_IMAGE_PATH}
              alt={t(
                "QR \u03ba\u03c9\u03b4\u03b9\u03ba\u03cc\u03c2 \u03b3\u03b9\u03b1 \u03ac\u03bc\u03b5\u03c3\u03bf \u03ac\u03bd\u03bf\u03b9\u03b3\u03bc\u03b1 \u03c4\u03bf\u03c5 \u03ba\u03b1\u03c4\u03b1\u03bb\u03cc\u03b3\u03bf\u03c5 Galissea",
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

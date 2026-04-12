import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { cn } from "@/lib/utils";
import { resolveMapsConfig } from "@/config/maps";

const MAX_STARS = 5;

const Reviews = () => {
  const { t } = useLang();
  const { reviewsUrl, writeReviewUrl, ratingValue, ratingCount } = resolveMapsConfig();
  const numericRating = Number.parseFloat(ratingValue ?? "0");
  const safeRating = Number.isFinite(numericRating)
    ? Math.max(0, Math.min(MAX_STARS, numericRating))
    : 0;
  const filledStars = Math.floor(safeRating);
  const partialStar = safeRating - filledStars;

  return (
    <section id="reviews" className="px-6 pb-12">
      <motion.div
        className="mx-auto max-w-md"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-3xl border border-border/40 bg-card/50 p-5 shadow-sm">
          <div className="text-center">
            <p className="font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Google
            </p>
            <h2 className="mt-1 font-display text-xl font-semibold text-primary">
              {t("Πολύ καλές αξιολογήσεις", "Highly rated")}
            </h2>
          </div>

          <div className="mt-5 rounded-2xl bg-background/70 px-4 py-5 text-center">
            <div className="flex items-end justify-center gap-2">
              <p className="font-display text-5xl font-bold leading-none text-foreground">
                {ratingValue ?? "4.7"}
              </p>
              <p className="pb-1.5 font-body text-sm text-muted-foreground">
                / 5
              </p>
            </div>

            <div className="mt-3 flex items-center justify-center gap-1 text-accent">
              {Array.from({ length: MAX_STARS }).map((_, starIndex) => {
                const isFilled = starIndex < filledStars;
                const isPartial = starIndex === filledStars && partialStar > 0;

                return (
                  <span key={starIndex} className="relative inline-flex h-4 w-4">
                    <Star
                      size={16}
                      className="absolute inset-0 text-accent/25"
                    />
                    {(isFilled || isPartial) ? (
                      <span
                        className="absolute inset-0 overflow-hidden"
                        style={{
                          width: isFilled ? "100%" : `${Math.round(partialStar * 100)}%`,
                        }}
                      >
                        <Star
                          size={16}
                          className={cn("fill-current text-accent")}
                        />
                      </span>
                    ) : null}
                  </span>
                );
              })}
            </div>

            <div className="mt-3 space-y-1">
              <p className="font-body text-sm font-medium text-foreground">
                {t("Βαθμολογία Google", "Google rating")}
              </p>
              {ratingCount ? (
                <p className="font-body text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {t(`${ratingCount} αξιολογήσεις`, `${ratingCount} reviews`)}
                </p>
              ) : null}
            </div>
          </div>

          <p className="mt-4 text-center font-body text-sm leading-relaxed text-muted-foreground">
            {t(
              "Η βαθμολογία μας στο Google αντικατοπτρίζει την εμπειρία των επισκεπτών μας. Αν πέρασες όμορφα, μπορείς να μας αφήσεις κι εσύ την αξιολόγησή σου.",
              "Our Google rating reflects our guests' experience. If you enjoyed your visit, you can leave your review as well.",
            )}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-center font-body text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("Προβολή στο Google", "View on Google")}
              <ExternalLink size={14} />
            </a>
            <a
              href={writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-muted px-4 py-2 text-center font-body text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {t("Αξιολογήστε", "Leave a review")}
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Reviews;

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "@/context/LangContext";

const SHOW_AFTER_PX = 420;

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const reduceMotion = useReducedMotion();
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > SHOW_AFTER_PX);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={handleBackToTop}
          aria-label={t("\u0395\u03c0\u03b9\u03c3\u03c4\u03c1\u03bf\u03c6\u03ae \u03c3\u03c4\u03b7\u03bd \u03ba\u03bf\u03c1\u03c5\u03c6\u03ae", "Back to top")}
          title={t("\u0395\u03c0\u03b9\u03c3\u03c4\u03c1\u03bf\u03c6\u03ae \u03c3\u03c4\u03b7\u03bd \u03ba\u03bf\u03c1\u03c5\u03c6\u03ae", "Back to top")}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 }}
          transition={{ duration: reduceMotion ? 0.12 : 0.24, ease: "easeOut" }}
          className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/90 text-primary shadow-lg backdrop-blur-md transition-colors hover:bg-card"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;

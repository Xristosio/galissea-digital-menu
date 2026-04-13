import {
  BUSINESS_ADDRESS,
  BUSINESS_EMAIL,
  BUSINESS_EMAIL_URI,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_URI,
} from "@/config/business";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FOOTER_FAQ_ITEMS } from "@/data/footerFaq";
import { useLang } from "@/context/LangContext";

const Footer = () => {
  const { lang, t } = useLang();
  const sectionLinks = [
    { href: "#menu", label: t("Μενού", "Menu") },
    { href: "#about", label: t("Εμπειρία", "Experience") },
    { href: "#gallery", label: "Gallery" },
    { href: "#location", label: t("Τοποθεσία", "Location") },
    { href: "#contact", label: t("Επικοινωνία", "Contact") },
  ];
  const faqItems = FOOTER_FAQ_ITEMS.map((item) => ({
    id: item.id,
    question: item.question[lang],
    answer: item.answer[lang],
  }));

  return (
    <footer className="border-t border-border/30 bg-card/30 px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-8 text-center">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center gap-2">
          <span className="font-display text-base font-semibold text-primary/80">
            Galissea
          </span>
          <span className="font-body text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Cafe · Snack · Bar
          </span>
        </div>

        <Accordion type="single" collapsible className="mt-5">
          <AccordionItem value="footer-faq" className="border-b-0">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              {sectionLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}

              <AccordionTrigger className="w-auto flex-none py-0 font-body text-[11px] font-normal text-muted-foreground transition-colors hover:text-foreground hover:no-underline [&>svg]:h-3.5 [&>svg]:w-3.5">
                {t("FAQ", "FAQ")}
              </AccordionTrigger>
            </div>

            <AccordionContent className="pt-3">
              <div className="mx-auto w-full max-w-xl border-t border-border/20 pt-3 text-left">
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item) => (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className="border-border/20 last:border-b-0"
                    >
                      <AccordionTrigger className="py-2.5 text-left font-body text-xs font-medium text-foreground hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-3 pt-0 font-body text-[11px] leading-relaxed text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <p className="mt-4 font-body text-[11px] leading-relaxed text-muted-foreground">
          {lang === "el" ? BUSINESS_ADDRESS.displayEl : BUSINESS_ADDRESS.displayEn}
        </p>
        <p className="mt-1 font-body text-[11px] text-muted-foreground">
          <a href={BUSINESS_PHONE_URI} className="transition-colors hover:text-foreground">
            {BUSINESS_PHONE_DISPLAY}
          </a>{" "}
          Β·{" "}
          <a href={BUSINESS_EMAIL_URI} className="transition-colors hover:text-foreground">
            {BUSINESS_EMAIL}
          </a>
        </p>
        <p className="mt-4 font-body text-[11px] text-muted-foreground/70">
          {t(
            `© ${new Date().getFullYear()} Galissea`,
            `© ${new Date().getFullYear()} Galissea`,
          )}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

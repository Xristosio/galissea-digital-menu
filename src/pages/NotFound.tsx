import {
  LangProvider,
  useLang,
} from "@/context/LangContext";
import { getLocalePath } from "@/i18n/routing";
import type { Lang } from "@/i18n/types";

const NotFoundContent = () => {
  const { lang, t } = useLang();

  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center bg-muted px-6"
    >
      <div className="max-w-md text-center">
        <p className="font-body text-xs uppercase tracking-[0.28em] text-accent">
          Galissea
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-primary">
          404
        </h1>
        <p className="mt-4 font-body text-lg text-foreground">
          {t("Η σελίδα δεν βρέθηκε", "Page not found")}
        </p>
        <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
          {t(
            "Ο σύνδεσμος που ακολουθήσατε δεν είναι διαθέσιμος. Επιστρέψτε στην αρχική σελίδα του Galissea για το μενού, την τοποθεσία και τα στοιχεία επικοινωνίας.",
            "The link you followed is unavailable. Return to the Galissea homepage for the menu, location and contact details.",
          )}
        </p>
        <a
          href={getLocalePath(lang)}
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 font-body text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {t("Επιστροφή στην αρχική", "Return to homepage")}
        </a>
      </div>
    </main>
  );
};

const NotFound = ({ initialLang }: { initialLang: Lang }) => (
  <LangProvider initialLang={initialLang}>
    <NotFoundContent />
  </LangProvider>
);

export default NotFound;

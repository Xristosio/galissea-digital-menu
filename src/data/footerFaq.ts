import type { Lang } from "@/i18n/types";

type LocalizedValue = Record<Lang, string>;

export type FooterFaqItem = {
  id: string;
  question: LocalizedValue;
  answer: LocalizedValue;
};

const CONTACT_FALLBACK: LocalizedValue = {
  el: "Για τις πιο πρόσφατες πληροφορίες, επικοινωνήστε μαζί μας πριν την επίσκεψή σας.",
  en: "For the latest information, please contact us before your visit.",
};

export const FOOTER_FAQ_ITEMS: FooterFaqItem[] = [
  {
    id: "parking",
    question: {
      el: "Parking",
      en: "Parking",
    },
    answer: {
      el: "Οι διαθέσιμες επιλογές στάθμευσης στην περιοχή μπορεί να διαφέρουν. Για την πιο πρακτική πρόσβαση, επικοινωνήστε μαζί μας πριν έρθετε.",
      en: "Parking options nearby may vary. For the easiest access, please contact us before your visit.",
    },
  },
  {
    id: "reservations",
    question: {
      el: "Κρατήσεις",
      en: "Reservations",
    },
    answer: {
      el: "Παρακαλούμε επικοινωνήστε μαζί μας απευθείας για να επιβεβαιώσετε αν είναι διαθέσιμες κρατήσεις.",
      en: "Please contact us directly to confirm whether reservations are available.",
    },
  },
  {
    id: "vegan-options",
    question: {
      el: "Vegan επιλογές",
      en: "Vegan options",
    },
    answer: {
      el: "Οι διαθέσιμες vegan επιλογές μπορεί να αλλάζουν ανάλογα με το μενού. Ρωτήστε την ομάδα μας για τις τρέχουσες επιλογές.",
      en: "Vegan-friendly choices may change with the menu. Ask our team about the current options.",
    },
  },
  {
    id: "pets-allowed",
    question: {
      el: "Κατοικίδια",
      en: "Pets allowed",
    },
    answer: CONTACT_FALLBACK,
  },
  {
    id: "sea-view",
    question: {
      el: "Θέα στη θάλασσα",
      en: "Sea view",
    },
    answer: {
      el: "Το Galissea βρίσκεται στον Γαλησσά της Σύρου, δίπλα στη θάλασσα. Για τη διαθεσιμότητα θέσεων με τη θέα που προτιμάτε, επικοινωνήστε μαζί μας.",
      en: "Galissea is in Galissas, Syros, right by the sea. For seating availability with your preferred view, please contact us.",
    },
  },
  {
    id: "take-away",
    question: {
      el: "Take-away",
      en: "Take-away",
    },
    answer: {
      el: "Παρακαλούμε επικοινωνήστε μαζί μας για να επιβεβαιώσετε τη διαθεσιμότητα take-away για ό,τι θέλετε να παραγγείλετε.",
      en: "Please contact us to confirm take-away availability for the items you would like to order.",
    },
  },
  {
    id: "breakfast-hours",
    question: {
      el: "Ώρες πρωινού",
      en: "Breakfast kitchen hours",
    },
    answer: {
      el: "Οι ώρες της κουζίνας για το πρωινό μπορεί να διαφέρουν ανάλογα με την ημέρα και την περίοδο. Επικοινωνήστε μαζί μας για το τρέχον ωράριο.",
      en: "Breakfast kitchen hours may vary by day and season. Please contact us for the current schedule.",
    },
  },
];

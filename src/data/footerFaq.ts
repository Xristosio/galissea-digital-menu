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
      el: "Πάρκινγκ",
      en: "Parking",
    },
    answer: {
      el: "Ακριβώς απέναντι από το Galissea υπάρχει άπλετος δημόσιος χώρος στάθμευσης.",
      en: "There is a public parking lot right next to Galissea.",
    },
  },
  {
    id: "reservations",
    question: {
      el: "Κρατήσεις",
      en: "Reservations",
    },
    answer: {
      el: "Παρακαλούμε επικοινωνήστε μαζί μας απευθείας στο τηλέφωνο 2281045686 για να σας κάνουμε κράτηση.",
      en: "Please contact us directly at 2281045686 to make a reservation.",
    },
  },
  {
    id: "vegan-options",
    question: {
      el: "Vegan επιλογές",
      en: "Vegan options",
    },
    answer: {
      el: "Υπάρχουν διαθέσιμες vegan επιλογές και μπορείτε να τις δείτε στις επιλογές με το χαρακτηριστικό σύμβολο στο μενού μας.",
      en: "Vegan-friendly choices are available and can be identified by the corresponding badge on our menu.",
    },
  },
  {
    id: "pets-allowed",
    question: {
      el: "Κατοικίδια",
      en: "Pets allowed",
    },
    answer: {
      el: "Τα κατοικίδια είναι ευπρόσδεκτα στο Galissea.",
      en: "Pets are welcome at Galissea.",
    },
  },
  {
    id: "take-away",
    question: {
      el: "Take-away",
      en: "Take-away",
    },
    answer: {
      el: "Το take-away είναι διαθέσιμο για ορισμένα είδη, αλλά παρακαλούμε επικοινωνήστε μαζί μας για να επιβεβαιώσετε τη διαθεσιμότητα για τα είδη που θα θέλατε να παραγγείλετε.",
      en: "Take-away is available for certain items, but please contact us to confirm availability for the items you would like to order.",
    },
  },
  {
    id: "breakfast-hours",
    question: {
      el: "Ώρες πρωινού",
      en: "Breakfast kitchen hours",
    },
    answer: {
      el: "Οι ώρες της κουζίνας για το πρωινό είναι μέχρι τη 13:00 το μεσημέρι.",
      en: "Breakfast kitchen hours are until 13:00.",
    },
  },
];

import coffeeImg from "@/assets/menu/coffee.webp";
import cocktailsImg from "@/assets/menu/cocktails.webp";
import breakfastImg from "@/assets/menu/breakfast.webp";
import snacksImg from "@/assets/menu/snacks.webp";
import sandwichesImg from "@/assets/menu/sandwiches.webp";
import crepesImg from "@/assets/menu/crepes.webp";
import dessertsImg from "@/assets/menu/desserts.webp";
import softdrinksImg from "@/assets/menu/softdrinks.webp";

export interface MenuItem {
  nameEl: string;
  nameEn: string;
  descEl?: string;
  descEn?: string;
  price: string;
  marker?: "*" | "**";
  extraEl?: string;
  extraEn?: string;
  badges?: MenuItemBadge[];
}

export interface MenuSegment {
  id: string;
  titleEl: string;
  titleEn: string;
  items: MenuItem[];
  display?: "items" | "options";
  optionGroupEl?: string;
  optionGroupEn?: string;
}

export interface MenuCategory {
  id: string;
  nameEl: string;
  nameEn: string;
  image: string;
  serviceHours?: MenuServiceHours;
  optionBuilder?: MenuOptionBuilder;
  items?: MenuItem[];
  segments?: MenuSegment[];
  // Optional category-level product notes shown before general notes.
  footnotes?: MenuFootnote[];
}

export interface MenuOptionBuilder {
  baseNameEl: string;
  baseNameEn: string;
  basePrice: string;
  countLabel?: number;
  helperEl: string;
  helperEn: string;
}

export interface MenuServiceHours {
  textEl: string;
  textEn: string;
  compactEl?: string;
  compactEn?: string;
}

export interface MenuFootnote {
  marker?: "*" | "**";
  textEl: string;
  textEn: string;
}

export type MenuItemBadge = "bestSeller" | "vegan" | "vegetarian" | "new";

type MenuMarker = NonNullable<MenuItem["marker"]>;

export const getCategorySegments = (category: MenuCategory): MenuSegment[] => {
  if (category.segments?.length) {
    return category.segments;
  }

  if (category.items?.length) {
    return [
      {
        id: `${category.id}-items`,
        titleEl: "",
        titleEn: "",
        items: category.items,
      },
    ];
  }

  return [];
};

export const getCategoryItemsCount = (category: MenuCategory) =>
  category.optionBuilder?.countLabel ??
  getCategorySegments(category).reduce(
    (total, segment) => total + segment.items.length,
    0,
  );

const markerOrder: MenuMarker[] = ["*", "**"];

export const sharedProductFootnotesByMarker: Record<MenuMarker, MenuFootnote> =
  {
    "*": {
      marker: "*",
      textEl: "Συνοδεύεται με πατατάκια",
      textEn: "Served with chips",
    },
    "**": {
      marker: "**",
      textEl: "Συνοδεύεται με πατάτες",
      textEn: "Served with french fries",
    },
  };

export const sharedGeneralMenuNotes: MenuFootnote[] = [
  {
    textEl:
      "Παρακαλούμε ενημερώστε το προσωπικό για τυχόν αλλεργίες ή δυσανεξίες.",
    textEn: "Please inform the staff, if any allergies or intolerances.",
  },
  {
    textEl:
      "Ο καταναλωτής δεν έχει υποχρέωση να πληρώσει εαν δεν λάβει το νόμιμο παραστατικό στοιχείο (απόδειξη-τιμολόγιο).",
    textEn:
      "The consumer is not obliged to pay, if the notice of payment is not received (receipt-invoice).",
  },
  {
    textEl:
      "Στις τιμές υπολογίζονται δημοτικά τέλη και μπορεί να υπάρξουν αλλαγές χωρίς προειδοποίηση.",
    textEn:
      "Municipal taxes are included in the prices, and changes may occur without prior notice.",
  },
];

const getCategoryMarkers = (category: MenuCategory): MenuMarker[] => {
  const markers = new Set<MenuMarker>();

  for (const segment of getCategorySegments(category)) {
    for (const item of segment.items) {
      if (!item.marker) continue;
      markers.add(item.marker);
    }
  }

  return markerOrder.filter((marker) => markers.has(marker));
};

export const getCategoryProductFootnotes = (
  category: MenuCategory,
): MenuFootnote[] => {
  const markerOverrides = new Map<MenuMarker, MenuFootnote>();
  const extraCategoryNotes: MenuFootnote[] = [];

  for (const footnote of category.footnotes ?? []) {
    if (footnote.marker) {
      markerOverrides.set(footnote.marker, footnote);
      continue;
    }

    extraCategoryNotes.push(footnote);
  }

  const markerNotes = getCategoryMarkers(category).map(
    (marker) =>
      markerOverrides.get(marker) ?? sharedProductFootnotesByMarker[marker],
  );

  return [...markerNotes, ...extraCategoryNotes];
};

export const getCategoryGeneralFootnotes = (
  _category: MenuCategory,
): MenuFootnote[] => sharedGeneralMenuNotes;

export const menuData: MenuCategory[] = [
  {
    id: "drinks",
    nameEl: "Ροφήματα",
    nameEn: "Drinks",
    image: coffeeImg,
    segments: [
      {
        id: "cold",
        titleEl: "Κρύα",
        titleEn: "Cold",
        items: [
          {
            nameEl: "Freddo Espresso",
            nameEn: "Freddo Espresso",
            price: "4,70",
            badges: ["bestSeller"],
          },
          {
            nameEl: "Freddo Cappuccino",
            nameEn: "Freddo Cappuccino",
            price: "4,90",
          },
          { nameEl: "Φραπέ", nameEn: "Frappe", price: "3,50" },
          {
            nameEl: "Σοκολάτα",
            nameEn: "Chocolate",
            price: "5,00",
            extraEl:
              "Διάφορες γεύσεις 6,00€ Λευκή · Καραμέλα · Μπουένο · Lila pause",
            extraEn:
              "Various flavors 6,00€ White · Caramel · Bueno · Lila pause",
          },
        ],
      },
      {
        id: "hot",
        titleEl: "Ζεστά",
        titleEn: "Hot",
        items: [
          { nameEl: "Espresso", nameEn: "Espresso", price: "2,50" },
          {
            nameEl: "Espresso διπλό",
            nameEn: "Espresso double",
            price: "3,50",
          },
          { nameEl: "Cappuccino", nameEn: "Cappuccino", price: "4,00" },
          {
            nameEl: "Cappuccino διπλό",
            nameEn: "Cappuccino double",
            price: "4,70",
          },
          { nameEl: "Nescafé", nameEn: "Nescafé", price: "3,50" },
          { nameEl: "Καφές φίλτρου", nameEn: "Filter coffee", price: "3,50" },
          { nameEl: "Ελληνικός καφές", nameEn: "Greek coffee", price: "2,20" },
          {
            nameEl: "Ελληνικός καφές διπλός",
            nameEn: "Greek coffee double",
            price: "3,30",
          },
          {
            nameEl: "Σοκολάτα",
            nameEn: "Chocolate",
            price: "5,00",
            extraEl: "Διάφορες γεύσεις 6,00€",
            extraEn: "Various flavors 6,00€",
          },
          {
            nameEl: "Τσάι διάφορες γεύσεις",
            nameEn: "Tea various flavors",
            price: "3,00-3,50",
          },
        ],
      },
      {
        id: "juices",
        titleEl: "Χυμοί",
        titleEn: "Juices",
        items: [
          { nameEl: "Πορτοκάλι", nameEn: "Orange", price: "5,00" },
          {
            nameEl: "Ανάμεικτος",
            nameEn: "Mixed",
            price: "6,50",
            badges: ["bestSeller"],
          },
        ],
      },
      {
        id: "refreshing",
        titleEl: "Refreshing",
        titleEn: "Refreshing",
        items: [
          {
            nameEl: "Γρανίτα Φράουλα",
            nameEn: "Strawberry ice pop",
            price: "6,00",
          },
          {
            nameEl: "Γρανίτα φράουλα με ποτό",
            nameEn: "Strawberry ice pop with alcohol",
            price: "10,00",
          },
          {
            nameEl: "Real pure",
            nameEn: "Real pure",
            price: "6,00",
          },
          {
            nameEl: "Milkshake",
            nameEn: "Milkshake",
            price: "8,00",
          },
        ],
      },
    ],
  },
  {
    id: "breakfast",
    nameEl: "Πρωινό",
    nameEn: "Breakfast",
    image: breakfastImg,
    serviceHours: {
      textEl: "Σερβίρεται 09:00-11:30",
      textEn: "Served 09:00-11:30",
      compactEl: "09:00-11:30",
      compactEn: "09:00-11:30",
    },
    segments: [
      {
        id: "eggs",
        titleEl: "Αυγά",
        titleEn: "Eggs",
        items: [
          {
            nameEl: "Αυγά τηγανιτά",
            nameEn: "Fried eggs",
            descEl: "Μπεικον · Λουκάνικα κοκτέιλ",
            descEn: "Bacon · Cocktail sausages",
            price: "9,00",
          },
          { nameEl: "Αυγά scrambled", nameEn: "Scrambled eggs", price: "9,00" },
          {
            nameEl: "Ομελέτα Ελληνική",
            nameEn: "Greek omelette",
            descEl: "Φέτα · Ντομάτα · Ελία · Πιπεριά · Κρεμμύδι",
            descEn: "Feta · Tomato · Olive · Pepper · Onion",
            price: "11,00",
          },
          {
            nameEl: "Ομελέτα",
            nameEn: "Omelette",
            descEl: "Τυρί · Μπέικον · Μανιτάρια",
            descEn: "Cheese · Bacon · Mushrooms",
            price: "10,00",
          },
        ],
      },
      {
        id: "savory-pancakes",
        titleEl: "Pancakes αλμυρά",
        titleEn: "Savory pancakes",
        items: [
          {
            nameEl: "Μπεικον",
            nameEn: "Bacon",
            descEl: "Cheddar · Αυγό · Μαγιονέζα · Ντομάτα",
            descEn: "Cheddar · Egg · Mayonnaise · Tomato",
            price: "12,00",
          },
        ],
      },
    ],
  },
  {
    id: "snacks",
    nameEl: "Σνακ",
    nameEn: "Snacks",
    image: snacksImg,
    segments: [
      {
        id: "toast",
        titleEl: "Τόστ",
        titleEn: "Toast",
        items: [
          {
            nameEl: "Λευκό ψωμί",
            nameEn: "White bread",
            descEl: "Τυρί · ζαμπόν ή Γαλοπούλα · Μαγιονέζα",
            descEn: "Cheese · Ham or Turkey · Mayonnaise",
            price: "4,00",
            marker: "*",
          },
          {
            nameEl: "Ψωμί ολικής άλεσης",
            nameEn: "Brown bread",
            descEl: "Τυρί · Γαλοπούλα · Ντομάτα",
            descEn: "Cheese · Turkey · Tomato",
            price: "4,00",
            marker: "*",
          },
        ],
      },
      {
        id: "tortillas",
        titleEl: "Τορτίγιες",
        titleEn: "Tortillas",
        items: [
          {
            nameEl: "Κοτόπουλο",
            nameEn: "Chicken",
            descEl: "Τυρί · Μαρούλι · Ντομάτα · Παρμεζάνα · Σως caesar",
            descEn: "Cheese · Lettuce · Tomato · Parmesan · Sauce caesar",
            price: "7,50",
            marker: "*",
            badges: ["bestSeller"],
          },
          {
            nameEl: "Γαλοπούλα",
            nameEn: "Turkey",
            descEl: "Τυρί · Ντομάτα · Μαρούλι · Philadelphia",
            descEn: "Cheese · Tomato · Lettuce · Philadelphia",
            price: "6,50",
            marker: "*",
          },
        ],
      },
      {
        id: "baguettes",
        titleEl: "Μπαγκέτες (Λευκό ή ψωμί ολικής άλεσης)",
        titleEn: "Baguettes (White or brown bread)",
        items: [
          {
            nameEl: "Ελληνική",
            nameEn: "Greek",
            descEl: "Φέτα · Ντομάτα · Αγγούρι · Πιπεριά · Πάστα ελιάς",
            descEn: "Feta · Tomato · Cucumber · Pepper · Tapenade",
            price: "7,00",
            marker: "*",
          },
          {
            nameEl: "Κοτόπουλο",
            nameEn: "Chicken",
            descEl: "Τυρί · Μπέικον · Ντομάτα · Παρμεζάνα · Ρόκα · Σως caesar",
            descEn:
              "Cheese · Bacon · Tomato · Parmesan · Arugula · Sauce caesar",
            price: "7,50",
            marker: "*",
          },
          {
            nameEl: "Γαλοπούλα",
            nameEn: "Turkey",
            descEl: "Τυρί · Ντομάτα · Μαρούλι · Philadelphia",
            descEn: "Cheese · Tomato · Lettuce · Philadelphia",
            price: "6,50",
            marker: "*",
          },
        ],
      },
    ],
  },
  {
    id: "food",
    nameEl: "Φαγητά",
    nameEn: "Food",
    image: sandwichesImg,
    footnotes: [
      {
        marker: "*",
        textEl: "Συνοδεύεται με πατάτες",
        textEn: "Served with french fries",
      },
    ],
    segments: [
      {
        id: "club-sandwiches",
        titleEl: "Club sandwiches",
        titleEn: "Club sandwiches",
        items: [
          {
            nameEl: "Classic",
            nameEn: "Classic",
            descEl: "Τυρί · Ζαμπόν · Μπέικον · Ντομάτα · Μαρούλι · Μαγιονέζα",
            descEn: "Cheese · Ham · Bacon · Tomato · Lettuce · Mayonnaise",
            price: "11,00",
            marker: "*",
          },
          {
            nameEl: "Κοτόπουλο",
            nameEn: "Chicken",
            descEl:
              "Τυρί · Κοτόπουλο · Μπέικον · Ντομάτα · Μαρούλι · Μαγιονέζα",
            descEn: "Cheese · Chicken · Bacon · Tomato · Lettuce · Mayonnaise",
            price: "13,00",
            marker: "*",
          },
          {
            nameEl: "Galissea",
            nameEn: "Galissea",
            descEl:
              "Τυρί · Κοτόπουλο · Μπέικον · Ρόκα · Παρμεζάνα · Ντομάτα · Σως caesar",
            descEn:
              "Cheese · Chicken · Bacon · Arugula · Parmesan · Tomato · Sauce caesar",
            price: "15,00",
            marker: "*",
          },
        ],
      },
      {
        id: "burgers",
        titleEl: "Burgers",
        titleEn: "Burgers",
        items: [
          {
            nameEl: "Classic",
            nameEn: "Classic",
            descEl: "Μπιφτέκι μοσχαρίσιο · Τυρί · Πικλες · Κέτσαπ · Μουστάρδα",
            descEn: "Beef burger · Cheese · Pickles · Ketchup · Mustard",
            price: "13,00",
            marker: "*",
          },
          {
            nameEl: "Vegan",
            nameEn: "Vegan",
            descEl:
              "Μπιφτέκι λαχανικών · Πικλες · Κρεμμύδι · Μαρούλι · Ντομάτα · BBQ σως",
            descEn:
              "Vegan burger · Pickles · Onion · Lettuce · Tomato · BBQ sauce",
            price: "11,00",
            marker: "*",
          },
          {
            nameEl: "Galissea",
            nameEn: "Galissea",
            descEl:
              "Μπιφτέκι Black angus · Τυρί · Μπέικον · Ντομάτα · Αυγό τηγανιτό · Καραμελωμένα κρεμμύδια · Μαγιονέζα",
            descEn:
              "Black angus burger · Cheddar · Bacon · Tomato · Fried egg · Caramelized onions · Mayonnaise",
            price: "18,00",
            marker: "*",
            badges: ["bestSeller"],
          },
        ],
      },
      {
        id: "snacks",
        titleEl: "Σνακς",
        titleEn: "Snacks",
        items: [
          {
            nameEl: "Κοτομπουκιές",
            nameEn: "Chicken nuggets",
            price: "10,00",
            marker: "*",
            extraEl: "Extra Dip +0.60€",
            extraEn: "Extra Dip +0.60€",
          },
          {
            nameEl: "Πατάτες",
            nameEn: "French fries",
            price: "5,00",
            extraEl: "Extra Dip +0.60€",
            extraEn: "Extra Dip +0.60€",
          },
        ],
      },
      {
        id: "pizza",
        titleEl: "Πίτσες",
        titleEn: "Pizza",
        items: [
          {
            nameEl: "Μαργαρίτα",
            nameEn: "Margarite",
            price: "12,00",
            descEl: "Τυρί · Σάλτσα ντομάτας",
            descEn: "Cheese · Tomato sauce",
            badges: ["vegetarian"],
          },
          {
            nameEl: "Χωριάτικη",
            nameEn: "Greek",
            descEl: "Ντομάτα · Τυρί · Ελιές · Φέτα · Κρεμμύδι · Πιπεριές",
            descEn: "Tomato · Cheese · Olives · Feta · Onion · Pepper",
            price: "15,00",
            badges: ["vegetarian"],
          },
          {
            nameEl: "Ιταλική",
            nameEn: "Italian",
            descEl: "Ρόκα · Προσπύτο · Μοτσαρέλα · Κρέμα βαλσάμικου",
            descEn: "Arugula · Prosciutto · Mozzarella · Balsamic cream",
            price: "16,00",
          },
          {
            nameEl: "Special",
            nameEn: "Special",
            descEl: "Μοτσαρέλα · Ζαμπόν · Μπέικον · Πιπεριές · Μανιτάρια",
            descEn: "Mozzarella · Ham · Bacon · Pepper · Mushrooms",
            price: "14,00",
          },
          {
            nameEl: "Galissea",
            nameEn: "Galissea",
            descEl:
              "Κρέμα γάλακτος · Μοτσαρέλα · Κοτόπουλο · Μπέικον · Μανιτάρια",
            descEn: "Milk cream · Mozzarella · Chicken · Bacon · Mushrooms",
            price: "17,00",
            badges: ["bestSeller"],
          },
        ],
      },
      {
        id: "salads",
        titleEl: "Σαλάτες",
        titleEn: "Salads",
        items: [
          {
            nameEl: "Χωριάτικη",
            nameEn: "Greek salad",
            descEl:
              "Ντομάτα · Κρεμμύδι · Ελιές · Φέτα · Πιπεριές · Αγγούρι · Κάπαρη",
            descEn:
              "Tomato · Onion · Olives · Feta · Pepper · Cucumber · Capers",
            price: "12,00",
          },
          {
            nameEl: "Caesar",
            nameEn: "Caesar",
            descEl:
              "Φιλέτο κοτόπουλο · Παρμεζάνα · Μαρούλι · Κρουτόν  · Καλαμπόκι · Σως caesar",
            descEn:
              "Chicken fillet · Parmesan · Iceberg · Lola lettuce · Crouton · Corn · Sauce caesar",
            price: "13,00",
          },
        ],
      },
      {
        id: "fruit-salads",
        titleEl: "Φρουτοσαλάτες",
        titleEn: "Fruit salads",
        items: [
          { nameEl: "Φρούτα mix", nameEn: "Fruit mix", price: "8,00" },
          {
            nameEl: "Γιαούρτι (μέλι - καρύδια)",
            nameEn: "Yoghurt (Honey - Nuts)",
            price: "8,00",
          },
          {
            nameEl: "Γιαούρτι (φρέσκα φρούτα)",
            nameEn: "Yoghurt (Fresh fruit)",
            price: "8,00",
          },
        ],
      },
    ],
  },
  {
    id: "crepes",
    nameEl: "Κρέπες",
    nameEn: "Crepes",
    image: crepesImg,
    serviceHours: {
      textEl: "Σερβίρεται 19:00-23:30",
      textEn: "Served 19:00-23:30",
      compactEl: "19:00-23:30",
      compactEn: "19:00-23:30",
    },
    optionBuilder: {
      baseNameEl: "Φύλλο κρέπας",
      baseNameEn: "Crêpe",
      basePrice: "3,00",
      countLabel: 2,
      helperEl:
        "Επιλέξτε αλμυρή ή γλυκιά κρέπα και προσθέστε υλικά από τις παρακάτω επιλογές.",
      helperEn:
        "Choose a savory or sweet crepe and add ingredients from the options below.",
    },
    segments: [
      {
        id: "cheese",
        titleEl: "Τυριά",
        titleEn: "Cheese",
        display: "options",
        optionGroupEl: "Αλμυρή",
        optionGroupEn: "Savory",
        items: [
          {
            nameEl: "Gouda",
            nameEn: "Gouda",
            price: "1,20",
          },
          {
            nameEl: "Philadelphia",
            nameEn: "Philadelphia",
            price: "1,50",
          },
          {
            nameEl: "Φέτα",
            nameEn: "Feta",
            price: "1,50",
          },
          {
            nameEl: "Παρμεζάνα",
            nameEn: "Parmesan",
            price: "1,50",
          },
        ],
      },
      {
        id: "cold_cuts",
        titleEl: "Αλλαντικά",
        titleEn: "Cold cuts",
        display: "options",
        items: [
          {
            nameEl: "Ζαμπόν",
            nameEn: "Ham",
            price: "1,00",
          },
          {
            nameEl: "Γαλοπούλα",
            nameEn: "Turkey",
            price: "1,10",
          },
          {
            nameEl: "Μπεικον",
            nameEn: "Bacon",
            price: "1,10",
          },
          {
            nameEl: "Κοτόπουλο",
            nameEn: "Chicken",
            price: "2,00",
          },
          {
            nameEl: "Κοτομπουκιές",
            nameEn: "Chicken nuggets",
            price: "2,50",
          },
          {
            nameEl: "Πατάτες",
            nameEn: "French fries",
            price: "1,00",
          },
        ],
      },
      {
        id: "vegetables",
        titleEl: "Λαχανικά",
        titleEn: "Vegetables",
        display: "options",
        items: [
          {
            nameEl: "Ντομάτα",
            nameEn: "Tomato",
            price: "0,70",
          },
          {
            nameEl: "Πιπεριά",
            nameEn: "Pepper",
            price: "0,70",
          },
          {
            nameEl: "Μανιτάρια",
            nameEn: "Mushrooms",
            price: "0,70",
          },
          {
            nameEl: "Καλαμπόκι",
            nameEn: "Corn",
            price: "0,70",
          },
          {
            nameEl: "Ελιές",
            nameEn: "Olives",
            price: "0,70",
          },
          {
            nameEl: "Μαρούλι",
            nameEn: "Lettuce",
            price: "0,70",
          },
          {
            nameEl: "Κρεμμύδι",
            nameEn: "Onion",
            price: "0,70",
          },
          {
            nameEl: "Καραμελωμένο κρεμμύδι",
            nameEn: "Caramelized onion",
            price: "1,00",
          },
        ],
      },
      {
        id: "sauce",
        titleEl: "Sauce",
        titleEn: "Sauce",
        display: "options",
        items: [
          {
            nameEl: "Μαγιονέζα",
            nameEn: "Mayonnaise",
            price: "1,00",
          },
          {
            nameEl: "Τυροσαλάτα",
            nameEn: "Cheese salad",
            price: "1,00",
          },
          {
            nameEl: "Σως μουσταρδας",
            nameEn: "Mustard sauce",
            price: "1,00",
          },
          {
            nameEl: "Σως caesar",
            nameEn: "Caesar sauce",
            price: "1,00",
          },
          {
            nameEl: "Γλικόξινη",
            nameEn: "Sweet and sour",
            price: "1,00",
          },
          {
            nameEl: "Κρέμα γάλακτος",
            nameEn: "Milk cream",
            price: "1,00",
          },
          {
            nameEl: "Μαγιονέζα τρούφας",
            nameEn: "Truffle mayonnaise",
            price: "1,50",
          },
          {
            nameEl: "BBQ sauce",
            nameEn: "BBQ sauce",
            price: "1,00",
          },
        ],
      },
      {
        id: "sweet-chocolate",
        titleEl: "Σοκολάτες",
        titleEn: "Chocolate",
        display: "options",
        optionGroupEl: "Γλυκιά",
        optionGroupEn: "Sweet",
        items: [
          {
            nameEl: "Πραλίνα φουντουκιού",
            nameEn: "Hazelnut praline",
            price: "2,00",
          },
        ],
      },
      {
        id: "sweet-toppings",
        titleEl: "Υλικά",
        titleEn: "Toppings",
        display: "options",
        items: [
          {
            nameEl: "Μπανάνα",
            nameEn: "Banana",
            price: "1,00",
          },
          {
            nameEl: "Καρύδια",
            nameEn: "Walnuts",
            price: "1,00",
          },
          {
            nameEl: "Τριμμένο μπισκότο",
            nameEn: "Crumbled biscuit",
            price: "0,60",
          },
          {
            nameEl: "Ινδική καρύδα",
            nameEn: "Indian Coconut",
            price: "0,80",
          },
          {
            nameEl: "Πουράκια",
            nameEn: "Wafer rolls",
            price: "1,10",
          },
          {
            nameEl: "Σιρόπι",
            nameEn: "Syrup",
            descEl: "Σοκολάτα · Καραμέλα · Φράουλα",
            descEn: "Chocolate · Caramel · Strawberry",
            price: "0,50",
          },
        ],
      },
    ],
  },
  {
    id: "desserts",
    nameEl: "Γλυκά",
    nameEn: "Desserts",
    image: dessertsImg,
    segments: [
      {
        id: "waffles",
        titleEl: "Βάφλα",
        titleEn: "Waffle",
        items: [
          {
            nameEl: "Πραλίνα φουντουκιού",
            nameEn: "Hazelnut praline",
            descEl: "Τριμμένο μπισκότο · 1 μπάλα παγωτό",
            descEn: "Crumbed biscuit · 1 ice cream ball",
            price: "11,00",
          },
        ],
      },
      {
        id: "kayak-ice-cream",
        titleEl: "Παγωτά KAYAK · 1 μπάλα 3,50€ · 2 μπάλες 6,00€",
        titleEn: "KAYAK Ice cream · 1 scoop 3,50€ · 2 scoops 6,00€",
        items: [
          { nameEl: "Βανίλια", nameEn: "Vanilla", price: "3,50" },
          { nameEl: "Σοκολάτα", nameEn: "Chocolate", price: "3,50" },
          { nameEl: "Cookies", nameEn: "Cookies", price: "3,50" },
          { nameEl: "Φράουλα", nameEn: "Strawberry", price: "3,50" },
          { nameEl: "Καϊμάκι", nameEn: "Kaimaki ice cream", price: "3,50" },
          {
            nameEl: "Stracciatella",
            nameEn: "Stracciatella",
            price: "3,50",
            badges: ["new"],
          },
          {
            nameEl: "Dubai chocolate",
            nameEn: "Dubai chocolate",
            price: "3,50",
            badges: ["new"],
          },
          { nameEl: "Καραμέλα", nameEn: "Caramel", price: "3,50" },
          { nameEl: "Cheesecake", nameEn: "Cheesecake", price: "3,50" },
        ],
      },
      {
        id: "panckakes",
        titleEl: "Pancakes γλυκά",
        titleEn: "Sweet Pancakes",
        items: [
          {
            nameEl: "Πραλίνα φουντουκιού",
            nameEn: "Hazelnut praline",
            descEl: "Τριμμένο μπισκότο · Μπανάνα",
            descEn: "Crumbed biscuit · Banana",
            price: "10,00",
            badges: ["bestSeller"],
          },
        ],
      },
    ],
  },
  {
    id: "soft-drinks",
    nameEl: "Αναψυκτικά",
    nameEn: "Soft drinks",
    image: softdrinksImg,
    segments: [
      {
        id: "soft-drinks-list",
        titleEl: "Αναψυκτικά",
        titleEn: "Soft drinks",
        items: [
          {
            nameEl: "Coca-Cola 330ml",
            nameEn: "Coca-Cola 330ml",
            price: "3,00",
          },
          {
            nameEl: "Coca-Cola Zero 330ml",
            nameEn: "Coca-Cola Zero 330ml",
            price: "3,00",
          },
          { nameEl: "Fanta 330ml", nameEn: "Fanta 330ml", price: "3,00" },
          {
            nameEl: "Fanta Μπλε 330ml",
            nameEn: "Fanta Blue 330ml",
            price: "3,00",
          },
          {
            nameEl: "Fanta Λεμόνι 330ml",
            nameEn: "Fanta Lemon 330ml",
            price: "3,00",
          },
          { nameEl: "Sprite 330ml", nameEn: "Sprite 330ml", price: "3,00" },
          {
            nameEl: "Schweppes Pink Grapefruit 330ml",
            nameEn: "Schweppes Pink Grapefruit 330ml",
            price: "3,00",
          },
          {
            nameEl: "Schweppes Lemonade 330ml",
            nameEn: "Schweppes Lemonade 330ml",
            price: "3,00",
          },
          {
            nameEl: "Schweppes Orangeade 330ml",
            nameEn: "Schweppes Orangeade 330ml",
            price: "3,00",
          },
          {
            nameEl: "Ice Tea Ροδάκινο 330ml",
            nameEn: "Ice Tea Peach 330ml",
            price: "3,00",
          },
          {
            nameEl: "Ice Tea Λεμόνι 330ml",
            nameEn: "Ice Tea Lemon 330ml",
            price: "3,00",
          },
          { nameEl: "Red Bull 250ml", nameEn: "Red Bull 250ml", price: "4,00" },
          {
            nameEl: "Amita Motion 330ml",
            nameEn: "Amita Motion 330ml",
            price: "3,00",
          },
          {
            nameEl: "Ξυνόνερο 250ml",
            nameEn: "Sparkling water 250ml",
            price: "4,00",
          },
        ],
      },
      {
        id: "water",
        titleEl: "Νερό",
        titleEn: "Water",
        items: [
          { nameEl: "Μικρό 0.5Lt", nameEn: "Small 0.5Lt", price: "0,50" },
          { nameEl: "Μεγάλο 1.5Lt", nameEn: "Big 1.5Lt", price: "1,50" },
          {
            nameEl: "Ανθρακούχο 1.50Lt",
            nameEn: "Sparkling water 1.50Lt",
            price: "3,00",
          },
        ],
      },
    ],
  },
  {
    id: "alcohol",
    nameEl: "Αλκοολούχα",
    nameEn: "Alcohol",
    image: cocktailsImg,
    segments: [
      {
        id: "cocktails",
        titleEl: "Cocktails",
        titleEn: "Cocktails",
        items: [
          {
            nameEl: "Strawberry Daiquiri",
            nameEn: "Strawberry Daiquiri",
            price: "11,00",
          },
          {
            nameEl: "Margarita",
            nameEn: "Margarita",
            price: "11,00",
            badges: ["bestSeller"],
          },
          { nameEl: "Mojito", nameEn: "Mojito", price: "11,00" },
          { nameEl: "Paloma", nameEn: "Paloma", price: "11,00" },
          { nameEl: "Zombie", nameEn: "Zombie", price: "13,00" },
          { nameEl: "Aperol Classic", nameEn: "Aperol Classic", price: "9,00" },
          { nameEl: "Aperol Pink", nameEn: "Aperol Pink", price: "11,00" },
        ],
      },
      {
        id: "beers",
        titleEl: "Μπύρες",
        titleEn: "Beers",
        items: [
          { nameEl: "Άλφα 330ml", nameEn: "Alpha 330ml", price: "5,00" },
          {
            nameEl: "Heineken 0% 330ml",
            nameEn: "Heineken 0% 330ml",
            price: "5,00",
          },
          { nameEl: "Kaiser 330ml", nameEn: "Kaiser 330ml", price: "5,00" },
          { nameEl: "Corona 330ml", nameEn: "Corona 330ml", price: "7,00" },
          {
            nameEl: "Stella Atrois 330ml",
            nameEn: "Stella Atrois 330ml",
            price: "6,00",
          },
          {
            nameEl: "Fischer 330ml",
            nameEn: "Fischer 330ml",
            price: "5,00",
          },
          {
            nameEl: "Warsteiner Draft 330ml",
            nameEn: "Warsteiner Draft 330ml",
            price: "5,00",
          },
          {
            nameEl: "Warsteiner Draft 400ml",
            nameEn: "Warsteiner Draft 400ml",
            price: "6,00",
          },
        ],
      },
      {
        id: "drinks-list",
        titleEl: "Ποτά",
        titleEn: "Drinks",
        items: [
          { nameEl: "Απλό", nameEn: "Simple", price: "8,00" },
          { nameEl: "Special", nameEn: "Special", price: "12,00" },
        ],
      },
      {
        id: "wines",
        titleEl: "Κρασιά",
        titleEn: "Wines",
        items: [
          {
            nameEl: "ΟΜΙΚΡΟΝ 187ml",
            nameEn: "OMIKRON 187ml",
            price: "6,00",
            extraEl: "Λευκό · Ροζέ · Κόκκινο",
            extraEn: "White · Rose · Red",
          },
          {
            nameEl: "ΟΜΙΚΡΟΝ 750ml",
            nameEn: "OMIKRON 750ml",
            price: "22,00",
            extraEl: "Λευκό",
            extraEn: "White",
          },
          {
            nameEl: "Piccolo Mondo 187ml",
            nameEn: "Piccolo Mondo 187ml",
            price: "6,00",
            extraEl: "Λευκό",
            extraEn: "White",
          },
          {
            nameEl: "Παράγκα Κυρ- Γιάννη 750ml",
            nameEn: "Paraga Kir-Yanni 750ml",
            price: "27,00",
            extraEl: "Λευκό",
            extraEn: "White",
            badges: ["bestSeller"],
          },
          {
            nameEl: "Ουσύρα Μονεμβασιά 750ml",
            nameEn: "Ousyra Monevasia 750ml",
            price: "34,00",
            extraEl: "Λευκό · Ροζέ",
            extraEn: "White · Rose",
          },
          {
            nameEl: "Rock 'n rose 750ml",
            nameEn: "Rock 'n rose 750ml",
            price: "27,00",
            extraEl: "Ροζέ",
            extraEn: "Rose",
          },
        ],
      },
      {
        id: "sparkling-wines",
        titleEl: "Αφρώδεις Οίνοι",
        titleEn: "Sparkling wines",
        items: [
          {
            nameEl: "Moscato D'Asti 200ml",
            nameEn: "Moscato D'Asti 200ml",
            price: "8,00",
          },
          {
            nameEl: "Prosecco Villa Jolada 200ml",
            nameEn: "Prosecco Villa Jolada 200ml",
            price: "8,00",
          },
        ],
      },
      {
        id: "ouzo",
        titleEl: "Ούζο",
        titleEn: "Ouzo",
        items: [
          { nameEl: "Πλωμάρι 50ml", nameEn: "Plomari 50ml", price: "5,00" },
          { nameEl: "Πλωμάρι 200ml", nameEn: "Plomari 200ml", price: "11,00" },
          {
            nameEl: "Μακρυωνίτης 200ml",
            nameEn: "Makrionitis 200ml",
            price: "11,00",
          },
        ],
      },
      {
        id: "tsipouro",
        titleEl: "Τσίπουρο",
        titleEn: "Tsipouro",
        items: [
          {
            nameEl: "Αποστολάκη 200ml",
            nameEn: "Apostolaki 200ml",
            price: "12,00",
          },
          {
            nameEl: "Μακρυωνίτης 50ml",
            nameEn: "Makrionitis 50ml",
            price: "4,00",
          },
          {
            nameEl: "Μακρυωνίτης 200ml",
            nameEn: "Makrionitis 200ml",
            price: "12,00",
          },
        ],
      },
    ],
  },
];

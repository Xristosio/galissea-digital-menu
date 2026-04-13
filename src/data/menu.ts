import coffeeImg from "@/assets/menu/coffee.jpg";
import cocktailsImg from "@/assets/menu/cocktails.jpg";
import breakfastImg from "@/assets/menu/breakfast.jpg";
import snacksImg from "@/assets/menu/snacks.jpg";
import sandwichesImg from "@/assets/menu/sandwiches.jpg";
import dessertsImg from "@/assets/menu/desserts.jpg";
import softdrinksImg from "@/assets/menu/softdrinks.jpg";

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
}

export interface MenuCategory {
  id: string;
  nameEl: string;
  nameEn: string;
  image: string;
  items?: MenuItem[];
  segments?: MenuSegment[];
  // Optional category-level product notes shown before general notes.
  footnotes?: MenuFootnote[];
}

export interface MenuFootnote {
  marker?: "*" | "**";
  textEl: string;
  textEn: string;
}

export type MenuItemBadge = "bestSeller" | "vegan" | "new";

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
            price: "4,50",
          },
          {
            nameEl: "Freddo Cappuccino",
            nameEn: "Freddo Cappuccino",
            price: "4,70",
          },
          { nameEl: "Φραπέ", nameEn: "Frappe", price: "3,50" },
          { nameEl: "Σοκολάτα", nameEn: "Chocolate", price: "4,50" },
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
            price: "4,50",
          },
          { nameEl: "Nescafé", nameEn: "Nescafé", price: "3,50" },
          { nameEl: "Καφές φίλτρου", nameEn: "Filter coffee", price: "3,50" },
          { nameEl: "Ελληνικός καφές", nameEn: "Greek coffee", price: "2,20" },
          {
            nameEl: "Ελληνικός καφές διπλό",
            nameEn: "Greek coffee double",
            price: "3,30",
          },
          { nameEl: "Σοκολάτα", nameEn: "Chocolate", price: "4,50" },
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
          { nameEl: "Πορτοκάλι", nameEn: "Orange", price: "4,50" },
          { nameEl: "Ανάμεικτος", nameEn: "Mixed", price: "6,00" },
        ],
      },
      {
        id: "refreshing",
        titleEl: "Refreshing",
        titleEn: "Refreshing",
        items: [
          { nameEl: "Be fresh", nameEn: "Be fresh", price: "5,50" },
          {
            nameEl: "Milkshake",
            nameEn: "Milkshake",
            price: "8,00",
            extraEl: "Με όποια γεύση παγωτού επιλέξετε",
            extraEn: "With any ice cream flavor you choose",
          },
        ],
      },
      {
        id: "ice-pops",
        titleEl: "Γρανίτες",
        titleEn: "Ice pops",
        items: [
          {
            nameEl: "Φράουλα",
            nameEn: "Strawberry",
            price: "5,00",
            extraEl: "+ 5,00€ με ποτό",
            extraEn: "+ 5,00€ Alcohol",
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
            price: "8,00",
          },
          { nameEl: "Αυγά scrambled", nameEn: "Scrambled eggs", price: "7,00" },
          {
            nameEl: "Ομελέτα Ελληνική",
            nameEn: "Greek omelette",
            descEl: "Φέτα · Ντομάτα · Ελία · Πιπεριά · Κρεμμύδι",
            descEn: "Feta · Tomato · Olive · Pepper · Onion",
            price: "8,50",
          },
          {
            nameEl: "Ομελέτα",
            nameEn: "Omelette",
            descEl: "Τυρί · Μπέικον · Μανιτάρια",
            descEn: "Cheese · Bacon · Mushrooms",
            price: "8,50",
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
            descEl: "Cheddar · Ντομάτα · Αυγό · Μαγιονέζα",
            descEn: "Cheddar · Tomato · Egg · Mayonnaise",
            price: "10,00",
          },
        ],
      },
      {
        id: "sweet-pancakes",
        titleEl: "Pancakes γλυκά",
        titleEn: "Sweet pancakes",
        items: [
          {
            nameEl: "Πραλίνα μπανάνα",
            nameEn: "Praline banana",
            descEl: "Μπισκότο",
            descEn: "Biscuit",
            price: "9,00",
          },
        ],
      },
      {
        id: "fruit-salads",
        titleEl: "Φρουτοσαλάτες",
        titleEn: "Fruit salads",
        items: [
          { nameEl: "Φρούτα mix", nameEn: "Fruit mix", price: "6,50" },
          {
            nameEl: "Γιαούρτι (μέλι - καρύδια)",
            nameEn: "Yoghurt (Honey - Nuts)",
            price: "6,50",
          },
          {
            nameEl: "Γιαούρτι (φρέσκα φρούτα)",
            nameEn: "Yoghurt (Fresh fruit)",
            price: "6,50",
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
            descEl: "Τυρί · Μπέικον ή Γαλοπούλα · Μαγιονέζα",
            descEn: "Cheese · Ham or Turkey · Mayonnaise",
            price: "4,00",
            marker: "*",
          },
          {
            nameEl: "Ψωμί ολικής άλεσης",
            nameEn: "Brown bread",
            descEl: "Τυρί · Γαλοπούλα · Ντομάτα",
            descEn: "Cheese · Turkey · Tomatoes",
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
            price: "6,50",
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
            price: "6,00",
            marker: "*",
          },
          {
            nameEl: "Κοτόπουλο",
            nameEn: "Chicken",
            descEl: "Τυρί · Μπέικον · Ντομάτα · Παρμεζάνα · Ρόκα · Σως caesar",
            descEn:
              "Cheese · Bacon · Tomato · Parmesan · Arugula · Sauce caesar",
            price: "6,50",
            marker: "*",
          },
          {
            nameEl: "Γαλοπούλα",
            nameEn: "Turkey",
            descEl: "Τυρί · Ντομάτα · Μαρούλι · Philadelphia",
            descEn: "Cheese · Tomato · Lettuce · Philadelphia",
            price: "6,00",
            marker: "*",
          },
          {
            nameEl: "Ιταλική",
            nameEn: "Italian",
            descEl: "Καπνιστό τυρί · Ντομάτα · Σαλάμι · Μαγιονέζα",
            descEn: "Smoked cheese · Tomato · Salami · Mayonnaise",
            price: "6,50",
            marker: "*",
          },
        ],
      },
      {
        id: "snacks-hot",
        titleEl: "Σνάκ",
        titleEn: "Snacks",
        items: [
          {
            nameEl: "Κοτομπουκιές",
            nameEn: "Chicken nuggets",
            price: "9,00",
            marker: "**",
            extraEl: "Dip +0.50€",
            extraEn: "Dip +0.50€",
          },
          {
            nameEl: "Πατάτες",
            nameEn: "French fries",
            price: "4,00",
            extraEl: "Dip +0.50€",
            extraEn: "Dip +0.50€",
          },
        ],
      },
      {
        id: "hotdog",
        titleEl: "HotDog",
        titleEn: "HotDog",
        items: [
          {
            nameEl: "HotDog",
            nameEn: "HotDog",
            descEl: "Κέτσαπ · Μαγιονέζα · Μουστάρδα",
            descEn: "Ketchup · Mayonnaise · Mustard",
            price: "3,00",
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
            price: "10,00",
            marker: "*",
            badges: ["vegan"],
          },
          {
            nameEl: "Κοτόπουλο",
            nameEn: "Chicken",
            descEl:
              "Τυρί · Κοτόπουλο · Μπέικον · Ντομάτα · Μαρούλι · Μαγιονέζα",
            descEn: "Cheese · Chicken · Bacon · Tomato · Lettuce · Mayonnaise",
            price: "12,00",
            marker: "*",
          },
          {
            nameEl: "Galissea",
            nameEn: "Galissea",
            descEl:
              "Τυρί · Κοτόπουλο · Μπέικον · Ρόκα · Παρμεζάνα · Ντομάτα · Σως caesar",
            descEn:
              "Cheese · Chicken · Bacon · Arugula · Parmesan · Tomato · Sauce caesar",
            price: "13,00",
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
            price: "11,00",
            marker: "*",
          },
          {
            nameEl: "Vegan",
            nameEn: "Vegan",
            descEl:
              "Μπιφτέκι λαχανικών · Πικλες · Κρεμμύδι · Μαρούλι · Ντομάτα · BBQ σως",
            descEn:
              "Vegan burger · Pickles · Onion · Lettuce · Tomato · BBQ sauce",
            price: "10,00",
            marker: "*",
          },
          {
            nameEl: "Galissea",
            nameEn: "Galissea",
            descEl:
              "Μπιφτέκι Black angus · Τυρί · Μπέικον · Ντομάτα · Αυγό · Καραμελωμένα κρεμμύδια · BBQ σως",
            descEn:
              "Black angus burger · Cheddar · Bacon · Tomato · Fried egg · Caramelized onions · BBQ sauce",
            price: "17,00",
            marker: "*",
            badges: ["bestSeller"],
          },
        ],
      },
      {
        id: "pizza",
        titleEl: "Πίτσες",
        titleEn: "Pizza",
        items: [
          { nameEl: "Μαργαρίτα", nameEn: "Margarite", price: "10,00" },
          {
            nameEl: "Χωριάτικη",
            nameEn: "Greek",
            descEl: "Ντομάτα · Τυρί · Ελιές · Φέτα · Κρεμμύδι · Πιπεριές",
            descEn: "Tomato · Cheese · Olives · Feta · Onion · Pepper",
            price: "13,00",
          },
          {
            nameEl: "Ιταλική",
            nameEn: "Italic",
            descEl: "Ρόκα · Προσπύτο · Μοσαρέλα · Κρέμα βαλσάμικου",
            descEn: "Arugula · Prosciutto · Mozzarella · Balsamic cream",
            price: "12,00",
          },
          {
            nameEl: "Special",
            nameEn: "Special",
            descEl: "Μοσαρέλα · Ζαμπόν · Μπέικον · Πιπεριές · Μανιτάρια",
            descEn: "Mozzarella · Ham · Bacon · Pepper · Mushrooms",
            price: "14,00",
          },
          {
            nameEl: "Galissea",
            nameEn: "Galissea",
            descEl:
              "Κρέμα γάλακτος · Μοσαρέλα · Κοτόπουλο · Μπέικον · Μανιτάρια",
            descEn: "Milk cream · Mozzarella · Chicken · Bacon · Mushrooms",
            price: "15,00",
            badges: ["bestSeller", "new", "vegan"],
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
            price: "11,00",
          },
          {
            nameEl: "Caesar",
            nameEn: "Caesar",
            descEl:
              "Φιλέτο κοτόπουλο · Παρμεζάνα · Μαρούλι · Κρουτόν  · Καλαμπόκι · Σως caesar",
            descEn:
              "Chicken fillet · Parmesan · Iceberg · Lola lettuce · Crouton · Corn · Sauce caesar",
            price: "12,00",
            badges: ["bestSeller"],
          },
          {
            nameEl: "Ιταλική",
            nameEn: "Italic",
            descEl: "Ντομάτα · Μοσαρέλα · Πέστο βασιλικού · Παξιμάδι χαρουπιού",
            descEn: "Tomato · Mozzarella · Pesto · Carob nut",
            price: "11,00",
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
        titleEl: "Βάφλες",
        titleEn: "Waffles",
        items: [
          {
            nameEl: "Πραλίνα φουντουκιού",
            nameEn: "Hazelnut Praline",
            descEl: "Τριμμένο μπισκότο · 1 μπάλα παγωτό",
            descEn: "Crumbed biscuit · 1 ice cream ball",
            price: "9,00",
          },
        ],
      },
      {
        id: "kayak-ice-cream",
        titleEl: "Παγωτά KAYAK",
        titleEn: "KAYAK Ice cream",
        items: [
          { nameEl: "Βανίλια", nameEn: "Vanilla", price: "3,00" },
          { nameEl: "Σοκολάτα", nameEn: "Chocolate", price: "3,00" },
          { nameEl: "Cookies", nameEn: "Cookies", price: "3,00" },
          { nameEl: "Φράουλα", nameEn: "Strawberry", price: "3,00" },
          {
            nameEl: "Καϊμάκι",
            nameEn: "Kaimaki ice cream",
            price: "3,00",
          },
          {
            nameEl: "Σουφλέ σοκολάτας",
            nameEn: "Lava cake",
            price: "5,50",
            extraEl: "1 μπάλα παγωτό + 2,00€",
            extraEn: "1 ice cream ball + 2,00€",
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
          { nameEl: "Perrier 330ml", nameEn: "Perrier 330ml", price: "4,00" },
          {
            nameEl: "Perrier Λεμόνι 330ml",
            nameEn: "Perrier Lemon 330ml",
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
            nameEl: "Daiquiri Strawberry",
            nameEn: "Daiquiri Strawberry",
            price: "11,00",
          },
          { nameEl: "Margarita", nameEn: "Margarita", price: "10,00" },
          { nameEl: "Mojito", nameEn: "Mojito", price: "11,00" },
          { nameEl: "Paloma", nameEn: "Paloma", price: "11,00" },
          { nameEl: "Zombie", nameEn: "Zombie", price: "13,00" },
          { nameEl: "Aperol Classic", nameEn: "Aperol Classic", price: "8,00" },
          { nameEl: "Aperol Pink", nameEn: "Aperol Pink", price: "10,00" },
        ],
      },
      {
        id: "beers",
        titleEl: "Μπύρες",
        titleEn: "Beers",
        items: [
          { nameEl: "Άλφα 330ml", nameEn: "Alpha 330ml", price: "5,00" },
          {
            nameEl: "Άλφα 'ανευ' 330ml",
            nameEn: "Alpha alcohol free 330ml",
            price: "5,00",
          },
          {
            nameEl: "Μάμος draft 330ml",
            nameEn: "Mamos draft 330ml",
            price: "4,00",
          },
          { nameEl: "Kaiser 330ml", nameEn: "Kaiser 330ml", price: "5,00" },
          { nameEl: "Corona 330ml", nameEn: "Corona 330ml", price: "6,00" },
          {
            nameEl: "Stella Atrois 330ml",
            nameEn: "Stella Atrois 330ml",
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
          { nameEl: "Special", nameEn: "Special", price: "10,00" },
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
            extraEl: "White · Rose · Red",
            extraEn: "White · Rose · Red",
          },
          {
            nameEl: "ΟΜΙΚΡΟΝ 750ml",
            nameEn: "OMIKRON 750ml",
            price: "22,00",
            extraEl: "White",
            extraEn: "White",
          },
          {
            nameEl: "Piccolo Mondo 187ml",
            nameEn: "Piccolo Mondo 187ml",
            price: "6,00",
            extraEl: "White",
            extraEn: "White",
          },
          {
            nameEl: "Παράγκα Κυρ- Γιάννη 750ml",
            nameEn: "Paraga Kir-Yanni 750ml",
            price: "27,00",
            extraEl: "White",
            extraEn: "White",
          },
          {
            nameEl: "Ουσύρα Μονεμβασιά 750ml",
            nameEn: "Ousyra Monevasia 750ml",
            price: "34,00",
            extraEl: "White",
            extraEn: "White",
          },
          {
            nameEl: "Φάμπρικα 750ml",
            nameEn: "Fabrica 750ml",
            price: "27,00",
            extraEl: "White",
            extraEn: "White",
          },
          {
            nameEl: "Τρεις Μάγισσες 750ml",
            nameEn: "Tris Magisses 750ml",
            price: "35,00",
            extraEl: "Rose",
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
            nameEl: "Moscato D'Asti 750ml",
            nameEn: "Moscato D'Asti 750ml",
            price: "30,00",
          },
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
          {
            nameEl: "Prosecco Terra Serena 750ml",
            nameEn: "Prosecco Terra Serena 750ml",
            price: "28,00",
          },
          {
            nameEl: "Σαμπάνια Asti Martini 750ml",
            nameEn: "Champagne Asti Martini 750ml",
            price: "29,00",
          },
          {
            nameEl: "Σαμπάνια Moet 750ml",
            nameEn: "Champagne Moet 750ml",
            price: "150,00",
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

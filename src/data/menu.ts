import coffeeImg from "@/assets/menu/coffee.jpg";
import juicesImg from "@/assets/menu/juices.jpg";
import softdrinksImg from "@/assets/menu/softdrinks.jpg";
import cocktailsImg from "@/assets/menu/cocktails.jpg";
import beerWineImg from "@/assets/menu/beer-wine.jpg";
import breakfastImg from "@/assets/menu/breakfast.jpg";
import snacksImg from "@/assets/menu/snacks.jpg";
import sandwichesImg from "@/assets/menu/sandwiches.jpg";
import saladsImg from "@/assets/menu/salads.jpg";
import dessertsImg from "@/assets/menu/desserts.jpg";

export interface MenuItem {
  nameEl: string;
  nameEn: string;
  descEl?: string;
  descEn?: string;
  price: string;
  marker?: "*" | "**";
  extraEl?: string;
  extraEn?: string;
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
  footnotes?: MenuFootnote[];
}

export interface MenuFootnote {
  marker?: "*" | "**";
  textEl: string;
  textEn: string;
}

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
  getCategorySegments(category).reduce((total, segment) => total + segment.items.length, 0);

export const sharedMenuFootnotes: MenuFootnote[] = [
  {
    marker: "*",
    textEl: "Σερβίρεται με chips",
    textEn: "Served with chips",
  },
  {
    marker: "**",
    textEl: "Σερβίρεται με πατάτες τηγανητές",
    textEn: "Served with french fries",
  },
  {
    textEl: "Παρακαλούμε ενημερώστε το προσωπικό για τυχόν αλλεργίες ή δυσανεξίες.",
    textEn: "Please inform the staff, if any allergies or intolerances.",
  },
  {
    textEl:
      "Ο καταναλωτής δεν υποχρεούται να πληρώσει, εάν δεν λάβει το νόμιμο παραστατικό (απόδειξη-τιμολόγιο).",
    textEn:
      "The consumer is not obliged to pay, if the notice of payment is not received (receipt-invoice).",
  },
  {
    textEl:
      "Στις τιμές περιλαμβάνονται δημοτικοί φόροι και ενδέχεται να υπάρξουν αλλαγές χωρίς προειδοποίηση.",
    textEn:
      "Municipal taxes are included in the prices, and changes may occur without prior notice.",
  },
];

export const getCategoryFootnotes = (category: MenuCategory): MenuFootnote[] => [
  ...sharedMenuFootnotes,
  ...(category.footnotes ?? []),
];

export const menuData: MenuCategory[] = [
  {
    id: "coffee",
    nameEl: "Ροφήματα",
    nameEn: "Drinks",
    image: coffeeImg,
    segments: [
      {
        id: "cold",
        titleEl: "Κρύα",
        titleEn: "Cold",
        items: [
          { nameEl: "Freddo Espresso", nameEn: "Freddo Espresso", price: "4.50" },
          { nameEl: "Freddo Cappuccino", nameEn: "Freddo Cappuccino", price: "4.70" },
          { nameEl: "Φραπέ", nameEn: "Frappe", price: "3.50" },
          { nameEl: "Σοκολάτα", nameEn: "Chocolate", price: "4.50" },
        ],
      },
      {
        id: "hot",
        titleEl: "Ζεστά",
        titleEn: "Hot",
        items: [
          { nameEl: "Espresso", nameEn: "Espresso", price: "2.50" },
          { nameEl: "Espresso Διπλός", nameEn: "Espresso Double", price: "3.50" },
          { nameEl: "Cappuccino", nameEn: "Cappuccino", price: "4.00" },
          { nameEl: "Cappuccino Διπλός", nameEn: "Cappuccino Double", price: "4.50" },
          { nameEl: "Nescafé", nameEn: "Nescafe", price: "3.50" },
          { nameEl: "Καφές Φίλτρου", nameEn: "Filter Coffee", price: "3.50" },
          { nameEl: "Ελληνικός", nameEn: "Greek Coffee", price: "2.20" },
          { nameEl: "Ελληνικός Διπλός", nameEn: "Greek Coffee Double", price: "3.30" },
          { nameEl: "Σοκολάτα", nameEn: "Chocolate", price: "4.50" },
          {
            nameEl: "Τσάι (διάφορες γεύσεις)",
            nameEn: "Tea (various flavors)",
            price: "3.00-3.50",
          },
        ],
      },
      {
        id: "juices",
        titleEl: "Χυμοί",
        titleEn: "Juices",
        items: [
          { nameEl: "Πορτοκάλι", nameEn: "Orange", price: "4.50" },
          { nameEl: "Ανάμεικτος", nameEn: "Mixed", price: "6.00" },
        ],
      },
      {
        id: "refreshing",
        titleEl: "Δροσιστικά",
        titleEn: "Refreshing",
        items: [
          { nameEl: "Be Fresh", nameEn: "Be Fresh", price: "5.50" },
          {
            nameEl: "Milkshake",
            nameEn: "Milkshake",
            price: "8.00",
            extraEl: "Με όποια γεύση παγωτού θέλετε",
            extraEn: "With any ice cream flavor you choose",
          },
        ],
      },
      {
        id: "ice-pops",
        titleEl: "Παγωτίνια",
        titleEn: "Ice Pops",
        items: [
          {
            nameEl: "Φράουλα",
            nameEn: "Strawberry",
            price: "5.00",
            extraEl: "+ 5,00€ Αλκοόλ",
            extraEn: "+ €5.00 Alcohol add-on",
          },
        ],
      },
    ],
  },
  {
    id: "juices",
    nameEl: "Φρέσκοι Χυμοί",
    nameEn: "Fresh Juices",
    image: juicesImg,
    items: [
      { nameEl: "Πορτοκάλι", nameEn: "Orange", price: "4.00" },
      { nameEl: "Καρπούζι", nameEn: "Watermelon", price: "4.50" },
      { nameEl: "Mix Φρούτων", nameEn: "Fruit Mix", price: "5.00" },
      {
        nameEl: "Smoothie Μπανάνα-Φράουλα",
        nameEn: "Banana-Strawberry Smoothie",
        price: "5.50",
      },
      { nameEl: "Smoothie Μάνγκο", nameEn: "Mango Smoothie", price: "5.50" },
    ],
  },
  {
    id: "softdrinks",
    nameEl: "Αναψυκτικά",
    nameEn: "Soft Drinks",
    image: softdrinksImg,
    items: [
      { nameEl: "Coca-Cola", nameEn: "Coca-Cola", price: "2.50" },
      { nameEl: "Coca-Cola Zero", nameEn: "Coca-Cola Zero", price: "2.50" },
      { nameEl: "Sprite", nameEn: "Sprite", price: "2.50" },
      { nameEl: "Fanta Πορτοκάλι", nameEn: "Fanta Orange", price: "2.50" },
      { nameEl: "Σόδα", nameEn: "Soda Water", price: "2.00" },
      { nameEl: "Τόνικ", nameEn: "Tonic Water", price: "2.50" },
      { nameEl: "Νερό 500ml", nameEn: "Water 500ml", price: "0.50" },
      { nameEl: "Νερό 1L", nameEn: "Water 1L", price: "1.00" },
    ],
  },
  {
    id: "cocktails",
    nameEl: "Κοκτέιλ",
    nameEn: "Cocktails",
    image: cocktailsImg,
    items: [
      {
        nameEl: "Μοχίτο",
        nameEn: "Mojito",
        descEl: "Ρούμι, lime, μέντα, σόδα",
        descEn: "Rum, lime, mint, soda",
        price: "9.00",
      },
      {
        nameEl: "Απερόλ Spritz",
        nameEn: "Aperol Spritz",
        descEl: "Aperol, prosecco, σόδα",
        descEn: "Aperol, prosecco, soda",
        price: "9.00",
      },
      {
        nameEl: "Μαργαρίτα",
        nameEn: "Margarita",
        descEl: "Τεκίλα, triple sec, lime",
        descEn: "Tequila, triple sec, lime",
        price: "9.00",
      },
      {
        nameEl: "Πίνα Κολάδα",
        nameEn: "Pina Colada",
        descEl: "Ρούμι, καρύδα, ανανάς",
        descEn: "Rum, coconut, pineapple",
        price: "9.00",
      },
      { nameEl: "Ντάκιρι Φράουλα", nameEn: "Strawberry Daiquiri", price: "9.00" },
      { nameEl: "Gin Tonic", nameEn: "Gin & Tonic", price: "8.00" },
    ],
  },
  {
    id: "beer-wine",
    nameEl: "Μπύρα & Κρασί",
    nameEn: "Beer & Wine",
    image: beerWineImg,
    items: [
      { nameEl: "Μπύρα Βαρελίσια", nameEn: "Draft Beer", price: "5.00" },
      { nameEl: "Μπύρα Φιάλη", nameEn: "Bottled Beer", price: "4.50" },
      { nameEl: "Corona", nameEn: "Corona", price: "5.00" },
      {
        nameEl: "Κρασί Λευκό (ποτήρι)",
        nameEn: "White Wine (glass)",
        price: "5.00",
      },
      {
        nameEl: "Κρασί Ροζέ (ποτήρι)",
        nameEn: "Rose Wine (glass)",
        price: "5.00",
      },
      {
        nameEl: "Κρασί Κόκκινο (ποτήρι)",
        nameEn: "Red Wine (glass)",
        price: "5.00",
      },
    ],
  },
  {
    id: "breakfast",
    nameEl: "Πρωινά",
    nameEn: "Breakfast",
    image: breakfastImg,
    items: [
      {
        nameEl: "Τοστ Κλασικό",
        nameEn: "Classic Toast",
        descEl: "Ζαμπόν, τυρί",
        descEn: "Ham, cheese",
        price: "3.50",
      },
      { nameEl: "Κρουασάν Βούτυρο", nameEn: "Butter Croissant", price: "2.50" },
      {
        nameEl: "Κρουασάν Σοκολάτα",
        nameEn: "Chocolate Croissant",
        price: "3.00",
      },
      {
        nameEl: "Ομελέτα",
        nameEn: "Omelette",
        descEl: "Αυγά, τυρί, ντομάτα, πιπεριά",
        descEn: "Eggs, cheese, tomato, pepper",
        price: "5.50",
      },
      { nameEl: "Αυγά & Μπέικον", nameEn: "Eggs & Bacon", price: "6.00" },
      {
        nameEl: "Γιαούρτι με Μέλι & Granola",
        nameEn: "Yogurt with Honey & Granola",
        price: "5.00",
      },
      {
        nameEl: "Pancakes",
        nameEn: "Pancakes",
        descEl: "Με σιρόπι σφενδάμου & φρούτα",
        descEn: "With maple syrup & fruit",
        price: "6.00",
      },
    ],
  },
  {
    id: "snacks",
    nameEl: "Σνακ",
    nameEn: "Snacks",
    image: snacksImg,
    items: [
      { nameEl: "Πατάτες Τηγανητές", nameEn: "French Fries", price: "3.50" },
      {
        nameEl: "Nachos με Τυρί",
        nameEn: "Cheese Nachos",
        descEl: "Με σάλτσα τυριού & guacamole",
        descEn: "With cheese sauce & guacamole",
        price: "7.00",
      },
      { nameEl: "Chicken Nuggets", nameEn: "Chicken Nuggets", price: "6.00" },
      { nameEl: "Onion Rings", nameEn: "Onion Rings", price: "4.50" },
      {
        nameEl: "Μπρουσκέτα",
        nameEn: "Bruschetta",
        descEl: "Ντομάτα, βασιλικός, φέτα",
        descEn: "Tomato, basil, feta",
        price: "5.50",
      },
    ],
  },
  {
    id: "sandwiches",
    nameEl: "Σάντουιτς",
    nameEn: "Sandwiches",
    image: sandwichesImg,
    items: [
      {
        nameEl: "Club Sandwich Κοτόπουλο",
        nameEn: "Chicken Club Sandwich",
        descEl: "Κοτόπουλο, μπέικον, μαρούλι, ντομάτα, μαγιονέζα",
        descEn: "Chicken, bacon, lettuce, tomato, mayo",
        price: "7.50",
        marker: "**",
      },
      {
        nameEl: "Club Sandwich Κλασικό",
        nameEn: "Classic Club Sandwich",
        descEl: "Ζαμπόν, τυρί, αυγό, μαρούλι",
        descEn: "Ham, cheese, egg, lettuce",
        price: "7.00",
        marker: "*",
      },
      {
        nameEl: "Wrap Κοτόπουλο",
        nameEn: "Chicken Wrap",
        descEl: "Κοτόπουλο, λαχανικά, σάλτσα",
        descEn: "Chicken, vegetables, sauce",
        price: "6.50",
        marker: "**",
      },
      {
        nameEl: "Σάντουιτς Τόνου",
        nameEn: "Tuna Sandwich",
        price: "6.00",
        marker: "*",
      },
    ],
  },
  {
    id: "salads",
    nameEl: "Σαλάτες",
    nameEn: "Salads",
    image: saladsImg,
    items: [
      {
        nameEl: "Χωριάτικη",
        nameEn: "Greek Salad",
        descEl: "Ντομάτα, αγγούρι, φέτα, ελιές",
        descEn: "Tomato, cucumber, feta, olives",
        price: "7.00",
      },
      {
        nameEl: "Σαλάτα Σίζαρ",
        nameEn: "Caesar Salad",
        descEl: "Μαρούλι, κοτόπουλο, παρμεζάνα, κρουτόν",
        descEn: "Lettuce, chicken, parmesan, croutons",
        price: "8.00",
      },
      {
        nameEl: "Σαλάτα Κινόα",
        nameEn: "Quinoa Salad",
        descEl: "Κινόα, αβοκάντο, ντοματίνια",
        descEn: "Quinoa, avocado, cherry tomatoes",
        price: "8.50",
      },
    ],
  },
  {
    id: "desserts",
    nameEl: "Γλυκά & Παγωτό",
    nameEn: "Desserts & Ice Cream",
    image: dessertsImg,
    items: [
      { nameEl: "Cheesecake", nameEn: "Cheesecake", price: "5.50" },
      { nameEl: "Σοκολατόπιτα", nameEn: "Chocolate Cake", price: "5.50" },
      {
        nameEl: "Waffle",
        nameEn: "Waffle",
        descEl: "Με σοκολάτα, φρούτα & παγωτό",
        descEn: "With chocolate, fruit & ice cream",
        price: "6.50",
      },
      { nameEl: "Παγωτό (1 μπάλα)", nameEn: "Ice Cream (1 scoop)", price: "2.50" },
      { nameEl: "Παγωτό (2 μπάλες)", nameEn: "Ice Cream (2 scoops)", price: "4.00" },
      { nameEl: "Παγωτό (3 μπάλες)", nameEn: "Ice Cream (3 scoops)", price: "5.50" },
    ],
  },
];

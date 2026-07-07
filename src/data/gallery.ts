import apperolPhoto8_320 from "@/assets/gallery/optimized/apperol_photo8-320.webp";
import apperolPhoto8_640 from "@/assets/gallery/optimized/apperol_photo8-640.webp";
import apperolPhoto8_960 from "@/assets/gallery/optimized/apperol_photo8-960.webp";
import burgerPhoto4_320 from "@/assets/gallery/optimized/burger_photo4-320.webp";
import burgerPhoto4_640 from "@/assets/gallery/optimized/burger_photo4-640.webp";
import burgerPhoto4_960 from "@/assets/gallery/optimized/burger_photo4-960.webp";
import crepePhoto2_320 from "@/assets/gallery/optimized/crepe_photo2-320.webp";
import crepePhoto2_640 from "@/assets/gallery/optimized/crepe_photo2-640.webp";
import crepePhoto2_960 from "@/assets/gallery/optimized/crepe_photo2-960.webp";
import margaritaPhoto5_320 from "@/assets/gallery/optimized/margarita_photo5-320.webp";
import margaritaPhoto5_640 from "@/assets/gallery/optimized/margarita_photo5-640.webp";
import margaritaPhoto5_960 from "@/assets/gallery/optimized/margarita_photo5-960.webp";
import pancakePhoto3_320 from "@/assets/gallery/optimized/Pancake_photo3-320.webp";
import pancakePhoto3_640 from "@/assets/gallery/optimized/Pancake_photo3-640.webp";
import pancakePhoto3_960 from "@/assets/gallery/optimized/Pancake_photo3-960.webp";
import pizzaPhoto7_320 from "@/assets/gallery/optimized/pizza_photo7-320.webp";
import pizzaPhoto7_640 from "@/assets/gallery/optimized/pizza_photo7-640.webp";
import pizzaPhoto7_960 from "@/assets/gallery/optimized/pizza_photo7-960.webp";
import restaurantPhoto1_320 from "@/assets/gallery/optimized/restaurant_photo1-320.webp";
import restaurantPhoto1_640 from "@/assets/gallery/optimized/restaurant_photo1-640.webp";
import restaurantPhoto1_960 from "@/assets/gallery/optimized/restaurant_photo1-960.webp";
import wafflePhoto6_320 from "@/assets/gallery/optimized/waffle_photo6-320.webp";
import wafflePhoto6_640 from "@/assets/gallery/optimized/waffle_photo6-640.webp";
import wafflePhoto6_960 from "@/assets/gallery/optimized/waffle_photo6-960.webp";

interface ResponsiveVariant {
  src: string;
  width: number;
}

export interface GalleryImageAsset {
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

export interface GalleryImage {
  id: string;
  image: GalleryImageAsset;
  captionEl: string;
  captionEn: string;
}

const toSrcSet = (variants: ResponsiveVariant[]) =>
  variants.map((variant) => `${variant.src} ${variant.width}w`).join(", ");

const createAsset = (
  variants: ResponsiveVariant[],
  width: number,
  height: number,
): GalleryImageAsset => {
  const mediumVariant =
    variants.find((variant) => variant.width === 960) ??
    variants[variants.length - 1];

  return {
    src: mediumVariant.src,
    srcSet: toSrcSet(variants),
    width,
    height,
  };
};

const createAltText = (index: number) => ({
  captionEl: ``,
  captionEn: ``,
});

export const galleryData: GalleryImage[] = [
  {
    id: "restaurant-photo-1",
    image: createAsset(
      [
        { src: restaurantPhoto1_320, width: 320 },
        { src: restaurantPhoto1_640, width: 640 },
        { src: restaurantPhoto1_960, width: 960 },
      ],
      1086,
      1448,
    ),
    ...createAltText(1),
  },
  {
    id: "crepe-photo-2",
    image: createAsset(
      [
        { src: crepePhoto2_320, width: 320 },
        { src: crepePhoto2_640, width: 640 },
        { src: crepePhoto2_960, width: 960 },
      ],
      1086,
      1448,
    ),
    ...createAltText(2),
  },
  {
    id: "pancake-photo-3",
    image: createAsset(
      [
        { src: pancakePhoto3_320, width: 320 },
        { src: pancakePhoto3_640, width: 640 },
        { src: pancakePhoto3_960, width: 960 },
      ],
      1086,
      1448,
    ),
    ...createAltText(3),
  },
  {
    id: "burger-photo-4",
    image: createAsset(
      [
        { src: burgerPhoto4_320, width: 320 },
        { src: burgerPhoto4_640, width: 640 },
        { src: burgerPhoto4_960, width: 960 },
      ],
      1086,
      1448,
    ),
    ...createAltText(4),
  },
  {
    id: "margarita-photo-5",
    image: createAsset(
      [
        { src: margaritaPhoto5_320, width: 320 },
        { src: margaritaPhoto5_640, width: 640 },
        { src: margaritaPhoto5_960, width: 960 },
      ],
      1086,
      1448,
    ),
    ...createAltText(5),
  },
  {
    id: "waffle-photo-6",
    image: createAsset(
      [
        { src: wafflePhoto6_320, width: 320 },
        { src: wafflePhoto6_640, width: 640 },
        { src: wafflePhoto6_960, width: 960 },
      ],
      1086,
      1448,
    ),
    ...createAltText(6),
  },
  {
    id: "pizza-photo-7",
    image: createAsset(
      [
        { src: pizzaPhoto7_320, width: 320 },
        { src: pizzaPhoto7_640, width: 640 },
        { src: pizzaPhoto7_960, width: 960 },
      ],
      1254,
      1254,
    ),
    ...createAltText(7),
  },
  {
    id: "apperol-photo-8",
    image: createAsset(
      [
        { src: apperolPhoto8_320, width: 320 },
        { src: apperolPhoto8_640, width: 640 },
        { src: apperolPhoto8_960, width: 960 },
      ],
      1086,
      1448,
    ),
    ...createAltText(8),
  },
];

import venue1_320 from "@/assets/gallery/optimized/venue-1-320.webp";
import venue1_640 from "@/assets/gallery/optimized/venue-1-640.webp";
import venue1_960 from "@/assets/gallery/optimized/venue-1-960.webp";
import venue1_1280 from "@/assets/gallery/optimized/venue-1-1280.webp";
import venue2_320 from "@/assets/gallery/optimized/venue-2-320.webp";
import venue2_640 from "@/assets/gallery/optimized/venue-2-640.webp";
import venue2_960 from "@/assets/gallery/optimized/venue-2-960.webp";
import venue2_1280 from "@/assets/gallery/optimized/venue-2-1280.webp";
import venue3_320 from "@/assets/gallery/optimized/venue-3-320.webp";
import venue3_640 from "@/assets/gallery/optimized/venue-3-640.webp";
import venue3_960 from "@/assets/gallery/optimized/venue-3-960.webp";
import venue3_1280 from "@/assets/gallery/optimized/venue-3-1280.webp";
import venue4_320 from "@/assets/gallery/optimized/venue-4-320.webp";
import venue4_640 from "@/assets/gallery/optimized/venue-4-640.webp";
import venue4_960 from "@/assets/gallery/optimized/venue-4-960.webp";

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

export const galleryData: GalleryImage[] = [
  {
    id: "venue-1",
    image: createAsset(
      [
        { src: venue1_320, width: 320 },
        { src: venue1_640, width: 640 },
        { src: venue1_960, width: 960 },
        { src: venue1_1280, width: 1280 },
      ],
      5712,
      4284,
    ),
    captionEl: "Η θέα μας",
    captionEn: "Our View",
  },
  {
    id: "venue-2",
    image: createAsset(
      [
        { src: venue2_320, width: 320 },
        { src: venue2_640, width: 640 },
        { src: venue2_960, width: 960 },
        { src: venue2_1280, width: 1280 },
      ],
      4032,
      3024,
    ),
    captionEl: "Βραδινή ατμόσφαιρα",
    captionEn: "Evening Vibes",
  },
  {
    id: "venue-3",
    image: createAsset(
      [
        { src: venue3_320, width: 320 },
        { src: venue3_640, width: 640 },
        { src: venue3_960, width: 960 },
        { src: venue3_1280, width: 1280 },
      ],
      3024,
      4032,
    ),
    captionEl: "Ηλιοβασίλεμα στη Γαλησσά",
    captionEn: "Galissas Sunset",
  },
  {
    id: "venue-4",
    image: createAsset(
      [
        { src: venue4_320, width: 320 },
        { src: venue4_640, width: 640 },
        { src: venue4_960, width: 960 },
      ],
      1024,
      768,
    ),
    captionEl: "Λεπτομέρεια από το Galissea",
    captionEn: "A detail from Galissea",
  },
];

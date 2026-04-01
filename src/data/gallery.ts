import venue1 from "@/assets/gallery/venue-1.jpeg";
import venue2 from "@/assets/gallery/venue-2.jpeg";
import venue3 from "@/assets/gallery/venue-3.jpeg";

export interface GalleryImage {
  src: string;
  captionEl: string;
  captionEn: string;
}

export const galleryData: GalleryImage[] = [
  { src: venue1, captionEl: "Η θέα μας", captionEn: "Our View" },
  { src: venue2, captionEl: "Βραδινή ατμόσφαιρα", captionEn: "Evening Vibes" },
  {
    src: venue3,
    captionEl: "Ηλιοβασίλεμα στη Γαλησσά",
    captionEn: "Galissas Sunset",
  },
];

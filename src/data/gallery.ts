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

const galleryImageModules = import.meta.glob<string>(
  "../assets/gallery/optimized/*_photo*-*.webp",
  { eager: true, import: "default" },
);

const gallerySources = [
  {
    id: "restaurant-photo-1",
    stem: "restaurant_photo1",
    width: 1086,
    height: 1448,
    altIndex: 1,
  },
  {
    id: "crepe-photo-2",
    stem: "crepe_photo2",
    width: 1086,
    height: 1448,
    altIndex: 2,
  },
  {
    id: "pancake-photo-3",
    stem: "Pancake_photo3",
    width: 1086,
    height: 1448,
    altIndex: 3,
  },
  {
    id: "burger-photo-4",
    stem: "burger_photo4",
    width: 1086,
    height: 1448,
    altIndex: 4,
  },
  {
    id: "margarita-photo-5",
    stem: "margarita_photo5",
    width: 1086,
    height: 1448,
    altIndex: 5,
  },
  {
    id: "waffle-photo-6",
    stem: "waffle_photo6",
    width: 1086,
    height: 1448,
    altIndex: 6,
  },
  {
    id: "pizza-photo-7",
    stem: "pizza_photo7",
    width: 1254,
    height: 1254,
    altIndex: 7,
  },
  {
    id: "apperol-photo-8",
    stem: "apperol_photo8",
    width: 1086,
    height: 1448,
    altIndex: 8,
  },
] as const;

const variantPattern = /\/([^/]+)-(\d+)\.webp$/;

const variantsByStem = Object.entries(galleryImageModules).reduce(
  (variantsByStem, [path, src]) => {
    const match = variantPattern.exec(path);
    if (!match) return variantsByStem;

    const [, stem, width] = match;
    const variants = variantsByStem.get(stem) ?? [];
    variants.push({ src, width: Number(width) });
    variantsByStem.set(stem, variants);

    return variantsByStem;
  },
  new Map<string, ResponsiveVariant[]>(),
);

const toSrcSet = (variants: ResponsiveVariant[]) =>
  variants.map((variant) => `${variant.src} ${variant.width}w`).join(", ");

const getVariants = (stem: string) => {
  const variants = variantsByStem.get(stem);
  if (!variants?.length) {
    throw new Error(`Missing optimized gallery variants for ${stem}`);
  }

  return [...variants].sort((a, b) => a.width - b.width);
};

const createAsset = (
  stem: string,
  width: number,
  height: number,
): GalleryImageAsset => {
  const variants = getVariants(stem);
  const largestVariant = variants[variants.length - 1];

  return {
    src: largestVariant.src,
    srcSet: toSrcSet(variants),
    width,
    height,
  };
};

const createAltText = (index: number) => ({
  captionEl: ``,
  captionEn: ``,
});

export const galleryData: GalleryImage[] = gallerySources.map((source) => ({
  id: source.id,
  image: createAsset(source.stem, source.width, source.height),
  ...createAltText(source.altIndex),
}));

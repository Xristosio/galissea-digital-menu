from __future__ import annotations

import fnmatch
import re
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageOps


@dataclass(frozen=True)
class GallerySource:
    path: Path
    photo_number: int


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "src" / "assets" / "gallery"
OUTPUT_DIR = SOURCE_DIR / "optimized"
SOURCE_PATTERN = "*_photo*.png"
PHOTO_NUMBER_RE = re.compile(r"_photo(\d+)", re.IGNORECASE)
WIDTHS = (320, 640, 960, 1280)
QUALITY = 80
WEBP_OPTIONS = {
    "format": "WEBP",
    "quality": QUALITY,
    "method": 6,
    "optimize": True,
}


def find_sources() -> list[GallerySource]:
    sources: list[GallerySource] = []

    for path in SOURCE_DIR.iterdir():
        if not path.is_file() or not fnmatch.fnmatch(path.name.lower(), SOURCE_PATTERN):
            continue

        match = PHOTO_NUMBER_RE.search(path.stem)
        if not match:
            continue

        sources.append(GallerySource(path=path, photo_number=int(match.group(1))))

    return sorted(
        sources,
        key=lambda source: (source.photo_number, source.path.stem.lower()),
    )


def clear_generated_webp() -> int:
    if not OUTPUT_DIR.exists():
        return 0

    removed = 0
    for path in OUTPUT_DIR.glob("*.webp"):
        path.unlink()
        removed += 1
    return removed


def flatten_transparency(image: Image.Image) -> Image.Image:
    image = ImageOps.exif_transpose(image)
    has_alpha = image.mode in ("RGBA", "LA") or (
        image.mode == "P" and "transparency" in image.info
    )

    if not has_alpha:
        return image.convert("RGB")

    rgba = image.convert("RGBA")
    background = Image.new("RGBA", rgba.size, (255, 255, 255, 255))
    background.alpha_composite(rgba)
    return background.convert("RGB")


def optimize_one(source: GallerySource) -> list[Path]:
    with Image.open(source.path) as input_image:
        image = flatten_transparency(input_image)
        original_width, original_height = image.size

        generated: list[Path] = []
        for width in WIDTHS:
            if width > original_width:
                continue

            height = int(round(original_height * (width / original_width)))
            resized = image.resize((width, height), Image.Resampling.LANCZOS)
            output_path = OUTPUT_DIR / f"{source.path.stem}-{width}.webp"
            resized.save(output_path, **WEBP_OPTIONS)
            generated.append(output_path)

    return generated


def main() -> None:
    sources = find_sources()
    if not sources:
        raise SystemExit(f"No source images found in {SOURCE_DIR} matching {SOURCE_PATTERN}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    removed = clear_generated_webp()

    written: list[Path] = []
    for source in sources:
        written.extend(optimize_one(source))

    total_bytes = sum(path.stat().st_size for path in written)
    print(f"Found {len(sources)} source images in {SOURCE_DIR}")
    print(f"Removed {removed} stale WebP files from {OUTPUT_DIR}")
    print(f"Generated {len(written)} WebP files in {OUTPUT_DIR}")
    print(f"Total size: {total_bytes / 1024:.1f} KB")
    for path in written:
        print(f"- {path.relative_to(ROOT)} ({path.stat().st_size / 1024:.1f} KB)")


if __name__ == "__main__":
    main()

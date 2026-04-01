from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageOps


@dataclass(frozen=True)
class GallerySource:
    filename: str
    widths: tuple[int, ...]


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "src" / "assets" / "gallery"
OUTPUT_DIR = SOURCE_DIR / "optimized"
QUALITY = 78

SOURCES: tuple[GallerySource, ...] = (
    GallerySource("venue-1.jpeg", (320, 640, 960, 1280)),
    GallerySource("venue-2.jpeg", (320, 640, 960, 1280)),
    GallerySource("venue-3.jpeg", (320, 640, 960, 1280)),
    GallerySource("venue-4.jpg", (320, 640, 960)),
)


def optimize_one(source: GallerySource) -> list[Path]:
    input_path = SOURCE_DIR / source.filename
    stem = Path(source.filename).stem

    with Image.open(input_path) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        original_width, original_height = image.size

        generated: list[Path] = []
        for width in source.widths:
            if width > original_width:
                continue

            height = int(round(original_height * (width / original_width)))
            resized = image.resize((width, height), Image.Resampling.LANCZOS)
            output_path = OUTPUT_DIR / f"{stem}-{width}.webp"
            resized.save(
                output_path,
                format="WEBP",
                quality=QUALITY,
                method=6,
                optimize=True,
            )
            generated.append(output_path)

    return generated


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    written: list[Path] = []
    for source in SOURCES:
        written.extend(optimize_one(source))

    total_bytes = sum(path.stat().st_size for path in written)
    print(f"Generated {len(written)} files in {OUTPUT_DIR}")
    print(f"Total size: {total_bytes / 1024:.1f} KB")
    for path in written:
        print(f"- {path.relative_to(ROOT)} ({path.stat().st_size / 1024:.1f} KB)")


if __name__ == "__main__":
    main()

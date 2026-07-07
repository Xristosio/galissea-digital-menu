import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const galleryDataPath = path.join(root, "src", "data", "gallery.ts");
const galleryDir = path.join(root, "src", "assets", "gallery");
const optimizedDir = path.join(galleryDir, "optimized");
const expectedWidths = [320, 640, 960, 1280];

const errors = [];

const toPosix = (value) => value.split(path.sep).join("/");
const relativeToRoot = (value) => toPosix(path.relative(root, value));

const readDirectoryFiles = (dir) =>
  readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);

const fail = (message) => {
  errors.push(message);
};

const readPngSize = (filePath) => {
  const buffer = readFileSync(filePath);
  const isPng =
    buffer.length >= 24 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47;

  if (!isPng) {
    fail(`${relativeToRoot(filePath)} is not a valid PNG file.`);
    return null;
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
};

const parseGallerySources = (contents) => {
  const blockMatch = contents.match(
    /const gallerySources = \[([\s\S]*?)\] as const;/,
  );
  if (!blockMatch) {
    fail("Could not find gallerySources in src/data/gallery.ts.");
    return [];
  }

  return [...blockMatch[1].matchAll(/\{([^}]+)\}/g)].map((entryMatch) => {
    const entry = entryMatch[1];
    const getString = (name) =>
      entry.match(new RegExp(`${name}:\\s*"([^"]+)"`))?.[1];
    const getNumber = (name) => {
      const value = entry.match(new RegExp(`${name}:\\s*(\\d+)`))?.[1];
      return value ? Number(value) : undefined;
    };

    return {
      id: getString("id"),
      stem: getString("stem"),
      width: getNumber("width"),
      height: getNumber("height"),
      altIndex: getNumber("altIndex"),
    };
  });
};

const assertGitTracked = (filePath) => {
  const relativePath = relativeToRoot(filePath);

  try {
    execFileSync("git", ["ls-files", "--error-unmatch", relativePath], {
      cwd: root,
      stdio: "ignore",
    });
  } catch {
    fail(`${relativePath} is not tracked by git.`);
  }
};

const assertNoCaseDuplicates = (filenames, context) => {
  const seen = new Map();

  for (const filename of filenames) {
    const lower = filename.toLowerCase();
    const existing = seen.get(lower);
    if (existing && existing !== filename) {
      fail(
        `${context} contains case-conflicting files: ${existing} and ${filename}.`,
      );
    }
    seen.set(lower, filename);
  }
};

const galleryContents = readFileSync(galleryDataPath, "utf8");

for (const pattern of ["venue-", "/src/assets"]) {
  if (galleryContents.includes(pattern)) {
    fail(`src/data/gallery.ts contains stale or production-unsafe path: ${pattern}`);
  }
}

if (!galleryContents.includes("import.meta.glob")) {
  fail("src/data/gallery.ts should use Vite-safe import.meta.glob for gallery assets.");
}

const configuredSources = parseGallerySources(galleryContents);
const configuredStems = new Set();

for (const source of configuredSources) {
  for (const key of ["id", "stem", "width", "height", "altIndex"]) {
    if (source[key] === undefined) {
      fail(`A gallerySources entry is missing ${key}.`);
    }
  }

  if (source.stem) {
    if (configuredStems.has(source.stem)) {
      fail(`Duplicate gallery stem in src/data/gallery.ts: ${source.stem}`);
    }
    configuredStems.add(source.stem);
  }
}

const sourceFiles = readDirectoryFiles(galleryDir).filter((filename) =>
  /_photo\d+\.png$/i.test(filename),
);
const optimizedFiles = readDirectoryFiles(optimizedDir).filter((filename) =>
  filename.endsWith(".webp"),
);

assertNoCaseDuplicates(sourceFiles, "src/assets/gallery");
assertNoCaseDuplicates(optimizedFiles, "src/assets/gallery/optimized");

for (const filename of sourceFiles) {
  assertGitTracked(path.join(galleryDir, filename));
}

for (const filename of optimizedFiles) {
  assertGitTracked(path.join(optimizedDir, filename));
}

const sourceByStem = new Map(
  sourceFiles.map((filename) => [path.parse(filename).name, filename]),
);

for (const stem of sourceByStem.keys()) {
  if (!configuredStems.has(stem)) {
    fail(`Source image ${stem}.png is not referenced in src/data/gallery.ts.`);
  }
}

for (const stem of configuredStems) {
  const sourceFilename = sourceByStem.get(stem);
  if (!sourceFilename) {
    fail(`Configured gallery stem has no exact-case source PNG: ${stem}`);
    continue;
  }

  const sourcePath = path.join(galleryDir, sourceFilename);
  const size = readPngSize(sourcePath);
  if (!size) continue;

  const sourceConfig = configuredSources.find((source) => source.stem === stem);
  if (sourceConfig?.width !== size.width || sourceConfig.height !== size.height) {
    fail(
      `${relativeToRoot(sourcePath)} is ${size.width}x${size.height}, but gallery.ts declares ${sourceConfig?.width}x${sourceConfig?.height}.`,
    );
  }

  const widthsForSource = expectedWidths.filter((width) => width <= size.width);
  for (const width of widthsForSource) {
    const optimizedPath = path.join(optimizedDir, `${stem}-${width}.webp`);
    if (!existsSync(optimizedPath)) {
      fail(`Missing optimized gallery image: ${relativeToRoot(optimizedPath)}`);
    }
  }
}

for (const filename of optimizedFiles) {
  if (filename.startsWith("venue-")) {
    fail(`Stale venue gallery asset found: ${relativeToRoot(path.join(optimizedDir, filename))}`);
    continue;
  }

  const match = filename.match(/^(.+)-(\d+)\.webp$/);
  if (!match) {
    fail(`Optimized gallery file has unexpected name: ${filename}`);
    continue;
  }

  const [, stem, widthValue] = match;
  const sourceFilename = sourceByStem.get(stem);
  if (!sourceFilename) {
    fail(`Optimized gallery file has no exact-case source PNG: ${filename}`);
    continue;
  }

  const size = readPngSize(path.join(galleryDir, sourceFilename));
  if (!size) continue;

  const width = Number(widthValue);
  if (!expectedWidths.includes(width)) {
    fail(`Optimized gallery file has unexpected width ${width}: ${filename}`);
  }
  if (width > size.width) {
    fail(`Optimized gallery file upscales ${sourceFilename}: ${filename}`);
  }
}

if (errors.length) {
  console.error("Gallery asset check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `Gallery asset check passed: ${sourceFiles.length} sources, ${optimizedFiles.length} optimized WebP files.`,
);

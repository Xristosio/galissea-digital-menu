import type { Page } from "@playwright/test";
import { expect, test } from "../playwright-fixture";

const scrollThroughPage = async (page: Page) => {
  await page.evaluate(async () => {
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const step = Math.max(Math.floor(window.innerHeight * 0.7), 280);

    for (let y = 0; y <= document.documentElement.scrollHeight + step; y += step) {
      window.scrollTo(0, y);
      await wait(120);
    }
  });
};

const scrollGalleryStrip = async (page: Page) => {
  await page.evaluate(async () => {
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    for (const scroller of document.querySelectorAll<HTMLElement>(
      "#gallery .overflow-x-auto",
    )) {
      for (let x = 0; x <= scroller.scrollWidth; x += 180) {
        scroller.scrollLeft = x;
        await wait(120);
      }
    }
  });
};

const expectLoadedImages = async (page: Page) => {
  await scrollThroughPage(page);
  await scrollGalleryStrip(page);

  const unloadedImages = await page.evaluate(() =>
    [...document.images]
      .filter((image) => image.naturalWidth <= 0)
      .map((image) => image.currentSrc || image.src),
  );

  expect(unloadedImages).toEqual([]);
};

test.describe("production smoke", () => {
  test("homepage and English route load without broken visible images", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));

    await page.goto("/");
    await expect(page.locator("h1")).toHaveText("Galissea");
    await expectLoadedImages(page);

    await page.goto("/en/");
    await expect(page.locator("h1")).toHaveText("Galissea");
    await expectLoadedImages(page);

    expect(consoleErrors).toEqual([]);
  });

  test("gallery opens as an accessible dialog", async ({ page }) => {
    await page.goto("/en/");
    await page.locator("#gallery").scrollIntoViewIfNeeded();

    await page.locator("#gallery button").first().click();

    const dialog = page.locator('[role="dialog"][aria-modal="true"]');
    const closeButton = page.getByRole("button", { name: "Close image" });

    await expect(dialog).toBeVisible();
    await expect(closeButton).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(closeButton).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  });
});

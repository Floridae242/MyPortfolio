import { test, expect } from '@playwright/test';

for (const width of [320, 768, 1024, 1440]) {
  test(`home @ ${width}px has no horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(overflow).toBe(false);
    await expect(page).toHaveScreenshot(`home-${width}.png`, { fullPage: false, maxDiffPixelRatio: 0.02 });
  });
}

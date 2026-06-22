import { test, expect } from '@playwright/test';

test('home hero loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText(/Naruephon Yotmao/)).toBeVisible();
});

test('projects render and a case study opens', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.bento .glass-card').first()).toBeVisible();
  await page.locator('.bento a').first().click();
  await expect(page).toHaveURL(/\/case\//);
});

test('admin gateway exposes the CMS link', async ({ page }) => {
  await page.goto('/admin');
  await expect(page.getByRole('link', { name: /enter cms/i })).toHaveAttribute('href', '/admin.html');
});

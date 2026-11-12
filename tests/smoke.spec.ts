import { expect, test } from '@playwright/test';

test('home page loads with the company name', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/ASILI Engineering Solutions/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('ASILI');
});

test('home page has no horizontal scroll', async ({ page }) => {
  await page.goto('/');
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

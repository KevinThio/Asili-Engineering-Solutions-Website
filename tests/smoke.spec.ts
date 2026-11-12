import { expect, test } from '@playwright/test';

// Every page loads with a unique title and doesn't scroll sideways.
const PAGES = [
  { path: '/', title: /ASILI Engineering Solutions/ },
  { path: '/about', title: /^About & Services · ASILI/ },
];

for (const { path, title } of PAGES) {
  test(`${path} loads with its title and one main heading`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  });

  test(`${path} has no horizontal scroll`, async ({ page }) => {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

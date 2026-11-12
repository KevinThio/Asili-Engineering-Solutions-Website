import { expect, test } from '@playwright/test';

// The shared layout (header, footer, Call/WhatsApp bar) on every page.
const PAGES = ['/', '/about', '/enquiry', '/thanks'];

for (const path of PAGES) {
  test(`${path} has the header, footer and contact links`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole('link', { name: /ASILI Engineering Solutions Limited, home/ })).toBeVisible();
    await expect(page.locator('footer')).toContainText('ASILI Engineering Solutions Limited');

    // Call and WhatsApp are one tap away on every screen size
    const call = page.locator('a[href="tel:+254792961341"]:visible').first();
    const whatsapp = page.locator('a[href="https://wa.me/254792961341"]:visible').first();
    await expect(call).toBeVisible();
    await expect(whatsapp).toBeVisible();
  });
}

test('contact bar is fixed at the bottom on phones only', async ({ page, isMobile }) => {
  await page.goto('/');
  const bar = page.locator('.site-contactbar');
  if (isMobile) {
    await expect(bar).toBeVisible();
    const box = await bar.boundingBox();
    const viewport = page.viewportSize()!;
    expect(Math.round(box!.y + box!.height)).toBe(viewport.height);
  } else {
    await expect(bar).toBeHidden();
  }
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('phone menu opens and links to every page', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'The menu button is the phone layout');
    await page.goto('/');
    await page.getByLabel('Menu').click();
    const menu = page.locator('.a-header__drop');
    await expect(menu.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(menu.getByRole('link', { name: 'About & Services' })).toHaveAttribute('href', '/about');
    await expect(menu.getByRole('link', { name: 'Send an enquiry' })).toHaveAttribute('href', '/enquiry');
  });
});

test('all tap targets in the contact bar are at least 48px', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Phone layout only');
  await page.goto('/');
  for (const link of await page.locator('.site-contactbar a').all()) {
    const box = await link.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(48);
  }
});

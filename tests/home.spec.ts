import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('shows the main message', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Power you can rely on. Sized right, tested before handover.');
});

test('main actions are in the first screen', async ({ page }) => {
  const hero = page.locator('.hero');
  const whatsapp = hero.getByRole('link', { name: 'WhatsApp us' });
  const enquiry = hero.getByRole('link', { name: 'Send an enquiry' });
  await expect(whatsapp).toHaveAttribute('href', 'https://wa.me/254792961341');
  await expect(enquiry).toHaveAttribute('href', '/enquiry');
  await expect(whatsapp).toBeInViewport();
  await expect(enquiry).toBeInViewport();
});

test('shows the three kinds of electrical work, linking to About & Services', async ({ page }) => {
  for (const [name, href] of [['Farms', '/about#farms'], ['Homes', '/about#homes'], ['Businesses', '/about#businesses']]) {
    const card = page.locator('a.a-service', { has: page.getByRole('heading', { name, exact: true }) });
    await expect(card).toHaveAttribute('href', href);
  }
});

test('mentions websites and mobile apps', async ({ page }) => {
  await expect(page.getByText('We also build websites and mobile apps.')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Ask about a website or app' })).toHaveAttribute('href', '/enquiry?service=digital');
});

test('only one sun-yellow button is on screen at a time', async ({ page }) => {
  // AGENTS.md §6. The hero and the closing panel each have one, never in view together.
  const visiblePrimaries = async () =>
    page.locator('.a-btn--primary').evaluateAll(els =>
      els.filter(e => {
        const r = e.getBoundingClientRect();
        return r.bottom > 0 && r.top < innerHeight && getComputedStyle(e).display !== 'none';
      }).length);
  expect(await visiblePrimaries()).toBeLessThanOrEqual(1);
  await page.locator('.closing').scrollIntoViewIfNeeded();
  expect(await visiblePrimaries()).toBeLessThanOrEqual(1);
});

test('hero photo frame never shows a stock image', async ({ page }) => {
  // Until ASILI's own job photo is added, the frame says so.
  const frame = page.locator('.hero .a-photo');
  const img = frame.locator('img.a-photo__img');
  if (await img.count()) await expect(img).toHaveAttribute('alt', /.+/);
  else await expect(frame).toContainText('No photos uploaded yet');
});

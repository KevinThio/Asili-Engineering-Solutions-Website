import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/about');
});

test('says who ASILI is and its qualifications', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Engineers who size it, protect it and test it.');
  await expect(page.getByText('EPRA licensed electrical engineers')).toBeVisible();
  await expect(page.getByText('EBK registered engineers')).toBeVisible();
});

test('lists each service, each asking about it on the enquiry form', async ({ page }) => {
  const services = [
    ['farms', 'Solar for farms', 'farm'],
    ['homes', 'Homes', 'home'],
    ['businesses', 'Commercial and industrial', 'commercial'],
    ['websites', 'Websites and mobile apps', 'digital'],
  ];
  for (const [id, title, service] of services) {
    const slot = page.locator(`#${id}`);
    await expect(slot.getByRole('heading', { name: title })).toBeVisible();
    await expect(slot.getByRole('link')).toHaveAttribute('href', `/enquiry?service=${service}`);
  }
});

test('shows how ASILI works in four steps', async ({ page }) => {
  const steps = page.locator('.a-steps__title');
  await expect(steps).toHaveText(['Design', 'Install', 'Test', 'Commission']);
});

test('completed projects: newest six, or "coming soon" when there are none', async ({ page }) => {
  const section = page.locator('section.projects');
  await expect(section.getByRole('heading', { name: 'Our recent work' })).toBeVisible();
  const cards = section.locator('.a-project');
  const count = await cards.count();
  expect(count).toBeLessThanOrEqual(6);
  if (count === 0) {
    await expect(section.getByText('Photos of our recent work are coming soon')).toBeVisible();
    await expect(section.getByRole('link', { name: 'WhatsApp us' })).toHaveAttribute('href', 'https://wa.me/254792961341');
  } else {
    // A card without a photo says so; never a stock or placeholder image
    for (const card of await cards.all()) {
      if (!(await card.locator('img.a-project__img').count())) await expect(card).toContainText('No photos uploaded yet');
    }
  }
});

test('home page service links land on the matching service', async ({ page }) => {
  for (const id of ['farms', 'homes', 'businesses']) {
    await page.goto(`/about#${id}`);
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
});

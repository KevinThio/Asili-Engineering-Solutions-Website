import { expect, test } from '@playwright/test';

const PAGES = ['/', '/about', '/enquiry', '/thanks', '/404'];

for (const path of PAGES) {
  test(`${path} breaks no Content Security Policy rule`, async ({ page }) => {
    const violations: string[] = [];
    page.on('console', m => { if (/Content Security Policy/i.test(m.text())) violations.push(m.text()); });
    await page.goto(path, { waitUntil: 'networkidle' });
    expect(violations).toEqual([]);
  });
}

test('every page has a unique title and description', async ({ page }) => {
  const seen = new Map<string, string>();
  for (const path of ['/', '/about', '/enquiry']) {
    await page.goto(path);
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description?.length).toBeGreaterThan(50);
    expect(seen.has(title)).toBe(false);
    seen.set(title, path);
  }
});

test('structured data describes ASILI as a local business with its main branch', async ({ page }) => {
  await page.goto('/');
  const json = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}');
  expect(json['@type']).toBe('Electrician');
  expect(json.address.addressLocality).toBe('Gilgil');
  expect(json.address.addressRegion).toBe('Nakuru County');
  expect(json.areaServed.map((a: { name: string }) => a.name)).toEqual(['Nairobi', 'Nakuru', 'Eldoret']);
  expect(json.telephone).toBe('+254792961341');
});

test('the thank-you and 404 pages stay out of search results', async ({ page }) => {
  for (const path of ['/thanks', '/404']) {
    await page.goto(path);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  }
});

test('the main pages can be indexed', async ({ page }) => {
  for (const path of ['/', '/about', '/enquiry']) {
    await page.goto(path);
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  }
});

test('robots.txt keeps search engines out of the editor', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Disallow: /admin/');
});

import { expect, test, type Page } from '@playwright/test';

// There is no Netlify locally: answer the form POST as Netlify would.
async function fakeNetlify(page: Page) {
  const posts: string[] = [];
  await page.route('**/*', async route => {
    const req = route.request();
    if (req.method() !== 'POST') return route.fallback();
    posts.push(req.postData() ?? '');
    // Netlify stores the submission, then serves the form's action page
    if (new URL(req.url()).pathname === '/thanks') return route.continue({ method: 'GET', postData: undefined });
    return route.fulfill({ status: 200, body: 'ok' });
  });
  return posts;
}

async function fillValid(page: Page) {
  await page.getByText('Farm', { exact: true }).click();
  await page.getByLabel('2. Your name').fill('Wanjiku');
  await page.getByLabel('3. Phone number').fill('0712 345 678');
  await page.getByLabel('4. Tell us about the problem').fill('My 1 hp pump needs solar. The borehole is 60 m deep.');
}

test.describe('with JavaScript', () => {
  test('empty submit shows errors', async ({ page }) => {
    await page.goto('/enquiry');
    await page.getByRole('button', { name: 'Send enquiry' }).click();

    await expect(page.getByRole('alert').filter({ hasText: 'Something is missing' })).toBeVisible();
    await expect(page.getByText('Something is missing: choose a service')).toBeVisible();
    await expect(page.getByLabel('2. Your name')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByLabel('2. Your name')).toHaveAccessibleDescription(/Something is missing: your name/);
    await expect(page.getByLabel('3. Phone number')).toHaveAccessibleDescription(/Check this field: enter a full phone number/);
    await expect(page.getByLabel('4. Tell us about the problem')).toHaveAccessibleDescription(/Something is missing: tell us a little about it/);
    await expect(page).toHaveURL(/\/enquiry$/);
  });

  test('a short phone number is caught, and the message clears once fixed', async ({ page }) => {
    await page.goto('/enquiry');
    await fillValid(page);
    const phone = page.getByLabel('3. Phone number');
    await phone.fill('0712');
    await page.getByRole('button', { name: 'Send enquiry' }).click();
    await expect(phone).toHaveAttribute('aria-invalid', 'true');

    await phone.fill('0712 345 678');
    await phone.blur();
    await expect(phone).not.toHaveAttribute('aria-invalid');
    await expect(phone).toHaveAccessibleDescription('We will call you on this number');
  });

  test('valid submit reaches "We received your enquiry"', async ({ page }) => {
    const posts = await fakeNetlify(page);
    await page.goto('/enquiry');
    await fillValid(page);
    await page.getByRole('button', { name: 'Send enquiry' }).click();

    await expect(page).toHaveURL(/\/thanks$/);
    await expect(page.getByRole('status').filter({ hasText: 'We received your enquiry' })).toBeVisible();
    const sent = new URLSearchParams(posts[0]);
    expect(sent.get('form-name')).toBe('enquiry');
    expect(sent.get('service')).toBe('farm');
    expect(sent.get('name')).toBe('Wanjiku');
    expect(sent.get('phone')).toBe('0712 345 678');
  });

  test('a failed send says so and offers Call and WhatsApp', async ({ page }) => {
    await page.route('**/', route => (route.request().method() === 'POST' ? route.abort() : route.fallback()));
    await page.goto('/enquiry');
    await fillValid(page);
    await page.getByRole('button', { name: 'Send enquiry' }).click();
    await expect(page.getByText('Your enquiry was not sent')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send enquiry' })).toBeEnabled();
  });

  test('a link can choose the service', async ({ page }) => {
    await page.goto('/enquiry?service=digital');
    await expect(page.locator('input[name="service"][value="digital"]')).toBeChecked();
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('is a real Netlify form', async ({ page }) => {
    await page.goto('/enquiry');
    const form = page.locator('form[name="enquiry"]');
    await expect(form).toHaveAttribute('data-netlify', 'true');
    await expect(form).toHaveAttribute('netlify-honeypot', 'bot-field');
    await expect(form).toHaveAttribute('method', 'POST');
    await expect(form.locator('input[name="form-name"]')).toHaveValue('enquiry');
  });

  test('empty submit is stopped by the browser', async ({ page }) => {
    await page.goto('/enquiry');
    await page.getByRole('button', { name: 'Send enquiry' }).click();
    await expect(page).toHaveURL(/\/enquiry$/);
    expect(await page.locator('form[name="enquiry"]').evaluate((f: HTMLFormElement) => f.checkValidity())).toBe(false);
  });

  test('valid submit reaches "We received your enquiry"', async ({ page }) => {
    const posts = await fakeNetlify(page);
    await page.goto('/enquiry');
    await fillValid(page);
    await page.getByRole('button', { name: 'Send enquiry' }).click();
    await expect(page).toHaveURL(/\/thanks$/);
    await expect(page.getByText('We received your enquiry').first()).toBeVisible();
    expect(new URLSearchParams(posts[0]).get('problem')).toContain('borehole');
  });
});

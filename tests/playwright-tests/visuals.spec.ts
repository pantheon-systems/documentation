import { test, expect } from '@playwright/test';

test('home page', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Accept Cookies').click();
  await expect(page).toHaveScreenshot('homepage.png', { fullPage: true });
});


test('Get Started - Landing Page', async ({ page }) => {
  await page.goto('/get-started/');
  await page.getByText('Accept Cookies').click();
  await expect(page).toHaveScreenshot('get-started.png', { fullPage: true });
});


test('Release Notes - Category Listing', async ({ page }) => {
  await page.goto('/release-notes/policy');
  await page.getByText('Accept Cookies').click();
  await expect(page).toHaveScreenshot('release-notes--category.png', { fullPage: true });
});

test('Release Notes - Single Entry', async ({ page }) => {
  await page.goto('/release-notes/2024/05/new-relic-agent-update-released');
  await page.getByText('Accept Cookies').click();
  await expect(page).toHaveScreenshot('release-notes--single-entry.png', { fullPage: true });
});

test('Terminus Manual - Single Page', async ({ page }) => {
  await page.goto('/terminus/install');
  await page.getByText('Accept Cookies').click();
  await expect(page).toHaveScreenshot('terminus-install.png', { fullPage: true });
});

test('Terminus Manual - Single Command', async ({ page }) => {
  await page.goto('/terminus/commands/completion');
  await page.getByText('Accept Cookies').click();
  await expect(page).toHaveScreenshot('terminus-single-command.png', { fullPage: true });
});

test('Certification Landing Page', async ({ page }) => {
  await page.goto('/certification');
  await page.getByText('Accept Cookies').click();
  await expect(page).toHaveScreenshot('certification-landing-page.png', { fullPage: true });
});

test('Glossary', async ({ page }) => {
  await page.goto('/glossary');
  await page.getByText('Accept Cookies').click();
  await expect(page).toHaveScreenshot('glossary.png', { fullPage: true });
});


test('certification---study-guide', async ({ page }) => {
  await page.goto('/certification/study-guide');
  await page.getByText('Accept Cookies').click();
  await expect(page.locator('#toc')).toBeVisible();
  await expect(page).toHaveScreenshot('certification---study-guide.png', { fullPage: true } );
});

test('drupal-cron', async ({ page }) => {
  await page.goto('/drupal-cron');
  await page.getByText('Accept Cookies').click();
  await expect(page.locator('#toc')).toBeVisible();
  await expect(page).toHaveScreenshot('drupal-cron.png', { fullPage: true });
});

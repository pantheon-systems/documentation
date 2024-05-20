import { test, expect } from '@playwright/test';

test('home page', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Accept Cookies').click();
  await expect(page).toHaveScreenshot('homepage.png', { fullPage: true });
});

test('kill-mysql-queries', async ({ page }) => {
  await page.goto('/guides/mariadb-mysql/kill-mysql-queries');
  await page.getByText('Accept Cookies').click();
  await expect(page.locator('#toc')).toBeVisible();
  await expect(page).toHaveScreenshot('guides---mariadb-mysql---kill-mysql-queries.png', { fullPage: true });
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

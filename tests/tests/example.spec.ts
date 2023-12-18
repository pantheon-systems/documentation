import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://pr-8804-documentation.appa.pantheon.site/release-notes');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Pantheon Release Notes/);
});
/*
test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
*/

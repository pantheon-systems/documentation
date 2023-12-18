import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/release-notes');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Pantheon Release Notes/);
});

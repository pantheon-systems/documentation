import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/certification');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Certification Program/);

  /* @todo, add a test of Searching */
});

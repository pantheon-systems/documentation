import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/certification');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Certification Program/);

  /* @todo, add a test of Searching */
});

test('Use Search Form', async ({ page }) => {
  await page.goto('/');
  // Enter the word "Terminus" into the search box.
  await page.fill('#searchform input', 'Terminus');
  // Submit the form
  await page.press('#searchform input', 'Enter');
  // Check that the page contains "Introduction | Terminus Guide | Pantheon Docs"
//
  //const searchResults = page.getByTestId('h3 a').nth(0);

  // const searchResults = page.getByClassName('search-results').nth(0);
  // await expect(searchResults).toHaveText('Terminus Platform Support');

const firstResult = await page.locator('h3 a')
    .filter({ hasText: "Terminus Platform Support" }) //orderID in variable
    //.getByRole('span', { hasText: 'Queued' })


  await firstResult.click();

  // check that the current path is guides/platform-considerations/terminus-platform
  // ignore the base URL.
//  await expect(page).toHaveURL('https://docs.pantheon.io/guides/platform-considerations/terminus-platform');
// check that the current path contains guides/platform-considerations/terminus-platform
  await expect(page).toHaveURL(/guides\/platform-considerations\/terminus-platform/);


});

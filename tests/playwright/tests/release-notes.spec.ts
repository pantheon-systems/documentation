import { test, expect } from '@playwright/test';

// Confirm that the filters on release notes work as expected.
// 1. Confirm that going straight to a filtered URL works.
// https://docs.pantheon.io/release-notes/1/?category=deprecated
// "New Relic REST API V2 key retirement" is the first deprecated note.
// todo, make that test less flaky
// 2. Confirm that going straight to a URL with two fitlers works with an AND filter.

// Filter UI
// 1. click one category.
// 2. click two categories
// 3. click three categories

// Pagination


test('Direct navigation to single category returns the expected value', async ({ page }) => {
  // Navigate to the specified URL
  await page.goto('/release-notes/1/?category=deprecated');
  const expectedString = 'New Relic REST API V2 key retirement';

  const h2s1 = await page.locator('h2').allTextContents();
  expect(h2s1.some(text => text.includes(expectedString))).toBeTruthy();
});

test('Direct navigation to single category returns the expected value - 2', async ({ page }) => {
  await page.goto('/release-notes/1/?category=action-required');
  const expectedString = 'New Object Cache Pro recommended config constant (2.0)';
  const h2s1 = await page.locator('h2').allTextContents();
  expect(h2s1.some(text => text.includes(expectedString))).toBeTruthy();
});

test('Direct navigation to single category returns the expected value - 3', async ({ page }) => {
  await page.goto('/release-notes/1/?category=policy');
  const expectedString = 'Overage charges temporarily waived';
  const h2s1 = await page.locator('h2').allTextContents();
  expect(h2s1.some(text => text.includes(expectedString))).toBeTruthy();
});


// verify that categories are persisted when using pagination links
test('Direct navigation to paginated category page contains expected release note', async ({ page }) => {
  await page.goto('/release-notes/2?category=drupal');
  const expectedString = 'Drush 5 and 7 are no longer available';
  const h2s1 = await page.locator('h2').allTextContents();
  expect(h2s1.some(text => text.includes(expectedString))).toBeTruthy();
});


// verify that categories are persisted when using pagination links
test('clicking pagination works when already filtered by a category', async ({ page }) => {
  await page.goto('/release-notes/1?category=drupal');
  await page.getByRole('button', { name: '2', exact: true }).click();
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL('/release-notes/2?category=drupal');

  const expectedString = 'Drush 5 and 7 are no longer available';
  const h2s1 = await page.locator('h2').allTextContents();
  expect(h2s1.some(text => text.includes(expectedString))).toBeTruthy();
});

// verify that categories are persisted when using pagination links with two categories
// todo



// click filter for one category. and then another to confirm OR filtering.
test('Clicking filters produces an OR filter', async ({ page }) => {
  await page.goto('/release-notes/1');

// Click the input with the name "policy"
  await page.getByRole('button', { name: 'Filter by category' }).first().click();
  await page.waitForTimeout(500);

  await page.check('#Policy');

  await page.goto('/release-notes/1?category=policy');

  await expect(page).toHaveURL('/release-notes/1?category=policy');

  const expectedPolicyHeadline = 'Overage charges temporarily waived';
  // This test could be less flaky by check for something in the middle and not the first item on the page.
  const h2s1 = await page.locator('main h2').allTextContents();
  expect(h2s1.some(text => text.includes(expectedPolicyHeadline))).toBeTruthy();

  const expectedModulesHeadline = "Pantheon Plugins and Modules Now PHP 8.4 Compatible";
  // Todo, why is that sleep needed?
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Filter by category' }).first().click();
  // check if filter button is exists. If it exists. click it.
  if (await page.locator('#Modules').count() === 0) {
    await page.getByRole('button', { name: 'Filter by category' }).first().click();
  }

  // Todo, why is that sleep needed?
  await page.waitForTimeout(2000);
  await page.check('#Modules');


  await expect(page).toHaveURL('/release-notes/1?category=policy&category=modules');
  // This test could be less flaky by check for something in the middle and not the first item on the page.
  const h2s2 = await page.locator('h2').allTextContents();
  expect(h2s2.some(text => text.includes(expectedModulesHeadline))).toBeTruthy();
});


/* Full text search is not working.
We may just wait until release notes are implemented in Content Publisher.
https://github.com/pantheon-systems/documentation-in-nextjs/issues/177
test('Direct navigation to a text search yields a result', async ({ page }) => {
  // Navigate to the specified URL
  await page.goto('/release-notes/1/?query=solr');

  // wait for in-browser search to complete
  await page.waitForTimeout(3000);


  // This test will fail when more solr notes are added. Need a better way to do this.
  const expectedHeadline = 'Solr 3 support for Drupal 9.4+ sites ending December 9, 2025';

  const h2s1 = await page.locator('h2').allTextContents();
  expect(h2s1.some(text => text.includes(expectedHeadline))).toBeTruthy();
});


// Entering a search term in the search box and getting expected results.
// pagination with search terms preserved.

*/

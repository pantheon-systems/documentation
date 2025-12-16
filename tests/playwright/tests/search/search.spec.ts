import { test, expect, Request } from '@playwright/test';

// Todo: delete this mucking of the modal.
// https://github.com/pantheon-systems/documentation-in-nextjs/issues/155
test.beforeEach(async ({ page }) => {
  // if this text appears "This website is hosted in a sandbox environment."
  // then the staging interstitial modal is showing up and blocking the tests.
  // so click "Continue"

  // 1. Set localStorage before the page loads any scripts
  await page.addInitScript(() => {
    const storageKey = 'stagingBannerDismissed';
    const timestamp = new Date().getTime().toString();
    localStorage.setItem(storageKey, timestamp);

    // add a cookie called "Deterrence-Bypass" with value "1"
    document.cookie = "Deterrence-Bypass=1; path=/;";
  });

  // 2. Inject a CSS style tag to hide the parent of .pds-modal
  // The ':has(> .pds-modal)' selector finds any element that has .pds-modal as a direct child
  await page.addStyleTag({
    content: `
      *:has(> .pds-modal) {
        display: none !important;
      }
      /* Fallback: hide the modal itself just in case */
      .pds-modal {
        display: none !important;
      }
    `
  });
});

test('searching from homepage redirects to search page and shows expected result', async ({ page }) => {
  await page.goto('/');

// In the field with id "search", type "support" and press Enter
  await page.fill('#search.pds-text-input__input', 'support policy');
  await page.press('#search.pds-text-input__input', 'Enter');

  await expect(page).toHaveURL('/search?search=support%20policy');

  await page.waitForSelector('#results .addsearch-searchresults');

  const expectedPolicyHeadline = ' Overages Policy | Traffic | Pantheon Docs';
  const h3s1 = await page.locator('h3').allTextContents();
  expect(h3s1.some(text => text.includes(expectedPolicyHeadline))).toBeTruthy();
});

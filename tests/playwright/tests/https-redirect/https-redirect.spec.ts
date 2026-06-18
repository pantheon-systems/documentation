import { test, expect } from '@playwright/test';

// This test verifies that HTTP requests are correctly redirected to HTTPS.
// It was added in https://github.com/pantheon-systems/documentation-in-nextjs/pull/163

const TEST_PATH = '/platform';

test('should redirect from HTTP to HTTPS for a given path', async ({ page }) => {
  const response = await page.goto(TEST_PATH);

  // 2. Check the response status for the *final* request.
  // Although the initial request might return a 301/302, Playwright follows the redirect
  // and the final status should be 200 (OK) on the HTTPS page.
  expect(response?.status()).toBe(200);

  // 3. Validate the URL of the *final* loaded page.
  // The final URL should use 'https://' and have the correct path.
  const expectedFinalURL = `https://${new URL(page.url()).host}${TEST_PATH}`;
  expect(page.url()).toBe(expectedFinalURL);

  // 4. (Optional but recommended) Check the request chain for the redirect.
  // This verifies that the redirect happened exactly as expected (e.g., a 301 status).
  // Playwright's Response object has a 'request' that can be traced back.
  const initialRequest = response?.request().redirectedFrom();
  expect(initialRequest, 'Initial request must exist').toBeDefined();

  // The first request in the chain is the one that triggered the redirect.
  const initialResponse = await initialRequest!.response();

  // Check the initial HTTP request URL
  expect(initialRequest?.url()).toContain(`http://`);
  expect(initialRequest?.url()).toContain(TEST_PATH);

  // The status code for the initial response should be 301 (Moved Permanently)
  // or 302/307 (Found/Temporary Redirect) depending on your server's setup.
  // Use a specific status code if you know it, otherwise check the range.
  expect(initialResponse?.status(), 'Initial response status should be a redirect code').toBe(301);

  console.log(`Successfully verified redirect from ${initialRequest?.url()} to ${page.url()}`);
});

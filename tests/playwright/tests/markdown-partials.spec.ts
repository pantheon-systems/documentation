import { test, expect } from '@playwright/test';

// Many of the markdown pages in docs contain "partials" that are
// trasclude markdown snippets referenced by filename using MDX.
// For example is ssh-keys.md is <Partial file="host-keys.md" />
// In development of these site, we've seen issues with partials not loading
// at all or loading the wrong content. This test ensures that

test('ssh-key loads host keys', async ({ page }) => {
  await page.goto('/ssh-keys#troubleshooting');

  // Expect a title "to contain" a substring.
  await expect(page.getByRole('heading', { name: 'Troubleshooting' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Authenticity & Fingerprint Prompts' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '"Connection to server closed by remote host" returned by long-running CLI operations' })).toBeVisible();
});


test('drush partial loads only once', async ({ page }) => {
  await page.goto('/guides/drush/drush-versions#compatibility-and-requirements');


  await expect(page.getByRole('heading', { name: 'Compatibility and Requirements' })).toBeVisible();
  // Sometimes this partial loads twice due to a bug. Ensure it only loads once
  // by counting the number of times this text appears.
  const drushText = 'See the Drush Drupal Compatibility chart for version compatibility information.';
  const matches = await page.locator(`text=${drushText}`).all();
  expect(matches).toHaveLength(1);
  await expect(page.getByText(drushText)).toBeVisible();
});

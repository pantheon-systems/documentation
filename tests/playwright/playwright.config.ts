import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });


const TEST_BASE_URL = process.env.PLAYWRIGHT_DOMAIN
  ? 'https://' + process.env.PLAYWRIGHT_DOMAIN
  : 'http://localhost:3002';
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  timeout: 10000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    video: {
      mode: 'on',
      size: {
        width: 1800,
        height: 3200,
      },
    },
    viewport: {
      width: 1800,
      height: 3200,
    },
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: TEST_BASE_URL,
    // https://docs.pantheon.io/guides/account-mgmt/plans/site-plans#bypassing-the-interstitial-page-with-an-http-header-during-automated-testing
    extraHTTPHeaders: {
      'Deterrence-Bypass': '1',
    },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'default',
       use: { ...devices['Desktop Chrome'],
        viewport: { width: 1800, height: 3200 },
       },
      testIgnore: [
        '**/tests/https-redirect/**',
        '**/tests/search/**',
      ],
    },
    // search breaks if the HTP header is set for requests to the addsearch domain.
    {
      name: 'search',
      testDir: './tests/search',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1800, height: 3200 },
        extraHTTPHeaders: {},
      },
    },

    // Separate project to test HTTP to HTTPS redirects
    {
      name: 'http-redirect-test',
      // The key is to override the baseURL for this project to use HTTP
      testDir: './tests/https-redirect',
      use: {
        baseURL: `http://${process.env.PLAYWRIGHT_DOMAIN}`,
        ...devices['Desktop Chrome'],
      },
    },


    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

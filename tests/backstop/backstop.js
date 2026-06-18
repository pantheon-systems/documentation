'use strict';

const BackstopReferenceBaseUrl = process.env.REFERENCE_BASE_URL;
const BackstopTestUrl = process.env.DEPLOYED_BASE_URL;

const pathsToTest = [
  '/',
  '/get-started',
  '/ssh-keys',
  '/guides/platform-considerations/terminus-platform',
  '/develop',
  '/guides/build-tools/custom-theme',
  '/go-live',
  '/guides/launch/advanced-curls',
  '/platform',
  '/guides/multisite/search-replace',
  '/guides/account-mgmt',
  '/guides/wordpress-google-sso/access-and-mappings',
  '/terminus',
  '/guides/drush/drush-versions',
  '/support',
  '/modules-known-issues',
  '/guides/security',
  '/guides/secrets/troubleshooting',
  '/learning',
  '/certification/study-guide/people',
  '/contribute',
  '/roadmap',
  '/release-notes/1',

  // Example of overriding a value for a specific path
  {
    path: '/glossary',
    label: 'The glossary page is slow to load',
    delay: 9000,
  },
  // The style guide page is proving too flaky for VRT.
  // {
  //   path: '/style-guide',
  //   label: 'The style guide page is slow to load',
  //   delay: 25000,
  //   readySelector: '.style-example',
  // }
];

// 2. Define a base scenario with all the common properties.
const baseScenario = {
  // cookiePath: 'backstop_data/engine_scripts/cookies.json',
  readyEvent: '',
  readySelector: '',
  // This delay is extremely high.
  // todo: make a more robust wait to ensure the page is loaded.
  delay: 25000,
  hideSelectors: [],
  removeSelectors: [
    '.landing-page__video-background',
    // It shouldn't be necessary to specify so many wistia wrappers
    // but the outmost one doesn't seem to reliably suppress display.
    '.wistia_container',
    '.wistia_responsive_padding',
    '.wistia_responsive_wrapper',
    '.wistia_embed'
  ],
  hoverSelector: '',
  clickSelector: '',
  postInteractionWait: 0,
  selectors: [],
  selectorExpansion: true,
  expect: 0,
  misMatchThreshold: 0.1,
  // Sometimes a screenshot has extra whitespace at the bottom.
  // and that's ok.
  requireSameDimensions: false,
  ignoreDimensions: true
};

// 3. Generate the scenarios array dynamically.
const scenarios = pathsToTest.map(testCase => {
  const path = typeof testCase === 'string' ? testCase : testCase.path;
  const scenarioOverrides = typeof testCase === 'object' ? testCase : {};

  return {
    ...baseScenario, // Start with the base configuration
    ...scenarioOverrides, // Apply any path-specific overrides
    label: scenarioOverrides.label || path, // Use custom label or the path itself
    url: `${BackstopTestUrl}${path}`,
    referenceUrl: `${BackstopReferenceBaseUrl}${path}`
  };
});

const config = {
  id: 'backstop_default',
  viewports: [
    // {
    //   label: 'phone',
    //   width: 320,
    //   height: 480
    // },
    {
      label: 'desktop',
      width: 1600,
      height: 900
    }
  ],
  onBeforeScript: 'puppet/onBefore.js',
  // onReadyScript: 'puppet/onReady.js',
  scenarios: scenarios,
  paths: {
    bitmaps_reference: 'backstop_data/bitmaps_reference',
    bitmaps_test: 'backstop_data/bitmaps_test',
    engine_scripts: 'backstop_data/engine_scripts',
    html_report: 'backstop_data/html_report',
    ci_report: 'backstop_data/ci_report'
  },
  report: ['browser'],
  engine: 'puppeteer',
  engineOptions: {
    args: ['--no-sandbox']
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false
};

module.exports = config;

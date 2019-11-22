 
// Node CLI for Lighthouse https://www.npmjs.com/package/lighthouse#using-the-node-cli
const lighthouse = require("lighthouse");

// Launch Chrome from node
const chromeLauncher = require("chrome-launcher");

const fs = require('fs');

const lighthouseConstants = require("./lighthouse-constants");

if (!fs.existsSync(lighthouseConstants.lighthouseDataDir)) {
  fs.mkdirSync(lighthouseConstants.lighthouseDataDir);
}

const devURL = lighthouseConstants.getDevURL();
const referenceURL = lighthouseConstants.getReferenceURL();

const DEVTOOLS_RTT_ADJUSTMENT_FACTOR = 3.75;
const DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR = 0.9;
const throttling = {
  DEVTOOLS_RTT_ADJUSTMENT_FACTOR,
  DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
  mobile3G: {
    rttMs: 150,
    throughputKbps: 1.6 * 1024,
    requestLatencyMs: 150 * DEVTOOLS_RTT_ADJUSTMENT_FACTOR,
    downloadThroughputKbps: 1.6 * 1024 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
    uploadThroughputKbps: 750 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
    cpuSlowdownMultiplier: 4,
  },
};

const launchChromeAndRunLighthouse = (
    url,
    opts = {
      //chromeFlags: ['--headless'],
    },
    config = {
      extends: 'lighthouse:default',
      settings: {
        output: ['html'],
        emulatedFormFactor: 'mobile',
        skipAudits: ['is-crawlable'],
        throttling: throttling.mobile3G,
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']
      },
    }
  ) =>
  chromeLauncher.launch({
    chromeFlags: opts.chromeFlags
  }).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results =>
      chrome.kill().then(() => results)
    );
  });


console.log(`Running Lighthouse audit on ${devURL}`);
launchChromeAndRunLighthouse(devURL).then(
  (results) => {
    let data = JSON.stringify(results, 0, 4);
    fs.writeFileSync(lighthouseConstants.devJSONFile, data);
    fs.writeFileSync(
      lighthouseConstants.devHTMLFile,
      results.report[0]
    );

    console.log(`Running Lighthouse audit on ${referenceURL}`);
    launchChromeAndRunLighthouse(referenceURL).then(
      (results) => {
        let data = JSON.stringify(results, 0, 4);
        fs.writeFileSync(lighthouseConstants.referenceJSONFile, data);
        fs.writeFileSync(
          lighthouseConstants.referenceHTMLFile,
          results.report[0]
        );
        process.exit(0);
      });
  });

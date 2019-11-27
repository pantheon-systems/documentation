 
// Node CLI for Lighthouse https://www.npmjs.com/package/lighthouse#using-the-node-cli
const lighthouse = require("lighthouse");

// Configuration defined in lighthouse-config.js
const config = require("./lighthouse-config.js")

// Launch Chrome from node
const chromeLauncher = require("chrome-launcher");

// To interact with the filesystem.
const fs = require('fs');

// Project Constants
const lighthouseConstants = require("./lighthouse-constants.js");

// Create the data directory if it doesn't exist.
if (!fs.existsSync(lighthouseConstants.lighthouseDataDir)) {
  fs.mkdirSync(lighthouseConstants.lighthouseDataDir);
}

// Import constants from lighthouse-constants.
const devURL = lighthouseConstants.getDevURL();
const referenceURL = lighthouseConstants.getReferenceURL();

// Define Process of launching Chrome and running Lighthouse
const launchChromeAndRunLighthouse = ( url, opts = {}, config ) =>
  chromeLauncher.launch().then(chrome => {
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

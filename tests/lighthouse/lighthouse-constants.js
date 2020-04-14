const rootPath = process.cwd();
const lighthouseDataDir = `${rootPath}/lighthouse_data/`;

module.exports = {

    // Root path is where npm run commands happen
    rootPath: rootPath,
    lighthouseDataDir: lighthouseDataDir,
    devJSONFile: `${lighthouseDataDir}/lighthouse-audit-dev.json`,
    devHTMLFile: `${lighthouseDataDir}/lighthouse-audit-dev.html`,
    referenceJSONFile: `${lighthouseDataDir}/lighthouse-audit-reference.json`,
    referenceHTMLFile: `${lighthouseDataDir}/lighthouse-audit-reference.html`,

    getDevURL: () => {
        let devURL;
        devURL = "https://" +  process.env.TERMINUS_ENV + "--" + process.env.TERMINUS_SITE + ".my.pantheonfrontend.website/docs";
        return devURL;
    },

    getReferenceURL: () => {
        let referenceURL;
        referenceURL = "https://pantheon.io/docs/";
        return referenceURL;
    },

}


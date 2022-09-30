const fs = require('fs');

const Octokit = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

/* leave out lighthouse

const lighthouseConstants = require("./lighthouse-constants");

const devData = JSON.parse(fs.readFileSync(lighthouseConstants.devJSONFile));
const referenceData = JSON.parse(fs.readFileSync(lighthouseConstants.referenceJSONFile));

const devPerformanceScore = (devData.lhr.categories.performance.score * 100);
const livePerformanceScore = (referenceData.lhr.categories.performance.score * 100);
const devBestPracticeScore = (devData.lhr.categories['best-practices'].score * 100);
const liveBestPracticeScore = (referenceData.lhr.categories['best-practices'].score * 100);
const devSeoScore = (devData.lhr.categories.seo.score * 100);
const liveSeoScore = (referenceData.lhr.categories.seo.score * 100);
const devAccessibilityScore = (devData.lhr.categories.accessibility.score * 100);
const liveAccessibilityScore = (referenceData.lhr.categories.accessibility.score * 100);

const devReportURL = `${process.env.ARTIFACTS_DIR_URL}/lighthouse_data/lighthouse-audit-dev.html`;
const liveReportURL = `${process.env.ARTIFACTS_DIR_URL}/lighthouse_data/lighthouse-audit-reference.html`;

function round(v) {
  return (v >= 0 || -1) * Math.round(Math.abs(v));
}

const scoresToReport = [
  {
    description: "Performance Score",
    dev: devPerformanceScore,
    live: livePerformanceScore,
    difference: round(devPerformanceScore - livePerformanceScore)
  },
  {
    description: "Best Practice Score",
    dev: devBestPracticeScore,
    live: liveBestPracticeScore,
    difference: round(devBestPracticeScore - liveBestPracticeScore)
  },
  {
    description: "SEO Score",
    dev: devSeoScore,
    live: liveSeoScore,
    difference: round(devSeoScore - liveSeoScore)
  },
  {
    description: "Accessibility Score",
    dev: devAccessibilityScore,
    live: liveAccessibilityScore,
    difference: round(devAccessibilityScore - liveAccessibilityScore)
  },
];
end remove lighthouse scoring */

module.exports = {
  getDevURL: () => {
    let devURL;
    devURL = "https://" +  process.env.TERMINUS_ENV + "--" + process.env.TERMINUS_SITE + ".my.pantheonfrontend.website/docs";
    return devURL;
  },
};

let pullRequestMessage = `
PR message placeholder 1;`

pullRequestMessage += `
PR message placeholder 2;`

pullRequestMessage += `

[Preview Environment](${getDevURL()})
`;

/*
async function getPullRequestLighthouseComments() {
  let response;
  try {
    response = await octokit.issues.listComments({
      owner: process.env.CI_PROJECT_USERNAME,
      repo: process.env.CI_PROJECT_REPONAME,
      issue_number: process.env.PR_NUMBER,
      per_page: 100
    });
  } catch (err) {
    console.log(err);
  }

  return response.data.filter((commentObj) => {
    return (
      commentObj.body.includes("lighthouse_data") &&
      commentObj.body.toLowerCase().includes("lighthouse audit results")
    );
  });
}
*/
async function deleteCommentOnPullRequest(commentID) {
  try {
    octokit.issues.deleteComment({
      owner: process.env.CI_PROJECT_USERNAME,
      repo: process.env.CI_PROJECT_REPONAME,
      comment_id: commentID
    });
  } catch (err) {
    console.log(err);
  }
}();
/*
(async () => {
  const lighthouseComments = await getPullRequestLighthouseComments();

  //console.log("lighthouseComments: ", lighthouseComments[0].id) //debugging

  lighthouseComments[0] ?

  await octokit.issues.updateComment({
    owner: process.env.CI_PROJECT_USERNAME,
    repo: process.env.CI_PROJECT_REPONAME,
    comment_id: lighthouseComments[0].id,
    body: pullRequestMessage
  })
  :
  await octokit.issues.createComment({
    owner: process.env.CI_PROJECT_USERNAME,
    repo: process.env.CI_PROJECT_REPONAME,
    issue_number: process.env.PR_NUMBER,
    body: pullRequestMessage
  });

  process.exit(0);
})();
*/
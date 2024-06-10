# Tests for Pantheon Documentation

This directory presently contains only a small amount of Playwright tests meant for locally checking for visual regression.
In the future we intend to expand this to include more comprehensive tests and to consolidate pre-existing stale tests like link checking.

## Checking for visual regression

For many changes to documentation we want to ensure that the changes do not introduce visual regressions.
We can do this by comparing screenshots of the live site to screenshots of a pull request preview or a local development site.
Running this suite against a pull request preview depends on the environment variable `GITHUB_PR_NUMBER` being set to the URL of the preview.
To set this variable for the current shell session, run `export GITHUB_PR_NUMBER=<PR_NUMBER>`, where `<PR_NUMBER>` is the number of the pull request.

* end-to-end:compare-pr-to-live`: This command will compare the PR preview to the live site. It is a wrapper around two other commands(`end-to-end:update-live-snapshots` and `end-to-end:pull-request-preview`) that you may wish to run separately for faster execution.
* end-to-end:update-live-snapshots`: This command runs the tests against the live site and updates the screenshot snapshots.
* `end-to-end:pull-request-preview`: This command runs the tests against the PR preview site.
* `end-to-end:local`: This command runs the tests against a local development site. It requires the Docs site to be running locally via `npm run develop` in the root directory.
* `end-to-end:compare-local-to-live`: Wraps both `end-to-end:update-live-snapshots` and `end-to-end:local` to compare the local site to the live site.




---
title: Build Tools
subtitle: Merge your Pull Request
buildtools: true
survey: true
anchorid: merge
generator: pagination
layout: guide
pagination:
    provider: data.buildtoolspages
use:
    - buildtoolspages
permalink: docs/guides/build-tools/merge/
previousurl: guides/build-tools/behat/
editpath: build-tools/10-merge.md
---
Once you have completed work on your Pull Request, it will be ready to merge back in to the master branch.

1.  Go to your GitHub project page, click on the **Pull requests** tab and open your Pull Request. Check if your tests have completed, and the test results are green If they haven't completed, just wait a few minutes. If they failed, go back and review the changes you made.

    ![Passed Pull Request](/source/docs/assets/images/pr-workflow/slogan-pr-passed.png)

2.  Once your tests have passed, and there is nothing else that you wish to add to this particular feature, click on the **Merge Pull Request**.

    When your Pull Request is merged, one more test run will be started to test the result of combining the code and configuration from your Pull Request with the master branch. Once this test passes, the configuration for your site will be applied to the dev environment, and your PR multidev environment will be deleted. Note that database content is not merged; make sure that you have exported your configuration before merging your Pull Request to ensure that configuration changes are not lost.

You may now use the [Pantheon dev / test / live workflow](https://pantheon.io/docs/pantheon-workflow/) to deploy your site as usual.

---
title: Build Tools
subtitle: Create a Pull Request
buildtools: true
anchorid: create-pr
generator: pagination
layout: guide
pagination:
    provider: data.buildtoolspages
use:
    - buildtoolspages
permalink: docs/guides/build-tools/create-pr/
nexturl: guides/build-tools/configure/
previousurl: guides/build-tools/create-project/
editpath: build-tools/03-create-pr.md
---
When using the Composer pull request workflow, you should never modify your dev environment. Always begin by creating a new pull request to work in. This can be done easily from GitHub, as described below. Presently, there is no way to create a pull request from the Pantheon dashboard.

1.  From your GitHub project page, click on the 'config' directory. Find the file named `system.site.yml`, click on it, and use the edit pencil to open an editor:

    ![system.site.yml Configuration](/source/docs/assets/images/pr-workflow/system-site-config.png)

2.  change the slogan to something inspiring:

    ![Edit slogan](/source/docs/assets/images/pr-workflow/edit-slogan.png)

3.  Once you are finished editing the configuration file, describe the change you made in the "Commit Changes" area. Then, click on the radio button to create a new branch and give it a short name, like `slogan`. Click on `Propose file change`:

    ![Create slogan branch](/source/docs/assets/images/pr-workflow/create-slogan-branch.png)

    Always select a unique branch name; the multidev environment created will be named after your branch. Since there is a limit to the number of characters that may be used in a Pantheon multidev name, your environments may conflict if you always use the branch name that GitHub suggests.

4.  On the pull request page, click on `Create pull request`.

    ![Slogan pull request](/source/docs/assets/images/pr-workflow/slogan-pull-request.png)

    As soon as you commit your change to a new branch, CircleCI builds a new multidev environment and begins installing a site that you can use to preview the change. Once the multidev environment has been created, the build script will add a comment to the commit with links to the dashboard panel for the environment, and to the test site created on Pantheon. The pull request page conveniently shows the messages from each commit on the branch:

    ![Passed pull request](/source/docs/assets/images/pr-workflow/slogan-pr-starting.png)

5.  Click on the **Visit Site** button and you will be brought to the test site. You can log on to the admin account for this site using the password you provided to the `build-env:create-project` command. Note that the slogan you entered in your pull request branch has been imported and is therefore visible in the site header.

    ![Site initial login](/source/docs/assets/images/pr-workflow/pr-slogan-site.png)

    This site will persist for as long as the pull request remains open.

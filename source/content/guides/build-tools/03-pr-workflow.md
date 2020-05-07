---
title: Build Tools
subtitle: Pull Request/Merge Request Workflow
description: In step three of the Build Tools guide, learn how to use pull requests as part of your workflow.
buildtools: true
anchorid: pr-workflow
type: guide
permalink: docs/guides/build-tools/pr-workflow/
editpath: build-tools/03-pr-workflow.md
image: buildToolsGuide-thumb
---

## Pull Request/Merge Request Introduction

This section demonstrates the Build Tools project workflow by making a code change on a Git feature branch and opening a pull request (GitHub) or merge request (GitLab) to accept that change into the `master` branch.

As a reminder, these examples use GitHub as the code repository with CircleCI as the CI. CircleCI builds the full site artifact and deploys it to the project's Pantheon site. Substitute the Git provider and CI below with the right ones for your project.

Branches with an associated pull request are built and deployed to a [Pantheon Multidev environment](/multidev), with the pull request number being used to construct the Multidev name. For example, pull request `12` will be deployed to a Pantheon Multidev named `pr-12`.

The `master` branch is automatically built and deployed to the Pantheon `dev` environment. This happens both when you commit code directly to the `master` branch and when a pull request is merged into the `master` branch.

![Continuous delivery diagram shows the Master branch going to Dev, and the PR going to a Multidev](../../../images/pr-workflow/github-circle-pantheon.png)

Deployments to the `test` and `live` environments on Pantheon must still be done manually, either through the Dashboard or via Terminus. For this reason, Continuous Delivery (CD) <Popover title="Continuous Delivery" content="Continuous Delivery is the practice of automatically deploying code all the way to production, without human intervention. This requires a consistently clear deployment pipeline from development to production. That is to say, an application must be able to deploy code to production at any given time regardless of current work in progress." /> is not enabled.

## Create a Pull Request

1. From your GitHub project page, click on the `config` directory. Select the file `system.site.yml` and click <span class="glyphicon glyphicon-pencil"></span> to open an editor:

  ![system.site.yml file open in GitHub](../../../images/pr-workflow/system-site-config.png)

1. Change the slogan to something inspiring:

  ![Slogan edited to say 'Making the world amazing'](../../../images/pr-workflow/edit-slogan.png)

1. Scroll down and enter a message describing this change in the **Commit changes** area. Then click on the radio button to create a **new branch** and give it a short name, like `slogan`. Click **Propose file change**:

  ![Create 'slogan' branch](../../../images/pr-workflow/create-slogan-branch.png)

1. Click **Create Pull Request**:

  ![Slogan Pull Request](../../../images/pr-workflow/slogan-pull-request.png)

  <Accordion title="Builds" id="understand-builds" icon="watch">

  As soon as you commit changes to a feature branch, CircleCI builds a new Multidev environment on Pantheon to preview the change. Once the Multidev environment has been created, the build script will add a comment to the commit with links to the Multidev environment of the Pantheon Site Dashboard and a button to visit the Multidev site URL (e.g., `pr-1-my-pantheon-project.pantheonsite.io`). The Pull Request page conveniently shows the messages from each commit on the branch:

  ![Passed Pull Request has 'Visit Site' button](../../../images/pr-workflow/slogan-pr-starting.png)

  ### Automated Tests

  It is also common to set up automated tests to confirm that the project is working as expected; when tests are available, GitHub will run them and display the results of the tests with the pull request. Working on projects with comprehensive tests increases the development team's confidence that submitted pull requests will work correctly when they are integrated into the main build.

  </Accordion>

1. Wait for the build on CircleCI to leave a comment, then click on the **Visit Site** button to access the Multidev site URL. Note that the slogan you entered in your pull request branch has been imported and is visible in the site header:

    ![Site initial login](../../../images/pr-workflow/pr-slogan-site.png)

    This Multidev environment will persist for as long as the pull request remains open in GitHub.

1. Enter the `admin` username and password you created in the `build-env:create-project` command. Click **Log in** to access the admin interface:

  ![Site admin log in](../../../images/pr-workflow/admin-log-in.png)

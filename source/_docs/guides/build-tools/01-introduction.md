---
title: Build Tools
subtitle: Introduction
description: Create a site that manages its files using Composer, and uses a GitHub PR workflow with Behat tests run via Circle CI.
tags: [automate]
contributors:
  - greg-1-anderson
  - stevector
layout: guide
type: guide
anchorid: build-tools
buildtools: true
generator: pagination
pagination:
    provider: data.buildtoolspages
use:
    - buildtoolspages
permalink: docs/guides/build-tools/
nexturl: guides/build-tools/create-project/
editpath: build-tools/01-introduction.md
completiontime: 1 hour
---
This guide describes how to use GitHub and Circle CI with Composer to implement a collaborative, team-based Continuous Integration workflow using pull requests for a Drupal 8 site on Pantheon.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">If you are considering adopting a Composer workflow, start by [learning the fundamentals](/docs/composer/) and identifying which of the two workflows best meets your use case ([Source and Artifact](/docs/composer/#source-and-artifact-workflow) or [Custom Upstream](/docs/composer/#custom-upstream-workflow)).</p>
</div>

<div class="enablement">
 <a href="https://pantheon.io/agencies/learn-pantheon?docs"><h4 class="info">Get DevOps Training</h4></a>
 <p>Optimize your dev team and streamline internal workflows. Pantheon delivers custom workshops to help development teams master our platform and improve their internal DevOps.</p>
 </div>

*Pull requests* are a formalized way of reviewing and merging a proposed set of changes to a codebase. When one member of a development team makes changes to a project, all of the files modified to produce the feature are committed to a separate branch, and that branch becomes the basis for the pull request. GitHub allows other team members to review all of the differences between the new files and their original versions, before *merging* the pull request.

In the workflow set up in this guide, a multidev environment is created for each pull request branch. Work in these environments can also be committed back to the same branch for review on GitHub. When done, the result is merged into the dev environment.

![Multidev PR workflow](/source/docs/assets/images/pr-workflow/multidev-git-pr-workflow.png)

It is also common to set up automated tests to confirm that the project is working as expected; when tests are available, GitHub will run them and display the results of the tests with the pull request. Working on projects with comprehensive tests increases the development team's confidence that submitted pull requests will work correctly when they are integrated into the main build.

When using GitHub and Composer to manage a Drupal site, only those files unique to the project are part of the project's main repository. Composer is used to fetch the external code needed by the project; a process running on CircleCI executes Composer, and ensures that the final composed build results are installed on Pantheon:

![Artifact Deployment](/source/docs/assets/images/artifact-deployment.png)

One advantage of managing code this way is that it keeps the change sets (differences) for pull requests as small as possible. If a pull request upgrades several external projects, only the external dependency metadata file will change; the actual code changes in the upgraded projects themselves are not shown.

Generally, use of Composer is optional; however, some Drupal modules, such as the Address module require the use of Composer. If a site needs just one module that requires Composer, then it should manage all of its modules with Composer.

## Before You Begin

1.  To prepare your system for local development, install:

    - [Composer](https://getcomposer.org).
    - [Terminus](/docs/terminus/install/).
    - The [Terminus Composer Plugin](https://github.com/pantheon-systems/terminus-composer-plugin#installation).
    - The [Terminus Drupal Console Plugin](https://github.com/pantheon-systems/terminus-drupal-console-plugin#installation).
    - The [Terminus Build Tools Plugin](https://github.com/pantheon-systems/terminus-build-tools-plugin#installation).

    <br>
2.  Generate a [machine token](/docs/machine-tokens/) and [log in with Terminus](/docs/terminus/install/#authenticate).
3.  [Authorize CircleCI on Github](https://github.com/login/oauth/authorize?client_id=78a2ba87f071c28e65bb)

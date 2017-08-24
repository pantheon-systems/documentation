---
title: Composer Fundamentals and Workflows
description: Start with Composer basics then explore suggested workflows for WordPress and Drupal sites on Pantheon.
tags: [automation, workflow]
---
Composer is a PHP dependency manager that provides an alternative, more modern way to manage the external code used by a WordPress or Drupal site. At it's primary level, Composer needs:

- A list of dependencies
- A place to put the dependencies

Understanding how Composer can be used independent of Drupal or WordPress is a good place to learn more about the general concepts. For a summary of basic usage, see [Composer's own documentation](https://getcomposer.org/doc/01-basic-usage.md).

<div class="enablement">
  <a href="https://pantheon.io/agencies/learn-pantheon?docs"><h4 class="info">Automation Training</h4></a>
  <p>Master Composer concepts with help from our experts. Pantheon delivers custom workshops to help development teams master the platform and improve internal DevOps.</p>
</div>

## Dependencies
Composer encourages a mental model where code not written specifically for a given project is a dependency. Only files unique to the project are tracked as part of the project's main source repository, also referred to as the canonical site repository. Dependencies for WordPress and Drupal include core, plugins, contrib modules, themes, and libraries. A single dependency, such as a theme, is referred to as a package.

### Drupal and WordPress Package Repositories
By default, Composer can only see packages listed on [The PHP Package Repository](https://packagist.org/) which do not include Drupal or WordPress packages. Additional repositories must be configured for Composer to use packages not found in the default repository. Each framework provides it's own respective package repository so dependencies can be managed by Composer:

- WordPress: [https://wpackagist.org](https://wpackagist.org)
- Drupal 8: [https://packages.drupal.org/8](https://packages.drupal.org/8)
- Drupal 7: [https://packages.drupal.org/7](https://packages.drupal.org/7)

Site's created from Pantheon's example repositories will include the appropriate package repository within the `composer.json` file.

## Nested Docroot
The docroot is the directory from which your site is served. Without Composer, Pantheon defaults the docroot to the root directory of the site's codebase. In order to require core as a project dependency, a recommended best practice for Composer managed sites, it must be installed in a subdirectory like `web`. This is possible on Pantheon by specifying `web_docroot: true` in `pantheon.yml` file. For details, see [Serving Sites from the Web Subdirectory](/docs/nested-docroot/).

Here's a


## GitHub Pull Requests
Use GitHub and Circle CI with Composer to implement a collaborative, team-based Continuous Integration workflow using pull requests for a site on Pantheon.

<div class="flex-panel-group">
  <div class="flex-panel-item">
    <div class="flex-panel-body">
      <div class="flex-panel-title">
        <h4 class="info" style="margin-top:10px;font-size:larger">GitHub</h3>
        <div class="pantheon-official">
          <img alt="GitHub Logo" src="/source/docs/assets/images/github-logo.svg" class="main-topic-info__plugin-image" style="max-width:40px;margin-bottom:10px!important;">
          <p class="pantheon-official"></p>
        </div>
      </div>
      <p class="topic-info__description"><a href="https://github.org">GitHub</a> is an online service that provides cloud storage Git repositories that may be cloned and used locally, or edited directly through their web-based management interface. These features are very useful to teams collaborating on a project together.</p>
    </div>
  </div>
  <div class="flex-panel-item">
    <div class="flex-panel-body">
      <div class="flex-panel-title">
        <h4 class="info" style="margin-top:10px;font-size:larger">CircleCI</h3>
        <div class="pantheon-official">
          <img alt="CircleCI Logo" src="/source/docs/assets/images/circleci-logo.svg" class="main-topic-info__plugin-image" style="max-width:40px;margin-bottom:10px!important;">
          <p class="pantheon-official"></p>
        </div>
      </div>
      <p class="topic-info__description"><a href="https://circleci.com">CircleCI</a> provides hosted services to run automated tests for a project, and GitHub provides an integration to run these tests to whenever a change is submitted. The process of testing each set of changed files prior to merging them into the main branch is called continuous integration.</p>
    </div>
  </div>
</div>
### Source Repository and Artifact Deployment
Only files unique to the project are tracked as part of the project's main source repository on GitHub. Once a change is committed, CiricleCI uses Composer to compile requirements and deploy the entire site artifact to Pantheon (either on a Multidev or to Dev):

![Artifact Deployment](/source/docs/assets/images/artifact-deployment.png)

GitHub Pull requests (PRs) are a formalized way of reviewing and merging a proposed set of changes to a codebase. When one member of a development team makes changes to a project, all of the files modified to produce the feature are committed to a separate branch, and that branch becomes the basis for the pull request. GitHub allows other team members to review all of the differences between the new files and their original versions, before merging the PR to accept changes.

In this workflow, a [Multidev](/docs/multidev/) environment is created on Pantheon for each pull request branch on GitHub. Work in these environments can also be committed back to the same branch for review on GitHub. When a pull request is merged into the default branch on GitHub, the result is deployed to the Dev environment on Pantheon:

![Multidev PR workflow](/source/docs/assets/images/pr-workflow/github-pr-diagram.png)

### Automated Tests
It is also common to set up automated tests to confirm that the project is working as expected; when tests are available, GitHub will run them and display the results of the tests with the pull request. Working on projects with comprehensive tests increases the development team's confidence that submitted pull requests will work correctly when they are integrated into the main build.

## Custom Upstreams

## Terminology
Here are definitions for commonly used terms:

* **Upstream**: A repository that acts as a parent for another repository, like [Pantheon's WordPress Upstream](https://github.com/pantheon-systems/wordpress). The next two definitions are specific types of Upstreams.
* **Custom Upstream**: A repository restricted to members of an organization, containing a common codebase for new sites. This type of repository is a child repository to Pantheon's core upstreams ([WordPress](https://github.com/pantheon-systems/wordpress), [Drupal 8](https://github.com/pantheon-systems/drops-8), [Drupal 7](https://github.com/pantheon-systems/drops-7)) and acts as a parent for site level repositories.
* **Public Upstream**: A repository that is open to all Pantheon users which contains a common codebase for new sites, like [Panopoly](https://github.com/populist/panopoly-drops-7).
* **Repository**: A collection of files packaged in a single directory under version control.
* **Remote Repository**: A central version control location, e.g. residing on GitHub or BitBucket.
* **Upstream Updates**: Code changes that are made once in a parent (upstream) repository, then applied "downstream" to child repositories. This is how Pantheon's one-click updates work.
* **Site Repository**: Child repository where upstream updates are applied and site specific customizations are tracked, like your site's codebase on Pantheon.

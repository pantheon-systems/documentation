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
  <h4 class="info" markdown="1">[Automation Training](https://pantheon.io/agencies/learn-pantheon?docs){.external}</h4>
  <p>Master Composer concepts with help from our experts. Pantheon delivers custom workshops to help development teams master the platform and improve internal DevOps.</p>
</div>

## Dependencies
Composer encourages a mental model where code not written specifically for a given project is a dependency. Only files unique to the project are tracked as part of the project's main source repository, also referred to as the canonical site repository. Dependencies for WordPress and Drupal include core, plugins, contrib modules, themes, and libraries. A single dependency, such as a theme, is referred to as a package.

By default, Composer can only see packages listed on [The PHP Package Repository](https://packagist.org/) which do not include Drupal or WordPress packages. Additional repositories must be configured for Composer to use packages not found in the default repository. Each framework provides it's own respective package repository so dependencies can be managed with Composer:

- WordPress: [https://wpackagist.org](https://wpackagist.org)
- Drupal 8: [https://packages.drupal.org/8](https://packages.drupal.org/8)
- Drupal 7: [https://packages.drupal.org/7](https://packages.drupal.org/7)

Site's created from Pantheon's example repositories already include the appropriate package repository within the `composer.json` file.

## Nested Docroot
The docroot is the directory from which your site is served. Without Composer, Pantheon defaults the docroot to the root directory of the site's codebase. In order to require core as a project dependency, a recommended best practice for Composer managed sites, it must be installed in a subdirectory such as `web`.

This is possible on Pantheon by specifying `web_docroot: true` in `pantheon.yml` file. For details, see [Serving Sites from the Web Subdirectory](/docs/nested-docroot/).

## Source and Artifact Workflow
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

Only files unique to the project are tracked as part of the project's main "source" repository on GitHub, which requires an abstraction layer to compile dependencies and deploy an entire "artifact" to the site repository on Pantheon. The abstraction layer is facilitated by CirlceCI in the Pantheon maintained examples, but the principles are the same for other continuous integration service providers.

Composer is used to fetch dependencies declared by the project as part of a CircleCI build step. This ensures that the final composed build results are installed on Pantheon:

![Artifact Deployment](/source/docs/assets/images/artifact-deployment.png)

### GitHub Pull Requests
One advantage of managing code this way is that it keeps the change sets (differences) for pull requests as small as possible. If a pull request upgrades several dependencies, only the dependency metadata file will change; the actual code changes in the upgraded dependencies themselves are not shown.

GitHub pull requests (PRs) are a formalized way of reviewing and merging a proposed set of changes to the source repository. When one member of a development team makes changes to a project, all of the files modified to produce the feature are committed to a separate branch, and that branch becomes the basis for the pull request. GitHub allows other team members to review all of the differences between the new files and their original versions, before merging the PR to accept changes.

In this workflow, a [Multidev](/docs/multidev/) environment is created on Pantheon for each pull request branch on GitHub. Work in these environments can also be committed back to the same branch for review on GitHub. When a pull request is merged into the default branch on GitHub, the result is deployed to the Dev environment on Pantheon:

![Multidev PR workflow](/source/docs/assets/images/pr-workflow/github-circle-pantheon.png)

### Automated Tests

It is also common to set up automated tests to confirm that the project is working as expected; when tests are available, GitHub will run them and display the results of the tests with the pull request. Working on projects with comprehensive tests increases the development team's confidence that submitted pull requests will work correctly when they are integrated into the main build.

### Scaling Considerations
We recommend the "source" and "artifact" workflow for single site use cases, and for most use cases involving larger site portfolios such as EDUs. You can create a scaffold repository based off our example repositories and customize it to your liking, then use the scaffold to create new sites similar to how you would create the codebase for a [Custom Upstream](/docs/custom-upstream/).

However, unlike Custom Upstreams this method does not support one-click updates in the Site Dashboard. Adopting this workflow means forgoing all other update techniques in favor of Composer. If your use case requires an simpler update strategy for non-technical site admins, this workflow could present problems scaling or at the very least require additional training for your development team.

## Custom Upstream Workflow
It is possible to preserve the functionality of Pantheon's one-click updates in the Site Dashboard for Composer managed sites, however it's use case is quite narrow. Your scaffold repository based off our example repositories would need to commit all dependencies to the Custom Upstream repository. Updates via Composer would only happen at the Custom Upstream repository level, which would then trickle down to sites created from the Custom Upstream as one-click updates.

This workflow has one very serious shortcoming, that is site-specific dependencies are likely to cause a lot of conflicts. The practical use case for this workflow is for a large group of sites that require a single set of dependencies. You should only use this method if you don’t intend to use site specific themes, modules, or plugins downstream.

## Next Steps
Follow the [Build Tools Guide](/docs/guides/build-tools/) to create WordPress or Drupal sites managed by Composer based off Pantheon's example repositories.

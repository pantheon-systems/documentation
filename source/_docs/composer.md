---
title: Composer Fundamentals and Workflows
description: Start with Composer basics then explore suggested workflows for WordPress and Drupal sites on Pantheon.
tags: [automation, workflow]
---
Composer is a PHP dependency manager that provides an alternative, more modern way to manage the external code used by a WordPress or Drupal site. At it's primary level, Composer needs:

- A list of dependencies
- A place to put the dependencies

Understanding how Composer can be used independent of Drupal or WordPress is a good place to learn more about the general concepts. For a summary of basic usage, see [Composer's own documentation](https://getcomposer.org/doc/01-basic-usage.md){.external}.

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

## Managing Core as a Project Dependency
Sites managed with Composer should use the nested docroot feature, which allows core to be installed within the `web` subdirectory instead of the default root directory of the site's codebase. A nested docroot is the simplest path towards reliable core updates in a Composer workflow.

This is possible on Pantheon by specifying `web_docroot: true` in `pantheon.yml` file. For details, see [Serving Sites from the Web Subdirectory](/docs/nested-docroot/).

## Pull Request Workflow
In this workflow, a [Multidev](/docs/multidev/) environment is created on Pantheon for each pull request branch on GitHub. Work in these environments can also be committed back to the same branch for review on GitHub. When a pull request is merged into the default branch on GitHub, the result is deployed to the Dev environment on Pantheon:

![Multidev PR workflow](/source/docs/assets/images/pr-workflow/github-circle-pantheon.png)

### Scaling Considerations
We recommend the Pull Request workflow for single site use cases, and for most use cases involving larger site portfolios such as EDUs. You can create a "template" repository based off Pantheon's example repositories and customize it to your liking, then use the template to create new sites.

However, this method does not support One-click updates in the Site Dashboard. Adopting this workflow means forgoing all other update techniques in favor of Composer. If your use case requires a simpler update strategy for non-technical site admins, this workflow could present problems scaling or at the very least require additional training for your development team.

## Custom Upstream Workflow
It is possible to preserve the functionality of Pantheon's One-click updates in the Site Dashboard for Composer managed sites, however it's use case is quite narrow. A Custom Upstream based off Pantheon's example repositories would need to commit all dependencies. Updates via Composer would only happen at the Custom Upstream repository level by a single repository maintainer. Those updates would then trickle down to sites created from the Custom Upstream as One-click updates in the Pantheon Site Dashboard.

This workflow has one very serious shortcoming, that is site-specific dependencies are likely to cause a lot of conflicts. The practical use case for this workflow is for a large group of sites that require a single set of dependencies. You should only use this method if you don’t intend to use site specific themes, modules, or plugins downstream.

## Next Steps
Follow the [Build Tools Guide](/docs/guides/build-tools/) to start using Composer on Pantheon.

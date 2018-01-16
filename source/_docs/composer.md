---
title: Composer Fundamentals and Workflows
description: Start with Composer basics then explore suggested workflows for WordPress and Drupal sites on Pantheon.
tags: [automation, workflow]
searchboost: 150
---
{% include("content/composer-fundamentals.html")%}
<div class="alert alert-danger" role="alert">
  <h4 class="info">Warning</h4>
  <p markdown="1">
    Managing a Drupal 8 site with Composer is an all or nothing proposition. Our Drupal 8 upstream includes a `composer.json` and a fully built `/vendor` directory. When a site developer executes a `composer require anyone/anything:anyversion` within a site repository built from [drops-8](https://github.com/pantheon-systems/drops-8){.external}, this is effectively the same thing as [overwriting Drupal core](/docs/undo-commits/).
  </p>
  <p markdown="1">
    Once a site with a `composer.json` and `/vendor` directory has a dependency added downstream using Composer, Pantheon's upstream update process will cease to work alltogether. All future updates will contain conflicts which are very time consuming and error prone to remediate. If you are working on a site that requires custom Composer libraries or you want to begin managing site modules via Composer, you need to fully convert the repository to a Composer managed workflow, [switch the site upstream to a blank upstream](/docs/terminus/examples/#switch-upstreams), and cease using the dashboard upstream update feature.
  </p>
</div>
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
It is possible to preserve the functionality of Pantheon's One-click updates in the Site Dashboard for Composer managed sites created from a [Custom Upstream](/docs/custom-upstream/), however its use case is quite narrow.

A Custom Upstream based off Pantheon's example repositories would need to commit all dependencies. Updates via Composer would only happen at the Custom Upstream repository level by a single repository maintainer. Those updates would then trickle down to sites created from the Custom Upstream as One-click updates in the Pantheon Site Dashboard.

This workflow has one very serious shortcoming, that is site-specific dependencies are likely to cause a lot of conflicts. The practical use case for this workflow is for a large group of sites that require a single set of dependencies. You should only use this method if you don’t intend to use site specific themes, modules, or plugins downstream.

## Next Steps
Follow the [Build Tools Guide](/docs/guides/build-tools/) to start using Composer on Pantheon.

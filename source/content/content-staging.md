---
title: Content Staging
description: Learn how to successfully stage and move content between environments in your WordPress or Drupal site.
categories: [webops]
contributors: [jrastaban, whitneymeredith]
tags: [content, workflow, webops]
---

Content staging workflow between test and live environments can be difficult to manage without introducing conflicts. The default workflow is for content to be created, staged, and published in the live environment (check out [WebOps workflow](/pantheon-workflow#content) for an explanation of why we do this). 

The default configuration doesn't work for some configurations. Review the sections below to find content staging solutions that match your current WordPress or Drupal configuration. Keep in mind that while these solutions have worked for others, they might not work for your specific configuration.

## Content Staging in WordPress

Most people find that using the standard [WordPress Draft / Publish workflow](https://wordpress.org/support/article/post-status/#workflow) meets their content needs. However, this workflow might not meet the needs of groups that require content to be staged in a non-live environment first. Content staging is a difficult process in WordPress because page content and configuration are often intertwined. There are a few common ways to accomplish this, depending on the workflow you want to use. 

The core challenge that the solutions below try to deal with is keeping the staging content version from becoming obsolete while the live environment’s content continues to change. The key to this challenge is finding a way to realign your staging content with your live content.

### Content Freeze

This solution requires low-level effort, but can be risky. Keep in mind that a content freeze solution only works if no changes are made to the live environment while the new content is being staged. If changes are made, for instance a new post was created or someone added a comment, then those changes are lost. This method should only be used for the simplest of sites.

1. Copy the live database into a staging environment. 

1. Work with your team to find a way to stop all changes from occurring on the site (this can be done by verbally asking people to not make updates or by revoking access). 

1. [Clone](/database-workflow#cloning-the-database) the staging environment to the live environment after the content is fully staged and approved.

### Staging Content with WP-CFM

The [WP-CFM plugin](https://wordpress.org/plugins/wp-cfm/) provides a simple solution for configuration management in code. WP-CFM is a good option if you want to deploy configuration changes without copying the entire database. This plugin exports the WordPress site configuration from the SQL database's wp_options table to a .json file stored in private/config. After deploying the file to a new environment for the same site, it can then import the configuration from the .json file into the second wp_options table. 

Learn how to install and use the [WordPress Configuration Management plugin](/wp-cfm) on your Pantheon WordPress site.

### Staging Content with WP Migrate DB Pro

Sites that don’t require data merging or conflict resolution can use [WP Migrate DB Pro](https://deliciousbrains.com/wp-migrate-db-pro/) to copy new media files and perform a partial MySQL database push with changes. This plugin works best when the live site remains largely unchanged during development cycles.

This plugin allows you to move specific database tables, so when changes are confined to specific database tables, this solution works really well.

### Staging Content Using Plugin Options

Some plugins have their own method for moving changes across environments, including the  [Advanced Custom Fields plugin](https://www.advancedcustomfields.com/). This plugin allows you to save your changes to a PHP or JSON format, and deploys your new content across stages as code changes instead of database changes. 

The [Elementor export kit](https://elementor.com/help/export-kit/) allows you to export content and add it to another environment. Be aware that IDs may change between environments, which might make targeting functions or CSS using those IDs problematic.

### Staging Content for Approvals

Publishing workflow plugins like [PublishPress](https://wordpress.org/plugins/publishpress/) or [Oasis Workflow](https://wordpress.org/plugins/oasis-workflow/) provide extra approval features without requiring you to work in a separate environment to stage changes. This is a useful solution if the primary reason for a staging workflow process is to get approvals and time content releases. The [CoSchedule](https://wordpress.org/plugins/coschedule-by-todaymade/) plugin is another resource that allows you to schedule posts.

### Staging Content for Complex Use Cases

The above options might not work for you if you are dealing with a complex use case where data is changing regularly in the live environment while content is being created in the stage environment.

In this case, you might need to script your own solution. You can [access your database](/mysql-access) and set up a way to export only the new data from one environment and add it to the live database. This is a fairly complex task that might change regularly, depending on your use case.

There are plugins that can help with these cases. The [WPMerge.io](https://wpmerge.io/) plugin records changes as they happen and then sends them to your production. This workflow doesn’t check for conflicts, which can cause staged changes to overwrite live changes if changes were made in the both staging and live environments.

## Content Staging with Drupal

Content staging in Drupal is less complex than in WordPress, because Drupal comes with core modules to help with staging content. 

### Content Staging with the Features Module

The Drupal core [Features](https://www.drupal.org/docs/contributed-modules/features) module copies configuration setups from one site to another, and creates packages of settings that can be shared between different sites. Benefits of this module include:

- Tracking configuration changes in version control systems
- Sharing / reusing configuration settings
- Simplifying the deployment workflow

### Content Staging with the YAML Content Module

Drupal also offers the [YAML Content](https://www.drupal.org/docs/contributed-modules/yaml-content) module which allows you to define a set of content across a number of content files. The content set can then be imported or updated depending on your needs.

### Content Synchronization Module

Drupal’s [Content Synchronization](https://www.drupal.org/project/content_sync) module allows you to synchronize content across multiple environments. You can export single content items or all content items from one environment to another.

## See Also

- [Pantheon WebOps Workflow](/pantheon-workflow#code-moves-up-content-moves-down)
- [INFOGRAPHIC: The Pantheon Development Cycle Workflow](https://pantheon.io/blog/infographic-pantheon-development-cycle-workflow)

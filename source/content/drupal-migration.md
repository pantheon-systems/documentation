---
title: Drupal Upgrade and Migration Guides
tags: [code, launch, migrate, site, updates, composer, D8, D9, D10]
reviewed: "2023-03-01"
contenttype: [doc]
categories: [migrate, update]
cms: [drupal]
audience: [development]
product: [--]
integration: [--]
---

The latest version of Drupal includes many of the familiar features and layout introduced in Drupal 8, and removes deprecated code to help improve future Drupal development.

## Upgrade to the Latest Version of Drupal on the Pantheon Platform

You can upgrade your Pantheon site to the latest Drupal version. The starting point for your upgrade will vary depending on specific factors, such as:

- **Site Creation Method**
    - Build Tools
    - Custom Upstream
    - Empty Upstream
    - Pantheon Dashboard
- **Additional Requirements** <Popover title="Additional Requirements" content="Any other features that are required, or that are desired." />
    - Multidev
    - Drupal version set to 8
    - Build Tools Workflow
    - Site uses the `drupal-project` or `drupal-recommended` upstream

Review the starting points below to select the correct upgrade path for your setup.

### I created my site with Build Tools

#### Drupal + Build Tools

Use [Upgrade a Site That Was Created with Build Tools to the Latest Version of Drupal](/guides/drupal-hosted-createbt) to start your upgrade if you used Build Tools to create your site.

#### Pantheon Dashboard + Build Tools Workflow

Use [Upgrade a Site That Needs a Build Tools Workflow to the Latest Version of Drupal + Build Tools](/guides/drupal-hosted-btworkflow) to start your upgrade if you used the Pantheon Dashboard to create your Drupal site, and your site requires the Build Tools workflow.

### I created my site with an Upstream

#### Custom Upstream

Use [Upgrade a Custom Upstream to the Latest Version of Drupal](/guides/drupal-hosted-createcustom) to start your upgrade if you used Custom Upstream to create your Drupal site.

#### Empty Upstream + Multidev

Use [Upgrade a Site That Was Created with an Empty Upstream to the Latest Version of Drupal](/guides/drupal-hosted-createempty-md) to start your upgrade if you used an empty upstream to create your Drupal site, and your site uses Multidev.

Refer to [Pantheon Dashboard + Multidev](/drupal-migration#pantheon-dashboard+multidev) if you used the Pantheon Dashboard to create your Drupal site, and your site requires Multidev.

### I use Multidev

#### Pantheon Dashboard + Multidev

Use [Upgrade a Drupal Site with Multidev to the Latest Version of Drupal Using Multidev](/guides/drupal-hosted-md) to start your upgrade if you used the Pantheon Dashboard to create your Drupal site, and your site requires Multidev.

Refer to [Empty Upstream + Multidev](/drupal-migration#empty-upstream+-multidev) if you used an empty upstream with Multidev to create your site.

### I use Drupal 8

#### Pantheon Dashboard + Drupal 8

Use [Upgrade a Site Created With the Pantheon Dashboard to the Latest Version of Drupal](/guides/drupal-hosted-createdashboard-set8) to start your upgrade if you used the Pantheon Dashboard to create your Drupal site, and your site requires the version to be set to Drupal 8.

### I created my site with the Pantheon Dashboard

#### Pantheon Dashboard

Use [Upgrade a Drupal Site to the Latest Version of Drupal](/guides/drupal-hosted) to start your upgrade if you used the Pantheon Dashboard to create your Drupal site, and your site has no additional requirements such as: Multidev, Build Tools, Drupal version set to 8, or the  `drupal-project` or `drupal-recommended` upstream.

## Migrate From Another Platform

Developers have migrated tens of thousands of Drupal sites to Pantheon to take advantage of our WebOps workflows and platform. Composer is the optimal solution to manage packages and dependencies on Pantheon for Drupal development (Version 8+).

There are different starting points for your migration depending on your Drupal version and dependency management setup- review them below.

### I use Composer

#### Drupal + Composer

Use [Migrate a Composer Managed Drupal Site from Another Platform](/guides/drupal-unhosted-composer)to start your migration if you have a Composer-managed site.

### I do not use Composer

#### Drupal without Composer

Use [Migrate a Drupal Site from Another Platform](/guides/drupal-unhosted) to start your migration if you have a Drupal site that *does not* use Composer.

### Legacy Drupal

#### I have a legacy Drupal site

Use [Migrate a Drupal Site from Another Platform](/guides/drupal-unhosted) to start your migration  if you have a legacy Drupal site (such as Drupal 7) based on the [drupal/legacy-project](https://github.com/drupal/legacy-project/blob/9.1.x/composer.json) template or a similar non-Composer managed structure.

## More Resources

- [Composer Fundamentals and Workflows](/guides/composer)
- [Integrated Composer Overview](/guides/integrated-composer)
- [Pantheon YAML Configuration Files](/pantheon-yml)
- [Composer Conversion Guide](/guides/composer-convert)

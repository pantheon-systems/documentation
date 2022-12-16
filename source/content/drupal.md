---
title: "Drupal:latest"
description: Get started with Drupal on the Pantheon WebOps Platform.
tags: [site, D8, D9, D10]
contributors: [populist, edwardangert, whitneymeredith]
reviewed: "2022-12-09"
contenttype: [doc]
categories: [create, plan, config]
newcms: [drupal, drupal8, drupal9, drupal10]
audience: [development]
product: [integrated-composer]
integration: [--]
---

The latest version of Drupal is available on Pantheon to all new sites, and is available as an [upgrade path for Drupal 8+ sites](/drupal-migration).

Since Drupal itself is in active development and each new version brings a number of significant changes from previous versions, this doc outlines the biggest changes and answers frequently asked questions.

## About Drupal

Drupal includes many of the features and layout that Drupal users are familiar with, and it removes deprecated code to help improve future Drupal development.

Drupal:latest updates Drupal’s underlying dependencies like [Symfony](https://symfony.com/) and [Twig](https://twig.symfony.com/), removes several deprecated API functions in favor of better options, and allows everyone running Drupal 8.8+ an easy upgrade path to Drupal and beyond.

## Drupal With Integrated Composer

On the Pantheon Platform, Drupal sites use [Integrated Composer](/guides/integrated-composer), letting you deploy your site on Pantheon with one-click updates for both upstream commits and Composer dependencies, while still receiving upstream updates.

### Site Structure

<Partial file="ic-upstream-structure.md" />

### Managing Dependencies with Composer

Learn more about working with upstream and site dependencies in the [Integrated Composer](/guides/integrated-composer) documentation.

## Before You Begin

- Log in to your Pantheon account. If you don't have one, [create one first](https://pantheon.io/register?docs) and familiarize yourself with the [User Dashboard](/guides/quickstart/user-dashboard) before you create a new site.

- Set up [SSH Keys](/ssh-keys) on your local computer and Pantheon account.

- Install and configure [Git](/guides/git/git-config) and [Composer](https://getcomposer.org/download/) on your local computer.

- Mac users can use [Homebrew](https://brew.sh/) to install both Git, Composer,  and Terminus along with their required dependencies:

     ```bash{promptUser:user}
     brew install git composer pantheon-systems/external/terminus
     ```

## Create a New Drupal Site with Integrated Composer

[Create a new Drupal site from the Dashboard](/guides/legacy-dashboard/create-sites) as you would with any new site. Integrated Composer is built in and ready to use.

## Upgrade or Migrate to Drupal 

To upgrade or migrate an existing Drupal site to Drupal with Integrated Composer, see the [Drupal Migration Guide](/drupal-migration).

To check an existing site's compatibility to upgrade, visit the appropriate [Drupal Migration Guide](/drupal-migration).

## Gutenberg for Drupal 

After you upgrade to Drupal you may consider upgrading the authoring experience for your content creators as well. We recommend using [Gutenberg](https://www.drupal.org/project/gutenberg) for a better user experience, including:

 - Creating, saving, and reusing content blocks
 - Easier build process for landing pages
 - Scalable performance

You can read more about Pantheon's experience with Gutenberg in [Gutenberg on Drupal : An Opportunity](https://pantheon.io/blog/gutenberg-drupal).

You can also read more about the installation process on [Drupal.org](https://www.drupal.org/docs/contributed-modules/gutenberg/installation-and-upgrades).

We recommend monitoring your site's traffic using [Metrics in the Site Dashboard](/guides/legacy-dashboard/metrics) to check for increased traffic after installing Gutenberg.

## Troubleshooting and Support

See the appropriate [Drupal Migration Guide](/drupal-migration) for help troubleshooting common issues with Drupal with Integrated Composer.

### Where can I report an issue?

[Contact support](/guides/support) to report any issues that you encounter.

### Can I Use Lando or Localdev for Drupal ?

Some users have reported success using [Lando](https://docs.lando.dev/basics/) with Drupal , but it relies on a workaround and requires extra configuration. Check the status of the [Lando repo's issue](https://github.com/lando/lando/issues/2831#issuecomment-771833900) before you continue.

Manually update the [landofile](https://docs.lando.dev/config/lando.html#base-file) in the project folder, and set `drupal9` as the framework:

  ```yml:title=lando.yml
  # Lando issue 2831 workaround for D9
  framework: drupal8
  ```

When you create a project with Lando from the Pantheon recipe, the `framework` will default to `drupal8` for a Drupal site.

If you created new project with Lando, change the value for `framework` to `drupal8`, then run `lando rebuild`.

### Site-local Drush Is Required for Drupal Sites

Do not remove `drush/drush` from `composer.json`. If it's removed, `terminus drush` commands will fail with errors related to Twig.
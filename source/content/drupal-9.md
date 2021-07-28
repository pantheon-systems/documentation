---
title: Drupal 9
description: Get started with Drupal 9 on the Pantheon WebOps Platform.
categories: [get-started]
tags: [site]
cms: drupal-9
contributors: [populist, edwardangert]
reviewed: "2021-06-18"
---

Drupal 9 is available on Pantheon to all new sites, and is available as an [upgrade path for Drupal 8 sites](/guides/drupal-9-migration).

Since Drupal 9 on Pantheon is in active development and includes a number of significant changes from previous versions of Drupal, this doc outlines the biggest changes and answers frequently asked questions.

## About Drupal 9

Drupal 9 includes many of the features and layout that Drupal 8 users are familiar with, and it removes deprecated code to help improve future Drupal development.

Drupal 9 updates Drupal’s underlying dependencies like [Symfony 4.4](https://symfony.com/releases/4.4) and [Twig 2](https://twig.symfony.com/doc/2.x/index.html), removes several deprecated API functions in favor of better options, and allows everyone running Drupal 8.8+ an easy upgrade path to Drupal 9 and beyond.

## Drupal 9 With Integrated Composer

On the Pantheon Platform, Drupal 9 sites use [Integrated Composer](/integrated-composer), letting you deploy your site on Pantheon with one-click updates for both upstream commits and Composer dependencies, while still receiving upstream updates.

<Alert title="A note about Limited Availability" type="info" icon="leaf">

Drupal 9 with Integrated Composer is available on Pantheon as a Limited Availability feature release while additional features are in active development.

Pantheon engineers are rolling out changes often.

</Alert>

### Site Structure

<Partial file="ic-upstream-structure.md" />

### Managing Dependencies with Composer

Learn more about working with upstream and site dependencies in the [Integrated Composer](/integrated-composer) documentation.

## Before You Begin

- Log in to your Pantheon account. If you don't have one, [create one first](https://pantheon.io/register?docs) and familiarize yourself with the [User Dashboard](/guides/quickstart/user-dashboard) before you create a new site.

- Set up [SSH Keys](/ssh-keys) on your local computer and Pantheon account.

- Install and configure [Git](/git) and [Composer](https://getcomposer.org/download/) on your local computer.

   - Mac users can use [Homebrew](https://brew.sh/) to install both Git and Composer, along with their required dependencies:

     ```bash{promptUser:user}
     brew install git composer
     ```

## Create a New Drupal 9 Site with Integrated Composer

[Create a new Drupal 9 site from the Dashboard](/create-sites) as you would with any new site. Integrated Composer is built in and ready to use.

## Upgrade or Migrate to Drupal 9

To upgrade or migrate an existing Drupal site to Drupal 9 with Integrated Composer, see the [Drupal 9 Migration Guide](/guides/drupal-9-migration).

To check an existing site's compatibility to upgrade, visit our [Prepare for Drupal 9 section](/guides/drupal-9-migration/prepare).

## Troubleshooting and Support

See the [Drupal 9 Migration Guide](/guides/drupal-9-migration/troubleshoot) for help troubleshooting common issues with Drupal 9 with Integrated Composer.

### Where can I report an issue?

[Contact support](/support) to report any issues that you encounter.

### Can I Use Lando or Localdev for Drupal 9?

Local development options for Drupal 9 are currently being implemented into [Localdev](/guides/localdev).

Some users have reported success using [Lando](https://docs.lando.dev/basics/) with Drupal 9, but it relies on a workaround and requires extra configuration. Check the status of the [Lando repo's issue](https://github.com/lando/lando/issues/2831#issuecomment-771833900) before you continue.

Manually update the [landofile](https://docs.lando.dev/config/lando.html#base-file) in the project folder, and set `drupal9` as the framework:

```yml:title=lando.yml
# Lando issue 2831 workaround for D9
framework: drupal9
```

When you create a project with Lando from the Pantheon recipe, the `framework` will default to `drupal8` for a Drupal 8 or Drupal 9 site.

If you created new project with Lando, change the value for `framework` to `drupal9`, then run `lando rebuild`.

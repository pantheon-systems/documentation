---
title: Drupal 9
description: Get started with Drupal 9 on the Pantheon WebOps Platform.
categories: [get-started]
tags: [site]
cms: drupal-9
contributors: [populist, edwardangert]
reviewed: "2021-03-31"
---

This how-to guide walks you through the high level, end-to-end deployment steps to set up Drupal 9 on the Pantheon WebOps platform.

## About Drupal 9

Drupal 9 includes many of the features and layout that Drupal 8 users are familiar with, and it removes deprecated code to help improve future Drupal development.

Drupal 9 updates Drupal’s underlying dependencies like [Symfony 4.4](https://symfony.com/releases/4.4) and [Twig 2](https://twig.symfony.com/doc/2.x/index.html), removes several deprecated API functions in favor of better options, and allows everyone running Drupal 8.8+ an easy upgrade path to Drupal 9 and beyond.

## Drupal 9 With Integrated Composer

On the Pantheon Platform, Drupal 9 sites use [Integrated Composer](/integrated-composer), letting you deploy your site on Pantheon with one-click updates for both upstream commits and Composer dependencies, while still receiving upstream updates.

<Alert title="A note about Limited Availability" type="info" icon="leaf">

Currently, Drupal 9 is available on Pantheon as a Limited Availability feature release. This means the feature is currently in active development.

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

<Partial file="drupal-9-upstream-install.md" />

If you're not ready to create a new site yet, you can also [check an existing site's compatibility to upgrade](/guides/drupal-9-migration/prepare).

## Upgrade or Migrate to Drupal 9

To upgrade or migrate an existing Drupal site to Drupal 9 with Integrated Composer, see the [Drupal 9 Migration Guide](/guides/drupal-9-migration).


## Troubleshooting and Support

See the [Drupal 9 Migration Guide](guides/drupal-9-migration/troubleshoot) for help troubleshooting common issues with Drupal 9 with Integrated Composer. 

### Where can I report an issue?

[Contact support](/support) to report any issues that you encounter.

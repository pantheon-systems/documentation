---
title: Drupal 9
description: Launch the latest Drupal on the Pantheon WebOps Platform.
categories: [get-started]
tags: [site]
contributors: [populist, edwardangert]
reviewed: "2020-12-02"
---

Drupal 9 includes many of the features and layout that Drupal 8 users are familiar with, and it removes deprecated code to help improve future Drupal development.

Drupal 9 updates Drupal’s underlying dependencies like [Symfony 4.4](https://symfony.com/releases/4.4) and [Twig 2](https://twig.symfony.com/doc/2.x/index.html), removes several deprecated API functions in favor of better options, and allows everyone running Drupal 8.8+ an easy upgrade path to Drupal 9 and beyond.

<Alert title="A note about Limited Availability" type="info" icon="leaf">

Currently, Drupal 9 is available on Pantheon as a Limited Availability feature release. This means the feature is currently in active development.

Pantheon engineers are rolling out changes often.

</Alert>

## Before You Begin

- Log in to your Pantheon account. If you don't have one, [create one first](https://pantheon.io/register?docs) and familiarize yourself with the [User Dashboard](/guides/quickstart/user-dashboard) before you create a new site.

- Set up [SSH Keys](/ssh-keys) on your local computer and Pantheon account.

- Install and configure [Git](/git) and [Composer](https://getcomposer.org/download/) on your local computer.

   - Mac users can use [Homebrew](https://brew.sh/) to install both Git and Composer, along with their required dependencies:

     ```bash{promptUser:user}
     brew install git composer
     ```

## Create a New Drupal 9 Site with Integrated Composer

Please note the Limited Availability program does not include a path to upgrade from previous Drupal versions to Drupal 9. Upgrade instructions for existing Drupal 8 Composer-enabled sites will be available when Integrated Composer moves into General Availability.

<Partial file="drupal-9-upstream-install.md" />

If you're not ready to create a new site yet, you can also [check an existing site's compatibility to upgrade](#test-an-existing-drupal-site-for-drupal-9-upgrade-compatibility).

## Test an Existing Drupal Site for Drupal 9 Upgrade Compatibility

1. Upgrade to the latest Drupal 8.9 release.

   - Although Drupal supports upgrading to Drupal 9 from Drupal 8.8, ensure that your site is on the latest Drupal 8.9 release before trying Drupal 9 on Pantheon.

1. Review the [How to Prepare Your Drupal 7 or Drupal 8 Site for Drupal 9](https://www.drupal.org/docs/9/how-to-prepare-your-drupal-7-or-8-site-for-drupal-9) guide on Drupal.org.

1. Use the [Upgrade Status](https://www.drupal.org/project/upgrade_status) Drupal 8/9 module to generate a full report of your site’s compatibility.

1. [Help contributed modules](https://www.drupal.org/node/3032484) prepare for Drupal 9, for example by updating modules' deprecated API usages and converting tests to PHPUnit.

1. Check out [Acquia’s Drupal 9 Deprecation Status Upgrade Tracker](https://dev.acquia.com/drupal9/deprecation_status) for information about Drupal 9 support for contributed Drupal modules and themes.

### Update Deprecated Code for Drupal 9 Compatibility

Drupal 9 has deprecated a number of different functions and APIs in favor of better options going forward.

For example, `node_load()` was replaced in Drupal 9 with `Node::load` resulting in this change needed:

Drupal 8:

```php
$node = node_load(1);
```

Drupal 9:

```php
use \Drupal\node\Entity\Node;
$node = Node::load(1);
```

Since most of these changes are relatively minor, there are a number of [deprecation checking and correction tools](https://www.drupal.org/docs/9/how-to-prepare-your-drupal-7-or-8-site-for-drupal-9/deprecation-checking-and-correction-tools) available.

## FAQ

### Pantheon Drupal 8 Modules Being Upgraded to Drupal 9

| Module Name                                                                                 | Drupal 8 Version? | Drupal 9 Version? |
|---------------------------------------------------------------------------------------------|:-----------:|:-----------:|
| [Pantheon Advanced Page Cache](https://www.drupal.org/project/pantheon_advanced_page_cache) |     Yes     |     Yes     |
| [Search API Pantheon](https://www.drupal.org/project/search_api_pantheon)                   |     Yes     |   Not yet   |

### Where can I report an issue?

[Contact support](/support) to report any issues that you encounter.

### Error: Class "Drupal\views\Routing\ViewPageController" does not exist

As reported in [Drupal Issue 3161309](https://www.drupal.org/project/drupal/issues/3161309), some fresh installations may encounter the error:

```none
InvalidArgumentException: Class "Drupal\views\Routing\ViewPageController" does not exist.
```

If you encounter this error, [clear the cache through the Site Dashboard](/clear-caches#pantheon-dashboard), or with the [Terminus](/terminus) `drush cr` command:

```bash{promptUser: user}
terminus drush <site>.<env> -- cr
```

Given the nature of the bug, it might be easier to reinstall Drupal 9.

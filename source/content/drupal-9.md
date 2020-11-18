---
title: Drupal 9 Early Access
description: Test the latest Drupal on the Pantheon WebOps Platform.
categories: [get-started]
tags: [site]
contributors: [populist, edwardangert]
reviewed: "2020-11-18"
---

Drupal 9 is, according to [drupal.org](https://www.drupal.org/docs/understanding-drupal/drupal-9-resources):

> "...a cleaned-up version of Drupal 8... \[with] deprecated code removed and third-party dependencies updated."

Drupal 9 updates Drupal’s underlying dependencies like [Symfony 4.4](https://symfony.com/releases/4.4) and [Twig 2](https://twig.symfony.com/doc/2.x/index.html), removes several deprecated API functions in favor of better options, and allows everyone running Drupal 8.8+ an easy upgrade path to Drupal 9 and beyond.

<Alert title="A note about Limited Availability" type="danger">

Currently, Drupal 9 is available on Pantheon as a Limited Availability feature release. This means the feature is currently in active development.

Pantheon engineers are rolling out changes often.

</Alert>

## Create a New Drupal 9 Site with Integrated Composer

If you're not ready to create a new site yet, you can also [check an existing site's compatibility to upgrade](#test-an-existing-drupal-site-for-drupal-9-upgrade-compatibility). Once you're ready, [test-upgrade an existing Pantheon Drupal 8 site to Drupal 9](#test-upgrade-an-existing-pantheon-drupal-8-site-to-drupal-9).

<Partial file="drupal-9-upstream-install.md" />

## Test an Existing Drupal Site for Drupal 9 Upgrade Compatibility

1. Upgrade to the latest Drupal 8.9 release.

   - Although Drupal supports upgrading to Drupal 9 from Drupal 8.8, ensure that your site is on the latest Drupal 8.9 release before trying Drupal 9 on Pantheon.

1. Review the [How to Prepare Your Drupal 7 or Drupal 8 Site for Drupal 9](https://www.drupal.org/docs/9/how-to-prepare-your-drupal-7-or-8-site-for-drupal-9) guide on Drupal.org.

1. Use the [Upgrade Status](https://www.drupal.org/project/upgrade_status) Drupal 8/9 module to generate a full report of your site’s compatibility.

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

## Test-upgrade an Existing Pantheon Drupal 8 Site to Drupal 9

Are you already running a Pantheon site using our [Drupal 8 upstream](https://github.com/pantheon-systems/drops-8)? Use our [Multidev](/multidev) feature to test Drupal 9 in a new branch.

1. Clone your Drupal 8 site’s codebase [to your computer](/local-development#get-the-code) and change directory to it. You can create a new Drupal 8 site or use an existing Drupal 8 site:

  ```bash{promptUser: user}
  git clone <url for site repo>
  cd <site-name>
  ```

1. Install the [Terminus D9 Preview plugin](https://github.com/pantheon-systems/terminus-d9-preview) to create a Multidev environment called `preview-d9` on your Drupal 8 site for testing:

  ```bash{promptUser: user}
  composer create-project -d ~/.terminus/plugins pantheon-systems/terminus-d9-preview:^0.1
  ```

1. Create and switch to a new testing Multidev:

  ```bash{promptUser: user}
  terminus preview:d9
  ```

1. Modify the `pantheon.yml` file to specify PHP 7.3 or newer and Drush 8:

  ```yaml:title=pantheon.yml
  php_version: 7.4
  drush_version: 8
  ```

  Note that Drupal 9 is not yet compatible with the pre-installed Drush 10 on Pantheon.

1. Commit and push your changes:

  ```bash{promptUser: user}
  git commit -am "test upgrade to Drupal 9"
  git push origin preview-d9
  ```

You should not attempt to merge your Drupal 9 preview Multidev into the dev environment until Drupal 9 is officially supported on Pantheon.

### Refresh Existing preview-d9 Multidev With Latest Dev Environment

This destroys the code, database and files on the existing `preview-d9` Multidev and re-creates it from the latest dev environment. Save any changes you made on this environment to your local computer before refreshing the environment.

If you make changes to your dev environment that you want to test in Drupal 9, run `terminus preview:d9` again to update the existing Multidev:

```bash{promptUser: user}
terminus preview:d9
```

## FAQ

### Pantheon Drupal 8 Modules Being Upgraded to Drupal 9

| Module Name                                                                                 | Drupal 8 Version? | Drupal 9 Version? |
|---------------------------------------------------------------------------------------------|:-----------:|:-----------:|
| [Pantheon Advanced Page Cache](https://www.drupal.org/project/pantheon_advanced_page_cache) |     Yes     |     Yes     |
| [Search API Pantheon](https://www.drupal.org/project/search_api_pantheon)                   |     Yes     |   Not yet   |

### Where can I report an issue?

[Contact support](/support) to report any issues that you encounter.

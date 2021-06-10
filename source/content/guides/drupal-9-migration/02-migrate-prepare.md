---
title: Migrate to Drupal 9 on Pantheon
subtitle: Prepare
description: Prepare to Migrate to Drupal 9 on Pantheon
categories: [get-started]
cms: drupal-9
tags: [code, launch, migrate, site, updates]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-migration/prepare
anchorid: drupal-9-migration/prepare
editpath: drupal-9-migration/02-migrate-prepare.md
---

This overview outlines the steps to prepare an existing Drupal site for upgrade or migration to Drupal 9 with Integrated Composer.

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

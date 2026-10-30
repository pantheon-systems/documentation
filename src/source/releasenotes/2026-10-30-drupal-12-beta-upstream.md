---
title: "Drupal 12 beta upstream available for testing"
published_date: "2026-10-30"
published_at: "2026-10-30T00:00:00Z"
categories: [drupal, new-feature]
description: "Create a Drupal 12 (12.0.0-beta2) site on Pantheon with Terminus to test your modules and themes before the stable release."
---
Pantheon now provides a Drupal 12 upstream so you can test your site against Drupal 12.0.0-beta2. Drupal 12 requires PHP 8.5, and new sites created from this upstream use PHP 8.5 and MySQL 8.4.

Drupal 12 is a beta release for testing. Do not use it for production sites.

## Create a Drupal 12 site

Create a site with Terminus:

```bash
terminus site:create <site-name> "<site-label>" drupal-12-composer-managed
```

To create the site under an organization, add `--org=<org name or ID>`. You can use the upstream ID `2b5c005c-085b-4d19-992e-c36d883aba74` in place of `drupal-12-composer-managed`.

Drupal 12 does not appear in the dashboard's site creation flow yet, so use Terminus.

## Known issue: error after installing

After you install Drupal 12, the site can show "The website encountered an unexpected error". This error comes from the Standard installation profile in Drupal core. The message is:

```text
BadMethodCallException: The "\Drupal\standard\Controller\WelcomeController::access" method is not callable as a _custom_access callback in route "/admin/welcome"
```

If you encounter an issue like this, please clear the cache:

```bash
terminus drush <site>.<env> -- cr
```

## Before you upgrade an existing site

Drupal 12 removes several modules and themes from core, including Ban, Contact, Field Layout, History, Search, Settings Tray, Shortcut, Telephone, Toolbar, Claro and Olivero. If your site uses one, install its contributed replacement before you upgrade. For the full list and the Drupal 12 schedule, see the [Drupal 12 release schedule](https://www.drupal.org/about/core/policies/core-release-cycles/schedule) on drupal.org.

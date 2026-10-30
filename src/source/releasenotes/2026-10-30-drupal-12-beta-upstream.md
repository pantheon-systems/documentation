---
title: "Drupal 12 upstream available for testing"
published_date: "2026-11-03"
published_at: "2026-11-03T15:00:00Z"
categories: [drupal, new-feature]
description: "Create a Drupal 12 (12.0.0-beta2) site on Pantheon with Terminus."
---
Pantheon now provides a Drupal 12 upstream for testing. New sites created from it start on the latest Drupal 12 release, currently [12.0.0-beta2](https://www.drupal.org/project/drupal/releases/12.0.0-beta2), with PHP 8.5 and MySQL 8.4.

Drupal 12 is still in beta, so use it for testing, not for production sites. Drupal 12 compatibility for Pantheon's modules is in progress. The [Drupal core release schedule](https://www.drupal.org/about/core/policies/core-release-cycles/schedule) plans the release candidate (12.0.0-rc1) for the week of November 9, 2026, and the stable release (12.0.0) for the week of December 7, 2026.

## Create a Drupal 12 site

Create a site with Terminus:

```bash
terminus site:create <site-name> "<site-label>" drupal-12-composer-managed --org=<org>
```

Drupal 12 does not appear in the dashboard's site creation flow yet, so use Terminus.

## Known issue: error after installing

After you install Drupal 12, you may see this error from Drupal core:

```text
BadMethodCallException: The "\Drupal\standard\Controller\WelcomeController::access" method is not callable as a _custom_access callback in route "/admin/welcome"
```

If you see it, clear the cache:

```bash
terminus drush <site>.<env> -- cr
```

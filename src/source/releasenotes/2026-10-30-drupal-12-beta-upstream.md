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
terminus site:create <site-name> "<site-label>" drupal-12-composer-managed --org=<org>
```

You can use the upstream ID `2b5c005c-085b-4d19-992e-c36d883aba74` in place of `drupal-12-composer-managed`.

Drupal 12 does not appear in the dashboard's site creation flow yet, so use Terminus.

## Known issue: error after installing

After you install Drupal 12, If you encounter an issue like this from Drupal core, please clear the cache:

```text
BadMethodCallException: The "\Drupal\standard\Controller\WelcomeController::access" method is not callable as a _custom_access callback in route "/admin/welcome"
```

```bash
terminus drush <site>.<env> -- cr
```

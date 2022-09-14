---
title: Drupal Drush Command-Line Utility on Pantheon
subtitle: Introduction
description: Administer and maintain your Pantheon site from your local Drupal Drush installation.
cms: "Drupal"
categories: [develop]
tags: [drush]
layout: guide
showtoc: true
permalink: docs/guides/drush
anchorid: drush
---

[Drush](https://github.com/drush-ops/drush) is a command-line interface for Drupal that provides a wide set of utilities for administering and maintaining your site.

Drush commands require a `settings.php` file, and it's a best practice to have one.  Drupal 7 sites do not contain a `settings.php` file; however, you can simply copy the `sites/default/default.settings.php` to `sites/default/settings.php` via [SFTP](/sftp) or [Git](/guides/git/git-config) for Drush to work on older Drupal versions. For more details, see [Configuring Settings.php](/guides/php/settings-php).

## Terminus Drush and Local Drush

Refer to Drush's [install documentation](https://docs.drush.org/en/8.x/install/) for details on installing Drush locally.

Drush-savvy developers should also install and utilize [Terminus](/terminus), a command-line interface that allows you to control your Pantheon account and sites. Virtually anything you can do in the Dashboard, you can script with Terminus. It can also make remote Drush calls on your environments without having Drush installed locally, eliminating incompatibility issues between locally and remotely installed versions of Drush.

If you have a [Composer-based site](/guides/composer), Terminus will use the version of Drush it finds in `vendor/bin/drush` when running Drush commands on the platform.

You can run all of the commands below from Terminus instead of using Drush aliases. For more information, see [Managing Drupal Sites with Terminus and Drush](/guides/terminus-drupal-site-management). For example, you can run `terminus drush <site>.<env> -- cc drush` instead of `drush @pantheon.SITENAME.dev cc drush`.

## Changelog

You can view the most recent Drush release and changelogs in the [Drush repository](https://github.com/drush-ops/drush/releases).

## More Resources

- [Drush Introduction Video](/videos/drush)
- [The Terminus Manual](/terminus)
- [Drupal 9](/drupal-9)
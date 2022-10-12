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

[Drush](https://github.com/drush-ops/drush) is a command-line interface for Drupal that provides a wide set of utilities to administer and maintain your site.

Drush commands require a `settings.php` file. However, Drupal 7 sites do not contain a `settings.php` file. You can copy the `sites/default/default.settings.php` to `sites/default/settings.php` via [SFTP](/sftp) or [Git](/guides/git/git-config) for Drush to work on older Drupal versions. Refer to [Configuring Settings.php](/guides/php/settings-php) more information.

## Terminus Drush and Local Drush

Refer to Drush's [install documentation](https://docs.drush.org/en/8.x/install/) for information on installing Drush locally.

Drush developers should also install and use [Terminus](/terminus), a command-line interface for controlling your Pantheon account and sites. Terminus allows you to script almost every action that you can complete in the Dashboard. It can also make remote Drush calls on your environments without having Drush installed locally. This eliminates incompatibility issues between local and remote installation versions of Drush.

Terminus automatically uses the version of Drush it finds in `vendor/bin/drush` when running Drush commands on the platform if you have a [Composer-based site](/guides/composer).

You can run the commands below from Terminus instead of using Drush aliases. For example, you can run `terminus drush <site>.<env> -- cc drush` instead of `drush @pantheon.SITENAME.dev cc drush`. Refer to [Manage Drupal Sites with Terminus and Drush](/guides/terminus-drupal-site-management) for more information. 

## Changelog

You can view the most recent Drush release and changelogs in the [Drush repository](https://github.com/drush-ops/drush/releases).

## More Resources

- [Drush Introduction Video](/videos/drush)
- [The Terminus Manual](/terminus)
- [Drupal 9](/drupal-9)
- [WP-CLI on Pantheon](/guides/wp-cli)
---
title: Pantheon Drupal (Composer Managed) Upstream
description: Release notes and customizations to the Pantheon Drupal (Composer Managed) Upstream
tags: [code, site, upstreams]
showtoc: true
permalink: docs/start-states/drupal-composer-managed
editpath: start-states/drupal-composer-managed.md/
reviewed: "2023-02-23"
contenttype: [doc]
innav: [true]
categories: [custom-upstreams]
cms: [drupal]
audience: [agency, business, development]
product: [custom-upstreams]
integration: [--]
---

This document provides additional context to platform-specific changes in Pantheon's Composer-managed Drupal upstream.

## Latest Release

### 2023-02-23

<a name="20230223" class="release-update"></a>This release prepares sites on the Drupal (Composer Managed) upstream for Drupal 10.  The specific changes made in this release include:

- The `upstream-require` command was moved to a new project, `pantheon-systems/upstream-management`
- A `post-update` hook is added to the site's top-level `composer.json` file; this hook is for potential future use, and does not do anything at present. If you remove it, Pantheon will add it again. The hook's purpose is to allow us to manage potential future changes that must be applied to sites using this upstream.
- The `enable-patching` flag is added to the site's top-level `composer.json` file. Patches from dependencies may not be applied if this option is missing, so we are including it to avoid confusion. The most recent version of `cweagans/composer-patches` still requires this flag, but it is slated to be removed in a future release. If you do not want this flag enabled in your project’s `composer.json` file, you may remove it, and it will not be replaced.
- The `phpstan/extension-installer` Composer plugin is enabled, if it isn't already, to reduce friction with future upgrades to Drupal 10, which includes this extension.

These changes have minimal impact on existing sites today, and are primarily intended to keep the Drupal (Composer Managed) upstream in a state where it is easy for Pantheon to maintain the new Drupal 10 "start state" upstream. Refer to [pantheon-upstreams/drupal-10-composer-managed on GitHub](https://github.com/pantheon-upstreams/drupal-10-composer-managed) for more information.

## Previous Releases

### 2022-12-13

<a name="20221213" class="release-update"></a>Update to PHP 8.1

### 2022-03-24

<a name="20220324" class="release-update"></a>Allow sites to upgrade to Drush 12 when it becomes available

## More Resources

- [Pantheon Start States](/start-state)
- [Pantheon WordPress Upstream](/start-states/wordpress)
- [WordPress and Drupal Core Updates](/core-updates)
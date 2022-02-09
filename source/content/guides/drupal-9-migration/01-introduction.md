---
title: Migrate to Drupal 9 on Pantheon
subtitle: Introduction
description: Steps to upgrade, perform a guided migration, or migrate manually to Drupal 9 on Pantheon.
categories: [get-started]
cms: drupal-9
tags: [code, launch, migrate, site, updates]
reviewed: "2021-03-31"
layout: guide
permalink: docs/guides/drupal-9-migration
anchorid: drupal-9-migration
editpath: drupal-9-migration/01-introduction.md
---

Drupal 9 includes many of the features and layout that Drupal 8 users are familiar with, and it removes deprecated code to help improve future Drupal development.

Drupal 9 updates Drupal’s underlying dependencies like [Symfony 4.4](https://symfony.com/releases/4.4) and [Twig 2](https://twig.symfony.com/doc/2.x/index.html), removes several deprecated API functions in favor of better options, and allows everyone running Drupal 8.8+ an easy upgrade path to Drupal 9 and beyond.

There are a number of ways to upgrade to Drupal 9 on Pantheon, and we're building out the documentation within this guide to try to help you through your adventure.

## Create a New Drupal 9 Site on Pantheon

See our [Drupal 9](/drupal-9) and [Integrated Composer](/integrated-composer) docs to learn more about Drupal 9 on Pantheon, and to get started with a fresh new site.

## Migrate or Upgrade an Existing Site to Drupal 9 With Integrated Composer on Pantheon

<TabList>

<Tab title="On Pantheon" id="on-pantheon" active={true}>

Utilize the info on this tab if your site is currently on Pantheon.

Here's how to migrate your site if you are using:

- Build Tools (assumes Composer?)
  - [Continuous Integration](/guides/drupal-9-migration/build-tools-to-d9-build-tools)
  - No Continuous Integration

- Composer
  - With [Integrated Composer](//guides/drupal-9-migration/upgrade-to-d9)
  - Without Composer
    - [On an Existing Site](/guides/drupal-9-migration/upgrade-to-d9)
    - [New Site](/guides/drupal-9-migration/migrate-manual-d9)

- Custom Upstream
  - With Custom Upstream
  - [Without Custom Upstream](/migrate#migrate-existing-sites)

</Tab>

<Tab title="Not on Pantheon" id="not-on-pantheon">

Utilize the info on this tab if your site is not currently on Pantheon.

Here's how to migrate your site if you are using:

- Drupal 8
  - Composer
    - [Yes](/guides/composer-convert)
    - [No](/guides/drupal-9-migration/migrate-manual-d9)

- Drupal 9
  - Composer
    - [Yes](/guides/drupal-9-migration/drupal-9-to-pantheon)
    - [No](/guides/drupal-9-migration/upgrade-to-d9)


</Tab>

</TabList>

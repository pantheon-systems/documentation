---
title: Migrate to Drupal 9 on Pantheon
subtitle: Introduction
description: Steps to upgrade, perform a guided migration, or migrate manually to Drupal 9 on Pantheon.
categories: [get-started]
cms: drupal-9
tags: [code, launch, migrate, site, updates]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-migration
anchorid: drupal-9-migration
editpath: drupal-9-migration/01-introduction.md
---

This guide provides multiple options to upgrade, perform a guided migration, or migrate manually to Drupal 9 on Pantheon. 

Drupal 9 includes many of the familiar features and layout introduced in Drupal 8, and removes deprecated code to help improve future Drupal development.

## Drupal 9 on Pantheon

Drupal 9 sites on Pantheon have Composer built-in to manage site dependencies (like modules, themes, and libraries). 

The Pantheon `drupal9` upstream features a [nested docroot](/drupal-9#site-structure) site structure, which allows Drupal core to be managed as a dependency. 

If you're new to Composer dependency management, review the [Composer Fundamentals](/composer) doc. 

## Prepare Your Site

Prepare to migrate or upgrade your existing Drupal site using the steps on the [Prepare](/guides/drupal-9-migration/prepare) page.

## Drupal 8 Sites

There are a number of ways to upgrade to Drupal 9 on Pantheon. 

1. To begin, use the [Composer Convert](/guides/composer-convert) steps to convert a standard, Pantheon-hosted Drupal 8 site to a Composer-managed Drupal 8 site on the Pantheon `drupal9` upstream. 

1. Once your Drupal 8 site has been converted to use Composer and the `drupal9` upstream, and it's ready to upgrade to Drupal 9, follow the steps on the [Upgrade from Drupal 8](/guides/drupal-9-migration/upgrade-to-d9) page.

## Before You Begin

Prepare to migrate or upgrade your existing Drupal site using the steps in the [Prepare](/guides/drupal-9-migration/prepare) section) page. 

## More Resources

- [Drupal 9](/drupal-9#about-drupal-9) overview
- [Integrated Composer](/integrated-composer) overview
- [Create a new Drupal 9 site from the Dashboard](/create-sites)


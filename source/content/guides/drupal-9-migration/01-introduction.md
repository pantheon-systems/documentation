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

There are a number of ways to upgrade to Drupal 9 on Pantheon, and we're building out the documentation within this guide to help you through your adventure.

## Before You Begin

Pantheon recommends using Composer to manage Drupal 8 and 9 site dependencies. This guide assumes you are using [Composer](/composer) with your Drupal site. 

### Create a New Drupal 9 Site

To get started with a new site, see our [Drupal 9](/drupal-9) and [Integrated Composer](/integrated-composer) doc.

### Convert Drupal 8 Site to Composer

If you are migrating or upgrading a Drupal 8 site without Composer, begin by [Converting a Standard Drupal 8 Site to a Composer Managed Site](/guides/composer-convert).


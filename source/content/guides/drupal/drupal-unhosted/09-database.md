---
title: Migrate a Drupal:latest Site from Another Platform
subtitle: Add Database
description: 
cms: "Drupal"
tags: [code, launch, migrate, site, updates, D8, D9, D10]
contributors: [wordsmither]
layout: guide
permalink: docs/guides/drupal-unhosted/add-database
anchorid: add-database
editpath: drupal/drupal-unhosted/09-database.md
contenttype: [guide]
categories: [migrate]
newcms: [drupal9, drupal, drupal10, drupal8]
audience: [development]
product: [--]
integration: [--]
reviewed: "2022-12-13"
---

Now that you've set up your Pantheon Dev environment, you need to import your database.

## Create a `.sql` Dump File

<Partial file="drupal/migrate-add-database-part1-sql.md" />

## Add Your Database to Pantheon's Platform

<Partial file="drupal/migrate-add-database-part2.md" />

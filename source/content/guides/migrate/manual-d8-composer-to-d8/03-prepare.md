---
title: Migrate a Drupal 8 Site That Is Managed With Composer From Another Platform
subtitle: Prepare
description: 
cms: "Drupal 8"
categories: [develop]
tags: [code, launch, migrate, site, updates, composer]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/manual-d8-composer-to-d8-to-d8/prepare
anchorid: prepare
editpath: migrate/manual-d8-composer-to-d8-to-d8/03-prepare.md
reviewed: "2021-05-09"
---

Complete all steps in this section to ensure that your site is ready to be migrated to Pantheon.

## Create a New Site

<<<<<<< HEAD
<Partial file="migrate/create-new-drupal-site.md" />
=======
1. Log in to your Pantheon account. If you don't have an account, [create one](https://pantheon.io/register?docs) and familiarize yourself with the [User Dashboard](/guides/quickstart/user-dashboard) before you create a new site.

1. Set up [SSH Keys](/ssh-keys) on your local computer and Pantheon account.

1. Navigate to your User Dashboard, then click <Icon icon={"more-windows"} text={"Sites:"}/> **Create New Site**.

1. Click **Visit your Pantheon Site Dashboard**.
>>>>>>> 298b30c47f0bd05820129a3f4f5187765753f087

### Set Drupal Core Version

The previous step created a site using Drupal version 9.  To remain on Drupal 8, set the core version as follows: 

<Partial file="drupal-9/core-version-remain-on-d8.md" />

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment-no-clone.md" />

### Create a Local Copy of the Old Site's Code

<Partial file="migrate/drupal-create-local.md" />

### Retrieve a Local Copy of the Pantheon Site's Code

<Partial file="migrate/drupal-get-local.md" />

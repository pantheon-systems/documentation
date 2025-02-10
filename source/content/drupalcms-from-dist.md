---
title: Create a DrupalCMS Site
description: Learn how to create a site using DrupalCMS.
tags: [site, D8, D9, D10]
permalink: docs/drupalcms-from-dist
contributors: [wordsmither]
contenttype: [doc]
innav: [true]
categories: [create]
cms: [drupal]
audience: [development]
product: [dashboard, terminus]
integration: [--]
reviewed: "2025-02-10"
---

# Create a DrupalCMS Site

DrupalCMS is a powerful and flexible content management system that allows you to build and manage your website with ease. This guide will walk you through the process of creating a new DrupalCMS site on Pantheon.

## Prepare

<Partial file="drupal/prepare-local-environment-no-clone-no-alias.md" />

## Create a Site Based on an Empty Upstream

There are two ways to create an empty Upstream site: via the [Pantheon Dashboard](/guides/legacy-dashboard/create-sites) and via [Terminus](/terminus).

- Via the Pantheon Dashboard:

  - Use the [Empty Site Upstream](https://dashboard.pantheon.io/sites/create?upstream_id=4c7176de-e079-eed1-154d-44d5a9945b65)

- Via Terminus:

  ```bash{promptUser: user}
  terminus site:create my-new-site "My New Site" empty


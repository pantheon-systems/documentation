---
title: Migrate a Site That Was Created Before November 2011 to Drupal 9
subtitle: Prepare
description: 
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-pre112021/prepare
anchorid: prepare
editpath: drupal-9/drupal-9-hosted-pre112021/03-prepare.md
reviewed: "2021-03-31"
---

This page provides steps on preparing your site for migration to [Drupal with Composer Upstream](/guides/integrated-composer#get-started-with-integrated-composer).

## Use Terminus to Confirm the Drupal 9 Upstream

Run the command `terminus site:info $SITE` to display the site's basic information and properties.

The following is an abridged example of the output for a site upstream set to `drupal-project`:

```bash{outputLines:2-13}
terminus site:info $SITE
------------------ -------------------------------------------------------------------------------------
ID                 abdc3ea1-fe0b-1234-9c9f-3cxeAA123f88
Name               anita-drupal
Label              AnitaDrupal
Created            2019-12-02 18:28:14
Framework          drupal8
...
//highlight-start
Upstream           e96c6794-77fe-4931-9a20-48a2fe1a3789: https://github.com/pantheon-upstreams/drupal-project.git
//highlight-end
...
------------------ -------------------------------------------------------------------------------------
```

The following values indicate that a site is using a `drupal-recommended` upstream:

  - The `Framework` is `drupal8`

  - The `Upstream` includes `https://github.com/pantheon-upstreams/drupal-project.git`

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment-no-clone.md" />

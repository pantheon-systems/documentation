---
title: Migrate a Site That Was Created Using a Deprecated Upstream to Drupal 9
subtitle: Prepare
description: 
cms: "Drupal 9"
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-deprecated-upstream/prepare
anchorid: prepare
editpath: drupal-9/drupal-9-hosted-deprecated-upstream/03-prepare.md
reviewed: "2021-03-31"
contenttype: [guide]
categories: [migrate, update]
newcms: [drupal9, drupal]
audience: [development]
product: [terminus, composer]
integration: []
---

This page provides steps on preparing your site for migration to [Drupal with Composer Upstream](/guides/integrated-composer).

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
Use these values to determine which upstream a site is using:

| Framework | Upstream | Site upstream is...
|---|---|---
|drupal8|https://github.com/pantheon-upstreams/drupal-recommended.git|drupal-recommended
|drupal8|https://github.com/pantheon-upstreams/drupal-project.git|drupal-project



## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment-no-clone.md" />

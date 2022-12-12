---
title: Migrate a Site Created With the Pantheon Dashboard to Drupal 9
subtitle: Prepare
description: 
cms: "Drupal 9"
tags: [code, launch, migrate, site, updates, composer]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-createdashboard-set8/prepare
anchorid: prepare
editpath: drupal-9-hosted-createdashboard-set8/03-prepare.md
reviewed: "2021-03-31"
contenttype: [guide]
categories: [migrate, git]
newcms: [drupal9]
audience: [development]
product: [dashboard]
integration: [--]
---

<Alert title="Note"  type="info" >

Follow the steps in the [Composer Conversion Guide](/guides/composer-convert) to ensure that your site is ready for upgrade to Drupal 9.

</Alert>

## Verify the Repository

1. Check that your site has the [Pantheon drupal-composer-managed repo](https://github.com/pantheon-upstreams/drupal-composer-managed) in its upstream.

1. Use Terminus to confirm the `drupal-composer-managed` upstream:

  ```bash
  terminus site:info $SITE 
  ```

  The following values indicate that a site is using the `drupal-composer-managed` upstream:

   - The `Framework` is `drupal8`
   - The `Upstream` includes `https://github.com/pantheon-upstreams/drupal-composer-managed`

   The following is an abridged example of the output for the `terminus site:info $SITE` command, if the site upstream is set to `drupal-composer-managed`:

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
   Upstream           897fdf15-992e-4fa1-beab-89e2b5027e03: https://github.com/pantheon-upstreams/ drupal-composer-managed
   //highlight-end
   ...
   ------------------ -------------------------------------------------------------------------------------
   ```

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment-no-clone.md" />

### Apply All Available Upstream Updates

<Partial file="drupal-apply-upstream-updates-drupal-recommended.md" />

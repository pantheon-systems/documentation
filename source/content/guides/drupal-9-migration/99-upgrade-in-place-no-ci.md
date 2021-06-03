---
title: Migrate to Drupal 9 on Pantheon
subtitle: Upgrade in place
description: Steps to upgrade, perform a guided migration, or migrate manually to Drupal 9 on Pantheon.
categories: [get-started]
cms: drupal-9
tags: [code, launch, migrate, site, updates]
reviewed: "2021-03-31"
layout: guide
permalink: docs/guides/drupal-9-migration/99-upgrade-in-place-no-ci.md
anchorid: drupal-9-migration
editpath: drupal-9-migration/99-upgrade-in-place-no-ci.md
---


## Will This Guide Work for Your Site?

* No node js

* You've been upgraded to 10.4

<Alert type="info" title="Do not upgrade unless the site is eligible.">

In your site Dashboard, look for the blue banner across the top that says that your site is compatible with a [database upgrade](/pantheon-yml#specify-a-version-of-mariadb):

> Good news, your site's database version is now configurable! Learn how.

[Contact Support](/support) if you're ready to use Drupal 9, but you don't see the banner on the Dashboard.

</Alert>



## Conversion Steps

1. Validate that all your contribs are in the composer.json

2. Make sure your custom module code is in web/modules

3. make sure your custom code has the correct module specs in `MODULE_NAME.info.yml`

...the rest of the steps from ## Migrate the Drupal 8 Code to the Drupal 9 Site on [MANUAL MIGRATION DOC](./04-migrate-manual-d9.md)



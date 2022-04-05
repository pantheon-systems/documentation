---
title: Migrate a Composer Managed Drupal 8 Site to Drupal 9
subtitle: Prepare
description: 
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
permalink: docs/guides/drupal-9-v8-composer/prepare
anchorid: prepare
editpath: drupal-9-v8-composer/03-prepare.md
---

### Verify the Repository

1. Check that your site has the [Pantheon drupal-recommended repo](https://github.com/pantheon-upstreams/drupal-recommended) in its upstream.

1. Use Terminus to Confirm the drupal-recommended Upstream:

  ```bash
  terminus site:info $SITE 
  ```

  The following values indicate that a site is using the `drupal-recommended` upstream:

  - The `Framework` is `drupal8`
  - The `Upstream` includes `https://github.com/pantheon-upstreams/drupal-recommended`

  The following is an abridged example of the output for the `terminus site:info $SITE` command, if the site upstream is set to `drupal-recommended`:

  ```bash{outputLines:2-18}
  terminus site:info $SITE
  ------------------ -------------------------------------------------------------------------------------
  ID                 abdc3ea1-fe0b-1234-9c9f-3cxeAA123f88
  Name               anita-drupal
  Label              AnitaDrupal
  Created            2019-12-02 18:28:14
  Framework          drupal8
  ...
  Upstream           897fdf15-992e-4fa1-beab-89e2b5027e03: https://github.com/pantheon-upstreams/drupal-recommended
  ...
  ------------------ -------------------------------------------------------------------------------------
  ```

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment-no-clone.md" />

### Apply All Available Upstream Updates

[Update the site](/core-updates) to the latest [Pantheon Drupal Recommended](https://github.com/pantheon-upstreams/drupal-recommended) Upstream and apply all available updates.

1. Use Terminus to list all available updates:

  ```bash{outputLines:2}
  terminus upstream:updates:list $SITE.dev
  [warning] There are no available updates for this site.
  ```

1. Run the following code to apply available updates:

  ```bash{promptUser: user}
  terminus upstream:updates:apply $SITE.dev --updatedb
  ```

You can also use the [Pantheon Dashboard](/core-updates#apply-upstream-updates-via-the-site-dashboard) to apply upstream updates.
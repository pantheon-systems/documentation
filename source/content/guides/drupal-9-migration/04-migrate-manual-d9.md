---
title: Migrate to Drupal 9 on Pantheon
subtitle: Manually Migrate
description: Migrate a Drupal 8 Site to Drupal 9 on Pantheon
categories: [develop]
cms: drupal-9
tags: [code, launch, migrate, site, updates]
contributors: [sarahg, greg-1-anderson]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-migration/migrate-manual-d9
anchorid: drupal-9-migration/migrate-manual-d9
editpath: drupal-9-migration/04-migrate-manual-d9.md
---

In this doc, you'll create a new Drupal 9 site and migrate the code from an existing Drupal 8 site to it.

## Will This Guide Work for Your Site?

<Partial file="drupal-9/upgrade-site-requirements.md" />

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment.md" />

This doc uses the following aliases:

- **Alias:** `D8_SITE`
  - **Site Name:** `best-drupal8-site-ever`
- **Alias:** `D9_SITE`
  - **Site Name:** `best-drupal9-site-ever`

## Create a New Drupal 9 Site

<Partial file="drupal-9/drupal-9-upstream-install.md" />

## Migrate the Drupal 8 Code to the Drupal 9 Site

1. From the local Drupal 9 site's directory, use Terminus to retrieve the D8 site's Git URL:

  ```bash{promptUser: user}
  terminus connection:info $D8_SITE.dev --field=git_url
  ```

1. Add the Drupal 8 site as a remote repository called `existing-8`. Use the URL retrieved in the previous step:

  ```bash{promptUser: user}
  git remote add existing-8 ssh://codeserver.dev.xxxx@codeserver.dev.xxxx.drush.in:2222/~/repository.git
  git fetch existing-8
  ```

1. Copy over exported configuration from the original site. From your D9 site, run the following commands:

  ```bash{promptUser: user}
  git checkout existing-8/master -- sites/default/config
  git mv sites/default/config/* config/
  git commit -m "Add site configuration."
  ```

1. Compare your current `pantheon.yml` file with the new D9 `pantheon.upstream.yml`:

  ```bash{promptUser: user}
  git diff existing-8/master:pantheon.yml pantheon.upstream.yml
  ```

1. If you have customizations in your D8 site's `pantheon.yml` that you want to keep for D9 (e.g., a Quicksilver script or site-specific protected web paths), copy `pantheon.yml` over:

  ```bash{promptUser: user}
  git checkout existing-8/master -- pantheon.yml
  git commit -m "Update pantheon.yml."
  ```

1. Copy over any Quicksilver scripts referenced in `pantheon.yml`:

  ```bash{promptUser: user}
  git checkout existing-8/master -- private/scripts
  git commit -m "Add Quicksilver scripts."
  ```

1. List contrib modules and themes on your D8 site:

  ```bash{promptUser: user}
  terminus drush $D8_SITE.dev -- pm:projectinfo --status=enabled --fields=name,version --format=table
  ```

1. Then use Composer on your D9 site to add these there:

  ```bash{promptUser: user}
  composer require drupal/ctools:^3.4 drupal/redirect:^1.6 drupal/token:^1.7
  git add composer.*
  git commit -m "Add contrib projects."
  ```

1. Copy over any custom modules or themes from your D8 site:

  ```bash{promptUser: user}
  git checkout existing-8/master -- modules/custom themes/custom
  git mv themes/* web/themes
  git mv modules/* web/modules
  git commit -m "Add custom projects."
  ```

1. Check `settings.php` for any customizations to copy over:

  ```bash{promptUser: user}
  # Fetch your D8 settings file.
  git show existing-8/master:sites/default/settings.php > web/sites/default/original-settings.php
  # Check for any customizations (if this returns nothing, you can move on to the next step).
  # Copy what you need over to web/sites/default/settings.php, and commit as needed.
  diff -Nup web/sites/default/settings.php web/sites/default/original-settings.php
  # Remove the original copy.
  rm web/sites/default/original-settings.php
  ```

1. Copy your files and database from your D8 site to the D9 site:

  ```bash{promptUser: user}
  terminus site:clone $D8_SITE.live $D9_SITE.dev --no-code --no-destination-backup --no-source-backup
  ```

1. Push the D9 codebase from your local machine up to Pantheon:

  ```bash{promptUser: user}
  terminus connection:set $D9_SITE.dev git
  git push origin master
  ```

1. Run database updates:

  ```bash{promptUser: user}
  terminus drush $D9_SITE.dev -- updatedb
  ```

1. Review the site, then proceed to launch using the [Pantheon Relauch](/relaunch) documentation.

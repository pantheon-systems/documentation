---
title: Migrate a Site That Was Created with Build Tools to Drupal:latest
subtitle: Prepare
description: 
<<<<<<< HEAD:source/content/guides/drupal-latest/drupal-latest-hosted-createbt/03-prepare.md
cms: "Drupal"
=======
cms: "Drupal:latest"
>>>>>>> eec42263af4cf5e002bae842ccae64ea51704a74:source/content/guides/drupal-latest/drupal-latest-hosted-createbt/03-prepare.md
tags: [code, launch, migrate, site, updates, D8, D9, D10]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/drupal-latest-hosted-createbt/prepare
anchorid: prepare
editpath: drupal-latest/drupal-latest-hosted-createbt/03-prepare.md
reviewed: "2022-12-12"
contenttype: [guide]
categories: [migrate, git]
newcms: [drupal, drupal8, drupal9, drupal10]
audience: [development]
product: [dashboard]
integration: [--]
---

## Prepare the Local Environment

1. Get a local copy of both your new site (from the external repository) and your existing site codebase.

1. In the **<span class="glyphicons glyphicons-wrench"></span> Dev** tab of the site's Dashboard, set the **Development Mode** to **Git**, and [clone the site locally](/guides/local-development/configuration).

1. Change into the `$SITE` directory, then create a new branch based on the default:

   ```bash{promptUser: user}
   cd $SITE
   git checkout -b drup-upg-latest
   ```

1. Use Terminus and Drush to export the latest version of the config files from the production environment to `sites/default/files/config`:

   ```bash{promptUser: user}
   terminus drush $SITE.live -- config:export --destination sites/default/files/config
   ```

1. For rsync, copy the SFTP host information.

   ```bash{promptUser: user}
   RSYNC_HOST=$(terminus connection:info $SITE.live --field=sftp_host)
   ```

1. Use that host name to rsync from `config:export`:

   ```bash{promptUser: user}
   rsync -rvlz --copy-unsafe-links --size-only --checksum --ipv4 --progress -e 'ssh -p 2222' "${RSYNC_HOST}:files/config" .
   ```

1. If you run `git status` it should display changed files in the `config` directory if there are any changed configurations in production.

   ```bash{promptUser: user}
   git status
   ```

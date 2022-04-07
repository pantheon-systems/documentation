---
title: Migrate from a Build tools Managed Drupal 8 Site to Drupal 9
subtitle: Prepare
description: 
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-v8-build-tools/prepare
anchorid: prepare
editpath: drupal-9-v8-build-tools/03-prepare.md
---
## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment.md" />

4. Install the [jq](https://formulae.brew.sh/formula/jq) JSON processor and [rsync](https://formulae.brew.sh/formula/rsync) on your local environment if they aren't already installed. Install with Homebrew, if using MacOS:

  ```bash{promptUser: user}
  brew install jq rsync
  ```

## Prepare a Local Copy of the Site for Upgrade

1. In the **Dev** tab of the site's Dashboard, set the **Development Mode** to **Git**, and [clone the site locally](/local-development#get-the-code).

1. Change into the `$SITE` directory, then create a new branch based on the default:

   ```bash{promptUser: user}
   cd $SITE
   git checkout -b d9-upg-21
   ```

1. Use Terminus and Drush to export the latest version of the config files from the production environment to `sites/default/files/config`:

   ```bash{promptUser: user}
   terminus drush $SITE.live -- config:export --destination sites/default/files/config
   ```

1. For rsync, copy the sftp host information.

   ```bash{promptUser: user}
   RSYNC_HOST=$(terminus connection:info $SITE.live --field=sftp_host)
   ```

1. Use that host name to rsync from `config:export`:

   ```bash{promptUser: user}
   rsync -rvlz --copy-unsafe-links --size-only --checksum --ipv4 --progress -e 'ssh -p 2222' "${RSYNC_HOST}:files/config" .
   ```

1. If you do a `git status` it should show changed files in the `config` directory if there are any changed configurations in production.

   ```bash{promptUser: user}
   git status
   ```

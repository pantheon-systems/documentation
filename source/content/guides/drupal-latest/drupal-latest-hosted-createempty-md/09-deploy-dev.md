---
title: Migrate a Site That Was Created With an Empty Upstream to Drupal:latest
subtitle: Deploy to Dev
description: 
cms: "Drupal:latest"
tags: [code, launch, migrate, site, updates, D8, D9, D10]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/drupal-latest-hosted-createempty-md/deploy-dev
anchorid: deploy-dev
editpath: drupal-latest/drupal-latest-hosted-createempty-md/09-deploy-dev.md
reviewed: "2022-12-13"
contenttype: [guide]
categories: [overview, migrate]
newcms: [drupal, drupal8, drupal9, drupal10]
audience: [agency, development]
product: [--]
integration: [--]
---

You've now committed the code to the local branch. Deploy that branch directly to a new Multidev (called `composerify` in the steps below) and test the site in the browser.

### Deploy to a Multidev

1. Push the changes to a Multidev called `composerify` to safely test the site without affecting the Dev environment:

   ```bash{promptUser:user}
   git push -u origin composerify && terminus env:create $SITE.dev composerify
   ```

1. Make a small change to `pantheon.yml`:

   ```yaml:title=pantheon.yml
   database:
    version: 10.4

   # add a comment to trigger a change and build
   ```

1. Commit and push the change to trigger an Integrated Composer build on the Multidev:

   ```bash{promptUser: user}
   git commit -am "trigger composer build"
   git push origin composerify
   ```

Since the commit history of the `composerify` Multidev has no commits in common with the `master` branch, you cannot view the Multidev commit history from the Dashboard or the Integrated Composer logs.

If the site is not working, try this Composer command on the local `composerify` branch:

```bash{promptUser: user}
composer --no-dev --optimize-autoloader --no-interaction --no-progress --prefer-dist --ansi install
```

If Composer runs into an error or if any files have been changed (files that are not ignored by `.gitignore`), resolve those issues before you continue. Refer to the [Integrated Composer Troubleshooting](/guides/integrated-composer/ic-troubleshooting) section for more information about troubleshooting Integrated Composer.

### Move composerify to the Main Dev Branch

After you confirm that the site works in the Multidev, replace the `master` branch and its commit history with the `composerify` Multidev's commit history:

1. Retrieve the most recent commit hash from the local `composerify` branch:

   ```bash{promptUser: user}
   git log --format="%H" -n 1
   ```

   This will give you a commit hash like `fd3636f58f5b275b998bb1c9267bff8808353840`.

1. Reset the `master` branch to match that commit, then force push it to the Dev environment:

   ```bash{promptUser: user}
   git checkout master
   git reset --hard fd3636f58f5b275b998bb1c9267bff8808353840
   git push --force origin master
   ```

Your site's Dev environment is now set up to use the Drupal 9 Integrated Composer upstream.

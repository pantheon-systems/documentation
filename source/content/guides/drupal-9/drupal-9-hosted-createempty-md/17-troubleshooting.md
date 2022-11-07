---
title: Migrate a Site That Was Created With an Empty Upstream to Drupal 9
subtitle: Troubleshooting
description: Troubleshoot common issues when migrating.
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-createempty-md/troubleshooting
anchorid: troubleshooting
editpath: drupal-9/drupal-9-hosted-createempty-md/17-troubleshooting.md
reviewed: "2021-03-31"
contenttype: guide
categories: []
newcms: [drupal9]
audience: [development]
product: []
integration: []
---

## Permission denied (publickey)

If you encounter a `Permission denied (publickey)` error, check that your [SSH keys](/ssh-keys) are set up correctly.

If you continue to encounter the error, use HTTPS to add the remote:

```bash{outputLines:2}
git remote add ic https://github.com/pantheon-upstreams/drupal-composer-managed.git && git fetch ic && git checkout --no-track -b composerify ic/master
Switched to a new branch 'composerify'
```

## Provided host name not valid

If you receive the error message `The provided host name is not valid for this server.`, update your `settings.php` file with a trusted host setting. Refer to the [Trusted Host Setting](/guides/php/settings-php#trusted-host-setting) documentation for more information.

## Inspect Site Logs

If the site doesn't load properly, clear the cache and try again.

Use Terminus to inspect the site's logs;

```bash{promptUser: user}
terminus drush $SITE.composerify -- wd-show
```

Refer to our [logs collection](/guides/logs-pantheon) documentation for more information.

---
title: Migrate a Site That Was Created with an Empty Upstream to Drupal 9
subtitle: Troubleshooting
description: 
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-pre112021/troubleshooting
anchorid: troubleshooting
editpath: drupal-9/drupal-9-hosted-pre112021/17-troubleshooting.md
---


## Provided host name not valid

If you receive the error message "The provided host name is not valid for this server.", then update your `settings.php` file with a trusted host setting. Refer to the [Trusted Host Setting](/settings-php#trusted-host-setting) documentation for more information.

## Inspect Site Logs

If the site doesn't load properly, before you do too much work to investigate issues, clear the cache and try again.

Use Terminus to inspect the site's logs;

```bash{promptUser: user}
terminus drush $SITE.composerify -- wd-show
```

See our [logs collection](/logs) documentation for more information.

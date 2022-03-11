---
title: Migrate to Drupal 9 on Pantheon
subtitle: Troubleshooting
description: Migrate a Drupal 8 Site to Drupal 9 on Pantheon
categories: [develop]
cms: drupal-9
tags: [code, launch, migrate, site, updates]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-migration/troubleshoot
anchorid: drupal-9-migration/troubleshoot
editpath: drupal-9-migration/troubleshoot.md
---

This guide provides common troubleshooting tasks when migrating to Drupal 9 with Integrated Composer.

### Pantheon Launch Check Status Error: services.yml does not exist

After you set up Drupal 9, the following error might be displayed in the **Best practices** section of the Pantheon Launch Check:

> <span  style="color:red">x <strong>sites/default/services.yml:</strong></span> services.yml does not exist! Copy the default.service.yml to services.yml and see https://www.drupal.org/documentation/install/settings-file for details.
><br />
><br />
>
> *Create services.yml file inside sites/default directory by copying default/services.yml file. Refer to https://www.drupal.org/documentation/install/settings-file for details.*

Ensure your site's [Development Mode](/guides/quickstart/connection-modes/) is set to **Git**, then use the terminal on the local machine where you cloned the site, and from the project's root directory:

1. Copy `default.services.yml` to `services.yml`:

 ```bash{promptUser: user}
 cp web/sites/default/default.services.yml web/sites/default/services.yml
 ```

1. Commit and push:

 ```bash{promptUser: user}
 git add web/sites/default/services.yml && git commit -m "init services.yml"
 git push origin master
  ```

Learn more about the [service configuration](/services-yml#create-and-modify-servicesyml) file.

### Error: Class ViewPageController Does Not Exist

As reported in [Drupal Issue 3161309](https://www.drupal.org/project/drupal/issues/3161309), some fresh installations may encounter the error:

```none
InvalidArgumentException: Class "Drupal\views\Routing\ViewPageController" does not exist.
```

If you encounter this error, [clear the cache through the Site Dashboard](/clear-caches#pantheon-dashboard), or with the [Terminus](/terminus) `drush cr` command:

```bash{promptUser: user}
terminus drush <site>.<env> -- cr
```

Given the nature of the bug, it might be easier to reinstall Drupal 9.

### Pantheon Drupal 8 Modules Being Upgraded to Drupal 9

| Module Name                                                                                 | Drupal 8 Version? | Drupal 9 Version? |
|---------------------------------------------------------------------------------------------|:-----------:|:-----------:|
| [Pantheon Advanced Page Cache](https://www.drupal.org/project/pantheon_advanced_page_cache) |     Yes     |     Yes     |
| [Search API Pantheon](https://www.drupal.org/project/search_api_pantheon)                   |     Yes     |     Yes     |

### Site-local Drush Is Required for Drupal 9 Sites

Do not remove `drush/drush` from `composer.json`. If it's removed, `terminus drush` commands will fail with errors related to Twig.

### Where can I report an issue?

[Contact support](/guides/support/contact-support) to report any issues that you encounter.

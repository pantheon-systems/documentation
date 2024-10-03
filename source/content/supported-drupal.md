---
title: Supported Drupal Versions
description: Learn which versions of Drupal are currently supported, as well as additional compatibility information.
tags: [libraries, updates]
contributors: [wordsmither]
contenttype: [doc]
innav: [true]
categories: [cms]
cms: [drupal]
audience: [development]
product: [--]
integration: [--]
reviewed: "2024-08-13"
---

The following table indicates availability of the specified Drupal version, as well as our usage recommendations and our support scope.

| Drupal Version | Available | Recommended | Supported |
| ----------- | :---------: | :---------: | :---------: |
| 11          | <span style="color:green">✔</span> | <span style="color:green">✔</span>           | <span style="color:green">✔</span>
| 10          | <span style="color:green">✔</span>         | <span style="color:green">✔</span>           | <span style="color:green">✔</span>          |
| 9           |⚠️ <Popover title="Drupal 9 Availability" content="Drupal 9 is past its end of life date and is not an available option during site creation in the Pantheon dashboard. For a workaround, see the  <a href='#drupal-8-and-9-on-pantheon'>section below.</a>  While it remains functional on the platform, do not build for the future on it." /> | ❌           | <span style="color:green">✔</span> |
| 8           |⚠️ <Popover title="Drupal 8 Availability" content="Drupal 8 is past its end of life date and is not an available option during site creation in the Pantheon dashboard. For a workaround, see the  <a href='#drupal-8-and-9-on-pantheon'>section below.</a>  While it remains functional on the platform, do not build for the future on it." /> | ❌           | <span style="color:green">✔</span> |
| 7           | <span style="color:green">✔</span>         | ❌           | <span style="color:green">✔</span>          |
| 6           | ❌          | ❌           | ❌          |

## Drupal 10 and 11 on Pantheon
Refer to [Create a New CMS Site](/add-site-dashboard) for how to create a new Drupal 10 or 11 site from the Pantheon dashboard.

If you already have a Drupal 10 site on Pantheon, you can upgrade your existing site to [Drupal 11 via Composer](https://www.drupal.org/docs/upgrading-drupal/upgrading-from-drupal-8-or-later/how-to-upgrade-from-drupal-10-to-drupal-11).

## Drupal 8 and 9 on Pantheon
Drupal 8 and 9 are not available as an option during site creation in the Pantheon dashboard, however they can still be created on the platform using Terminus. For example:

```bash{promptUser: user}
terminus site:create <site> <label> drupal8
```

## Drush Version Support

Refer to [Manage Drush Versions on Pantheon](/guides/drush/drush-versions/) for information on Drush versions that are compatible with each Drupal version.

## Modules Support

Refer to [Drupal Modules with Known Issues](/modules-known-issues) for a list of known compatibility issues.

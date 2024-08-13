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
---

The following table indicates availability of the specified Drupal version, as well as our usage recommendations and our support scope.

| Drupal Version | Available | Recommended | Supported |
| ----------- | :---------: | :---------: | :---------: |
| 11          | ⚠️ <Popover title="Drupal 11 Availability" content="See the <a href='#drupal-11-on-pantheon'>following section</a> for how to run Drupal 11 on Pantheon today." />        | <span style="color:green">✔</span>           | <span style="color:green">✔</span>
| 10          | <span style="color:green">✔</span>         | <span style="color:green">✔</span>           | <span style="color:green">✔</span>          |
| 9           | <span style="color:green">✔</span>          | <span style="color:green">✔</span>           | <span style="color:green">✔</span>         |
| 8           | <span style="color:green">✔</span>          | ❌           | <span style="color:green">✔</span>         |
| 7           | <span style="color:green">✔</span>         | ❌           | <span style="color:green">✔</span>          |
| 6           | ❌          | ❌           | ❌          |

## Drupal 11 on Pantheon
Drupal 11 is not yet an option when creating a new site and there is no current ETA for when it will be added. However, Drupal 11 has been tested and is reported to work on Pantheon today.

To run Drupal 11 on the platform, you must [create a new Drupal 10 site](/add-site-dashboard) then [upgrade to Drupal 11 via composer](https://www.drupal.org/docs/upgrading-drupal/upgrading-from-drupal-8-or-later/how-to-upgrade-from-drupal-10-to-drupal-11).

## Drush Version Support

Refer to [Manage Drush Versions on Pantheon](/guides/drush/drush-versions/) for information on Drush versions that are compatible with each Drupal version.

## Modules Support

Refer to [Drupal Modules with Known Issues](/modules-known-issues) for a list of known compatibility issues.

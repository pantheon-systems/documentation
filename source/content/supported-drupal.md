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
| 11          | ⚠️ <Popover title="Drupal 11 Availability" content="See the <a href='#drupal-11-on-pantheon'>following section</a> for how to set up Drupal 11 on Pantheon today." />        | <span style="color:green">✔</span>           | <span style="color:green">✔</span>
| 10          | <span style="color:green">✔</span>         | <span style="color:green">✔</span>           | <span style="color:green">✔</span>          |
| 9           | <span style="color:green">✔</span>          | <span style="color:green">✔</span>           | <span style="color:green">✔</span>         |
| 8           | <span style="color:green">✔</span>          | ❌           | <span style="color:green">✔</span>         |
| 7           | <span style="color:green">✔</span>         | ❌           | <span style="color:green">✔</span>          |
| 6           | ❌          | ❌           | ❌          |

## Drupal 11 on Pantheon
Drupal 11 is not yet an option when creating a new site. It will be added to the Pantheon dashboard in the coming weeks. However, Drupal 11 has been tested and works on Pantheon environments.

If you already have a Drupal 10 site on Pantheon, you can upgrade your existing site to [Drupal 11 via Composer](https://www.drupal.org/docs/upgrading-drupal/upgrading-from-drupal-8-or-later/how-to-upgrade-from-drupal-10-to-drupal-11).

To create a new Drupal 11 site on Pantheon, first you have to [create a new Drupal 10 site](/add-site-dashboard) and then [upgrade to Drupal 11 via Composer](https://www.drupal.org/docs/upgrading-drupal/upgrading-from-drupal-8-or-later/how-to-upgrade-from-drupal-10-to-drupal-11).

## Drush Version Support

Refer to [Manage Drush Versions on Pantheon](/guides/drush/drush-versions/) for information on Drush versions that are compatible with each Drupal version.

<Alert title="Note"  type="info" >

### Site-local Drush is required for Drupal sites.

Do not remove `drush/drush` from `composer.json`. If it's removed, `terminus drush` commands will fail with errors related to Twig.

</Alert>

## Modules Support

Refer to [Drupal Modules with Known Issues](/modules-known-issues) for a list of known compatibility issues.

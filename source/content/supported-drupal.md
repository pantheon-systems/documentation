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
reviewed: "2024-10-15"
---

The following table indicates availability of the specified Drupal versions, as well as our usage recommendations and our support scope.

| Drupal version | Available | Recommended | Supported |
| ----------- | :---------: | :---------: | :---------: |
| 11          | <span style="color:green">✔</span> | <span style="color:green">✔</span>           | <span style="color:green">✔</span>
| 10          | <span style="color:green">✔</span>         | <span style="color:green">✔</span>           | <span style="color:green">✔</span>          |
| 9           |<span style="color:green">✔</span> <Popover title="Drupal 9 Availability" content="Drupal 9 is past its end of life date and is not an available option during site creation in the Pantheon dashboard. For a workaround, see the  <a href='#drupal-8-and-9-on-pantheon'>section below.</a>  While it remains functional on the platform, do not build for the future on it." /> | ❌           | <span style="color:green">✔</span> |
| 8           |<span style="color:green">✔</span> <Popover title="Drupal 8 Availability" content="Drupal 8 is past its end of life date and is not an available option during site creation in the Pantheon dashboard. For a workaround, see the  <a href='#drupal-8-and-9-on-pantheon'>section below.</a>  While it remains functional on the platform, do not build for the future on it." /> | ❌           | <span style="color:green">✔</span> |
| 7           | <span style="color:green">✔</span>         | ❌           | <span style="color:green">✔</span> <Popover title="Drupal 7 LTS" content="Pantheon offers Long-Term Support for Drupal 7 sites on the platform at no extra cost. For more information, see the <a href='#drupal-7-long-term-support'>section below.</a>" />        |
| 6           | ❌          | ❌           | ❌          |

## Drupal 10 and 11 on Pantheon
Refer to [Create a New CMS Site](/add-site-dashboard) for how to create a new Drupal 10 or 11 site from the Pantheon dashboard.

If you already have a Drupal 10 site on Pantheon, you can upgrade your existing site to [Drupal 11 via Composer](https://www.drupal.org/docs/upgrading-drupal/upgrading-from-drupal-8-or-later/how-to-upgrade-from-drupal-10-to-drupal-11).

## Drupal 8 and 9 on Pantheon
Drupal 8 and 9 are not available as an option during site creation in the Pantheon dashboard. However, they can still be created on the platform using [Terminus](/terminus). For example:

```bash{promptUser: user}
terminus site:create <site> <label> drupal8
```

## Drupal 7 on Pantheon
Refer to [Create a New CMS Site](/add-site-dashboard) for how to create a new Drupal 7 site from the Pantheon dashboard.

### Drupal 7 long-term support
Drupal 7 will reach it's end of life on January 5, 2025. Pantheon has partnered with Tag1 Consulting to offer Long-Term Support for Drupal 7 through January 5, 2027.

#### What's included
* Security and compatibility updates to Drupal core and core dependencies from Tag1 Consulting by updating their site running on the [Pantheon Drupal 7 Upstream](https://github.com/pantheon-systems/drops-7) via [the Pantheon Dashboard](core-updates#apply-upstream-updates-via-the-site-dashboard) or [Terminus command line tool](/core-updates#apply-upstream-updates-via-terminus).
* Security patches and compatibility updates to community-contributed modules that power their site via Tag1’s D7 Extended Support (D7ES) module, which will be included in the Upstream.
* Continued support for Drupal 7-compatible runtime environments on the Pantheon Platform, including PHP, MySQL and other prerequisites.

To learn more about this partnership, see related blog post: [Pantheon and Tag1 Consulting Partner to Provide Long-Term Support for Drupal 7 Websites ](https://pantheon.io/blog/pantheon-and-tag1-support-drupal-7-websites).

To learn more about migrating from Drupal 7 to the latest version of Drupal, see [this guide](https://pantheon.io/resources/guide/drupal-7-end-life-why-you-should-start-your-migration-drupal-10-today).

## Drush version support

Refer to [Manage Drush Versions on Pantheon](/guides/drush/drush-versions/) for information on Drush versions that are compatible with each Drupal version.

<Alert title="Note"  type="info" >

### Site-local Drush is required for Drupal sites.

Do not remove `drush/drush` from `composer.json`. If it's removed, `terminus drush` commands will fail with errors related to Twig.

</Alert>

## Modules Support

Refer to [Drupal Modules with Known Issues](/modules-known-issues) for a list of known compatibility issues.

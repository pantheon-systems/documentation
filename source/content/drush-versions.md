---
title: Managing Drush Versions on Pantheon
description: Learn about Pantheon's default Drush version and how to implement site-local usage.
cms: "Drupal"
categories: [develop]
tags: [drush, updates]
reviewed: "2022-02-15"
---

By default, Pantheon runs Drush 8 on newly created Drupal 7 sites, and Drush 10 on newly created Drupal 9 sites.

## Terminus Drush and Local Drush

[Terminus](/terminus/) makes remote Drush calls on sites without using a local installation, eliminating compatibility issues between local and remote installs. For more information, see our guide on [Managing Drupal Sites with Terminus and Drush](/guides/terminus-drupal-site-management/).

## Available Drush Versions

Pantheon currently supports Drush versions 8, 10, and 11.

Drush 8 is the preferred version of Drush to use with Drupal 8 sites that are not managed by Composer. For sites that are managed by Composer, a [site-local installation](#site-local-drush-usage) of Drush is recommended.

We recommend managing your site through Composer. Visit the [Build Tools Workflow](/guides/build-tools/) for information on how to use Composer to manage Drupal sites on Pantheon, or the [Convert to Composer](/guides/composer-convert) guide to convert an existing site to a Composer-managed site.

## Verify Current Drush Version

Verify the current version of Drush running on Pantheon using [Terminus](/terminus/):

```bash{promptUser: user}
terminus drush <site>.<env> -- status | grep "Drush version"
```

## Configure Drush Version

Before you modify a site's Drush version, remember that not all versions of Drush are compatible with all versions of Drupal. See [Available Drush Versions](#available-drush-versions) and the [requirements below](#compatibility-and-requirements).

Change a site's Drush version via the [`pantheon.yml` file](/pantheon-yml/):

```yaml:title=pantheon.yml
api_version: 1

drush_version: 8
```

Now your site’s Drush version is managed via `pantheon.yml`, so it’s in version control and deployed along with the rest of your code.

<Alert title="Note" type="info">

If the `pantheon.yml` file does not exist, create it. If a `pantheon.upstream.yml` file exists, do not edit it. It is used by the upstream updates repository and will cause a [merge conflict if modified](/core-updates#error-updating-conflict-modifydelete-pantheonupstreamyml-deleted-in-head-and-modified-in-upstreammaster-version-upstreammaster-of-pantheonupstreamyml-left-in-tree).

</Alert>

## Compatibility and Requirements

Drush only supports one install method; it requires that your Drupal site be built with Composer and that Drush be compatible and listed as a dependency. Consider the following information when determining which Drush version is best suited for your site:

* [Drupal 9 requires Drush 10](https://www.drush.org/latest/install/#drupal-compatibility) or higher.
Drush 10 is available with the [addition of the  `pantheon.yml` file](#configure-drush-version) displayed above, or for [site-local installation](#site-local-drush-usage). It requires Drupal 8 or higher, [Composer](/guides/composer/), and PHP 7.1 or higher.

* [Drush 9](https://docs.drush.org/en/9.x/) and Drush 10 only work on Drupal 8.4 to Drupal 9.

* [Drush 8](https://docs.drush.org/en/8.x/) Drush 8 is the only recommended version to use in your pantheon.yml file. It is compatible with Drupal 7 and 8.

* While Drush 5 and Drush 7 are available on Pantheon if needed, they are listed as [unsupported](https://docs.drush.org/en/8.x/install/#drupal-compatibility) by the Drush maintainers, and should be avoided unless absolutely necessary.

<Alert title="Note" type="info">

When running Drush locally, we highly recommend running Drush version 8.3.2 or higher.

</Alert>

### PHP Requirements and Compatibility

| Drush Version  | PHP Version | End of Life     | Drupal 7| Drupal 8 | Drupal 9
| ------------- |:-------------:|:-------------:|:-------------:   |:-------------: |:-------------:  |        
| 11      | 7.4+     | TBD      |  <span style="color:red">❌ </span>    |<span style="color:red">❌ </span> |<span style="color:green">✔</span>  |
| 10      | 7.1+     | January 2022| ❌      |Compatible but no longer supported | Compatible but no longer supported| 
| 9      | 5.6+     | May 2020  | ❌      |Compatible but no longer supported |<span style="color:red">❌ </span>|
| 8     | 5.4.5+     | November 2022| <span style="color:green">✔</span>    |Supported but not recommended|<span style="color:red">❌ </span>|
| 7      | 5.3.0+     | July 2017| Compatible but no longer supported    |<span style="color:red">❌ </span>  |<span style="color:red">❌ </span>|
| 6      | 5.3.0+     | December 2015| Compatible but no longer supported    |<span style="color:red">❌ </span> |<span style="color:red">❌ </span>|
| 5     | 5.2.0+    | May 2015 | Compatible but no longer supported    |<span style="color:red">❌ </span>  |<span style="color:red">❌ </span> |

Drush 11 is not available through `pantheon.yml`. Drush 11 can only be used through a [site-local installation](#site-local-drush-usage).

For more information, refer to our guide on [Upgrading PHP Versions](/php-versions).

## Troubleshooting

Sometimes, even after updating the Drush version in `pantheon.yml`, the correct version of Drush is not called.

The Pantheon platform always prefers the site-local Drush or other local settings over the setting in `pantheon.yml`. Check for an outdated configuration file, `policy.drush.inc`, in your local `~/.drush` directory. Remove the file, or comment out its contents to resolve.

Executing Drush on the platform via a `terminus drush` command will use the version of Drush specified in `pantheon.yml`, unless a site-local version is present.

### Site-local Drush Usage

If you are managing your site with Composer, it is recommended that you use Drupal 9 with Drush 11 installed as a site-local Drush. For Drupal 8 sites, use Drush 10.

Do not select any major version of Drush lower than `8.3.2`, `9.7.1`, or `10.2.0`.

For more information, see [Avoiding “Dependency Hell” with Site-Local Drush](https://pantheon.io/blog/avoiding-dependency-hell-site-local-drush).

#### Permissions

Site-local Drush needs executable permissions. If you encounter "permission denied" errors when running Drush commands, adjust permissions on the Drush executable:

```bash{promptUser: user}
chmod +x vendor/bin/drush
```

Then commit and push this change back up to your Pantheon site.

### Drush 5 on Older Sites

Drupal sites created on Pantheon in late 2015 or earlier that do not have `drush_version` defined in `pantheon.yml` may default to Drush 5. In this case, you may see the following error:

```none
{{Uncaught Error: Call to undefined function mysql_connect() in /etc/drush/drush-5-extensions/pantheon.drush.inc:127
```

Configure a newer version of Drush as [documented above](#configure-drush-version) to resolve.

## See Also

- [Avoiding “Dependency Hell” with Site-Local Drush (Blog)](https://pantheon.io/blog/avoiding-dependency-hell-site-local-drush)
- [Fix Up Drush Site Aliases with a Policy File (Blog)](https://pantheon.io/blog/fix-drush-site-aliases-policy-file)
- [Expand Your Use of Drush on Pantheon with More Commands (Blog)](https://pantheon.io/blog/expand-use-drush-pantheon-more-commands)
- [Drupal Drush Command-Line Utility](/drush/)
- [The `pantheon.yml` Configuration File](/pantheon-yml)

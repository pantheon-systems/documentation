---
title: Managing Drush Versions on Pantheon
description: Learn about Pantheon's default Drush version and how to implement site-local usage.
tags: [devdrush, services, pantheonyml]
categories: [drupal,workflow,platform,develop]
---

The Drush version is set to the default Pantheon Platform version of Drush at the time the site was created. By default, Pantheon runs Drush 8 on newly created Drupal sites. You can [check your current Drush version via Terminus](#verify-current-drush-version).

Drush 8 is compatible with Drupal 6, 7, and 8.

Drush 10 is available with the [simple addition to your pantheon.yml file](#configure-drush-version) shown below or for [site-local installation](#site-local-drush-usage). It requires Drupal 8 or newer, [Composer](/composer/), and PHP 7.1 or newer.

<Alert title="Note" type="info">

When running Drush locally, we highly recommend running Drush version 8.3.0 or higher.

</Alert>

## Terminus Drush and Local Drush
[Terminus](/terminus/) makes remote Drush calls on sites without using a local installation, eliminating compatibility issues between local and remote installs. For more information, see our guide on [Managing Drupal Sites with Terminus and Drush](/guides/terminus-drupal-site-management/).

## Verify Current Drush Version
Verify the current version of Drush running remotely on Pantheon using [Terminus](/terminus/):

```bash
terminus drush <site>.<env> -- status | grep "Drush version"
```

## Configure Drush Version
Before you modify a site's Drush version, remember that not all versions of Drush are compatible with all versions of Drupal. See [Available Drush Versions](#available-drush-versions) and the PHP requirements below.

Change a site's Drush version via the [pantheon.yml file](/pantheon-yml/):

```yaml
api_version: 1

drush_version: 8
```

Now your site’s Drush version is managed via `pantheon.yml`, so it’s in version control and deployed along with the rest of your code.

<Alert title="Note" type="info">

If the `pantheon.yml` file does not exist, create it. If a `pantheon.upstream.yml` file exists, do not edit it. It is used by the upstream updates repository and will cause a [merge conflict if modified](/core-updates#error-updating-conflict-modifydelete-pantheonupstreamyml-deleted-in-head-and-modified-in-upstreammaster-version-upstreammaster-of-pantheonupstreamyml-left-in-tree).

</Alert>

### Available Drush Versions
Pantheon currently supports Drush 9 and Drush 10.

Drush 8 is the preferred version of Drush to use with Drupal 8 and Drupal 9 sites that are managed by Composer. See [Drupal 8 and Composer on Pantheon Without Continuous Integration](/guides/drupal-8-composer-no-ci/) and the [Build Tools Workflow](/guides/build-tools/) for information on how to use Composer to manage Drupal sites on Pantheon. Drush 8 should be used for Drupal 8 sites that are not managed by Composer, or that use modules that provide additional Drush 8 commands.

Always use Drush 8 with Drupal 7 and Drupal 6 sites, as Drush 9 only works on Drupal 8.4 and later. While Drush 5 and Drush 7 are available on Pantheon if needed, they are listed as [unsupported](http://docs.drush.org/en/master/install/#drupal-compatibility) by the Drush maintainers, and should be avoided unless absolutely necessary.

#### PHP Requirements

| Drush Version | Minimum PHP Version |
|:------------- |:------------------- |
| Drush 5       | PHP 5.2.0+          |
| Drush 7       | PHP 5.3.0+          |
| Drush 8       | PHP 5.4.5+          |
| Drush 9       | PHP 5.6.0+          |
| Drush 10      | PHP 7.1.+           |

See our guide on [Upgrading PHP Versions](/php-versions/).

## Troubleshooting

Sometimes even after updating the Drush version in `pantheon.yml`, the correct version of Drush is not called. This is usually caused by an outdated configuration file, `policy.drush.inc`, in your local `~/.drush` directory, overriding `pantheon.yml`. Remove the file, or comment out its contents to resolve.

### Site-local Drush Usage
If you need to specify a minor version or a version not available on the platform, you can add a site-local installation of Drush to your repository. This will re-dispatch Pantheon's platform Drush to the site-local installation. Do not select any major version of Drush lower than 8.2.3 or 9.6.0. In general, you will usually be better off not including a site-local Drush in your Pantheon site, as using the Pantheon-provided Drush will ensure that you are using the recommended and most-tested version for the Pantheon platform. Occasionally, using a site-local Drush may be necessary in order to avoid conflicts with your site's dependencies.

For more information, see [Avoiding “Dependency Hell” with Site-Local Drush](https://pantheon.io/blog/avoiding-dependency-hell-site-local-drush).

## See Also
- [Avoiding “Dependency Hell” with Site-Local Drush (Blog)](https://pantheon.io/blog/avoiding-dependency-hell-site-local-drush)
- [Fix Up Drush Site Aliases with a Policy File (Blog)](https://pantheon.io/blog/fix-drush-site-aliases-policy-file)
- [Expand Your Use of Drush on Pantheon with More Commands (Blog)](https://pantheon.io/blog/expand-use-drush-pantheon-more-commands)
- [Drupal Drush Command-Line Utility](/drush/)
- [The pantheon.yml Configuration File](/pantheon-yml)

---
title: Managing Drush Versions on Pantheon
description: Learn about Pantheon's default Drush version and how to implement site-local usage.
tags: [devdrush, services, pantheonyml]
categories: [drupal,workflow,platform,develop]
---
By default, Pantheon runs Drush 8 on newly created Drupal sites. Drush 8 is compatible with Drupal 6, 7, and 8.

The Drush version is set when the site is created. Sites created before Nov 4, 2015 (and Drupal 8 sites created before Sep 3, 2015) use an older version of Drush that is incompatible with later versions of PHP. You can [check your current Drush version via Terminus](/drush-versions/#verify-current-drush-version). Updating Drush can be accomplished by [a simple addition to your pantheon.yml file](/drush-versions/#configure-drush-version) below.

<Alert title="Note" type="info">

When running Drush locally, we highly recommend running Drush version 8.3.0 or higher.

</Alert>

## Terminus Drush and Local Drush
[Terminus](/terminus) makes remote Drush calls on sites without using a local installation, eliminating compatibility issues between local and remote installs. For more information, see our guide on [Managing Drupal Sites with Terminus and Drush](/guides/terminus-drupal-site-management).

## Verify Current Drush Version
Verify the current version of Drush running remotely on Pantheon using [Terminus](/terminus):

```bash
terminus drush <site>.<env> -- status | grep "Drush version"
```

## Configure Drush Version
You can change a site's Drush version via the [pantheon.yml file](/pantheon-yml):

```yaml
api_version: 1

drush_version: 8
```

Now your site’s Drush version is managed via `pantheon.yml`, so it’s in version control and deployed along with the rest of your code.

<Alert title="Note" type="info">

If the `pantheon.yml` file does not exist, create it. If a `pantheon.upstream.yml` file exists, please do not edit it. It is used by the upstream updates repository and will cause a merge conflict if modified.

</Alert>

### Available Drush Versions
Pantheon currently supports Drush 8 and Drush 9. Drush 9 is the preferred version of Drush to use with Drupal 8 sites that are managed by Composer. See [Drupal 8 and Composer on Pantheon Without Continuous Integration](https://pantheon.io/docs/guides/drupal-8-composer-no-ci/) and the [Build Tools Workflow](https://pantheon.io/docs/guides/build-tools/) for information on how to use Composer to manage Drupal sites on Pantheon. Drush 8 should be used for Drupal 8 sites that are not managed by Composer, or that use modules that provide additional Drush 8 commands.

Always use Drush 8 with Drupal 7 and Drupal 6 sites, as Drush 9 only works on Drupal 8 and later. While Drush 5 and 7 are available on Pantheon if needed, they are listed as [unsupported](http://docs.drush.org/en/master/install/#drupal-compatibility) by the Drush maintainers, and should be avoided unless absolutely necessary.

#### PHP Requirements

| Drush Version | Minimum PHP Version |
|:------------- |:------------------- |
| Drush 5       | PHP 5.2.0+          |
| Drush 7       | PHP 5.3.0+          |
| Drush 8       | PHP 5.4.5+          |
| Drush 9       | PHP 5.6.0+          |

See our guide on [Upgrading PHP Versions](/php-versions).

## Troubleshooting

Sometimes even after updating the drush version in `pantheon.yml`, the correct version of drush is not called. This is usually caused by an outdated configuration file, `policy.drush.inc`, in your local `~/.drush` directory, overriding `pantheon.yml`. Remove the file, or comment out its contents, to resolve.

### Site-local Drush Usage
If you need to specify a minor version or a version not available on the platform, you can add a site-local installation of Drush to your repository. This will redispatch Pantheon's platform Drush to the site-local installation. Do not select any major version of Drush lower than 8.2.3 or 9.6.0. In general, you will usually be better off not including a site-local Drush in your Pantheon site, as using the Pantheon-provided Drush will ensure that you are using the recommended and most-tested version for the Pantheon platform. Occasionally, using a site-local Drush may be necessary for avoiding conflicts with your site's dependencies.

For more information, see [Avoiding “Dependency Hell” with Site-Local Drush](https://pantheon.io/blog/avoiding-dependency-hell-site-local-drush).

## See Also
- [Avoiding “Dependency Hell” with Site-Local Drush (Blog)](https://pantheon.io/blog/avoiding-dependency-hell-site-local-drush)
- [Fix Up Drush Site Aliases with a Policy File (Blog)](https://pantheon.io/blog/fix-drush-site-aliases-policy-file)
- [Expand Your Use of Drush on Pantheon with More Commands (Blog)](https://pantheon.io/blog/expand-use-drush-pantheon-more-commands)
- [Drupal Drush Command-Line Utility](/drush)
- [The pantheon.yml Configuration File](/pantheon-yml)

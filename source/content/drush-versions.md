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

<Partial file="drush-supported.md" />

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

<Partial file="drush-compatibility.md" />

## Troubleshooting

Sometimes, even after updating the Drush version in `pantheon.yml`, the correct version of Drush is not called.

The Pantheon platform always prefers the site-local Drush or other local settings over the setting in `pantheon.yml`. Check for an outdated configuration file, `policy.drush.inc`, in your local `~/.drush` directory. Remove the file, or comment out its contents to resolve.

Executing Drush on the platform via a `terminus drush` command will use the version of Drush specified in `pantheon.yml`, unless a site-local version is present.

### Site-local Drush Usage

If you are managing your site with Composer, it is recommended that you use Drupal 9 with Drush 11 installed as a site-local Drush.

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

## More Resources

- [Avoiding “Dependency Hell” with Site-Local Drush (Blog)](https://pantheon.io/blog/avoiding-dependency-hell-site-local-drush)
- [Fix Up Drush Site Aliases with a Policy File (Blog)](https://pantheon.io/blog/fix-drush-site-aliases-policy-file)
- [Expand Your Use of Drush on Pantheon with More Commands (Blog)](https://pantheon.io/blog/expand-use-drush-pantheon-more-commands)
- [Drupal Drush Command-Line Utility](/drush/)
- [The `pantheon.yml` Configuration File](/pantheon-yml)

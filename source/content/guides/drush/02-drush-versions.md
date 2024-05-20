---
title: Drupal Drush Command-Line Utility on Pantheon
subtitle: Manage Drush Versions on Pantheon
description: Learn about Pantheon's default Drush version and how to implement site-local usage.
tags: [drush, updates]
showtoc: true
permalink: docs/guides/drush/drush-versions
contenttype: [guide]
innav: [false]
categories: [cli]
cms: [drupal]
audience: [development]
product: [--]
integration: [drush]

---


### Understanding Where Drush is Installed

Drush is installed in two places on within the infrastructure of a modern Drupal site on Pantheon:

* **The global installation** is available to all sites and it's version number is set by the `pantheon.yml` file. When left unset in `pantheon.yml`, the version number will come from `pantheon.upstream.yml` or falls back to a default value.
* **The site-local** installation is the one that is managed by a site's Composer files (`composer.json` and `composer.lock`) in the root of the site's git repository.

For older versions of Drupal (7 and earlier), the global installation of Drush is the only one available.
For Drupal 8 and later, global invocation of Drush will look for a site-local version within the directory structure of the site.
Allowing for different versions of Drush between the global and site-local level is valuable when many sites are present within the same runtime environment.
However, Pantheon's containerized infrastructure makes this distinction more academic than practical for interactions on the platform.
It may be more relevant when working with local development environments or other platform providers.

## Verify Current Drush Version

You can use [Terminus](/terminus/) to verify the current version of Drush running on your Pantheon site:

```bash{promptUser: user}
terminus drush <site>.<env> -- status | grep "Drush version"
```

The [`composer.json` file used by newly created Drupal 9 and 10 sites](https://github.com/pantheon-upstreams/drupal-composer-managed/blob/main/composer.json) is set to allow Drush 11 or 12 as the site-local version.




TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST






This section provides information on Drush versions and site-local usage.

Pantheon runs Drush versions based on your Drupal version:

- **Drupal (Latest Version)**: Drush 10 (for newly created sites)
- **Drupal 7**: Drush 8 (for newly created sites)

## Available Drush Versions

<Partial file="drush-supported.md" />



## Compatibility and Requirements

<Partial file="drush-compatibility.md" />

## Configure Drush Version

1. Refer to [Available Drush Versions](#available-drush-versions) and [Drush requirements](#compatibility-and-requirements) before you modify a site's Drush version. Remember that not all versions of Drush are compatible with all versions of Drupal.

1. Change your site's Drush version in the [`pantheon.yml` file](/pantheon-yml/):

    ```yaml:title=pantheon.yml
    api_version: 1

    drush_version: 8
    ```

Now your site’s Drush version is managed via `pantheon.yml`. This allows Drush to be version controlled and deployed along with the rest of your code.


<Alert title="Note"  type="info" >

Create the `pantheon.yml` file if it does not already exist. If a `pantheon.upstream.yml` file exists, do not edit it. It is used by the upstream updates repository and will cause a [merge conflict if modified](/core-updates#error-updating-conflict-modifydelete-pantheonupstreamyml-deleted-in-head-and-modified-in-upstreammaster-version-upstreammaster-of-pantheonupstreamyml-left-in-tree).

</Alert>

## Troubleshoot Your Drush Version

Occasionally, the correct version of Drush is not called even after updating the Drush version in `pantheon.yml`.

The Pantheon platform always prefers the site-local Drush or other local settings over the setting in the `pantheon.yml` file.

1. Check for an outdated configuration file, `policy.drush.inc`, in your local `~/.drush` directory.

1. Remove the file, or comment out its contents to resolve the issue.

Executing Drush on the platform via a `terminus drush` command will use the version of Drush specified in `pantheon.yml`, unless a site-local version is present.

### Site-local Drush Usage

We recommend that you use the latest version of Drupal with Drush 11 installed as a site-local Drush if you manage your site with Composer.

Our default Composer-managed upstream has a start state for this dependency that will also work with Drush 12 when it is released.

```bash{promptUser: user}
"drush/drush": "^11 || ^12"
```

Refer to [Pantheon's Drupal Composer-Managed upstream](https://github.com/pantheon-upstreams/drupal-composer-managed/blob/main/composer.json#L23) for a complete example of the `composer.json` file.

#### Permissions

Site-local Drush requires executable permissions. Follow the steps below if you encounter `permission denied` errors when running Drush commands.

1. Adjust permissions on the Drush executable:

    ```bash{promptUser: user}
    chmod +x vendor/bin/drush
    ```

1. Commit and push this change to your Pantheon site.

### Drush 5 on Older Sites

Drupal sites created on Pantheon in late 2015 or earlier that do not have `drush_version` defined in `pantheon.yml` may default to Drush 5. In this case, you may see the following error:

```bash
{{Uncaught Error: Call to undefined function mysql_connect() in /etc/drush/drush-5-extensions/pantheon.drush.inc:127
```

Configure a newer version of Drush as [documented above](#configure-drush-version) to resolve this error.

## More Resources

- [Avoiding “Dependency Hell” with Site-Local Drush (Blog)](https://pantheon.io/blog/avoiding-dependency-hell-site-local-drush)
- [TODO: this blog post didn't get migrated from D7 to D10                             Fix Up Drush Site Aliases with a Policy File (Blog)](https://pantheon.io/blog/fix-drush-site-aliases-policy-file)
- [Expand Your Use of Drush on Pantheon with More Commands (Blog)](https://pantheon.io/blog/expand-use-drush-pantheon-more-commands)
- [The `pantheon.yml` Configuration File](/pantheon-yml)

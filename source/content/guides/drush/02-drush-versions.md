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


## Understanding Drush installation

Drush is installed in two places on within the infrastructure of a modern Drupal site on Pantheon:

* **The global installation** is available to all sites and it's version number is set by the `pantheon.yml` file. When left unset in `pantheon.yml`, the version number will come from `pantheon.upstream.yml` or falls back to a default value.
* **The site-local** installation is the one that is managed by a site's Composer files (`composer.json` and `composer.lock`) in the root of the site's git repository.

For older versions of Drupal (7 and earlier), the global installation of Drush is the only one available.
For Drupal 8 and later, global invocation of Drush will look for a site-local version within the directory structure of the site.
Allowing for different versions of Drush between the global and site-local level is valuable when many sites are present within the same runtime environment.

Pantheon's containerized infrastructure makes this distinction more academic than practical for interactions on the platform.
This separation between global and site-local installations relevant when working with local development environments or other platform providers.

**For most teams running a modern version of Drupal, the site-local version of Drush is only one to pay attention to.**
The [`composer.json` file used by newly created Drupal 9 and 10 sites](https://github.com/pantheon-upstreams/drupal-composer-managed/blob/main/composer.json) is set to allow Drush 11 or 12 as the site-local version.

### Changing the site-local Drush version

To change the site-local version of Drush run a composer command to update the version of Drush in the `composer.json` file. For instance, to set the site-local version of Drush to 11, run the following command:

```bash
composer require drush/drush:^11
```

### Changing the global Drush version on Pantheon

To change the global Drush version (which will still invoke the site-local version of Drush when available), update the `drush_version` key in the `pantheon.yml` file. For instance, to set the global version of Drush to 11, add the following to the `pantheon.yml` file:

```yaml title=pantheon.yml
api_version: 1

drush_version: 11
```

## Verify Current Drush Version Interacting with Your Drupal Site

You can use [Terminus](/terminus/) to verify the current version of Drush running on your Pantheon site:

```bash{promptUser: user}
terminus drush <site>.<env> -- status | grep "Drush version"
```

This command will return the version of Drush running on your site which will report the site-local version if it is present, otherwise it will report the global version.


## Available Drush Versions

<Partial file="drush-supported.md" />



## Compatibility and Requirements

<Partial file="drush-compatibility.md" />

## Troubleshoot Your Drush Version

Occasionally, the correct version of Drush is not called even after updating the Drush version in `pantheon.yml`.

The Pantheon platform always prefers the site-local Drush or other local settings over the setting in the `pantheon.yml` file.

1. Check for an outdated configuration file, `policy.drush.inc`, in your local `~/.drush` directory.

1. Remove the file, or comment out its contents to resolve the issue.

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

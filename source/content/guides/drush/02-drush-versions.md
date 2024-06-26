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

## Understanding Drush Installation Location

Drush is installed in two places on within the infrastructure of a modern Drupal site on Pantheon:
* **The site-local** installation is the one that is managed by a site's Composer files (`composer.json` and `composer.lock`) in the root of the site's git repository. This installation is the one teams should focus on.
* Secondarily, there is also a **global** installation of Drush that can be controlled by a site's `pantheon.yml` file.

Allowing for different versions of Drush between the global and site-local level is valuable when many sites are present within the same runtime environment.
Pantheon's containerized infrastructure makes this distinction more academic than practical for interactions on the platform.
This separation between global and site-local installations relevant when working with local development environments or other platform providers.
For modern Drupal sites the global Drush installation acts primarily as a wrapper to invoke the site-local version.

### Drupal 9, 10 and Beyond

**For most teams running a modern version of Drupal, the site-local version of Drush is only one to pay attention to.**
The [`composer.json` file used by newly created Drupal 9 and 10 sites](https://github.com/pantheon-upstreams/drupal-composer-managed/blob/main/composer.json) is set to allow Drush 11 or 12 as the site-local version.

#### Changing the Site-Local Drush Version

To change the site-local version of Drush run a composer command to update the version of Drush in the `composer.json` file. For instance, to set the site-local version of Drush to 11, run the following command:

```bash
composer require drush/drush:^11
```

### Drupal 7

For older versions of Drupal (7 and earlier), the global installation of Drush is the only one available.

#### Changing the Global Drush Version on Pantheon

To change the global Drush version (which will still invoke the site-local version of Drush when available), update the `drush_version` key in the `pantheon.yml` file. For instance, to set the global version of Drush to 8, add the following to the `pantheon.yml` file:

```yaml:title=pantheon.yml
api_version: 1

drush_version: 8
```

<Alert title="Note: Limited Drush Versions in Pantheon.yml" type="info">

Even though Drush 11 and above are available for site-local installations, they are not available global version options in `pantheon.yml`. This restriction is present to reduce unnecessary or possibily counterproductive settings in `pantheon.yml`

If you do attempt to set a Drush version that is not supported, you will see an error message like the following:

```bash
remote:
remote: PANTHEON ERROR:
remote:
remote: Changes to `pantheon.yml` detected, but there was an error while processing it:
remote:
remote: pantheon.yml:
remote: Validation failed with error:
remote: >   11 is not one of [5, 7, 8, 9, 10]
remote:
remote: while validating the following value:
remote: >   11
remote: >   ...
remote:
remote: To learn more about pantheon.yml, please see https://pantheon.io/docs/pantheon-yml/
```

</Alert>


## Compatibility and Requirements

<Partial file="drush-compatibility.md" />

## Troubleshoot Your Drush Version

Occasionally, the correct version of Drush is not called even after updating the Drush version in `pantheon.yml`.

The Pantheon platform always prefers the site-local Drush or other local settings over the setting in the `pantheon.yml` file.

1. Check for an outdated configuration file, `policy.drush.inc`, in your local `~/.drush` directory.

1. Remove the file, or comment out its contents to resolve the issue.

### Verify Current Drush Version Interacting with Your Drupal Site

You can use [Terminus](/terminus/) to verify the current version of Drush running on your Pantheon site:

```bash{promptUser: user}
terminus drush <site>.<env> -- status | grep "Drush version"
```

This command will return the version of Drush running on your site which will report the site-local version if it is present, otherwise it will report the global version.

#### Permissions

Site-local Drush requires executable permissions.
While this is typically handled automatically by Composer, you may need to adjust permissions manually, especially if you are not using [Integrated Composer](/guides/integrated-composer) install dependencies on Pantheon and are instead committing the `vendor` directory to your repository.

Follow the steps below if you encounter `permission denied` errors when running Drush commands.

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
- [The `pantheon.yml` Configuration File](/pantheon-yml)

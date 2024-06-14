---
title: Pantheon YAML Configuration Files
description: Learn how to manage advanced site configuration
tags: [https, launch, code, workflow]
reviewed: "2022-03-16"
contenttype: [doc]
innav: [true]
categories: [config]
cms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [quicksilver]
showtoc: true
---

Hook into platform workflows and manage advanced site configuration via the `pantheon.yml` file. Add it to the root of your site's codebase, and deploy it along with the rest of your code.

## Create a pantheon.yml File

If a `pantheon.yml` file is not already present in the root of your site's code repository, you can create one by following the configuration steps outlined below.

<Enablement title="Quicksilver Cloud Hooks Training" link="https://pantheon.io/learn-pantheon?docs">

Set up existing scripts and write your own with help from our experts. Pantheon delivers on-demand training to help development teams master our platform and improve their internal WebOps.

</Enablement>

## Find Your pantheon.yml File

Your site's `pantheon.yml` configuration file can be found in the root of your site's code repository. If you have a local git clone of your site, this is the project root. When accessing the site over an SFTP connection, look in the `code` directory.

## Configure Your Site's pantheon.yml File

Review each of the sections below to make sure that you create and configure your `pantheon.yml` file correctly.

For reference implementations see [example.pantheon.yml](https://github.com/pantheon-systems/quicksilver-examples/blob/master/example.pantheon.yml) and [Quicksilver Example Scripts](https://github.com/pantheon-systems/quicksilver-examples).

### Add api_version

The first step in creating your `pantheon.yml` file is to define the `api_version` .

<Alert title="Required Step"  type="info" >

The `api_version` property is required for the `pantheon.yml` file to be valid.

</Alert>

```yaml:title=pantheon.yml
api_version: 1
```

### Protected Web Paths

Protect files and directories inside of your docroot from public web access with `protected_web_paths`. For example, the following ensures that a visitor to `https://example.com/example.txt` or `https://example.com/example_directory/any_nested_file` receives Access Denied (403):

```yaml:title=pantheon.yml
protected_web_paths:
  - /example.txt
  - /example_directory
```

The `pantheon.upstream.yml` file provided by your upstream might define protected web paths. If it does, all of the paths listed in the upstream and all of the paths listed in your `pantheon.yml` file will be protected. If you wish to remove protection from any path listed in the upstream, set the [protected_web_paths_override property](#protected-web-paths-override).

#### Considerations

- Specify the exact path; path is case-sensitive
- No regex or wildcards allowed
- Paths begin with a leading `/` and are relative to your docroot
- Limited to 24 protected paths
- You may not be able to protect files or paths with special characters
- Wait a few seconds for changes to take effect

### Protected Web Paths Override

To disable all of the protected web paths defined by your site's upstream and all protected paths defined by the Pantheon platform, set the `protected_web_paths_override` property to `true`:

```yaml:title=pantheon.yml
protected_web_paths_override: true
```

#### Considerations

The standard protected web paths can be important to the security of your site. If you override protection with this property, be sure to copy all of the standard protected web paths into your `pantheon.yml` file, and only remove those that you are certain are safe to expose.

For a list of standard protected paths, see the `pantheon.upstream.yml` for:

- [Drupal](https://github.com/pantheon-systems/drops-7/blob/default/pantheon.upstream.yml)
- [WordPress](https://github.com/pantheon-systems/WordPress/blob/default/pantheon.upstream.yml)

### Enforce HTTPS + HSTS

HTTPS adds a layer of encryption that prevents others from seeing or tampering with traffic to your site. HTTP Strict Transport Security (**HSTS**) instructs browsers to only connect via HTTPS and helps protect websites against protocol downgrade attacks and cookie hijacking.

Pantheon sites (using the default Pantheon upstreams) created or updated on or after September 30, 2019 default to enforcing HTTPS via a redirect and a short, 5-minute duration, HSTS header. You can override the default with the `enforce_https` directive in a site-specific `pantheon.yml` file.

<Partial file="hsts.md" />

#### Test Your Site's HSTS Configuration for an A+ Rating

[SSL Labs](https://www.ssllabs.com) provides a free, online service that you can use to test your site's configuration. In order to obtain an A+ rating, a long-duration HSTS header using the `full` or `full+subdomains` value is required.

1. Select a short-duration HSTS header (`transitional` or `transitional+subdomains`) to test your configuration before committing to the long-duration HSTS header.

1. Send the long-duration HSTS header by moving to `full` or `full+subdomains` after you confirm that the HSTS works as expected in the Live environment.

### Nested Docroot

Nest your docroot one level beneath your code repository in a directory named `web`:

```yaml:title=pantheon.yml
web_docroot: true
```

The name of the nested directory is not configurable.

For more information, see [Serving Sites from the Web Subdirectory](/nested-docroot).

### Integrated Composer Build Step

You can enable or disable Integrated Composer in the `pantheon.yml` file. For example, to enable Integrated Composer:

```yaml:title=pantheon.yml
build_step: true
```

Refer to [Integrated Composer](/guides/integrated-composer) for more information.

### PHP Version

Override the upstream's default PHP version with the `php_version` property. PHP version is managed in version control and deployed along with the rest of your site's code to encourage testing before making a change on your Live site.

For example, to override the upstream default value at the site level to PHP 8:

```yaml:title=pantheon.yml
php_version: 8.0
```

#### Considerations

- [Upgrading PHP Versions](/guides/php/php-versions) may require you to resolve compatibility issues with your site's codebase.
- From time to time, we will roll out a new default version of PHP, which will be available to apply as a one-click update in the Dashboard. If you are overriding the default, make sure to remove `php_version` from `pantheon.yml` as soon as possible to ensure you don't miss the latest recommended PHP version.
- You'll always be able to test new default PHP version in Dev and Test before deploying Live.

### Specify a Version of MariaDB

<ReviewDate date="2022-03-17" />

Specify the site's version of MariaDB to keep the software your site uses current and up to date, or set a specific version to avoid incompatibilities:

1. Enable [automated backups](/guides/backups) and [confirm that a backup has been created](/guides/backups/create-backups) before you configure the database version.

1. Push the changes to a [Multidev](/guides/multidev) and ensure that the site performs as expected.

Apply this change to an existing environment. If you try to create a new environment with the `database` key specified in `pantheon.yml`, the commit will be rejected with an error.

1. Use the `database` directive in `pantheon.yml` to choose a specific version of MariaDB:

```yaml:title=pantheon.yml
database:
  version: 10.6
```

This can also be accomplished via [one-click updates in the Site Dashboard](/core-updates#apply-upstream-updates-via-the-site-dashboard).

1. Confirm that the database upgrade completed successfully:

   <Partial file="confirm-db-upgrade-workflow.md" />

   Keep in mind that some versions of Drupal and WordPress require a specific minimum or maximum version for compatibility.

This table shows the supported MariaDB version for each CMS:

| CMS           | Supported MariaDB Version(s) |
| ------------- | ---------------------------- |
| Drupal < 7.76 | 10.3                         |
| Drupal ≥ 7.76 | 10.4                         |
| Drupal < 8.5  | 10.3                         |
| Drupal ≥ 8.6  | 10.4                         |
| Drupal ≥ 9.0  | 10.4 or 10.6                 |
| WordPress     | 10.4 or 10.6                 |

Users of Drupal 6 sites should consider [upgrading to the latest version of Drupal](/drupal-updates) for better support.

#### Considerations - Drupal

<Partial file="drupal/drupal-mariadb-considerations.md" />

Confirm that the database upgrade completed successfully using the steps at the beginning of [Specify a Version of MariaDB](#specify-a-version-of-mariadb).

#### Considerations - InnoDB Row Size Too Large

MariaDB 10.4 on Pantheon has `innodb_strict_mode` set to `ON`. This leads to `Row size too large` errors that are not present on earlier versions of MariaDB:

```sql
returned non-zero exit status 1: ERROR 1118 (42000) at line 1296: Row size too large (> 8126). Changing some columns to TEXT or BLOB may help. In current row format, BLOB prefix of 0 bytes is stored inline.
```

Before you push the change to `pantheon.yml` to upgrade MariaDB to 10.4, modify your tables to use `row_format=DYNAMIC` to avoid `Row size too large` errors:

<Accordion title="How to update all tables to row_format=DYNAMIC" id="row-size-too-large">

<Partial file="row-size-too-large-alter-table.md" />

</Accordion>

For more information on how to diagnose tables and troubleshoot potential issues, refer to the [official MariaDB documentation](https://mariadb.com/kb/en/troubleshooting-row-size-too-large-errors-with-innodb/).

### Specify a Redis Version

There are two available versions of Redis available for the [Object Cache](/object-cache): `2.8` and `6.2`.  The default version for the platform is `2.8` currently.

#### Change the Redis Version
1. Add the following block to your pantheon.yml file:

  ```yaml:title=pantheon.yml
  object_cache:
    version: 6.2
  ```
1. Push the change.


#### Rollback the Redis Version
1. Change the value of `version` to `2.8` 
1. Push the change.

#### Test the Redis 6 Update
We recommend that you push the Redis version change to a Multidev environment:
1. Create a new Multidev environment. Refer to [Multidev Environment](/guides/multidev/01-introduction)for more information. 
1. Push the `pantheon.yml` Redis change to the branch associated with the Multidev environment.
1. Wait for the upgrade workflow to complete.
1. Confirm the Redis version upgrade using [redis-cli](/object-cache/cli).

   - Get the redis-cli connection string from the “Connection Info” button on the Pantheon Dashboard for your Multidev environment.

1. Connect to the Redis container with redis-cli.
1. Type `INFO Server` when you are connected and verify that the `redis_version`is correct.


### Specify a Solr Version

Before you install the Drupal search module, you need to specify the Solr version or set a specific version to avoid incompatibilities. Specify Solr 8 as the search index for Drupal sites:

```yaml:title=pantheon.yml
search:
  version: 8
```

#### Considerations

- The valid values for the versions are `3` and `8`.
- Currently, Solr 8 is only supported for [Drupal 9 and higher](/guides/solr-drupal/solr-drupal) sites.

### Drush Version

Add `drush_version` to the top level of the `pantheon.yml` file to configure the Drush version used when making calls remotely on Pantheon:

```yaml:title=pantheon.yml
drush_version: 8
```

For more information and compatibility requirements, see [Managing Drush Versions on Pantheon](/guides/drush/drush-versions).

### Filemount Path

Pantheon provides a [cloud-based filesystem](/guides/filesystem) to store user-generated content and other website files. By default, we create a symlink to this filesystem at `sites/default/files` (Drupal), `wp-content/uploads` (WordPress), or `app/uploads` (WordPress using Bedrock), but you can change the location with the `filemount` variable.

<Alert title="Warning" type="danger">

We recommend _only_ changing this setting when needed for [Custom Upstream Configurations](#custom-upstream-configurations) in `pantheon.upstream.yml`. For most cases, you can [create an additional symlink](/symlinks-assumed-write-access) in your code base.

</Alert>

The only valid `filemount` path other than the default path for each CMS is `/files` relative to your docroot:

```yaml:title=pantheon.yml
filemount: /files
```

Complete the following before deploying `filemount` (**required**):

1. Reconfigure [Drupal 7](https://www.drupal.org/docs/7/distributions/drupal-commons/installing-drupal-commons/configuring-file-system-settings-after) or [WordPress](https://wordpress.org/support/article/editing-wp-config-php/#moving-uploads-folder) to use the new path

1. Add path to the `.gitignore` file.

1. Configure a `private` subdirectory of the new path within [`protected_web_paths`](#protected-web-paths).

### Search and Replace for WordPress Multisite (Early Access)

You can enable search and replace on [WordPress Multisites](/guides/multisite) by adding the following to your `pantheon.yml` file:

```yaml:title=pantheon.yml
search_replace: true
```

Running search and replace on a _subdomain_ Multisite also requires configuring a `sites.yml` file. Refer to [WordPress Multisite Search and Replace](/guides/multisite/search-replace) for more information.

## Quicksilver Platform Integration Hooks

Use the `pantheon.yml` file to define scripts you want executed automatically when a particular workflow is triggered on Pantheon by you or a team member. For example, you can write a script to post a message to Slack whenever code is pushed to the Site Dashboard.

For more information, see [Automate your Workflow with Quicksilver Platform Integration Hooks](/guides/quicksilver) and check our growing set of [Platform Integration guides](/guides) demonstrating Quicksilver hooks.

## Custom Upstream Configurations

Add a `pantheon.upstream.yml` file to your Workspace's [Custom Upstream](/guides/custom-upstream) to set default configurations for all downstream sites. The same [properties described above](#advanced-site-configuration) can be used in this file. In addition, it is also possible to define a [`deploy_product` Quicksilver hook](/guides/quicksilver/hooks) here; however other Quicksilver workflows are not supported.

This file should only be edited in the Custom Upstream repository where it is defined. Similarly, the Custom Upstream repository should not define a `pantheon.yml` file; it should place all configuration settings in the upstream file instead.

When the same configuration value is defined in both files, the value from `pantheon.yml` will override the value from `pantheon.upstream.yml` at the site-level.

## Troubleshooting

First, verify the syntax of entries in the file. Refer to the examples above for exact syntax, or try running the contents of your `pantheon.yml` file through a [YAML linter](http://www.yamllint.com/).

### "Changes to pantheon.yml detected, but there was an error while processing it"

The Platform will automatically reject a commit that includes a `pantheon.yml` error. The error message will resemble:

```none
remote: PANTHEON ERROR:
remote:
remote: Changes to `pantheon.yml` detected, but there was an error while processing it:
remote:
remote:
remote: Version '2' is not a valid pantheon.yml version!
remote: Valid versions are: 1
```

While our parser will reject a `pantheon.yml` that is invalid, it won't necessarily give you the exact reason the file is invalid. Syntax errors are the most common reason for an invalid `pantheon.yml` file.

### Why can’t I update the PHP version on my Multidev?

The PHP version changes automatically when you modify the `pantheon.yml` file of a site with a pre-existing Multidev. A PHP version change will not appear in a Multidev created after your `pantheon.yml` changes are made. To update your Multidev:

1. Navigate to [your `pantheon.yml` file](#configure-your-php-version).

1. Modify your `pantheon.yml` file and re-commit to the Multidev.

   - It does not matter what change you make to the file. Any change- even a comment- will allow the Multidev to detect the configuration change. You will receive a notice indicating configuration changes have been detected and applied to the Multidev environment:

```none
remote:
remote: PANTHEON NOTICE:
remote:
remote: Changes to `pantheon.yml` detected.
remote:
remote: Successfully applied `pantheon.yml` to the 'new-feature' environment.
remote:
remote:
```

### Pantheon.yml changes aren't reflected when creating a new Multidev

**Issue:** Changes to your `pantheon.yml` file won't be reflected if you created a Git branch locally, made a change to the `pantheon.yml file`, and then pushed the branch, or used a CI pipeline to create a new Multidev.

**Solution:**

You must do _one_ of the following to ensure that your newly created Multidev has the `pantheon.yml` changes:

- Re-commit your changes to the Multidev and/or `pantheon.yml` file
- Push the `pantheon.yml` changes directly to the Dev (master branch) environment

### Deploying Hotfixes

Changes made to `pantheon.yml` **are not** detected when deployed as a [hotfix](/hotfixes). Git tags created manually and pushed on the platform do not invoke all the processes that an actual deployment does. Pantheon standard workflow is done via the dashboard deploy or `terminus env:deploy`. As a workaround for hotfixes:

1. Modify your `pantheon.yml` file in a development environment (for example add a code comment).

1. Deploy the changes to production using the dashboard deploy or `terminus env:deploy`.

## More Resources

- [Automating and Integrating your Pantheon Workflow with Quicksilver Platform Hooks](/guides/quicksilver)
- [Upgrade PHP Versions](/guides/php/php-versions)

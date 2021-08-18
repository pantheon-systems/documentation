---
title: Pantheon YAML Configuration Files
description: Learn how to manage advanced site configuration
categories: [platform]
tags: [https, launch, code, workflow]
reviewed: "2021-04-13"
---

Hook into platform workflows and manage advanced site configuration via the `pantheon.yml` file. Add it to the root of your site's codebase, and deploy it along with the rest of your code.

## Find or Create pantheon.yml

Your site's `pantheon.yml` configuration file can be found in the root of your site's code repository. If you have a local git clone of your site, this is the project root. When looking at the site over an SFTP connection, look in the `code` directory.

If the `pantheon.yml` file is not present, you may create one.

For reference implementations see [example.pantheon.yml](https://github.com/pantheon-systems/quicksilver-examples/blob/master/example.pantheon.yml) and [Quicksilver Example Scripts](https://github.com/pantheon-systems/quicksilver-examples).

<Enablement title="Quicksilver Cloud Hooks Training" link="https://pantheon.io/learn-pantheon?docs">

Set up existing scripts and write your own with help from our experts. Pantheon delivers on-demand training to help development teams master our platform and improve their internal WebOps.

</Enablement>

## Advanced Site Configuration

### Include api_version

Define the `api_version` property in order for `pantheon.yml` to be valid:

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

* Specify the exact path; path is case-sensitive
* No regex or wildcards allowed
* Paths begin with a leading `/` and are relative to your docroot
* Limited to 24 protected paths
* You may not be able to protect files or paths with special characters
* Wait a few seconds for changes to take effect

### Protected Web Paths Override

To disable all of the protected web paths defined by your site's upstream and all protected paths defined by the Pantheon platform, set the `protected_web_paths_override` property to `true`:

```yaml:title=pantheon.yml
protected_web_paths_override: true
```

#### Considerations

The standard protected web paths can be important to the security of your site. If you override protection with this property, be sure to copy all of the standard protected web paths into your `pantheon.yml` file, and only remove those that you are certain are safe to expose.

For a list of standard protected paths, see the `pantheon.upstream.yml` for:

* [Drupal 8](https://github.com/pantheon-systems/drops-8/blob/default/pantheon.upstream.yml)
* [Drupal 7](https://github.com/pantheon-systems/drops-7/blob/default/pantheon.upstream.yml)
* [WordPress](https://github.com/pantheon-systems/WordPress/blob/default/pantheon.upstream.yml)

### Enforce HTTPS + HSTS

HTTPS adds a layer of encryption that prevents others from snooping on or tampering with traffic to your site. HTTP Strict Transport Security (**HSTS**) instructs browsers to only connect via HTTPS and helps protect websites against protocol downgrade attacks and cookie hijacking.

Pantheon sites (using the default Pantheon upstreams) created or updated on or after September 30 2019 default to enforcing HTTPS via a redirect and a short, 5-minute duration, HSTS header. You can override the default with the `enforce_https` directive in a site-specific `pantheon.yml` file.

<Partial file="hsts.md" />

#### Test Your Site's HSTS Configuration for an A+ Rating

[SSL Labs](https://www.ssllabs.com) provides a free, online service that you can use to test your Site's configuration. In order to obtain an A+ rating, a long-duration HSTS header using the `full` or `full+subdomains` value is required.

1. To test your configuration, select a short-duration HSTS header (`transitional` or `transitional+subdomains`), before committing to the long-duration HSTS header.

1. When you're comfortable that HSTS works as expected in the Live environment, send the long-duration HSTS header by moving to `full` or `full+subdomains`.

### Nested Docroot

Nest your docroot one level beneath your code repository in a directory named `web`:

```yaml:title=pantheon.yml
web_docroot: true
```

The name of the nested directory is not configurable.

For more information, see [Serving Sites from the Web Subdirectory](/nested-docroot).

### PHP Version

Override the upstream's default PHP version with the `php_version` property. PHP version is managed in version control and deployed along with the rest of your site's code to encourage testing before making a change on your Live site.

For example, to override the upstream default value at the site level to PHP 7:

```yaml:title=pantheon.yml
php_version: 7.0
```

#### Considerations

* [Upgrading PHP Versions](/php-versions) may require you to resolve compatibility issues with your site's codebase.
* Drupal and PHP 7 require [Drush 7 or greater](/drush-versions/#configure-drush-version).
* From time to time, we will roll out a new default version of PHP, which will be available to apply as a one-click update in the Dashboard. If you are overriding the default, make sure to remove `php_version` from `pantheon.yml` as soon as possible to ensure you don't miss the latest recommended PHP version.
* You'll always be able to test new default PHP version in Dev and Test before deploying Live.

### Specify a Version of MariaDB

<ReviewDate date="2021-08-05" />

Specify the site's version of MariaDB to keep the software your site uses current and up to date, or set a specific version to avoid incompatibilities.

Enable [automated backups](/backups) and [confirm that a backup has been created](/backups#via-the-dashboard) before you configure the database version. Push the changes to a [Multidev](/multidev) and ensure that the site performs as expected.

Apply this change to an existing environment. If you try to create a new environment with the `database` key specified in `pantheon.yml`, the commit will be rejected with an error.

Use the `database` directive in `pantheon.yml` to choose a specific version of MariaDB:

```yaml:title=pantheon.yml
database:
  version: 10.4
```

Keep in mind that some versions of Drupal and WordPress require a specific minimum or maximum version for compatibility.

This table shows the recommended MariaDB version for each CMS:

| CMS           | Recommended MariaDB Version |
|---------------|-----------------------------|
| Drupal < 6.51 | 10.3                        |
| Drupal ≥ 6.51 | 10.4                        |
| Drupal < 7.76 | 10.3                        |
| Drupal ≥ 7.76 | 10.4                        |
| Drupal < 8.5  | 10.3                        |
| Drupal ≥ 8.6  | 10.4                        |
| Drupal ≥ 9.0  | 10.4                        |
| WordPress     | 10.4                        |

Users of Drupal 6 sites should consider [upgrading to Drupal 7](/drupal-updates#upgrade-from-drupal-6-to-drupal-7) for better support.

### Drush Version

Add `drush_version` to the top level of the `pantheon.yml` file to configure the Drush version used when making calls remotely on Pantheon:

```yaml:title=pantheon.yml
drush_version: 8
```

For more information and compatibility requirements, see [Managing Drush Versions on Pantheon](/drush-versions).

### Filemount Path

Pantheon provides a [cloud-based filesystem](/files) to store user-generated content and other website files. By default, we create a symlink to this filesystem at `sites/default/files` (Drupal) or `wp-content/uploads` (WordPress), but you can change the location with the `filemount` variable.

<Alert title="Warning" type="danger">

We recommend *only* changing this setting when needed for [Custom Upstream Configurations](#custom-upstream-configurations) in `pantheon.upstream.yml`. For most cases, you can [create an additional symlink](/symlinks-assumed-write-access) in your code base.

</Alert>

The only valid filemount path other than the default path for each CMS is `/files` relative to your docroot:

```yaml:title=pantheon.yml
filemount: /files
```

Complete the following before deploying `filemount` (**required**):

1. Reconfigure [Drupal 8](https://www.drupal.org/upgrade/file_public_path), [Drupal 7](https://www.drupal.org/docs/7/distributions/drupal-commons/installing-drupal-commons/configuring-file-system-settings-after), or [WordPress](https://wordpress.org/support/article/editing-wp-config-php/#moving-uploads-folder) to use the new path

1. Add path to the `.gitignore` file

1. Configure a `private` subdirectory of the new path within [`protected_web_paths`](#protected-web-paths)

## Quicksilver Platform Integration Hooks

Use the `pantheon.yml` file to define scripts you want executed automatically when a particular workflow is triggered on Pantheon by you or a teammate. For example, you can write a script to post a message to Slack whenever code is pushed to the Site Dashboard.

For more information, see [Automate your Workflow with Quicksilver Platform Integration Hooks](/quicksilver) and check our growing set of [Platform Integration guides](/guides) demonstrating Quicksilver hooks.

## Custom Upstream Configurations

Add a `pantheon.upstream.yml` file to your organization's [Custom Upstream](/custom-upstream) to set default configurations for all downstream sites. The same [properties described above](#advanced-site-configuration) can be used in this file. In addition, it is also possible to define a [`deploy_product` Quicksilver hook](/quicksilver/#hooks) here; however other Quicksilver workflows are not supported.

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

While our parser will reject a `pantheon.yml` that is invalid, it won't necessarily give you the exact reason the file is invalid. Syntax errors are the most common issue.

### Deploying Configuration Changes to Multidev

Changes made to `pantheon.yml` file on a branch **are not** detected when creating the Multidev environment for that branch. As a workaround, make some modification to `pantheon.yml` file and re-commit to the Multidev environment. You will then receive a notice indicating configuration changes have been detected and applied to the Multidev environment:

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

### Deploying Hotfixes

Changes made to `pantheon.yml` **are not** detected when deployed as a [hotfix](/hotfixes). As a workaround, make a modification to your `pantheon.yml` file in a development environment (e.g, add a code comment), then deploy up to production using the standard Pantheon workflow.

## See Also

* [Automating and Integrating your Pantheon Workflow with Quicksilver Platform Hooks](/quicksilver)
* [Upgrade PHP Versions](/php-versions)

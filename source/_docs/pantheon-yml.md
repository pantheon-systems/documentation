---
title: Pantheon YAML Configuration Files
description: Learn how to manage advanced site configuration
tags: [pantheonyml, infrastructure]
categories: []
---
Hook into platform workflows and manage advanced site configuration via the `pantheon.yml` file. Add it to the root of your site's codebase, and deploy it along with the rest of your code.

<div class="enablement">
  <h4 class="info" markdown="1">[Quicksilver Cloud Hooks Training](https://pantheon.io/agencies/learn-pantheon?docs){.external}</h4>
  <p>Set up existing scripts and write your own with help from our experts. Pantheon delivers custom workshops to help development teams master our platform and improve their internal DevOps.</p>
</div>

For reference implementations see  [example.pantheon.yml](https://github.com/pantheon-systems/quicksilver-examples/blob/master/example.pantheon.yml){.external} and [Quicksilver Example Scripts](https://github.com/pantheon-systems/quicksilver-examples){.external}.

## Advanced Site Configuration
### Include api_version
Define the `api_version` property in order for `pantheon.yml` to be valid:
```yaml
api_version: 1
```

### Protected Web Paths
Protect files and directories inside of your docroot from public web access with `protected_web_paths`. For example, the following ensures that a visitor to `https://example.com/example.txt` or `https://example.com/example_directory/any_nested_file` receives Access Denied (403):

```yaml
protected_web_paths:
  - /example.txt
  - /example_directory
```

#### Considerations
* Specify the exact path; no regex or wildcards allowed
* Paths begin with a leading `/` and are relative to your docroot
* Limited to 24 protected paths
* You may not be able to protect files or paths with special characters
* Wait a few seconds for changes to take effect

### Nested Docroot
Nest your docroot one level beneath your code repository in a directory named `web`:

```yaml
web_docroot: true
```

The name of the nested directory is not configurable.

For more information, see [Serving Sites from the Web Subdirectory](/docs/nested-docroot/).

### PHP Version
Override the upstream's default PHP version with the `php_version` property. PHP version is managed in version control and deployed along with the rest of your site's code to encourage testing before making a change on your Live site.

For example, to override the upstream default value at the site level to PHP 7:

```yaml
php_version: 7.0
```

#### Considerations
* [Upgrading PHP Versions](/docs/php-versions/) may require you to resolve compatibility issues with your site's codebase.
* Drupal and PHP 7 require [Drush 7 or greater](/docs/drush-versions/#configure-drush-version).
* From time to time, we will roll out a new default version of PHP, which will be available to apply as One-click update in the Dashboard. If you are overriding the default, make sure to remove `php_version` from `pantheon.yml` as soon as possible to ensure you don't miss the latest recommended PHP version.
* You'll always be able to test new default PHP version in Dev and Test before deploying Live.

### Drush Version
Add `drush_version` to the top level of the `pantheon.yml` file to configure the Drush version used when making calls remotely on Pantheon:

```yaml
drush_version: 8
```
For more information, see [Managing Drush Versions on Pantheon](/docs/drush-versions/).

### Filemount Path
Pantheon provides a [cloud-based filesystem](/docs/files/) to store user-generated content and other website files. By default, we create a symlink to this filesystem at `/sites/default/files` (Drupal) or `/wp-content/uploads` (WordPress), but you can change the location with the `filemount` variable:

```yaml
filemount: /files
```

This creates a new symlink to the filesystem at the specified location. Note that this setting is only recommended when creating a custom upstream. Instead, consider using a symlink as described in [Non-Standard Files Locations](/docs/non-standard-file-paths/).

Complete the following before deploying `filemount` (**required**):

1. Reconfigure [Drupal 8](https://www.drupal.org/upgrade/file_public_path){.external}, [Drupal 7](https://www.drupal.org/docs/7/distributions/drupal-commons/installing-drupal-commons/configuring-file-system-settings-after){.external}, or [WordPress](https://codex.wordpress.org/Editing_wp-config.php#Moving_uploads_folder){.external} to use the new path
2. Add path to the `.gitignore` file
3. Configure a `private` subdirectory of the new path within [`protected_web_paths`](#protected-web-paths)

#### Considerations
* Recommended usage limited to [Custom Upstream Configurations](#custom-upstream-configurations) in `pantheon.upstream.yml`
* Path must be relative to the site's docroot
* Specify the exact path; limited selection of valid paths:
  * `/files`
  * `/sites/default/files`
  * `/wp-content/uploads`

## Quicksilver Platform Integration Hooks
Use the `pantheon.yml` file to define scripts you want executed automatically when a particular workflow is triggered on Pantheon by you or a teammate. For example, you can write a script to post a message to Slack whenever code is pushed to the Site Dashboard.

For more information, see [Automate your Workflow with Quicksilver Platform Integration Hooks](/docs/quicksilver/) and check our growing set of [Platform Integration guides](/docs/guides/) demonstrating Quicksilver hooks.

## Custom Upstream Configurations
Add a `pantheon.upstream.yml` file to your organization's [Custom Upstream](/docs/custom-upstream/) to set default configurations for all downstream sites. The same [properties described above](#advanced-site-configuration) can be used in this file. In addition, it is also possible to define a [`deploy_product` Quicksilver hook](/docs/quicksilver/#hooks) here; however other Quicksilver workflows are not supported.

This file should only be edited in the Custom Upstream repository where it is defined. Similarly, the Custom Upstream repository should not define a `pantheon.yml` file; it should place all configuration settings in the upstream file instead.

When the same configuration value is defined in both files, the value from `pantheon.yml` will override the value from `pantheon.upstream.yml` at the site-level.



## Troubleshooting

### "Changes to pantheon.yml detected, but there was an error while processing it"

We will reject a commit that includes a `pantheon.yml` error, with a message like:
```nohighlight
remote: PANTHEON ERROR:
remote:
remote: Changes to `pantheon.yml` detected, but there was an error while processing it:
remote:
remote:
remote: Version '2' is not a valid pantheon.yml version!
remote: Valid versions are: 1
```

While our parser will reject a `pantheon.yml` that is invalid, it won't necessarily give you the exact reason the file is invalid. Please refer to the examples above for exact syntax.

### Deploying Configuration Changes to Multidev
Changes made to `pantheon.yml` file on a branch **are not** detected when creating the Multidev environment for that branch. As a workaround, make some modification to `pantheon.yml` file and re-commit to the Multidev environment. You will then receive a notice indicating configuration changes have been detected and applied to the Multidev environment:

```nohighlight
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
Changes made to `pantheon.yml` **are not** detected when deployed as a [hotfix](/docs/hotfixes/). As a workaround, make a modification to your `pantheon.yml` file in a development environment (e.g, add a code comment), then deploy up to production using the standard Pantheon workflow.

## See Also
- [Automating and Integrating your Pantheon Workflow with Quicksilver Platform Hooks](/docs/quicksilver/)
- [Upgrade PHP Versions](/docs/php-versions/)

---
title: Quicksilver on Pantheon
subtitle: Install Scripts
description: Learn how to install scripts with Quicksilver.
contenttype: [guide]
innav: [false]
categories: [automate]
cms: [--]
audience: [development]
product: [--]
integration: [quicksilver]
tags: [quicksilver, webops, workflow]
showtoc: true
permalink: docs/guides/quicksilver/install-script
---

This section provides information on script type and location, as well as how to install specific scripts.

## Script Type and Location

Quicksilver currently supports `webphp` scripting, which runs a PHP script through the same runtime environment as the website. PHP scripts are subject to the same limits as any code on the platform, such as [timeouts](/timeouts). PHP scripts cannot be batched, and run continuously and sequentially. Each command executes after the previous command has finished or timed out.

We recommend that you set the `web_docroot` to `true` and that you create a dedicated directory under the docroot (for example, `web/private/scripts`). This tracks files by instructing Quicksilver to look for the files inside the `web` folder. If your site uses this [nested docroot](/nested-docroot) setting, the scripts directory must be located in the `web` subdirectory of your site's code repository (for example, `web/private/scripts`).

<Alert type="info" title="Nested Docroots">

If your site uses a [nested docroot](/nested-docroot), the script paths in your `pantheon.yml` file should not include the `web/` path prefix. Scripts in your `pantheon.yml` file should match one of the following path examples:

- `private/scripts/new_relic_deploy.php`
- `private/scripts/slack_deploy_notification.php`

Even though the `script` section in the `pantheon.yml` file does not include the `web` folder, the file is located inside `web`. For example, if this line is set in the `pantheon.yml` file:

`private/scripts/new_relic_deploy.php`

The file must be located in:

`web/private/scripts/new_relic_deploy.php`

</Alert>

## Composer Script Installs

You can use Terminus to install Quicksilver Composer scripts if you have a Composer-managed site. The sections below provide links to Pantheon-maintained repositories with install scripts.



### Clear Cloudflare Cache

Use the [Pantheon Cloudflare Cache repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/cloudflare_cache) to clear your Cloudflare cache.

<Alert title="Note" type="info" >

Always clear your CDN cache using the `after` timing option to avoid requests re-caching stale content. Caches should generally be cleared "bottom up".

</Alert>

### Debugging with Quicksilver

Use the [Pantheon Quicksilver Debugging repository](https://github.com/pantheon-quicksilver/debugging-example) to explore Quicksilver as a workflow improvement tool.

### Drush CMI

The [Pantheon Drush CMI repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/drush_config_import) provides steps on how to integrate Drush commands into your Quicksilver operations. This allows you to import configuration changes from `.yml` files.

### Drush Revert Features

The [Pantheon Drush Revert Features repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/drush_revert_features) provides information on using Drush commands to revert specific features.

### Enable Development Modules

The [Pantheon Enable Development Module repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/enable_dev_modules) provides steps on how to use Drush within a Quicksilver script.

### Generate Development Content

Use the [Pantheon Generate Development Content repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/generate_dev_content) to integrate Drush devel generate commands into your Quicksilver operations. This allows you to generate development content on each database clone operation.

### Import WP-CFM Configuration Settings into a Cloned Database

Use the [Pantheon WP-CFM Import repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/wp_cfm_import) to automatically import WP-CFM configuration settings into a cloned database. This is useful for development environments that have slightly different settings than the production environment.

<Alert title="Note" type="info">

Only use WP-CFM to write changes to code in Dev and Multidev environments, where the code base is writable. Cloning databases between environments before saving WP-CFM bundles can result in loss of data.

</Alert>

### New Relic Custom Apdex T Values Multidev Environments

Use the [Pantheon New Relic Apdex T Values repository](https://github.com/pantheon-quicksilver/new-relic-apdex-t) to set custom T values for Multidev environments. Each environment will use the default values of 0.5 and 7 for your server and browser, respectively, if you don't set a custom value.

### New Relic Deploy Markers

Use the [Pantheon New Relic Deploy Markers repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/new_relic_deploy) to automatically log changes to your site into New Relic's Deployments page. This can be useful for keeping track of performance improvements.

### Search and Replace URLs on WordPress Sites

Use the [Pantheon Search and Replace URLs on WordPress Sites repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/wp_search_replace) to automatically find and replace URLs in the database of a WordPress website. This is helpful for sites that have multiple domains in an environment.

### Secrets

Your script may require tokens, passwords, or other information that should be protected. These values can be managed securely using the [Pantheon Secrets](/guides/secrets) platform service. First set the key via Terminus, then use the `pantheon_get_secret()` function in your script, for example:

```php
if ( function_exists( 'pantheon_get_secret' ) ) {
  $secret_value = pantheon_get_secret( 'secret_name' );
}
```

Alternatively, you can use your site's [private files path](/guides/secure-development/private-paths#private-path-for-files) to store values.

### Slack Integration

Use the [Pantheon Slack Integration repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/slack_notification) to integrate Slack notifications from your Pantheon project using Quicksilver. This integration overview also provides information on how to manage API keys outside of your site repository.

### URL Checker

Use the [Pantheon URL Checker repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/url_checker) to check specific URLs after a live deployment. This script also notifies you of failures by email.

### Webhooks

Use the [Pantheon Quicksilver Webhooks repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/webhook) to post workflow data to an external URL for a generic Webhook implementation.

### WP Solr Indexing

Use the [Pantheon WP Solr Index repository](https://github.com/pantheon-systems/quicksilver-examples/tree/main/wp_solr_index) when you create a new WordPress Multidev environment. New WordPress Multidevs clone the code, files, and database, but not the Solr instance. This script re-indexes Solr using WP-CLI and the Solr Power WordPress plugin.

## More Resources

- [Private Paths for Files and Code](/guides/secure-development/private-paths)
- [WordPress Configuration Management (WP-CFM)](/guides/wordpress-configurations/wp-cfm)
- [Drush on Pantheon](/guides/drush)

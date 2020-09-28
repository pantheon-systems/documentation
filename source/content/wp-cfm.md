---
title: WordPress Configuration Management (WP-CFM)
description: Learn how to install and use the WordPress Configuration Management plugin on your Pantheon WordPress site.
cms: "WordPress"
categories: [develop]
tags: [workflow, plugins]
---

Version-controlling site configuration within the codebase is a best practice. Since WordPress site configuration is stored in the database alongside content, developer workflows must account for migrating configuration from development and testing environments into production without affecting the content.

The [WP-CFM](https://wordpress.org/plugins/wp-cfm/) plugin provides an elegant mechanism for enabling developers to practice configuration management in code. The plugin exports WordPress site configuration from the mysql database's `wp_options` table to a `.json` file stored in `wp-content/config`.  After deploying the file to a new environment for the same site, it can then import the configuration from the `.json` file into the second `wp_options` table.

<Alert title="Note" type="info">

WP-CFM should only be used to write changes to code in Dev and Multidev environments, where the code base is writable. Cloning databases between environments before saving WP-CFM bundles can result in loss of data.

</Alert>

## Install and Deploy WP-CFM

Each of the following steps can be done using the Pantheon and WordPress Dashboards or via the command line using Pantheon's CLI, [Terminus](/terminus):

1. [Set the connection mode to SFTP](/sftp) for the Dev or Multidev environment via the Pantheon Dashboard or with Terminus:

  ```bash{promptUser: user}
  terminus connection:set <site>.<env> sftp
  ```

1. Install the [WP-CFM](https://wordpress.org/plugins/wp-cfm/) plugin on the Dev Environment using the WordPress Dashboard or with Terminus:

  ```bash{promptUser: user}
  terminus wp <site>.<env> -- plugin install --activate wp-cfm
  ```

1. Commit this change using the Site Dashboard or with Terminus:

  ```bash{promptUser: user}
  terminus env:commit <site>.<env> --message="Install wp-cfm plugin"
  ```

1. Deploy this commit to the Test and Live environments using the Pantheon Dashboard or with Terminus:

  ```bash{outputLines: 1}
  # Deploy to Test|Live
  terminus env:deploy <site>.test --sync-content --cc --updatedb --note="Deploy WP-CFM plugin to the Test environment"
  terminus env:deploy <site>.live --cc --updatedb --note="Deploy WP-CFM plugin to the Live environment"
  ```

1. Activate the plugin on the Test and Live environments using the WordPress Dashboard or with Terminus:

  ```bash{promptUser: user}
  terminus wp <site>.test -- plugin activate wp-cfm
  terminus wp <site>.live -- plugin activate wp-cfm
  ```

## Configuration Bundling

WP-CFM refers to a group of settings to track as a **bundle**. There are two approaches to bundling your site's configuration:

- **Site-Wide Bundling**: Track the entire site configuration in a single bundle with the **Select All** option.
- **Feature Specific Bundling**: Track plugin, theme, and site-wide settings (e.g. permalinks) separately by creating multiple bundles.

<Alert title="Note" type="info">

To avoid conflicts, do not to track changes for the same values in more than one bundle. WP-CFM alerts you when it happens, but the plugin does not restrict you from doing so.

</Alert>

To create a bundle:

1. From the Dev environment's WordPress Dashboard menu, navigate to: **Settings** > **WP-CFM** (`/wp-admin/options-general.php?page=wpcfm`).

1. Select **Add Bundle**.

1. Choose **Select All** to track all options in a single bundle or individually select configurations for feature-specific bundling.

1. Name your bundle, and click **Save Changes**.

## Write Database Values to the Codebase: Push

1. Click **Diff** to review database settings that are not currently stored in code. Since this is the first time saving the bundle, the diff will show all configuration variables being saved to the codebase.

1. Select **Push** to export database values to the codebase.

 This creates a new file (e.g. `wp-content/config/bundle_name.json`) where configurations are stored for the bundle. Once the file exists, you can run the **Push** operation with Terminus, if preferred:

 ```bash{promptUser: user}
 terminus wp <site>.dev -- config push <bundle_name>
 ```

1. Commit your configuration to the codebase (`.json` bundle file) using the Site Dashboard or Terminus:

 ```bash{promptUser: user}
 terminus env:commit <site>.<env> --message="Create bundle_name.json for tracking configuration in code"
 ```

## Deploy Configuration: Pull

### Dev to Test

Deploy the `.json` file from Dev to Test.

1. Check **Pull files and the database from the Live environment?** and then click **Deploy Code from Development to Test Environment** if deploying via the Pantheon Dashboard or include `--sync-content` if deploying with Terminus:

  ```bash{promptUser: user}
  terminus env:deploy <site>.test --sync-content --cc --updatedb --note="Deploy code for <bundle_name> configuration"
  ```

1. Import configuration from the codebase into the database by clicking **Pull** for your bundle(s) within the Test environment's WordPress Dashboard (`/wp-admin/options-general.php?page=wpcfm`) or with Terminus:

  ```bash{promptUser: user}
  terminus wp <site>.test -- config pull <bundle_name>
  ```

1. Test configuration on the Test environment URL with the content copied from Live.

### Test to Live

1. Deploy the `.json` file from Test to Live using the same steps as above, or with Terminus:

  ```bash{promptUser: user}
  terminus env:deploy <site>.live --cc --updatedb --note="Deploy code for <bundle_name> configuration"
  ```

1. Import configuration from the codebase into the database by clicking **Pull** within the Live environment's WordPress Dashboard (`/wp-admin/options-general.php?page=wpcfm`) or with Terminus:

  ```bash{promptUser: user}
  terminus wp <site>.live -- config pull <bundle_name>
  ```

1. Test the configuration on Live.

## Frequently Asked Questions

### What database values are tracked using WP-CFM?

`wp_options` is the only table that is automatically tracked by the plugin. This table is populated by the following sources:

- Default settings (`/wp-admin/options-general.php`)
- Theme option pages - includes customizer options stored in the row `theme_mods_yourthemename`
- Settings and option pages for plugins (e.g. `/wp-admin/options-general.php?page=sendgrid-settings`)

You can review values on the [All Settings Screen](https://codex.wordpress.org/Option_Reference#All_Settings_Screen) (`/wp-admin/options.php`).

### How can I extend WP-CFM to track more tables?

If you want to track configurations in more tables, you must do so using the `wpcfm_configuration_items` hook. For details, see [WP-CFM documentation](https://forumone.github.io/wp-cfm/).

### What's not tracked?

Site content, posts, users, taxonomy, etc. Review all queries for a page request using the Queries tab of the [Debug Bar](https://wordpress.org/plugins/debug-bar/) plugin to help identify more settings you want to track. This plugin requires that you enable [debugging via `wp-config.php`](/wp-config-php/#frequently-asked-questions).

### Why aren't my site navigation menus tracked?

The `wp_options` table stores serialized value for active menus, identified with the `term_id` parameter of the `theme_mods_yourthemename` row. This table does not store menu data otherwise. By default, WP-CFM will only track when a menu is enabled or disabled for the site and not when a menu's items are updated.

Menus and menu items are considered to be taxonomies in WordPress. To track these values, extend WP-CFM so that `wp_terms` and `wp_term_relationships` tables are considered in addition to the default `wp_options`.

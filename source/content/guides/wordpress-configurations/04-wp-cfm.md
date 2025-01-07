---
title: WordPress Configurations Guide
subtitle: WordPress Configuration Management (WP-CFM)
description: Learn how to install and use the WordPress Configuration Management plugin on your Pantheon WordPress site.
contenttype: [guide]
innav: [false]
categories: [config]
cms: [wordpress]
audience: [development]
product: [--]
integration: [plugins]
tags: [workflow, plugins]
permalink: docs/guides/wordpress-configurations/wp-cfm
---

This section provides information on how to install and configure the [WordPress Configuration Management (WP-CFM)](https://github.com/forumone/wp-cfm-dist/wiki) plugin on your Pantheon WordPress site.

It is a best practice to maintain version control for your site configuration within the codebase. Developer workflows must account for migrating configuration from development and testing environments into production without affecting the content because WordPress site configuration is stored in the database alongside content.

The WP-CFM plugin provides a simple mechanism to allow developers to practice configuration management within their code. The plugin exports WordPress site configuration from the SQL database's `wp_options` table to a `.json` file stored in `private/config`. You must deploy the file to a new environment for the same site before you can import the configuration from the `.json` file into the second `wp_options` table.

<Alert title="Note" type="info">

WP-CFM should only be used to write changes to code in Dev and Multidev environments where the code base is writable. Cloning databases between environments before saving WP-CFM bundles can result in loss of data.

</Alert>

## Install and Deploy WP-CFM

<TabList>

<Tab title="Installing via Git Updater" id="git-updater" active={true}>

This method makes use of the [Git Updater](https://git-updater.com/) plugin to install and keep WP-CFM up-to-date. Follow the steps in [our documentation on installing plugins using Git Updater](/guides/wordpress-configurations/installing-updating-from-third-party-sources#using-git-updater-to-install-and-manage-plugins-and-themes-from-git-repositories) and use the following settings:

**Plugin URI:** `forumone/wp-cfm-dist`  
**Repository Branch:** `main`  
**Remote Repository Host:** GitHub  
**GitHub Access Token:** Blank  

</Tab>

<Tab title="Installing via Composer" id="composer">

This method makes use of [Integrated Composer](/guides/integrated-composer) to manage installation and version management. This process assumes you already have a `composer.json` in your site repository and `build_step` is set to `true` in your `pantheon.yml`. Follow the steps in [our documentation on installing plugins using Composer](/guides/wordpress-configurations/installing-updating-from-third-party-sources#using-composer-to-source-plugins-and-packages) and use `forumone/wp-cfm` as the repository.

</Tab>

</TabList>

1. Deploy the commit to the Test and Live environments using the Pantheon Dashboard or with Terminus, and clear the cache for both environments:

    ```bash{outputLines: 1}
    # Deploy to Test
    terminus env:deploy <site>.test --sync-content --updatedb --note="Deploy WP-CFM plugin to the Test environment"
  
    # Clear the cache
    terminus env:clear-cache <site>.test
  
    # Deploy to Live
    terminus env:deploy <site>.live --updatedb --note="Deploy WP-CFM plugin to the Live environment"
  
    # Clear the cache
    terminus env:clear-cache <site>.live
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

Do not to track changes for the same values in more than one bundle or you will encounter conflicts. WP-CFM alerts you when conflicts happen, but the plugin does not restrict you from doing so.

</Alert>

To create a bundle:

1. Open the Dev environment's WordPress Dashboard menu, select **Settings**, and then select **WP-CFM** (`/wp-admin/options-general.php?page=wpcfm`).

1. Select **Add Bundle**.

1. Choose **Select All** to track all options in a single bundle or individually select configurations for feature-specific bundling.

1. Name your bundle, and then click **Save Changes**.

## Write Database Values to the Codebase: Push

1. Click **Diff** to review database settings that are not currently stored in code. The diff will show all configuration variables being saved to the codebase because this is the first time saving the bundle.

1. Select **Push** to export database values to the codebase.

  This creates a new file (e.g. `wp-content/config/bundle_name.json`) where configurations are stored for the bundle. Wait for the file to save and display and then run the **Push** operation with Terminus, if preferred:

    ```bash{promptUser: user}
    terminus wp <site>.dev -- config push <bundle_name>
    ```

1. Commit your configuration to the codebase (`.json` bundle file) using the Site Dashboard or Terminus:

    ```bash{promptUser: user}
    terminus env:commit <site>.<env> --message="Create bundle_name.json for tracking configuration in code"
    ```

## Automatically Import WP-CFM Configuration Settings into a Cloned Database

You can automatically import your WP-CFM configuration settings into a cloned database if you use Quicksilver. Consult the [Quicksilver guide](/guides/quicksilver) for more details.

## Deploy Configuration: Pull

### Dev to Test

Deploy the `.json` file from Dev to Test:

1. Check **Pull files and the database from the Live environment?**, then click **Deploy Code from Development to Test Environment** if deploying via the Pantheon Dashboard or include `--sync-content` if deploying with Terminus:

    ```bash{promptUser: user}
    terminus env:deploy <site>.test --sync-content --updatedb --note="Deploy code for <bundle_name> configuration"
    ```

1. Clear the site cache after the deployment:

    ```bash{promptUser: user}
    terminus env:clear-cache <site>.test
    ```

1. Click **Pull** for your bundle(s) within the Test environment's WordPress Dashboard (`/wp-admin/options-general.php?page=wpcfm`) or with Terminus to import configuration from the codebase into the database:

    ```bash{promptUser: user}
    terminus wp <site>.test -- config pull <bundle_name>
    ```

1. Test configuration on the Test environment URL with the content copied from Live.

### Test to Live

1. Deploy the `.json` file from Test to Live using the same steps as above, or with Terminus:

    ```bash{promptUser: user}
    terminus env:deploy <site>.live --updatedb --note="Deploy code for <bundle_name> configuration"
    ```

1. Clear the site cache after the deployment:

    ```bash{promptUser: user}
    terminus env:clear-cache <site>.live
    ```

1. Click **Pull** within the Live environment's WordPress Dashboard (`/wp-admin/options-general.php?page=wpcfm`) or with Terminus:

    ```bash{promptUser: user}
    terminus wp <site>.live -- config pull <bundle_name>
    ```

1. Test the configuration on Live.

## Frequently Asked Questions
### Why can’t I install WP-CFM from the WordPress plugin repository?

The WP-CFM plugin on WordPress.org is no longer receiving updates. This means that if you had previously installed via the WordPress plugin repository, you will not receive updates to the plugin unless you use one of the above alternative options. See our documentation on [installing and managing plugins from third party sources}(https://docs.pantheon.io/guides/wordpress-configurations/installing-updating-from-third-party-sources).

### What database values are tracked using WP-CFM?

`wp_options` is the only table that is automatically tracked by the plugin. This table is populated by the following sources:

- Default settings (`/wp-admin/options-general.php`)
- Theme option pages: This includes customized options stored in the row `theme_mods_yourthemename`
- Settings and option pages for plugins (e.g. `/wp-admin/options-general.php?page=sendgrid-settings`)

You can review values on the [All Settings Screen](https://codex.wordpress.org/Option_Reference#All_Settings_Screen) (`/wp-admin/options.php`).

### How can I extend WP-CFM to track more tables?

If you want to track configurations in more tables, you must use the `wpcfm_configuration_items` hook. Refer to the [WP-CFM documentation](https://github.com/forumone/wp-cfm-dist/wiki) for more information.

### Will WP-CFM work with Multidev?

Yes. For the Multidev to appear as a config option, you must hook into the plugin's [`wpcfm_multi_env`](https://github.com/forumone/wp-cfm-dist/wiki/Filters-Reference#wpcfm_multi_env) and [`wpcfm_current_env`](https://github.com/forumone/wp-cfm-dist/wiki/Filters-Reference#wpcfm_current_env) functions in a Must Use Plugin like the example in [Create a WordPress MU-Plugin for Actions and Filters](/guides/wordpress-configurations/mu-plugin/#wp-cfm-compatibility).

### What's not tracked?

Site content, posts, users, taxonomy, etc. Review all queries for a page request using the Queries tab of the [Debug Bar](https://wordpress.org/plugins/debug-bar/) plugin to help identify more settings you want to track. This plugin requires that you enable [debugging via `wp-config.php`](/guides/php/wp-config-php/#frequently-asked-questions).

### Why aren't my site navigation menus tracked?

The `wp_options` table stores serialized value for active menus, identified with the `term_id` parameter of the `theme_mods_yourthemename` row. This table does not store menu data otherwise. By default, WP-CFM will only track when a menu is enabled or disabled for the site and not when a menu's items are updated.

Menus and menu items are considered to be taxonomies in WordPress. To track these values, extend WP-CFM so that `wp_terms` and `wp_term_relationships` tables are considered in addition to the default `wp_options`.

## More Resources

- [Content Staging with WP-CFM](/content-staging#staging-content-with-wp-cfm)
- [Optimize Your wp-options Table and Autoloaded Data](/optimize-wp-options-table-autoloaded-data)
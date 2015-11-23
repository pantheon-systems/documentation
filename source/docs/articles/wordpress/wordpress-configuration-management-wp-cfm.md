---
title: WordPress Configuration Management (wp-cfm)
description: Learn how to install and use the WordPress Configuration Management plugin on your Pantheon WordPress site.
category:
  - managing
keywords: wordpress, configuration, plugin
---
While the [Pantheon Workflow](/docs/articles/sites/code/using-the-pantheon-workflow) facilitates common best practices for developing WordPress sites, database management can seem like a major pain in cloud-based infrastructures. Multiple environments give you incredible freedom to develop new features risk free, but it requires a bit more thought to track database changes efficiently.

We strongly recommend the [WP-CFM](https://wordpress.org/plugins/wp-cfm/) plugin for this task. Once implemented, you'll easily be able to carry database settings alongside code deployments to other environments on Pantheon. This process will ultimately store database values in your codebase, allowing them to be version controlled.

## Install and Deploy WP-CFM

Each of the following steps can be done using the Pantheon and WordPress Dashboards or via the command line using Pantheon's CLI, [Terminus](/docs/articles/local/cli):

1. [Set the connection mode to SFTP](/docs/articles/sites/code/developing-directly-with-sftp-mode) for the Dev environment via the Pantheon Dashboard or with the following Terminus command:
 ```bash
 terminus site set-connection-mode --site=<site> --env=dev --mode=sftp
 ```

2. Install the [wp-cfm plugin](https://wordpress.org/plugins/wp-cfm/) on the Dev Environment using the WordPress Dashboard or with the following Terminus command:
 ```bash
 terminus wp plugin install --activate wp-cfm --site=<site> --env=dev
 ```

3. Commit this change using the Site Dashboard or the following Terminus command:
 ```bash
 terminus site code commit --site=<site> --env=dev --message="Install wp-cfm plugin"
 ```

4. Deploy this commit to the Test and Live environments using the Site Dashboard or the following Terminus commands:
 ```bash
 # Deploy to Test
 terminus site deploy --site=<site> --env=test --cc --sync-content --note="Deploy wp-cfm plugin to the Test environment"
 # Deploy to Live
 terminus site deploy --site=<site> --env=live --cc --note="Deploy wp-cfm plugin to the Live environment"
 ```

5. Activate the plugin on the Test and Live environments using the WordPress Dashboard or the following Terminus command:
 ```bash
 terminus wp plugin activate wp-cfm --site=<site> --env=<live|test>
 ```

## Create a Bundle
From within the Dev environment's WordPress Dashboard, navigate to **Settings** > **WP-CFM** (`/wp-admin/options-general.php?page=wpcfm`). Click the **Add Bundle** button to toggle a list of values available for you to track:
![wp-cfm wp-options list](/source/docs/assets/images/wp-cfm-options.png)
By default, this list is a reflection of the existing rows within the `wp-options` table of the environment's database. For information on values stored within this table and how to track more tables, see the FAQ section below.

There are two approaches to consider when creating your site bundles, which are explored below. After selecting the options you wish to track, name your bundle and click **Save Changes**.

### Site-Wide Bundling
Track configurations for the entire site by creating a new bundle and choosing the **Select All** option. This will track all changes made to the `wp-options` table. This includes modifications to plugins/themes and site-wide options such as permalinks.

### Individual Bundling
You can create multiple bundles to separately track database modifications. For example, you can manage modifications to the settings of a custom plugin in one bundle track the site-wide settings separately in another bundle.
<div class="alert alert-info">
<h4>Note</h4>
When using this strategy, do not to track changes for the same values in more than one bundle to avoid conflicts. WP-CFM shows a warning when configurations such as this exist, but the plugin does not restrict you from doing so.
</div>

## Write Database Values to the Codebase
### View Changes: Diff
Once you have created a bundle with the desired values selected, click **Diff**. The difference between values existing in the database vs values existing in the codebase will be shown. Values in green are not yet apart of your site's codebase.
### Write Changes to Code: Push
Select **Push** to write database values to your site's codebase.

A new file named `wp-content/config/bundle_name.json` will be created and version controlled in your site's repository on Pantheon. Review and commit your new file to the codebase on the Dev environment.

### Import Changes to Test/Live: Pull
Deploy your most recent commit of the `wp-content/config/bundle_name.json` file to the Test environment. Select **Copy Content from Live and Deploy Code from Development** or include `--sync-content` if you're deploying via Terminus.  

From within the Test environment's WordPress Dashboard, navigate to **Settings** > **WP-CFM** (`/wp-admin/options-general.php?page=wpcfm`). Now that the `wp-content/config/bundle_name.json` file from Dev has been updated and deployed, you can select **Pull** to rewrite database configurations with a single click. Review the Test environment's site to test against content present on the Live environment. Repeat the "Pull" process within WP-CFM to align database changes on the Live environment.


## FAQ

### What database values are tracked using WP-CFM?
`wp_options` is the only table that is automatically tracked by the plugin. This table is populated by the following sources:

- Default Settings (`/wp-admin/options-general.php`)
- Theme option pages - Includes customizer options stored in the row `theme_mods_yourthemename`
- Settings and option pages for plugins (e.g. `/wp-admin/options-general.php?page=sendgrid-settings`)

You can review values on the [All Settings Screen](https://codex.wordpress.org/Option_Reference#All_Settings_Screen) (`/wp-admin/options.php`).

### How can I extend WP-CFM to track more tables?
If you want to track changes in any other tables, you must do so using the `wpcfm_configuration_items` hook. For details, see [wp-cfm docs](http://forumone.github.io/wp-cfm/).

### What's NOT tracked?
Anything related to site content, posts, users, taxonomy, etc. If you know you want to track more, but you’re not sure what table a value is stored in try using the [Debug Bar](https://wordpress.org/plugins/debug-bar/) plugin. This will allow you to view all queries made for a particular page request.

Install the plugin on the Dev environment and [enable debugging within `wp-config.php`](/docs/articles/wordpress/configuring-wp-config-php/#frequently-asked-questions). Then, use the **Queries** tab of the Debug Bar to locate the query used to execute the request you want to track. From there, you can deduce what table is used and extend WP-CFM so that the values are populated within your bundle options.

### Why aren't my site navigation menus tracked?
The `wp_options` table stores serialized data on the active menus as part of the `theme_mods_yourthemename` row using the menu's unique identifier (`term_id`). Unless an active menu is added, deleted, de-selected, or replaced - WP-CFM won’t track updates by default.

This is because modifying the menu items of an existing and currently active menu does not change the menu's `term_id`, so `wp_options` remains unchanged. What this action does instead is modifies the taxonomy relationship between a menu and it's items, stored in the `wp_terms` and `wp_term_relationships` tables.

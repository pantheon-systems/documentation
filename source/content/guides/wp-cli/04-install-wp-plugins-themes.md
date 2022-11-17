---
title: WP-CLI on the Pantheon Platform
subtitle: Install Plugins and Themes with WP-CLI
description: Learn how to install plugins and themes with WP-CLI and Terminus.
cms: "WordPress"
categories: [develop]
tags: [wp-cli, cli]
layout: guide
showtoc: true
permalink: docs/guides/wp-cli/install-wp-plugins-themes
anchorid: install-wp-plugins-themes
---

This section provides information on how to install WordPress plugins and themes with WP-CLI and Terminus.

## Install WordPress Plugins

The [WordPress plugin repository](https://wordpress.org/plugins/) provides a list of free and paid plugins. The example below shows you how to install and activate the [Contact Form 7](https://wordpress.org/plugins/contact-form-7/) plugin.

1. Install and activate the [Contact Form 7](https://wordpress.org/plugins/contact-form-7/) plugin:

    ```bash
    terminus wp $TERMINUS_SITE.dev -- plugin install contact-form-7 --activate
    ```

    - Open the Site Dashboard to confirm that 78 files have changed and are ready to commit in the yellow box. You can use the Site Dashboard interface to review file changes and commit, or continue to use the command line as the example below.

    ![Pantheon Site Dashboard: Install CF7](../../../images/wordpress-commandline-install-cf7.png)

1. Review the file changes:

    ```bash
    terminus env:diffstat $TERMINUS_SITE.dev
    ```

1. Commit your changes to the Dev environment:

    ```bash
    terminus env:commit $TERMINUS_SITE.dev --message="Install CF7"
    ```

    You can see the commit on the Dev environment if you refer back to the Site Dashboard:
    ![Pantheon Site Dashboard: Commit CF7](../../../images/wordpress-commandline-commit-cf7-to-dev.png)

1. Deploy the code to Test and pull content down from Live:

    ```bash
    terminus env:deploy $TERMINUS_SITE.test --sync-content  --updatedb --note="Deploy C7 plugin"
    ```

1. Clear the site cache after deploying the code to Test:

    ```bash
    terminus env:clear-cache <site>.test
    ```

    <Alert title="Note" type="info">

    The `--sync-content` option will pull the database and files down from the Live environment. In a real-world scenario, your content editors most likely have added posts and files in the Live environment. These updates should be present on the Test environment with your deployed code for thorough testing. Run `terminus env:deploy -h` for more information on options for the this command.

    </Alert>

1. Activate the Contact Form 7 plugin on the Test environment by making a manual configuration change:

    ```bash
    terminus wp $TERMINUS_SITE.test -- plugin activate contact-form-7
    ```

1. Verify that your Test environment and the new plugin are working correctly, and then deploy to Live:

    ```bash
    terminus env:deploy $TERMINUS_SITE.live --updatedb --note="Deploy after CF7 Install"
    ```

1. Clear the site cache after deploying the code to Live:

    ```bash
    terminus env:clear-cache <site>.live
    ```

    <Alert title="Note" type="info">

    You don't need the `--sync-content` flag when going to the Live environment because that environment already has our canonical database.

    </Alert>

7. Activate the Contact Form 7 plugin on the Live environment by making a manual configuration change:

    ```bash
    terminus wp $TERMINUS_SITE.live -- plugin activate contact-form-7
    ```

    Manually applying configuration changes is a simple task for this example because you're only activating one plugin on each environment. However, complex configuration changes are [best managed in code](/pantheon-workflow/#configuration-management) so you can pull fresh content from Live while bringing in the site settings from Dev.

## Install WordPress Themes

The [WordPress theme repository](https://wordpress.org/themes/) provides a list of free and paid themes you can install to customize your site. The example below uses the [Shapely](https://wordpress.org/themes/shapely/) theme.

1. Install and activate the [Shapely](https://wordpress.org/themes/shapely/) theme:

    ```bash
    terminus wp $TERMINUS_SITE.dev -- theme install shapely --activate
    ```

1. Run the `terminus env:info` command to retrieve the Dev environment's site URL:

    ```bash
    terminus env:info $TERMINUS_SITE.dev --field=domain
    ```

1. Commit your changes to the Dev environment:

    ```bash
    terminus env:commit $TERMINUS_SITE.dev --message="Install shapely theme"
    ```

1. Run [the `scaffold child-theme` WP-CLI command](https://developer.wordpress.org/cli/commands/scaffold/child-theme/) to create a [child theme](https://codex.wordpress.org/Child_Themes) (replace `Tessa-child-theme` and `shapely` to match your setup):

   ```bash
    terminus wp $TERMINUS_SITE.dev -- scaffold child-theme Tessa-child-theme --parent_theme=shapely
   ```

1. Navigate to the WordPress Dashboard, select **Appearance**, and then select **Themes** to access the new theme.

    ![Pantheon Site Dashboard: Child Theme Installed in WordPress](../../../images/wordpress-commandline-child-theme-wp.jpg)

    You can now edit your child theme. This allows your parent theme, in this example, Shapely, to receive updates without conflict or interference to the functionality of the site.

1. Apply configuration changes, such as activating the child theme, verify that everything is correct on the Dev environment's site URL.

1. Commit your changes to the Dev environment:

    ```bash
    terminus env:commit $TERMINUS_SITE.dev --message="Create Child of Shapely Theme"
    ```

1. Deploy the themes to Test and pull content down from Live:

    ```bash
    terminus env:deploy $TERMINUS_SITE.test --sync-content --updatedb --note="Deploy Themes"
    ```

1. Clear the site cache:

    ```bash
    terminus env:clear-cache <site>.live
    ```

1. Apply configuration changes and verify that everything is correct on the Test environment's site URL.

1. Deploy code to Live, then apply configuration changes:

    ```bash
    terminus env:deploy $TERMINUS_SITE.live --updatedb --note="Deploy Themes"
    ```

1. Clear the site cache:

    ```bash
    terminus env:clear-cache <site>.live
    ```

## More Resources

- [WordPress Plugins and Themes with Known Issues](/plugins-known-issues)
- [Create a WordPress MU-Plugin for Actions and Filters](/guides/wordpress-configurations/mu-plugin)

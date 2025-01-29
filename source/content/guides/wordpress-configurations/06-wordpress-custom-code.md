---
title: WordPress Configurations Guide
subtitle: Manage Custom Code for WordPress with Plugins
description: Learn how to manage custom plugins or themes for WordPress sites with Git Updater or WP Pusher.
contenttype: [guide]
innav: [false]
categories: [config]
cms: [wordpress]
audience: [development]
product: [--]
integration: [plugins]
tags: [workflow, code]
contributors: [afragen, petersuhm, jazzsequence]
reviewed: "2024-10-14"
permalink: docs/guides/wordpress-configurations/wordpress-custom-code
---

This section provides information on how to manage custom plugins and themes on your WordPress Pantheon site.

Extending WordPress with custom code is a common part of the development lifecycle. It's essential that extensions are maintained independently from your sites and projects to optimize workflows and to allow custom code to be reused easily. You should also separate function from design to allow changes to persist when you swap themes. This method allows you to avoid dropping code into the current theme's `functions.php` file and pasting snippets when you want to reuse code in another project.

You can manage custom code separate from your projects within site-specific [plugins](https://codex.wordpress.org/Writing_a_Plugin). This allows you to scope out an update strategy to distribute changes easily. [Git Updater](https://github.com/afragen/git-updater) or [WP Pusher](https://wppusher.com/) are good options for this workflow.

<Alert title="Note" type="info">

Pantheon does not support Git submodules (placing a Git repository within a subdirectory of your site’s repository).

</Alert>

## Before You Begin

1. Separate custom code into site-specific plugins or themes stored within individual repositories outside of your project.

1. Host your custom extensions remotely on [GitHub](https://github.com/), [Bitbucket](https://bitbucket.org), or [GitLab](https://about.gitlab.com/).

Refer this [blog post](https://pantheon.io/blog/wordpress-development-git) for more information on separating custom code.

## Git Updater

[Git Updater](https://github.com/afragen/git-updater) is an open-source plugin developed by [Andy Fragen](https://git-updater.com/) that extends the existing notification and update mechanisms within WordPress to plugins and themes hosted outside of the official WordPress repository on GitHub, Bitbucket, GitLab, Gitea or GitHub Gists. Git Updater displays update notifications within the WordPress dashboard for public and private repositories.

1. Add the [relevant header line](https://git-updater.com/knowledge-base/usage/) to your plugin or theme header block to add support for the Git Updater depending on where your code is hosted.(`GitHub Plugin URI`, `). The following [plugin example](https://git-updater.com/knowledge-base/usage/#articleTOC_2) should be placed within the plugin's header:

  ```bash
  /**
   * Plugin Name:       My Cool Plugin
   * Plugin URI:        https://github.com/wpdeveloper/my-cool-plugin
   * Description:       A cool plugin that does cool things.
   * Version:           1.0.0
   * Author:            WordPress Developer
   * License:           GNU General Public License v2
   * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
   * GitHub Plugin URI: https://github.com/wpdeveloper/my-cool-plugin
   * GitHub Languages:  https://github.com/wpdeveloper/my-cool-plugin-translations
   */
  ```

  [Theme declarations](https://git-updater.com/knowledge-base/usage/#articleTOC_3) are made similarly within the `styles.css` file.

  As an alternative to adding declarations within the headers of plugins and themes, you can use the [Additions functionality inside the Git Updater plugin](https://git-updater.com/knowledge-base/git-updater-additions/), which will add the appropriate data via hooks in Git Updater.

1. Set the Dev environment's connection mode to SFTP within the Pantheon Dashboard or via [Terminus](/terminus):

  ```bash{promptUser: user}
  terminus connection:set <site>.<env> sftp
  ```

1. Download the [latest release](https://github.com/afragen/git-updater/releases) of the Git Updater plugin.

1. Install the plugin by uploading the zip file within the WordPress Dashboard on the Dev environment (`/wp-admin/plugin-install.php?tab=upload`).

1. Activate Git Updater from the Plugin page (`/wp-admin/plugins.php`).

1. Navigate to **Settings**, select **Git Updater**, and then select **Install Plugin**/**Install Theme** to install your custom extensions.

   Alternatively, you can install the Git Updater plugin directly from the command line using Terminus:
   
   ```bash{promptUser: user}
    terminus wp <site>.<env> -- plugin install https://github.com/afragen/git-updater/releases/download/12.6.0/git-updater-12.6.0.zip
    ```

Notifications within the WordPress dashboard will now include updates to your custom code. If expected updates are not found within `/wp-admin/update-core.php`, click **Check Again** to clear [transients](https://codex.wordpress.org/Transients_API), or wait for them to reset automatically.

## WP Pusher

[WP Pusher](https://wppusher.com/) provides a similar method to Git Updater for managing your custom code, but with some key differences. WP Pusher is free for open source code hosted in public repositories. Supporting private repositories requires you to purchase a license. Currently, update notifications are not displayed within the WordPress dashboard, but you can configure the plugin to automatically install updates on Pantheon following a push to the remote repository (e.g. GitHub, Bitbucket, or GitLab). There are no declarations required within your plugin or theme. This means that modifications to existing custom extensions are not required.

1. [Download WP Pusher](https://wppusher.com/).

1. Set the Dev environment's connection mode to SFTP within the Pantheon Dashboard or via [Terminus](/terminus): `terminus connection:set <site>.<env> sftp`

1. Install the plugin by uploading the archive within the WordPress Dashboard on the Dev environment (`/wp-admin/plugin-install.php?tab=upload`).

1. Activate WP Pusher from the Plugin page (`/wp-admin/plugins.php`).

1. Navigate to **WP Pusher** and select **Install Plugin**/**Install Theme** to install your custom extensions.

1. Enable the **Push-to-Deploy** option if you want to automatically install updates on Pantheon's Dev environment when pushes are made to the remote repository hosting your custom code. You can also update custom plugins and themes installed via WP Pusher this way: Navigate to **WP Pusher**, select **Plugins**/**Themes**, and then select **Update Plugin**/**Update Theme**.

### Troubleshooting

You may encounter WordPress database errors referencing the `wp_wppusher_packages` table within the `php-error.log` on the Test and Live environments, similar to the following:

```sql
[28-Mar-2016 17:57:58 UTC] WordPress database error Table 'pantheon.wp_wppusher_packages' doesn't exist for query SELECT * FROM wp_wppusher_packages WHERE type = 1 made by require_once('wp-admin/admin.php'), do_action('admin_init'), call_user_func_array, Pusher\Pusher->registerPluginActionLinks, Pusher\Storage\PluginRepository->allPusherPlugins
```

These errors occur when the expected WP Pusher database table does not exist on the environment. Deactivate and the re-activate the plugin on Test and Live to resolve this error.

## More Resources

- [WordPress Plugins and Themes with Known Issues](/plugins-known-issues)
- [WP-CLI on the Pantheon Platform](/guides/create-wp-site)
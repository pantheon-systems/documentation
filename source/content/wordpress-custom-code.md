---
title: Managing Custom Code for WordPress with Plugins
description: Learn how to manage custom plugins or themes for WordPress sites using GitHub Updater or WP Pusher.
cms: "WordPress"
categories: [develop]
tags: [workflow, code]
contributors: [afragen, petersuhm]
---
Extending WordPress with custom code is a common part of the development lifecycle. In order to optimize workflows, it's essential that extensions are maintained independently from your sites and projects so that custom code is easily reused. You'll also want to separate function from design, so that changes persist when swapping themes. This means no more dropping code into the current theme's `functions.php` file and no more pasting snippets when you want to reuse code in another project.

Instead, manage custom code separate from your projects within site-specific [plugins](https://codex.wordpress.org/Writing_a_Plugin). Then scope out an update strategy to easily distribute changes, such as [GitHub Updater](https://github.com/afragen/github-updater) or [WP Pusher](https://wppusher.com/).

<Alert title="Note" type="info">

Pantheon does not support Git submodules (placing a Git repository within a subdirectory of your site’s repository).

</Alert>

## Before You Begin

1. Separate custom code into site-specific plugins or themes stored within individual repositories outside of your project.

1. Host your custom extensions remotely on [GitHub](https://github.com/), [Bitbucket](https://bitbucket.org), or [GitLab](https://about.gitlab.com/).

For more details on separating custom code, see this related [blog post](https://pantheon.io/blog/wordpress-development-git).

## GitHub Updater

[GitHub Updater](https://github.com/afragen/github-updater) is an open-source plugin developed by [Andy Fragen](https://thefragens.com) that extends the existing notification and update mechanisms within WordPress to plugins and themes hosted outside of the official WordPress repository on GitHub, Bitbucket, or GitLab. This will display update notifications within the WordPress dashboard for public and private repositories.

1. Modify your plugin and/or theme to add support for the GitHub Updater by providing the required declarations. The following [plugin example](https://github.com/afragen/github-updater/#plugins) should be placed within the plugin's header:

  ```bash
  /*
  Plugin Name:       GitHub Updater
  Plugin URI:        https://github.com/afragen/github-updater
  Description:       A plugin to automatically update GitHub, Bitbucket or GitLab hosted plugins and themes. It also allows for remote installation of plugins or themes into WordPress.
  Version:           1.0.0
  Author:            Andy Fragen
  License:           GNU General Public License v2
  License URI:       https://www.gnu.org/licenses/gpl-2.0.html
  Domain Path:       /languages
  Text Domain:       github-updater
  GitHub Plugin URI: https://github.com/afragen/github-updater
  GitHub Branch:     master
  */
  ```

  [Theme declarations](https://github.com/afragen/github-updater#themes) are made similarly within the `styles.css` file.

  As an alternative to adding declarations within the headers of plugins and themes, you can use the [GitHub Updater Additions](https://github.com/afragen/github-updater-additions) plugin, which will add the appropriate data via hooks in GitHub Updater.

1. Set the Dev environment's connection mode to SFTP within the Pantheon Dashboard or via [Terminus](/terminus):

  ```bash{promptUser: user}
  terminus connection:set <site>.<env> sftp
  ```

1. Download the [latest release](https://github.com/afragen/github-updater/releases) of the GitHub Updater plugin (select the **zip** option).

1. Unzip the archive and rename the folder to `github-updater`, then re-zip the file.

1. Install the plugin by uploading the renamed zip file within the WordPress Dashboard on the Dev environment (`/wp-admin/plugin-install.php?tab=upload`).

1. Activate GitHub Updater from the Plugin page (`/wp-admin/plugins.php`).

1. Navigate to **Settings** > **GitHub Updater** > **Install Plugin**/**Install Theme** to install your custom extensions.

   Alternatively, you can upload your plugin/theme using the same method described above for installing the GitHub Updater plugin.

Notifications within the WordPress dashboard will now include updates to your custom code. If expected updates are not found within `/wp-admin/update-core.php`, click **Check Again** to clear [transients](https://codex.wordpress.org/Transients_API), or wait for them to reset automatically.

## WP Pusher

[WP Pusher](https://wppusher.com/) provides a similar method for managing your custom code, but with some key differences. WP Pusher is free for open source code hosted in public repositories. Supporting private repositories requires you to purchase a license. Currently, update notifications are not displayed within the WordPress dashboard, but you can configure the plugin to automatically install updates on Pantheon following a push to the remote repository (e.g. GitHub, Bitbucket, or GitLab). There are no declarations required within your plugin or theme, so modifications to existing custom extensions are not required.

1. [Download WP Pusher](https://wppusher.com/). WP Pusher is free for open source code hosted in public repositories.

1. Set the Dev environment's connection mode to SFTP within the Pantheon Dashboard or via [Terminus](/terminus): `terminus connection:set <site>.<env> sftp`

1. Install the plugin by uploading the archive within the WordPress Dashboard on the Dev environment (`/wp-admin/plugin-install.php?tab=upload`).

1. Activate WP Pusher from the Plugin page (`/wp-admin/plugins.php`).

1. Navigate to **WP Pusher** > **Install Plugin**/**Install Theme** to install your custom extensions.

1. Enable the **Push-to-Deploy** option if you would like to automatically install updates on Pantheon's Dev environment upon push to the remote repository hosting your custom code. Otherwise, you can update custom plugins and themes installed via WP Pusher from **WP Pusher** > **Plugins**/**Themes** > **Update Plugin**/**Update Theme**.

### Troubleshooting

You may encounter WordPress database errors referencing the `wp_wppusher_packages` table within the `php-error.log` on the Test and Live environments, similar to the following:

```sql
[28-Mar-2016 17:57:58 UTC] WordPress database error Table 'pantheon.wp_wppusher_packages' doesn't exist for query SELECT * FROM wp_wppusher_packages WHERE type = 1 made by require_once('wp-admin/admin.php'), do_action('admin_init'), call_user_func_array, Pusher\Pusher->registerPluginActionLinks, Pusher\Storage\PluginRepository->allPusherPlugins
```

These errors occur when the expected WP Pusher database table does not exist on the environment. Deactivating and re-activating the plugin on Test and Live should resolve this error.

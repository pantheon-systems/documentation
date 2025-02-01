---
title: Pantheon Filesystem
subtitle: Troubleshooting
description: Get solutions to common filesystem troubleshooting scenarios.
tags: [cli, code, files]
contenttype: [doc]
innav: [false]
categories: [files, troubleshooting]
cms: [drupal, wordpress]
audience: [develoment]
product: [terminus]
integration: [--]
contributors: [whitneymeredith]
showtoc: true
permalink: docs/guides/filesystem/troubleshooting
---

This section provides solutions to common filesystem troubleshooting scenarios.


### Migrated WordPress sites errors

The [Pantheon WordPress upstream](https://github.com/pantheon-systems/WordPress) uses the default Media Upload path (`wp-content/uploads`). You will get errors if you use any other path.

### Simultaneous SFTP connections

Pantheon does not support simultaneous SFTP connections. Set your SFTP client to use no more than one simultaneous connection to avoid errors.

### Unable to create directory `path-to-folder`. Is the parent directory writable by the server?

Sites migrated from other hosts may have custom or absolute paths in the `Store Uploads in This Folder` configuration. This can be resolved by using the recommended configuration:

1. Go to the WordPress Admin Dashboard and go to **Settings > Media** (`/wp-admin/options-media.php`).

1. Go to **Uploading Files > Store uploads in this folder** and update the field to contain only `wp-content/uploads`.

1. Optional: Ensure that your `wp-config.php` file does not have a defined setting. For example,`define(‘UPLOADS’, ‘wp-content/myimages’);`.

### Known Limitations of File Names and Permissions

File names and permissions are set by the system and cannot be changed.

Some modules or plugins might return the following error:

```none
User notice: Key file "file:///files/private/public.key" permissions are not correct,
recommend changing to 600 or 660 instead of 770 in League\OAuth2\Server\CryptKey->__construct()
(line 59 of /code/vendor/league/oauth2-server/src/CryptKey.php)
```

Changing the file permissions to `770` from `660` via SFTP will cause a silent fail. The platform will not update the file permissions and will not return an error.

### Wipe all files from environment
Sites with overpopulated or large directories may experience difficulties deleting files from particular environments. One solution is to wipe everything in the `/files` directory from an environment, keeping the database and code intact, then selectively re-upload the `/files` that need to be kept afterwards. We highly recommend this is done via a Multidev environment for better safety of the site, available to Gold+ customers, but the Dev environment can be used if Multidev is not available.

1. Create a Multidev by going to the Multidev tab of your site, and give it a name such as "file-reset".
   1. If using Dev, make sure no unstaged commits are present.
   2. 
2. Navigate to the Database/Files tab of the Multidev, then select "Wipe"
   1. 

## More Resources

- [Configure Your wp-config.php File](/guides/php/wp-config-php)
- [Configure Your Drupal Settings.php File](/guides/php/settings-php)
- [SFTP File Uploads to Test and Live Environments](/guides/sftp/sftp-connection-info)
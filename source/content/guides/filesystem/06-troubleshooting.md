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

(if you are using Dev, we highly recommend creating a Backup before beginning)

1. Create a new Multidev
   - It does not matter which environment you select to clone information from.
2. Navigate to the Database/Files tab of the new Multidev.
3. Navigate to the "Wipe" subtab and click on **Wipe the {env} Environment**, then fill out the confirmation modal.
   - This will delete all of the environments Files and drop the Database entirely. You cannot undo this action, which is why we recommend using a Multidev.
4. Within the Multidev, navigate to Databse/Files again, then the "Clone" section.
   1. Update the "From this Environment:" field to select "Live"
   2. Uncheck "Clone Files"
   3. Keep "Clear Caches" unchecked
   4. Click the button at the bottom to begin the clone, wait for it to finish.
5. Test the fileless environment. At this point the environment should be fully functional, but have zero files associated with it.
6. At this point, you can use [SFTP + Rsync](https://docs.pantheon.io/guides/sftp/rsync-and-sftp) to upload the files you want to keep back into the Multidev. 

Pantheon Notes:
- If customers wish to do this via Live, it's likely not a good idea to wipe all files then slowly replace them. [This solution is likely better](https://docs.pantheon.io/guides/sftp/rsync-and-sftp#empty-a-folder-recursively-using-rsync).
- We should clearly define a good use case for this workflow, such as testing if files are a problem. 

## More Resources

- [Configure Your wp-config.php File](/guides/php/wp-config-php)
- [Configure Your Drupal Settings.php File](/guides/php/settings-php)
- [SFTP File Uploads to Test and Live Environments](/guides/sftp/sftp-connection-info)
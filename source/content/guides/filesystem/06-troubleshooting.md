---
title: Pantheon Filesystem
subtitle: Troubleshooting
description: Get solutions to common filesystem troubleshooting scenarios.
tags: [cli, code, files]
contenttype: [doc]
categories: [cli, database]
newcms: [drupal, wordpress]
audience: [develoment]
product: [terminus]
integration: [--]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/filesystem/troubleshooting
anchorid: troubleshooting
---

This section provides solutions to common filesystem troubleshooting scenarios.


### Migrated WordPress sites errors

The [Pantheon WordPress upstream](https://github.com/pantheon-systems/WordPress) uses the default Media Upload path (`wp-content/uploads`). You will get errors if you use any other path.

### Simultaneous SFTP Connections

Pantheon does not support simultaneous SFTP connections. To avoid errors, set your SFTP client to use no more than 1 simultaneous connection.

### Unable to create directory `path-to-folder`. Is the parent directory writable by the server?

Sites migrated from other hosts may have custom or absolute paths in the "Store Uploads in This Folder" configuration. This can be resolved by using the recommended configuration:

1. In the WordPress Admin Dashboard and go to **Settings > Media** (`/wp-admin/options-media.php`)
1. Go to **Uploading Files > Store uploads in this folder** and update the field to contain `wp-content/uploads` only.
1. Optional: Ensure there is no defined setting in `wp-config.php`, i.e., `define(‘UPLOADS’, ‘wp-content/myimages’);`.

### Known Limitations of File Names and Permissions

File names and permissions are set by the system and cannot be changed.

Some modules or plugins might return the following error:

```none
User notice: Key file "file:///files/private/public.key" permissions are not correct,
recommend changing to 600 or 660 instead of 770 in League\OAuth2\Server\CryptKey->__construct()
(line 59 of /code/vendor/league/oauth2-server/src/CryptKey.php)
```

If you try to change the file permissions to `770` from `660` via SFTP, the change will fail silently. The platform will not update the file permissions and will not return an error.

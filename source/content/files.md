---
title: Pantheon Filesystem
description: Detailed information on how to access and optimize the Pantheon filesystem.
tags: [infrastructure, sftpfiles]
categories: [platform,develop]
---

Files are large pieces of static content not stored in your database, usually images or documents, often user uploads. Because they are distinct from your site's [code](/code), they are excluded from version control via Pantheon's .gitignore files <Popover content="The [.gitignore file](https://git-scm.com/docs/gitignore) is located at the root of the site's codebase and instructs Git which paths should be ignored." />:

- [Drupal 8](https://github.com/pantheon-systems/drops-8/blob/master/.gitignore)
- [Drupal 7](https://github.com/pantheon-systems/drops-7/blob/master/.gitignore)
- [WordPress](https://github.com/pantheon-systems/WordPress/blob/master/.gitignore)

The Pantheon architecture comprises highly available [application containers](/application-containers) that are seamlessly integrated with Valhalla, our cloud-based filesystem. This means that your files are not local to the application containers running your site's codebase.

Valhalla creates a symbolic link (**symlink**), to the `files` directory at the appropriate location in your docroot (`wp-content/uploads` for WordPress and `sites/default/files` for Drupal).

It is important to note that this directory is not part of the document root and is not directly web-accessible. If you need to make a path in `files` accessible from the docroot, you need to [create an additional symbolic link](/symlinks-assumed-write-access#create-a-symbolic-link) from within the document root.  Any non-standard file locations should be symbolically linked to `/files` or moved manually.

## Access via SFTP
You can connect directly to the filesystem by copying your [connection information](/sftp#sftp-connection-information) into popular SFTP clients such as [Filezilla](/filezilla) and navigating to the `/files` directory.

## Pantheon-Related Files
When you are logged in to your application container, you may notice some files that you don't recognize. Don't worry—we put them there, and here's why:

**fusedav_version**: shows the version of fusedav being used.

**fusedav.conf**: is the client configuration file for fusedav. fusedav is software used to mount shared storage (the folder */files*) to the application container. This folder is where your content-related files (images, attachments, and other things not stored in version control) are kept. For Drupal sites, there is a symlink to it from `sites/default/files`. For WordPress sites, there is a symlink from `wp-content/uploads`.

**htpasswd**: is used when you want to lock your environment with a username and password. There is a Public button on each environment Dashboard that you can click to add a username and password to your site. This will keep your site hidden while you're working on it.


## Troubleshooting

### Migrated WordPress sites errors

The [Pantheon WordPress upstream](https://github.com/pantheon-systems/WordPress) uses the default Media Upload path (`wp-content/uploads`). Using any other path will result in errors.

### Simultaneous SFTP Connections

Pantheon does not support simultaneous SFTP connections. To avoid errors, set your SFTP client to use no more than 1 simultaneous conection.

### Unable to create directory `path-to-folder`. Is the parent directory writable by the server?

Sites migrated from other hosts may have custom or absolute paths in the "Store Uploads in This Folder" configuration. This can be resolved by using the recommended configuration:

1. In the WordPress Admin Dashboard and go to **Settings > Media** (`/wp-admin/options-media.php`)
2. Go to **Uploading Files > Store uploads in this folder** and update the field to contain `wp-content/uploads` only.
3. Optional: Ensure there is no defined setting in `wp-config.php` i.e.; `define(‘UPLOADS’, ‘wp-content/myimages’);`.

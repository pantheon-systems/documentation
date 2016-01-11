---
files: true
layout: landing
use:
    - files
title: Pantheon Filesystem
description: Detailed information on how to access and optimize the Pantheon filesystem.
keywords: code, commit, sftp, files, filesystem, file location, directory location, directory, codebase
---
Files are user uploads, usually images or documents. They are excluded from version control via Pantheon's .gitignore files:

- [Drupal 7](https://github.com/pantheon-systems/drops-7/blob/master/.gitignore)
- [WordPress](https://github.com/pantheon-systems/WordPress/blob/master/.gitignore)

The Pantheon architecture is comprised of highly available [application containers](/docs/articles/sites/all-about-application-containers/) that are seamlessly integrated with Valhalla, our cloud-based filesystem. This means that your files are not local to the application containers running your site's codebase.

Valhalla symbolically links the `wp-content/uploads` directory for WordPress and the `sites/default/files` directory for Drupal within the `/files` directory. Any [non-standard file locations](/docs/articles/sites/files/non-standard-files-locations/) should be symbolically linked to `/files` or moved manually.

## Access via SFTP
You can connect directly to the filesystem by copying your [connection information](/docs/articles/sites/code/developing-directly-with-sftp-mode#sftp-connection-information) into popular SFTP clients such as [Filezilla](/docs/articles/local/filezilla/) and navigating to the `/files` directory.

## Pantheon-Related Files
When you are logged in to your application server, you may notice some files that you don't recognize. Don't worry—we put them there, and here's why:

**fusedav_version**: shows the version of fusedav being used.

**fusedav.conf**: is the client configuration file for fusedav. fusedav is software used to mount shared storage (the folder */files*) to the application server. This folder is where your content-related files (images, attachments, and other things not stored in version control) are kept. For Drupal sites, there is a symlink to it from `sites/default/files`. For WordPress sites, there is a symlink from `wp-content/uploads`.

**htpasswd**: is used when you want to lock your environment with a username and password. There is a Public button on each environment Dashboard that you can click to add a username and password to your site. This will keep your site hidden while you're working on it.

## Troubleshooting

- [Drupal Filesystem Writeable Error](/docs/articles/sites/files/filesystem-faqs/)

---
title: Pantheon Filesystem
description: Learn how to work with the Pantheon filesystem.
keywords: code, commit, sftp, files, filesystem, file location, directory location, directory, codebase
---
Files are user uploads, usually images or documents. They are excluded from version control via Pantheon's .gitignore files:

- [Drupal 7](https://github.com/pantheon-systems/drops-7/blob/master/.gitignore)
- [WordPress](https://github.com/pantheon-systems/WordPress/blob/master/.gitignore)

The Pantheon architecture is comprised of highly available [application containers](/docs/articles/architecture/all-about-application-containers/) that are seamlessly integrated with Valhalla, our cloud-based filesystem. This means that your files are not local to the application containers running your site's codebase.

Valhalla symbolically links the `wp-content/uploads` directory for WordPress and the `sites/default/files` directory for Drupal within the `/files` directory. Any [non-standard file locations](/docs/articles/sites/files/non-standard-files-locations/) should be symbolically linked to `/files` or moved manually.

## Access via SFTP
While in SFTP mode, you can use framework admin tools (e.g. WordPress dashboard or Drupal's update manager) as well as command line tools for managing files.

You can connect directly to the filesystem by copying your [connection information](/docs/articles/sites/code/developing-directly-with-sftp-mode/#sftp-connection-information) into popular SFTP clients such as [Filezilla](/docs/articles/local/filezilla/) and navigating to the `/files` directory.
## Troubleshooting

- [Drupal Filesystem Writeable Error](/docs/articles/sites/files/filesystem-faqs/)

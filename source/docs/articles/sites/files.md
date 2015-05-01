---
title: Pantheon Filesystem
description: Learn how to work with the Pantheon filesystem.
keywords: code, commit, sftp, files, filesystem, file location, directory location, directory, codebase
---
The Pantheon architecture is comprised of highly available [application containers](/docs/articles/architecture/all-about-application-containers/) that are seamlessly integrated with our cloud-based filesystem, Valhalla.

Valhalla symbolically links the `wp-content/uploads` directory for WordPress and the `sites/default/files` directory for Drupal within the `files/` directory. Any [non-standard file directories](/docs/articles/sites/files/non-standard-files-locations/) should be symbolically linked to `/files` or manually moved.

## Manage Files on Valhalla
Interacting with your files on Pantheon can be done via Git or SFTP. The site's [connection mode](/docs/articles/sites/code/developing-directly-with-sftp-mode) must be set appropriately.

### SFTP Mode
While in SFTP mode, you can use framework admin tools (e.g. WordPress dashboard or Drupal's update manager) as well as command line tools for managing code.

Copy your [connection information](/docs/articles/sites/code/developing-directly-with-sftp-mode/#sftp-connection-information) to use popular SFTP clients such as [Filezilla](/docs/articles/local/filezilla/) to access and interact with your site's files.
### Git Mode
Git Mode is likely the best way to work with files on Pantheon for those who prefer to develop locally. This connection mode allows you to commit, push, and deploy local changes to Pantheon.

[Clone your site](/docs/articles/local/starting-with-git/#step-1-go-to-your-site-dashboard) codebase and use symbolic links for [non-standard file directories](/docs/articles/sites/files/non-standard-files-locations/).

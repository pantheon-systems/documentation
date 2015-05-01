---
title: Pantheon Filesystem
description: Learn how to work with the Pantheon filesystem.
keywords: code, commit, sftp, files, filesystem, file location, directory location, directory, codebase
---
The Pantheon architecture is comprised of highly available [application containers](/docs/articles/architecture/all-about-application-containers/) that are seamlessly integrated with Valhalla, our cloud-based filesystem.

Valhalla symbolically links the `wp-content/uploads` directory for WordPress and the `sites/default/files` directory for Drupal within the `files/` directory. Any [non-standard file locations](/docs/articles/sites/files/non-standard-files-locations/) should be symbolically linked to `/files` or manually moved.

## Troubleshooting

- [Filesystem Writeable Error](/docs/articles/sites/files/filesystem-faqs/)

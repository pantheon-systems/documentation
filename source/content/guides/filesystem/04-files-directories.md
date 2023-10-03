---
title: Pantheon Filesystem
subtitle: Files and Directories
description: Learn more about file and directory considerations on the Pantheon platform.
contenttype: [guide]
innav: [false]
categories: [files]
cms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [files, libraries, security, webops]
contributors: [whitneymeredith]
showtoc: true
permalink: docs/guides/filesystem/files-directories
---

This section provides information on files and directories on the Pantheon platform.

## Rename/Move Files or Directories

### Directories

You cannot rename or move file directories on Pantheon's file serving infrastructure. The workaround is to:

1. Create a new directory, then copy all the files from inside the old directory into the new directory.

1. Delete the old directory.

### Files

Files on Pantheon cannot be renamed or moved, similar to file directories. Our [SFTP mode](/guides/sftp) doesn’t support the `mv` command, which is what most apps use when renaming or moving files. The workaround is to:

1. Delete the old file(s).

1. Upload the newly renamed file to the desired directory, or upload a file with same name to a different directory.

## Static Files

Pantheon strips cookies for files with common static file extensions. Refer to [File Suffixes and Cookies](/caching-advanced-topics#file-suffixes-and-cookies) in our [Caching: Advanced Topics](/caching-advanced-topics) documentation for more information.

## Write Access on Environments

Your entire codebase is writable in your Dev environment when you're in SFTP mode. However, the platform is designed to keep only the codebase under version control. This means that the only writable paths are:

- Drupal: `sites/default/files`
- WordPress: `wp-content/uploads`

You must add a symlink to modules or plugins that require the ability to assume write access and write to the codebase. This allows the module or plugin to write to the file system. Refer to [Using Extensions That Assume Write Access](/symlinks-assumed-write-access) for more information.

## More Resources

- [Site Level Roles and Permissions](/guides/account-mgmt/workspace-sites-teams/teams#site-level-roles-and-permissions)
- [Symlinks and Assumed Write Access](/symlinks-assumed-write-access)
- [Temporary File Management](/guides/filesystem/tmp)

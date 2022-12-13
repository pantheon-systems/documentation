---
title: Pantheon Filesystem
subtitle: Introduction
description: Learn more about Pantheon's Filesystem.
contenttype: [guide]
contributors: [whitneymeredith]
layout: guide
showtoc: true
categories: [--]
newcms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [code, files]
reviewed: "2021-07-14"
permalink: docs/guides/filesystem/
anchorid: files
---

Files are static content not stored in your database, and usually consist of images, documents, or user uploads. Files are distinct from your site's [code](/code), and are excluded from version control via Pantheon's `.gitignore` files <Popover content="The <a class='external' href='https://git-scm.com/docs/gitignore'>.gitignore file</a> is located at the root of the site's codebase and instructs Git on which paths to ignore." />:

- [Drupal 7](https://github.com/pantheon-systems/drops-7/blob/master/.gitignore)
- [WordPress](https://github.com/pantheon-systems/WordPress/blob/default/.gitignore)

The Pantheon architecture relies on highly available [application containers](/application-containers) that are seamlessly integrated with Valhalla, our cloud-based filesystem. This means that your files are not local to the application containers running your site's codebase.

Valhalla creates a symbolic link (**symlink**) to the `files` directory in the appropriate location of your docroot:

- **WordPress:** `wp-content/uploads`
- **Drupal:** `sites/default/files`

It is important to note that this directory is not part of the document root and is not directly web-accessible. You must [create an additional symbolic link](/symlinks-assumed-write-access#create-a-symbolic-link) from within the document root if you need to make a path in `files` accessible from the docroot. Non-standard file locations must be symbolically linked to `/files` or moved manually.

## Access via SFTP

You can connect directly to the filesystem.

1. Copy your [connection information](/sftp#sftp-connection-information) into popular SFTP clients such as [WinSCP](/winscp).

1. Navigate to the `/files` directory within the SFTP client.

## Pantheon-Related Files

You may notice some files that you don't recognize when you are logged in to your application container. Pantheon put these files there because they contain important information:

**fusedav_version**: shows the version of fusedav being used.

**fusedav.conf**: is the client configuration file for fusedav. fusedav is software used to mount shared storage (the folder */files*) to the application container. This folder is where your content-related files (images, attachments, and other things not stored in version control) are kept. For Drupal sites, there is a symlink to it from `sites/default/files`. For WordPress sites, there is a symlink from `wp-content/uploads`.

**htpasswd**: is used when you want to lock your environment with a username and password. There is a Public button on each environment Dashboard that you can click to add a username and password to your site. This will keep your site hidden while you're working on it.

## More Resources

- [Lock Environments with the Dashboard Security Tool](/guides/secure-development/security-tool)
- [Private Paths for Files and Code](/guides/secure-development/private-paths)
- [SFTP on Pantheon](guide link here)
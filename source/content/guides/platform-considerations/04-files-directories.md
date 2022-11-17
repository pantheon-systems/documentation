---
title: Platform Considerations
subtitle: Platform Files and Directories
description: Learn more about file and directory considerations on the Pantheon platform.
categories: [platform]
tags: [files, libraries, security, webops]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/platform-considerations/files-directories
anchorid: files-directories
---

This section provides information on files, including uploads and exports, and directories on the Pantheon platform.

## Batch Uploads

The [max execution time](/timeouts/#user-configurable-timeouts) for PHP scripts on the platform is 120 seconds. Batch uploads, like one might see importing products with [WooCommerce](https://wordpress.org/plugins/woocommerce), can encounter this limit.

In this or similar instances, consider performing larger operations locally, then importing the code, files, and database to the Pantheon platform.

## Batched Data Export to File

It is difficult to batch export data to a file in Test and Live environments on plans with multiple application containers. Many contrib plugins and modules are not designed to support multiple application containers. It might be possible to get data export working, but that may require additional effort and custom code.

Modules and plugins often do this type of batch export by continuously appending data to the same file in each request in the batch process. With multiple application containers, the result is that several containers will attempt to add data to the same file at once, while simultaneously syncing their own version of the updated file to other appservers and receiving updates from other application containers. The exported data will likely be incomplete.

A non-batched export of a dataset small enough to complete within the set timeout for web requests will likely work.

### Potential Workarounds

1. Have each request in the data export write to its own `tmp` file, then concatenate these at the end. This solution requires that the [Persistent Temporary Path Workaround](/tmp/#persistent-temporary-path-workaround) is in place.

1. Do small batches and add enough time between each request in the batch process to allow the updated file to be synced between all application containers.

### Alternative Approaches

You can run the export from the command line using tools like [Terminus](/terminus), [Drush](/guides/drush), [WP-CLI](/guides/wp-cli) and cron, which will produce a better result. Larger data sets can be exported, as command line processes have longer timeouts than HTTP requests. Refer to [Timeouts on Pantheon](/timeouts) for more information. You won't need to batch your export, which allows it to run to completion on a single application container.

The best solution is often to implement data exports as a web service, incrementally exchanging the data with the target system.

## Highly Populated Directories

You might need to refactor your file structure if you have individual directories with tens of thousands of files (for example, an image repository) to see good performance on Pantheon.

The danger zone begins at around 50,000 files in a single directory, and performance drops off suddenly at over 100,000 files.

Drupal is capable of managing uploaded content into different directories based on the date or user, which is preferable to dumping all uploads into a single place. Refactoring an existing large-scale site with this issue is usually simply a matter of re-arranging the files and then updating the files table in Drupal.

Refer to the [File (field) Paths](https://www.drupal.org/project/filefield_paths) module to help resolve issues with highly populated directories.

## Large Code Repository

A code repo larger than 2GB increases the possibility of Git errors when committing code on Pantheon. We suggest keeping multimedia assets out of the repo by moving them to a media file storage service such as [Amazon S3](https://aws.amazon.com/s3/), and using version control to track URLs. 

[Pruning and optimizing your repo](/reducing-large-repos) can be useful if your repository has grown to over 2GB and is causing problems (such as errors when cloning).

## Large Files

The [Pantheon Filesystem](/files) and file serving infrastructure is not optimized to store and deliver very large files. Files over 100MB cannot be uploaded through WordPress or Drupal, and must be added by [SFTP or rsync](/rsync-and-sftp). Files over 256MB will fail no matter how they are uploaded. Transfers with files over 50MB will experience noticeable degradation in performance.

| File Size     | Platform Compatibility               | Notes                               |
|:--------------|--------------------------------------|-------------------------------------|
| ≤ 100MB       | <span  style="color:green">✔</span>  | Can be uploaded via any means       |
| 100MB - 256MB | <span  style="color:orange">✔</span> | Must be uploaded over SFTP or rsync |
| > 256MB       | <span  style="color:red">❌</span>    | Must be hosted via 3rd-party CDN    |

If you are distributing large binaries or hosting big media files, we recommend using a CDN like Amazon S3 as a cost-effective file serving solution that allows uploads directly to S3 from your site without using Pantheon as an intermediary.

- Drupal sites can use a module such as [S3 File System](https://www.drupal.org/project/s3fs).
- WordPress sites can use plugins such as [S3 Uploads](https://github.com/humanmade/S3-Uploads) or [WP Offload Media](https://deliciousbrains.com/wp-offload-media/).

You cannot upload files over 100MB through the CMS even when using an external CDN to host files. You can upload these files directly to the CDN. Refer to Amazon's documentation for [uploading to an S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/upload-objects.html) for more information.

You can also refer to our documentation for [Drupal](/drupal-s3) and [WordPress](/wordpress-s3) for more information about integrating S3 with your Pantheon site.

### Upload Speed

Uploading large files over a slow local internet connection can cause the process to hit our [Connection Timeout](/timeouts/#timeouts-that-are-not-configurable) of 59 seconds. For example, a 10MB file uploaded on a 2Mbps connection may take too long and fail. You can use an upload time calculator like [this one](https://downloadtimecalculator.com/Upload-Time-Calculator.html) to help determine if your local internet connection is impeding file uploads to Pantheon.

## Large (>100GB) File Backups

Large backups take longer, use more resources, and have a higher likelihood of failing. Additionally, a 100GB compressed tarball is in itself not particularly convenient for anyone. For this reason, scheduled backups do not backup files for sites with footprints over 200GB (although code and database are backed-up as normal). Despite the lack of backups, file content is highly durable and stored on multiple servers.

## Rename/Move Files or Directories

### Directories

File directories on Pantheon's file serving infrastructure cannot be moved or renamed. The workaround is to:

1. Create a new directory, and then move all the files from inside the old directory into the new directory.

1. Delete the old directory.

### Files

Files on Pantheon cannot be renamed or moved, similar to file directories. Our SFTP mode doesn’t support the `mv` command, which is what most apps use when renaming or moving files. The workaround is to:

1. Delete the old file(s).

1. Upload the newly renamed file to the desired directory, or upload a file with same name to a different directory.

## Static Files

Pantheon strips cookies for files with common static file extensions. See [File Suffixes and Cookies](/caching-advanced-topics#file-suffixes-and-cookies) in our [Caching: Advanced Topics](/caching-advanced-topics) documentation for more information.

## Write Access on Environments

The entire codebase is writable in Dev environments in SFTP mode. However the platform is designed to keep only the codebase under version control. This means that the only writable paths are `sites/default/files` for Drupal sites and `wp-content/uploads` for WordPress sites.

You must add a symlink to modules/plugins that require the ability to write to the codebase (and assume write access). This allows the module/plugin to instead write to the file system. Refer to [Using Extensions That Assume Write Access](/symlinks-assumed-write-access) for more information.

## More Resources

- [Site Level Roles and Permissions](/guides/account-mgmt/workspace-sites-teams/teams#site-level-roles-and-permissions)

- [Symlinks and Assumed Write Access](/symlinks-assumed-write-access)

- [Temporary File Management](/tmp)
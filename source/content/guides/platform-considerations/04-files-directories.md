---
title: Platform Considerations
subtitle: Platform Files and Directories
description: Learn more about Pantheon platform file and directory considerations.
categories: [platform]
tags: [files, libraries, security, webops]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/platform-considerations/files-directories
anchorid: files-directories
---







## Batch Uploads

The [max execution time](/timeouts/#user-configurable-timeouts) for PHP scripts on the platform is 120 seconds. Batch uploads, like one might see importing products with [WooCommerce](https://wordpress.org/plugins/woocommerce) can encounter this limit.

In this or similar instances, consider performing larger operations locally, then importing the code, files, and database back up to the platform.

## Batched Data Export to File

In Test and Live environments on plans with multiple application containers, it is difficult to batch export data to a file. Many contrib plugins and modules are not designed to support multiple application containers. It might be possible to get data export working, but that may require additional effort and custom code.

Often, modules and plugins do this type of batch export by continuously appending data to the same file in each request in the batch process. With multiple application containers, the result is that several containers will attempt to add data to the same file at once, while simultaneously syncing their own version of the updated file to other appservers and receiving updates from other application containers. The exported data will likely be incomplete.

A non-batched export of a dataset small enough to complete within the set timeout for web requests will likely work.

### Potential Workarounds

1. Have each request in the data export write to its own `tmp` file, then concatenate these at the end. This solution requires that the [Persistent Temporary Path Workaround](/tmp/#persistent-temporary-path-workaround) is in place.

1. Do small batches and add enough time between each request in the batch process to allow the updated file to be synced between all application containers.

### Alternative Approaches

Running the export from the command line using tools like [Terminus](/terminus), [Drush](/drush), [WP-CLI](/wp-cli) and cron will produce a better result. Larger data sets can be exported, as command line processes have longer timeouts than HTTP requests. For more details, see [Timeouts on Pantheon](/timeouts). The export won't need to be batched and can therefore run to completion on a single application container.

Often, the best solution is to implement data exports as a web service, incrementally exchanging the data with the target system.

## Highly Populated Directories

If you have individual directories with tens of thousands of files (e.g. an image repository) it may be necessary to refactor this file structure to see good performance on Pantheon. The danger zone begins at around 50,000 files in a single directory, and performance drops off suddenly at over 100,000 files.

Drupal itself is capable of managing uploaded content into different directories based on the date or user, which is preferable to dumping all uploads into a single place. Refactoring an existing large-scale site with this issue is usually simply a matter of re-arranging the files and then updating the files table in Drupal.

Consider the [File (field) Paths](https://www.drupal.org/project/filefield_paths) module to help resolve issues with highly populated directories.


## Large Code Repository

When a code repo is larger than 2GB, it increases the possibility of Git errors when committing code on Pantheon. We suggest keeping multimedia assets out of the repo by moving them to a media file storage service such as [Amazon S3](https://aws.amazon.com/s3/), and using version control to track URLs. 

If your repository has grown over 2GB and is causing problems (such as errors when cloning), consider [pruning and optimizing the repo](/reducing-large-repos).

## Large Files

Due to the configuration of the [Pantheon Filesystem](/files), Pantheon's file serving infrastructure is not optimized to store and deliver very large files. Files over 100MB cannot be uploaded through WordPress or Drupal, and must be added by [SFTP or rsync](/rsync-and-sftp). Files over 256MB will fail no matter how they are uploaded. Transfers with files over 50MB will experience noticeable degradation in performance.

| File Size     | Platform Compatibility               | Notes                               |
|:--------------|--------------------------------------|-------------------------------------|
| ≤ 100MB       | <span  style="color:green">✔</span>  | Can be uploaded via any means       |
| 100MB - 256MB | <span  style="color:orange">✔</span> | Must be uploaded over SFTP or rsync |
| > 256MB       | <span  style="color:red">❌</span>    | Must be hosted via 3rd-party CDN    |

If you are distributing large binaries or hosting big media files, we recommend using a CDN like Amazon S3 as a cost-effective file serving solution that allows uploads directly to S3 from your site without using Pantheon as an intermediary.

- Drupal sites can use a module such as [S3 File System](https://www.drupal.org/project/s3fs).
- WordPress sites can use plugins such as [S3 Uploads](https://github.com/humanmade/S3-Uploads) or [WP Offload Media](https://deliciousbrains.com/wp-offload-media/).

Be aware, even when using an external CDN to host files, you cannot upload files over 100MB through the CMS. Upload these files directly to the CDN (here's Amazon's documentation for [uploading to an S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/upload-objects.html)).

See our documentation for [Drupal](/drupal-s3) and [WordPress](/wordpress-s3) for more information about integrating S3 with your Pantheon site.

### Upload Speed

Uploading large files over a slow local internet connection can cause the process to hit our [Connection Timeout](/timeouts/#timeouts-that-are-not-configurable) of 59 seconds. For example, a 10MB file uploaded on a 2Mbps connection may take too long and fail. You can use an upload time calculator like [this one](https://downloadtimecalculator.com/Upload-Time-Calculator.html) to help determine if your local internet connection is impeding file uploads to Pantheon.

## Large (>100GB) File Backups

Large backups take longer, use more resources, and have a higher likelihood of failing. Additionally, a 100GB compressed tarball is in itself not particularly convenient for anyone. For this reason, scheduled backups do not backup files for sites with footprints over 200GB (although code and database are backed-up as normal). Despite the lack of backups, file content is highly durable and stored on multiple servers.

## Rename/Move Files or Directories

### Files

Like file directories, files on Pantheon cannot be renamed or moved. Our SFTP mode doesn’t support the `mv` command, which is what most apps use when renaming or moving files. The workaround is to delete the old file and upload the new file.

### Directories

File directories on Pantheon's file serving infrastructure cannot be moved or renamed. The workaround is to create a new directory, move all the files from inside the old directory into the new one, and delete the old directory.

## Static Files

Pantheon strips cookies for files with common static file extensions. See [File Suffixes and Cookies](/caching-advanced-topics#file-suffixes-and-cookies) in our [Caching: Advanced Topics](/caching-advanced-topics) doc for more information.

## Write Access on Environments

For Dev environments in SFTP mode, the entire codebase is writable. However the platform is designed to keep only the codebase under version control.  This means that the only writable paths are `sites/default/files` for Drupal sites and `wp-content/uploads` for WordPress sites.

Any modules for Drupal or plugins for WordPress that need to write to the codebase (and assume write access) need a symlink added so that they will instead write to the file system. For more information, read [Using Extensions That Assume Write Access](/symlinks-assumed-write-access).

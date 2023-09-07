---
title: Pantheon Filesystem
subtitle: Large Files and Highly Populated Directories
description: Learn more about highly populated directories and large files.
contenttype: [guide]
contributors: [whitneymeredith]
showtoc: true
innav: [false]
categories: [files]
cms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [code, files]
reviewed: "2021-07-14"
permalink: docs/guides/filesystem/large-files
---

This section provides information on highly populated directories and large file management.

## Highly Populated Directories

Highly populated directories can cause a small decline in performance at around 50,000 files in a single directory, and a significant performance drop at over 100,000 files.

You can refactor your file structure if you have individual directories with tens of thousands of files (for example, an image repository) to optimize site performance on Pantheon.

Drupal, for example, can manage uploaded content into different directories based on the date or user, which is preferable to dumping all uploads into a single directory. Refactoring an existing large-scale site with this issue is usually a matter of re-arranging the files, then updating the files table in Drupal.

Refer to the [File (field) Paths](https://www.drupal.org/project/filefield_paths) module to help resolve issues with highly populated directories in Drupal, or browse [WordPress plugins](https://wordpress.org/plugins/) for a solution.

## Large Code Repository

A code repository larger than 2GB increases the possibility of Git errors when committing code on Pantheon. Review the options below to improve performance:

- Keep multimedia assets out of the repository by moving files to a media file storage service, such as [Amazon S3](https://aws.amazon.com/s3/), and using version control to track URLs.
- [Reduce the size of your repository](/guides/git/troubleshooting#reduce-large-repositories) if it is over 2GB and is causing problems (such as errors when cloning).

## Large Files

The [Pantheon Filesystem](/guides/filesystem) and file serving infrastructure is not optimized to store and deliver large files.

### Large File Restrictions

- **Files over 50MiB** can be uploaded with WordPress, Drupal, or SFTP. You will experience noticeable degradation in performance.
- **Files over 100MiB** cannot be uploaded through WordPress or Drupal. You must add files of this size by [SFTP or rsync](/guides/sftp/rsync-and-sftp).
- **Files over 256MiB** are not supported and cannot be stored on the Pantheon Filesystem.

| File Size       | Platform Compatibility               | Notes                               |
|:----------------|--------------------------------------|-------------------------------------|
| ≤ 100MiB        | <span  style="color:green">✔</span>  | Can be uploaded via any means       |
| 100MiB - 256MiB | <span  style="color:orange">✔</span> | Must be uploaded over SFTP or rsync |
| > 256MiB        | <span  style="color:red">❌</span>    | Must be hosted via 3rd-party CDN    |

### CDNs

We recommend using a CDN like Amazon S3 as a cost-effective file serving solution that allows uploads directly to S3 from your site without using Pantheon as an intermediary if you are distributing large binaries or hosting big media files.

- Drupal sites can use a module such as [S3 File System](https://www.drupal.org/project/s3fs).
- WordPress sites can use plugins such as [S3 Uploads](https://github.com/humanmade/S3-Uploads) or [WP Offload Media](https://deliciousbrains.com/wp-offload-media/).

You cannot upload files over 100MiB through the CMS even when using an external CDN to host files. You can upload these files directly to the CDN. Refer to Amazon's documentation for [uploading to an S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/upload-objects.html) for more information.

You can also refer to our documentation for [Drupal](/drupal-s3) and [WordPress](/guides/wordpress-developer/wordpress-s3) for more information about integrating S3 with your Pantheon site.

### Upload Speed

Uploading large files over a slow local internet connection can cause the process to hit our [Connection Timeout](/timeouts/#timeouts-that-are-not-configurable) of 59 seconds. For example, a 10MiB file uploaded on a 2Mbps connection may take too long and fail. You can use an upload time calculator like [this one](https://downloadtimecalculator.com/Upload-Time-Calculator.html) to help determine if your local internet connection is impeding file uploads to Pantheon.

### Media and Email

Refer to the [Media and Email](/guides/platform-considerations/media-email-support) section of the [Platform Considerations](/guides/platform-considerations) guide for more information on support for large media and email files.

## Large (>100GiB) File Backups

Large backups take longer, use more resources, and have a higher likelihood of failing. A 100GiB compressed tarball is not a convenient solution. Sites with footprints over 200GiB or two million files cannot be backed up for this reason (although code and database are backed up as normal).

Despite the lack of backups, file content is highly durable and stored on multiple servers.

## More Resources

- [All About Application Containers](/application-containers)
- [Integrate Your Fastly Account on Pantheon with Amazon S3](/guides/fastly-pantheon/fastly-amazon-s3)
- [Platform Considerations](/guides/platform-considerations)

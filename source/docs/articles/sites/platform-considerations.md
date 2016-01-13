---
title: Platform Considerations
description: A list of the Pantheon platform considerations.
keywords: known limitations, multisite, applications, use more than one application, large directories, inodes, streaming media, large file, ip based, ip based security, ip based security systems, pantheon limitations, php short tags, short tags, nginx.conf
---
This page is used to keep track of common platform considerations, mostly derived from Pantheon's distributed nature. Check back often, as we are keeping it up to date as we make improvements to address these limitations.

## Multisite

Pantheon supports designated use cases for [WordPress Site Networks](/docs/articles/wordpress/site-networks) created by WordPress' Multisite feature.

We do not support [Drupal Multisite](http://drupal.org/documentation/install/multi-site). See blog posts: [Why Drupal Multisite is not Enterprise Grade](https://pantheon.io/blog/why-drupal-multisite-not-enterprise-grade) and [Much Ado About Drupal Multisite](https://pantheon.io/blog/much-ado-about-drupal-multisite).

## One Application per Site

Each site supports a single Drupal or WordPress application. Placing a WordPress application to behave as the blog for a Drupal site, for example, is unsupported.

## Highly Populated Directories

If you have individual directories with tens of thousands of files (e.g. an image repository) it may be necessary to refactor this file structure to see good performance on Pantheon. The danger zone begins at around 50,000 files in a single directory, and performance drops off suddenly at over 100,000 files.

Drupal itself is capable of managing uploaded content into different directories based on the date or user, which is preferable to dumping all uploads into a single place. Refactoring an existing large-scale site with this issue is usually simply a matter of re-arranging the files and then updating the files table in Drupal.

## Email and Deliverability

Because of the cloud-based nature of Pantheon's infrastructure, we cannot ensure high-deliverability email originating from your Application Containers, as they have no fixed location. While all sites have access to a local Postfix service for testing and development, we recommend using an external SMTP gateway (SendGrid, for example) in production to ensure that your email is delivered.

See [the email documentation](/docs/articles/sites/code/email) for more details and suggestions.

## Streaming Media

Streaming media on Pantheon is not supported. Pantheon does not provide FFMPEG or other media libraries, and our edge caching system is currently not optimized for streaming files.

However, you can run a great streaming media website. It's recommended that you find a more suitable host for the actual streaming, whether that's YouTube, Brightcove, or another provider.

## Large Files

Pantheon's file serving infrastructure is not optimized to store and deliver very large files. The bigger the file, the slower the transfer. Files over 50MB will experience a noticeable performance degradation due to our caching infrastructure configuration.

Pantheon cannot be used to host files over 256MB, no matter how the file is uploaded.

If you are distributing large binaries or hosting big media files, we recommend using a CDN like Amazon S3 as a cost-effective file serving solution. Modules such as [Amazon S3 CORS Upload](https://drupal.org/project/amazons3_cors) allow uploads directly to S3 from your Drupal site without using Pantheon as an intermediary.

## Large Code Repository

When a code repo is larger than 2GB, it increases the possibility of Git errors when committing code on Pantheon. We suggest keeping multimedia assets out of the repo by moving them to a media file storage service such as [Amazon S3](https://aws.amazon.com/s3/), and using version control to track URLs.

## Rename/Move Files or Directories

### Files

Like file directories, files on Pantheon cannot be renamed or moved. Our SFTP mode doesn’t support the `mv` command, which is what most apps use when renaming or moving files. The workaround is to delete the old file and upload the new file.

### Directories
File directories on Pantheon's file serving infrastructure cannot be moved or renamed. The workaround is to create a new directory, move all the files from inside the old directory into the new one, and delete the old directory.


## IP-Address Based Security Schemes
IP-based security is not recommended on Pantheon - or any cloud platform because the actual IP address where code executes from can change as application containers are migrated throughout the infrastructure.

For more information, see [Dynamic Outgoing IP Addresses](/docs/articles/sites/code/dynamic-outgoing-ip-addresses).

## Maintenance Mode

Pantheon may send a <a href="/docs/articles/sites/errors-and-server-responses#pantheon-503-target-in-maintenance" data-proofer-ignore>generic Maintenance Mode message</a> during platform problems; this message cannot be customized.

Built-in Maintenance Mode for both Drupal and WordPress sites can be customized; clear caches when toggling.

## Server Side Includes (SSI)

Pantheon does not and will not support Server Side Includes. We recommend converting those to use PHP includes.

## PHP Short Tags

PHP short tags (`<? ... ?>`) are not supported on Pantheon. The [PHP Manual](http://www.php.net/manual/en/language.basic-syntax.phpmode.php) recommends not utilizing short tags because they are not supported on every server. Additionally, using short tags can interfere with embedding PHP in XML. Avoiding their use leads to more portable, re-distributable code.

## CORS

For sites that need to provide services with Cross-Origin Resource Sharing (CORS), adding the proper header should enable the resource. See  [http://enable-cors.org/server\_php.html](http://enable-cors.org/server_php.html)

Sites that consume services using CORS, such as Amazon S3 CORS, do work on Pantheon.

## Large (>100GB) File Backups

Large backups take longer, use more resources, and have a higher likelihood of failing.  Additionally, a 100GB tarball is in itself not particularly convenient for anyone.  For this reason, scheduled backups do not backup files for sites with footprints over 200GB (although code and database are backed-up as normal).  Despite the lack of backups, file content is highly durable and stored on multiple servers.

## CSS Preprocessors

Pantheon does not currently support LESS or Sass/Compass CSS preprocessor languages. LESS and Sass will need to be pre-compiled to make traditional CSS stylesheets before being pushed to the platform.

## nginx.conf

Pantheon does not currently support modifying the nginx.conf per site, as we run a highly tuned universal configuration file.  All of the containers run a standard profile, and we have opted to keep this configuration to keep the nginx.conf lean.

## Oracle Database Drivers

Pantheon does not currently support directly connecting to Oracle databases. Customers have successfully used the [Pantheon Enterprise Gateway](https://pantheon.io/features/secure-integration) to connect to an external API on top of their Oracle databases.


## PHP/Java Bridge

Pantheon does not currently support the [PHP/Java Bridge](http://php-java-bridge.sourceforge.net/pjb/).

## General PHP Framework Support

Pantheon does not currently support any PHP frameworks outside of Drupal and WordPress. The platform is only optimized for Drupal or Wordpress and no others. Although PHP will run, we can not assist you in getting the non-approved frameworks running in any way.

## Unsupported Drupal Modules and WordPress Plugins
See [Unsupported Modules and Plugins](/docs/articles/sites/code/unsupported-modules-plugins) for an up-to-date list of modules and plugins that do not work with or are not supported by Pantheon.

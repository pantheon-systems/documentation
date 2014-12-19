---
title: Drupal Known Limitations
description: A list of Pantheon's known limitations.
category:
  - drupal

---

No platform is perfect, and Pantheon is no exception. This page is used to keep track of the common/known limitations know about. Most of Pantheon's limitations stem from its distributed nature. Check back, as we are keeping it up to date as we improve pantheon to address these limitations.

## Multisite

We do not support [multisite](http://drupal.org/documentation/install/multi-site). For a more in-depth explanation, see our blog post [Much Ado About Drupal Multisite](https://www.getpantheon.com/blog/much-ado-about-drupal-multisite).

## Highly Populated Directories

If you have individual directories with tens of thousands of files (e.g. an image repository) it may be necessary to refactor this file structure to see good performance on Pantheon. The danger zone begins at around 50,000 files/directory, and performance drops off suddenly at over 100,000 files/directory.

Drupal itself is capable of managing uploaded content into different directories based on the date or user, which is preferable to dumping all uploads into a single place. Refactoring an existing large-scale site with this issue is usually simply a matter of re-arranging the files and then updating the files table in Drupal.

## Email and Deliverability

Because of the cloud-based nature of Pantheon's infrastructure, we cannot ensure high-deliverability email originating from your DROPs, as they have no fixed location. While all sites have access to a local Postfix service for testing and development, we recommend using an external SMTP gateway (SendGrid, for example) in production to ensure that your email is delivered.

See [the email documentation](/articles/sites/code/email), for more details and suggestions.

## Streaming Media

Streaming media on Pantheon is not supported. Pantheon does not provide FFMPEG or other media libraries, and our edge caching system is currently not optimized for streaming files.

However, you can run a great streaming media website. It's recommended that you find a more suitable host for the actual streaming, whether that's YouTube, Brightcove, or another provider.

## Large Files

Pantheon's file serving infrastructure is not optimized to store and deliver very large files. The bigger the file, the slower the transfer. Files over 50MB will experience a noticeable performance degradation due to our caching infrastructure configuration.

Pantheon cannot be used to host files over 256MB, no matter how the file is uploaded.

If you are distributing large binaries or hosting big media files, we recommend using a CDN like Amazon S3 as a cost-effective file serving solution. Modules such as [Amazon S3 CORS Upload](https://drupal.org/project/amazons3_cors) allow uploads directly to S3 from your Drupal site without using Pantheon as an intermediary.

## Moving directories

File directories on Pantheon's file serving infrastructure cannot be moved or renamed. To move or rename a directory, create a new directory, move all the files from inside the old directory into the new one, and delete the old directory.

## IP-Address Based Security Schemes

All enterprise customers and customers with SSL will have a dedicated incoming IP to route public traffic. The actual IP address location where code executes can change on Pantheon, as application containers are migrated throughout the infrastructure.

As a result, it is not possible to support access to external web services via an ip-address based restriction, for example FirstData. There's no way to predict what IP address your code will be executing "from". Moreover, IP-based security is highly vulnerable to spoofing and other attacks, and should be avoided if possible.

## Maintenance Mode

Drupal's built-in Maintenance Mode works and can be customized; clear caches when toggling.

​Pantheon may send a generic Maintenance Mode message during platform problems; this message cannot be customized.

## Server Side Includes (SSI)

Pantheon does not and will not support Server Side Includes. We recommend converting those to use PHP includes.

## PHP Short Tags

PHP short tags (<? ... ?>) are not supported on Pantheon. The [PHP Manual](http://www.php.net/manual/en/language.basic-syntax.phpmode.php) recommends not utilizing short tags because they are not supported on every server. Additionally, using short tags can interfere with embedding PHP in XML. Avoiding their use leads to more portable, re-distributable code.

## CORS

For sites that need to provide services with Cross-Origin Resource Sharing (CORS), adding the proper header should enable the resource. See  [http://enable-cors.org/server\_php.html](http://enable-cors.org/server_php.html)

Sites that consume services using CORS, such as Amazon S3 CORS, do work on Pantheon.

## Large (>100GB) File Backups

Large backups take longer, use more resources, and have a higher likelihood of failing.  Additionally, a 100GB tarball is in itself not particularly convenient for anyone.  For this reason, scheduled backups do not backup files for sites with footprints over 200GB (although code and database are backed-up as normal).  Despite the lack of backups, file content is highly durable, stored on multiple servers.

## LESS (css)

Pantheon does not currently support Less. Less will need to be compiled to make traditional CSS stylesheets before being pushed to the platform.

## Background Process

Pantheon does not currently support the background process module. The module allows for Drupal to perform "parallel" (asynchronous non-blocking mode) requests. However, there are a number of limitations working in a distributed environment and function correctly on the platform.

## HTTPRL

Pantheon does not currently support the [HTTPRL](http://www.drupal.org/project/httprl) module, as it can result in severely impacted performance. This may be the result of module code or its configuration on the platform that results in the spikes.

#nginx.conf

Pantheon does not currently support modifying the nginx.conf per site, as we run a highly tuned universal configuration file.

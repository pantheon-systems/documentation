---
title: Platform Considerations
description: A list of the Pantheon platform considerations for your Drupal or WordPress sites.
tags: [infrastructure]
categories: []
---
This page is used to keep track of common platform considerations, mostly derived from Pantheon's distributed nature. Check back often, as we are keeping it up to date as we make improvements to address these limitations.

## Browser Support for Pantheon's Dashboard
In order to focus internal development and engineering work, the Pantheon Dashboard supports the following browsers:
<table class="table  table-bordered table-responsive">
  <thead>
    <tr>
      <th></th>
      <th>Chrome</th>
      <th>Firefox</th>
      <th>Opera</th>
      <th>Edge</th>
      <th>Safari</th>
      <th>Internet Explorer</th>
    </tr>
    <tr>
      <th>Versions Supported</th>
      <td colspan="4">Evergreen Browsers - Last 4</td>
      <td>Current + Last Year</td>
      <td>Internet Explorer 11 <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-title="Minimum Support" data-content="Feature support only, allows for visual inconsistencies."><em class="fa fa-info-circle"></em></a></td>
    </tr>
  </thead>
</table>


## Multisite

Pantheon supports designated use cases for [WordPress Site Networks](/docs/wordpress-site-networks) created by WordPress' Multisite feature.

We do not support [Drupal Multisite](https://www.drupal.org/docs/7/multisite-drupal/multi-site-sharing-the-same-code-base). See blog posts: [Why Drupal Multisite is not Enterprise Grade](https://pantheon.io/blog/why-drupal-multisite-not-enterprise-grade) and [Much Ado About Drupal Multisite](https://pantheon.io/blog/much-ado-about-drupal-multisite).

## One Application per Site

Each site supports a single Drupal or WordPress application. Placing a WordPress application to behave as the blog for a Drupal site, for example, is unsupported.

### Domain Masking or URL Forwarding
Domain masking allows you to serve two entirely different and separate sites over a single common domain. For example, using one system as a front end for marketing efforts and another for blog content:

* Main Site: `https://www.example-site.com/`
* Blog: `https://www.example-site.com/blog/`

In and of itself, Pantheon does not support this kind of setup. Each site on the platform must have its own unique domain. However, this configuration can be achieved using an external service such as CloudFront, StackPath, Fastly, etc.

## Highly Populated Directories

If you have individual directories with tens of thousands of files (e.g. an image repository) it may be necessary to refactor this file structure to see good performance on Pantheon. The danger zone begins at around 50,000 files in a single directory, and performance drops off suddenly at over 100,000 files.

Drupal itself is capable of managing uploaded content into different directories based on the date or user, which is preferable to dumping all uploads into a single place. Refactoring an existing large-scale site with this issue is usually simply a matter of re-arranging the files and then updating the files table in Drupal.

Consider the [File (field) Paths](https://www.drupal.org/project/filefield_paths) module to help resolve issues with highly populated directories.

## Email and Deliverability

Because of the cloud-based nature of Pantheon's infrastructure, we cannot ensure high-deliverability email originating from your Application Containers, as they have no fixed location. While all sites have access to a local Postfix service for testing and development, we recommend using an external SMTP gateway (SendGrid, for example) in production to ensure that your email is delivered.

See [the email documentation](/docs/email) for more details and suggestions.

## Write Access on Environments

For Dev environments in SFTP mode, the entire codebase is writable. However the platform is designed to keep only the codebase under version control.  This means that the only writable to the file system is `sites/default/files` for Drupal sites and `wp-content/uploads` for WordPress sites.

Any modules for Drupal or plugins for WordPress that need to write to the codebase (and assume write access) need a symlink added so that they will instead write to the file system. For more information, read [Using Extensions That Assume Write Access](/docs/assuming-write-access/).

## Streaming Media

Because Pantheon does not provide [transcoding](https://en.wikipedia.org/wiki/Transcoding#Re-encoding.2Frecoding), bandwidth-adaptive media delivery, or support for large files (see below), [streaming media](https://en.wikipedia.org/wiki/Streaming_media) is not possible directly from the platform.

However, you can run a great streaming media website. To do so, Pantheon recommendeds that you find a service to handle the transcoding and streaming, whether that's [YouTube](https://www.youtube.com/), [Brightcove](https://www.brightcove.com/), [Vimeo](https://vimeo.com/), [Soundcloud](https://soundcloud.com/), or another provider. These services provide all the necessary components for great streaming media.

It is also possible to deliver smaller media files from Pantheon using [progressive download](https://en.wikipedia.org/wiki/Progressive_download), but the media will not automatically adapt to the bandwidth and capabilities of the device browsing the site, nor does Pantheon support "seeking" to arbitrary playback positions based on time. The actual media formats (encodings, containers, file name extensions) are unrestricted.

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

For more information, see [Dynamic Outgoing IP Addresses](/docs/outgoing-ips).

## Maintenance Mode

Pantheon may send a <a href="/docs/errors-and-server-responses#pantheon-503-target-in-maintenance" data-proofer-ignore>generic Maintenance Mode message</a> during platform problems; this message cannot be customized.

Built-in Maintenance Mode for both Drupal and WordPress sites can be customized; clear caches when toggling.

## Server Side Includes (SSI)

Pantheon does not and will not support Server Side Includes. We recommend converting those to use PHP includes.

## PHP Short Tags

PHP short tags (`<? ... ?>`) are not supported on Pantheon. The [PHP Manual](https://secure.php.net/manual/en/language.basic-syntax.phpmode.php) recommends not utilizing short tags because they are not supported on every server. Additionally, using short tags can interfere with embedding PHP in XML. Avoiding their use leads to more portable, re-distributable code.

## CORS

For sites that need to provide services with Cross-Origin Resource Sharing (CORS), adding the proper header should enable the resource. See  [https://enable-cors.org/server\_php.html](https://enable-cors.org/server_php.html)

Sites that consume services using CORS, such as Amazon S3 CORS, do work on Pantheon.

## Large (>100GB) File Backups

Large backups take longer, use more resources, and have a higher likelihood of failing.  Additionally, a 100GB tarball is in itself not particularly convenient for anyone.  For this reason, scheduled backups do not backup files for sites with footprints over 200GB (although code and database are backed-up as normal).  Despite the lack of backups, file content is highly durable and stored on multiple servers.

## CSS Preprocessors

Pantheon does not currently support LESS or Sass/Compass CSS preprocessor languages. LESS and Sass will need to be pre-compiled to make traditional CSS stylesheets before being pushed to the platform.

## .htaccess
Pantheon sites use NGINX to concurrently serve requests. The NGINX web server ignores distributed configuration files such as `.htaccess` for reduced resource consumption and increased efficiency. This configuration is standard across all Pantheon sites, and modifications to the `nginx.conf` file are not supported.

For details, see [Using PHP as an htaccess Alternative](/docs/htaccess).

## nginx.conf

Pantheon does not currently support modifying the nginx.conf per site, as we run a highly tuned universal configuration file.  All of the containers run a standard profile, and we have opted to keep this configuration to keep the nginx.conf lean.

## Database Stored Procedures

MySQL stored procedures are not supported. Due to the nature of the platform, there is no guarantee that they will  persist following a database migration. You can avoid the use of stored procedures by using parameterized queries or [object-relational mapping](https://en.wikipedia.org/wiki/Object-relational_mapping){.external}.

## Oracle Database Drivers

Pantheon does not currently support directly connecting to Oracle databases. Customers have successfully used the [Pantheon Enterprise Gateway](https://pantheon.io/features/secure-integration) to connect to an external API on top of their Oracle databases.


## PHP/Java Bridge

Pantheon does not currently support the [PHP/Java Bridge](http://php-java-bridge.sourceforge.net/pjb/).

## General PHP Framework Support

Pantheon does not currently support any PHP frameworks outside of Drupal and WordPress. The platform is only optimized for Drupal or WordPress and no others. Although PHP will run, we can not assist you in getting the non-approved frameworks running in any way.

## Unsupported Drupal Modules and WordPress Plugins
See [Modules and Plugins with Known Issues](/docs/unsupported-modules-plugins) for an up-to-date list of modules and plugins that do not work with or are not supported by Pantheon.

## Paid Plugins, Modules or Themes with Licenses
 
In general, licensed or paid plugins, modules or themes are allowed for use in Pantheon. Licensing issues are for Customers to Resolve, as per the terms of their plugin, module or themes. You can also get direct support from their providers or developers. 

Licenses are also used to get updates directly online. You can assign your keys in the DEV environment to get the changes as it is writable. 

For plugin, themes or module specific cases related to licenses, check our list [Unsupported Drupal Modules and WordPress Plugins](/docs/unsupported-modules-plugins/) 

## Inactive Site Freezing

Sandbox sites that are over four months old that have not had code commits or other Git activity for three months are "frozen". All requests to a frozen site will return a `530 Site Frozen` error code, and the site's Dashboard will be unavailable.

You can reactivate a site with a single click. Simply visit the site's Dashboard and click **Unfreeze site**. Within a few minutes, the site will be ready for development again. If you experience any issues, a backup of the site is available and can be restored via the Site Dashboard.

## Emoji Support

Emoji support is available on WordPress and Drupal 8. On Drupal 7 sites, emojis will return this database error:

    PDOException: SQLSTATE[HY000]: General error: 1366 Incorrect string value: '\xF0\x9F\x94\xB4\x0D\x0A...'

The `utf8mb4` character encoding needed for emojis is not supported on Drupal 7 sites on our platform. The provided workaround on drupal.org is not possible on Pantheon as it would cause adverse effects on other sites, since all sites share the same `my.cnf` configuration. To resolve this issue, consider the [Strip 4-byte UTF8](https://www.drupal.org/project/strip_utf8mb4) module to reject overly long byte sequences.

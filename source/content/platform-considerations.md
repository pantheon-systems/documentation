---
title: Platform Considerations
description: A list of the Pantheon platform considerations for your Drupal or WordPress sites.
categories: [platform]
tags: [files, libraries, security, webops]
reviewed: "2020-10-16"
---

This page is used to keep track of common platform considerations, mostly derived from Pantheon's distributed nature. Check back often, as we are keeping it up to date as we make improvements to address these limitations.

<Partial file="auth.md" />

## Browser Support for Pantheon's Dashboard

In order to focus internal development and engineering work, the Pantheon Dashboard supports the following browsers:

+------------------------+--------+---------+-------+------+---------------------+
|                        | Chrome | Firefox | Opera | Edge | Safari              |
+========================+========+=========+=======+======+=====================+
| **Versions Supported** | Evergreen Browsers - Last 4     | Current + Last Year |
+------------------------+---------------------------------+---------------------+

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

Most often, the best solution is to implement data exports as a web service, incrementally exchanging the data with the target system.

## CORS

For sites that need to provide services with Cross-Origin Resource Sharing (CORS), adding the proper header should enable the resource. See [https://enable-cors.org/server_php.html](https://enable-cors.org/server_php.html)

Sites that consume services using CORS, such as Amazon S3 CORS, do work on Pantheon.

WordPress users can use the [WP-CORS plugin](https://wordpress.org/plugins/wp-cors/) or enable CORS for selected domains [in a MU plugin](/mu-plugin#cross-origin-resource-sharing-cors)

## CSS Preprocessors

Pantheon does not currently support LESS or Sass/Compass CSS preprocessor languages. LESS and Sass will need to be pre-compiled to make traditional CSS stylesheets before being pushed to the platform.

## Database Stored Procedures

MySQL stored procedures are not supported. Due to the nature of the platform, there is no guarantee that they will  persist following a database migration. You can avoid the use of stored procedures by using parameterized queries or [object-relational mapping](https://en.wikipedia.org/wiki/Object-relational_mapping).

MySQL [Triggers](https://dev.mysql.com/doc/refman/8.0/en/triggers.html) and [Events](https://dev.mysql.com/doc/refman/8.0/en/events-overview.html) are also not supported. As an alternative, you may consider Cron for [WordPress](https://pantheon.io/docs/wordpress-cron) or [Drupal](https://pantheon.io/docs/drupal-cron). 

## Drupal 7 and Ampersands

A Drupal 7 site given a URL with an ampersand (`&`) in it, excluding query parameter separation, will return a 404, regardless of the presence of a matching path.

Be sure to encode URLs that use ampersands with `%26` in place of `&`.

## Drupal Steward

The Pantheon platform includes [Drupal Steward](https://www.drupal.org/drupal-security-team/steward), a platform-level mitigation of certain highly-critical vulnerabilities that are identified in Drupal core, as a feature for all Drupal sites on Pantheon. All Pantheon sites are protected by Drupal Steward.

For more information about Drupal Steward, refer to the [Drupal Steward FAQ](https://www.drupal.org/drupal-security-team/steward/faq).

## Email and Deliverability

Because of the cloud-based nature of Pantheon's infrastructure, we cannot ensure high-deliverability email originating from your Application Containers, as they have no fixed location. While all sites have access to a local Postfix service for testing and development, we recommend using an external SMTP gateway (SendGrid, for example) in production to ensure that your email is delivered.

See the [Email for Drupal documentation](/email) or the [WP Mail SMTP](/guides/sendgrid-wordpress-wp-mail-smtp) doc for more details and suggestions.

## ffmpeg Transcoding Support

We do not support ffmpeg transcoding, and we do not have plans to add this feature. However, it is possible to run a site on the platform and integrate with a third-party transcoding service or multimedia platform that lets you create streaming-optimized videos. Those providers have optimized the highly complex process of transcoding and serving video content, and leveraging their infrastructure is often preferable to a custom solution.

## Emoji Support

Emoji support is available out of the box on WordPress and Drupal 8. Drupal 7 sites can enable Emoji support by following this procedure:

For new _or_ existing Drupal 7 installs, add the following lines to `sites/default/settings.php`:

```php:title=sites/default/settings.php
$databases['default']['default']['charset'] = 'utf8mb4';
$databases['default']['default']['collation'] = 'utf8mb4_general_ci';
```

Existing sites that already have an active database must install the [UTF8MB4 Convert](https://www.drupal.org/project/utf8mb4_convert) Drush command and convert the database. Note that this is not a Drupal module that can be enabled, it's a Drush command that should be placed within `/sites/all/drush`. Once you've installed the command in `/sites/all/drush`, you must clear Drush cache for the new command to run. Clear Drush cache using [Terminus](/terminus):

```bash{promptUser: user}
terminus drush <site>.<env> -- cc drush
```

Start by making a [backup](/backups) of the site database, then place the site in maintenance mode and run the following:

```bash{promptUser: user}
terminus drush <site>.<env> -- utf8mb4-convert-databases
```

This will convert the database tables in the existing installation to the proper encoding to support emoji characters. After making the conversion, test it out by placing an emoji in the site text.

## General PHP Framework Support

Pantheon does not currently support any PHP frameworks outside of Drupal and WordPress. The platform is only optimized for Drupal or WordPress and no others. Although PHP will run, we can not assist you in getting the non-approved frameworks running in any way.

## Highly Populated Directories

If you have individual directories with tens of thousands of files (e.g. an image repository) it may be necessary to refactor this file structure to see good performance on Pantheon. The danger zone begins at around 50,000 files in a single directory, and performance drops off suddenly at over 100,000 files.

Drupal itself is capable of managing uploaded content into different directories based on the date or user, which is preferable to dumping all uploads into a single place. Refactoring an existing large-scale site with this issue is usually simply a matter of re-arranging the files and then updating the files table in Drupal.

Consider the [File (field) Paths](https://www.drupal.org/project/filefield_paths) module to help resolve issues with highly populated directories.

## .htaccess

Pantheon sites use NGINX to concurrently serve requests. The NGINX web server ignores distributed configuration files such as `.htaccess` for reduced resource consumption and increased efficiency. This configuration is standard across all Pantheon sites, and modifications to the `nginx.conf` file are not supported.

For details, see [Configure Redirects](/redirects/#php-vs-htaccess).

If your site contains rules in `.htaccess` that cannot be migrated to PHP, Pantheon offers its [Advanced Global CDN](/guides/professional-services/advanced-global-cdn) as a managed service. Custom `.htaccess` rules often can be converted to run on a custom Varnish layer provided by Advanced Global CDN. Please contact your Customer Success Manager (CSM) or [contact us](https://pantheon.io/contact-us?docs) for more information.

### Drupal False Positive

Drupal 7 and 8 checks for arbitrary code execution prevention by looking for a specific string in the `.htaccess` file. Since Pantheon uses NGINX as described above, this message can be safely ignored. For more details, see [this Drupal.org issue](https://www.drupal.org/project/drupal/issues/2150399) on `SA-CORE-2013-003`.

## HTTP Range Requests

[HTTP range requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests) enable sending only a portion of an HTTP message from server to client, and are typically used to speed viewing of large media like PDFs, video background images, or streaming content like [podcasts](https://itunespartner.apple.com/podcasts/articles/creating-your-show_requirements) and videos with pause and resume functions.

Byte-range request header parameters are not supported on Pantheon. Modules and plugins that require specified byte-ranges will not work.

### PDF Viewer Workaround

For PDF viewer plugins that rely on Mozilla's [PDF.js](https://github.com/mozilla/pdf.js) viewer code, it is possible to work around the issue by modifying `PDF.js` to enable the [DisableRange](https://github.com/mozilla/pdf.js/blob/master/src/display/api.js#L169-L171) option.

## Image Optimization Tools

Image optimization libraries such as advpng, OptiPNG, PNGCRUSH, jpegtran, jfifremove, advdef, pngout, jpegoptim have to be installed on the server. At this time, they are not supported. For more information see [Modules with Known Issues.](/modules-known-issues/#imageapi-optimize)

Pantheon also offers Image Optimization as part of Advanced CDN (a [Professional Services](/guides/professional-services/advanced-global-cdn) engagement). Please contact your Customer Success Manager (CSM) or [contact us](https://pantheon.io/professional-services?docs) for more information.

## Inactive Site Freezing

Sandbox sites that are over four months old that have not had code commits or other Git activity for three months are "frozen". All requests to a frozen site will return a `530 Site Frozen` error code, and the site's Dashboard will be unavailable.

You can easily reactivate a site by visiting your Pantheon User Dashboard, select the frozen site in the Dashboard, then click **Unfreeze site**. Within a few minutes, the site will be ready for development again.

If you experience any issues, like missing static assets, a [backup](/restore-environment-backup#restore-an-environment-from-its-own-backup) of the site is available and can be restored via the Site Dashboard. Please note that only files that have been committed will be available after unfreezing.

## IP-Address Based Security Schemes

IP-based security is not recommended on Pantheon - or any cloud platform because the actual IP address where code executes from can change as application containers are migrated throughout the infrastructure.

For more information, see [Dynamic Outgoing IP Addresses](/outgoing-ips).

If you require IP address-level access control, [Advanced Global CDN](/guides/professional-services/advanced-global-cdn#ip-allowlisting--blocklisting) can provide IP-based safelist/blocklist features, as well as IP-based routing. Please contact your Customer Success Manager (CSM) or [contact us](https://pantheon.io/contact-us?docs) for more information.

## Large Code Repository

When a code repo is larger than 2GB, it increases the possibility of Git errors when committing code on Pantheon. We suggest keeping multimedia assets out of the repo by moving them to a media file storage service such as [Amazon S3](https://aws.amazon.com/s3/), and using version control to track URLs. 

If your repository has grown over 2GB and is causing problems (such as errors when cloning), consider [pruning and optimizing the repo](/reducing-large-repos).

## Large Files

Due to the configuration of the [Pantheon Filesystem](/files), Pantheon's file serving infrastructure is not optimized to store and deliver very large files. Files over 100MB cannot be uploaded through WordPress or Drupal, and must be added by [SFTP or rsync](/rsync-and-sftp). Files over 256MB will fail no matter how they are uploaded. Transfers with files over 50MB will experience noticeable degradation in performance.

| File Size       | Platform Compatibility          | Notes                               |
|:--------------- | ------------------------------- |------------------------------------ |
| ≤ 100MB         | <span  style="color:green">✔</span>  | Can be uploaded via any means       |
|   100MB - 256MB | <span  style="color:orange">✔</span> | Must be uploaded over SFTP or rsync |
| > 256MB         | <span  style="color:red">❌</span>   | Must be hosted via 3rd-party CDN    |

If you are distributing large binaries or hosting big media files, we recommend using a CDN like Amazon S3 as a cost-effective file serving solution that allows uploads directly to S3 from your site without using Pantheon as an intermediary.

- Drupal sites can use a module such as [S3 File System](https://www.drupal.org/project/s3fs).
- WordPress sites can use plugins such as [S3 Uploads](https://github.com/humanmade/S3-Uploads) or [WP Offload Media](https://deliciousbrains.com/wp-offload-media/).

Be aware, even when using an external CDN to host files, you cannot upload files over 100MB through the CMS. Upload these files directly to the CDN (here's Amazon's documentation for [uploading to an S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/upload-objects.html)).

See our documentation for [Drupal](/drupal-s3) and [WordPress](/wordpress-s3) for more information about integrating S3 with your Pantheon site.

### Upload Speed

Uploading large files over a slow local internet connection can cause the process to hit our [Connection Timeout](/timeouts/#timeouts-that-are-not-configurable) of 59 seconds. For example, a 10MB file uploaded on a 2Mbps connection may take too long and fail. You can use an upload time calculator like [this one](https://downloadtimecalculator.com/Upload-Time-Calculator.html) to help determine if your local internet connection is impeding file uploads to Pantheon.

## Large (>100GB) File Backups

Large backups take longer, use more resources, and have a higher likelihood of failing. Additionally, a 100GB compressed tarball is in itself not particularly convenient for anyone. For this reason, scheduled backups do not backup files for sites with footprints over 200GB (although code and database are backed-up as normal). Despite the lack of backups, file content is highly durable and stored on multiple servers.

## Maintenance Mode

Pantheon may send a [generic Maintenance Mode message](/errors-and-server-responses#pantheon-503-target-in-maintenance) during platform problems; this message cannot be customized.

Built-in Maintenance Mode for both Drupal and WordPress sites can be customized; clear caches when toggling.

## MariaDB 10.4 and innodb_strict_mode=ON: Row Size Too Large Errors

MariaDB 10.4 on Pantheon has `innodb_strict_mode` set to `ON`. This leads to `Row size too large` errors that are not present on earlier versions of MariaDB:

```sql
ERROR 1118 (42000): Row size too large (> 8126). Changing some columns to TEXT or BLOB may help. In current row format, BLOB prefix of 0 bytes is stored inline.
```

To avoid this error, modify your tables to use `row_format=DYNAMIC`.

<Accordion title="How to update all tables to row_format=DYNAMIC" id="row-size-too-large">

<Partial file="row-size-too-large-alter-table.md" />

</Accordion>

For more information on how to diagnose tables and troubleshoot potential issues, refer to the [official MariaDB documentation](https://mariadb.com/kb/en/troubleshooting-row-size-too-large-errors-with-innodb/).

## Modules and Plugins with Known Issues

See [Modules and Plugins with Known Issues](/modules-plugins-known-issues) for information about [Drupal modules](/modules-known-issues) and [WordPress plugins](/plugins-known-issues) that are not supported and/or require workarounds.

## Multisite

Pantheon supports designated use cases for [WordPress Site Networks](/guides/multisite) created by WordPress' Multisite feature.

We do not support [Drupal Multisite](https://www.drupal.org/docs/7/multisite-drupal/multi-site-sharing-the-same-code-base). See blog posts: [Why Drupal Multisite is not Enterprise Grade](https://pantheon.io/blog/why-drupal-multisite-not-enterprise-grade) and [Much Ado About Drupal Multisite](https://pantheon.io/blog/much-ado-about-drupal-multisite).

## MySQL LOAD DATA LOCAL INFILE

For [security reasons](https://dev.mysql.com/doc/refman/8.0/en/load-data-local-security.html), Pantheon does not support executing MySQL `LOAD DATA LOCAL INFILE` statements from your PHP application. As a workaround, developers can [connect directly to MySQL](/mysql-access) and load files from their local machine:

```bash{promptUser: user}
MariaDB [pantheon]> LOAD DATA LOCAL INFILE 'mydata.csv' INTO TABLE `pantheon`.`mytable` FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n';
```

## nginx.conf

Pantheon does not currently support modifying the `nginx.conf` per site, as we run a highly tuned universal configuration file. All of the containers run a standard profile, and we have opted to keep this configuration to keep the `nginx.conf` lean.

If your site uses `nginx.conf` rules for redirects, see [Configure Redirects](/redirects/#php-vs-htaccess).

If your site contains rules in `nginx.conf` that cannot be migrated to PHP, Pantheon offers [Advanced Global CDN](/guides/professional-services/advanced-global-cdn) as a managed service. Custom `nginx.conf` rules often can be converted to run on a custom Varnish layer provided by Advanced Global CDN. Please contact your Customer Success Manager (CSM) or [contact us](https://pantheon.io/contact-us?docs) for more information.

## Node.js

Node.js is not available in the platform. If running node.js services is a hard requirement for your Drupal or WordPress application, the node.js service must to be hosted on a different remote server outside of Pantheon.

## One Application per Site

Each site supports a single Drupal or WordPress application. Placing a WordPress application to behave as the blog for a Drupal site, for example, is unsupported.

### Domain Masking or URL Forwarding

Domain masking allows you to serve two entirely different and separate sites over a single common domain. For example, using one system as a front end for marketing efforts and another for blog content:

- Main Site: `https://www.example-site.com/`
- Blog: `https://www.example-site.com/blog/`

Domain masking is available through Pantheon's [Advanced Global CDN](/guides/professional-services/advanced-global-cdn#domain-masking-and-reverse-proxy) managed service. If you require domain masking, ask your Customer Success Manager (CSM) or [contact us](https://pantheon.io/contact-us?docs). Customers may also set up domain masking using a third-party CDN service, but please note that third-party services are outside [Pantheon's scope of support](/guides/support).

### Additional Databases

While you are able to import an additional database to an environment, only the Pantheon database will be preserved when the application container is updated. This means you can use an additional database for running migration scripts, but should not rely on it nor write any new data to it.

## Oracle Database Drivers

Pantheon does not currently support directly connecting to Oracle databases. Customers have successfully used the [Pantheon Secure Integration](https://pantheon.io/features/secure-integration) to connect to an external API on top of their Oracle databases.

## Pantheon URL Search Engine Indexing

This can occur if hardcoded links are found in the HTML source of your pages. To correct this, WordPress sites should run a [search and replace using WP-CLI](/wp-cli) as mentioned in the [WordPress Quick Tip: Search and Replace with WP-CLI](https://pantheon.io/blog/wordpress-quick-tip-search-and-replace-wp-cli/) blog post to exchange the platform domains with your custom domain, and then [add a redirect to the primary domain](/guides/launch/redirects).

## PHP Configuration

`php.ini` cannot be customized or overridden on the Platform. See [Securely Working with phpinfo](/phpinfo) for more information on PHP configuration.

## PHP/Java Bridge

Pantheon does not currently support the [PHP/Java Bridge](http://php-java-bridge.sourceforge.net/pjb/).

## PHP Maximum Execution Time Limit

The upper time limit for PHP processing on the platform is 120 seconds. This is outlined in the [Timeouts](/timeouts) documentation and it cannot be increased.  If a script is processing a large amount of data, for example, we recommend that the process be done in smaller batches that can execute sequentially to ensure success.

## PHP Sessions with WordPress

If you need to use PHP's native session handling, please install the [WordPress Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions/) plugin, which we maintain for this purpose. This provides a horizontally scalable storage mechanism for sessions.

You'll need the plugin if you are seeing errors like this:

```php
Warning: session_start(): user session functions not defined
```

[More information on sessions](/wordpress-sessions).

## PHP Short Tags

PHP short tags (`<? ... ?>`) are not supported on Pantheon. The [PHP Manual](https://secure.php.net/manual/en/language.basic-syntax.phpmode.php) recommends not utilizing short tags because they are not supported on every server. Additionally, using short tags can interfere with embedding PHP in XML. Avoiding their use leads to more portable, re-distributable code.

## Rename/Move Files or Directories

### Files

Like file directories, files on Pantheon cannot be renamed or moved. Our SFTP mode doesn’t support the `mv` command, which is what most apps use when renaming or moving files. The workaround is to delete the old file and upload the new file.

### Directories

File directories on Pantheon's file serving infrastructure cannot be moved or renamed. The workaround is to create a new directory, move all the files from inside the old directory into the new one, and delete the old directory.

## Server Side Includes (SSI)

Pantheon does not and will not support Server Side Includes. We recommend converting those to use PHP includes.

## Static Files

Pantheon strips cookies for files with common static file extensions. See [File Suffixes and Cookies](/caching-advanced-topics#file-suffixes-and-cookies) in our [Caching: Advanced Topics](/caching-advanced-topics) doc for more information.

## Streaming Media

Because Pantheon does not provide [transcoding](https://en.wikipedia.org/wiki/Transcoding#Re-encoding.2Frecoding), bandwidth-adaptive media delivery, or support for large files (see below), [streaming media](https://en.wikipedia.org/wiki/Streaming_media) is not possible directly from the platform.

However, you can run a great streaming media website. To do so, Pantheon recommends that you find a service to handle the transcoding and streaming, whether that's [YouTube](https://www.youtube.com/), [Brightcove](https://www.brightcove.com/), [Vimeo](https://vimeo.com/), [Soundcloud](https://soundcloud.com/), or another provider. These services provide all the necessary components for great streaming media.

It is also possible to deliver smaller media files from Pantheon using [progressive download](https://en.wikipedia.org/wiki/Progressive_download), but the media will not automatically adapt to the bandwidth and capabilities of the device browsing the site, nor does Pantheon support "seeking" to arbitrary playback positions based on time. The actual media formats (encodings, containers, file name extensions) are unrestricted.

## Terminus Support

[Terminus](/terminus), our command-line tool for power users, is designed for 'nix-type operating systems like MacOS and Linux. While some people have installed Terminus on Windows using the [Git BASH on Git for Windows](https://git-for-windows.github.io) or [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) shells, this is not officially supported.

If you're a Windows user, consider using a virtualization tool like [VirtualBox](https://www.virtualbox.org/) to run a virtualized 'nix-type environment for tools like Terminus.

## Terminus Can't Delete a Site or Multidev

You might encounter the following error when a site is created and then quickly deleted, or is deleted before the site creation process has completed:

```shell
[error] The environment '1234567' was not found.
```

[Contact Support](/guides/support/contact-support/) and ask to have the environment deleted.

## Write Access on Environments

For Dev environments in SFTP mode, the entire codebase is writable. However the platform is designed to keep only the codebase under version control.  This means that the only writable paths are `sites/default/files` for Drupal sites and `wp-content/uploads` for WordPress sites.

Any modules for Drupal or plugins for WordPress that need to write to the codebase (and assume write access) need a symlink added so that they will instead write to the file system. For more information, read [Using Extensions That Assume Write Access](/symlinks-assumed-write-access).

## UDP

Pantheon's platform security controls include blocking most [UDP traffic](https://en.wikipedia.org/wiki/User_Datagram_Protocol) originating from website containers, in order to prevent platform abuse.

## Xdebug Support

Xdebug is not available on the platform. Local development tools such as [Lando](/guides/lando-wordpress) provide Xdebug and can synchronize your local workstation with the Pantheon Cloud. Debugging on the Pantheon Cloud is done using [New Relic&reg; Performance Monitoring](/new-relic).

## XML-RPC

The [XML-RPC PHP extension](https://www.php.net/manual/en/intro.xmlrpc.php) is, as of this doc's last update, listed as experimental, and not included on the Platform. Consider the [XML-RPC for PHP](http://gggeek.github.io/phpxmlrpc/) library as an alternative.

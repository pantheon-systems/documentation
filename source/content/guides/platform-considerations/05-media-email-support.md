---
title: Platform Considerations
subtitle: Media and Email
description: Learn more about media and email support on the Pantheon platform.
categories: [platform]
tags: [files, libraries, security, webops]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/platform-considerations/media-email-support
anchorid: media-email-support
---

This section provides information on email and media support on the Pantheon platform.

## Email and Deliverability

Pantheon has a cloud-based infrastructure, which means that we cannot ensure the high deliverability of emails originating from your Application Containers, as they have no fixed location. 

All sites have access to a local Postfix service for testing and development, however we recommend using an external SMTP gateway (for example SendGrid) in production to ensure that your email is delivered.

Refer to the [Email for Drupal documentation](/email) or the [WP Mail SMTP](/guides/sendgrid-wordpress-wp-mail-smtp) documentation for suggestions or more information.

## ffmpeg Transcoding Support

We do not support ffmpeg transcoding, and we do not have plans to add this feature. However, it is possible to run a site on the platform and integrate with a third-party transcoding service or multimedia platform that lets you create streaming-optimized videos. Those providers have optimized the highly complex process of transcoding and serving video content, and leveraging their infrastructure is often preferable to a custom solution.

## Emoji Support

Emoji support is available out of the box on WordPress and Drupal 9. Drupal 7 sites can enable Emoji support by following this procedure:

For new or existing Drupal 7 installs:

1. Add the following lines to your `sites/default/settings.php` file:

```php:title=sites/default/settings.php
$databases['default']['default']['charset'] = 'utf8mb4';
$databases['default']['default']['collation'] = 'utf8mb4_general_ci';
```

For existing sites that already have an active database:

1. Install the [UTF8MB4 Convert](https://www.drupal.org/project/utf8mb4_convert) Drush command and convert the database. Note that this is not a Drupal module that can be enabled, it's a Drush command that should be placed within `/sites/all/drush`. 

1. Clear Drush cache using [Terminus](/terminus) after you've installed the command in `/sites/all/drush`. This allows the new command to run.

    ```bash{promptUser: user}
    terminus drush <site>.<env> -- cc drush
    ```

1. Create a [backup](/backups) of the site database, then place the site in maintenance mode and run the following command:

    ```bash{promptUser: user}
    terminus drush <site>.<env> -- utf8mb4-convert-databases
    ```

This will convert the database tables in the existing installation to the correct encoding to support emoji characters. Place an emoji in the site text to test the conversion.

## HTTP Range Requests

[HTTP range requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests) enable sending only a portion of an HTTP message from server to client, and are typically used to speed viewing of large media such as:

- PDFs
- Video background images
- Streaming content such as:
    - [Podcasts](https://itunespartner.apple.com/podcasts/articles/creating-your-show_requirements) 
    - Videos with pause and resume functions

Byte-range request header parameters are not supported on Pantheon. Modules and plugins that require specified byte-ranges will not work.

### PDF Viewer Workaround

You might experience issues with PDF viewer plugins that rely on Mozilla's [PDF.js](https://github.com/mozilla/pdf.js) viewer code. It is possible to work around this issue by modifying `PDF.js` to enable the [DisableRange](https://github.com/mozilla/pdf.js/blob/master/src/display/api.js#L169-L171) option.

## Image Optimization Tools

Image optimization libraries such as advpng, OptiPNG, PNGCRUSH, jpegtran, jfifremove, advdef, pngout, jpegoptim have to be installed on the server. At this time, they are not supported. For more information see [Modules with Known Issues.](/modules-known-issues/#imageapi-optimize)

Pantheon also offers Image Optimization as part of [Advanced Global CDN](/guides/agcdn). Please contact your Customer Success Manager (CSM) or [contact us](https://pantheon.io/professional-services?docs) for more information.

## Streaming Media

[Streaming media](https://en.wikipedia.org/wiki/Streaming_media) is not possible directly from the platform because Pantheon does not provide [transcoding](https://en.wikipedia.org/wiki/Transcoding#Re-encoding.2Frecoding), bandwidth-adaptive media delivery, or support for large files (see below).

However, you can run a great streaming media website. Pantheon recommends that you find a service to handle the transcoding and streaming, whether that's [YouTube](https://www.youtube.com/), [Brightcove](https://www.brightcove.com/), [Vimeo](https://vimeo.com/), [Soundcloud](https://soundcloud.com/), or another provider. These services provide all the necessary components for great streaming media.

It is also possible to deliver smaller media files from Pantheon using [progressive download](https://en.wikipedia.org/wiki/Progressive_download), but the media will not automatically adapt to the bandwidth and capabilities of the device browsing the site, nor does Pantheon support "seeking" to arbitrary playback positions based on time. The actual media formats (encodings, containers, file name extensions) are unrestricted.

## More Resources

- [Images and Media](/guides/frontend-performance/media)

- [Upload Media WordPress](/guides/wordpress-git/media/)
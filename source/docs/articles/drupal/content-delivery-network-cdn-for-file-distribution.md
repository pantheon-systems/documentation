---
title: Content Delivery Network (CDN) for File Distribution
description: Learn about the benefits of using a Content Delivery Network (CDN) on your Drupal site.
category:
    - drupal
keywords: CDN, file distribution, drupal, content delivery network, amazon S3 CORS,
---
A Content Delivery Network (CDN) is a distributed system for rapidly serving files from multiple locations.

A CDN quickly delivers content using a mix of caching, advanced seek/indexing technology, and multiple synchronized origins across a geographic area. By minimizing physical latency and allowing quick, smart retrieval of assets from a localized cache, delivery time can be greatly improved.

## When to Use a CDN

While Pantheon's Valhalla networked file system and Varnish edge cache provide Enterprise-grade high-performance, high-availability solutions for static content, there are some limitations. Specifically, this configuration:

- Is not optimized for serving very large files or streaming content
- Lacks world-wide geo proximity (same data centers as application servers)
- Does not allow selective cache expiration of a particular file

If you have streaming content, large amounts of multi-national traffic, or need to have extremely granular control over cache expiration, then a CDN may be a good solution for your needs.

If you don't meet those specific criteria, strongly consider just using Pantheon's existing infrastructure. It's highly optimized and can handle terrifying amounts of traffic. Many Elite-level  clients with very high-profile sites do not use CDNs and rely on Pantheon's optimized stack to deliver the performance their customers demand.

<dl>
	<dt>
<a href="http://en.wikipedia.org/wiki/Content_delivery_network">Content Delivery Network</a> (CDN)</dt>
	<dd>A system of distributed servers to serve and stream content.</dd><br>
	<dt>Origin Pull</dt>
	<dd>A request is made to CDN; if a fresh cache is not available, request is made to origin (your site), the result is cached and delivered; subsequent requests will return cached content and do not access your site. Easiest to configure.</dd><br>
	<dt>Push</dt>
	<dd>Content must be explicitly added to CDN by your site; if not, then it won't be available. Good for very large or multimedia (video / audio) content, but more difficult to configure.</dd>
</dl>

A more in-depth description of CDN properties can be found in Wim Leer's [Key Properties of a CDN](http://wimleers.com/article/key-properties-of-a-cdn) article.

## Requirements for Using a CDN

You do not need permission, action, or configuration from Pantheon to use a CDN. However, you will need to make alterations to your site code and configuration.

Most sites use the [CDN module](https://drupal.org/project/cdn) to alter file URLs to direct browsers to the CDN instead of your web server. No size fits all, but this will work for most circumstances.

First, download the module. If you use drush:
```bash
drush dl cdn
```
Then, enable the module.
```bash
drush -y en cdn
```
To configure, regardless of which CDN you will be using, set the CDN Status to enabled. If you only need the CDN for limited testing purposes, you can set the status to Testing Mode until you are ready to make the switch to the CDN to serve files to all visitors. When set to Testing Mode, users with the "access files on CDN when in testing mode" permission will receive files from the CDN; all other traffic will continue to receive the files from the default files location.<br />
 ![Enable CDN Module](/source/docs/assets/images/enable-cdn-module.png)
## Best Practices

As files are not shared between environments, you need to have a separate CDN for Dev, Test and Live.

Here's logic that you can use in settings.php to hard-code the URL of the CDN per-environment:

    // CDN - Origin Pull - CDN mapping per environment.
    if (isset($_SERVER['PANTHEON_ENVIRONMENT'])) {
      if ($_SERVER['PANTHEON_ENVIRONMENT'] == 'dev') {
        $conf['cdn_basic_mapping'] = 'http://...';
      }
      else if ($_SERVER['PANTHEON_ENVIRONMENT'] == 'test') {
        $conf['cdn_basic_mapping'] = 'http://...';
      }
      else if ($_SERVER['PANTHEON_ENVIRONMENT'] == 'live') {
        $conf['cdn_basic_mapping'] = 'http://...';
      }
    }

## Amazon S3 CORS

You can configure the [Amazon S3 CORS](https://drupal.org/project/amazons3_cors) module to directly upload to Amazon S3 from within your browser, without needing to upload to Pantheon. This avoids file size limitations on Pantheon and reduces the number of steps necessary to process files.

## Installation

Before you start, be sure that you have an AWS S3 bucket set up.

```bash
drush @pantheon.SITENAME.dev dl media-2.x-dev amazons3 amazons3_cors devel jquery_update awssdk views file_entity
drush @pantheon.SITENAME.dev make sites/all/modules/awssdk/awssdk.make --no-core
drush @pantheon.SITENAME.dev en devel amazons3 amazons3_cors media jquery_update libraries awssdk views file_entity awssdk_ui
drush @pantheon.SITENAME.dev cc all

```
- /admin/reports/status - Make sure AWSSDK reports a version number
- /admin/reports/awssdk - Verify it's correct
- /admin/config/media/awssdk - Specified Amazon Web Services Key, Amazon Web Services Secret Key
- /admin/config/media/amazons3 - Default Bucket Name: amazon-s3-cors
- /admin/config/media/file-system - Default download method: Amazon Simple Storage Service

## Known Limitations

File Conveyer is not available on Pantheon.

## Resources

- [CDN module](http://drupal.org/project/cdn)
- [Amazon S3 module](http://drupal.org/project/amazons3)
- [Rackspace Cloud Files](http://www.rackspace.com/cloud/files/)
- [Amazon CloudFront](http://aws.amazon.com/cloudfront/)

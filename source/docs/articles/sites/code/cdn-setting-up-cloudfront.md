---
title: CDN Setting up CloudFront on Pantheon
description: Get started using the Amazon CloudFront CDN.
category:
    - drupal
    - developing
---

## Before You Begin

Make sure that you have:  
- A site w/ CDN module or plug-in installed  
- Signed-up for Amazon Web Services and are familiar with the interface

## About Amazon CloudFront

CloudFront is a pull-only content distribution network. All requests for assets go through CloudFront and if the CDN's cached version has expired or is missing, a fresh copy will be pulled from the origin (your site).

## Set Up A Drupal CloudFront Distribution

The first step in setting-up CloudFront on your Drupal site is to create a new CloudFront distribution. This article will help you create a barebones configuration. If you require a more complicated configuration, refer to the [AWS documentation](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/WorkingWithDownloadDistributions.html#DownloadDistValuesDomainName).

**Note**: A CloudFront distribution is not a Drupal distribution. A CF distribution simply refers to a controller that will be configured to deliver your assets to your website.

1. In the CloudFront console, click **Create Distribution**.
2. Select **Download** for the delivery method and click **Continue**. If you require streaming media (such as video or audio files), you'll need to choose the streaming distribution (not covered in this article).
3. Complete the fields to get the basic download distribution up and running.
  - **Origin Domain Name:** example-domain.com. The Origin Domain Name will be either an Amazon bucket hostname (if you're using a [bucket](http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html) to store your assets) or a web server's hostname.  
  - **Origin ID: Custom-dev-static.pantheonsupport.com**. An identifier to easily identify the distribution.  
  - **Alternate Domain Names (CNAMEs):** www.example-domain.com. Any alternative domains that point to your site should also be added.  
  - **Distribution State:** Enabled. Be sure to enable the distribution or your assets will not be delivered through the CDN.  

4. Click **Create Distribution**. You will be returned to the CloudFront distributions table where you will see your new distribution with a status of "In Progress". When your distribution is ready, the status will change to "Deployed".

## Configure the CDN Module In Drupal

1. Install and enable the CDN module. For more information, see  [Drupal.org](https://drupal.org/documentation/install/modules-themes) to learn how to install and enable modules through the Drupal interface, or see [Drush on Pantheon](/docs/articles/local/drush-command-line-utility) to learn how to work with modules using Drush.
2. Go to admin/config/development/cdn to get to the General Configuration tab.
3. Select **Enabled** and click **Save Configuration**.
4. Go to the Details tab. There are a couple of items to address:
  - **Mode:** Origin Pull. For the CloudFront configuration, use Origin Pull mode. File Conveyor mode allows integration with [File Conveyor](http://fileconveyor.org) for more complicated configurations. Pantheon does not support File Conveyor.  

      Return to the CloudFront distributions table and copy the domain name for your new distribution.  
  - **CDN Mapping:** http://my.cloudfrontcdndomain.net. Be sure to add the protocol in front of the domain name. For example, "http://my.cloudfrontcdndomain.net" will work but "my.cloudfrontcdndomain.net" may cause problems. If you are using SSL, be sure to use https.

      Return to the Drupal CDN module configuration and paste the Domain Name we just copied from CloudFront.
5. Click **Save Configuration**. Your assets should now be coming from your CloudFront distribution.

## Verify Assets Are Coming From the CloudFront Distribution

**Note**: Execute the following steps as an anonymous user (logged out).

1. Create an article on your site and upload an image to it.
2. View the article in your browser.
3. Right-click the image and copy its location.
4. View the image in a new tab. If the URL reflects the domain provided by CloudFront, your assets are coming from the CloudFront distribution. If it reflects the domain name of your site and doesn't mention the CDN domain, go back to the beginning of this article and complete the steps again.

## See Also

- [Content Delivery Network (CDN) for File Distribution](/docs/articles/drupal/content-delivery-network-cdn-for-file-distribution/)
- [CDN Developer's Article](http://wimleers.com/article/easy-drupal-cdn-integration-for-fun-and-profit)
- [CDN Module](https://drupal.org/project/CDN)

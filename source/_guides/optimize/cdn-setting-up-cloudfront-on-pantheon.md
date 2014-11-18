---
title: CDN: Setting up CloudFront on Pantheon
parent_guide:
    - howto
/cdn-setting-up-cloudfront-on-pantheon/
Metadata
filename: source/_docs/cdn-setting-up-cloudfront-on-pantheon.md
---

## Pantheon Academy
<iframe width="560" height="315" src="//www.youtube-nocookie.com/embed/zgUdAXbMm98" frameborder="0" allowfullscreen></iframe>
## Overview

This article assumes that you have signed-up for Amazon Web Services and are familiar with the interface.

### What You Will Need

- Drupal Site w/ CDN Module Installed
- AWS Account

### About Amazon CloudFront

CloudFront is a pull-only content distribution network. This means that all requests for assets go through CloudFront and if the CDN's cached version has expired or is missing, a fresh copy will be pulled from the origin (your site).

### Setting-Up A CloudFront Distribution

The first step in setting-up CloudFront on your Drupal site is to create a new CloudFront distribution.

**NOTICE:** A CloudFront Distribution is NOT a Drupal Distribution. A CF distribution simply refers to a controller that will be configured to deliver your assets to your website.

In the Cloudfront console, click "Create Distribution" at the top left:

![](https://pantheon-systems.desk.com/customer/portal/attachments/200806)

Next, we need to configure our new distribution. For the sake of simplicity, our tutorial presents a barebones configuration. If you require a more complicated configuration, please refer to the [AWS documentation](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/WorkingWithDownloadDistributions.html#DownloadDistValuesDomainName). Or, if you don't like to read, you can walk blindly through the fires of Mordor if your neckbeard is resistant to flame spells (Pantheon does not offer support for said neckbeard).

#### Step 1: Select Delivery Method

For this tutorial, we will be creating a download distribution, so check Download and click "Continue". If you require streaming media (such as video or audio files), you will need to use the streaming distribution (not covered in this tutorial).

![](https://pantheon-systems.desk.com/customer/portal/attachments/200814)

#### Step 2: Create Distribution

There are several fields presented in the distribution configuration. We will only be providing values for the necessary fields to get our basic download distribution up and running. If you are curious about fields not covered in this article, please refer to the tooltips available next to each item in the Amazon Console for further information.

- **Origin Domain Name: ** example-domain.com

The Origin Domain Name will be either an Amazon Bucket hostname (if you're using a [bucket](http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html) to store your assets) or a web server's hostname (like the pantheonsupport.com domain I am using in this tutorial).

- **Origin ID: Custom-dev-static.pantheonsupport.com**

An Identifier that will allow you to identify the distribtuion easily.

- **Alternate Domain Names(CNAMEs):** www.example-domain.com

Any alternative domains that point to your site should be added here. I've added the www version of my domain because I have a CNAME in my DNS configuration that points to my site as well.

- **Distribution State:** Enabled

Be sure to enable the distribution or your assets will not be delivered through the CDN.

![](https://pantheon-systems.desk.com/customer/portal/attachments/200809)

When you've finished your configuration, click "Create Distribution" at the bottom left. You will be returned to the CloudFront: Distributions table where you should see your new distribution with a status of "InProgress". When your distribution is ready for use, the status will change to "Deployed".

### The Drupal Side: Configuring the CDN Module

Install and Enable the CDN module. If you don't know how, see the [Drupal.org](https://drupal.org/documentation/install/modules-themes) to learn how to install and enable modules through the Drupal interface, or checkout our [Drush on Pantheon](/documentation/advanced-topics/drush-command-line-utility/-drush-command-line-utility) article & video to learn how to work with modules using Drush.

When the module has been enabled, navigate to admin/config/development/cdn, which will land you on the General config tab. Select "Enabled" and click "Save Configuration".

![](https://pantheon-systems.desk.com/customer/portal/attachments/200829)​

When Drupal has confirmed the save, navigate to the details tab.

On the details tab, we have a couple of items to address:

- **Mode:** Origin Pull

For our CloudFront configuration, we want the module to use Origin Pull mode. File Conveyor mode allows integration with [File Conveyor](http://fileconveyor.org), which allows for more complicated configurations. Pantheon does not currently support File Conveyor.

Return to CloudFront: Distributions table and copy the "Domain Name" provided by CloudFront for your new distribution.

By now, the new distribution we created on CloudFront should be ready to go. If so, the status will read "Deployed", as shown in the picture below:

![](https://pantheon-systems.desk.com/customer/portal/attachments/200834)

- **CDN Mapping:** http://my.cloudfrontcdndomain.net​

**NOTE:** Be sure to add the protocol in front of the domain name (for example "http://my.cloudfrontcdndomain.net" will work but "my.cloudfrontcdndomain.net" may cause problems.) If you are using SSL, be sure to use https. You have been warned: no neckbeard can save you from an improper protocol, even if enchanted.  
 

Return to the Drupal CDN module configuration and paste the Domain Name we just copied from CloudFront.

![](https://pantheon-systems.desk.com/customer/portal/attachments/210097)

 

Click "Save Configuration". Your assets should now be coming from your CloudFront Distribution.

### Verifying That Assets Are Coming From the CloudFront Distribution

But _wait_! We can't just assume that a CDN wizard is magically teleporting site assets for each incoming request. The following steps should be taken to determine whether or not the CloudFront distribution is delivering assets:

**NOTICE:** Execute the following steps as an anonymous user (logged-out).

1. Create an article on your site and upload an image attached to the article.
2. Visit the article in the browser.
3. Right-Click the image and copy the location of the image.
4. Visit the image in a new tab. If the url reflects the domain provided by CloudFront, you're wizard is hard at work teleporting assets. If it reflects the domain name of your site and makes no mention of the CDN domain, retrace the steps in this article to figure out what was missed.

### Further Reading

- [Content Delivery Network (CDN) for file distribution](/documentation/advanced-topics/content-delivery-network-cdn-for-file-distribution/)
- [CDN Developer's Article](http://wimleers.com/article/easy-drupal-cdn-integration-for-fun-and-profit)
- [CDN Module](https://drupal.org/project/CDN)


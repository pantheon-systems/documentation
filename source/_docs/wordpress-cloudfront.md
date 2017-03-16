---
title: CloudFront CDN Setup for WordPress
description: Learn to set up and configure CloudFront CDN on your Pantheon WordPress site.
tags: [cacheedge, siteintegrations]
categories: [wordpress]
---
Amazon CloudFront is a pull-only Content Distribution Network (CDN). All incoming requests for assets on a CloudFront enabled site will go through the CDN's cached version. If an asset has expired or is missing, a fresh copy is pulled from the the origin site directly.

## Before You Begin

Be sure that you:

- Have an existing WordPress site or [create](https://dashboard.pantheon.io/sites/create) one.
- Set the site's [connection mode](/docs/sftp#sftp-mode) to SFTP.
- Have an account with [Amazon Web Services (AWS)](http://aws.amazon.com/s3/). Amazon offers [free access](https://aws.amazon.com/free/) to most of their services for the first year.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>When creating an AWS account, you will have to enter credit card information. This is required, but you will not be charged unless you exceed the usage limits of their free tier.</p></div>

## Create an Identity and Access Management (IAM) User
[Identity and Access Management (IAM)](http://aws.amazon.com/iam/) allows you to manage all user access to AWS resources and services. Before you can use S3, you need to create an IAM user.

1. From your [AWS Console](https://console.aws.amazon.com), click **Identity & Access Management**.
2. Click **Users**, then **Create New Users**.
3. Enter a descriptive user name and click **Create**.
4. View the new user security credentials by clicking **Show User Security Credentials**.

 <div class="alert alert-info" role="alert">
 <h4 class="info">Note</h4>
 <p>You can only view or download a user's secret access key immediately after the user has been created. This information cannot be accessed at a later point in time.</p>
 </div>

5. Click **Download Credentials**.

Make sure you save the credentials in a secure location before leaving this page. You will need the access keys when configuring the Amazon S3 and CloudFront plugin.

## Assign User Privileges
Now you need to give the new user permission to manage S3 (Amazon Simple Storage Service), because that is where assets are stored.

1. From the [Users page](https://console.aws.amazon.com/iam/home#users), select your new user.
1. In the Permissions section, click **Attach Policy**.
1. Select **AmazonS3FullAccess** and click **Attach Policy**.

You now have a user with full S3 access and are ready to configure WordPress.

## Configure CloudFront on WordPress
There are several plugins that will help you manage cached assets in WordPress with CloudFront; however, for the sole purpose of incorporating CloudFront, this article uses the [Amazon S3 and CloudFront](https://wordpress.org/plugins/amazon-s3-and-cloudfront/) plugin.

## Install the Amazon S3 and CloudFront Plugin

There are a few different ways you can install a plugin on a Pantheon hosted WordPress site. The following methods require your site to be in [SFTP Mode](/docs/sftp#sftp-mode).

### Install via Terminus CLI

Execute the following [Terminus](/docs/terminus/) command to install and activate the Amazon S3 and CloudFront plugin:

```bash
terminus wp <site>.<env> -- plugin install amazon-s3-and-cloudfront --activate
```


In order for the Amazon S3 and CloudFront plugin to function, you also need to install the Amazon Web Services plugin:

```bash
terminus wp <site>.<env> -- plugin install amazon-web-services --activate
```

### Install via the WordPress Dashboard

Access your WordPress Dashboard by appending `/wp-admin` to your [Development site URL](/docs/create-sites#create-a-site) and log in using your WordPress credentials.

1. Click **Plugins**, then select **Add New**.
1. Paste the name of the plugin in the **Search Plugins** box and press enter.
1. Find Amazon S3 and CloudFront and click **Install Now**.
1. Click **OK** to confirm the installation.
1. Click **Activate Plugin**.
  You are now directed to the Plugin page of your WordPress Dashboard to install and activate the plugin.
1. Click **Install it**, then **Activate Plugin**.

### Configure the Amazon S3 and CloudFront Plugin

From within your WordPress Dashboard:

1. Click **AWS** and select **Settings**.

  <div class="alert alert-info" role="alert">
  <h4 class="info">Note</h4>
  <p>You already have your AWS user credentials, as they were generated in the steps above. For security reasons, you should not provide user credentials within the Settings page of this plugin as it will not be stored securely in the site's database.</p></div>

2. Add the provided code to the `wp-config.php` file located at the web root of your WordPress site using [SFTP](/docs/sftp/) (replace the stars with your user credentials):

  ```php
  define( 'AWS_ACCESS_KEY_ID', '********************' );
  define( 'AWS_SECRET_ACCESS_KEY', '****************************************' );
  ```

3. Click **AWS**, then **S3 and CloudFront** from within your WordPress Dashboard.
4. Create a new bucket by entering a unique name, and then click **Create**.
5. Ensure that "Copy Files to S3" and "Rewrite File URLs" are both set to **ON**.

There are several other options available within this plugin for you to experiment with. Take a tour of the settings to find the best configuration for your particular use case.

## Test Amazon S3

Follow these steps within your WordPress Dashboard to test CloudFront:

1. Click **Media** and upload a new image.
1. Once the image has uploaded, click on the image thumbnail to view attachment details.
1. Verify the image URL.

If the URL contains your newly created S3 bucket, then you have followed all steps correctly and have successfully configured Amazon S3 services. If you still see your Pantheon Development URL, start over and repeat the previous steps.

## Set up CloudFront

Now for the final step: turning on Amazon CloudFront. These combined services will automatically distribute your media globally so your pages will load fast around the world.

1. Access the [CloudFront home page](https://console.aws.amazon.com/cloudfront/home) from within your Amazon Console.
2. Click **Create Distribution**.
3. From within the Web section, click **Get Started**.
4. In the **Origin Name** field, select your recently created S3 bucket. This will automatically populate the **Origin ID** field.
5. You can use the default configurations for the other options or tweak them as you need.
6. Click **Create Distribution**.

You're now sent to the CloudFront Distributions page. You will notice that your distribution is enabled and the status is "In Progress". The amount of time this initial setup takes depends on the size of your media library. Once complete, Amazon CloudFront will serve all of your media.

---
title: CloudFront CDN Setup for WordPress
description: Learn to setup and configure CloudFront CDN on your Pantheon WordPress site.
category:
  - going-live
  - developing
  - WordPress
keywords: wordpress, cloudfront, cloudfront cdn, cdn
---
## Before You Begin

Be sure that you:

- Have an existing WordPress site or [create](/docs/articles/wordpress/starting-wordpress-site/) one
- Set the site's [connection mode](/docs/articles/sites/code/developing-directly-with-sftp-mode/#sftp-mode) to SFTP

## Amazon CloudFront

CloudFront is a pull-only Content Distribution Network (CDN). All incoming requests for assets on a CloudFront enabled site will go through the CDN's cached version. If an asset has expired or is missing, a fresh copy will be pulled from the the origin site directly.

## Create an Account
If you already have an account with [Amazon Web Services (AWS)](http://aws.amazon.com/free/), you are good to go. Otherwise, you will need to create one. Amazon offers free access to most of their services for the first year. This allows you to build out new systems and test things before committing money to a project.

<div class="alert alert-info" role="alert"> <strong> Note:</strong> When creating an AWS account, you will have to enter credit card information. This is required, but you will not be charged unless you exceed the usage limits of their free tier.</div>

## Create an IAM User
[Identity and Access Management (IAM)](http://aws.amazon.com/iam/) allows you to manage all user access to AWS resources and services. Before you can use CloudFront, you need to need to create an IAM user.

1. From your [AWS Console](https://console.aws.amazon.com), click on **Identity & Access Management**
 ![AWS Console IAM](/source/docs/assets/images/aws-console-iam.png).
2. Click **Users** and then **Create New Users**.
3. Enter a descriptive user name in the first box and click **Create**.
4. View the new user security credentials by clicking on **Show User Security Credentials**.

 ![AWS New User Security Credentials](/source/docs/assets/images/aws-user-show-credentials.png)
 <div class="alert alert-info" role="alert"> <strong>Note:</strong> You can only view or download a user's "Secret Access Key" immediately after the user has been created. This information cannot be accessed at a later point in time.</div>
 5. Click **Download Credentials**.

Make sure you save the credentials in a secure location before leaving this page. You will need the access keys when configuring the Amazon S3 and CloudFront plugin.

## User Privileges
We need to give our new user permission to manage S3 (Amazon Simple Storage Service), because that is where assets will be stored.

1. From the [Users page](https://console.aws.amazon.com/iam/home#users), select your new user.
1. In the Permissions section, click **Attach Policy**.
1. Select **AmazonS3FullAccess** and click **Attach Policy**.
 ![AWS User Permissions S3 Access](/source/docs/assets/images/aws-add-s3fullaccess.png)
We now have a user with full S3 access and are ready to configure WordPress.

## Configure CloudFront on WordPress
There are several plugins that will help you manage cached assets in WordPress with CloudFront. The most popular by far is [W3 Total Cache](https://wordpress.org/plugins/w3-total-cache/). This is a beast of a plugin that has immense functionality. However, for the sole purpose of incorporating CloudFront, we are going to use the [Amazon S3 and CloudFront](https://wordpress.org/plugins/amazon-s3-and-cloudfront/) plugin.

## Install the Amazon S3 and CloudFront Plugin

There are a few different ways you can install a plugin on a Pantheon hosted WordPress site. The following methods require your site to be in [SFTP Mode](/docs/articles/sites/code/developing-directly-with-sftp-mode/#sftp-mod).

#### Install Via Terminus CLI

Execute the following [Terminus](https://github.com/pantheon-systems/cli) command to install and activate the Amazon S3 and CloudFront plugin:

```
terminus wp plugin install amazon-s3-and-cloudfront --activate --site=your-awesome-site --env=dev
```

<div class="alert alert-info" role="alert"> <strong>Note:</strong> Replace <code>your-awesome-site</code> with your specific site name. To see a list of all your Pantheon hosted sites, run <code>terminus sites list</code> </div>

In order for the Amazon S3 and CloudFront plugin to function, we must also install the Amazon Web Services plugin:

```
terminus wp plugin install amazon-web-services --activate --site=your-awesome-site --env=dev
```


#### Install Via WordPress Dashboard

Access your WordPress dashboard by appending `/wp-admin` to your [Development Site URL](/docs/articles/sites/create/#visit-the-dev-installation) and log in using your WordPress credentials.

1. Click on **Plugins**, then select **Add New**.
1. Paste the name of the plugin in the "Search Plugins" box and press enter.
1. Find Amazon S3 and CloudFront and click **Install Now**.
1. Click **OK** to confirm the installation.
1. Click **Activate Plugin**.

 You will be redirected to the Plugin page of your WordPress dashboard. There will be a notice at the top of the page that states the Amazon Web Services plugin is required.

1. Click **Install it** and then click **Activate Plugin**.

### Configure the Amazon S3 and CloudFront Plugin

From within your WordPress dashboard:

1. Click **AWS** and then select **Settings**.

  <div class="alert alert-info" role="alert"> <strong>Note:</strong> You should already have your AWS user credentials, as they were generated in the sections above. For security reasons, you should not provide user credentials within the settings page of this plugin, as it will be insecurely stored in the site's database.</div>

2. Add the provided code to the `wp-config.php` file located at the web root of your WordPress site using [SFTP](/docs/articles/sites/code/developing-directly-with-sftp-mode/):

  ```
  define( 'AWS_ACCESS_KEY_ID', '********************' );
  define( 'AWS_SECRET_ACCESS_KEY', '****************************************' );
  ```
  <div class="alert alert-info" role="alert"> <strong>Note:</strong> Replace the stars with your user credentials.</div>

  Once the file has been updated and uploaded to Pantheon, the settings page will show the following:

  ![AWS Plugin Settings User Added](/source/docs/assets/images/aws-plugin-add-user.png)
1. Click on **AWS** and then **S3 and CloudFront** from within your WordPress Dashboard.    2. Create a new bucket by entering a unique name, and then click **Create**.  
3. Ensure that "Copy Files to S3" and "Rewrite File URLs" are both set to "ON".  

There are several other options available within this plugin for you to experiment with. Take a tour of the settings to find the best configuration for your particular use case.

#### Test Amazon S3

Follow these steps within your WordPress dashboard to test CloudFront:

1. Click on **Media** and upload a new image.
1. Once the image has uploaded, click on the image thumbnail to view attachment details.
1. Verify the image URL.

If the URL contains your newly created S3 bucket, then you have followed all steps correctly and have successfully configured Amazon S3 services! If you still see your Pantheon Development URL, you have missed a step along the way.

## Setting up CloudFront

Now for the final step: turning on Amazon's CloudFront. These combined services will automatically distribute your media globally so your pages will load fast around the world.

1. Access the [CloudFront home page](https://console.aws.amazon.com/cloudfront/home) from within your Amazon Console.
1. Click **Create Distribution**.
1. From within the Web section, click **Get Started**.
1. Click inside the **Origin Name** field and select your recently created S3 bucket.

<div class="alert alert-info" role="alert"> <strong>Note:</strong> This action will automatically populate the <strong>Origin ID</strong> field.</div>

1. All other options are set to a default value. You can use the provided configuration or tweak them as you see fit.  
1. Click **Create Distribution**.

This will return you to the CloudFront Distributions page. You will notice that your distribution is enabled but that the Status is "In Progress". The amount of time this initial setup takes depends on the size of your media library. Once this operation is complete, your site will have Amazon CloudFront serving all of your media.


## Conclusion
As stated, there are other plugins that will manage S3 and CloudFront for you. You may want to experiment with them to help decide which one works best for you. The Amazon S3 and CloudFront plugin is easy to setup, but lacks features such as uploading existing media to S3. The Pro edition of this plugin plans to include this functionality, but it has not yet been released. The free version of W3 Total Cache includes this feature out of the box.

Pantheon is a fast platform for serving WordPress powered sites, but a CDN will make it even faster. Amazon's S3 and CloudFront make a solid and affordable CDN while complimenting Pantheon's native speed.

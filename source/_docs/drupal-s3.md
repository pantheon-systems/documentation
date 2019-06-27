---
title: AWS S3 Setup for Drupal
description: Add the ability to integrate with AWS S3 to a Drupal 7 site on Pantheon
tags: [siteintegrations]
categories: [drupal7]
contributors:
  - peter-pantheon
  - alexfornuto
date: 9/1/2016
---

Amazon Web Services (AWS) offers Simple Storage Service (S3) for scalable storage and content distribution, which can be integrated with Drupal sites running on Pantheon.

## Before You Begin

Be sure that you have:

- An existing Drupal site or [create](https://dashboard.pantheon.io/sites/create){.external} one
- Set up an account with [Amazon Web Services (AWS)](https://aws.amazon.com/s3/){.external}. Amazon offers [free access](https://aws.amazon.com/free/){.external} to most of their services for the first year.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>When creating an AWS account, you will have to enter credit card information. This is required, but you will not be charged unless you exceed the usage limits of their free tier.</p></div>

## Configure S3 within the AWS Console
Before integrating S3 with Drupal, you'll need to configure the service within your [AWS Management Console](https://console.aws.amazon.com){.external}.

### Create a New AWS S3 Bucket
If you do not have an existing bucket for your Drupal site, create one:

1. From your [AWS Console](https://console.aws.amazon.com){.external}, click **S3**.
2. Click **Create Bucket**.
<ol start="3"><li>Enter a bucket name. The bucket name you choose must be unique across all existing bucket names in Amazon S3.

 <div class="alert alert-info" role="alert">
 <h4 class="info">Note</h4>
 <p>After you create a bucket, you cannot change its name. The bucket name is visible in the URL that points to the objects stored in the bucket. Ensure that the bucket name you choose is appropriate.</p>
 </div></li></ol>

4. Select a region and click **Create**.
5. Select **Permissions** within the bucket properties and click **Add more permissions**.
6. Choose a user and tick the boxes for **Read** and **Write** access for both **Objects** and **Permissions**, then click **Save**.

### Create an Identity and Access Management Policy
[Identity and Access Management (IAM)](https://aws.amazon.com/iam/){.external} allows you to manage all user access to AWS resources and services. Creating a policy allows you to explicitly set limited privileges on your specific bucket. This strategy offers long-term flexibility for organizing and managing users and their privileges.

1. From your [AWS Console](https://console.aws.amazon.com){.external}, click the **IAM** link.
2. Go to **Policies** and click **Create Policy**.
3. Select **Create your Own Policy**.
4. Give it a name and use the code example code provided in Amazon's [Policy Documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_examples.html#iam-policy-example-s3){.external}.
5. Choose **Amazon S3** for the AWS Service and select **All Actions**. Provide the [Amazon Resource Name](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-s3){.external} for your bucket, and click **Next Step**.
6. Edit the policy name and description (optional).
7. Click **Create Policy**.

For details, see [Example Policies for Administering AWS Resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_examples.html#iam-policy-example-s3){.external}.

### Create an Identity and Access Management Group
We recommend that you do not access an S3 bucket using your AWS root user credentials. Instead, create an IAM group and user:

1. From your [AWS Console](https://console.aws.amazon.com){.external}, click **Identity & Access Management**.
2. Click **Groups**, then **Create New Group**.
3. Enter a descriptive group name and click **Next Step**.
4. Filter policies by **Customer Managed Policies** and select your recently created policy.
5. Click **Next Step**, then **Create Group**.
6. Go to **Users** and click **Create New Users**.
<ol start="7"><li>Provide a user name and click <strong>Create</strong>, then view the new user security credentials by clicking <strong>Show User Security Credentials</strong>.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>You can only view or download a user's secret access key immediately after the user has been created. This information cannot be accessed at a later point in time. You will need the access keys when configuring the S3 File System module</p></div></li></ol>

8. Click **Download Credentials**. Make sure you save the credentials in a secure location before leaving this page.
9. Go to the group created in step 5 and select **Add Users to Group**.
10. Select your newly created user and click **Add Users**.

## Integrate S3 with Drupal
You will need to install the appropriate Drupal module(s) and the AWS SDK library.

<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <!-- Active tab -->
  <li id="tab-1-id" role="presentation" class="active"><a href="#tab-1-anchor" aria-controls="tab-1-anchor" role="tab" data-toggle="tab">Drupal 7</a></li>

  <!-- 2nd Tab Nav -->
  <li id="tab-2-id" role="presentation"><a href="#tab-2-anchor" aria-controls="tab-2-anchor" role="tab" data-toggle="tab">Drupal 8</a></li>

</ul>

<!-- Tab panes -->
<div class="tab-content">
<!-- Active pane content -->
<div role="tabpanel" class="tab-pane active" id="tab-1-anchor" markdown="1">

The following instructions use [Terminus](/docs/terminus), Pantheon's CLI which allows you to call Drush remotely without using a local installation.

These steps require Drush 8, which is run by default on Pantheon for newly created Drupal sites. Sites created prior to November 4, 2015 run 5.x by default.

Before you begin:

 - [Set your site’s Drush version](/docs/drush-versions/#configure-drush-version) to Drush 8 if needed.
 - Either copy the [`default.settings.php`](https://github.com/pantheon-systems/drops-7/blob/master/sites/default/default.settings.php){.external} file to `settings.php` or create an empty `settings.php` file within the `sites/default` directory if you have not done so already.
 - Set the site's connection mode to SFTP within the site Dashboard or via [Terminus](/docs/terminus):

 ```nohighlight
 terminus connection:set <site>.<env> sftp
 ```

###Install Required and Recommended Modules {.info}
####S3 File System {.info}

Install the [Libraries API](https://www.drupal.org/project/libraries){.external} and [S3 File System](https://www.drupal.org/project/s3fs){.external} modules:

```nohighlight
terminus drush <site>.<env> -- en libraries s3fs -y
```
Get the [AWS SDK Library 2.x](https://github.com/aws/aws-sdk-php/releases){.external}:

```nohighlight
terminus drush <site>.<env> -- make --no-core sites/all/modules/s3fs/s3fs.make code/
  //or if you have a contrib subfolder for modules use:
  //terminus drush <site>.<env> -- make --no-core sites/all/modules/contrib/s3fs/s3fs.make code/
```

The above command will add the AWS SDK version 2.x library into the `sites/all/libraries/awssdk2` directory.

#### S3 File System CORS {.info}
Use the [S3 File System CORS Upload](https://www.drupal.org/project/s3fs_cors){.external} module to enhance your Drupal media handling and interface with your S3 bucket by having your file uploads go directly to your S3 bucket.

Install s3fs_cors module using Drush:

```nohighlight
terminus drush <site≥.<env> -- en jquery_update s3fs_cors -y
```
</div>

<!-- 2nd pane content -->
<div role="tabpanel" class="tab-pane" id="tab-2-anchor" markdown="1">

<div class="alert alert-danger" role="alert">
  <h4 class="info">Warning</h4>
  <p markdown="1">As of the latest update to this doc, the [S3 File System CORS Upload](https://www.drupal.org/project/s3fs_cors){.external} module appears to be uninstallable. Refer to [this bug report](https://www.drupal.org/project/s3fs_cors/issues/2852333){.external} for more information.</p>
</div>

Before you begin:

 - Install [Composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx){.external} locally.
 - Set the site's connection mode to Git within the site Dashboard or via [Terminus](/docs/terminus):
  ```bash
 terminus connection:set <site>.<env> git
 ```

 - Create a local clone of your site code, and navigate to it in your terminal.

###Install Required and Recommended Modules {.info}
####S3 File System {.info}

Install the [S3 File System](https://www.drupal.org/project/s3fs){.external} module and AWS SDK version 3.x library using Composer.

1. Ensure that the Composer for your site will first look to Drupal's preferred package source to find modules:

    ```nohighlight
    composer config repositories.drupal composer https://packages.drupal.org/8
    ```

2. Install s3fs module from the preferred package source:

    ```nohighlight
    composer require drupal/s3fs --prefer-dist
    ```

#### S3 File System CORS {.info}
Use the [S3 File System CORS Upload](https://www.drupal.org/project/s3fs_cors){.external} module to enhance your Drupal media handling and interface with your S3 bucket by having your file uploads go directly to your S3 bucket.

Install s3fs_cors module using Composer:

```nohighlight
composer require drupal/s3fs_cors --prefer-dist
```
</div>
</div>

## Drupal Module Configuration

### S3 File System User Credentials
You can configure the settings for the S3 File System module via the Drupal admin after the installation (`admin/config/media/s3fs/settings`).

Enter credentials created for the user in the [previous section](#create-an-identity-and-access-management-group) and your bucket name.

You can optionally use a CNAME to serve files from a custom domain if desired. However, you will need to create a corresponding CNAME record with your DNS host.

### Configure Download and Upload Destinations
Go to `admin/config/media/file-system` and set **Default download method** to **Amazon Simple Storage Service**. You can set the **Upload destination** to **S3 File System** within the **Field Settings** tab.


### S3 File System CORS Upload (s3fs_cors)

From `/admin/config/media/s3fs/cors`, set **CORS Origin** to your domain. There's an individual max file path length of 250 characters.

## Synchronizing the S3 Bucket and Drupal Files
Periodically, you'll need to run Actions provided by the S3 File System module either via the admin or Terminus to sync Drupal with your S3 bucket.

###If you have files on S3 already that are not known to Drupal, refresh the files metadata cache:

```
terminus drush <site>.<env> -- s3fs-refresh-cache
```


### If you have files in Drupal that need inclusion with S3 run:

```
terminus drush <site>.<env> -- s3fs-copy-local
```

If you receive an access denied error message from Amazon, check the permissions on your bucket and policies. Verify all your configuration settings in Drupal are complete and accurate.

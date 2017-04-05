---
title: AWS S3 Setup for Drupal
description: Add the ability to integrate with AWS S3 to a Drupal 7 site on Pantheon
tags: [siteintegrations]
categories: [drupal7]
contributors:
  - peter-pantheon
date: 9/1/2016
---

Amazon Web Services (AWS) offers Simple Storage Service (S3) for scalable storage and content distribution, which can be integrated with Drupal sites running on Pantheon.

## Before You Begin

Be sure that you have:

- An existing Drupal site or [create](https://dashboard.pantheon.io/sites/create) one
- Set up an account with [Amazon Web Services (AWS)](http://aws.amazon.com/s3/). Amazon offers [free access](https://aws.amazon.com/free/) to most of their services for the first year.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>When creating an AWS account, you will have to enter credit card information. This is required, but you will not be charged unless you exceed the usage limits of their free tier.</p></div>

## Configure S3 within the AWS Console
Before integrating S3 with Drupal, you'll need to configure the service within your [AWS Management Console](https://console.aws.amazon.com).

### Create a New AWS S3 Bucket
If you do not have an existing bucket for your Drupal site, create one:

1. From your [AWS Console](https://console.aws.amazon.com), click **S3**.
2. Click **Create Bucket**.
<ol start="3"><li>Enter a bucket name. The bucket name you choose must be unique across all existing bucket names in Amazon S3.

 <div class="alert alert-info" role="alert">
 <h4 class="info">Note</h4>
 <p>After you create a bucket, you cannot change its name. The bucket name is visible in the URL that points to the objects stored in the bucket. Ensure that the bucket name you choose is appropriate.</p>
 </div></li></ol>

4. Select a region and click **Create**.
5. Select **Permissions** within the bucket properties and click **Add more permissions**.
6. Assign **Any Authenticated AWS User** for the **Grantee** and tick the box for **Upload/Delete**, then click **Save**.

### Create an Identity and Access Management Policy
[Identity and Access Management (IAM)](http://aws.amazon.com/iam/) allows you to manage all user access to AWS resources and services. Creating a policy allows you to explicitly set limited privileges on your specific bucket. This strategy offers long-term flexibility for organizing and managing users and their privileges.

1. From your [AWS Console](https://console.aws.amazon.com), click **Identity & Access Management**.
2. Go to **Policies** and click **Create Policy**.
3. Click **Select** within the Policy Generator section.
4. Choose **Amazon S3** for the AWS Service and select **All Actions**. Provide the [Amazon Resource Name](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-s3) for your bucket (e.g. `arn:aws:s3:::bucket_name`), and click **Next Step**.
5. Edit the policy name and description (optional).
6. Click **Create Policy**.

For details, see [Example Policies for Administering AWS Resources](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_examples.html#iam-policy-example-s3).

### Create an Identity and Access Management Group
We recommend that you do not access an S3 bucket using your AWS root user credentials. Instead, create an IAM group and user:

1. From your [AWS Console](https://console.aws.amazon.com), click **Identity & Access Management**.
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

#### Drupal 7
The following instructions use [Terminus](/docs/terminus), Pantheon's CLI which allows you to call Drush remotely without using a local installation.

These steps require Drush 8, which is run by default on Pantheon for newly created Drupal sites. Sites created prior to November 4, 2015 run 5.x by default.

Before you begin:

- [Set your site’s Drush version](/docs/drush-versions/#configure-drush-version) to Drush 8 if needed.
- Either copy the [`default.settings.php`](https://github.com/pantheon-systems/drops-7/blob/master/sites/default/default.settings.php) file to `settings.php` or create an empty `settings.php` file within the `sites/default` directory if you have not done so already.
- Set the site's connection mode to SFTP within the site Dashboard or via [Terminus](/docs/terminus):

 ```bash
 terminus connection:set <site>.<env> sftp
 ```


#### Drupal 8
Before you begin:

- Install [Composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx) locally.
- Set the site's connection mode to Git within the site Dashboard or via [Terminus](/docs/terminus):

 ```bash
 terminus connection:set <site>.<env> git
 ```

###Install Required and Recommended Modules
####S3 File System
 <!-- Nav tabs -->
 <ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#d7s3fs" aria-controls="d7s3fs" role="tab" data-toggle="tab">Drupal 7</a></li>
  <li role="presentation"><a href="#d8s3fs" aria-controls="d8s3fs" role="tab" data-toggle="tab">Drupal 8</a></li>
 </ul>
 <!-- Tab panes -->
 <div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="d7s3fs">
  <br/>
  Install the <a href="https://www.drupal.org/project/libraries">Libraries API</a> and <a href="https://www.drupal.org/project/s3fs">S3 File System</a> modules:
  <pre><code class="bash hljs">terminus drush &lt;site&gt;.&lt;env&gt; -- en libraries s3fs -y</code></pre>

  Get the <a href="https://github.com/aws/aws-sdk-php/releases">AWS SDK Library 2.x</a>:
  <pre><code class="php hljs">terminus drush &lt;site&gt;.&lt;env&gt; -- make --no-core ~/code/sites/all/modules/s3fs/s3fs.make ~/code/
  //or if you have a contrib subfolder for modules use:
  //terminus drush &lt;site&gt;.&lt;env&gt; -- make --no-core ~/code/sites/all/modules/contrib/s3fs/s3fs.make ~/code/</code></pre>
  The above command will add the AWS SDK version 2.x library into the <code>sites/all/libraries/awssdk2</code> directory.
 </div>
  <div role="tabpanel" class="tab-pane" id="d8s3fs">
   <br/>
   <p>Install the <a href="https://www.drupal.org/project/s3fs">S3 File System</a> module and AWS SDK version 3.x library using Composer.</p>   
   First, ensure that the Composer for your site will first look to Drupal's preferred package source to find modules:
   <pre><code class="bash hljs">composer config repositories.drupal composer https://packages.drupal.org/8</code></pre>
   Install s3fs module from the preferred package source:
   <pre><code class="bash hljs">composer require drupal/s3fs --prefer-dist</code></pre>
  </div>
 </div>


#### S3 File System CORS
Use the [S3 File System CORS Upload](https://www.drupal.org/project/s3fs_cors) module to enhance your Drupal media handling and interface with your S3 bucket by having your file uploads go directly to your S3 bucket.
 <!-- Nav tabs -->
 <ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#d7s3fscors" aria-controls="d7s3fscors" role="tab" data-toggle="tab">Drupal 7</a></li>
  <li role="presentation"><a href="#d8s3fscors" aria-controls="d8s3fscors" role="tab" data-toggle="tab">Drupal 8</a></li>
 </ul>
 <!-- Tab panes -->
 <div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="d7s3fscors">
  <br/>
  Install s3fs_cors module using Drush:
  <pre><code class="bash hljs">terminus drush &lt;site&gt;.&lt;env&gt; -- en jquery_update s3fs_cors -y</code></pre>
 </div>
  <div role="tabpanel" class="tab-pane" id="d8s3fscors">
   <br/>
   Install s3fs_cors module using Composer:
   <pre><code class="bash hljs">composer require drupal/s3fs_cors --prefer-dist</code></pre>
  </div>
 </div>

### Drupal Module Configuration
#### S3 File System User Credentials
You can configure the settings for the S3 File System module via the Drupal admin after the installation (`admin/config/media/s3fs/settings`).

Enter credentials created for the user in the [previous section](#create-an-identity-and-access-management-group) and your bucket name.

You can optionally use a CNAME to serve files from a custom domain if desired. However, you will need to create a corresponding CNAME record with your DNS host.

#### Configure Download and Upload Destinations
Go to `admin/config/media/file-system` and set **Default download method** to **Amazon Simple Storage Service**. You can set the **Upload destination** to **S3 File System** within the **Field Settings** tab.


#### S3 File System CORS Upload (s3fs_cors)

From `/admin/config/media/s3fs/cors`, set **CORS Origin** to your domain. There's an individual max file path length of 250 characters.

### Synchronizing the S3 Bucket and Drupal Files
Periodically, you'll need to run Actions provided by the S3 File System module either via the admin or Terminus to sync Drupal with your S3 bucket.

####If you have files on S3 already that are not known to Drupal, refresh the files metadata cache:

```
terminus drush <site>.<env> -- s3fs-refresh-cache
```


####If you have files in Drupal that need inclusion with S3 run:

```
terminus drush drush <site>.<env> -- s3fs-copy-local
```

If you receive an access denied error message from Amazon, check the permissions on your bucket and policies. Verify all your configuration settings in Drupal are complete and accurate.

---
title: AWS S3 Setup for Drupal
description: Add the ability to integrate with AWS S3 to a Drupal 7 site on Pantheon
categories: [drupal]
tags: [code, files, developing]
contributors:
  - peter-pantheon
date: 9/1/2016
---

Amazon Web Services (AWS) offers Simple Storage Service (S3) for scalable storage and content distribution, which can be integrated with Drupal sites running on Pantheon.

## Before You Begin

Be sure that you:

- Have an existing Drupal site or [create](https://dashboard.pantheon.io/sites/create) one.
- Set the site's [connection mode](/docs/sftp#sftp-mode) to SFTP.
- Have an account with [Amazon Web Services (AWS)](http://aws.amazon.com/s3/). Amazon offers [free access](https://aws.amazon.com/free/) to most of their services for the first year.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
When creating an AWS account, you will have to enter credit card information. This is required, but you will not be charged unless you exceed the usage limits of their free tier.</div>

## Configuring S3 within the AWS Console
Before integrating S3 with Drupal, you'll need to configure the service within your [AWS Management Console](https://console.aws.amazon.com).

###Create a New AWS S3 Bucket
If you do not have an existing bucket for your Drupal site, create one:

1. From your [AWS Console](https://console.aws.amazon.com), click **S3**.
2. Click **Create Bucket**.
<ol start="3"><li>Enter a bucket name. The bucket name you choose must be unique across all existing bucket names in Amazon S3.

 <div class="alert alert-info" role="alert">
 <h4>Note</h4>
 After you create a bucket, you cannot change its name. In addition, the bucket name is visible in the URL that points to the objects stored in the bucket. Ensure that the bucket name you choose is appropriate.
 </div></li></ol>

4. Select a region and click **Create**.
5. Select **Permissions** within the bucket properties and click **Add more permissions**.
6. Assign **Any Authenticated AWS User** for the **Grantee** and tick the box for **Upload/Delete**, then click **Save**.

### Create an Identity and Access Management Policy
[Identity and Access Management (IAM)](http://aws.amazon.com/iam/) allows you to manage all user access to AWS resources and services. Creating a policy allows you to explicitly set limited privileges on your specific bucket. This strategy offers long term flexibility for organizing and managing user(s) and their privileges.

1. From your [AWS Console](https://console.aws.amazon.com), click **Identity & Access Management**.
2. Navigate to **Policies** and click **Create Policy**.
3. Click **Select** within the Policy Generator section.
4. Choose **Amazon S3** for the AWS Service and select **All Actions**. Provide the [Amazon Resource Name](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-s3) for your bucket (e.g. `arn:aws:s3:::bucket_name`), then click **Next Step**.
5. Edit the policy name and description (optional).
6. Click **Create Policy**.

### Create an Identity and Access Management Group
It is suggested that you does not access an S3 bucket using your AWS root user credentials. Instead, we recommend creating an IAM group and user:

1. From your [AWS Console](https://console.aws.amazon.com), click **Identity & Access Management**.
2. Click **Groups**, then **Create New Group**.
3. Enter a descriptive group name and click **Next Step**.
4. Filter policies by **Customer Managed Policies** and select your recently created policy.
5. Click **Next Step**, then **Create Group**.
6. Navigate to **Users** and click **Create New Users**.
<ol start="7"><li>Provide a user name and click <strong>Create</strong>, then view the new user security credentials by clicking <strong>Show User Security Credentials</strong>.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
You can only view or download a user's secret access key immediately after the user has been created. This information cannot be accessed at a later point in time. You will need the access keys when configuring the S3 File System module</div></li></ol>

8. Click **Download Credentials**. Make sure you save the credentials in a secure location before leaving this page.
9. Navigate to the group created in step 5 and select **Add Users to Group**.
10. Select your newly created user and click **Add Users**.

##Integrating S3 with Drupal
You will need to install the appropriate Drupal module(s) and the AWS SDK library.

#### Drupal 7
The following instructions utilize [Terminus](/docs/terminus), Pantheon's CLI which allows you to call Drush remotely without using a local installation.

These steps require Drush 8, which is run by default on Pantheon for newly created Drupal sites. Sites created prior to November 4, 2015 run 5.x by default.

Before you begin:

- [Modify the default Drush version](/docs/drush-versions#modifying-default-drush-version) to Drush 8 if needed.
- Create a `sites/default/settings.php` file if you have not done so already.
- Set the site's connection mode to SFTP within the site Dashboard or via [Terminus](/docs/terminus):

 ```bash
 terminus site set-connection-mode --mode=sftp
 ```

#### Drupal 8
Before you begin:

- Install [Composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx) locally.
- Set the site's connection mode to Git within the site Dashboard or via [Terminus](/docs/terminus):

 ```bash
 terminus site set-connection-mode --mode=git
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
  <pre><code class="bash hljs">
  terminus drush 'en libraries s3fs -y'
  </code></pre>

  Get the <a href="https://github.com/aws/aws-sdk-php/releases">AWS SDK Library 2.x</a>:
  <pre><code class="bash hljs">
  terminus drush 'make --no-core sites/all/modules/contrib/s3fs/s3fs.make'
  </code></pre>
  The above command will add the AWS SDK version 2.x into the <code>sites/all/modules/contrib/s3fs</code> directory.
 </div>
  <div role="tabpanel" class="tab-pane" id="d8s3fs">
   <br/>
   <p>Install the <a href="https://www.drupal.org/project/s3fs">S3 File System</a> module and AWS SDK version 3.x library using Composer.</p>   
   First, ensure that the Composer for your site will first look to Drupal's preferred package source to find modules:
   <pre><code class="bash hljs">
   composer config repositories.drupal composer https://packages.drupal.org/8
   </code></pre>
   Install s3fs module from the preferred package source:
   <pre><code class="bash hljs">
   composer require drupal/s3fs --prefer-dist
   </code></pre>
  </div>
 </div>


####S3 File System CORS
Use the [S3 File System CORS Upload](https://www.drupal.org/project/s3fs_cors) module to enhance your Drupal media handling amd interface with your S3 bucket by having you file uploads go directly to you S3 bucket.
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
  <pre><code class="bash hljs">
  terminus drush 'en jquery_update s3fs_cors -y'
  </code></pre>
  The output of the above command will allow you to select the latest, stable 2.x version.
 </div>
  <div role="tabpanel" class="tab-pane" id="d8s3fscors">
   <br/>
   Install s3fs_cors module using Composer:
   <pre><code class="bash hljs">
   composer require drupal/s3fs_cors --prefer-dist
   </code></pre>
  </div>
 </div>

#### Media Modules (Optional)

You may want to enhance your Drupal media handling in conjunction with using AWS S3.
<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
 <li role="presentation" class="active"><a href="#d7media" aria-controls="d7media" role="tab" data-toggle="tab">Drupal 7</a></li>
 <li role="presentation"><a href="#d8media" aria-controls="d8media" role="tab" data-toggle="tab">Drupal 8</a></li>
</ul>
<!-- Tab panes -->
<div class="tab-content">
 <div role="tabpanel" class="tab-pane active" id="d7media">
 <br/>
 To have solid, viewable, manageable Drupal 7 file handling (See: <a href="https://www.drupal.org/node/1699054">Media 2.x Quick Start Guide</a>), install:<br />   
 Ctools, File Entity, Views, and Entity View Modes
 <pre><code class="bash hljs">
 terminus drush 'en ctools file_entity views entity_view_mode -y'
 </code></pre>

 Then install: Media 2.x  module (e.g. 7.x-2.0-beta2)
 <pre><code class="bash hljs">
 terminus drush 'dl --select media'
 </code></pre>
 The output of the above command will allow you to select the latest, stable 2.x version.
</div>
 <div role="tabpanel" class="tab-pane" id="d8media">
  <br/>
  The state of the Media module in D8 is still in flux, see: <a href="https://www.drupal.org/node/2595163">Media</a>.
 </div>
</div>

### Drupal Module Configuration
#### S3 File System User Credentials
Settings for the S3 File System module can be configured via the Drupal admin after module installation (`admin/config/media/s3fs/settings`).

Enter credentials created for the user in the previous section](#create-an-identity-and-access-management-group) and your bucket name.

You can optionally use a CNAME to serve files from a custom domain if desired. However, you will need to create a corresponding CNAME record with your DNS host.

#### Configure Download and Upload Destinations
Navigate to `admin/config/media/file-system` and set **Default download method** for Amazon Simple Storage Service. Set the **Upload destination** to "mazon Simple Storage Service and select a file type in the **Field Settings** tab.


####S3 File System CORS Upload (s3fs_cors)

From `/admin/config/media/s3fs/cors`, set **CORS Origin** to your domain.

Note: An individual file path max length = 250 chars

### Synchronizing the S3 Bucket and Drupal Files
Periodically, you'll need to run Actions provided by the S3 File System module either via the admin or Terminus to sync Drupal with your S3 bucket.

####If you have files on S3 already that are not known to Drupal, refresh the files metadata cache:
terminus drush 's3fs-refresh-cache'


####If you have files in Drupal that need inclusion with S3 run:
terminus drush 's3fs-copy-local'

If you receive an Access Denied error message from Amazon, check the permissions on your bucket. Check that all your configuration settings in Drupal are complete and accurate.

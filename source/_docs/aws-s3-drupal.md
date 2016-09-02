---
title: AWS S3 Setup with Drupal
description: Add the ability to integrate with AWS S3 to a Drupal 7 site on Pantheon
categories: [drupal]
tags: [code, files, developing]
contributors:
  - peter-pantheon
date: 9/1/2016
---

This guide will show you how to integrate Amazon S3 with your Drupal 8 or Drupal 7 site.

##Amazon Web Services (AWS) Setup

You will need to have or create an Account, Bucket, User and Policy.

###Create an Amazon Web Services (AWS) Account (if needed)

Go to: [AWS Accounts](https://aws.amazon.com/account/). 

Amazon uses a multi-step verification process during the AWS account setup. 

So during the account setup you should have immediate access to:   
1. the email you will use with this new AWS account,   
2. the mobile phone you will associate to the account, and   
3. a valid CC or Debit card to associate to the account

Follow all emailed and/or phone instructions to complete setup. Then:   
1. Sign into your [AWS Console](https://console.aws.amazon.com/console/home)   
2. Go the your AWS Identity and Access Management (IAM) Dashboard and secure your account


###Create a New AWS S3 Bucket (if needed)

Create a new Bucket and pick Region. To create a Bucket:

1. Sign into the AWS Management Console.   
2. Open the [Amazon S3 Console](https://console.aws.amazon.com/s3).   
2. Click Create Bucket.   
3. Enter a bucket name. The bucket name you choose must be unique across all existing bucket names in Amazon S3.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
After you create a bucket, you cannot change its name. In addition, the bucket name is visible in the URL that points to the objects stored in the bucket. Ensure that the bucket name you choose is appropriate.</div>

5. In the Region box, select a region.   
5. Click Create.   
6. View the Bucket Properties.   
7. Set Permissions on the Bucket to allow Authenticated AWS User to List, Upload/Delete. For more details, see: [Introduction to Managing Access Permissions to Your Amazon S3 Resources](http://docs.aws.amazon.com/AmazonS3/latest/dev/intro-managing-access-s3-resources.html).

###Create a Limited-Access User for Use by Your Site (if needed)

<div class="alert alert-info" role="alert">
<h4>Note</h4>
It is suggested that one does not access an S3 bucket using an AWS account’s root user credentials.</div>

This strategy below using IAM offers long term flexibility for organizing and managing User(s) and their privileges. 

1. Create a new Policy which offers only limited privileges on your specific bucket. See: [Amazon suggested Policy with perms to set for creating a limited access User for a single S3 bucket]( http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_examples.html#iam-policy-example-s3).   
2. Create a new Group.   
3. Attach the Policy to the Group.   
4. Create a new User.   
5. Add the User to the above Group.

###Obtain S3 User Access and Secret Keys

Create the Access Key and Secret Key for the User. 

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Capture and save the User Access Key and Secret Key now as it is never shown again. You can also only at this time Download the credentials as a .csv file.</div>

##Drupal Setup 

For D7 setup you will need [Drush 8](https://pantheon.io/docs/drush/) installed. 

For Drupal 8 you will need [Composer](https://pantheon.io/docs/composer-drupal-8/) installed. 

You will need to install the appropriate Drupal module(s) and the AWS SDK. Then configure your Drupal site. There are directions here for Drupal 7 installation via Drush and Drupal 8 via Composer.
 
###Media Modules Setup (Optional)

<ul style="list-style: none;"><li>
You may want to enhance your Drupal media handling in conjunction with using AWS S3.
 <!-- Nav tabs -->
 <ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#28-step6" aria-controls="28-step6" role="tab" data-toggle="tab">Drupal 7</a></li>
  <li role="presentation"><a href="#29-step6" aria-controls="29-step6" role="tab" data-toggle="tab">Drupal 8</a></li>
 </ul>
 <!-- Tab panes -->
 <div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="28-step6">
  <br/>
  To have solid, viewable, manageable Drupal 7 file handling (See: <a href="https://www.drupal.org/node/1699054">Media 2.x Quick Start Guide</a>), install:<br />   
  Ctools, File Entity, Views, and Entity View Modes
  <pre><code class="bash hljs">
  $ drush en ctools file_entity views entity_view_mode -y
  </code></pre>
  
  Then install: Media 2.x  module (e.g. 7.x-2.0-beta2) 
  <pre><code class="bash hljs">
  $ drush dl --select media 
  </code></pre>
  The output of the above command will allow you to select the latest, stable 2.x version.
 </div>
  <div role="tabpanel" class="tab-pane" id="29-step6">
   <br/>
   The state of the Media module in D8 is still in flux, see: <a href="https://www.drupal.org/node/2595163">Media</a>.
  </div>
 </div> 
       </li></ul>

###S3 File System (s3fs) Module Installation

<ul style="list-style: none;"><li>
Install the S3 File System modules.
 <!-- Nav tabs -->
 <ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#30-step6" aria-controls="30-step6" role="tab" data-toggle="tab">Drupal 7</a></li>
  <li role="presentation"><a href="#31-step7" aria-controls="31-step7" role="tab" data-toggle="tab">Drupal 8</a></li>
 </ul>
 <!-- Tab panes -->
 <div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="30-step6">
  <br/>
  Install: Libraries and S3 File System  modules:
  <pre><code class="bash hljs">
  $ drush en libraries s3fs -y
  </code></pre>
  
  Get AWS SDK Library (requires using version 2.x):
  <pre><code class="bash hljs">
  $ drush make --no-core sites/all/modules/contrib/s3fs/s3fs.make 
  </code></pre>
  The above command will add the AWS SDK version 2.x into the s3fs module directory.
 </div>
  <div role="tabpanel" class="tab-pane" id="31-step7">
   <br/>
   <p>Install s3fs module and AWS SDK 3.x using Composer.</p>   
   First, ensure that the Composer for your site will first look to Drupal's preferred package source to find modules: 
   <pre><code class="bash hljs">
   $ composer config repositories.drupal composer https://packages.drupal.org/8
   </code></pre>
   Install s3fs module from the preferred package source:
   <pre><code class="bash hljs">
   $ composer require drupal/s3fs --prefer-dist
   </code></pre>
  </div>
 </div> 
       </li></ul>


###S3 File System (s3fs) Module Configuration

Settings can be established via the Drupal admin after module installation:   
admin/config/media/s3fs/settings

###Configure Your S3 bucket information
 
Set:    
Amazon Web Services Access Key   
Amazon Web Services Access Key   
S3 Bucket Name   
S3 Region  
 
Optionally, set:

Use a CNAME - Serve files from a custom domain, instead of "BUCKET_NAME.s3.REGION.amazonaws.com".   
To use this technique so that your file paths are pretty when served from your S3 bucket, you will need to make a corresponding CNAME entry where your DNS is maintained.

Root Folder - S3 File System uses the specified folder as the root of the file system within your bucket (if blank, the bucket root is used).   
This may be a desirable extra organizational step.

NOTE: Or your s3fs settings can be set in settings.php, for example:   
$conf['awssdk2_access_key'] = <YOUR ACCESS KEY>;   
$conf['awssdk2_secret_key'] = <YOUR SECRET KEY>;

###Synchronize the S3 Bucket and Drupal Files 
You need to run Actions that s3fs module provides either via the admin or drush to sync up the S3 bucket with Drupal.

__Action.__   
If you have files on S3 already that are not known to Drupal, refresh the files metadata cache:   
drush s3fs-refresh-cache

__Action.__   
If you have files in Drupal that need inclusion with S3 run:   
drush s3fs-copy-local

If you receive an Access Denied error message from Amazon, check the permissions on your bucket. Check that all your configuration settings in Drupal are complete and accurate. 

###Configure Your Site to Use s3fs 
admin/config/media/file-system
 
Set "Default download method" to "Amazon Simple Storage Service" and/or
        
Add a field of type File, Image, etc. and set the "Upload destination" to "Amazon Simple Storage Service" in the "Field Settings" tab.


###S3 File System CORS Upload (s3fs_cors) Module Installation

<ul style="list-style: none;"><li>
You can enhance your Drupal media handling amd interface with your S3 bucket by having you file uploads go directly to you S3 bucket.
 <!-- Nav tabs -->
 <ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#32-step6" aria-controls="32-step6" role="tab" data-toggle="tab">Drupal 7</a></li>
  <li role="presentation"><a href="#33-step7" aria-controls="33-step7" role="tab" data-toggle="tab">Drupal 8</a></li>
 </ul>
 <!-- Tab panes -->
 <div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="32-step6">
  <br/>
  Install s3fs_cors module using Drush:
  <pre><code class="bash hljs">
  $ drush en jquery_update s3fs_cors -y
  </code></pre>
  The output of the above command will allow you to select the latest, stable 2.x version.
 </div>
  <div role="tabpanel" class="tab-pane" id="33-step7">
   <br/>
   Install s3fs_cors module using Composer:
   <pre><code class="bash hljs">
   $ composer require drupal/s3fs_cors --prefer-dist
   </code></pre>
  </div>
 </div> 
       </li></ul>

###S3 File System CORS Upload (s3fs_cors) Module Configuration

In s3fs_cors admin:
/admin/config/media/s3fs/cors

Set “CORS Origin” = <YOUR DOMAIN>

Note: An individual file path max length = 250 chars

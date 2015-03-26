---
title: CloudFront CDN Setup for WordPress on Pantheon 
description: Stpes necessary to setup and configure CloudFront CDN and WordPress on Pantheon
category:
  - going-live
  - developing

---

## Before You Start
To use this guide, you wil need a WordPress site setup on Pantheon. If you already have a site setup, make sure it is in SFTP mode. If you don't have one, or you don't want to try it out on your existing site, spin up a new sandbox WordPress install and complete the 5 minute install.

From start to finish, this guide should take you about 15 minutes to complete including setting up a sandbox 

## What is Amazon CloudFront

CloudFront is a pull-only Content Distribution Network (CDN). All requests for assets go through CloudFront and if the CDN's cached version has expired or is missing, a fresh copy will be pulled from the origin (your site).

## Setting up Amazon and S3
Before you can begin using Amazon's CloudFront, you have to set it up. This is a three step process. 

1. Create an account. 
If you already have an account with AWS, you are good to go. Otherwise, you will need to create one. Amazon offers free access to most of their services for the first year. This allows you to build out new systems and test things out before commiting money to the project. In creating an account,y ou will have to enter a credit card number in case you go over the caps put on the free account. 
1. Create an IAM User
IAM (Identify And Management) is how AWM manages permissions. Before you can use CloudFront, you need to need to create an IAM user. From your AWS Dashboard, click on "Users" and then "Create New User". Enter a descriptive user name in the first box and then click "Create". On the next page, you will be given the option to see the newly created user's security credentials. View them or download them. IMPORTANT: This is the only time you will be able to see the user's "Secret Access Key". If you view it, copy and paste somewhere secure, if you download it, store it somehwere safe. You will need this information when setting up your plugin. Once you have the credentials stored safely, click "Close" at the bottom of the screen to return to the list of users.
1. Assign Policies
Finally we need to give our user permission to manage things. Specifically, the thing we want this user to be able to manage is S3, since that is where things will be stored. 
  1. From the user screen, click on the user.
  1. From the User Summary screen, click on "Attach Policy"
  1. Scroll down until you find "AmazonS3FullAccess". Check the box next to it. 
  1. Confirm your selection by clicking on "Attach Policy".

## Setting up WordPress
Now that we have Amazon S3 setup and ready to use, let's turn our attention to WordPress. Like every problem in WordPress, there is a plugin to help us use Amazon CloudFront. Actually, there are several. The most popular by far is [W3 Total Cache](). This is a beast of a plugin that does a lot of things very well. However, we are focusing on a single task in this guide, so we are going to use [Amazon S3 and CloudFront]() by Brad Touesnard. 

1. Open your WordPress powered site and log in.
1. Click on "Plugins" and then "Add New". 
1. Paste the name of the plugin in the "Search Plugins" box and press ENTER.
1. When the list of matching plugins appears, select "Amazon S3 and CloudFront" and click "Install Now"
1. Confirm that you wish to install the plugin by clicking "OK"
1. Once installed Click "Activate Plugin" to continue to the next step
1. "Amazon S3 and CloudFront" needs the [Amazon Web Services]() plugin to operate. Thankfully "Amazon S3 and CloudFront" detects this and asked you if it can install it for you, when asked, Confirm and it will install the "Amazon Web Services" plugin and then activate both of them for you.
1. Click on "AWS" in your main WordPress Dashboard Admin Menu and then on "Settings". This will take you to the very sparse settings page for AWS. There are only 2 settings you need to set, and for security reasons, you don't set them here. In the previos section, you should have secured the credentials for your new AWS user. You will need them now. As the settings page explain, for security reasons, you do not want these stored in the database. You can if you insiste - the screen gives you the option to do so - but **it is a bad idea**.
A better idea is to edit your `wp-config.php` file and add the credentials there as described on the settings page. Once you have done that, refresh the page and it will tell you that everything is setup.
1. Click on "AWS" and then "S3 and CloudFront". Here you have options. The first thing, and the only required thing, you have to do is to create an S3 bucket. You can if you want to, set this up using your AWS Dashboard and simply paste the name of your bucket here. However, if everything is setup prpoperly, creating the bucket from within the pluin ensures that permissions are set properly.
1. Ensure that "Copy Files to S3" and "Rewrite File URLs" are both set to "ON". 

There are several other options available in the plugin, yuo can experiment with them to find the best settings for your particular situation.

To test to see if everything is setup properly follow these steps.

1. Go to WordPress' Media library and upload a new image. 
1. Wait a minute or so for the image to be uploaded to S3. 
1. Create a new post.
1. From the Media Library select your new image. 
1. If you are using the visual editor, swap to the text editor and then locate the image tag's source. Is it your Pantheon sandbox or is it your Amazon S3 bucket. If you've followed the instructiosns correctly, then the src of the image tag should point to your newly created S3 bucket. Congratulations.

## Setting up CloudFront
So far, we have setup access to Amazon's S3 service, hooked our WordPress powered site to it so that anything uploaded,automatically gets pushed up to our S3 bucket and served from there. Now for the final final step, turning on Amazon's CloudFront.  By turning on CloudFront, and ooking our S3 bucket up to it, Amazon will automatically distribute your meda golabally so your pages will load fast around the world. 

1. Log back into your Amazon Dashboard. 
1. Click on "Services" at the top, and find "CloudFront".
1. Click on "Create Distribution".
1. Click on "Get Started" in the "Web" section as we are creating a Web based CloudFront.
1. Click in the "Origin Name" field and select your S3 bucket that you created for your WordPress powered site. This action will also fill in the other required field, "Origin ID".
1. Review the other options and configure as you see fit, it is safe to use the defaults until you understand their meaning.
1. Click on "Create Distribution"

This will return you to the "CloudFront Distributions" page. You will notice that your distribution is Enabled but that the Status is "In Progress". Depending on how many images you have uploaded into your S3 bucket, this could take from 10 minutes to a very long time. Tem minutes however, seems to be the minimum.

Once complete, your site will now have Amazon CloudFront serving all of your media.

## Conclusion
As stated, there are other plugins that will manage S3 and CloudFront for you. You may want to experiment with them before setteling on the one that works best for you. The "Amazon S3 and CloudFront" plugin is easy to setup but lacks such basic features as uploading all of your existing media to S3. Their Pro edition that is being built has this feautre, but so does the free version of "W3 Total Cache".

Pantheon is a fast platofmr for serving your WordPress powered site, but a CDN will make it even faster. Amazon's S3 and CloudFront make a solid and affordable CDN and a great compliment to Panthon's native speed.


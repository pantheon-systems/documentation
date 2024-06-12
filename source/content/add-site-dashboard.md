---
title: Create a New CMS Site
description: Create a WordPress or Drupal site using the Dashboard.
contributors: [wordsmither]
contenttype: [doc]
innav: [true]
categories: [create]
cms: [wordpress, drupal]
audience: [developers]
product: [--]
integration: [--]
tags: [--]
showtoc: true
---

 Pantheon CMS site contains three components: code, files, and a database containing the content and configurations of your Content Management System (CMS). When you create a site, you are creating each of these components in the Dev environment. Then, when you are ready, you will create your Test and Live environments.

 <Wistia src="kprkgaikos" />

## Create the Dev Environment

To create a CMS site:


<Partial file="dashboard-site-creation-1.md" />


### Install the CMS

<Partial file="cms-dev.md" />

You have successfully finished adding a site in its Dev environment.  Click **Visit Dev Site** to view your site.

## Create the Test environment

<Partial file="test-initialize.md" />

You have successfully finished adding a site in its Test environment.  Click **Visit Test Site** to view your site.

## Create the Live environment

After you [purchase a plan](/guides/getstarted/purchase), you can deploy your site live.  But first, you have to create the Live environment.

<Alert title="Warning" type="danger" >

When you complete this step, your site will be live for anyone to see, at the Pantheon URL. For detailed information about launching your site, refer to our [Launch Essentials](/guides/launch/) guide.

</Alert>

<Partial file="live-initialize.md" />

You have successfully finished adding a site in its Live environment.  Click **Visit Live Site** to view your site.

At this point, you have a live site with a Pantheon URL, like `http://my-site.pantheonsite.io/`. To change that to a more friendly URL, you'll need to purchase a domain from a DNS provider.  Refer to our [Domains on Pantheon Guide](/guides/domains) for more information.

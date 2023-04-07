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
---

A Pantheon CMS site contains two components: code, and a CMS (Content Management System).  When you create a site, you are creating both of these components in the Dev environment.  Then, when you are ready, you will do the same for your Test and Live environments.

At a high level, this is what you'll be doing:

1. Use the <Icon icon="plus" text="Create New Site"/> button create the Dev environment for your code.
1. Install the CMS for the Dev environment.
1. Initialize the Test environment.
1. Install the CMS for the Test environment.
1. Initialize the Live environment.
1. Install the CMS for the Live environment.

## Create the Dev Environment for Your Code

To create a CMS site:

1. Open your Personal or Professional Workspace dashboard and select the <Icon icon="plus" text="Create New Site"/> button on the lower right side of the page.

   ![Create new site button](../images/create-new-site-button.png)

1. Select **WordPress** or **Drupal**.

   ![Select CMS](../images/create-new-site-cms.png)

   If you select Drupal, you will have the option to select the Drupal version you want to use.

   ![Select Drupal version](../images/create-new-site-cms-drupal.png)

1. Enter the name and select a region for this site. If this site is to be part of a Professional Workspace, select a Workspace from **Choose a Workspace for the Site**. Click **Continue**. It can take several minutes to create a new site on Pantheon.

   ![Enter site information](../images/create-new-site-info.png)

   <Alert title="Note" type="info" >

   You can navigate away from this page during this process, but later, you'll have to go to the **Sites** tab to access your site.  If possible, stay on this tab to simplify accessing the site when the creation is complete.

   </Alert>

1. Click **Visit your Pantheon Site Dashboard** when the process is complete.

   ![Site creation completed](../images/create-site-done.png)

You've now created the core portion of your Dev environment; now you have to install the CMS.

## Install the CMS for the Dev Environment

<Partial file="cms-dev.md" />

## Initialize the Test environment

<Partial file="test-initialize.md" />

## Install the CMS for the Test environment

<Partial file="cms-test.md" />

## Initialize the Live environment

<Partial file="live-initialize.md" />

## Install the CMS for the Live environment

<Partial file="cms-live.md" />

At this point, you have a live site with a Pantheon URL, like `http://my-site.pantheonsite.io/`. To change that to a more friendly URL, you'll need to purchase a domain from a DNS provider.  Refer to our [Domains on Pantheon Guide](/guides/domains) for more information.


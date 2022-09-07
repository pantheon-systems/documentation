---
title: Quick Start
subtitle: Create a New Site
description: In part three of our Quick Start guide, learn how to create your new Pantheon site.
anchorid: create-new-site
generator: pagination
layout: guide
categories: [get-started]
tags: [dashboard, users, workflow]
type: guide
permalink: docs/guides/quickstart/create-new-site/
editpath: quickstart/03-create-new-site.md
image: launchGuide-twitterLarge
---

Our next step is to create and configure a new WordPress or Drupal site.

Before you begin, you need a Pantheon account. If you don't have one, [sign up now for free](https://pantheon.io/register?docs).

To create your site: 

1. Log in to your Pantheon account. 

   <Alert title="Note" type="info">

   If you registered as an agency, and this is your first time logging in, you’ll land on your Organization Dashboard. Navigate to your User Dashboard by selecting your name in the menu bar, then **My Dashboard**.

   </Alert>

1. Select <Icon icon="plus" text="Create New Site"/>. You’ll be asked to name this site and, if you’re part of an agency, associate this site with your organization.

1. Select **Continue** to choose from the available site frameworks.

   <Alert title="Note" type="info">

   Eligible Organizations can add their own sites to this list! We call these [Custom Upstreams](/guides/custom-upstream), and they function as common start states. Organizations use them to spin up multiple sites with the same codebase, modules, plugins, themes, etc., and to make quick updates to these sites en masse.

   </Alert>

1. For the purpose of this guide, deploy WordPress, Durpal with Composer, or Drupal 7, by clicking the appropriate button. 

1. Enter the name for this site, and if you're part of an agency, associate this site with your organization.

   It can take several minutes to create a new site on Pantheon. This is because of all the processes running behind the scenes. Our platform first creates fresh containers, just for your site. We then install PHP, NginX, and MariaDB. Finally we pull the latest version of your content management system (CMS) from either our upstream repository or your Private Upstream.

1. When the process is complete, click **Visit your Pantheon Site Dashboard**.  Your **Site Dashboard** looks like this:

     ![Site Dashboard in the Dev tab shows the Visit Development Site button](../../../images/dashboard/site-dashboard-dev.png)


1. Access your new site by clicking <Icon icon="new-window-alt" text="Visit Development Site"/> and follow the prompts to complete the installation of your site.

   <Alert title="Note" type="info">

   Record your new username and password. You’ll need this information again soon.

   </Alert>

Congratulations! You just installed a new site on Pantheon. When you're ready, continue to the next lesson.

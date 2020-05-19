---
title: Quick Start
subtitle: Create New Site
description: In part three of our Quick Start guide, learn how to create your new Pantheon site.
quickstart: true
anchorid: create-new-site
generator: pagination
layout: guide
type: guide
pagination:
  provider: data.quickstartpages
use:
  - quickstartpages
permalink: docs/guides/quickstart/create-new-site/
nexturl: guides/quickstart/site-dashboard/
nextpage: Site Dashboard
previousurl: guides/quickstart/user-dashboard/
previouspage: User Dashboard
editpath: quickstart/03-create-new-site.md
image: launchGuide-twitterLarge
---

In this lesson, we’re going to create and configure a new WordPress or Drupal site.

**Watch the video:**

<Youtube src="NBL2Ejh8TI4" title="Create New Site" />

**Create your site:**

1. Log in to your Pantheon account. By default you land on the **Sites** tab of your User Dashboard. Here you’ll see the sites you’ve created or the sites you’ve been added to. If you just created your account you may not see any sites.

   <Alert title="Note" type="info">

   If you registered as an agency, and this is your first time logging in, you’ll land on your Organization Dashboard. Navigate to your User Dashboard by selecting your name in the menu bar, then **My Dashboard**.

   </Alert>

2. Select <Icon icon="plus" text="Create New Site"/>. You’ll be asked to name this site and, if you’re part of an agency, associate this site with your organization.

3. Select **Continue** to choose from the available site frameworks.

   <Alert title="Note" type="info">

   Eligible Organizations can add their own sites to this list! We call these [Custom Upstreams](/custom-upstream), and they function as common start states. Organizations use them to spin up multiple sites with the same codebase, modules, plugins, themes, etc., and to make quick updates to these sites en masse.

   </Alert>

4. For the purpose of this guide, deploy WordPress or Drupal 8 by clicking the appropriate button. This takes a few moments. So while you wait, learn what’s happening behind the scenes:

   <Accordion title="Deploy a Site on Pantheon (optional)" icon="lightbulb" id="understand-deploy" >

   It can take 2 or more minutes to create a new site on Pantheon. This is because of all the processes running behind the scenes. Our platform first creates fresh containers, just for your site. We then install PHP, NginX, and MariaDB. Finally we pull the latest version of your content management system (CMS) from either our upstream repository or your Private Upstream.

   </Accordion>

5. Complete? Click **Visit your Pantheon Site Dashboard**.

6. We’ll explore the Site Dashboard in the next lesson. For now, access your new site by clicking <Icon icon="new-window-alt" text="Visit Development Site"/> and follow the prompts to complete the installation of your site.

   <Alert title="Note" type="info">

   Record your new username and password. You’ll need this information again soon.

   </Alert>

Congratulations! You just installed a new site on Pantheon. When you're ready, you may continue to the next lesson.

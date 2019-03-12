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

<div class="panel panel-drop panel-guide">
<script src="//fast.wistia.com/embed/medias/6fvbeowg58.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_6fvbeowg58 videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div>
</div>

**Create your site:**

1. Log in to your Pantheon account. By default you land on the **Sites** tab of your User Dashboard. Here you’ll see the sites you’ve created or the sites you’ve been added to. If you just created your account you may not see any sites.

    <div class="alert alert-info">
    <h4 class="info">Note</h4>
    <p markdown="1">If you registered as an agency, and this is your first time logging in, you’ll land on your Organization Dashboard. Navigate to your User Dashboard by selecting your name in the menu bar, then **My Dashboard**.
    </p></div>

2. Select **<span class="glyphicons glyphicons-plus" aria-hidden="true"></span> Create New Site**. You’ll be asked to name this site and, if you’re part of an agency, associate this site with your organization.

3. Select **Continue** to choose from the available site frameworks.

    <div class="alert alert-info">
    <h4 class="info">Note</h4>
    <p>Eligible Organizations can add their own sites to this list! We call these [Custom Upstreams](/docs/custom-upstream/), and they function as common start states. Organizations use them to spin up multiple sites with the same codebase, modules, plugins, themes, etc., and to make quick updates to these sites en masse.
    </p></div>

4. For the purpose of this guide, deploy WordPress or Drupal 8 by clicking the appropriate button. This takes a few moments. So while you wait, learn what’s happening behind the scenes:

    <div class="panel panel-drop panel-guide" id="accordion">
      <div class="panel-heading panel-drop-heading">
         <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#understand-deploy"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-lightbulb"></span> Deploy a Site on Pantheon (optional)</h3></a>
       </div>
       <div id="understand-deploy" class="collapse">
         <div class="panel-inner" markdown="1">
          It can take 2 or more minutes to create a new site on Pantheon. This is because of all the processes running behind the scenes. Our platform first creates fresh containers, just for your site. We then install PHP, NginX, and MariaDB. Finally we pull the latest version of your content management system (CMS) from either our upstream repository or your Private Upstream.
        </div>
       </div>
     </div>

5. Complete? Click **Visit your Pantheon Site Dashboard**.

6. We’ll explore the Site Dashboard in the next lesson. For now, access your new site by clicking **<span class="glyphicons glyphicons-new-window-alt" aria-hidden="true"></span> Visit Development Site** and follow the prompts to complete the installation of your site.

    <div class="alert alert-info">
    <h4 class="info">Note</h4>
    <p>Record your new username and password. You’ll need this information again soon.
    </p></div>

Congratulations! You just installed a new site on Pantheon. When you're ready, you may continue to the next lesson.

---
title: Getting Started
subtitle: Create New Site
guidetoc: true
guidepage: true
anchorid: create-new-site
generator: pagination
layout: guide
pagination:
    provider: data.gettingstartedpages
use:
    - gettingstartedpages
permalink: docs/guides/getting-started/create-new-site/
nexturl: getting-started/site-dashboard/
nextpage: Site Dashboard
previousurl: getting-started/user-dashboard/
previouspage: User Dashboard
editpath: 03-create-new-site.md
---
In this lesson, we’re going to create and configure a new WordPress or Drupal site.

 <div class="panel panel-video" id="accordion">
      <div class="panel-heading panel-video-heading">
        <a class="accordion-toggle panel-video-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#ssh-task"><h3 class="panel-title panel-video-title" style="cursor:pointer;">Watch: Create New Site</h3></a>
      </div>
      <div id="ssh-task" class="collapse" style="padding:10px;">
        <script src="//fast.wistia.com/embed/medias/6fvbeowg58.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_mnuxft90ya videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div>
      </div>
    </div>

1. Navigate to the **Sites** tab of your User Dashboard.

2. Select **+ Create New Site**. You’ll be asked to name this site and, if you’re part of an agency, associate this site with your organization.

3. Select **Continue** and explore the available site types and pre-packaged distributions.

    <div class="alert alert-info">
    <h4 class="info">Note</h4>
    <p>Organizations can add their own sites to this list! We call these Private Upstreams, and they function as common start states. Organizations use them to spin up multiple sites with the same codebase, modules, plugins, themes, etc., and to make quick updates to these sites en masse.
    </p></div>

4. For the purpose of this Guide, deploy WordPress or Drupal 8 by clicking the appropriate button. This takes a few moments. So while you wait, learn what’s happening behind the scenes:

    <div class="panel panel-video" id="accordion">
        <a class="accordion-toggle panel-video-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#user-dashboard-tour"><h3 class="panel-title panel-video-title" style="cursor:pointer;">Understand: Deploy a Site on Pantheon</h3></a>
    <hr><div markdown="1"> It can take 2 or more minutes to create a new site on Pantheon. This is because of all the processes running behind the scenes. Our platform first creates fresh containers, just for your site. We then install PHP, NginX, and MariaDB. Finally we pull the latest version of your content management system (CMS) from either our upstream repository or your Private Upstream.
    </div>
    </div>
</div>

5. Complete? Click **Visit your Pantheon Site Dashboard**.

6. We’ll explore the Site Dashboard in the next lesson. For now, access your new site by clicking **Visit Development Site** and follow the prompts to complete the installation of your site.

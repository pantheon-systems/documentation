---
title: Getting Started
subtitle: Create Test & Live
guidepage: true
anchorid: create-test-live
generator: pagination
layout: guide
pagination:
    provider: data.gettingstartedpages
use:
    - gettingstartedpages
permalink: docs/guides/getting-started/create-test-live/
nexturl: getting-started/clone-live-to-dev/
nextpage: Clone Live to Dev
previousurl: getting-started/site-dashboard/
previouspage: Site Dashboard
editpath: 05-create-test-live.md
---
In this lesson, we’re going to to create our Test site and our Live site, which we just learned about in the previous lesson.

<div class="panel panel-video panel-guide" id="accordion">
    <div class="panel-heading panel-video-heading">
        <a class="accordion-toggle panel-video-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#ssh-task"><h3 class="panel-title panel-video-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-facetime-video"></span> Watch: Create Test &amp; Live Environments (optional)</h3></a>
      </div>
     <div id="ssh-task" class="collapse" style="padding:10px;">
        <script src="//fast.wistia.com/embed/medias/hzbsff4k6c.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_hzbsff4k6c videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div>
      </div>
    </div>

<div class="alert alert-danger" role="alert">
  <h4 class="info">Warning</h4>
  <p>If you haven’t completed the installation of your Dev site, return to <a href=
  "/docs/guides/getting-started/create-new-site">Create New Site</a>, and do this now, before proceeding.</p>
</div>

1. Navigate to your Site Dashboard and click the **<span class="glyphicons glyphicons-equalizer" aria-hidden="true"></span> Test** tab. Here you’ll have access to your Test environment, but it hasn’t been created yet. Do this now by clicking **Create Test Environment**.

  This takes a few moments.

2. Now click **<span class="glyphicons glyphicons-new-window-alt" aria-hidden="true"></span> Visit Test Site**. This will open your Test site in a new browser tab with the URL `test-YOURSITE.pantheonsite.io`.

3. Navigate back to your Site Dashboard, and click the **<span class="glyphicons glyphicons-cardio" aria-hidden="true"></span> Live** tab. Here again you need to create the environment. Do this now by clicking **Create Live Environment**.

4. This time, while we wait, let’s click on **Workflows <span class="glyphicons glyphicons-chevron-down" aria-hidden="true"></span>** In the dropdown you’ll find your active workflow as well as those workflows we’ve completed to this point.

Congratulations! You now have 3 copies of your site running in 3 separate environments: Dev, Test, and Live.

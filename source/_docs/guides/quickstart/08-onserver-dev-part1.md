---
title: Quick Start
subtitle: On-Server Dev, Part 1
description: In part eight of our Quick Start guide, learn about on-server development on Pantheon.
quickstart: true
anchorid: onserver-dev-part1
generator: pagination
layout: guide
type: guide
pagination:
    provider: data.quickstartpages
use:
    - quickstartpages
permalink: docs/guides/quickstart/onserver-dev-part1/
nexturl: guides/quickstart/onserver-dev-part2/
nextpage: On-Server Dev, Part 2
previousurl: guides/quickstart/connection-modes/
previouspage: Connection Modes
editpath: quickstart/08-onserver-dev-part1.md
image: launchGuide-twitterLarge
---

In this lesson, we’re going to work directly on the server. We’ll make changes to our Dev site, review them on our Test site, then deploy them to Live.

**Watch the video:**
<div class="panel panel-drop panel-guide">
<script src="//fast.wistia.com/embed/medias/s5be7ic569.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_s5be7ic569 videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div>
</div>

**Try it yourself:**

1. Navigate to **<span class="glyphicons glyphicons-embed-close" aria-hidden="true"></span> Code** in the **<span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev** tab of your Site Dashboard. Confirm your Connection Mode is set to **SFTP**.

2. Now log in to your Dev site by clicking the **<span class="glyphicons glyphicons-new-window-alt" aria-hidden="true"></span> Site Admin** button.

3. Install a _new_ theme (i.e., do not activate/enable a theme that came pre-packaged with your site).

If you need help with this step, please reference the [WordPress Codex](https://codex.wordpress.org/Using_Themes#Adding_New_Themes_using_the_Administration_Panels){.external} or [Drupal Documentation](https://www.drupal.org/docs/user_guide/en/extend-theme-install.html){.external} for installing a new theme.

4. Activate/enable the new theme you just installed in Step 3. Now view your site to confirm the theme change.

5. Return to the **<span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev** tab of your Site Dashboard. The files you just added are highlighted.

    <div class="alert alert-info">
    <h4 class="info">Note</h4>
    <p>You may need to refresh your dashboard to see these files in your Dev environment.
    </p></div>

6. Add a commit message, then click **Commit** to add these files to your Dev environment.

    <div class="alert alert-info">
    <h4 class="info">Note</h4>
    <p>In the Dev environment, you can’t make a commit without first adding a commit message.
    </p></div>

    Ok, now let’s review the new theme in your Test environment.

7. Navigate to the **<span class="glyphicons glyphicons-equalizer" aria-hidden="true"></span> Test** tab and click **<span class="glyphicons glyphicons-refresh" aria-hidden="true"></span> Deploys**. As you can see, 1 commit is ready to deploy from the Dev environment.

8. Let’s review the new theme with the new content we added in the Live environment. Check the box for **Pull files and the database from the Live environment**.

9. Again, consider creating a backup before proceeding:

    <div class="panel panel-drop panel-guide" id="accordion">
      <div class="panel-heading panel-drop-heading">
         <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#create-backup"><h3 class="panel-title panel-drop-title" style="cursor:pointer;">Create Backup (optional)</h3></a>
      </div>
      <div id="create-backup" class="collapse">
        <div class="panel-inner" markdown="1">
          The Backups tab is where you manage all the details for your site's backup. A backup is composed of 3 separate archives for database, files, and code. Let’s create a backup now:

          1. Click **<span class="glyphicons glyphicons-cloud-upload" aria-hidden="true"></span> Backups** on the <span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> **Dev** tab of your Site Dashboard.
          2. Click **Create New Backup**.
          3. Click **<span class="glyphicons glyphicons-refresh"></span> Deploys** to return to the lesson.
        </div>
     </div>
    </div>

    <div class="alert alert-danger" role="alert">
      <h4 class="info">Warning</h4>
      <p>As intended, the following action will overwrite your Test database and files. If you skipped this backup task you will be unable to recover this data hereafter.</p>
    </div>

10. Add a Deploy Log Message (optional), then click **Deploy Code from Development to Test Environment**.

    <div class="panel panel-drop panel-guide" id="accordion">
       <div class="panel-heading panel-drop-heading">
          <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#understand-deploy"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-lightbulb"></span> Deploy Commits to Test (optional)</h3></a>
        </div>
        <div id="understand-deploy" class="collapse">
          <div class="panel-inner" markdown="1">
            Test is a separate environment from Dev, with its own codebase, database, and media files. When you deploy code from Dev, the platform leverages Git to pull any code changes into your Test environment.
          </div>
        </div>
      </div>

11. When the deployment finishes, click **<span class="glyphicons glyphicons-new-window-alt" aria-hidden="true"></span> Site Admin** to navigate to your Test site. Here you’ll notice that your theme is installed, but not active/enabled. You’ll also find that your content has been pulled “down” from Live.

12. Activate/enable your theme. Again, if you need help with this step, please reference the [WordPress Codex](https://codex.wordpress.org/Using_Themes){.external} or [Drupal Documentation](https://www.drupal.org/docs/user_guide/en/extend-theme-install.html){.external}.

13. Review your Test site. Does everything look correct? If yes, navigate to **<span class="glyphicons glyphicons-refresh" aria-hidden="true"></span> Deploys** on the **<span class="glyphicons glyphicons-cardio" aria-hidden="true"></span> Live** tab of your Site Dashboard.

14. Add a Deploy Log Message (optional), then click **Deploy Code from Test to Live Environment**.

15. When this is finished, you’ll again need to activate/enable the new theme on your Live site.

Congratulations! You just performed on-server development. You made changes on your Dev site, reviewed them on your Test site, then deployed them to Live.

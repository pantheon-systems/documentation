---
title: Getting Started
subtitle: On Server Dev, Part 1
guidepage: true
anchorid: onserver-dev-part1
generator: pagination
layout: guide
pagination:
    provider: data.gettingstartedpages
use:
    - gettingstartedpages
permalink: docs/guides/getting-started/onserver-dev-part1/
nexturl: getting-started/onserver-dev-part2
nextpage: On-Server Dev, Part 2
previousurl: getting-started/connection-modes
previouspage: Connection Modes
---

In this lesson, we’ll make changes to our Dev site, review these changes on our Test site, then deploy them in Live.

1. Navigate to **</> Code** in the Dev tab of your Site Dashboard. Confirm your Connection Mode is set to **SFTP**.

2. Now log in to your Dev site by clicking the **Visit Admin** button.

3. Install a new theme (i.e., not a theme that came pre-packaged with your site).

  If you need help with this step, please reference the WordPress Codex or Drupal Documentation for installing a new theme.

4. Activate/enable the new theme you just installed in Step 3.

5. Return to the Dev tab of your Site Dashboard. The files you just added are highlighted in yellow.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p>You may need to refresh your dashboard to see these files in your Dev environment.
</p></div>

6. Add a commit message, then click **Commit** to add these files to your Dev environment.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p>In the Dev environment, you can’t make a commit without first adding a commit message.
</p></div>

7. Ok, now let’s review the new theme in your Test environment. Navigate to the **Test** tab and click **Deploys**. As you can see, 1 commit is ready to deploy from the Development environment.  

8. We want to review the new theme with the content we added previously, so check the box for **Pull files and the database from the Live environment**.

9. Consider creating a backup before proceeding. Open the task below to learn how.

<div class="alert alert-danger" role="alert">
  <h4 class="info">Warning</h4>
  <p>As intended, this action will overwrite your Test database and files. If you skipped the backup task you will be unable to recover this data hereafter.</p>
</div>

10. Add a Deploy Log Message (optional), then click **Deploy Code from Development to Test Environment**.

11. When the deployment finishes, click **Site Admin** to navigate to your Test site. Here you’ll notice that your theme is installed, but not active/enabled. You’ll also find that your content has been pulled “down” from Live.

12. Activate/enable your theme now. Again, if you need help with this step, please reference the WordPress Codex or Drupal Documentation.

13. Review your Test site. Does everything look correct? If yes, navigate to **Deploys** on the Live tab of your Site Dashboard.

14. Add a Deploy Log Message (optional), then click **Deploy Code from Test to Live Environment**.

15. When this is finished, you’ll again need to activate/enable the new theme on your Live site.  

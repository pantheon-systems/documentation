---
title: Getting Started
subtitle: On-Server Dev, Part 2
guidepage: true
anchorid: onserver-dev-part2
generator: pagination
layout: guide
pagination:
    provider: data.gettingstartedpages
use:
    - gettingstartedpages
permalink: docs/guides/getting-started/onserver-dev-part2/
nexturl: getting-started/next-steps
nextpage: Next Steps
previousurl: getting-started/onserver-dev-part1
previouspage: On-Server Dev, Part 1
---

In this lesson, we’re going to edit code directly. We’ll commit our edits to Dev, review in Test, and deploy to Live. Let’s get started!

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p>To complete this lesson, you need a basic understanding of CSS. If necessary, ask a colleague for help, or feel free to skip this lesson altogether.  
</p></div>

If you haven’t added a new theme to your site, please return to the previous lesson and do so now.

1. Navigate to **</> Code** in the Dev tab of your Site Dashboard. Confirm your Connection Mode is set to **SFTP**.

2. Click **SFTP Connection Info** to access the credentials for connecting to your preferred SFTP client.

3. Click **Open in your default SFTP client**, and enter your User Dashboard password when prompted.

  If you run into issues, please refer to this documentation.

4. Now open the **code** folder in your SFTP client, and navigate to the theme you installed previously.

5. Let’s make a significant change to your theme’s CSS; something you’ll easily spot when you look at the site.

6. Return to the **Dev** tab of your Site Dashboard. The files you just changed will be highlighted in yellow.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p>Click the highlighted file changes in the Dev environment, and you can view the specific _diff_.  
</p></div>

7. Add a commit message, then click **Commit** to add these files to your Dev environment.

8. Deploy your changes to the Test environment and review them. When you’re satisfied, deploy to the Live environment.

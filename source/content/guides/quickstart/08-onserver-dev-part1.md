---
title: Quick Start
subtitle: On-Server Dev, Part 1
description: In part eight of our Quick Start guide, learn about on-server development on Pantheon.
anchorid: onserver-dev-part1
layout: guide
categories: [get-started]
tags: [dashboard, iterate, site, workflow]
type: guide
permalink: docs/guides/quickstart/onserver-dev-part1/
editpath: quickstart/08-onserver-dev-part1.md
image: launchGuide-twitterLarge
---

In this lesson, we’re going to work directly on the server. We’ll make changes to our Dev site, review them on our Test site, then deploy them to Live.

**Watch the video:**

<Youtube src="FtY8CgEiPCM" title="Develop via the User Interface UI" />

**Try it yourself:**

1. Navigate to <Icon icon="embed-close" text="Code"/> in the <Icon icon="wrench" text="Dev"/> tab of your Site Dashboard. Confirm your Connection Mode is set to **SFTP**.

1. Now log in to your Dev site by clicking the <Icon icon="new-window-alt" text="Site Admin"/> button.

1. Install a _new_ theme (i.e., do not activate/enable a theme that came pre-packaged with your site).

If you need help with this step, please reference the [WordPress Codex](https://codex.wordpress.org/Using_Themes#Adding_New_Themes_using_the_Administration_Panels) or [Drupal Documentation](https://www.drupal.org/docs/user_guide/en/extend-theme-install.html) for installing a new theme.

1. Activate/enable the new theme you just installed in Step 3. Now view your site to confirm the theme change.

1. Return to the <Icon icon="wrench" text="Dev"/> tab of your Site Dashboard. The files you just added are highlighted.

  <Alert title="Note" type="info">

  You may need to refresh your dashboard to see these files in your Dev environment.

  </Alert>

1. Add a commit message, then click **Commit** to add these files to your Dev environment.

    <Alert title="Note" type="info">

    In the Dev environment, you can’t make a commit without first adding a commit message.

    </Alert>

    Ok, now let’s review the new theme in your Test environment.

1. Navigate to the <Icon icon="equalizer" text="Test" /> tab and click <Icon icon="refresh" text="Deploys" /> . As you can see, 1 commit is ready to deploy from the Dev environment.

1. Let’s review the new theme with the new content we added in the Live environment. Check the box for **Pull files and the database from the Live environment**.

1. Again, consider creating a backup before proceeding:

    <Accordion title="Create Backup (optional)" id="create-backup" >

    The Backups tab is where you manage all the details for your site's backup. A backup is composed of 3 separate archives for database, files, and code. Let’s create a backup now:

    1. Click <Icon icon="cloud-upload" text="Backups"/> on the <Icon icon="wrench" text="Dev"/> tab of your Site Dashboard.

    1. Click **Create New Backup**.

    1. Click <Icon icon="refresh" text="Deploys"/> to return to the lesson.

    </Accordion>

    <Alert title="Warning" type="danger">

      As intended, the following action will overwrite your Test database and files. If you skipped this backup task you will be unable to recover this data hereafter.

    </Alert>

1. Add a Deploy Log Message (optional), then click **Deploy Code from Development to Test Environment**.

    <Accordion title="Deploy Commits to Test (optional)" id="understand-deploy" icon="lightbulb">

    Test is a separate environment from Dev, with its own codebase, database, and media files. When you deploy code from Dev, the platform leverages Git to pull any code changes into your Test environment.

    </Accordion>

1. When the deployment finishes, click <Icon icon="new-window-alt" text="Site Admin"/> to navigate to your Test site. Here you’ll notice that your theme is installed, but not active/enabled. You’ll also find that your content has been pulled “down” from Live.

1. Activate/enable your theme. Again, if you need help with this step, please reference the [WordPress Codex](https://codex.wordpress.org/Using_Themes) or [Drupal Documentation](https://www.drupal.org/docs/user_guide/en/extend-theme-install.html).

1. Review your Test site. Does everything look correct? If yes, navigate to <Icon icon="refresh" text="Deploys"/> on the <Icon icon="cardio" text="Live"/> tab of your Site Dashboard.

1. Add a Deploy Log Message (optional), then click **Deploy Code from Test to Live Environment**.

1. When this is finished, you’ll again need to activate/enable the new theme on your Live site.

Congratulations! You just performed on-server development. You made changes on your Dev site, reviewed them on your Test site, then deployed them to Live.

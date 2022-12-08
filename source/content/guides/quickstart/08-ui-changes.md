---
title: Quick Start
subtitle: Make User Interface Changes
description: In part eight of our Quick Start guide, learn to make UI changes on your site.
anchorid: ui-changes
layout: guide
contenttype: [guide]
categories: [overview]
newcms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [dashboard, iterate, site, workflow]
type: guide
showtoc: true
permalink: docs/guides/quickstart/ui-changes/
editpath: quickstart/08-ui-changes.md
image: launchGuide-twitterLarge
---

Now we’re going to work directly on the server to make changes to our site's user interface (UI).

## Make the Change in Dev

1. Go to **Site Dashboard**, select the **Dev** tab, and then select **Code**. 

1. Confirm your Connection Mode is set to **SFTP**.

1. Log in to your Dev site by clicking the <Icon icon="new-window-alt" text="Site Admin"/> button.

1. Install a _new_ theme (do not activate/enable a theme that came pre-packaged with your site).

   If you need help with this step, refer to the [WordPress Codex](https://codex.wordpress.org/Using_Themes#Adding_New_Themes_using_the_Administration_Panels) or [Drupal Documentation](https://www.drupal.org/docs/user_guide/en/extend-theme-install.html) for installing a new theme.

1. Activate/enable the new theme you installed. Now view your site to confirm the theme change.

1. Return to **Site Dashboard** and select the **Dev** tab. The files you just added are highlighted.

  <Alert title="Note" type="info">

  You may need to refresh your dashboard to see these files in your Dev environment.

  </Alert>

1. Add a commit message, then click **Commit** to add these files to your Dev environment.

    <Alert title="Note" type="info">

    In the Dev environment, you can’t make a commit without first adding a commit message.

    </Alert>

1. Review your changes in Dev.

## Review the Change in Test

1. Go to your **Site Dashboard**, select the **Test** tab, and then select **Deploys**. As you can see, 1 commit is ready to deploy from the Dev environment.

1. Check the **Pull files and the database from the Live environment** box.

1. Consider creating a backup before proceeding:

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

1. Click <Icon icon="new-window-alt" text="Site Admin"/> when the deployment completes to go to your Test site. Here you’ll notice that your theme is installed, but not active/enabled. You’ll also find that your content has been pulled “down” from Live.

1. Activate/enable your theme. If you need help with this step, refer to the [WordPress Codex](https://codex.wordpress.org/Using_Themes) or [Drupal Documentation](https://www.drupal.org/docs/user_guide/en/extend-theme-install.html).

1. Review your Test site. 

## Deploy to Live

1. Review the changes to make sure everything looks correct.

1. Navigate to your **Site Dashboard**, select the **Live** tab, and then click **Deploys**.

1. Add a Deploy Log Message (optional), then click **Deploy Code from Test to Live Environment**.

1. Activate/enable your theme. If you need help with this step, refer to the [WordPress Codex](https://codex.wordpress.org/Using_Themes) or [Drupal Documentation](https://www.drupal.org/docs/user_guide/en/extend-theme-install.html).

Congratulations! You just performed on-server development to make changes to your UI. You made changes on your Dev site, reviewed them on your Test site, then deployed them to Live.
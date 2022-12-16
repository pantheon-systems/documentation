---
title: Quick Start
subtitle: Make Code Changes
description: In part nine of our Quick Start guide, learn how to make code changes using SFTP.
quickstart: true
anchorid: code-changes
generator: pagination
layout: guide
contenttype: [guide]
categories: [overview]
newcms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [code, dashboard, iterate, sftp]
type: guide
pagination:
  provider: data.quickstartpages
use:
  - quickstartpages
permalink: docs/guides/quickstart/code-changes/
nexturl: guides/quickstart/next-steps/
nextpage: Next Steps
previousurl: guides/quickstart/ui-changes/
previouspage: On-Server Dev, Part 1
editpath: quickstart/09-code-changes.md
image: launchGuide-twitterLarge
---

Finally, we’re going to edit code directly. We’ll commit our edits to <Icon icon={"wrench"} text={"Dev"}/>, review in <Icon icon={"equalizer"} text={"Test"}/>, and deploy to <Icon icon={"cardio"} text={"Live"}/>. Let’s get started!

 <Alert title="Note"  type="info" >
  To perform this task, you need a basic understanding of CSS, and you must have an SFTP client installed.
</Alert>

If you haven’t added a new theme to your site, return to the [previous lesson](/guides/quickstart/ui-changes) and do so.

1. Navigate to your **Site Dashboard**, select the **Dev** tab, and then click **Code**. 

1. Confirm your Connection Mode is set to **SFTP**.

1. Click **Connect with SFTP** to access the credentials for connecting to your preferred SFTP client.

1. Click **Open SFTP Client**, and enter your User Dashboard password when prompted. If you run into issues, please refer to Pantheon's [SFTP documentation](/guides/sftp/sftp-connection-info).

1. Open the `code` folder in your SFTP client, and navigate to the theme you installed previously.

1. Make a significant change to your theme’s CSS; something you’ll easily spot when you look at the site.

1. Return to the **Dev** tab of your Site Dashboard. The files you just changed will be highlighted in yellow.

    <Alert title="Note"  type="info" >
      Click the highlighted file changes in the Dev environment to
      view the specific diff.
    </Alert>

1. Add a commit message, then click **Commit** to add these files to your Dev environment.

1. Deploy your changes to the <Icon icon={"equalizer"} text={"Test"}/> environment and review them. 

1. Deploy to the <Icon icon={"cardio"} text={"Live"}/> environment when you’re satisfied with your review.
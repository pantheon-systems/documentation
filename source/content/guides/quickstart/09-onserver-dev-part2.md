---
title: Quick Start
subtitle: On-Server Dev, Part 2
description: Continued discussion of on-server development on Pantheon
quickstart: true
anchorid: onserver-dev-part2
generator: pagination
layout: guide
categories: [get-started]
tags: [code, dashboard, iterate, sftp]
type: guide
pagination:
  provider: data.quickstartpages
use:
  - quickstartpages
permalink: docs/guides/quickstart/onserver-dev-part2/
nexturl: guides/quickstart/next-steps/
nextpage: Next Steps
previousurl: guides/quickstart/onserver-dev-part1/
previouspage: On-Server Dev, Part 1
editpath: quickstart/09-onserver-dev-part2.md
image: launchGuide-twitterLarge
---

In this lesson, we’re going to edit code directly. We’ll commit our edits to <Icon icon={"wrench"} text={"Dev"}/>, review in <Icon icon={"equalizer"} text={"Test"}/>, and deploy to <Icon icon={"cardio"} text={"Live"}/>. Let’s get started!

<Alert title={"Note"} type={"info"}>
  To complete this lesson, you need a basic understanding of CSS. If necessary,
  ask a colleague for help, or feel free to skip this lesson altogether.
</Alert>

If you haven’t added a new theme to your site, please return to the [previous lesson](/guides/quickstart/onserver-dev-part1) and do so now.

1.  Navigate to <Icon icon={"embed-close"} text={"Code"}/> in the <Icon icon={"wrench"} text={"Dev"}/> tab of your Site Dashboard. Confirm your Connection Mode is set to **SFTP**.

2.  Click <Icon icon={"info-sign"} text={"SFTP Connection Info"}/> to access the credentials for connecting to your preferred SFTP client.

3.  Click **Open in your default SFTP client**, and enter your User Dashboard password when prompted.

    If you run into issues, please refer to [this documentation](/sftp/#sftp-connection-information).

4.  Now open the `code` folder in your SFTP client, and navigate to the theme you installed previously.

5.  Let’s make a significant change to your theme’s CSS; something you’ll easily spot when you look at the site.

6.  Return to the <Icon icon={"wrench"} text={"Dev"}/> tab of your Site Dashboard. The files you just changed will be highlighted in yellow.

    <Alert title={"Note"} type={"info"}>
      Click the highlighted file changes in the Dev environment, and you can
      view the specific diff.
    </Alert>

7.  Add a commit message, then click **Commit** to add these files to your Dev environment.

8.  Deploy your changes to the <Icon icon={"equalizer"} text={"Test"}/> environment and review them. When you’re satisfied, deploy to the <Icon icon={"cardio"} text={"Live"}/> environment.

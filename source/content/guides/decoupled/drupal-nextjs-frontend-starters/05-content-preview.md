---
title: Drupal + Next.js Frontend Starter for Front-End Sites
subtitle: Configure Content Preview
description: Learn how to configure content preview.
tags: [webops, workflow, decoupled]
contributors: [whitneymeredith]
layout: guide
showtoc:
permalink: docs/guides/decoupled/drupal-nextjs-frontend-starters/content-preview
anchorid: content-preview
contenttype: [guide]
innav: [false]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to configure decoupled content preview for your site. This allows you to preview your content changes in the Next.js app before publishing to your live site.

## Configure Environment Variables

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard) and click **Builds**.

1. Scroll down to **Site Environment Variables** and click the **Get Started** or **Make Changes** button. The Get Started button displays if you have not added any Site Environment Variables yet.

    ![Site Environment Variables](../../../../images/decoupled-preview-env-variables.png)

1. Add the keys below and the corresponding values and then click **Save**. These are the secure preview key-value pairs you were provided with and copied when you installed your CMS.

    - `CLIENT_ID`
    - `CLIENT_SECRET`
    - `PREVIEW_SECRET`

1. Go to the **Overview** page and click the **Trigger Build** button to start a new build and deployment.

1. Locate your live build in the **Multidev** section, click **Actions**, and then select **View Latest Build Logs** to confirm that your environment variables are set on your live Front-End Site.

1. Log in to your Drupal dashboard, navigate to the Live environment, and select the **Structure** menu.

1. Select **Preview Sites** and then click the **Edit** button.

1. Edit the **URL** field to match the Live environment URL of your Front-End Site with `/api/preview` at the end.

1. Edit the **Secret** field to match the `PREVIEW_SECRET` value you used in the previous steps, and then click **Save**.

You can now use the **Decoupled Preview** button to preview changes to your content.
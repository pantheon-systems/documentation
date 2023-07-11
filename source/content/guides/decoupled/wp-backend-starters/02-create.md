---
title: WordPress Backend Starter for Front-End Sites
subtitle: Create a New Project
description: Learn how to create a new decoupled WordPress backend project.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-backend-starters/create
anchorid: create
contenttype: [guide]
innav: [false]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to create a new WordPress backend project with Pantheon's starter kit.

## Create with Dashboard Upstream

1. [Go to the workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces), that the new site should be a part of, then select the **Sites** page.

1. Click **+Create New Site**.

1. Select **Front-End Site** when prompted.

1. Select **WordPress for Front-End** under **Create Backend CMS**.

    - You can also follow the [Decoupled WordPress Composer Managed](https://dashboard.pantheon.io/sites/create?upstream_id=c9f5e5c0-248f-4205-b63a-d2729572dd1f) link to create your site in the Site Dashboard.

    ![Select a Starter](../../../../images/decoupled-select-starter-new.png)

1. Name your site, select your decoupled environment from the **Choose a Workspace for the Site** drop-down menu, and then click **Continue**.

  Site and Multidevs names cannot contain a `.` (period) or `_` (underscore).

  - To do this step through Terminus, replace `my-new-site`, the site description, and the org ([if available](/terminus/commands/org-list)) in `My Team Name` in the following command:

      ```bash{promptUser: user}
      terminus site:create my-new-site "Describe Site" --org='My Team Name' c9f5e5c0-248f-4205-b63a-d2729572dd1f
      ```

      Note that `c9f5e5c0-248f-4205-b63a-d2729572dd1f` is the `upstream_id` for Decoupled WordPress Composer Managed.

1. Confirm your organization selection when prompted in **Confirm Organization Selection**. The **Deploying Decoupled WordPress Composer Managed** progress indicator displays while your site is being created.

1. Click **Visit your Pantheon Dashboard** when the site creation completes.

1. Click the **Visit Development Site** button to install WordPress.

1. Select the profile. This can also be done via [`terminus remote:wp`](/terminus/commands/remote-wp).

Your backend starter is ready to develop!

## Create with Terminus Plugin

<Partial file="decoupled-terminus-plugin-backend.md" />

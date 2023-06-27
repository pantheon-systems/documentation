---
title: Front-End Sites without a Starter Kit
subtitle: Import Repository
description: Learn how to import your repository to create a Front-End Site.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/no-starter-kit/import-repo
anchorid: create
contenttype: [guide]
innav: [false]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

You can import your Git-provided repository to create your Front-End Site.

1. [Go to the workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces), then select the **Sites** page.

1. Click the **Front-End Sites** tab and then click **+Create New Site**.

1. Click **Import Repository** on the _What kind of site are you creating?_ page to connect your GitHub repository.

1. Select a Git provider from the **Choose your Git provider** options and then click **Continue**.

1. Select your desired GitHub account from the **GitHub Account** drop-down menu.

1. Choose the repository name from the **Select Repository** drop-down menu and then click **Continue**.

1. Enter the **Site Name** in the **General Info** section. The site name is the title of your site. You can edit the site name in **Settings** after creation. Note: You cannot use a . (period) or _ (underscore) for site and Multidev names.

1. Select the frontend framework in the **General Info** section. You can choose either Next.js or Gatsby.

1. Optional. Click **Advanced Settings** to set your:

    - Output directory
    - Build command
    - Environment variables
    - Deployment path

1. Click **Continue**.

    - You are directed to a new page with the site name, deployment, and build information and status. You will receive a message that your Front-End Site has been successfully added to Pantheon.

1. Click **Build Details** to view the build log.
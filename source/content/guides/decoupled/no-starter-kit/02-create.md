---
title: Front-End Sites without a Starter Kit
subtitle: Create a Site- No Starter and/or CMS
description: Create a Front-End Site without a starter kit and/or without a CMS.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/no-starter-kit/create
anchorid: create
contenttype: [guide]
innav: [false]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to create a Front-End Site without a starter kit and/or CMS on Pantheon.

## Create Your Project on Pantheon

Make sure you meet the following prerequisites before you continue.

- You are using a Git repository.

- The repository is not empty.

- The repository has a `package.json` file.

- The repository has only **one** lock file.

    <Alert title="Note"  type="info" >

    You cannot have a `package-lock.json` and `yarn.lock` file. You will receive an error message if you try to import a repository with both a `package-lock.json` and `yarn.lock`.

    </Alert>


1. [Go to the workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces), then select the **Sites** page.

1. Click the **Front-End Sites** tab and then click **+Create New Site**.

1. Click **Import Repository** on the _What kind of site are you creating?_ page to connect your GitHub repository.

1. Select a Git provider from the **Choose your Git provider** options and click **Continue**.

1. Select your desired GitHub account from the **GitHub Account** drop-down menu.

1. Choose the repository name from the **Select Repository** drop-down menu and click **Continue**.

1. Enter the **Site Name** in the **General Info** section. The site name is the title of your site. You can edit the site name in **Settings** after creation. Note: You cannot use a . (period) or _ (underscore) for site and Multidev names.

1. Select the frontend framework in the **General Info** section. You can choose either Next.js or Gatsby as the static site generator.

1. Optional. Link your CMS.

    <Alert title="Note"  type="info" >

    You are not required to have a CMS when using this method. If you are using a specified CMS, you can link your CMS backend and the site environment from which to source content. However, this is more applicable when using the Decoupled starter kit templates.

    </Alert>

1. Determine if your repository will be public or private. Note that **Make this a private repository** is selected by default.

1. Optional. Click **Advanced Settings** to set your:

    - Output directory
    - Build command
    - Environment variables
    - Deployment path

    <Alert title="Note"  type="info" >

     Basic builds will function without setting environment variables if the CMS site was selected during site creation. Environment variables are not necessary for optional features such as Decoupled Preview.

     </Alert>

    - You are directed to a new page with the site name, deployment, and build information and status. You will receive a message that your Front-End Site has been successfully added to Pantheon.

1. Click **Build Details** to view the build log.
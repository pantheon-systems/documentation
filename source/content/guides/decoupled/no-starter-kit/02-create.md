---
title: Front-End Sites without a Starter Kit
subtitle: Create a Site- No Starter and/or CMS
description: Create a Front-End Site without a starter kit and/or without a CMS.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/no-starter-kit/create
anchorid: create
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to create a Front-End Site without a starter kit on Pantheon.

## Create Your Project on Pantheon

Make sure you meet the following prerequisites before you continue.

* You are using a Git repository.

* The repository should not be empty.

* The repository has a `package.json` file.

* The repository has only **one** lock file.

    <Alert title="Note"  type="info" >

    You cannot have a `package-lock.json` and `yarn.lock` file. You will receive an error message if you try to import a repository with both a `package-lock.json` and `yarn.lock`.

    </Alert>


1. Log in to your **Pantheon Dashboard** and select the **Sites** page.

1. Click the **Decoupled** tab and then click **+Create New Site**.

    <Alert title="Note"  type="info" >

    You cannot use a . (period) or _ (underscore) for site and Multidev names.

    </Alert>

1. Click **Import Repository** on the _What kind of site are you creating?_ page to connect your GitHub repository.

1. Select a Git provider from the **Choose your Git provider** options and click **Continue**.

1. Select your desired GitHub account from the **GitHub Account** drop-down menu.

1. Choose the repository name from the **Select Repository** drop-down menu and click **Continue**.

1. Populate the **General Info** section.

    1. **Site Name**: The site name is the title of your site. You can edit the site name in **Settings** after creation. Note: You cannot use a . (period) or _ (underscore) for site and Multidev names.

    1. Select the frontend framework. You can choose either Next.js or Gatsby as the static site generator.

1. Optional. Link your CMS.

    <Alert title="Note"  type="info" >

    You are not required to have a CMS when using this method. If you are using a specified CMS, you can link your CMS backend and the site environment from which to source content. However, this is more applicable when using the Decoupled starter kit templates.

    </Alert>

1. Determine if your repository will be public or private. Note that **Make this a private repository** is selected by default.

1. Optional. Add configurations and then click **Continue**.

    * You can add specifications to help manage your root directory and build settings.
    * You can set the Environment Variables in the Advanced Setting section.

    <Alert title="Note"  type="info" >

     Basic builds will function without setting environment variables if the CMS site was selected during decoupled site creation. Environment variables are not necessary for optional features such as Decoupled Preview.

     </Alert>

    - You are directed to a new page with the site name, deployment, and build information/ status. You will receive a message that your decoupled site has successfully been added to Pantheon.

1. Click **Build Details** to view the build log.
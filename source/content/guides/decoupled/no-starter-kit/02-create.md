---
title: Front-End Sites without a Starter Kit
subtitle: Create a New Project
description: Create a Front-End Site without a starter kit.
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

<Partial file="decoupled-create-in-dashboard.md" />

## Create Your Project on Pantheon

Make sure you meet the following prerequisites before you continue.

* You are using a Git repository.

* The repository should not be empty.

* The repository has a `package.json` file.

* The repository has only **one** lock file.

    <Alert title="Note"  type="info" >

    You cannot have a `package-lock.json` and `yarn.lock` file. You will receive an error message if you try to import a repository with both a `package-lock.json` and `yarn.lock`.

    </Alert>


1. Create a site without configuring the backend and link to a frontend framework.

1. Click **Import Repository** on the _What kind of site are you creating?_ page to connect your GitHub repository.

1. Follow the steps in the Connect your Account section if you have not already connected your GitHub account. Otherwise, if your GitHub account is already connected you can proceed to the next step and select your Git provider.

1. Select a Git provider from the **Choose your Git provider** options and click **Continue**.

1. Select your desired GitHub account from the **GitHub Account** drop-down menus.

1. Choose the repository name from the **Select Repository** drop-down menu and click **Continue**.

1. Add to the **General Info** section.

    * Specify the Site Name: The site name is the title of your site. You can edit the site name in **Settings** after creation. Note: You cannot use a . (period) or _ (underscore) for site and Multidev names.
    * Select the frontend framework. You can choose either Next.js or Gatsby as the static site generator.

1. (Optional). Link your CMS.

    > **NOTE**: If you are using a specified CMS, you can link your CMS backend and the site environment from which to source content. However, this is more applicable when using the Decoupled starter kit templates.

1. Ensure **Make this a private repository** is selected.

1. (Optional). Add configurations and then click **Continue**.

    * You can add specifications to help manage your root directory, build settings, and set environment variables.
    * You can set the Environment Variables in the Advanced Setting section.

    > **NOTE**: Basic builds will function without setting environment variables if the CMS site was selected during decoupled site creation. Environment variables are not necessary for optional features like preview.

    - You are directed to a new page with the site name, deployment, and build information/ status. You will receive a message that you decoupled site has successfully been added to Pantheon.

1. Click **Build Details** to view the build log.


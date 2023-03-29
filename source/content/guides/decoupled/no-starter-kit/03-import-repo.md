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
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

You can import your Git-provided repository to create your Front-End Site.

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

1. Optional. Add configurations under **Advanced Settings** and then click **Continue**.

    - You are directed to a new page with the site name, deployment, and build information and status. You will receive a message that your decoupled site has successfully been added to Pantheon.

1. Click **Build Details** to view the build log.
---
title: Front-End Sites without a Starter Kit
subtitle: Use a Non-official Frontend Framework
description: Learn how to use a non-official framework to create a Front-End Site.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/no-starter-kit/any-framework
anchorid: any-framework
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

Pantheon Decoupled Early Access (EA) program currently supports Gatsby and Next.js as frontend frameworks. Additional frameworks will be added to our official support list over the coming months.

You can use frontend frameworks other Gatsby and Next.js. Note that while other frameworks are an option, we do not support all frameworks at this time. The process for non-officially supported frontend frameworks requires manual configuration.

## Before You Begin

- Know the type of framework you will use.
    - Is it a static or server-side rendering framework? This will matter when you are creating your site.

- Examine the build command for the framework you have chosen. Depending on the framework, you may need to adjust files to build a decoupled site successfully.
    - If the build command used is `build`, you do not have to do anything for your build commands, although you may need to pay attention to Root Directory and Output Directory as these may be different for the framework used.
    - If your framework uses a different command, you must adjust the build command on the build settings page. For example, if you have a static site framework that uses the command `npm run generate`, you must input `generate` as the build command.


## Create Your Site

1. Log in to your **Pantheon Dashboard** and select the **Sites** page.

1. Click the **Front-End Sites** tab and then click **+Create New Site**.

1. Click **Import Repository** on the _What kind of site are you creating?_ page to connect your GitHub repository.

1. Select a Git provider from the **Choose your Git provider** options and click **Continue**.

1. Select your desired GitHub account from the **GitHub Account** drop-down menu.

1. Choose the repository name from the **Select Repository** drop-down menu and click **Continue**.

1. Enter the **Site Name** in the **General Info** section. The site name is the title of your site. You can edit the site name in **Settings** after creation. Note: You cannot use a . (period) or _ (underscore) for site and Multidev names.

1. Select the frontend framework in the **General Info** section. You must select one of these options even if you are not using Next.js or Gatsby.

    - Select **Gatsby** if you are using a static framework (SSG).
    - Select **Next.js** if you using a server-side rendering framework (SSR).

1. Optional. Add configurations under **Advanced Settings** and then click **Continue**.

    - You are directed to a new page with the site name, deployment, and build information and status. You will receive a message that your decoupled site has successfully been added to Pantheon.

1. Click **Build Details** to view the build log.
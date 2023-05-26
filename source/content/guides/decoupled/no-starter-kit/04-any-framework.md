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

Pantheon Front-End Sites Early Access (EA) program currently supports Gatsby and Next.js as frontend frameworks. Additional frameworks will be added to our official support list over the coming months.

You can use frontend frameworks other than Gatsby and Next.js. Note that while other frameworks are an option, we do not support all frameworks at this time. The process for non-officially supported frontend frameworks requires manual configuration.

## Before You Begin

- Know what type of framework you will use.

    - Is it a static or server-side rendering framework? This will matter when you are creating your site.

- Examine the build command for the framework you have chosen. Depending on the framework, you may need to adjust the files to build a Front-End Site successfully.

    - If the build command is `build`, you do not have to do anything for your build commands, although you may need to pay attention to the Output Directory as this may be different for the framework used.

    - If your framework uses a different command, you must adjust the build command on the Build Settings page. For example, if you have a static site framework that uses the command `npm run generate`, you must input `generate` as the build command.

- For sites that use server-side rendering, examine the `start` command for the framework you have chosen. Depending on the framework, you may need to adjust the files to run a Front-End Site successfully.

    - If the build command is `start`, you do not have to do anything for your build commands, although you may need to pay attention to the Output Directory as this may be different for the framework used.

    - If your framework uses a different command, you must update your `package.json` file to include an equivalent command called `start`. For example, if you use the command `npm run serve`, you must rename the command to `start` or create a duplicate start command.

    - If your `package.json` file does not include a `start` command, you must add it.

## General Site Creation

1. [Go to the workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces), then select the **Sites** page.

1. Click the **Front-End Sites** tab and then click **+Create New Site**.

1. Click **Import Repository** on the _What kind of site are you creating?_ page to connect your GitHub repository.

1. Select a Git provider from the **Choose your Git provider** options and then click **Continue**.

1. Select your desired GitHub account from the **GitHub Account** drop-down menu.

1. Choose the repository name from the **Select Repository** drop-down menu and then click **Continue**.

1. Enter the **Site Name** in the **General Info** section. The site name is the title of your site. You can edit the site name in **Settings** after creation. Note: You cannot use a . (period) or _ (underscore) for site and Multidev names.

1. Select the frontend framework in the **General Info** section. **You must select an option even if you are not using Next.js or Gatsby.**

    - Select **Gatsby** if you are using a static framework (SSG).
    - Select **Next.js** if you using a server-side rendering framework (SSR).

1. Optional. Click **Advanced Settings** to set your:

    - Output directory
    - Build command
    - Environment variables
    - Deployment path

1. Click **Build Details** to view the build log.

## Bootstrap Site Creation Example

You can create a Front-End Site using a [Bootstrap](https://getbootstrap.com/) website theme with some manual configuration. The example below uses a [free, downloadable Bootstrap theme](https://startbootstrap.com/template/shop-homepage). Note that the steps below are specific to Mac users. Steps may differ for Windows users.

1. Download your Bootstrap website template.

1. Create a GitHub repository containing your Bootstrap site.

1. Open your terminal and use the `cd` command to change into the directory:

    ```bash{promptUser: user}
    cd <your-bootstrap-site-directory>
    ```

1. Create a `package.json` file if the directory does not have one. The [example Bootstrap site](https://startbootstrap.com/template/shop-homepage) does not have a `package.json` file.

    <Alert title="Note"  type="info" >

    A `package.json` file is required for Front-End Sites.

    </Alert>

    ```bash{promptUser: user}
    npm init --yes
    ```

1. Create a `package-lock.json` file if the directory does not have one:

    ```bash{promptUser: user}
    npm install
    ```

1. Open your `package.json` file  and locate `scripts`. You should see something like:

    ```bash{promptUser: user}
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
    },
    ```

1. Update the `scripts` section to match the example below. This is necessary because the [example Bootstrap site](https://startbootstrap.com/template/shop-homepage) is a static site that does not require a build step while the Front-End Site container expects a build script.

    ```bash{promptUser: user}
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "noop": "echo 'noop'",
    "build": "npm run noop",
    "start": "npm run noop"
    },
    ```

1. Create a new directory in your repo and name it `build`.

1. Move your assets (HTML, CSS, and JS) into the `build` directory.

1. Commit and push your changes.

    - Your repo is now ready to import into Pantheon's Front-End Sites.

1. Log in to your **Site Dashboard** on Pantheon and select the **Sites** page.

1. Click **+Create New Site** and then click **Front-End Site**.

1. Click **Import Repository** on the *What kind of site are you creating?* page to connect your GitHub repository.

1. Select a Git provider from the **Choose your Git provider** options and then click **Continue**.

1. Select your desired GitHub account from the **GitHub Account** drop-down menu.

1. Select the repository with your Bootstrap site from the **Select Repository** drop-down menu and then click **Continue**.

1. Enter the **Site Name** in the **General Info** section. The site name is the title of your site. You can edit the site name in **Settings** after creation. Note: You cannot use a . (period) or _ (underscore) for site and Multidev names.

1. Select **Gatsby** as the frontend framework in the **General Info** section. Bootstrap uses a static site framework like Gatsby.

1. Click **Advanced Settings** and set the following:

    - **Build Command:** build
    - **Output Directory**: build

    <Alert title="Note"  type="info" >

    The Output Directory must match the name of the directory you created and stored your assets in.

    </Alert>

1. Click **Continue.**  The site build begins.

1. Click **Build Details** to view the build log.


## Docusaurus Site Creation Example

You can create a Front-End Site using a free [Docusaurus](https://docusaurus.io/) website template with some manual configuration. The example site in this section uses the [Docusaurus scaffold project website classic](https://docusaurus.io/docs/installation#scaffold-project-website).

### Before You Begin

- Create a GitHub repository containing your Docusaurus site.

1. Log in to your **Site Dashboard** and select the **Sites** page.

1. Click **+Create New Site**, then click **Front-End Site**.

1. Click **Import Repository** on the *What kind of site are you creating?* page to connect your GitHub repository.

1. Select a Git provider from the **Choose your Git provider** options and then click **Continue**.

1. Select your desired GitHub account from the **GitHub Account** drop-down menu.

1. Choose the repository name from the **Select Repository** drop-down menu and then click **Continue**.

1. Enter the **Site Name** in the **General Info** section. The site name is the title of your site. You can edit the site name in **Settings** after creation. Note: You cannot use a . (period) or _ (underscore) for site and Multidev names.

1. Select **Gatsby** as the frontend framework in the **General Info** section.

1. Click **Advanced Settings** and set the following:
    - **Build Command: build**
    - **Output Directory**: build

1. Click **Continue.**  The site build begins.

1. Click **Build Details** to view the build log.
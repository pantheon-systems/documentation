---
title: WordPress + Next.js Frontend Starter for Front-End Sites
subtitle: Create a New Project
description: Learn how to use the WordPress + Next.js frontend starter to create a new project.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-nextjs-frontend-starters/create
anchorid: create
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to use the Next.js + WordPress starter kit.

## Before You Begin

The Pantheon `next-wordpress-starter` uses Next.js and has been tested using
[nodejs v16 with npm v8](https://nodejs.org/en/download/).

## Create Your Project on Pantheon

Make sure you meet the following prerequisites before you continue.

* You are using a Git repository and the repository is already connected.
* You are using WordPress as your CMS.
* You have installed and configured your WordPress site using the starter kit configuration.

1. Log in to your **Pantheon Dashboard** and select the **Sites** page.

1. Click the **Decoupled** tab and then click **+Create New Site**.

    <Alert title="Note"  type="info" >

    You cannot use a . (period) or _ (underscore) for site and Multidev names.

    </Alert>

1. Click the **WordPress and Next.js** option, select a repo listed under **Choose your Git provider**, and then click **Continue**.

    ![select a starter](../../../../images/decoupled-select-starter.png)

1. Select your desired GitHub account and enter the repository name. You can select **Make this a private repository** to provide greater security for your Git repository.

1. Select the desired WordPress CMS backend from the **Link Your CMS** drop-down menu.

1. Select the site environment from which to source the content.

1. Optional. Click **Advanced Settings** to set your root and output directories, build command, environment variables, and deployment path.

1. Click **Continue**. You are directed to a new page with the site name, deployment, and build information and status.

1. Click **Build Details** to view the build log.

1. Click **View Site** after the build completes to launch your Front-End Site.

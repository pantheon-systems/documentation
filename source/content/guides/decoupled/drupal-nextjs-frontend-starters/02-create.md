---
title: Drupal + Next.js Frontend Starter for Front-End Sites
subtitle: Create a Drupal + Next.js Project
description: Learn how to create a new Drupal + Next.js project.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-nextjs-frontend-starters/create
anchorid: create
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to use the Drupal + Next.js frontend starter kit.

## Before You Begin

The Pantheon `next-drupal-starter` uses Next.js and has been tested using [nodejs v16 with npm v8](https://nodejs.org/en/download/).

Make sure you meet the following prerequisites before you continue.

- You are using a Git repository, and the repository is already connected.
- You are using Drupal as your CMS.
- You have installed and configured your Drupal site using the starter kit configuration.

## Create Your Project on Pantheon

1. [[Go to the workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces)select the **Sites** page.

1. Click the **Front-End Sites** tab and then click **+Create New Site**.

1. Click the **Drupal and Next.js** option, select a repo under **Choose your Git provider**, and then click **Continue**.

    ![select a starter](../../../../images/decoupled-select-starter.png)

1. Select your desired GitHub account and enter the repository name. You can select **Make this a private repository** to provide greater security for your Git repository. You cannot use a . (period) or _ (underscore) for site and Multidev names.

1. Select the desired Drupal CMS backend from the **Link Your CMS** drop-down menu.

1. Select the site environment from which to source the content.

1. Optional. Click **Advanced Settings** to set your:

     - Output directory
     - Build command
     - Environment variables
     - Deployment path

1. Click **Continue**. You are directed to a new page with the site name, deployment, and build information and status.

1. Click **Build Details** to view the build log.

1. Click **View Site** after the build completes to launch your Front-End Site.
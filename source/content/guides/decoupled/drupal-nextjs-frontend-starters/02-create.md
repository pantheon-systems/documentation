---
title: Drupal + Next.js Frontend Starter for Front-End Sites
subtitle: Create a Drupal + Next.js Project
description: Create a new Drupal + Next.js project.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-nextjs-frontend-starters/create
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to use the Drupal + Next.js frontend starter kit. Refer to [Understand Next.js SSG, ISR, and SSR](/guides/decoupled/overview/nextjs) for an explanation of differences between SSG, ISR, and SSR, and common uses cases for each.

## Before You Begin

The Pantheon `next-drupal-starter` uses Next.js and has been tested using [nodejs v16 with npm v8](https://nodejs.org/en/download/).

## Create Your Project on Pantheon

Make sure you meet the following prerequisites before you continue.

* You are using a Git repository, and the repository is already connected.
* You are using Drupal as your CMS.
* You have installed and configured your Drupal site using the starter kit configuration.

1. Log in to your **Pantheon Dashboard** and select the **Sites** page.

1. Click the **Decoupled** tab and then click **+Create New Site**.

    <Alert title="Note"  type="info" >

    You cannot use a . (period) or _ (underscore) for site and Multidev names.

    </Alert>

1. Click the **Drupal and Next.js** option, select a repo listed under **Choose your Git provider**, and then click **Continue**.

    ![select a starter](../../../../images/decoupled-select-starter.png)

1. Select your desired GitHub account and enter the repository name. You can select **Make this a private repository** to provide greater security for your Git repository.

1. Select the desired Drupal CMS backend from the **Link Your CMS** drop-down menu.

1. Select the site environment from which to source the content.

1. Optional. Click **Advanced Settings** to set your root and output directories, build command, environment variables, and deployment path.

1. Click **Continue**. You are directed to a new page with the site name, deployment, and build information and status.

1. Click **Build Details** to view the build log.

1. Click **View Site** after the build completes to launch your Front-End Site.
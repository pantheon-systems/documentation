---
title: Pantheon Front-End Sites
subtitle: Build Hooks
description: Create and manage Build Hooks in the Pantheon Dashboard.
tags: [webops, workflow, decoupled]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/overview/build-hooks
anchorid: build-hooks
contenttype: [guide]
innav: [false]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

Build Hooks allow you to trigger a build automatically when you update the content in your content management system (CMS). You can use Build Hooks for your Front-End site if your CMS is hosted on Pantheon or hosted elsewhere.

Your Pantheon Front-End site will rebuild and include your new content when a Build Hook is triggered. Each Build Hook you generate has a unique URL.

You can create and manage Build Hooks in the Pantheon Dashboard. You must[configure your backend](/guides/decoupled/overview/build-hooks#use-build-hooks-with-a-backend-starter-kit) to use the Build Hooks you create in the Pantheon dashboard.

## Add a Build Hook

1. Navigate to your site dashboard and select the site you want to add a Build Hook to.

1. Click **Settings** and then click **Builds**.

1. Scroll down to the **Build Hooks** section and click **Add**.

1. Name your Build Hook and then select the branch from the **Branch to Build** drop-down menu.

1. Click **Generate**. You will see the Build Hook listed under the Build Hooks section in the dashboard.

1. Click **Show URL** and then click **Copy** to copy your unique Build Hooks URL.

1. Optional. Copy the cURL code under **Test** to test triggering a build with your hook.

![add build hook](../../../../images/add-build-hook.png)

## Edit a Build Hook

1. Navigate to your site dashboard and select the site you want to add a Build Hook to.

1. Click **Settings** and then click **Builds**.

1. Scroll down to the **Build Hooks** section, select **Edit** from the **Edit** drop-down menu next to the Build Hook you want to make changes to.

1. Update the Build Hook information and then click **Save Changes**.

## Regenerate a Build Hook

The Build Hook name will remain the same, but your URL will be updated each time your regenerate your Build Hook. Take note of the new URL and update it where needed.

1. Navigate to your site dashboard and select the site you want to add a Build Hook to.

1. Click **Settings** and then click **Builds**.

1. Scroll down to the **Build Hooks** section, select **Regenerate** from the **Edit** drop-down menu next to the Build Hook you want to regenerate.

1. Click **Yes** confirm your selection and then click **Regenerate Hook**.

1. Click **Show URL** and then click **Copy** to copy your new unique Build Hooks URL.

![add build hook](../../../../images/show-url-build-hook.png)

## Delete a Build Hook

1. Navigate to your site dashboard and select the site you want to add a Build Hook to.

1. Click **Settings** and then click **Builds**.

1. Scroll down to the **Build Hooks** section, select **Delete** from the **Edit** drop-down menu next to the Build Hook you want to delete.

1. Click **Yes** confirm your selection and then click **Delete Hook**.

## Use Build Hooks with a Backend Starter Kit

### Drupal Backend Starter Kit and Build Hooks

Refer to [Configure Build Hooks](/guides/decoupled/drupal-backend-starters/build-hooks) for information on how to configure your Build Hook on your backend.

### WordPress Backend Starter Kit and Build Hooks

Refer to [Configure Build Hooks](/guides/decoupled/wp-backend-starters/build-hooks) for information on how to configure your Build Hook on your backend.

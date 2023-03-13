---
title: Decoupled WordPress Backend Starter for Front-End Sites
subtitle: Build Hooks
description: Learn how to Build Hooks for your project.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-backend-starters/build-hooks
anchorid: build-hooks
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

## Create Your First Build Hook

### What Are Build Hooks?

Build hooks enable certain events in the CMS to trigger builds of a decoupled
frontend; such as content updates to post, or publishing a new page.

### Install and Activate WP Webhooks Plugin

- Install and activate the
  [WP-Webhooks Plugin](https://wordpress.org/plugins/wp-webhooks/).

### Create a Build Hook That Triggers When a Post Is Created Or Updated

1. Generate a build hook on your build platform.
1. Navigate to your WordPress admin dashboard and open the WP Webhooks plugin interface.
1. Click the **Send Data** tab.
1. Select the **Post Created** Webhook trigger.
1. Click **Add Webhook URL**, name the hook, and then paste the build hook URL that you generated.
1. Submit the form.
1. Repeat the previous steps to create a hook for the **Post Updated**
   trigger.

#### Test The Post Build Hook

1. Open your WordPress admin dashboard.
1. Create a new Post or update a previously existing post.
1. Confirm that a new build has been triggered in the **Site Overview** page of your build platform.

### Create Build Hooks For Multiple Frontend Environments

The WP Webhooks plugin allows multiple build hooks to be added under a single
action. This feature can be used to trigger builds in multiple feature branches based off of content updates in one WordPress instance.

:::note

Before continuing, generate separate build hooks for each of your sites frontend environments on your build platform.

:::

1. Navigate to your WordPress admin dashboard.
1. Open the WP Webhooks plugin dashboard.
1. Click the **Send Data** tab and select your desired Webhook trigger.
1. Click **Add Webhook URL**, name the hook, and then add one of your previously generated build hook URL's before submitting this form.
1. Repeat the previous steps for each build hook previously generated.

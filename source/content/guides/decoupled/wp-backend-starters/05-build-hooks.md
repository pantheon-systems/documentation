---
title: WordPress Backend Starter for Front-End Sites
subtitle: Build Hooks
description: Learn how to use Build Hooks for your project.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-backend-starters/build-hooks
anchorid: build-hooks
contenttype: [guide]
innav: [false]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to configure build hooks on your WordPress backend.

## What Are Build Hooks?

Build Hooks trigger builds in one or more Front-End Sites when any content
changes occur, such as creating, updating, or deleting.

Refer to the Front-End Sites Overview guide for instructions on how to [create and manage Build Hooks in the Pantheon dashboard](/guides/decoupled/overview/manage-settings#build-hooks).

### Install and Activate WP Webhooks Plugin

Install and activate the [WP-Webhooks Plugin](https://wordpress.org/plugins/wp-webhooks/) to create build hooks.

### Create a Build Hook That Triggers When a Post Is Created Or Updated

1. Generate a Build Hook on your build platform.

1. Navigate to your **WordPress admin dashboard** and open the **WP Webhooks** plugin interface.

1. Click the **Send Data** tab.

1. Select the **Post Created** Webhook trigger.

1. Click **Add Webhook URL**, name the hook, and then paste the build hook URL that you generated.

1. Submit the form.

1. Select **Settings** under the **Action** menu.

1. Enter **publish** under the **Trigger on post status** setting and toggle the **fire only once per instance option** on.

1. Save your settings.

You can repeat these steps to create a build hook for the Updated Webhook trigger.

#### Test The Post Build Hook

1. Open your **WordPress admin dashboard**.

1. Create a new Post or update a previously existing post.

1. Confirm that a new build triggered in the **Site Overview** page of your build platform.

### Create Build Hooks for Multiple Frontend Environments

The WP Webhooks plugin allows multiple build hooks to be added under a single
action. You can use this feature to trigger builds in multiple feature branches based on content updates in one WordPress instance.

<Alert title="Note"  type="info" >

Generate separate build hooks for each of your sites' Front-End environments on your build platform before continuing.

</Alert>

1. Navigate to your **WordPress admin dashboard**.

1. Open the **WP Webhooks** plugin dashboard.

1. Click the **Send Data** tab and select your desired Webhook trigger.

1. Click **Add Webhook URL**, name the hook, and then add one of your previously generated build hook URL's before submitting this form.

1. Repeat the previous steps for each build hook previously generated.

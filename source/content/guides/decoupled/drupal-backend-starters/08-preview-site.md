---
title: Decoupled Drupal Backend Starter for Front-End Sites
subtitle: Configure a Preview Site
description: Learn how to configure a preview site.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-backend-starters/preview-site
anchorid: preview-site
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to configure a preview site for your project.

## Before You Begin

- Make sure you have the necessary permissions
- Make sure the **Pantheon Decoupled** and **Decoupled Preview** modules are installed

## Create a New Preview Site Configuration

1. Go to your Drupal instance, select **Structure**, and then select **Preview Sites**.

1. Click **Add preview site** to create a new configuration.

1. Fill out the form to set up the **Label**, **URL**, **Secret**, **Preview Type**, and select the **Content Type** required.

1. Set the URL to point to `http(s)://{YOUR_SITE_URL}/api/preview` replacing
   `{YOUR_SITE_URL}` with the URL of your Front-End Site, or `localhost:3000` for testing the preview locally.

1. Set a secret for the Preview Site and note this value down.

## Edit an Existing Preview Site Configuration

1. Go to your Drupal instance, select **Structure**, and then select **Preview Sites**.

1. Locate the existing preview site you want to edit, such as the **Example NextJS Preview** site.

1. Click **Edit** to open the configuration form.

1. Update the placeholder URL to the desired URL for your preview site, from the example URL `https://example.site/api/preview` replace `example.site` with the URL of your Front-End Site or use `localhost:3000` for local testing.

1. Save your changes.
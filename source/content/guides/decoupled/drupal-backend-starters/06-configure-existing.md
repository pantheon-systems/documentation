---
title: Decoupled Drupal Backend Starter for Front-End Sites
subtitle: Configure an Existing Backend Project
description: Learn how to configure an existing backend project to use a frontend starter kit.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-backend-starters/configure-existing
anchorid: configure-existing
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

Pantheon offers a [backend starter project](/guides/decoupled/drupal-backend-starters/create) to simplify the process of configuring a Drupal site for use with our Front-End Site starter kits. However, you can configure an existing backend project to use one of Pantheon's Front-End Site starter kits.

## Before You Begin

These instructions assume that you have already installed Drupal using your
preferred method.

Configuration requirements vary depending on the features you intend to use within your frontend starter kit. The instructions below are broken down into three related sections.

## Configure Basic Builds

Follow the steps below if you only need to source content anonymously from your Drupal site.

### Add and Enable Dependencies

1. Run the following Composer commands:

    ```bash{promptUser: user}
    composer config minimum-stability alpha
    composer require drupal/jsonapi_menu_items drupal/jsonapi_hypermedia drupal/decoupled_router
    ```

1. Enable the `media_library`, `jsonapi`, `jsonapi_menu_items_hypermedia`, and `decoupled_router` modules. This also enables a number of dependencies.

1. Clear the Drupal cache.

### Configure Images

The Front-End Site starter kits assume that you are using Drupal's core Media module to manage images. You must make one of two possible adjustments if you are using the default image field instead:

- Add a new field of type `Media` to the Article content type. The resulting
  field should have the label `Media Image`. The machine name will be `field_media_image`. Be sure to rebuild Drupal's cache after adding this field.
- Update your starter kit to use the default image field instead of the Media
  field.

### Ensure That Your Content Uses URL Aliases

The starter kit uses the Decoupled Router module to determine the path where your Drupal content should display. As a result, while the pattern used to define your paths does not matter, your page and article content must have a path alias of some kind. This can be defined manually during content creation, or automatically using the [Pathauto module](https://www.drupal.org/project/pathauto).

### Create Supporting Content

The Front-End Sites starter kits assume that there is at least one published article and page in your Drupal backend. If your site does not have any article or page content, you should create some before proceeding.

### Set the Necessary Front-End Environment Variables

Your Drupal site should allow data to be sourced anonymously by the frontend starter kit. Within your frontend project you must set the necessary environment variables to source data from your Drupal backend. For anonymous data sourcing, you must set at least the `BACKEND_URL` and `IMAGE_DOMAIN` variables.

- [Instructions for the Next.js and Drupal starter kit](/guides/decoupled/drupal-nextjs-frontend-starters)

### Optional Configuration

#### Apply Patches for Multi-Language Support

You must apply a patch to the decoupled router module for full multi-language support if your Drupal content is translated into multiple languages.

1. Open the `composer.json` file in the root of your Drupal project and add the following to the `extra` section:

    ```json
    "extra": {
      "patches": {
        "drupal/decoupled_router": {
          "3111456#59: Unable to resolve path on node in other language than default": "https://www.drupal.org/files/issues/2022-12-01/decouple_router-3111456-resolve-language-issue-58--get-translation.patch"
        }
      }
    }
    ```

1. Run the following Composer command to add the composer-patches plugin:

    ```bash{promptUser: user}
    composer require cweagans/composer-patches
    ```

#### Enable Edge Caching

For sites running on Pantheon, you can update your configuration to enable edge caching and purging across the entire decoupled stack.

1. Run the following Composer command:

    ```bash{promptUser: user}
    composer require drupal/pantheon_advanced_page_cache
    ```

1. Enable the **Pantheon Advanced Page Cache** module.

1. Open **Drupal Admin** page, select **Configuration**, select **Development**, and then select **Performance**.

1. Set the `Browser and proxy cache maximum age` to a value greater than zero.

## Configure Authenticated API Requests

Follow the steps below if you need to source data that requires authorization.

### Add and Enable Dependencies

1. Run the following Composer command:

    ```bash{promptUser: user}
    composer require drupal/simple_oauth
    ```

1. Enable the `simple_oauth module`. This also enables a number of
  dependencies.

### Configure Simple OAuth

1. Open **Simple OAuth**, select **Configuration**, select **People**, and then select **Simple OAuth**.

1. Generate public and private keys to be used with the module. For the
  directory, specify `sites/default/files/private` or the path of your choice.

1. Select **Configuration**, select **Web services**, and then select
  **Consumers**.

1. Create a consumer for use with your Front-End Site.
    - Provide a label for the consumer.
    - Specify a Client ID and note this for later use.
    - Associate a user with the consumer.
    - Specify a Secret and note this for later use.

### Set the Necessary Front-End Environment Variables

You must set the `CLIENT_ID` and `CLIENT_SECRET` variables for authenticated data sourcing.

- [Instructions for the Next.js and Drupal starter kit](/guides/decoupled/drupal-frontend-starters/environment-variables)

## Configure Preview

Follow the steps below if you want to preview content managed in Drupal on your Front-End Site.

### Add and Enable Dependencies

1. Run the following Composer command:

    ```bash{promptUser: user}
    composer require drupal/decoupled_preview
    ```

1. Enable the `decoupled_preview` module.

### Grant Permissions

Ensure that the user you previously associated with the Simple OAuth consumer
also has the following permissions:

- Decoupled Preview: Administer preview site
- Node: View all revisions

### Create a Preview Site

Refer to the instructions for [creating a new preview site configuration](/guides/decoupled/drupal-backend-starters/preview-site).

### Set the Necessary Front-End Environment Variables

You must set the `PREVIEW_SECRET` variable.

- [Instructions for the Next.js and Drupal starter kit](/guides/decoupled/drupal-frontend-starters/environment-variables)
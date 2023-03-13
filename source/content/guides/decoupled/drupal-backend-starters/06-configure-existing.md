---
title: Decoupled Drupal Backend Starter for Front-End Sites
subtitle: Configure an Existing Project
description: Learn how to configure an existing project to use a frontend starter kit.
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

While we offer a [back-end starter project](./creating-a-new-project) to
simplify the process of configuring a Drupal site for use with our front-end
starter kits, you may instead prefer to use an existing Drupal project. Follow the steps below to configure an existing Drupal project to work with one of our front-end starter kits.

## Before You Begin

These instructions assume that you have already installed Drupal using your
preferred method.

The amount of necessary configuration will vary depending on the features you
intend to use within your front-end starter kit. As a result, the instructions
below are broken down into three related sections.

## 1.Configure Basic Builds

If you only need to source content anonymously from your Drupal site, follow the steps below.

### Add and Enable Dependencies

- Run the following Composer commands:

```bash
composer config minimum-stability alpha
composer require drupal/jsonapi_menu_items drupal/jsonapi_hypermedia drupal/decoupled_router
```

- Enable the media_library, jsonapi, jsonapi_menu_items_hypermedia, and
  decoupled_router modules, which will also enable a number of dependencies.
- Clear the Drupal cache.

### Configure Images

Our starter kits assume that you are using Drupal's core Media module to manage images. If you are instead using the default image field, you will need to make one of two possible adjustments:

- Add a new field of type 'Media' to the Article content type. The resulting
  field should have the label 'Media Image' which will result in the machine
  name `field_media_image`. Be sure to rebuild Drupal's cache after adding this field.
- Update your starter kit to use the default image field instead of the Media
  field. Consult the ['adapting for use with existing Drupal sites'](../../frontend-starters/nextjs/nextjs-drupal/troubleshooting#adapting-for-use-with-existing-drupal-sites)
  entry within the Next.js + Drupal documentation for further instructions.

### Ensure That Your Content Uses URL Aliases

The starter kit uses the Decoupled Router module to determine the path at which your Drupal content should display. As a result, while the pattern used to define your paths does not matter, your page and article content must have a path alias of some kind. This can be defined manually during content creation, or automatically using the [Pathauto module](https://www.drupal.org/project/pathauto).

### Create Supporting Content

Our starter kits assume that there is at least one published article and page in your Drupal back-end. If your site does not have any article or page content, you should create some before proceeding.

### Set the Necessary Front-End Environment Variables

At this point, your Drupal site should be configured to allow data to be sourced anonymously by the front-end starter kit. Within your front-end project you will also need to set the necessary environment variables to source data from your Drupal back-end. For anonymous data sourcing you will need to set at least the `BACKEND_URL` and `IMAGE_DOMAIN` variables.

- [Instructions for the Next.js and Drupal starter kit](../../frontend-starters/nextjs/nextjs-drupal/setting-environment-variables)

### Optional Configuration

#### Apply Patches For Multi-Language Support

If your Drupal content is translated into multiple languages, you'll need to
apply a patch to the decoupled router module for full multi-language support.

- Open the `composer.json` file in the root of your Drupal project and add the
  following to the `extra` section:

```json
"extra": {
  "patches": {
    "drupal/decoupled_router": {
      "3111456#59: Unable to resolve path on node in other language than default": "https://www.drupal.org/files/issues/2022-12-01/decouple_router-3111456-resolve-language-issue-58--get-translation.patch"
    }
  }
}
```

- Run the following Composer command to add the composer-patches plugin:

```bash
composer require cweagans/composer-patches
```

#### Enable Edge Caching

For sites running on Pantheon, a small amount of configuration can be updated in order to enable edge caching and purging across the entire decoupled stack.

- Run the following Composer command:

```bash
composer require drupal/pantheon_advanced_page_cache
```

- Enable the Pantheon Advanced Page Cache module.

- In the Drupal Admim, navigate to the Performance settings page
  (Configuration > Development > Performance) and set the 'Browser and proxy
  cache maximum age' to a value greater than zero.

## 2. Configuring Authenticated API Requests

If you need to source data that requires authorization, follow the additional
steps below.

### Add and Enable Dependencies

- Run the following Composer command:

```
composer require drupal/simple_oauth
```

- Enable the simple_oauth module, which will also enable a number of
  dependencies.

### Configure Simple OAuth

- Under the Simple OAuth settings (Configuration > People > Simple OAuth),
  generate public and private keys to be used with the module. For the
  directory, specify `sites/default/files/private` or the path of your choice.
- Under the Consumer entities settings (Configuration > Web services >
  Consumers), create a consumer for use with your front-end site.
  - Provide a label for the consumer.
  - Specify a Client ID and note this for later use.
  - Associate a user with the consumer.
  - Specify a Secret and note this for later use.

### Set the Necessary Front-End Environment Variables

For authenticated data sourcing you will need to set the `CLIENT_ID` and
`CLIENT_SECRET` variables.

- [Instructions for the Next.js and Drupal starter kit](../../frontend-starters/nextjs/nextjs-drupal/setting-environment-variables)

## 3. Configure Preview

If you would like to preview content managed in Drupal on your front-end site,
follow the additional steps below.

### Add and Enable Dependencies

- Run the following Composer command:

```
composer require drupal/decoupled_preview
```

- Enable the decoupled_preview module.

### Grant Permissions

Ensure that the user you previously associated with the Simple OAuth consumer
also has the following permissions:

- Decoupled Preview: Administer preview site
- Node: View all revisions

### Create a Preview Site

See the instructions for
[creating a new preview site configuration](../../backend-starters/decoupled-drupal/configuring-preview-site#creating-a-new-preview-site-configuration).

### Set the Necessary Front-End Environment Variables

For preview you will need to set the `PREVIEW_SECRET` variable.

- [Instructions for the Next.js and Drupal starter kit](../../frontend-starters/nextjs/nextjs-drupal/setting-environment-variables)

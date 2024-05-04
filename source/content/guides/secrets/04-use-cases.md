---
title: Pantheon Secrets Guide
subtitle: Use Cases
description: Some common uses cases for Pantheon Secrets
terminuspage: true
contributors: [stovak]
contenttype: [guide]
innav: [true]
categories: [secrets]
cms: [drupal, wordpress]
audience: [development]
product: [secrets]
integration: [--]
tags: [reference, cli, local, terminus, workflow]
permalink: docs/guides/secrets/use-cases
reviewed: "2024-05-01"
---

# Use Case: Using secrets with Integrated Composer

## Introduction

## Mechanism 1: Oauth composer authentication (recommended)

### GitHub

### GitLab

### Bitbucket

## Mechanism 2: HTTP Basic Authentication

TEST THAT WHAT IS IN THE PLUGIN STILL WORKS!

# Use Case: Using secrets with Drupal Key module

# Pantheon Secrets detailed example

Please look at the [module documentation](../README.md) if you have not done so yet.

In this guide we will go over an end to end example on how to setup secrets for a given site and how to use those secrets on a module that integrates with the Key module. For this example, we will use the [Sendgrid API](https://www.drupal.org/project/sendgrid_api) and [Sendgrid Mailer](https://www.drupal.org/project/sendgrid_mailer) modules.

## Prerequisites

1) Make sure you have access to a Drupal >= 9.4 site running PHP >= 8.0 hosted on Pantheon.

1) Make sure you have [terminus installed](https://docs.pantheon.io/terminus/install#install-terminus) in your machine

1) Install the [Secrets Manager Plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin#installation)

1) Install the required modules in your Drupal site and push the changes to Pantheon:
    ```
    composer require drupal/pantheon_secrets drupal/sendgrid_api drupal/sendgrid_mailer
    git add composer.json composer.lock
    git commit -m "Add required modules."
    git push
    ```

1) Enable the modules:
    ```
    terminus drush <site>.<env> -- en -y pantheon_secrets sendgrid_api sendgrid_mailer
    ```

1) Make sure your Sendgrid account is correctly configured and allows sending email.

1) Create a Sendgrid API key by following [Sendgrid instructions](https://docs.sendgrid.com/ui/account-and-settings/api-keys#creating-an-api-key)

1) Store the API key as a site secret:
    ```
    terminus secret:site:set <site> sendgrid_api <api_key> --scope=web --type=runtime
    ```

    You can optionally add a [secret environment override](https://github.com/pantheon-systems/terminus-secrets-manager-plugin#environment-override) to change the API key for a given environment (e.g. you want to use different Sendgrid accounts for live and dev environments)

1) Add the Key entity in one of the different available ways:

    1) Add a new key through the Key module UI. Select Pantheon Secret as the key provider and your secret name from the dropdown (make sure you select "Sendgrid" as the Key type and "Pantheon" as the Key provider)

        ![Screenshot of creating a new Key entity with type "Sendgrid" and provider "Pantheon"](add-key.png)

    1) Go to /admin/config/system/keys/pantheon and click on the "Sync Keys" button to get all of the available secrets into Key entities.

        ![Screenshot of Sync Pantheon Secrets page in Drupal UI](../../../images/sync-keys.png)

        Then, edit the sendgrid_api Key and change the type to "Sendgrid"

    1) Use the provided drush command to sync all of your secrets into Key entities:
        ```
        terminus drush <site>.<env> -- pantheon-secrets:sync
        ```

        Then, edit the sendgrid_api Key and change the type to "Sendgrid"

1) Go to the Sendgrid API Configuration page (/admin/config/services/sendgrid) and select your Key item

    ![Screenshot of Sendgrid API Configuration page in Drupal UI](../../../images/sendgrid-config.png)

1) Make sure your site "Email Address" (/admin/config/system/site-information) matches a verified Sender Identity in Sendgrid

1) Go to the Sendgrid email test page (/admin/config/services/sendgrid/test) and test your Sendgrid integration by sending a test email

    ![Screenshot of Sendgrid email test page in Drupal UI](../../../images/sendgrid-email-test.png)

1) The email should get to your inbox. Enjoy!

# Use Case: Accessing secrets from your codebase

### Introduction

Include this note: "Note: Only get has been implemented so far. You should handle your secrets through terminus using [Terminus Secrets Manager](https://github.com/pantheon-systems/terminus-secrets-manager-plugin)." Do not present this as something we "may" do in the future!

Also: [https://github.com/pantheon-systems/customer-secrets-php-sdk?tab=readme-ov-file#restrictions](https://github.com/pantheon-systems/customer-secrets-php-sdk?tab=readme-ov-file#restrictions)

Note: this also applies to quicksilver scripts

## Mechanism 1: get_pantheon_secrets

## Mechanism 2: OOP (get a better name here!!!)

[https://github.com/pantheon-systems/customer-secrets-php-sdk?tab=readme-ov-file#usage](https://github.com/pantheon-systems/customer-secrets-php-sdk?tab=readme-ov-file#usage)

## Resources

See our detailed [Drupal](https://github.com/pantheon-systems/customer-secrets-php-sdk/blob/main/docs/drupal-example.md) or [WordPress](https://github.com/pantheon-systems/customer-secrets-php-sdk/blob/main/docs/wordpress-example.md) examples for more detailed end to end examples.


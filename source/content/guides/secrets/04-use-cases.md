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

# ☞ Using secrets with Integrated Composer

## Mechanism 1: Oauth composer authentication (recommended)

<TabList>

<Tab id="Github" id="github" active={true}>

#### GitHub Repository

1. [Generate a Github token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). The Github token must have all "repo" permissions selected.

    **Note:** Check the repo box that selects all child boxes. **Do not** check all child boxes individually as this does not set the correct permissions.

    ![image](https://user-images.githubusercontent.com/87093053/191616923-67732035-08aa-41c3-9a69-4d954ca02560.png) 

1. Set the secret value to the token via terminus:
      
   ```bash
   terminus secret:site:set <site> github-oauth.github.com <github_token> --type=composer --scope=user,ic`
   ```
   
1. Add your private repository to the `repositories` section of `composer.json`:
   
    ```json
    {
        "type": "vcs",
        "url": "https://github.com/your-organization/your-repository-name"
    }
    ```

    Your repository should contain a `composer.json` that declares a package name in its `name` field. If it is a WordPress plugin or a Drupal module, it should specify a `type` of `wordpress-plugin` or `drupal-module` respectively. For these instructions, we will assume your package name is `your-organization/your-package-name`.

1. Require the package defined by your private repository's `composer.json` by either adding a new record to the `require` section of the site's `composer.json` or with a `composer require` command:

    ```bash
    composer require your-organization/your-package-name
    ```

1. Commit your changes and push to Pantheon.

</Tab>

<Tab title="Gitlab" id="gitlab">

#### GitLab Repository

1. [Generate a GitLab token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html). Ensure that `read_repository` scope is selected for the token.

1. Set the secret value to the token via Terminus: 

   ```bash
   terminus secret:site:set <site> gitlab-oauth.gitlab.com <gitlab_token> --type=composer --scope=user,ic`
   ```

1. Add your private repository to the `repositories` section of `composer.json`:

    ```json
    {
        "type": "vcs",
        "url": "https://gitlab.com/your-group/your-repository-name"
    }
    ```

    Your repository should contain a `composer.json` that declares a package name in its `name` field. If it is a WordPress plugin or a Drupal module, it should specify a `type` of `wordpress-plugin` or `drupal-module` respectively. For these instructions, we will assume your package name is `your-organization/your-package-name`.

1. Require the package defined by your private repository's `composer.json` by either adding a new record to the `require` section of the site's `composer.json` or with a `composer require` command:

    ```bash
    composer require your-group/your-package-name
    ```

1. Commit your changes and push to Pantheon.

 </Tab>
 
  <Tab title="Bitbucket" id="bitbucket">

#### Bitbucket Repository

1. [Generate a Bitbucket oauth consumer](https://support.atlassian.com/bitbucket-cloud/docs/use-oauth-on-bitbucket-cloud/). Ensure that Read repositories permission is selected for the consumer. Also, set the consumer as private and put a (dummy) callback URL.

1. Set the secret value to the consumer info via Terminus: 
   ```bash
   terminus secret:site:set <site> bitbucket-oauth.bitbucket.org "<consumer_key> <consumer_secret>" --type=composer --scope=user,ic`
   ```

1. Add your private repository to the `repositories` section of `composer.json`:

    ```json
    {
        "type": "vcs",
        "url": "https://bitbucket.org/your-organization/your-repository-name"
    }
    ```

    Your repository should contain a `composer.json` that declares a package name in its `name` field. If it is a WordPress plugin or a Drupal module, it should specify a `type` of `wordpress-plugin` or `drupal-module` respectively. For these instructions, we will assume your package name is `your-organization/your-package-name`.

1. Require the package defined by your private repository's `composer.json` by either adding a new record to the `require` section of the site's `composer.json` or with a `composer require` command:

    ```bash
    composer require your-organization/your-package-name
    ```

1. Commit your changes and push to Pantheon.

</Tab>

</TabList>

## Mechanism 2: HTTP Basic Authentication 

You may create a `COMPOSER_AUTH json` and make it available via the `COMPOSER_AUTH` environment variable if you have multiple private repositories on multiple private domains.

Composer has the ability to read private repository access information from the environment variable: `COMPOSER_AUTH`. The `COMPOSER_AUTH` variables must be in a [specific JSON format](https://getcomposer.org/doc/articles/authentication-for-private-packages.md#http-basic). 

Format example:

```bash
#!/bin/bash

read -e COMPOSER_AUTH_JSON <<< {
    "http-basic": {
        "github.com": {
            "username": "my-username1",
            "password": "my-secret-password1"
        },
        "repo.example2.org": {
            "username": "my-username2",
            "password": "my-secret-password2"
        },
        "private.packagist.org": {
            "username": "my-username2",
            "password": "my-secret-password2"
        }
    }
}
EOF


terminus secret:site:set ${SITE_NAME} COMPOSER_AUTH ${COMPOSER_AUTH_JSON} --type=env --scope=user,ic

```

# ☞ Using secrets with Drupal Key module
If you want to use Pantheon Secrets in your Drupal application through the [Key module](https://www.drupal.org/project/key), you should use the [Pantheon Secrets](https://www.drupal.org/project/pantheon_secrets) module.

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

    As a best practice, the non-production environments should be the default and then override that value with a [secret environment override](https://github.com/pantheon-systems/terminus-secrets-manager-plugin#environment-override) to change the API key for the live environment (e.g. you want to use different Sendgrid accounts for live and dev environments)

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

1) Go to the Sendgrid email test page (`/admin/config/services/sendgrid/test`) and test your Sendgrid integration by sending a test email

    ![Screenshot of Sendgrid email test page in Drupal UI](../../../images/sendgrid-email-test.png)

1) The email should get to your inbox. Enjoy!

# ☞ Accessing secrets from your codebase

### Introduction

Note: Only GET has been implemented so far in the SDK. You should handle your secrets through terminus using [Terminus Secrets Manager](https://github.com/pantheon-systems/terminus-secrets-manager-plugin).

Also: [https://github.com/pantheon-systems/customer-secrets-php-sdk?tab=readme-ov-file#restrictions](https://github.com/pantheon-systems/customer-secrets-php-sdk?tab=readme-ov-file#restrictions)

Note: this also applies to quicksilver scripts

## Mechanism 1: get_pantheon_secrets

## Mechanism 2: OOP (get a better name here!!!)

[https://github.com/pantheon-systems/customer-secrets-php-sdk?tab=readme-ov-file#usage](https://github.com/pantheon-systems/customer-secrets-php-sdk?tab=readme-ov-file#usage)

## Resources

See our detailed [Drupal](https://github.com/pantheon-systems/customer-secrets-php-sdk/blob/main/docs/drupal-example.md) or [WordPress](https://github.com/pantheon-systems/customer-secrets-php-sdk/blob/main/docs/wordpress-example.md) examples for more detailed end to end examples.


---
title: Pantheon Secrets Guide
subtitle: Local Development Usage
description: Developing locally presents some unique challenges once Pantheon Secrets are built into your workflow. These are some tips to help you get past struggling with trying to reproduced secret behavior while developing locally.
contributors: [stovak]
contenttype: [guide]
innav: [true]
categories: [secrets]
cms: [drupal, wordpress]
audience: [development]
product: [secrets]
integration: [--]
tags: [reference, cli, local, terminus, workflow]
permalink: docs/guides/secrets/local
reviewed: "2024-08-22"
showtoc: true
---
## Local Environment Usage

The [Pantheon Secrets SDK](https://github.com/pantheon-systems/customer-secrets-php-sdk) includes a `CustomerSecretsFakeClient` implementation that is used when the SDK runs outside of Pantheon infrastructure. This client uses a secrets JSON file to build the secrets information emulating what happens on the platform using the Secrets service.

To get this file, you should use the [plugin](https://github.com/pantheon-systems/terminus-secrets-manager-plugin/) `secret:site:local-generate` command and then set an environment variable into your local environment (or docker container if you are running a docker-ized environment) with name `CUSTOMER_SECRETS_FAKE_FILE` and use the absolute path to the file as the value.


### LANDO example

1. To setup this using lando, you should modify your `.lando.yml` like this:
    ```yaml
    services:
      appserver:
        overrides:
          environment:
              CUSTOMER_SECRETS_FAKE_FILE: /app/secrets.json
    ```

2. Generate the secrets file like this:
    ```bash{promptUser: user}
    terminus secret:site:local-generate --filepath=./secrets.json
    ```

3. And rebuild lando application:
    ```bash{promptUser: user}
    lando rebuild -y
    ```

Now, you will be able to use your secrets through the SDK.


### DDEV example

1. CD to your ddev root directory.

2. To setup using DDEV, add the following to your `~/.ddev/config.yml`
    ```yaml
    web_environment:
    - CUSTOMER_SECRETS_FAKE_FILE=./secrets.json
    ```

3. Generate the secrets file
    ```bash{promptUser: user}
    terminus secret:site:local-generate --filepath=./secrets.json
    ```

4. Restart your ddev environment
    ```bash{promptUser: user}
    ddev restart
    ```

## Restrictions
For secrets that do not have the "user" scope, the `secret:site:local-generate` command will set the value of the secret to "null". Edit this file and replace the null values with appropriate test values for local development.

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

To get generate this file, run `terminus secret:site:local-generate` in your terminal:

```bash
terminus secret:site:local-generate <site> --filepath=./secrets.json
```

Replace `<site>` with your Pantheon site name. The `secrets.json` file will be generated in your project root.

### Lando configuration

1. Modify your `.lando.yml`:
    ```yaml
    services:
      appserver:
        overrides:
          environment:
              CUSTOMER_SECRETS_FAKE_FILE: /app/secrets.json
    ```

1. Rebuild your Lando application:
    ```bash{promptUser: user}
    lando rebuild -y
    ```

### DDEV configuration

1. CD to your DDEV root directory
1. Add to your `.ddev/config.yml`:
    ```yaml
    web_environment:
    - CUSTOMER_SECRETS_FAKE_FILE=/var/www/html/secrets.json
    ```

1. Restart your DDEV environment:
    ```bash{promptUser: user}
    ddev restart
    ```

## Restrictions
For secrets that do not have the "user" scope, the `secret:site:local-generate` command will set the value of the secret to "null". Edit this file and replace the null values with appropriate test values for local development.

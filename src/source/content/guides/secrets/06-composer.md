---
title: Pantheon Secrets Guide
subtitle: Integrated Composer Usage
description: How to use Pantheon Secrets with Pantheon's Integrated Composer.
contributors: [stovak]
contenttype: [guide]
innav: [true]
categories: [secrets]
cms: [drupal, wordpress]
audience: [development]
product: [secrets]
integration: [--]
tags: [reference, cli, local, terminus, workflow]
permalink: docs/guides/secrets/composer
reviewed: "2024-08-22"
showtoc: true
---

## Using secrets with Integrated Composer

### Mechanism 1: OAuth composer authentication (recommended)
If your Composer-based dependency is private, and the repository supports OAuth authentication, storing your token as a secret in the Pantheon Secrets API is a simpler way to allow access to those private repositories.

<TabList>

<Tab title="GitHub" id="github-setup" active={true}>

1. [Generate a GitHub token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). The GitHub token must have all "repo" permissions selected.

    **Note:** Check the repo box that selects all child boxes. **Do not** check all child boxes individually as this does not set the correct permissions.

    ![image](https://user-images.githubusercontent.com/87093053/191616923-67732035-08aa-41c3-9a69-4d954ca02560.png)

1. Set the secret value to the token via terminus:

   ```bash{promptUser: user}
   terminus secret:site:set <site> github-oauth.github.com <github_token> --type=composer --scope=ic
   ```

1. Add your private repository to the `repositories` section of `composer.json`:

    ```json
    {
        "type": "vcs",
        "url": "https://github.com/your-organization/your-repository-name"
    }
    ```

    Your repository should contain a `composer.json` that declares a package name in its `name` field. It should specify a `type` like  `wordpress-plugin` or `drupal-module` for example. For these instructions, we will assume your package name is `your-organization/your-package-name`.

1. Require the package defined by your private repository's `composer.json` by either adding a new record to the `require` section of the site's `composer.json` or with a `composer require` command:

    ```bash{promptUser: user}
    composer require your-organization/your-package-name
    ```

1. Commit your changes and push to Pantheon.

</Tab>

<Tab title="GitLab" id="gitlab-setup">

1. [Generate a GitLab token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html). Ensure that `read_repository` scope is selected for the token.

1. Set the secret value to the token via Terminus:

   ```bash{promptUser: user}
   terminus secret:site:set <site> gitlab-oauth.gitlab.com <gitlab_token> --type=composer --scope=ic
   ```

1. Add your private repository to the `repositories` section of `composer.json`:

    ```json
    {
        "type": "vcs",
        "url": "https://gitlab.com/your-group/your-repository-name"
    }
    ```

    Your repository should contain a `composer.json` that declares a package name in its `name` field. It should specify a `type` like  `wordpress-plugin` or `drupal-module` for example. For these instructions, we will assume your package name is `your-organization/your-package-name`.

1. Require the package defined by your private repository's `composer.json` by either adding a new record to the `require` section of the site's `composer.json` or with a `composer require` command:

    ```bash{promptUser: user}
    composer require your-group/your-package-name
    ```

1. Commit your changes and push to Pantheon.

</Tab>

<Tab title="Bitbucket" id="Bitbucket-setup">

1. [Generate a Bitbucket OAuth consumer](https://support.atlassian.com/bitbucket-cloud/docs/use-oauth-on-bitbucket-cloud/). Ensure that Read repositories permission is selected for the consumer. Set the consumer as private and put a (dummy) callback URL.

1. Set the secret value to the consumer info via Terminus:
   ```bash{promptUser: user}
   terminus secret:site:set <site> bitbucket-oauth.bitbucket.org "<consumer_key> <consumer_secret>" --type=composer --scope=ic
   ```

1. Add your private repository to the `repositories` section of `composer.json`:

    ```json
    {
        "type": "vcs",
        "url": "https://bitbucket.org/your-organization/your-repository-name"
    }
    ```

    Your repository should contain a `composer.json` that declares a package name in its `name` field. It should specify a `type` like  `wordpress-plugin` or `drupal-module` for example. For these instructions, we will assume your package name is `your-organization/your-package-name`.

1. Require the package defined by your private repository's `composer.json` by either adding a new record to the `require` section of the site's `composer.json` or with a `composer require` command:

    ```bash{promptUser: user}
    composer require your-organization/your-package-name
    ```

1. Commit your changes and push to Pantheon.

</Tab>

</TabList>

### Mechanism 2: HTTP Basic Authentication

In the case where you have a Composer dependency that only supports HTTP Basic Authentication, you may create a `COMPOSER_AUTH json` and make it available via the `COMPOSER_AUTH` environment variable if you have multiple private repositories on multiple private domains.

Composer has the ability to read private repository access information from the environment variable: `COMPOSER_AUTH`. The `COMPOSER_AUTH` variables must be in a [specific JSON format](https://getcomposer.org/doc/articles/authentication-for-private-packages.md#http-basic).

**Format example:**

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

terminus secret:site:set ${SITE_NAME} COMPOSER_AUTH ${COMPOSER_AUTH_JSON} --type=env --scope=ic
```

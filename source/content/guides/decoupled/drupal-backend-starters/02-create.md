---
title: Decoupled Drupal Backend Starter for Front-End Sites
subtitle: Create a New Project
description: Learn how to create a new project.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-backend-starters/create
anchorid: create
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

## Choose an Installation Option

You can install the backend starter kit with Build Tools or with the Dashboard Upstream. Review the information below to select the right option for your setup.

### Use Build Tools if:

- Testing is an important part of your workflow

- You don’t want to manually push changes to your code repo

### Use Dashboard Upstream if:

- You require a simpler setup

- The Pantheon repository is your source of truth

## Install with Dashboard Upstream

1. Create from Decoupled Drupal Composer Managed upstream:

    - Via the Pantheon Dashboard at this link:

      - [Decoupled Drupal Composer Managed](https://dashboard.pantheon.io/sites/create?upstream_id=c76c0e51-ad85-41d7-b095-a98a75869760)

    - Or via Terminus:

      ```
      terminus site:create my-new-site "Describe Site" --org='My Team Name' c76c0e51-ad85-41d7-b095-a98a75869760
      ```

      <Alert title="Note"  type="info" >

      - Replace `'{My Team Name}'` with your team name - for example `My Agency`. This can also be omitted.
        - `c76c0e51-ad85-41d7-b095-a98a75869760` is upstream_id for Decoupled Drupal Composer Managed.

      </Alert>


## Install Drupal:

1. Click the **Visit Development Site** button.

1. Select either the `Pantheon Decoupled Profile`, or
`Pantheon Decoupled Umami Demo` profiles. The same can be done via
[`terminus remote:drush`](https://pantheon.io/docs/terminus/commands/remote-drush).

## Install using Build Tools

### Prerequisites

- Composer (required for CMS backends):
  [Install Globally](https://getcomposer.org/download/)
- [Generate machine token](https://pantheon.io/docs/machine-tokens#create-a-machine-token)
  &
  [Authenticate into Terminus](https://pantheon.io/docs/machine-tokens#authenticate-into-terminus)
- [Install Terminus](https://pantheon.io/docs/terminus/install) (3.0.0 above
  required)
- Also install the following plugins:
  - `terminus self:plugin:install terminus-build-tools-plugin`
  - `terminus self:plugin:install terminus-secrets-plugin`
  - Reload the terminus plugins: `terminus self:plugin:reload`
  - Clear cache for composer: `composer clear-cache`
  - Validate that the required plugins are installed:
    `terminus self:plugin:list`

### Installation

- For all steps below

  - Replace `{PROJECT_NAME}` with your project name - for example
    `decoupled-drupal`.

  - Replace `'{My Team Name}'` with your team name - for example `My Agency`.
    This can also be omitted.

  - Build Tools should prompt you for the credentials it needs to create these
    assets. While GitHub and CircleCI are the defaults, other providers are
    supported as well. See
    [available services](https://github.com/pantheon-systems/terminus-build-tools-plugin#available-services)
    for details.

1. Create your project using the `build:project:create` command as shown below:

    ```
    terminus build:project:create \
      --team='{My Team Name}' \
      --template-repository="git@github.com:pantheon-upstreams/decoupled-drupal-composer-managed.git" pantheon-upstreams/decoupled-drupal-composer-managed \
      --visibility private {PROJECT_NAME} \
      --profile="pantheon_decoupled_profile" \
      --stability=dev
    ```

    - This command will create:

      - A Pantheon site
      - A GitHub repository
      - A CircleCI test configuration

1. Refer to [Commands are available as part of the Build Tools plugin](https://github.com/pantheon-systems/terminus-build-tools-plugin#commands)for additional options on various repository or CI providers.

#### Known Issues

- If you encounter errors during the [Installation](#installation) process,
  please check if you have the `terminus-power-tools` plugin installed. If so
  you should remove the terminus-power-tools plugin and go through Installation
  again.

### Additional Options

#### Install with Umami Demo Data

The installation command above will create a backend with limited example
content. You can create a site with Drupal's Umami demo data set instead.

Change the profile flag to `--profile="pantheon_decoupled_umami_demo"` in your `terminus build:project:create` command.

#### Use Other Git Hosts or CI Services

Terminus Build Tools supports a number of other combinations of Git hosts and CI services.

For example, to use GitHub actions as your CI service, you can add the
following additional flag to your `terminus build:project:create` command:

`--ci=githubactions`

Other possible values are `circleci`, `gitlab-pipelines` and
`bitbucket-pipelines`.

Note: if using Github Actions, your token should have the "workflow" scope.

For more information, consult the [available services section of the build tools documentation](https://github.com/pantheon-systems/terminus-build-tools-plugin#available-services).

#### Use a GitHub Organization

`--org="{My Organization Name}"`

If you would like the repo created to be under a GitHub organization instead of the authenticated user's namespace, you can use the `--org` option.

For information on additional options, consult the
[command options section of the build tools documentation](https://github.com/pantheon-systems/terminus-build-tools-plugin#command-options).

## Update to Drupal 10

Follow the steps below to update a [Decoupled Drupal Composer Managed](https://dashboard.pantheon.io/sites/create?upstream_id=c76c0e51-ad85-41d7-b095-a98a75869760)
site to Drupal 10.

1. Clone the backend site repo.

1. Update to PHP 8.1 or greater if you have not already done so, by editing
   `pantheon.yml` and adding the following, with your chosen version of PHP:
   ```yaml
   php_version: 8.1
   ```
1. Update packages in your `composer.json` to the appropriate new versions:
   ```bash
   composer config platform.php 8.1
   git commit -am "composer config platform.php 8.1"
   composer config minimum-stability dev
   git commit -am "composer config minimum-stability dev"
   composer require --no-update --dev drupal/core-dev:^10
   composer require --no-update drupal/core-composer-scaffold:^10
   composer require --no-update pantheon-systems/drupal-integrations:^10
   composer require --no-update drupal/core-recommended:^10
   composer require --no-update drupal/pantheon_decoupled_profile:^2
   composer require --no-update drupal/pantheon_decoupled_umami_demo:^2
   composer update
   git commit -am "Update to Drupal 10"
   ```
1. Push the changes up to Pantheon.

   ```bash
   git push origin master
   ```

1. Run database updates if you are updating an existing Drupal install. This can be done with terminus or via the Drupal web UI.

   With terminus:

   ```bash
   terminus drush <BACKEND_SITE>.<ENV> updatedb
   ```

   Via the Drupal web UI: Visit `/update.php` on your Drupal back-end site, e.g.

   ```
   https://dev-my-decoupled-backend.pantheonsite.io/update.php
   ```

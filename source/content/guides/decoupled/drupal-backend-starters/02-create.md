---
title: Drupal Backend Starter for Front-End Sites
subtitle: Create a New Project
description: Learn how to create a new project.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-backend-starters/create
anchorid: create
contenttype: [guide]
innav: [false]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---
<Youtube src="AcL-v1j_XX0" title="Installing Drupal with demo content for Front-End Sites" />

This section provides information on how to use the Drupal Backend Starter for Front-End Sites.

## Choose How to Create the Project

You can create your backend starter kit project with the Dashboard Upstream, the Terminus Decoupled Kit Plugin, or with Build Tools.

Review the following sections to select the right option for your setup.

Use the **Dashboard Upstream** if:

- You require a simpler setup.
- The Pantheon repository is your source of truth.

Use the **Terminus Plugin** if:

- You want to create a related backend and frontend codebase in a single process.
- You prefer to use the CLI.

Use **Build Tools** if:

- Testing is an important part of your workflow.
- You don’t want to manually push changes to your code repository.

## Create with Dashboard Upstream

1. [Go to the workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces), that the new site should be a part of, then select the **Sites** page.

1. Click **+Create New Site**.

1. Select **Front-End Site** when prompted.

1. Select **Drupal for Front-End** under **Create Backend CMS**.

    - You can also follow the [Decoupled Drupal Composer Managed](https://dashboard.pantheon.io/sites/create?upstream_id=c76c0e51-ad85-41d7-b095-a98a75869760) link to create your site in the Site Dashboard.

    ![Select a Starter](../../../../images/decoupled-select-starter-new.png)

1. Name your site, select your decoupled environment from the **Choose a Workspace for the Site** drop-down menu, and then click **Continue**.

    Site and Multidev names cannot contain a `.` (period) or `_` (underscore).

    - To do this step through Terminus, replace `my-new-site`, the site description, and the org ([if available](/terminus/commands/org-list)) in `My Team Name` in the following command:

      ```bash{promptUser: user}
      terminus site:create my-new-site "Describe Site" --org='My Team Name' c76c0e51-ad85-41d7-b095-a98a75869760
      ```

      Note that `c76c0e51-ad85-41d7-b095-a98a75869760` is the `upstream_id` for Decoupled Drupal Composer Managed.

1. Confirm your organization selection when prompted in **Confirm Organization Selection**. The **Deploying Decoupled Drupal Composer Managed** progress indicator displays while your site is being created.

1. Click **Visit your Pantheon Dashboard** when the site creation completes.

1. Click the **Visit Development Site** button to install Drupal.

1. Select the `Pantheon Decoupled Profile` install profile. The same can be done via [`terminus remote:drush`](/terminus/commands/remote-drush).

<Alert title="Note"  type="info" >

To instead install Drupal using a demo data set, select the `Demo: Umami Food Magazine` install profile. After installing, enable the Pantheon Decoupled module.

</Alert>

Your backend starter is ready to develop!

## Create with Terminus Plugin

<Partial file="decoupled-terminus-plugin-backend.md" />

## Create with Build Tools

### Prerequisites

- Composer (required for CMS backends): [Install Composer](https://getcomposer.org/download/)
- [Generate a machine token](/machine-tokens#create-a-machine-token) and [authenticate into Terminus](/machine-tokens#authenticate-into-terminus)
- [Install Terminus](/terminus/install) (3.0.0 or above required)
- Install and confirm Terminus plugins:

    1. Install the Terminus Build Tools and Secrets plugins:

    ```bash{promptUser: user}
    terminus self:plugin:install terminus-build-tools-plugin terminus-secrets-plugin
    ```

    1. Reload the Terminus plugins, clear Composer cache, and validate that the plugins are installed:

    ```bash{promptUser: user}
    terminus self:plugin:reload && composer clear-cache && terminus self:plugin:list
    ```

### Build Tools Installation

- For all steps below:

  - Replace `PROJECT_NAME` with your project name. For example, `decoupled-drupal`.

  - Replace `My Team Name` with your team name. For example, `My Agency`.

    Use `terminus org:list` to list which orgs are available.

    This can also be omitted if the site is not part of an org.

  - Build Tools should prompt you for the credentials required to create these assets. While GitHub and CircleCI are the defaults, other providers are supported as well. Refer to [available services](https://github.com/pantheon-systems/terminus-build-tools-plugin#available-services) for more information.

1. Create your project using the `build:project:create` command as shown below:

    ```bash{promptUser: bash}{outputLines: 2-6}
    terminus build:project:create \
      --team='My Team Name' \
      --template-repository="git@github.com:pantheon-upstreams/decoupled-drupal-composer-managed.git" pantheon-upstreams/decoupled-drupal-composer-managed \
      --visibility private PROJECT_NAME \
      --profile="pantheon_decoupled_profile" \
      --stability=dev
    ```

    - This command will create:

      - A Pantheon site
      - A GitHub repository
      - A CircleCI test configuration

1. Refer to [Commands available as part of the Build Tools plugin](https://github.com/pantheon-systems/terminus-build-tools-plugin#commands)for additional options for repository or CI providers.

#### Known Issues with Build Tools

If you encounter errors during the installation process, please check if you have the terminus-power-tools plugin installed. If you do, run the following command to remove it and go through installation again:

```bash{promptUser: user}
terminus self:plugin:uninstall terminus-power-tools
```

### Additional Options

#### Use Other Git Hosts or CI Services

Terminus Build Tools supports other Git hosts and CI services.

For example, to use GitHub actions as your CI service, you can add the `--ci=githubactions` flag to your `terminus build:project:create` command.

Other possible values are:

- `circleci`
- `gitlab-pipelines`
- `bitbucket-pipelines`

<Alert title="Note"  type="info" >

Your token should have the `workflow` scope if using GitHub Actions.

</Alert>

Refer to the [available services section of the build tools documentation](https://github.com/pantheon-systems/terminus-build-tools-plugin#available-services) for more information.

#### Use a GitHub Organization

`--org="{My Organization Name}"`

If you would like the repo created to be under a GitHub organization instead of the authenticated user's namespace, you can use the `--org` option.

For information on additional options, consult the
[command options section of the build tools documentation](https://github.com/pantheon-systems/terminus-build-tools-plugin#command-options).

## Update to Drupal 10

Follow the following steps to update a [Decoupled Drupal Composer Managed](https://dashboard.pantheon.io/sites/create?upstream_id=c76c0e51-ad85-41d7-b095-a98a75869760) site to Drupal 10.

1. Clone the backend site repository.

1. Update to PHP 8.1 or greater if you have not already done so. Edit `pantheon.yml` and add the following with your chosen version of PHP:

   ```yaml:title=pantheon.yml
   php_version: 8.1
   ```

1. Update packages in your `composer.json` to the appropriate new versions:

   ```bash{promptUser: user}
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

1. Push the changes up to Pantheon:

   ```bash{promptUser: user}
   git push origin master
   ```

1. Run database updates if you are updating an existing Drupal install. This can be done with Terminus or via the Drupal web UI.

   With Terminus:

   ```bash{promptUser: user}
   terminus drush <BACKEND_SITE>.<ENV> updatedb
   ```

   Via the Drupal web UI: Visit `/update.php` on your Drupal backend site. This would look something like `https://dev-my-decoupled-backend.pantheonsite.io/update.php`.

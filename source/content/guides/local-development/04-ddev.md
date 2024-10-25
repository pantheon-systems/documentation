---
title: Local Development on Pantheon
subtitle: Install and Configure DDEV for Drupal
description: Install and configure DDEV for Drupal local development.
contributors: [whitneymeredith]
contenttype: [guide]
innav: [false]
categories: [automate]
cms: [drupal]
audience: [development]
product: [terminus]
integration: []
tags: [code, iterate, local, webops]
showtoc: true
permalink: docs/guides/local-development/ddev
---

This section provides information on how to use DDEV for local development with Drupal sites on Pantheon.

## Before You Begin

Be sure that you have:

- An existing Drupal site on Pantheon, or [create](https://dashboard.pantheon.io/sites/create) a site.
- Reviewed the [Get started with DDEV guide](https://ddev.readthedocs.io/en/latest/).
- Verified that you meet DDEV's [system requirements](https://ddev.readthedocs.io/en/latest/).

## Download and Install DDEV

1. Download the appropriate [DDEV release](https://ddev.readthedocs.io/en/latest/users/install/ddev-installation/) for your Operating System.

1. Open the installer package and allow it to prepare.

1. Follow the system prompts to install DDEV.

1. Choose a [supported Docker provider](https://ddev.readthedocs.io/en/latest/users/install/docker-installation/) to install and use with DDEV, then start Docker before proceeding. 

## Use DDEV with Pantheon

1. Navigate to your Pantheon Dashboard and [generate a machine token](/machine-tokens/) for use with your DDEV site.

1. Open your global DDEV configuration file at `~/.ddev/global_config.yaml` and add the API token to the `web_environment` section:

    ```bash{promptUser: user}
    web_environment:
    - TERMINUS_MACHINE_TOKEN=insertyourtoken
    ```

1. [Clone the site's codebase](/guides/git/git-config#clone-your-site-codebase), and from the site's root directory run the `ddev config` command.

1. Run the `ddev start` command. This starts the project in Docker and populates provider integrations in `.ddev/providers`.

1. Copy your site's `.ddev/providers/example.pantheon.yaml` provider file to `.ddev/providers/pantheon.yaml`.

  <Alert title="Note" type="info" >

  Do this in your site's `.ddev` directory, not the global `.ddev` directory. The `.ddev/providers/pantheon.yaml` file is a DDEV recipe for integration with Pantheon. For more information on DDEV provider integrations, see [DDEV docs](https://ddev.readthedocs.io/en/latest/users/providers/).

  </Alert>

1. Update the project name and environment variable in your new `.ddev/providers/pantheon.yaml` file. In the example below, the project name is `de8` and the targeted environment is `live`. This example updates the local DDEV environment with database and content file backups from the Pantheon Live environment.

    ```bash{promptUser: user}
    environment_variables:
      project: de8.live
    ```

1. Now that you have the provider file created and edited, restart DDEV: 

  ```bash{promptUser: user}
  ddev restart
  ```

1. If you haven't already, generate a backup on the Pantheon environment you want to use as a starting point for your local development environment. You can do this from the site dashboard, or via Terminus: 

  ```bash{promptUser: user}
  terminus backup:create de8.live
  ```

1. Run `ddev pull pantheon` to update your local database and content files. You can add the `--skip-files` parameter if you don't want to sync the content files to your local. Remember to specify the site and Pantheon environment you want to target when running the `ddev pull` command, and create a new backup when you need to refresh what you pull.

## More Resources

- [DDEV's Pantheon Quickstart docs](https://ddev.readthedocs.io/en/latest/users/providers/pantheon/)
- [Drupal Drush on Pantheon](/guides/drush)
- [Using Drupal on Pantheon](/develop-drupal)

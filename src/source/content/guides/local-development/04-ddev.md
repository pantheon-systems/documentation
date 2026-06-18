---
title: Local Development on Pantheon
subtitle: Install and Configure DDEV for Drupal
description: Install and configure DDEV for Drupal local development.
contributors: [whitneymeredith, rachelwhitton]
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

1. Choose and install a [supported Docker provider](https://ddev.readthedocs.io/en/latest/users/install/docker-installation/) for use with DDEV, then open the program on your machine before you proceed. 

## Use DDEV with Pantheon

1. Navigate to your Pantheon Dashboard and [generate a machine token](/machine-tokens/) for use with your DDEV site.

1. Open your global DDEV configuration file at `~/.ddev/global_config.yaml` and add your Pantheon machine token to the `web_environment` section, replace `insertyourtoken` with your token value:

    ```yaml
    web_environment:
        - TERMINUS_MACHINE_TOKEN=insertyourtoken
    ```

1. [Clone the site's codebase](/guides/git/git-config#clone-your-site-codebase), and from the site's root directory run: 

    ```bash{promptUser: user}
    ddev config
    ```

1. Start your DDEV project locally by running the following command. 

    ```bash{promptUser: user}
    ddev start
    ```

    In addition to starting local Docker containers for the site, this command will also install DDEV provider integration recipes to your site's codebase at `.ddev/providers`, which we will use in the next step.

1. Copy your site's `.ddev/providers/pantheon.yaml.example` provider file to `.ddev/providers/pantheon.yaml`.

    <Alert title="Note" type="info" >

    Do this in your site's `.ddev` directory, not the global `.ddev` directory. The `.ddev/providers/pantheon.yaml` file is a DDEV recipe for integration with Pantheon. For more information on DDEV provider integrations, see [DDEV docs](https://ddev.readthedocs.io/en/latest/users/providers/).

    </Alert>

1. Update the project name and environment variable in your new `.ddev/providers/pantheon.yaml` file. In the example below, the Pantheon project name is `de8` and the targeted Pantheon environment is `dev`.

    ```yaml
    environment_variables:
      project: de8.dev
    ```

1. Now that you have the provider file created and edited, restart your DDEV containers with the following command: 

    ```bash{promptUser: user}
    ddev restart
    ```

1. If you haven't already, create a backup on the Pantheon environment you configured in step 6 above. You can [create a new backup from the site dashboard](/guides/backups/create-backups#create-a-backup-in-the-dashboard), or via Terminus: 

    ```bash{promptUser: user}
    terminus backup:create <site>.<env>
    ```

1. Run the following command to pull your site's database and files from Pantheon into your local DDEV environment. You can add the `--skip-files` parameter if you don't want to sync the content files to your local. 

    ```bash{promptUser: user}
    ddev pull pantheon
    ```

1. Run the following command to open your local development URL in your browser: 

    ```bash{promptUser: user}
    ddev launch
    ```


## More Resources

- [DDEV's Pantheon Quickstart doc](https://ddev.readthedocs.io/en/latest/users/providers/pantheon/)
- [DDEV command references](https://ddev.readthedocs.io/en/stable/users/usage/commands/)
- [DDEV Provider Integrations doc](https://ddev.readthedocs.io/en/latest/users/providers/)
